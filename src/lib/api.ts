// export const BACKEND_URL = "https://api.mindcurepath.com";
export const BACKEND_URL = "http://localhost:3000";

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

/** Communication medium for booking (must match backend enum). */
export type CommunicationMedium = "CALL" | "VIDEO" | "CHAT";

/** Initiate: FREE → appointment created; PAID → Razorpay order created. */
export type InitiateResponseFree = {
  type: "FREE";
  appointmentId: number;
  meetLink: string | null;
};

export type InitiateResponsePaid = {
  type: "PAID";
  orderId: string;
  amount: number; // paise
  keyId: string;
  currency: string;
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
): Promise<InitiateResponse> {
  const res = await fetch(`${BACKEND_URL}/api/v1/appointments/initiate`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      expertId,
      startAt,
      endAt,
      communicationMedium,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      (data?.message as string) ||
      (res.status === 401 ? "Unauthorized" : "Failed to initiate booking"),
    );
  }

  return data as InitiateResponse;
}

/**
 * Verify Razorpay payment and create appointment. Call from Razorpay handler.
 */
export async function verifyPayment(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
): Promise<{ appointmentId: number; meetLink?: string | null }> {
  const res = await fetch(`${BACKEND_URL}/api/v1/appointments/verify`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      (data?.message as string) ||
      (res.status === 400
        ? "Payment verification failed"
        : "Failed to verify payment"),
    );
  }

  return data as { appointmentId: number; meetLink?: string | null };
}

/**
 * Manual lifecycle (optional). Allowed: SCHEDULED → IN_PROGRESS → COMPLETED.
 */
export async function updateAppointmentStatus(
  appointmentId: number,
  status: "IN_PROGRESS" | "COMPLETED",
): Promise<{ message: string; earnings?: number }> {
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

  return data as { message: string; earnings?: number };
}

/** Appointment status (API). Legacy ONGOING is normalized to IN_PROGRESS. */
export type AppointmentStatus =
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "NO_SHOW"
  | "CANCELLED";

export function normalizeAppointmentStatus(raw: string): AppointmentStatus {
  if (raw === "ONGOING") return "IN_PROGRESS";
  if (
    raw === "SCHEDULED" ||
    raw === "IN_PROGRESS" ||
    raw === "COMPLETED" ||
    raw === "FAILED" ||
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
    status === "FAILED" ||
    status === "NO_SHOW" ||
    status === "CANCELLED"
  );
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
  expert: AppointmentExpert;
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
  expert?: AppointmentExpert;
  user?: AppointmentClientUser;
};

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
