import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Star,
  ArrowLeft,
  Calendar,
  Award,
  Languages,
  FileText,
  LogIn,
  MessageSquare,
  Loader2,
  ChevronDown,
  BadgeCheck,
  Zap,
} from "lucide-react";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import BookingModal from "../components/BookingModal";
import UrgentRequestModal from "../components/UrgentRequestModal";
import ImageViewer from "../components/ImageViewer";
import type { ApiExpert } from "../types/experts";
import { getAvatarUrl, getExpertReviews, type PublicReview } from "../lib/api";
import { useAuth } from "../context/AuthContext";

function nameInitial(displayName: string): string {
  const t = displayName.trim();
  if (!t) return "?";
  return t.charAt(0).toUpperCase();
}

function ExpertProfileAvatar({
  displayName,
  avatarUrl,
}: {
  displayName: string;
  avatarUrl: string | undefined;
}) {
  const [loadFailed, setLoadFailed] = useState(false);
  useEffect(() => {
    setLoadFailed(false);
  }, [avatarUrl]);

  const showImage = Boolean(avatarUrl) && !loadFailed;
  const initial = nameInitial(displayName);
  const sizeClass = "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36";

  if (showImage && avatarUrl) {
    return (
      <ImageViewer src={avatarUrl} alt={displayName} className="relative">
        <img
          src={avatarUrl}
          alt={displayName}
          className={`relative ${sizeClass} rounded-full border-4 border-white object-cover shadow-2xl`}
          onError={() => setLoadFailed(true)}
        />
      </ImageViewer>
    );
  }

  return (
    <div
      className={`relative ${sizeClass} rounded-full border-4 border-white shadow-2xl flex items-center justify-center bg-white/25 text-white font-bold shrink-0`}
      style={{ fontSize: "clamp(2rem, 10vw, 3.25rem)" }}
      aria-hidden
    >
      {initial}
    </div>
  );
}

function ReviewerAvatar({
  name,
  avatarUrl,
}: {
  name: string | null;
  avatarUrl: string | null;
}) {
  const [loadFailed, setLoadFailed] = useState(false);
  const displayName = name || "User";
  const initial = displayName.trim().charAt(0).toUpperCase() || "?";
  const resolvedUrl = avatarUrl ? getAvatarUrl(avatarUrl) : undefined;

  if (resolvedUrl && !loadFailed) {
    return (
      <img
        src={resolvedUrl}
        alt={displayName}
        className="w-10 h-10 rounded-full object-cover shrink-0"
        onError={() => setLoadFailed(true)}
      />
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-[#44666C] text-white flex items-center justify-center text-sm font-semibold shrink-0">
      {initial}
    </div>
  );
}

function ReviewCard({ review }: { review: PublicReview }) {
  const { t } = useTranslation("common");
  const displayName = review.user.name || "Anonymous";
  const reviewDate = new Date(review.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
      <div className="flex items-start gap-3 mb-3">
        <ReviewerAvatar name={review.user.name} avatarUrl={review.user.avatar} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h4 className="font-semibold text-[#304048] truncate">{displayName}</h4>
            <span className="text-xs text-gray-500 shrink-0">{reviewDate}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={
                    star <= review.rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-none text-gray-300"
                  }
                />
              ))}
            </div>
            {review.appointment && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                <BadgeCheck size={12} />
                {t("expertReviewsVerifiedSession")}
              </span>
            )}
          </div>
        </div>
      </div>
      {review.comment && (
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
          {review.comment}
        </p>
      )}
    </div>
  );
}

