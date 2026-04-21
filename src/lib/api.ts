import type { PublicQualification } from "../types/experts";

export const BACKEND_URL = "https://api.mindcurepath.com";
// export const BACKEND_URL = "http://localhost:3000";

/**
 * Constructs a full avatar URL from a backend avatar value.
 * Handles both full URLs and relative paths.s
 * @param avatar - The avatar value from the backend (can be null, undefined, or a string)
 * @returns The full avatar URL or undefined if the avatar is invalid
 */
export function getAvatarUrl(
  avatar: string | null | undefined,
): string | undefined {
  if (!avatar || typeof avatar !== "string") return undefined;
  const trimmed = avatar.trim();
  if (!trimmed) return undefined;

  // If it's already a full URL (starts with http:// or https://), use it as is
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // If it's a relative path starting with /, prefix with BACKEND_URL
  if (trimmed.startsWith("/")) {
    return `${BACKEND_URL}${trimmed}`;
  }

  // Otherwise, assume it's a relative path and prefix with BACKEND_URL/
  return `${BACKEND_URL}/${trimmed}`;
}

/**
 * Update the current user's phone number.
 * Requires auth token in localStorage.
 * @returns Response with message and updated user
 */
export async function updatePhone(phoneNumber: string): Promise<{
  message: string;
  user: Record<string, unknown>;
}> {
  const token =
    window.localStorage.getItem("auth:token") ||
    window.localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${BACKEND_URL}/api/v1/profile/update-phone`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ phoneNumber: phoneNumber.trim() }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      (data?.message as string) ||
        (res.status === 401 ? "Unauthorized" : "Failed to update phone number"),
    );
  }

  return data as { message: string; user: Record<string, unknown> };
}

function getAuthHeaders(): HeadersInit {
  const token =
    window.localStorage.getItem("auth:token") ||
    window.localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/** Non-OK HTTP response so callers can branch (e.g. refresh slots on 409). */
export class ApiHttpError extends Error {
  readonly status: number;
  readonly body: unknown;
  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiHttpError";
    this.status = status;
    this.body = body;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Human-readable message from common JSON error bodies (Express, Nest, etc.).
 */
export function getErrorMessageFromResponseBody(
  data: unknown,
  status: number,
  fallback: string,
): string {
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    const msg = d.message;
    if (typeof msg === "string" && msg.trim()) return msg.trim();
    if (Array.isArray(msg)) {
      const parts = msg.filter((x): x is string => typeof x === "string");
      if (parts.length) return parts.join(" ");
    }
    const err = d.error;
    if (typeof err === "string" && err.trim()) return err.trim();
    if (err && typeof err === "object") {
      const em = (err as Record<string, unknown>).message;
      if (typeof em === "string" && em.trim()) return em.trim();
    }
    const details = d.details;
    if (typeof details === "string" && details.trim()) return details.trim();
    const detail = d.detail;
    if (typeof detail === "string" && detail.trim()) return detail.trim();
  }
  if (status === 409) {
    return "This time slot is no longer available or conflicts with an existing booking. Please choose another slot.";
  }
  return fallback;
}

/** Communication medium for booking (must match backend enum). */
export type CommunicationMedium = "CALL" | "VIDEO" | "CHAT";

/** Max length accepted by API (longer input is truncated server-side; we trim client-side too). */
export const USER_CONCERN_MAX_LENGTH = 4000;

/** Prepare optional booking note for initiate: trim, empty → undefined, truncate. */
export function normalizeUserConcernForRequest(
  raw: string | undefined | null,
): string | undefined {
  if (raw == null) return undefined;
  const t = String(raw).trim();
  if (!t) return undefined;
  return t.length > USER_CONCERN_MAX_LENGTH
    ? t.slice(0, USER_CONCERN_MAX_LENGTH)
    : t;
}

/** Emergency surcharge amount in INR. */
export const EMERGENCY_SURCHARGE_INR = 300;

/**
 * Initiate response common fields for emergency bookings.
 * isEmergency: true when startAt is within 30 minutes.
 */
type InitiateEmergencyFields = {
  isEmergency: boolean;
  baseAmount: number;
  emergencySurcharge: number;
  totalAmount: number;
};

/**
 * FREE booking response.
 * - Non-emergency: appointmentId + meetLink returned directly.
 * - Emergency FREE: requires payment of surcharge, returns orderId.
 */
export type InitiateResponseFree = InitiateEmergencyFields & {
  type: "FREE";
  appointmentId?: number;
  meetLink?: string | null;
  orderId?: string;
  amount?: number;
  keyId?: string;
  currency?: string;
  userConcern?: string | null;
  message?: string;
};

/**
 * PAID booking response. Always requires Razorpay payment.
 * Emergency adds Rs 300 surcharge to base price.
 */
export type InitiateResponsePaid = InitiateEmergencyFields & {
  type: "PAID";
  orderId: string;
  amount: number; // paise
  /** Checkout key from env when omitted by server. */
  keyId?: string;
  currency: string;
  userConcern?: string | null;
  message?: string;
};

export type InitiateResponse = InitiateResponseFree | InitiateResponsePaid;

/** Error response when expert is not available for emergency booking. */
export type EmergencyRejectionResponse = {
  message: string;
  nextAvailableSlot: {
    startAt: string;
    endAt: string;
  } | null;
};

/**
 * Initiate booking. Returns FREE (appointment created) or PAID (open Razorpay with orderId, amount, keyId).
 */
export async function initiateAppointment(
  expertId: number,
  startAt: string,
  endAt: string,
  communicationMedium: CommunicationMedium,
  userConcern?: string,
): Promise<InitiateResponse> {
  const body: Record<string, unknown> = {
    expertId,
    startAt,
    endAt,
    communicationMedium,
  };
  const uc = normalizeUserConcernForRequest(userConcern);
  if (uc !== undefined) body.userConcern = uc;

  const res = await fetch(`${BACKEND_URL}/api/v1/appointments/initiate`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const fallback =
      res.status === 401 ? "Unauthorized" : "Failed to initiate booking";
    const msg = getErrorMessageFromResponseBody(data, res.status, fallback);
    throw new ApiHttpError(msg, res.status, data);
  }

  return data as InitiateResponse;
}

/** Earnings breakdown returned when PATCH status → COMPLETED. */
export type AppointmentStatusPatchEarnings = {
  appointmentAmount: number;
  platformTax: number;
  gstOnTax: number;
  afterDeductions: number;
  expertEarnings: number;
};

/**
 * Manual lifecycle (optional). Allowed: SCHEDULED → IN_PROGRESS → COMPLETED.
 */
export async function updateAppointmentStatus(
  appointmentId: number,
  status: "IN_PROGRESS" | "COMPLETED",
): Promise<{
  message: string;
  earnings?: AppointmentStatusPatchEarnings | number;
}> {
  const res = await fetch(
    `${BACKEND_URL}/api/v1/appointments/${appointmentId}/status`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    },
  );

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      (data?.message as string) || "Failed to update appointment status",
    );
  }

  return data as {
    message: string;
    earnings?: AppointmentStatusPatchEarnings | number;
  };
}

export type RescheduleAppointmentResponse = {
  message: string;
  appointment?: Record<string, unknown>;
};

/**
 * Reschedule a SCHEDULED appointment (booking user or expert). New window must be in expert availability.
 */
export async function rescheduleAppointment(
  appointmentId: number,
  startAt: string,
  endAt: string,
): Promise<RescheduleAppointmentResponse> {
  const res = await fetch(
    `${BACKEND_URL}/api/v1/appointments/${appointmentId}/reschedule`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ startAt, endAt }),
    },
  );

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const fallback = "Failed to reschedule appointment";
    const msg = getErrorMessageFromResponseBody(data, res.status, fallback);
    throw new ApiHttpError(msg, res.status, data);
  }

  return data as RescheduleAppointmentResponse;
}

/** Appointment status (API). Legacy ONGOING/FAILED are normalized. */
export type AppointmentStatus =
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "NO_SHOW"
  | "CANCELLED";

export function normalizeAppointmentStatus(raw: string): AppointmentStatus {
  if (raw === "ONGOING") return "IN_PROGRESS";
  if (raw === "FAILED") return "NO_SHOW";
  if (
    raw === "SCHEDULED" ||
    raw === "IN_PROGRESS" ||
    raw === "COMPLETED" ||
    raw === "NO_SHOW" ||
    raw === "CANCELLED"
  ) {
    return raw;
  }
  return raw as AppointmentStatus;
}

export function isTerminalAppointmentStatus(
  status: AppointmentStatus,
): boolean {
  return (
    status === "COMPLETED" || status === "NO_SHOW" || status === "CANCELLED"
  );
}

/**
 * True when status is still SCHEDULED but the booked window has started (now >= startAt)
 * and not ended (now < endAt). Backend may keep this for a grace period (e.g. no joins yet)
 * before moving to FAILED — use for “waiting / not started” UI, not as an error state.
 */
export function isScheduledAwaitingJoinInBookedWindow(
  status: AppointmentStatus,
  startAt: string,
  endAt: string,
): boolean {
  if (status !== "SCHEDULED") return false;
  const now = Date.now();
  const t0 = new Date(startAt).getTime();
  const t1 = new Date(endAt).getTime();
  if (!Number.isFinite(t0) || !Number.isFinite(t1)) return false;
  return now >= t0 && now < t1;
}

/** Full appointment row returned by verify (and echoed on initiate PAID). */
export type AppointmentApiRow = {
  id: number;
  meetLink?: string | null;
  userConcern?: string | null;
  status?: AppointmentStatus;
  [key: string]: unknown;
};

function normalizeAppointmentApiRow(
  raw: Record<string, unknown>,
): AppointmentApiRow {
  const id = Number(raw.id);
  const st = raw.status;
  return {
    ...raw,
    id: Number.isFinite(id) ? id : 0,
    status: typeof st === "string" ? normalizeAppointmentStatus(st) : undefined,
    meetLink:
      raw.meetLink === undefined ? undefined : (raw.meetLink as string | null),
    userConcern:
      raw.userConcern === undefined || raw.userConcern === null
        ? null
        : String(raw.userConcern),
  };
}

export type VerifyPaymentResponse = {
  appointment: AppointmentApiRow;
  appointmentId?: number;
  message?: string;
};

/**
 * Verify Razorpay payment and create appointment. Call from Razorpay handler.
 * Success responses include full `appointment` (with userConcern, meetLink, etc.).
 */
export async function verifyPayment(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
): Promise<VerifyPaymentResponse> {
  const res = await fetch(`${BACKEND_URL}/api/v1/appointments/verify`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    const fallback =
      res.status === 400
        ? "Payment verification failed"
        : res.status === 403
          ? "Forbidden: booking does not belong to you"
          : res.status === 404
            ? "No pending booking found for this order"
            : res.status === 409
              ? "Slot conflict: this time slot was booked by someone else. Please contact support for a refund."
              : "Failed to verify payment";
    const msg = getErrorMessageFromResponseBody(data, res.status, fallback);
    throw new ApiHttpError(msg, res.status, data);
  }

  const apptRaw = data.appointment;
  if (apptRaw && typeof apptRaw === "object" && apptRaw !== null) {
    return {
      appointment: normalizeAppointmentApiRow(
        apptRaw as Record<string, unknown>,
      ),
      appointmentId:
        data.appointmentId != null ? Number(data.appointmentId) : undefined,
      message: data.message as string | undefined,
    };
  }

  const legacyId = Number(data.appointmentId);
  if (!Number.isFinite(legacyId)) {
    throw new Error("Invalid payment verification response");
  }
  return {
    appointment: {
      id: legacyId,
      meetLink: (data.meetLink as string | null) ?? null,
      userConcern:
        data.userConcern === undefined || data.userConcern === null
          ? null
          : String(data.userConcern),
    },
  };
}

export type AppointmentSessionParticipantBody = {
  participantId: number | string;
  role: "USER" | "EXPERT";
};

export type AppointmentSessionActionResponse = {
  message?: string;
  unchanged?: boolean;
  appointment?: {
    id?: number;
    status?: AppointmentStatus;
    [key: string]: unknown;
  };
};

/**
 * Calls `POST /api/v1/appointments/:id/join` or `.../heartbeat`.
 *
 * `participantId` must match the authenticated user id (API compares as string).
 * `role` is `"USER"` for the booking user or `"EXPERT"` for the expert’s login.
 * First successful join per role sets `userJoinTime` / `expertJoinTime`; repeats are idempotent.
 */
async function postAppointmentSessionAction(
  appointmentId: number,
  pathSegment: "join" | "heartbeat",
  body: AppointmentSessionParticipantBody,
): Promise<AppointmentSessionActionResponse> {
  const res = await fetch(
    `${BACKEND_URL}/api/v1/appointments/${appointmentId}/${pathSegment}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    },
  );

  const data = (await res
    .json()
    .catch(() => ({}))) as AppointmentSessionActionResponse & {
    message?: string;
  };

  if (!res.ok) {
    throw new Error(
      (data?.message as string) ||
        (res.status === 401
          ? "Unauthorized"
          : res.status === 403
            ? "Forbidden"
            : res.status === 404
              ? "Appointment not found"
              : "Session request failed"),
    );
  }

  if (data.appointment?.status) {
    data.appointment = {
      ...data.appointment,
      status: normalizeAppointmentStatus(String(data.appointment.status)),
    };
  }

  return data;
}

