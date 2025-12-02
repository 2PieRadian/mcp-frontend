import { useNavigate } from "react-router-dom";
import { Calendar, Clock, ExternalLink, User } from "lucide-react";
import type { UpcomingSession } from "../types";

type UpcomingSessionsTabProps = {
  sessions: UpcomingSession[];
};

const formatTimeLeft = (startTime: string): string => {
  const now = new Date();
  const start = new Date(startTime);
  const diff = start.getTime() - now.getTime();

  if (diff <= 0) return "Session started";

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
}: UpcomingSessionsTabProps) {
  const navigate = useNavigate();

  return (
    <section className="bg-[hsl(0,0%,97%)] shadow-m rounded-[16px] sm:rounded-[20px] p-[16px] sm:p-[24px]">
      <div className="flex items-center gap-[10px] mb-[20px]">
        <Calendar className="text-primary w-6 h-6" />
        <h2 className="text-[20px] sm:text-[24px] font-semibold text-logo-heading">
          Upcoming Sessions
        </h2>
      </div>

      {sessions.length === 0 ? (
        <p className="text-light-text text-center py-[40px]">
          No upcoming sessions
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
                        <p className="text-[12px] text-gray-500">Duration</p>
                        <p className="text-[14px] font-medium">
                          {session.duration} minutes
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[12px] text-gray-500">Starts From</p>
                      <p className="text-[14px] font-medium">
                        {formatDateTime(session.startTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[12px] text-gray-500">Ends At</p>
                      <p className="text-[14px] font-medium">
                        {formatDateTime(session.endTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[12px] text-gray-500">Amount Paid</p>
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
                      {formatTimeLeft(session.startTime)}
                    </p>
                  </div>

                  {/* Meet Link */}
                  <a
                    href={session.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-[8px] bg-primary text-white px-[16px] py-[10px] rounded-full text-[14px] font-medium hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Join Meeting
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
