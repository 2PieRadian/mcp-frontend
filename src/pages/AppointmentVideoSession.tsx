import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  ExternalLink,
  Video,
  Shield,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  getExpertAppointments,
  getMyAppointments,
  postAppointmentHeartbeat,
  postAppointmentJoin,
  postAppointmentLeave,
  leaveAppointmentSessionKeepalive,
  isTerminalAppointmentStatus,
  normalizeAppointmentStatus,
  type AppointmentSessionParticipantBody,
  type AppointmentStatus,
  type ExpertAppointment,
  type MyAppointment,
} from "../lib/api";
import {
  jitsiExternalApiScriptUrl,
  parseJitsiMeetLink,
} from "../lib/jitsiMeetLink";
import type { JitsiExternalApiInstance } from "../types/jitsi-external-api";

const HEARTBEAT_MS = 30_000;

function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load meeting SDK"));
    document.body.appendChild(s);
  });
}

export default function AppointmentVideoSession() {
  const { appointmentId: appointmentIdParam } = useParams<{
    appointmentId: string;
  }>();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();

  const appointmentNumericId = Number(appointmentIdParam);
  const [sessionRole, setSessionRole] = useState<"USER" | "EXPERT" | null>(
    null,
  );
  const [appointment, setAppointment] = useState<
    MyAppointment | ExpertAppointment | null
  >(null);
  const [resolveError, setResolveError] = useState<string | null>(null);
  const [resolving, setResolving] = useState(true);

  const [sdkError, setSdkError] = useState<string | null>(null);
  const [terminalBanner, setTerminalBanner] = useState<AppointmentStatus | null>(
    null,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<JitsiExternalApiInstance | null>(null);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const leaveSentRef = useRef(false);
  const joinPostedRef = useRef(false);
  const sessionBodyRef = useRef<AppointmentSessionParticipantBody | null>(null);
  const appointmentIdRef = useRef(0);

  const dashboardPath =
    user?.role === "EXPERT" ? "/dashboard/expert" : "/dashboard";

  const sessionBody = useMemo<AppointmentSessionParticipantBody | null>(() => {
    if (!user?.id || !sessionRole) return null;
    return { participantId: Number(user.id), role: sessionRole };
  }, [user?.id, sessionRole]);

  useEffect(() => {
    sessionBodyRef.current = sessionBody;
    appointmentIdRef.current = appointmentNumericId;
  }, [sessionBody, appointmentNumericId]);

  const stopHeartbeat = useCallback(() => {
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    }
  }, []);

  const doLeave = useCallback(async () => {
    if (leaveSentRef.current) return;
    leaveSentRef.current = true;
    stopHeartbeat();
    const api = jitsiApiRef.current;
    jitsiApiRef.current = null;
    if (api) {
      try {
        api.dispose();
      } catch {
        /* ignore */
      }
    }
    const body = sessionBodyRef.current;
    const aid = appointmentIdRef.current;
    if (!body || !aid) return;
    try {
      const res = await postAppointmentLeave(aid, body);
      const st = res.appointment?.status;
      if (st) {
        const n = normalizeAppointmentStatus(String(st));
        if (isTerminalAppointmentStatus(n)) setTerminalBanner(n);
      }
    } catch {
      leaveAppointmentSessionKeepalive(aid, body);
    }
  }, [stopHeartbeat]);

  useEffect(() => {
    if (
      authLoading ||
      !user?.id ||
      Number.isNaN(appointmentNumericId) ||
      appointmentNumericId < 1
    ) {
      return;
    }

    let cancelled = false;
    setResolving(true);
    setResolveError(null);

    (async () => {
      try {
        if (user.role === "EXPERT") {
          const res = await getExpertAppointments();
          const apt = res.appointments.find((a) => a.id === appointmentNumericId);
          if (
            !apt ||
            apt.expert?.user?.id !== Number(user.id)
          ) {
            if (!cancelled) {
              setResolveError(
                "This appointment was not found or you do not have access.",
              );
              setAppointment(null);
              setSessionRole(null);
            }
            return;
          }
          if (!cancelled) {
            setAppointment(apt);
            setSessionRole("EXPERT");
          }
        } else {
          const res = await getMyAppointments();
          const apt = res.appointments.find((a) => a.id === appointmentNumericId);
          if (!apt) {
            if (!cancelled) {
              setResolveError("Appointment not found.");
              setAppointment(null);
              setSessionRole(null);
            }
            return;
          }
          if (!cancelled) {
            setAppointment(apt);
            setSessionRole("USER");
          }
        }
      } catch {
        if (!cancelled) {
          setResolveError("Failed to load appointment.");
          setAppointment(null);
          setSessionRole(null);
        }
      } finally {
        if (!cancelled) setResolving(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user, appointmentNumericId]);

  const isTerminal = appointment?.status
    ? isTerminalAppointmentStatus(appointment.status)
    : false;
  const isVideo =
    (appointment?.communicationMedium || "").toUpperCase() === "VIDEO";
  const meetLink = appointment?.meetLink ?? null;

  useEffect(() => {
    const parsedMeet = meetLink ? parseJitsiMeetLink(meetLink) : null;
    if (
      resolving ||
      !appointment ||
      !sessionBody ||
      !parsedMeet ||
      !containerRef.current ||
      isTerminal ||
      !isVideo ||
      terminalBanner
    ) {
      return;
    }

    leaveSentRef.current = false;
    joinPostedRef.current = false;
    const { domain, roomName } = parsedMeet;
    const container = containerRef.current;
    const aptId = appointment.id;

    let disposed = false;

    const onPageHide = () => {
      const body = sessionBodyRef.current;
      const id = appointmentIdRef.current;
      if (body && id && !leaveSentRef.current) {
        leaveAppointmentSessionKeepalive(id, body);
      }
    };
    window.addEventListener("pagehide", onPageHide);

    (async () => {
      try {
        await loadScriptOnce(jitsiExternalApiScriptUrl(domain));
        if (disposed || !window.JitsiMeetExternalAPI) {
          setSdkError("Meeting could not be initialized.");
          return;
        }

        const displayName =
          user?.name?.trim() ||
          user?.email ||
          (sessionRole === "EXPERT" ? "Expert" : "Guest");

        const api = new window.JitsiMeetExternalAPI(domain, {
          roomName,
          parentNode: container,
          width: "100%",
          height: "100%",
          userInfo: { displayName },
          configOverwrite: {
            startWithVideoMuted: false,
            prejoinPageEnabled: false,
            disableDeepLinking: true,
            defaultLanguage: "en",
          },
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
              "microphone",
              "camera",
              "hangup",
              "settings",
              "tileview",
            ],
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            MOBILE_APP_PROMO: false,
            FILM_STRIP_MAX_HEIGHT: 120,
          },
        });

        jitsiApiRef.current = api;

        const startHeartbeat = () => {
          stopHeartbeat();
          heartbeatRef.current = setInterval(() => {
            const body = sessionBodyRef.current;
            if (!body || leaveSentRef.current) return;
            void postAppointmentHeartbeat(aptId, body)
              .then((res) => {
                const st = res.appointment?.status;
                if (!st) return;
                const n = normalizeAppointmentStatus(String(st));
                if (isTerminalAppointmentStatus(n)) {
                  setTerminalBanner(n);
                  stopHeartbeat();
                  void doLeave();
                }
              })
              .catch(() => {});
          }, HEARTBEAT_MS);
        };

        const onJoined = () => {
          if (joinPostedRef.current || leaveSentRef.current) return;
          joinPostedRef.current = true;
          const body = sessionBodyRef.current;
          if (!body) {
            joinPostedRef.current = false;
            return;
          }
          void postAppointmentJoin(aptId, body)
            .then((res) => {
              const st = res.appointment?.status;
              if (st) {
                const n = normalizeAppointmentStatus(String(st));
                if (isTerminalAppointmentStatus(n)) {
                  setTerminalBanner(n);
                  void doLeave();
                  return;
                }
              }
              startHeartbeat();
            })
            .catch(() => {
              joinPostedRef.current = false;
            });
        };

        const onLeft = () => {
          void doLeave();
        };

        api.addEventListener("videoConferenceJoined", onJoined);
        api.addEventListener("videoConferenceLeft", onLeft);
        api.addEventListener("readyToClose", onLeft);
      } catch {
        if (!disposed) setSdkError("Failed to load the video meeting.");
      }
    })();

    return () => {
      disposed = true;
      window.removeEventListener("pagehide", onPageHide);
      stopHeartbeat();
      const api = jitsiApiRef.current;
      jitsiApiRef.current = null;
      if (api) {
        try {
          api.dispose();
        } catch {
          /* ignore */
        }
      }
      if (!leaveSentRef.current && sessionBodyRef.current) {
        leaveAppointmentSessionKeepalive(
          appointmentIdRef.current,
          sessionBodyRef.current,
        );
      }
      if (container) container.textContent = "";
    };
  }, [
    resolving,
    appointment,
    sessionBody,
    meetLink,
    isTerminal,
    isVideo,
    terminalBanner,
    user?.name,
    user?.email,
    stopHeartbeat,
    doLeave,
  ]);

  if (!authLoading && !user) {
    return <Navigate to="/login" replace state={{ from: `/appointments/${appointmentIdParam}/video` }} />;
  }

  if (authLoading || !user) {
    return (
      <div className="fixed inset-0 z-300 flex items-center justify-center bg-[#070a0f]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#44666C]/30 blur-xl animate-pulse" />
            <Loader2 className="relative w-12 h-12 text-[#7eb8aa] animate-spin" />
          </div>
          <p className="text-sm text-stone-400 tracking-wide">Signing you in…</p>
        </div>
      </div>
    );
  }

  if (Number.isNaN(appointmentNumericId) || appointmentNumericId < 1) {
    return <Navigate to={dashboardPath} replace />;
  }

  const counterpartyLabel =
    sessionRole === "EXPERT"
      ? (appointment && "user" in appointment
          ? appointment.user?.name?.trim() ||
            appointment.user?.email ||
            "Client"
          : "Client session")
      : appointment && "expert" in appointment && appointment.expert
        ? appointment.expert.user?.name?.trim() ||
          appointment.expert.user?.email ||
          "Expert"
        : "Video session";

  const showJitsiStage =
    appointment &&
    isVideo &&
    meetLink &&
    parseJitsiMeetLink(meetLink) &&
    !isTerminal &&
    !terminalBanner &&
    !sdkError;

  return (
    <div className="fixed inset-0 z-250 flex flex-col overflow-hidden bg-[#070a0f] text-white">
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#44666C]/25 blur-[100px]" />
        <div className="absolute -bottom-48 -left-24 h-112 w-md rounded-full bg-[#2d4a52]/30 blur-[120px]" />
      </div>

      <header className="relative z-10 shrink-0 border-b border-white/8 bg-[#0c1219]/85 backdrop-blur-xl">
        <div className="flex items-center gap-2 sm:gap-4 px-3 py-2.5 sm:px-5 sm:py-3.5">
          <button
            type="button"
            onClick={() => {
              void doLeave().finally(() => navigate(dashboardPath));
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-stone-200 transition hover:bg-white/10 hover:border-white/15"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Leave</span>
          </button>

          <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#44666C] to-[#2d4a52] shadow-lg shadow-black/20">
                <Video className="h-4 w-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="truncate text-sm font-semibold tracking-tight text-white sm:text-base">
                    {counterpartyLabel}
                  </h1>
                  {showJitsiStage ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>
                      Live
                    </span>
                  ) : null}
                </div>
                <p className="truncate text-xs text-stone-500">
                  Appointment #{appointmentNumericId}
                  {sessionRole === "EXPERT" ? " · Expert view" : " · Your booking"}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/3 px-2.5 py-1.5 text-[11px] text-stone-500">
            <Shield className="h-3.5 w-3.5 text-[#7eb8aa]/80" />
            <span>Private session</span>
          </div>

          {appointment?.meetLink ? (
            <a
              href={appointment.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 text-xs font-medium text-[#a8d4c4] transition hover:bg-white/10 sm:px-3"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">New tab</span>
            </a>
          ) : null}
        </div>
      </header>

      {terminalBanner ? (
        <div className="relative z-10 mx-3 mt-3 rounded-2xl border border-white/10 bg-[#121a24]/90 px-4 py-3 text-sm shadow-xl backdrop-blur-md sm:mx-4">
          <p className="text-stone-300">
            Session ended — status{" "}
            <span className="font-semibold text-[#7eb8aa]">{terminalBanner}</span>
          </p>
          <Link
            to={dashboardPath}
            className="mt-2 inline-flex text-sm font-medium text-[#a8d4c4] underline-offset-2 hover:underline"
          >
            Return to dashboard
          </Link>
        </div>
      ) : null}

      <main className="relative z-1 flex min-h-0 flex-1 flex-col overflow-hidden">
        {resolveError ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/4 p-8 max-w-md">
              <p className="text-stone-300">{resolveError}</p>
              <Link
                to={dashboardPath}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#44666C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#365a62]"
              >
                Go to dashboard
              </Link>
            </div>
          </div>
        ) : resolving ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
            <div className="relative w-full max-w-lg aspect-video rounded-2xl border border-white/10 bg-[#0a0e14] shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-[#44666C]/20 via-transparent to-[#2d4a52]/20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-10 w-10 text-[#7eb8aa] animate-spin" />
                <p className="text-sm text-stone-400">Preparing your room…</p>
              </div>
            </div>
          </div>
        ) : !appointment ? (
          <div className="flex flex-1 items-center justify-center text-stone-500">
            No appointment loaded.
          </div>
        ) : isTerminal ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
            <p className="max-w-md text-stone-300">
              This appointment is no longer active ({appointment.status}).
            </p>
            <Link
              to={dashboardPath}
              className="rounded-xl bg-[#44666C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#365a62]"
            >
              Back to dashboard
            </Link>
          </div>
        ) : !isVideo ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
            <p className="max-w-md text-stone-300">
              Tracked video is only for video appointments. Use your link or
              join via phone or chat as arranged.
            </p>
            {appointment.meetLink ? (
              <a
                href={appointment.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#44666C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#365a62]"
              >
                <ExternalLink className="h-4 w-4" />
                Open link
              </a>
            ) : null}
          </div>
        ) : !appointment.meetLink ||
          !parseJitsiMeetLink(appointment.meetLink) ? (
          <div className="flex flex-1 items-center justify-center p-8 text-center text-stone-400">
            No meeting link is available for this appointment yet.
          </div>
        ) : sdkError ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
            <p className="text-red-300/90">{sdkError}</p>
            <a
              href={appointment.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/15"
            >
              Open meeting in new tab
            </a>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col p-2 sm:p-3 md:p-4">
            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/12 bg-black shadow-[0_0_0_1px_rgba(0,0,0,0.5),0_25px_50px_-12px_rgba(0,0,0,0.7)] ring-1 ring-black/40">
              <div
                ref={containerRef}
                className="relative min-h-0 w-full flex-1 [&_iframe]:h-full! [&_iframe]:min-h-0! [&_iframe]:w-full!"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/60 to-transparent" />
            </div>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-[11px] text-stone-500 sm:text-xs">
              <Sparkles className="h-3 w-3 text-[#44666C]/80" />
              Hang up in the meeting controls below when you are done — we will
              sync your session automatically.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