/** User or expert entered the Jitsi conference (idempotent on server). */
export function postAppointmentJoin(
  appointmentId: number,
  body: AppointmentSessionParticipantBody,
): Promise<AppointmentSessionActionResponse> {
  return postAppointmentSessionAction(appointmentId, "join", body);
}

export function postAppointmentHeartbeat(
  appointmentId: number,
  body: AppointmentSessionParticipantBody,
): Promise<AppointmentSessionActionResponse> {
  return postAppointmentSessionAction(appointmentId, "heartbeat", body);
}

/**
 * Records join via API, then opens the meeting link in a new tab.
 * Use for every “Join session” action so `userJoinTime` / `expertJoinTime` are set.
 */
export async function postAppointmentJoinThenOpenMeet(
  appointmentId: number,
  meetLink: string,
  body: AppointmentSessionParticipantBody,
): Promise<void> {
  await postAppointmentJoin(appointmentId, body);
  window.open(meetLink, "_blank", "noopener,noreferrer");
}

/** Expert user (no password). */
export type ExpertUser = {
  id: number;
  name: string | null;
  email: string;
  [key: string]: unknown;
};

/** Expert nested in appointment. */
export type AppointmentExpert = {
  id: number;
  user: ExpertUser;
  [key: string]: unknown;
};

