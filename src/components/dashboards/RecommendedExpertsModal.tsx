import { CalendarClock, Loader2, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getRecommendedExperts } from "../../lib/api";
import type { ApiExpert } from "../../types/experts";

type RecommendedExpertsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ExpertWithNextSlot = ApiExpert & {
  nextSlot?: {
    day: string;
    date: number;
    month: number;
    year: number;
    startTime: string;
    endTime: string;
  } | null;
};

export default function RecommendedExpertsModal({
  isOpen,
  onClose,
}: RecommendedExpertsModalProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [experts, setExperts] = useState<ExpertWithNextSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError(null);
      getRecommendedExperts()
        .then((res) => setExperts(res.experts))
        .catch((err) => setError(err.message || "Failed to fetch experts"))
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const hasPreferences =
    user?.expertPreferences && user.expertPreferences.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-6 relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#1a2e35] mb-2">
          Recommended For You
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Experts matched to your preferences.
        </p>

        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-[#44666C]" />
              <p className="text-gray-500 font-medium">
                Finding the best matches...
              </p>
            </div>
          ) : !hasPreferences ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-[#E0ECEE] rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-[#44666C]" />
              </div>
              <h3 className="text-lg font-bold text-[#304048] mb-2">
                No Preferences Set
              </h3>
              <p className="text-gray-500 mb-6 max-w-sm">
                Set your expert preferences in your profile to get personalized
                recommendations.
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigate("/profile");
                }}
                className="px-6 py-2.5 bg-[#44666C] text-white rounded-full font-medium hover:bg-[#365a62] transition-colors"
              >
                Go to Profile
              </button>
            </div>
          ) : experts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No experts found matching your current preferences.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
              {experts.map((expert) => {
                const initial =
                  expert.user.name?.charAt(0)?.toUpperCase() ||
                  expert.user.email.charAt(0).toUpperCase();
                return (
                  <div
                    key={expert.id}
                    className="border border-gray-100 rounded-xl p-4 flex flex-col gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full bg-[#44666C] flex-shrink-0 flex items-center justify-center text-white text-xl font-bold overflow-hidden">
                        {expert.user.avatar ? (
                          <img
                            src={expert.user.avatar}
                            alt={expert.user.name || "Expert"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          initial
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-[#304048] text-lg truncate">
                          {expert.user.name || "Expert"}
                        </h3>
                        <p className="text-sm text-gray-500 truncate mb-1">
                          {expert.professionalTitle}
                        </p>
                        <div className="flex items-center gap-1.5 text-amber-500 text-sm font-semibold">
                          <Star className="w-4 h-4 fill-current" />
                          {expert.rating.toFixed(1)}{" "}
                          <span className="text-gray-400 font-normal">
                            ({expert.totalReviews})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {expert.expertSpecializations
                        ?.slice(0, 3)
                        .map((spec, i) => (
                          <span
                            key={i}
                            className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full font-medium truncate max-w-full"
                          >
                            {spec.specialization.name}
                          </span>
                        ))}
                      {(expert.expertSpecializations?.length || 0) > 3 && (
                        <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                          +{(expert.expertSpecializations?.length || 0) - 3}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#44666C]">
                          ₹{expert.pricePerHour}
                        </span>
                        <span className="text-xs text-gray-500">
                          per session
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/expert/${expert.id}`}
                          onClick={onClose}
                          className="px-4 py-2 border border-[#44666C] text-[#44666C] rounded-lg text-sm font-semibold hover:bg-[#E0ECEE] transition-colors"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>

                    {expert.nextSlot && (
                      <div className="bg-emerald-50 rounded-lg p-2.5 flex items-center gap-2 text-sm text-emerald-800 font-medium">
                        <CalendarClock className="w-4 h-4 shrink-0" />
                        <span className="truncate">
                          Next available:{" "}
                          {new Date(
                            expert.nextSlot.year,
                            expert.nextSlot.month - 1,
                            expert.nextSlot.date,
                          ).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}{" "}
                          at {expert.nextSlot.startTime}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
