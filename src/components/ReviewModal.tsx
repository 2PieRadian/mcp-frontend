import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, Star, Loader2 } from "lucide-react";
import {
  postAppointmentReview,
  patchAppointmentReview,
  getAppointmentReview,
  ApiHttpError,
  type AppointmentReview,
} from "../lib/api";

type ReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  appointmentId: number;
  onSuccess?: (review: AppointmentReview) => void;
};

export default function ReviewModal({
  isOpen,
  onClose,
  appointmentId,
  onSuccess,
}: ReviewModalProps) {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [existingReview, setExistingReview] = useState<AppointmentReview | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isEdit = !!existingReview;
  const maxCommentLength = 2000;

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    getAppointmentReview(appointmentId)
      .then((review) => {
        setExistingReview(review);
        if (review) {
          setRating(review.rating);
          setComment(review.comment || "");
        } else {
          setRating(0);
          setComment("");
        }
      })
      .catch(() => {
        setExistingReview(null);
        setRating(0);
        setComment("");
      })
      .finally(() => setLoading(false));
  }, [isOpen, appointmentId]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (rating < 1 || rating > 5) {
      setError(t("reviewRequired"));
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      let review: AppointmentReview;
      if (isEdit) {
        const res = await patchAppointmentReview(appointmentId, {
          rating,
          comment: comment.trim() || null,
        });
        review = res.review;
        setSuccess(t("reviewUpdateSuccess"));
      } else {
        const res = await postAppointmentReview(
          appointmentId,
          rating,
          comment.trim() || undefined,
        );
        review = res.review;
        setSuccess(t("reviewSubmitSuccess"));
      }
      setExistingReview(review);
      onSuccess?.(review);
      setTimeout(() => onClose(), 1200);
    } catch (err) {
      if (err instanceof ApiHttpError) {
        if (err.status === 403) {
          setError(t("reviewDeadlinePassed"));
        } else if (err.status === 409) {
          setError(t("reviewAlreadyExists"));
        } else {
          setError(err.message);
        }
      } else {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !submitting) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#304048]">
            {isEdit ? t("reviewEditTitle") : t("reviewTitle")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-5">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#44666C] animate-spin" />
            </div>
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {t("reviewRatingLabel")}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const filled = star <= (hoverRating || rating);
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#44666C]/30 rounded"
                        aria-label={t("reviewStarAriaLabel", { rating: star })}
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            filled
                              ? "fill-amber-400 text-amber-400"
                              : "fill-none text-gray-300"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="review-comment"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  {t("reviewCommentLabel")}
                </label>
                <textarea
                  id="review-comment"
                  value={comment}
                  onChange={(e) =>
                    setComment(e.target.value.slice(0, maxCommentLength))
                  }
                  placeholder={t("reviewCommentPlaceholder")}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-[#44666C]/30 focus:border-[#44666C] transition-colors text-sm"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {t("reviewCharacterCount", { count: comment.length })}
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
                  {success}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={submitting}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {t("rescheduleCancel")}
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting || rating < 1}
                  className="flex-1 px-4 py-3 bg-[#44666C] text-white rounded-xl font-semibold text-sm hover:bg-[#365a62] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("reviewSubmitting")}
                    </>
                  ) : isEdit ? (
                    t("reviewUpdate")
                  ) : (
                    t("reviewSubmit")
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