/** How the appointment reached terminal status. */
export type ResolutionSource = "USER" | "CRON" | "ADMIN" | null;

/** Single appointment from my-appointments. */
export type MyAppointment = {
  id: number;
  startAt: string;
  endAt: string;
  status: AppointmentStatus;
  meetLink: string | null;
  amount: number;
  appointmentType?: string;
  communicationMedium: string;
  userConcern?: string | null;
  expert: AppointmentExpert;
  userSessionResolvedAt?: string | null;
  resolutionSource?: ResolutionSource;
  resolvedByUserAction?: boolean;
  /** True if this was an emergency booking (within 30 min). */
  isEmergency?: boolean;
  /** Emergency surcharge amount in rupees (if emergency). */
  emergencySurcharge?: number;
  /** First successful join for the booking user (idempotent). */
  userJoinTime?: string | null;
  /** First successful join for the expert’s user account (idempotent). */
  expertJoinTime?: string | null;
  /** Set when the user successfully reported expert no-show. */
  userReportedExpertNoShowAt?: string | null;
};

/** Client (booker) on expert’s appointment list when API includes nested user. */
export type AppointmentClientUser = {
  id: number;
  name: string | null;
  email: string;
  avatarUrl?: string | null;
};

/**
 * Row from GET /appointments/expert/appointments — same core fields as my-appointments;
 * may include `user` (client) and/or `expert`.
 */
export type ExpertAppointment = {
  id: number;
  startAt: string;
  endAt: string;
  status: AppointmentStatus;
  meetLink: string | null;
  amount: number;
  appointmentType?: string;
  communicationMedium: string;
  userConcern?: string | null;
  /** FK to Expert when API includes it without full `expert` include. */
  expertId?: number;
  expert?: AppointmentExpert;
  user?: AppointmentClientUser;
  userSessionResolvedAt?: string | null;
  resolutionSource?: ResolutionSource;
  resolvedByUserAction?: boolean;
  /** True if this was an emergency booking (within 30 min). */
  isEmergency?: boolean;
  /** Emergency surcharge amount in rupees (if emergency). */
  emergencySurcharge?: number;
  userJoinTime?: string | null;
  expertJoinTime?: string | null;
  userReportedExpertNoShowAt?: string | null;
};

/**
 * Whether the logged-in expert account may access this row (video session gate).
 * APIs often omit `expert.user`; then we match `appointment.expertId` / `expert.id` to `authUser.expertId`.
 */
export function expertAuthUserOwnsAppointment(
  apt: ExpertAppointment,
  authUser: { id?: string; expertId?: number },
): boolean {
  const authNumericUserId = Number(authUser.id);
  const nestedExpertUserId = apt.expert?.user?.id;
  if (
    nestedExpertUserId != null &&
    Number.isFinite(authNumericUserId) &&
    Number(nestedExpertUserId) === authNumericUserId
  ) {
    return true;
  }
  const authExpertId = authUser.expertId;
  const aptExpertFk = apt.expertId ?? apt.expert?.id;
  if (
    authExpertId != null &&
    aptExpertFk != null &&
    Number(aptExpertFk) === Number(authExpertId)
  ) {
    return true;
  }
  return false;
}

