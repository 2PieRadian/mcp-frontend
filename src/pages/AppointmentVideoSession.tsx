import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  Video,
  Shield,
  MessageSquareText,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import {
  getExpertAppointments,
  getMyAppointments,
  isTerminalAppointmentStatus,
  isScheduledAwaitingJoinInBookedWindow,
  expertAuthUserOwnsAppointment,
  postAppointmentJoin,
  BACKEND_URL,
  type AppointmentStatus,
  type ExpertAppointment,
  type MyAppointment,
} from "../lib/api";
import { WebRTCSession } from "../components/WebRTCSession";

export default function AppointmentVideoSession() {
  const { appointmentId: appointmentIdParam } = useParams<{
    appointmentId: string;
  }>();
  const navigate = useNavigate();
  const { t } = useTranslation("common");
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
  const [terminalBanner] = useState<AppointmentStatus | null>(null);
  const [hasJoinedCall, setHasJoinedCall] = useState(false);

  const dashboardPath =
    user?.role === "EXPERT" ? "/dashboard/expert" : "/dashboard";

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
          const apt = res.appointments.find(
            (a) => a.id === appointmentNumericId,
          );
          if (!apt || !expertAuthUserOwnsAppointment(apt, user)) {
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
          const apt = res.appointments.find(
            (a) => a.id === appointmentNumericId,
          );
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

  const handleJoinCall = useCallback(async () => {
    if (!sessionRole || !user?.id) return;
    try {
      await postAppointmentJoin(appointmentNumericId, {
        participantId: user.id,
        role: sessionRole,
      });
    } catch (e) {
      console.error("Failed to record join", e);
    }
    setHasJoinedCall(true);
  }, [appointmentNumericId, sessionRole, user?.id]);

  if (!authLoading && !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `/appointments/${appointmentIdParam}/video` }}
      />
    );
  }

  if (authLoading || !user) {
    return (
      <div className="fixed inset-0 z-300 flex items-center justify-center bg-[#070a0f]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#44666C]/30 blur-xl animate-pulse" />
            <Loader2 className="relative w-12 h-12 text-[#7eb8aa] animate-spin" />
          </div>
          <p className="text-sm text-stone-400 tracking-wide">
            Signing you in…
          </p>
        </div>
      </div>
    );
  }

  if (Number.isNaN(appointmentNumericId) || appointmentNumericId < 1) {
    return <Navigate to={dashboardPath} replace />;
  }

  const counterpartyLabel =
    sessionRole === "EXPERT"
      ? appointment && "user" in appointment
        ? appointment.user?.name?.trim() || appointment.user?.email || "Client"
        : "Client session"
      : appointment && "expert" in appointment && appointment.expert
        ? appointment.expert.user?.name?.trim() ||
          appointment.expert.user?.email ||
          "Expert"
        : "Video session";

  const showJitsiStage =
    appointment &&
    isVideo &&
    !isTerminal &&
    !terminalBanner &&
    hasJoinedCall;

  const showScheduledJoinHint =
    appointment &&
    isScheduledAwaitingJoinInBookedWindow(
      appointment.status,
      appointment.startAt,
      appointment.endAt,
    );

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
              navigate(dashboardPath);
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
                  {sessionRole === "EXPERT"
                    ? " · Expert view"
                    : " · Your booking"}
                </p>
                {appointment?.userConcern?.trim() ? (
                  <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-stone-400 sm:line-clamp-none sm:max-w-xl">
                    <span className="font-medium text-stone-500">
                      <MessageSquareText className="mr-1 inline size-3 align-text-bottom opacity-80" />
                      {sessionRole === "EXPERT"
                        ? t("appointmentConcernFromClient")
                        : t("appointmentConcernYouShared")}
                      :{" "}
                    </span>
                    {appointment.userConcern.trim()}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/3 px-2.5 py-1.5 text-[11px] text-stone-500">
            <Shield className="h-3.5 w-3.5 text-[#7eb8aa]/80" />
            <span>Private session</span>
          </div>

          {!hasJoinedCall && !isTerminal && isVideo ? (
            <button
              type="button"
              onClick={handleJoinCall}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-[#44666C] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#365a62] cursor-pointer"
            >
              <Video className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Join call</span>
            </button>
          ) : null}
        </div>
      </header>

      {showScheduledJoinHint && !terminalBanner ? (
        <div
          className="relative z-10 mx-3 mt-3 rounded-2xl border border-emerald-500/25 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-100 shadow-xl backdrop-blur-md sm:mx-4"
          role="status"
        >
          <p className="font-semibold text-emerald-50">
            {t("sessionHasStartedPleaseJoin")}
          </p>
        </div>
      ) : null}

      {terminalBanner ? (
        <div className="relative z-10 mx-3 mt-3 rounded-2xl border border-white/10 bg-[#121a24]/90 px-4 py-3 text-sm shadow-xl backdrop-blur-md sm:mx-4">
          <p className="text-stone-300">
            Session ended — status{" "}
            <span className="font-semibold text-[#7eb8aa]">
              {terminalBanner}
            </span>
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
              This session is not a video appointment. Use your phone or chat as arranged.
            </p>
          </div>
        ) : hasJoinedCall ? (
          <WebRTCSession
            appointmentId={appointmentNumericId.toString()}
            userId={user?.id?.toString() ?? ""}
            localParticipantName={user?.name?.trim() || user?.email || "You"}
            remoteParticipantName={counterpartyLabel}
            backendUrl={BACKEND_URL}
            onLeave={() => navigate(dashboardPath)}
            role={sessionRole as "USER" | "EXPERT"}
          />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/4 p-8 max-w-md">
              <p className="text-stone-300">
                You are ready to join the video session.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleJoinCall}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#44666C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#365a62] cursor-pointer"
                >
                  <Video className="h-4 w-4" />
                  Join Video Call
                </button>
                <Link
                  to={dashboardPath}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/15"
                >
                  Back to dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
