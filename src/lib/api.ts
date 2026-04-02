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

/** Initiate: FREE → appointment created; PAID → Razorpay order created. */
export type InitiateResponseFree = {
  type: "FREE";
  appointmentId: number;
  meetLink: string | null;
  userConcern?: string | null;
  message?: string;
};

export type InitiateResponsePaid = {
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
    status === "COMPLETED" ||
    status === "NO_SHOW" ||
    status === "CANCELLED"
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
    status:
      typeof st === "string"
        ? normalizeAppointmentStatus(st)
        : undefined,
    meetLink:
      raw.meetLink === undefined
        ? undefined
        : (raw.meetLink as string | null),
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

  const data = (await res.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;

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
 * Calls `POST /api/v1/appointments/:id/{join|heartbeat|leave}`.
 *
 * **Backend contract (confirm in the API repo — not enforced here):**
 * - `participantId` must match the authenticated user id (API compares as string).
 * - Handlers may return 200 with `unchanged: true` or skip persisting timestamps when the
 *   appointment is terminal or **outside the booked window** (`startAt` / `endAt`). If DB
 *   fields stay `null` when users connect long before or after the slot, adjust server-side
 *   participation logic (e.g. `appointmentParticipation`) rather than the client.
 * - Client must invoke these endpoints whenever the meeting lifecycle changes; server does not
 *   infer presence automatically from the raw meeting link.
 */
async function postAppointmentSessionAction(
  appointmentId: number,
  pathSegment: "join" | "heartbeat" | "leave",
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

  const data = (await res.json().catch(() => ({}))) as
    AppointmentSessionActionResponse & { message?: string };

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

export function postAppointmentLeave(
  appointmentId: number,
  body: AppointmentSessionParticipantBody,
): Promise<AppointmentSessionActionResponse> {
  return postAppointmentSessionAction(appointmentId, "leave", body);
}

/** Best-effort leave when the tab is closing (no await). */
export function leaveAppointmentSessionKeepalive(
  appointmentId: number,
  body: AppointmentSessionParticipantBody,
): void {
  const token =
    window.localStorage.getItem("auth:token") ||
    window.localStorage.getItem("token");
  if (!token) return;
  try {
    void fetch(
      `${BACKEND_URL}/api/v1/appointments/${appointmentId}/leave`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        keepalive: true,
      },
    ).catch(() => { });
  } catch {
    /* ignore */
  }
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
  const url = new URL(
    `${BACKEND_URL}/api/v1/appointments/expert/appointments`,
  );
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
              ? "Session was already marked as no-show"
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
        ? "Please wait a few minutes before reporting no-show"
        : res.status === 403
          ? "Only the booking user can report no-show"
          : res.status === 404
            ? "Appointment not found"
            : res.status === 409
              ? "Cannot report no-show on a completed session"
              : "Failed to report no-show";
    const msg = getErrorMessageFromResponseBody(data, res.status, fallback);
    throw new ApiHttpError(msg, res.status, data);
  }

  return data as UserReportNoShowResponse;
}

export type CancelAppointmentResponse = {
  message: string;
  appointment: MyAppointment;
};

/**
 * POST /:id/cancel — booking user cancels a SCHEDULED appointment.
 * Rules: must be SCHEDULED, now < startAt (cannot cancel after slot started).
 */
export async function cancelAppointment(
  appointmentId: number,
): Promise<CancelAppointmentResponse> {
  const res = await fetch(
    `${BACKEND_URL}/api/v1/appointments/${appointmentId}/cancel`,
    { method: "POST", headers: getAuthHeaders(), body: JSON.stringify({}) },
  );

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

  if (!res.ok) {
    const fallback =
      res.status === 403
        ? "Only the booking user can cancel this appointment"
        : res.status === 404
          ? "Appointment not found"
          : res.status === 409
            ? "Cannot cancel — appointment is not scheduled or has already started"
            : "Failed to cancel appointment";
    const msg = getErrorMessageFromResponseBody(data, res.status, fallback);
    throw new ApiHttpError(msg, res.status, data);
  }

  return data as CancelAppointmentResponse;
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
    body.comment = updates.comment === null ? null : updates.comment.trim() || null;
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
      getErrorMessageFromResponseBody(data, res.status, "Failed to fetch review"),
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

/**
 * GET /reviews/expert/:expertId — public endpoint to get all reviews for an expert.
 * Supports pagination.
 */
export async function getExpertReviews(
  expertId: number,
  page: number = 1,
  limit: number = 10,
): Promise<ExpertReviewsResponse> {
  const url = new URL(`${BACKEND_URL}/api/v1/appointments/reviews/expert/${expertId}`);
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