export type MyAppointmentsResponse = {
  message: string;
  count: number;
  appointments: MyAppointment[];
};

/**
 * Get all appointments for the current user. Optional status filter.
 */
export async function getMyAppointments(
  status?: AppointmentStatus,
): Promise<MyAppointmentsResponse> {
  const url = new URL(`${BACKEND_URL}/api/v1/appointments/my-appointments`);
  if (status) url.searchParams.set("status", status);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      (data?.message as string) ||
        (res.status === 401 ? "Unauthorized" : "Failed to load appointments"),
    );
  }

  const raw = data as MyAppointmentsResponse;
  return {
    ...raw,
    appointments: (raw.appointments || []).map((a) => ({
      ...a,
      status: normalizeAppointmentStatus(String(a.status)),
    })),
  };
}

export type ExpertAppointmentsResponse = {
  message: string;
  count: number;
  appointments: ExpertAppointment[];
};

/**
 * Get all appointments for the logged-in expert. Optional status filter.
 */
export async function getExpertAppointments(
  status?: AppointmentStatus,
): Promise<ExpertAppointmentsResponse> {
  const url = new URL(`${BACKEND_URL}/api/v1/appointments/expert/appointments`);
  if (status) url.searchParams.set("status", status);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      (data?.message as string) ||
        (res.status === 403
          ? "Forbidden"
          : res.status === 401
            ? "Unauthorized"
            : "Failed to load appointments"),
    );
  }

  const raw = data as ExpertAppointmentsResponse;
  return {
    ...raw,
    appointments: (raw.appointments || []).map((a) => ({
      ...a,
      status: normalizeAppointmentStatus(String(a.status)),
    })),
  };
}

/** Client user in expert upcoming session (no password). */
export type ExpertSessionUser = {
  id: number;
  name: string | null;
  email: string;
  [key: string]: unknown;
};

/** Single session from expert upcoming-sessions. */
export type ExpertUpcomingSession = {
  id: number;
  userId: number;
  expertId: number;
  amount: number;
  startAt: string;
  endAt: string;
  status: AppointmentStatus;
  meetLink: string | null;
  userConcern?: string | null;
  user: ExpertSessionUser;
};

export type ExpertUpcomingSessionsResponse = {
  message: string;
  count: number;
  sessions: ExpertUpcomingSession[];
};

/**
 * Get upcoming sessions for the logged-in expert (SCHEDULED, IN_PROGRESS, startAt >= now).
 */
export async function getExpertUpcomingSessions(): Promise<ExpertUpcomingSessionsResponse> {
  const res = await fetch(
    `${BACKEND_URL}/api/v1/appointments/expert/upcoming-sessions`,
    { method: "GET", headers: getAuthHeaders() },
  );

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      (data?.message as string) ||
        (res.status === 403
          ? "Forbidden"
          : res.status === 401
            ? "Unauthorized"
            : "Failed to load upcoming sessions"),
    );
  }

  const raw = data as ExpertUpcomingSessionsResponse;
  return {
    ...raw,
    sessions: (raw.sessions || []).map((s) => ({
      ...s,
      status: normalizeAppointmentStatus(String(s.status)),
    })),
  };
}

export type ExpertEarningsResponse = {
  message: string;
  earnings: number;
};

/**
 * Get earnings for the logged-in expert.
 */
export async function getExpertEarnings(): Promise<ExpertEarningsResponse> {
  const res = await fetch(
    `${BACKEND_URL}/api/v1/appointments/expert/earnings`,
    { method: "GET", headers: getAuthHeaders() },
  );

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      (data?.message as string) ||
        (res.status === 403
          ? "Forbidden"
          : res.status === 401
            ? "Unauthorized"
            : "Failed to load earnings"),
    );
  }

  return data as ExpertEarningsResponse;
}

/** Earnings breakdown returned by user/complete or PATCH status → COMPLETED. */
export type SessionEarnings = {
  appointmentAmount: number;
  platformTax: number;
  gstOnTax: number;
  afterDeductions: number;
  expertEarnings: number;
};

export type UserCompleteAppointmentResponse = {
  appointment: MyAppointment;
  earnings: SessionEarnings;
  unchanged?: boolean;
};

/**
 * POST /:id/user/complete — booking user marks session as completed.
 * Time gate: now >= startAt + 5 min.
 */
export async function userCompleteAppointment(
  appointmentId: number,
): Promise<UserCompleteAppointmentResponse> {
  const res = await fetch(
    `${BACKEND_URL}/api/v1/appointments/${appointmentId}/user/complete`,
    { method: "POST", headers: getAuthHeaders(), body: JSON.stringify({}) },
  );

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    const fallback =
      res.status === 400
        ? "Cannot complete session yet"
        : res.status === 403
          ? "Only the booking user can complete this session"
          : res.status === 404
            ? "Appointment not found"
            : res.status === 409
              ? "This session was already closed as the expert not attending"
              : "Failed to mark session complete";
    const msg = getErrorMessageFromResponseBody(data, res.status, fallback);
    throw new ApiHttpError(msg, res.status, data);
  }

  return data as UserCompleteAppointmentResponse;
}

export type UserReportNoShowResponse = {
  appointment: MyAppointment;
  unchanged?: boolean;
};

/**
 * POST /:id/user/report-expert-no-show — booking user reports the expert did not join.
 * Time gate: now >= startAt + 5 min.
 */
