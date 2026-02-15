import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, ExternalLink, User, Loader2 } from "lucide-react";
import type { UpcomingSession } from "../types";

type UpcomingSessionsTabProps = {
  sessions: UpcomingSession[];
  isLoading?: boolean;
  error?: string | null;
  onRefetch?: () => void;
};

const formatTimeLeft = (startTime: string, t: (key: string) => string): string => {
  const now = new Date();
  const start = new Date(startTime);
  const diff = start.getTime() - now.getTime();

  if (diff <= 0) return t("dashboardSessionStarted");

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function UpcomingSessionsTab({
  sessions,
  isLoading = false,
  error = null,
  onRefetch,
}: UpcomingSessionsTabProps) {
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  return (
    <section className="bg-[hsl(0,0%,97%)] shadow-m rounded-[16px] sm:rounded-[20px] p-[16px] sm:p-[24px]">
      <div className="flex items-center gap-[10px] mb-[20px]">
        <Calendar className="text-primary w-6 h-6" />
        <h2 className="text-[20px] sm:text-[24px] font-semibold text-logo-heading">
          {t("tabUpcomingSessions")}
        </h2>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-[40px]">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-[40px]">
          <p className="text-red-600 mb-3">{error}</p>
          {onRefetch && (
            <button
              type="button"
              onClick={onRefetch}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90"
            >
              {t("dashboardTryAgain")}
            </button>
          )}
        </div>
      ) : sessions.length === 0 ? (
        <p className="text-light-text text-center py-[40px]">
          {t("noUpcomingSessions")}
        </p>
      ) : (
        <div className="space-y-[16px]">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-[12px] sm:rounded-[16px] p-[16px] sm:p-[20px] border border-border-light/30 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-[16px]">
                <div className="flex-1 space-y-[12px]">
                  {/* User Profile - Clickable */}
                  <div className="flex items-center gap-[12px]">
                    <div
                      onClick={() => navigate(`/profile/${session.user.id}`)}
                      className="cursor-pointer flex items-center gap-[10px] hover:opacity-80 transition-opacity"
                    >
                      {session.user.avatarUrl ? (
                        <img
                          src={session.user.avatarUrl}
                          alt={session.user.name}
                          className="w-[40px] h-[40px] rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-[40px] h-[40px] rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-[15px] sm:text-[16px] text-logo-heading">
                          {session.user.name}
                        </p>
                        <p className="text-[12px] sm:text-[13px] text-light-text">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* User Reason */}
                  <div>
                    <p className="text-[12px] sm:text-[13px] text-gray-500 mb-[4px]">
                      Reason for Session
                    </p>
                    <p className="text-[14px] sm:text-[15px] text-light-text">
                      {session.userReason}
                    </p>
                  </div>

                  {/* Session Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
                    <div className="flex items-center gap-[8px]">
                      <Clock className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-[12px] text-gray-500">{t("dashboardDuration")}</p>
                        <p className="text-[14px] font-medium">
                          {session.duration} minutes
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[12px] text-gray-500">{t("dashboardStartsFrom")}</p>
                      <p className="text-[14px] font-medium">
                        {formatDateTime(session.startTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[12px] text-gray-500">{t("dashboardEndsAt")}</p>
                      <p className="text-[14px] font-medium">
                        {formatDateTime(session.endTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[12px] text-gray-500">{t("dashboardAmountPaid")}</p>
                      <p className="text-[14px] font-semibold text-green-600">
                        ₹{session.amountPaid.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[12px] sm:items-end">
                  {/* Countdown */}
                  <div className="bg-primary/10 rounded-[8px] px-[12px] py-[8px]">
                    <p className="text-[11px] text-gray-500 mb-[4px]">
                      Time Until Session
                    </p>
                    <p className="text-[16px] font-bold text-primary">
                      {formatTimeLeft(session.startTime, t)}
                    </p>
                  </div>

                  {/* Meet Link */}
                  {session.meetLink ? (
                    <a
                      href={session.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-[8px] bg-primary text-white px-[16px] py-[10px] rounded-full text-[14px] font-medium hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t("dashboardJoinSession")}
                    </a>
                  ) : (
                    <span className="text-gray-500 text-sm">{t("dashboardMeetingLinkNotSet")}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