export default function ExpertDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation(["common", "experts"]);
  const { user } = useAuth();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isUrgentRequestModalOpen, setIsUrgentRequestModalOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [reviewsTotalPages, setReviewsTotalPages] = useState(1);
  const [reviewsTotal, setReviewsTotal] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  // Get expert data from navigation state (passed via props)
  const expert = location.state?.expert as ApiExpert | undefined;

  if (!expert) {
    return (
      <div className="min-h-screen bg-white px-4 sm:px-5">
        <ResponsiveNavbar />
        <div className="max-w-6xl mx-auto py-6 sm:py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#44666C] hover:text-[#365a62] mb-6 transition-colors cursor-pointer"
            style={{ fontSize: "16px" }}
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            <span>Go Back</span>
          </button>
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
            <p
              className="text-red-600 mb-2"
              style={{ fontSize: "clamp(16px, 1rem, 20.8px)" }}
            >
              Expert not found
            </p>
            <p className="text-gray-600" style={{ fontSize: "16px" }}>
              Please navigate from an expert card to view their profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const formattedName = expert.user.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const formattedTitle =
    expert.professionalTitle.charAt(0).toUpperCase() +
    expert.professionalTitle.slice(1);

  const languagesList = expert.user.languages ?? [];
  const formattedLanguages = languagesList
    .map((lang) => lang.charAt(0).toUpperCase() + lang.slice(1))
    .join(", ");
  const hasLanguages = languagesList.length > 0;

  const avatarUrl = getAvatarUrl(expert.user.avatar);

  const fetchReviews = useCallback(
    async (page: number, append: boolean = false) => {
      if (!expert) return;
      setReviewsLoading(true);
      setReviewsError(null);
      try {
        const res = await getExpertReviews(expert.id, page, 5);
        setReviews((prev) => (append ? [...prev, ...res.reviews] : res.reviews));
        setReviewsPage(res.page);
        setReviewsTotalPages(res.totalPages);
        setReviewsTotal(res.total);
      } catch (err) {
        setReviewsError(
          err instanceof Error ? err.message : t("common:expertReviewsError"),
        );
      } finally {
        setReviewsLoading(false);
      }
    },
    [expert, t],
  );

  useEffect(() => {
    if (expert) {
      void fetchReviews(1);
    }
  }, [expert, fetchReviews]);

  const handleLoadMoreReviews = () => {
    if (reviewsPage < reviewsTotalPages && !reviewsLoading) {
      void fetchReviews(reviewsPage + 1, true);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-5">
      <ResponsiveNavbar />
      <div className="max-w-6xl mx-auto py-6 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#44666C] hover:text-[#365a62] mb-4 sm:mb-6 transition-colors cursor-pointer"
          style={{ fontSize: "16px" }}
        >
          <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          <span>Go Back</span>
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
          {/* Header Section - Profile Card */}
          <div className="bg-linear-to-r from-[#44666C] to-[#365a62] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "40px 40px",
                }}
              ></div>
            </div>

            <div className="relative p-6 sm:p-8 md:p-10 text-white">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-center">
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                    <div className="relative">
                      <ExpertProfileAvatar
                        displayName={formattedName}
                        avatarUrl={avatarUrl}
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left w-full space-y-4">
                  {/* Name and Title */}
                  <div className="space-y-2">
                    <h1
                      className="font-bold leading-tight drop-shadow-sm"
                      style={{ fontSize: "clamp(20.8px, 1.3rem, 27px)" }}
                    >
                      {formattedName}
                    </h1>
                    <p
                      className="opacity-95 font-medium"
                      style={{ fontSize: "clamp(16px, 1rem, 20.8px)" }}
                    >
                      {formattedTitle}
                    </p>
                  </div>

                  {/* Rating and Experience */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 flex-wrap justify-center md:justify-start">
                    {/* Rating Badge */}
                    <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/30 shadow-lg">
                      <Star
                        size={18}
                        className="fill-yellow-400 text-yellow-400 shrink-0"
                      />
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className="font-bold"
                          style={{ fontSize: "16px" }}
                        >
                          {expert.rating}
                        </span>
                        <span
                          className="opacity-90"
                          style={{ fontSize: "14px" }}
                        >
                          ({expert.totalReviews}{" "}
                          {expert.totalReviews === 1 ? "review" : "reviews"})
                        </span>
                      </div>
                    </div>

                    {/* Experience Badge */}
                    <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/30 shadow-lg">
                      <Award size={18} className="shrink-0" />
                      <span style={{ fontSize: "16px" }}>
                        {expert.yearsOfExperience}+ years of experience
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-5 sm:space-y-6 order-2 lg:order-1">
                {/* Bio */}
                <div>
                  <h2
                    className="font-semibold text-[#304048] mb-3 sm:mb-4 flex items-center gap-2"
                    style={{ fontSize: "clamp(16px, 1rem, 20.8px)" }}
                  >
                    <FileText size={20} className="sm:w-6 sm:h-6" />
                    About
                  </h2>
                  <p
                    className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                    style={{ fontSize: "16px" }}
                  >
                    {expert.bio || "No bio available."}
                  </p>
                </div>

                {/* Expertise Areas / Specializations */}
                <div>
                  <h2
                    className="font-semibold text-[#304048] mb-3 sm:mb-4"
                    style={{ fontSize: "clamp(16px, 1rem, 20.8px)" }}
                  >
                    Areas of Expertise
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {expert.expertSpecializations &&
                    expert.expertSpecializations.length > 0 ? (
                      expert.expertSpecializations.map((esp, index) => (
                        <span
                          key={index}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#E0ECEE] text-[#133945] rounded-full font-medium"
                          style={{ fontSize: "14px" }}
                        >
                          {esp.specialization.name}
                        </span>
                      ))
                    ) : expert.expertiseAreas &&
                      expert.expertiseAreas.length > 0 ? (
                      expert.expertiseAreas.map((area, index) => (
                        <span
                          key={index}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#E0ECEE] text-[#133945] rounded-full font-medium"
                          style={{ fontSize: "14px" }}
                        >
                          {area.charAt(0).toUpperCase() + area.slice(1)}
                        </span>
                      ))
                    ) : (
                      <span
                        className="text-gray-500"
                        style={{ fontSize: "16px" }}
                      >
                        No specializations listed
                      </span>
                    )}
                  </div>
                </div>

                {/* Languages and Experience - Side by Side */}
                <div
                  className={`grid gap-4 sm:gap-6 ${hasLanguages ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}
                >
                  {hasLanguages && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <Languages
                          size={20}
                          className="sm:w-6 sm:h-6 text-[#44666C]"
                        />
                        <h3
                          className="font-semibold text-[#304048]"
                          style={{ fontSize: "clamp(16px, 1rem, 20.8px)" }}
                        >
                          {t("experts:languagesLabel")}
                        </h3>
                      </div>
                      <p className="text-gray-700" style={{ fontSize: "16px" }}>
                        {formattedLanguages}
                      </p>
                    </div>
                  )}

                  {/* Experience Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <Award
                        size={20}
                        className="sm:w-6 sm:h-6 text-[#44666C]"
                      />
                      <h3
                        className="font-semibold text-[#304048]"
                        style={{ fontSize: "clamp(16px, 1rem, 20.8px)" }}
                      >
                        {t("common:experience")}
                      </h3>
                    </div>
                    <p
                      className="text-gray-700 font-medium"
                      style={{ fontSize: "clamp(16px, 1rem, 20.8px)" }}
                    >
                      {t("experts:experienceYears", {
                        count: expert.yearsOfExperience,
                      })}
                    </p>
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-6 sm:mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2
                      className="font-semibold text-[#304048] flex items-center gap-2"
                      style={{ fontSize: "clamp(16px, 1rem, 20.8px)" }}
                    >
                      <MessageSquare size={20} className="sm:w-6 sm:h-6 text-[#44666C]" />
                      {t("common:expertReviewsTitle")}
                      {reviewsTotal > 0 && (
                        <span className="text-gray-500 font-normal text-sm">
                          ({reviewsTotal})
                        </span>
                      )}
                    </h2>
                  </div>

                  {reviewsLoading && reviews.length === 0 ? (
                    <div className="flex items-center justify-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                      <Loader2 className="w-6 h-6 text-[#44666C] animate-spin" />
                      <span className="ml-3 text-gray-600">
                        {t("common:expertReviewsLoading")}
                      </span>
                    </div>
                  ) : reviewsError ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                      <p className="text-red-600 mb-4 text-sm">{reviewsError}</p>
                      <button
                        onClick={() => fetchReviews(1)}
                        className="px-4 py-2 bg-[#44666C] text-white rounded-lg hover:bg-[#365a62] text-sm font-medium"
                      >
                        {t("common:dashboardTryAgain")}
                      </button>
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                      <MessageSquare className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">
                        {t("common:expertReviewsEmpty")}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        {t("common:expertReviewsBeFirst")}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}

                      {/* Load more / pagination info */}
                      {reviewsTotal > reviews.length && (
                        <div className="text-center pt-2">
                          <p className="text-sm text-gray-500 mb-3">
                            {t("common:expertReviewsShowingCount", {
                              shown: reviews.length,
                              total: reviewsTotal,
                            })}
                          </p>
                          <button
                            onClick={handleLoadMoreReviews}
                            disabled={reviewsLoading}
                            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 disabled:opacity-50 transition-colors"
                          >
                            {reviewsLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                            {t("common:expertReviewsLoadMore")}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                {/* Price Card */}
                <div className="bg-[#E0ECEE] rounded-lg p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <h3
                      className="font-semibold text-[#304048]"
                      style={{ fontSize: "clamp(16px, 1rem, 20.8px)" }}
                    >
                      Session Fee
                    </h3>
                  </div>
                  {expert.isFreeSessionAvailable ? (
                    <div className="space-y-[6px]">
                      <div
                        className="font-bold flex items-center gap-1 flex-wrap"
                        style={{ fontSize: "clamp(20.8px, 1.3rem, 27px)" }}
                      >
                        <span
                          className="text-gray-400"
                          style={{
                            fontSize: "clamp(16px, 1rem, 20px)",
                            textDecoration: "line-through",
                          }}
                        >
                          ₹{expert.pricePerHour}
                        </span>
                        <span
                          className="text-green-600"
                          style={{ fontSize: "clamp(24px, 1.5rem, 30px)" }}
                        >
                          ₹0
                        </span>
                        <span
                          className="text-green-600 font-bold"
                          style={{ fontSize: "14px" }}
                        >
                          for first time
                        </span>
                        <span
                          className="text-gray-600"
                          style={{ fontSize: "14px", fontWeight: "normal" }}
                        >
                          30 min free consultation
                        </span>
                      </div>
                      <p
                        className="text-gray-400 mt-2"
                        style={{ fontSize: "13px" }}
                      >
                        Only paid appointments are 1 hour long
                      </p>
                    </div>
                  ) : (
                    <>
                      <div
                        className="font-bold text-[#44666C] mb-2"
                        style={{ fontSize: "clamp(20.8px, 1.3rem, 27px)" }}
                      >
                        ₹{expert.pricePerHour}
                      </div>
                      <p className="text-gray-600" style={{ fontSize: "14px" }}>
                        1 hour consultation
                      </p>
                    </>
                  )}
                </div>

                {/* Book Appointment Button */}
                <button
                  onClick={() => {
                    if (!user) {
                      setShowLoginPrompt(true);
                    } else {
                      setIsBookingModalOpen(true);
                    }
                  }}
                  className="w-full bg-[#44666C] hover:bg-[#365a62] active:bg-[#2d4d54] text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 sm:hover:-translate-y-1 cursor-pointer"
                  style={{ fontSize: "16px" }}
                >
                  <Calendar size={18} className="sm:w-5 sm:h-5" />
                  <span>
                    {expert.isFreeSessionAvailable !== false
                      ? "Book Free Appointment"
                      : "Book Appointment"}
                  </span>
                </button>

                {/* Urgent Request Button - shown when expert accepts emergency */}
                {expert.emergencyAvailable && (
                  <button
                    onClick={() => {
                      if (!user) {
                        setShowLoginPrompt(true);
                      } else {
                        setIsUrgentRequestModalOpen(true);
                      }
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 sm:hover:-translate-y-1 cursor-pointer"
                    style={{ fontSize: "16px" }}
                  >
                    <Zap size={18} className="sm:w-5 sm:h-5" />
                    <span>{t("common:urgentRequestCTA")}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login required prompt */}
      {showLoginPrompt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          aria-modal="true"
          onClick={() => setShowLoginPrompt(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <LogIn className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="text-lg font-semibold text-[#304048] mb-2">
              Login required
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Please log in to book a session with {formattedName}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowLoginPrompt(false);
                  navigate(
                    `/login?redirect=${encodeURIComponent(location.pathname)}`,
                  );
                }}
                className="flex-1 px-4 py-2.5 bg-[#44666C] text-white rounded-xl font-medium hover:bg-[#365a62] flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Log in
              </button>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {expert && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          expertId={expert.id}
          expertName={formattedName}
          expertPrice={expert.isFreeSessionAvailable ? 0 : expert.pricePerHour}
          isFreeSessionAvailable={expert.isFreeSessionAvailable}
        />
      )}

      {/* Urgent Request Modal */}
      {expert && expert.emergencyAvailable && (
        <UrgentRequestModal
          isOpen={isUrgentRequestModalOpen}
          onClose={() => setIsUrgentRequestModalOpen(false)}
          expertId={expert.id}
          expertName={formattedName}
        />
      )}
    </div>
  );
}