export async function userReportNoShow(
  appointmentId: number,
): Promise<UserReportNoShowResponse> {
  const res = await fetch(
    `${BACKEND_URL}/api/v1/appointments/${appointmentId}/user/report-expert-no-show`,
    { method: "POST", headers: getAuthHeaders(), body: JSON.stringify({}) },
  );

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    const fallback =
      res.status === 400
        ? "Please wait a few minutes before reporting that the expert didn't join"
        : res.status === 403
          ? "Only the person who booked can report that the expert didn't join"
          : res.status === 404
            ? "Appointment not found"
            : res.status === 409
              ? "You can't report this on a session that's already completed"
              : "Couldn't submit your report. Please try again.";
    const msg = getErrorMessageFromResponseBody(data, res.status, fallback);
    throw new ApiHttpError(msg, res.status, data);
  }

  return data as UserReportNoShowResponse;
}

/** Review object returned by POST/PATCH review. */
export type AppointmentReview = {
  id: number;
  appointmentId: number;
  userId: number;
  expertId: number;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PostReviewResponse = {
  message: string;
  review: AppointmentReview;
};

/**
 * POST /:id/review — create a new review for a COMPLETED appointment.
 * Rating 1-5 required; comment optional. Deadline: 48h from resolution.
 */
export async function postAppointmentReview(
  appointmentId: number,
  rating: number,
  comment?: string,
): Promise<PostReviewResponse> {
  const body: Record<string, unknown> = { rating };
  if (comment !== undefined && comment.trim()) {
    body.comment = comment.trim();
  }

  const res = await fetch(
    `${BACKEND_URL}/api/v1/appointments/${appointmentId}/review`,
    { method: "POST", headers: getAuthHeaders(), body: JSON.stringify(body) },
  );

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    const fallback =
      res.status === 400
        ? "Cannot review this appointment"
        : res.status === 403
          ? "The review period has ended"
          : res.status === 409
            ? "Review already exists — edit instead"
            : res.status === 404
              ? "Appointment not found"
              : "Failed to submit review";
    const msg = getErrorMessageFromResponseBody(data, res.status, fallback);
    throw new ApiHttpError(msg, res.status, data);
  }

  return data as PostReviewResponse;
}

export type PatchReviewResponse = {
  message: string;
  review: AppointmentReview;
};

/**
 * PATCH /:id/review — update an existing review (rating and/or comment).
 * Deadline applies: 48h from resolution.
 */
export async function patchAppointmentReview(
  appointmentId: number,
  updates: { rating?: number; comment?: string | null },
): Promise<PatchReviewResponse> {
  const body: Record<string, unknown> = {};
  if (updates.rating !== undefined) body.rating = updates.rating;
  if (updates.comment !== undefined) {
    body.comment =
      updates.comment === null ? null : updates.comment.trim() || null;
  }

  const res = await fetch(
    `${BACKEND_URL}/api/v1/appointments/${appointmentId}/review`,
    { method: "PATCH", headers: getAuthHeaders(), body: JSON.stringify(body) },
  );

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    const fallback =
      res.status === 400
        ? "Invalid review update"
        : res.status === 403
          ? "The review period has ended"
          : res.status === 404
            ? "Review not found"
            : "Failed to update review";
    const msg = getErrorMessageFromResponseBody(data, res.status, fallback);
    throw new ApiHttpError(msg, res.status, data);
  }

  return data as PatchReviewResponse;
}

/**
 * GET /:id/review — fetch existing review for an appointment (if any).
 * 404 means no review exists yet.
 */
export async function getAppointmentReview(
  appointmentId: number,
): Promise<AppointmentReview | null> {
  const res = await fetch(
    `${BACKEND_URL}/api/v1/appointments/${appointmentId}/review`,
    { method: "GET", headers: getAuthHeaders() },
  );

  if (res.status === 404) {
    return null;
  }

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(
        data,
        res.status,
        "Failed to fetch review",
      ),
      res.status,
      data,
    );
  }

  return (data.review ?? data) as AppointmentReview;
}

/** User info included in public review listings. */
export type ReviewUser = {
  id: number;
  name: string | null;
  avatar: string | null;
};

/** Appointment info included in public review listings. */
export type ReviewAppointment = {
  id: number;
  startAt: string;
  appointmentType: "FREE" | "PAID";
};

/** Full review with user and appointment info for public listings. */
export type PublicReview = {
  id: number;
  appointmentId: number;
  userId: number;
  expertId: number;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
  user: ReviewUser;
  appointment?: ReviewAppointment;
};

export type ExpertReviewsResponse = {
  expertId: number;
  rating: number | null;
  totalReviews: number;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  reviews: PublicReview[];
};

// Type for ApiExpert (import from types causes circular dependency issues)
export type ApiExpertFromApi = {
  id: number;
  userId: number;
  professionalTitle: string;
  yearsOfExperience: number;
  expertiseAreas?: string[];
  bio: string;
  pricePerHour: number;
  rating: number;
  totalReviews: number;
  earnings?: number;
  user: {
    id: number;
    email: string;
    name: string;
    languages: string[];
    avatar?: string;
    phoneNumber?: string;
    gender?: string;
    dateOfBirth?: string;
  };
  expertSpecializations?: Array<{
    specialization: {
      name: string;
      domain: {
        name: string;
      };
    };
  }>;
  isFreeSessionAvailable?: boolean;
  emergencyAvailable?: boolean;
  qualifications?: PublicQualification[];
};

export type GetExpertByIdResponse = {
  message: string;
  expert: ApiExpertFromApi;
};

/**
 * GET /api/v1/expert/get-expert/:id — get a single expert by ID (public endpoint).
 */
export async function getExpertById(
  expertId: number,
): Promise<ApiExpertFromApi> {
  const token =
    window.localStorage.getItem("auth:token") ||
    window.localStorage.getItem("token");

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  // Include auth token if available (for personalized isFreeSessionAvailable)
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(
    `${BACKEND_URL}/api/v1/expert/get-expert/${expertId}`,
    {
      method: "GET",
      headers,
    },
  );

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    const fallback =
      res.status === 400
        ? "Invalid expert ID"
        : res.status === 404
          ? "Expert not found"
          : "Failed to fetch expert";
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(data, res.status, fallback),
      res.status,
      data,
    );
  }

  return (data as GetExpertByIdResponse).expert;
}

/**
 * GET /reviews/expert/:expertId — public endpoint to get all reviews for an expert.
 * Supports pagination.
 */
export async function getExpertReviews(
  expertId: number,
  page: number = 1,
  limit: number = 10,
): Promise<ExpertReviewsResponse> {
  const url = new URL(
    `${BACKEND_URL}/api/v1/appointments/reviews/expert/${expertId}`,
  );
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(Math.min(limit, 50)));

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    const fallback =
      res.status === 400
        ? "Invalid expert ID"
        : res.status === 404
          ? "Expert not found"
          : "Failed to load reviews";
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(data, res.status, fallback),
      res.status,
      data,
    );
  }

  return data as ExpertReviewsResponse;
}

// ─────────────────────────────────────────────────────────────────────────────
// Emergency Appointments
// ─────────────────────────────────────────────────────────────────────────────

export type ToggleEmergencyAvailabilityResponse = {
  message: string;
  expert: {
    id: number;
    emergencyAvailable: boolean;
  };
};

/**
 * PATCH /api/v1/expert/me/emergency-availability — expert toggles emergency availability.
 */
export async function toggleEmergencyAvailability(
  emergencyAvailable: boolean,
): Promise<ToggleEmergencyAvailabilityResponse> {
  const res = await fetch(
    `${BACKEND_URL}/api/v1/expert/me/emergency-availability`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ emergencyAvailable }),
    },
  );

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    const fallback =
      res.status === 401
        ? "Unauthorized"
        : res.status === 403
          ? "Only experts can change emergency availability"
          : "Failed to update emergency availability";
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(data, res.status, fallback),
      res.status,
      data,
    );
  }

  return data as ToggleEmergencyAvailabilityResponse;
}

/** Max length for expert bio. */
export const EXPERT_BIO_MAX_LENGTH = 2000;

export type UpdateExpertBioResponse = {
  message: string;
  expert: {
    id: number;
    bio: string | null;
  };
};

/**
 * PATCH /api/v1/expert/me/bio — expert updates their bio.
 * bio can be string or null; max 2000 chars; empty string becomes null.
 */
export async function updateExpertBio(
  bio: string | null,
): Promise<UpdateExpertBioResponse> {
  const res = await fetch(`${BACKEND_URL}/api/v1/expert/me/bio`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ bio }),
  });

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    const fallback =
      res.status === 401
        ? "Unauthorized"
        : res.status === 403
          ? "Only experts can update their bio"
          : res.status === 400
            ? "Bio exceeds maximum length"
            : "Failed to update bio";
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(data, res.status, fallback),
      res.status,
      data,
    );
  }

  return data as UpdateExpertBioResponse;
}

// ─────────────────────────────────────────────────────────────────────────────
// Expert qualifications (expert CRUD; public list is on expert payload)
// ─────────────────────────────────────────────────────────────────────────────

export const QUALIFICATION_DEGREE_MAX_LENGTH = 100;
export const QUALIFICATION_FIELD_MAX_LENGTH = 200;
export const QUALIFICATION_INSTITUTION_MAX_LENGTH = 200;
export const QUALIFICATION_YEAR_MIN = 1900;

export type QualificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export type ExpertQualification = {
  id: number;
  expertId: number;
  degree: string;
  field: string;
  institution: string;
  year?: number | null;
  status: QualificationStatus;
  verifiedById?: number | null;
  verifiedAt?: string | null;
  rejectionReason?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ExpertQualificationInput = {
  degree: string;
  field: string;
  institution: string;
  year?: number;
};

export type CreateExpertQualificationResponse = {
  message: string;
  qualification: ExpertQualification;
};

export type ListMyExpertQualificationsResponse = {
  message: string;
  qualifications: ExpertQualification[];
};

export type UpdateExpertQualificationResponse = {
  message: string;
  qualification: ExpertQualification;
};

/**
 * POST /api/v1/expert/me/qualifications — create (status PENDING).
 */
export async function createExpertQualification(
  body: ExpertQualificationInput,
): Promise<ExpertQualification> {
  const res = await fetch(`${BACKEND_URL}/api/v1/expert/me/qualifications`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    const fallback =
      res.status === 401
        ? "Unauthorized"
        : res.status === 403
          ? "Only experts can add qualifications"
          : "Failed to add qualification";
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(data, res.status, fallback),
      res.status,
      data,
    );
  }
  return (data as CreateExpertQualificationResponse).qualification;
}

/**
 * GET /api/v1/expert/me/qualifications — all statuses, newest first.
 */
export async function getMyExpertQualifications(): Promise<
  ExpertQualification[]
> {
  const res = await fetch(`${BACKEND_URL}/api/v1/expert/me/qualifications`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    const fallback =
      res.status === 401
        ? "Unauthorized"
        : res.status === 403
          ? "Only experts can view qualifications"
          : "Failed to load qualifications";
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(data, res.status, fallback),
      res.status,
      data,
    );
  }
  const list = (data as ListMyExpertQualificationsResponse).qualifications;
  return Array.isArray(list) ? list : [];
}

/**
 * PATCH /api/v1/expert/me/qualifications/:id — updates; returns to PENDING.
 */
export async function updateExpertQualification(
  id: number,
  body: ExpertQualificationInput,
): Promise<ExpertQualification> {
  const res = await fetch(
    `${BACKEND_URL}/api/v1/expert/me/qualifications/${id}`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    },
  );
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    const fallback =
      res.status === 401
        ? "Unauthorized"
        : res.status === 403
          ? "You cannot edit this qualification"
          : res.status === 404
            ? "Qualification not found"
            : "Failed to update qualification";
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(data, res.status, fallback),
      res.status,
      data,
    );
  }
  return (data as UpdateExpertQualificationResponse).qualification;
}

/**
 * DELETE /api/v1/expert/me/qualifications/:id
 */
export async function deleteExpertQualification(id: number): Promise<void> {
  const res = await fetch(
    `${BACKEND_URL}/api/v1/expert/me/qualifications/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    },
  );
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    const fallback =
      res.status === 401
        ? "Unauthorized"
        : res.status === 403
          ? "You cannot delete this qualification"
          : res.status === 404
            ? "Qualification not found"
            : "Failed to delete qualification";
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(data, res.status, fallback),
      res.status,
      data,
    );
  }
}

/** Slot info for emergency availability. */
export type EmergencySlotInfo = {
  availabilityId: number;
  startTime: string;
  endTime: string;
  isEmergency?: boolean;
};

/** Day with emergency slots. */
export type EmergencySlotDay = {
  day: string;
  date: number;
  month: number;
  year: number;
  slots: EmergencySlotInfo[];
};

export type EmergencySlotsResponse = {
  emergencyAvailable: boolean;
  emergencySurcharge?: number;
  message?: string;
  slots: EmergencySlotDay[];
};

/**
 * GET /availability/:expertId/next-10-days?emergency=true — get emergency slots.
 */
export async function getEmergencySlots(
  expertId: number,
): Promise<EmergencySlotsResponse> {
  const url = new URL(
    `${BACKEND_URL}/api/v1/appointments/availability/${expertId}/next-10-days`,
  );
  url.searchParams.set("emergency", "true");

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(
        data,
        res.status,
        "Failed to load emergency slots",
      ),
      res.status,
      data,
    );
  }

  return data as EmergencySlotsResponse;
}

/** Next emergency slot response. */
export type NextEmergencySlotResponse = {
  emergencyAvailable: boolean;
  slot: {
    day: string;
    date: number;
    month: number;
    year: number;
    startTime: string;
    endTime: string;
    isEmergency?: boolean;
    emergencySurcharge?: number;
  } | null;
  message?: string;
};

/**
 * Next standard bookable slot from GET .../availability/:expertId/next-slot (no query).
 * Same shape as expert listing cards use.
 */
export type ExpertNextSlot = {
  day: string;
  date: number;
  month: number;
  year: number;
  startTime: string;
  endTime: string;
};

export async function getExpertNextSlot(
  expertId: number,
): Promise<ExpertNextSlot | null> {
  const res = await fetch(
    `${BACKEND_URL}/api/v1/appointments/availability/${expertId}/next-slot`,
    { method: "GET", headers: { Accept: "application/json" } },
  );
  if (!res.ok) return null;
  const data = (await res.json().catch(() => null)) as unknown;
  if (data == null || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;
  const year = Number(o.year);
  const month = Number(o.month);
  const date = Number(o.date);
  const startTime = typeof o.startTime === "string" ? o.startTime : "";
  const endTime = typeof o.endTime === "string" ? o.endTime : "";
  const day = typeof o.day === "string" ? o.day : "";
  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(date) ||
    !startTime
  ) {
    return null;
  }
  return {
    day,
    date,
    month,
    year,
    startTime,
    endTime,
  };
}

/**
 * GET /availability/:expertId/next-slot?emergency=true — get next emergency slot.
 */
export async function getNextEmergencySlot(
  expertId: number,
): Promise<NextEmergencySlotResponse> {
  const url = new URL(
    `${BACKEND_URL}/api/v1/appointments/availability/${expertId}/next-slot`,
  );
  url.searchParams.set("emergency", "true");

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(
        data,
        res.status,
        "Failed to load emergency slot",
      ),
      res.status,
      data,
    );
  }

  return data as NextEmergencySlotResponse;
}

/**
 * Helper to check if an initiate response requires payment (emergency FREE or any PAID).
 */
export function initiateResponseRequiresPayment(
  res: InitiateResponse,
): res is InitiateResponsePaid | (InitiateResponseFree & { orderId: string }) {
  if (res.type === "PAID") return true;
  if (res.type === "FREE" && res.isEmergency && res.orderId) return true;
  return false;
}

/**
 * Extract payment details from initiate response (for Razorpay).
 */
export function getInitiatePaymentDetails(res: InitiateResponse): {
  orderId: string;
  amount: number;
  keyId?: string;
  currency: string;
} | null {
  if (res.type === "PAID") {
    return {
      orderId: res.orderId,
      amount: res.amount,
      keyId: res.keyId,
      currency: res.currency,
    };
  }
  if (res.type === "FREE" && res.isEmergency && res.orderId && res.amount) {
    return {
      orderId: res.orderId,
      amount: res.amount,
      keyId: res.keyId,
      currency: res.currency ?? "INR",
    };
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Urgent Requests
// ─────────────────────────────────────────────────────────────────────────────

/** Legacy paid request-fee amount (₹); free initiate flow does not charge this. */
export const URGENT_REQUEST_FEE_INR = 25;
export const URGENT_CONTACT_VALIDITY_SECONDS = 1800; // 30 minutes
export const URGENT_PAYMENT_WINDOW_MINUTES = 15;

/** Status values for urgent requests. */
export type UrgentRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "PAYMENT_COMPLETED"
  | "REJECTED"
  | "EXPIRED"
  | "PAYMENT_EXPIRED";

/** Expert info in urgent request. */
export type UrgentRequestExpert = {
  id: number;
  user: {
    name: string | null;
    avatar?: string | null;
    email?: string;
  };
};

/** Appointment info after urgent request payment completion. */
export type UrgentRequestAppointment = {
  id: number;
  startAt: string;
  endAt: string;
  meetLink: string | null;
  communicationMedium: string;
  status: AppointmentStatus;
  expertName?: string;
};

/** Single urgent request from my-requests. */
export type UrgentRequest = {
  id: number;
  status: UrgentRequestStatus;
  statusMessage: string;
  reason?: string | null;
  expert?: UrgentRequestExpert | null;
  assignedExpert?: UrgentRequestExpert | null;
  appointment?: UrgentRequestAppointment | null;
  baseAmount?: number;
  emergencySurcharge?: number;
  totalAmount?: number;
  paymentExpiresAt?: string | null;
  contactExpired: boolean;
  contactRemainingSeconds?: number;
  companyPhone?: string | null;
  createdAt: string;
  expiresAt?: string;
};

/**
 * POST /api/v1/urgent-requests/initiate response.
 * Free flow: `requestFeeRequired: false` + phone window fields.
 * Legacy: `requestFeeRequired: true` + Razorpay `orderId` / `amount` / `currency`.
 */
export type InitiateUrgentRequestResponse = {
  message: string;
  requestId: number;
  /** False = free initiate (current). True / omitted with order fields = legacy paid fee. */
  requestFeeRequired?: boolean;
  companyPhone?: string | null;
  contactValidUntil?: string;
  contactValiditySeconds?: number;
  expiresAt?: string;
  userStatus?: string;
  orderId?: string;
  amount?: number;
  currency?: string;
  keyId?: string;
};

/**
 * POST /api/v1/urgent-requests/initiate — free urgent request, or legacy paid fee + Razorpay order.
 */
export async function initiateUrgentRequest(
  expertId?: number | null,
  reason?: string,
): Promise<InitiateUrgentRequestResponse> {
  const body: Record<string, unknown> = {};
  if (expertId != null) body.expertId = expertId;
  if (reason?.trim()) body.reason = reason.trim().slice(0, 1000);

  const res = await fetch(`${BACKEND_URL}/api/v1/urgent-requests/initiate`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    const fallback =
      res.status === 400
        ? "Expert not found or doesn't accept emergency bookings"
        : res.status === 429
          ? "You can only create 3 urgent requests per day"
          : "Failed to initiate urgent request";
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(data, res.status, fallback),
      res.status,
      data,
    );
  }

  return data as InitiateUrgentRequestResponse;
}

/** Response from POST /urgent-requests/verify-request-fee. */
export type VerifyUrgentRequestFeeResponse = {
  message: string;
  requestId: number;
  companyPhone: string;
  contactValidUntil: string;
  contactValiditySeconds: number;
  userStatus: string;
};

/**
 * POST /api/v1/urgent-requests/verify-request-fee — legacy only: verify paid request-fee Razorpay order.
 * Not used when {@link InitiateUrgentRequestResponse.requestFeeRequired} is false.
 */
export async function verifyUrgentRequestFee(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
  options?: {
    expertId?: number | null;
    reason?: string;
  },
): Promise<VerifyUrgentRequestFeeResponse> {
  const body: Record<string, unknown> = {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  };
  if (options?.expertId != null) body.expertId = options.expertId;
  if (options?.reason?.trim()) {
    body.reason = options.reason.trim().slice(0, 1000);
  }

  const res = await fetch(
    `${BACKEND_URL}/api/v1/urgent-requests/verify-request-fee`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    },
  );

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(
        data,
        res.status,
        "Failed to verify payment",
      ),
      res.status,
      data,
    );
  }

  return data as VerifyUrgentRequestFeeResponse;
}

/** Response from GET /urgent-requests/my-requests. */
export type MyUrgentRequestsResponse = {
  requests: UrgentRequest[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

/**
 * GET /api/v1/urgent-requests/my-requests — get user's urgent requests.
 */
export async function getMyUrgentRequests(
  status?: UrgentRequestStatus,
  page: number = 1,
  limit: number = 10,
): Promise<MyUrgentRequestsResponse> {
  const url = new URL(`${BACKEND_URL}/api/v1/urgent-requests/my-requests`);
  if (status) url.searchParams.set("status", status);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(Math.min(limit, 50)));

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(
        data,
        res.status,
        "Failed to load urgent requests",
      ),
      res.status,
      data,
    );
  }

  return data as MyUrgentRequestsResponse;
}

/**
 * GET /api/v1/urgent-requests/:id — get single urgent request.
 */
export async function getUrgentRequest(id: number): Promise<UrgentRequest> {
  const res = await fetch(`${BACKEND_URL}/api/v1/urgent-requests/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(
        data,
        res.status,
        "Failed to load urgent request",
      ),
      res.status,
      data,
    );
  }

  return data as UrgentRequest;
}

/** Response from POST /urgent-requests/:id/initiate-payment. */
export type InitiateUrgentPaymentResponse = {
  message: string;
  requestId: number;
  orderId: string;
  amount: number;
  baseAmount: number;
  emergencySurcharge: number;
  totalAmount: number;
  currency: string;
  keyId?: string;
  paymentExpiresAt: string;
};

/**
 * POST /api/v1/urgent-requests/:id/initiate-payment — initiate final payment after approval.
 */
export async function initiateUrgentPayment(
  requestId: number,
): Promise<InitiateUrgentPaymentResponse> {
  const res = await fetch(
    `${BACKEND_URL}/api/v1/urgent-requests/${requestId}/initiate-payment`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({}),
    },
  );

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    const fallback =
      res.status === 400
        ? "Payment window expired or request not approved"
        : "Failed to initiate payment";
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(data, res.status, fallback),
      res.status,
      data,
    );
  }

  return data as InitiateUrgentPaymentResponse;
}

/** Response from POST /urgent-requests/:id/verify-payment. */
export type VerifyUrgentPaymentResponse = {
  message: string;
  appointment: UrgentRequestAppointment;
  sessionStartsIn: number;
  appointmentDate: string;
  appointmentTime: string;
};

/**
 * POST /api/v1/urgent-requests/:id/verify-payment — verify final payment.
 */
export async function verifyUrgentPayment(
  requestId: number,
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
): Promise<VerifyUrgentPaymentResponse> {
  const res = await fetch(
    `${BACKEND_URL}/api/v1/urgent-requests/${requestId}/verify-payment`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }),
    },
  );

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    throw new ApiHttpError(
      getErrorMessageFromResponseBody(
        data,
        res.status,
        "Failed to verify payment",
      ),
      res.status,
      data,
    );
  }

  return data as VerifyUrgentPaymentResponse;
}
