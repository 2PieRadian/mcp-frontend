import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Clock,
  Share2,
  Check,
  GraduationCap,
} from "lucide-react";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import BookingModal from "../components/BookingModal";
import UrgentRequestModal from "../components/UrgentRequestModal";
import ImageViewer from "../components/ImageViewer";
import {
  getAvatarUrl,
  getExpertReviews,
  getExpertById,
  type PublicReview,
  type ApiExpertFromApi,
} from "../lib/api";
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

  if (showImage && avatarUrl) {
    return (
      <ImageViewer src={avatarUrl} alt={displayName} className="relative">
        <img
          src={avatarUrl}
          alt={displayName}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-white shadow-xl"
          onError={() => setLoadFailed(true)}
        />
      </ImageViewer>
    );
  }

  return (
    <div
      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-4 ring-white shadow-xl flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-700 text-white font-bold text-xl sm:text-2xl"
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
        className="w-9 h-9 rounded-full object-cover shrink-0"
        onError={() => setLoadFailed(true)}
      />
    );
  }

  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white flex items-center justify-center text-sm font-semibold shrink-0">
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
    <div className="bg-gray-50 hover:bg-gray-100/80 border border-gray-100 rounded-2xl p-4 transition-colors">
      <div className="flex items-start gap-3 mb-2">
        <ReviewerAvatar
          name={review.user.name}
          avatarUrl={review.user.avatar}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h4 className="font-semibold text-gray-900 text-sm truncate">
              {displayName}
            </h4>
            <span className="text-xs text-gray-400">{reviewDate}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={12}
                  className={
                    star <= review.rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-none text-gray-300"
                  }
                />
              ))}
            </div>
            {review.appointment && (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full font-medium">
                <BadgeCheck size={10} />
                {t("expertReviewsVerifiedSession")}
              </span>
            )}
          </div>
        </div>
      </div>
      {review.comment && (
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap pl-12">
          {review.comment}
        </p>
      )}
    </div>
  );
}

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className || ""}`} />
  );
}

function ExpertDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="px-4 sm:px-6 lg:px-8 pt-2">
        <ResponsiveNavbar />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-20 sm:pb-24">
        {/* Back Button Skeleton */}
        <SkeletonPulse className="w-16 h-5 mb-4" />

        {/* Hero Card Skeleton */}
        <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 px-5 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              {/* Avatar Skeleton */}
              <SkeletonPulse className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shrink-0" />

              {/* Info Skeleton */}
              <div className="flex-1 text-center sm:text-left space-y-3">
                <SkeletonPulse className="h-7 w-48 mx-auto sm:mx-0" />
                <SkeletonPulse className="h-5 w-36 mx-auto sm:mx-0" />
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <SkeletonPulse className="h-8 w-20 rounded-full" />
                  <SkeletonPulse className="h-8 w-24 rounded-full" />
                  <SkeletonPulse className="h-8 w-28 rounded-full" />
                </div>
              </div>

              {/* Price Badge Skeleton - Desktop */}
              <div className="hidden sm:block">
                <SkeletonPulse className="w-[140px] h-24 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile CTA Skeleton */}
        <div className="lg:hidden space-y-3 mb-5">
          <SkeletonPulse className="h-32 rounded-2xl" />
          <SkeletonPulse className="h-12 rounded-full" />
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Skeleton */}
          <div className="order-2 lg:order-1 lg:col-span-2 space-y-5">
            {/* About Section Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
              <SkeletonPulse className="h-5 w-24 mb-4" />
              <div className="space-y-2">
                <SkeletonPulse className="h-4 w-full" />
                <SkeletonPulse className="h-4 w-full" />
                <SkeletonPulse className="h-4 w-3/4" />
              </div>
            </div>

            {/* Expertise Section Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
              <SkeletonPulse className="h-5 w-40 mb-4" />
              <div className="flex flex-wrap gap-2">
                <SkeletonPulse className="h-8 w-24 rounded-full" />
                <SkeletonPulse className="h-8 w-32 rounded-full" />
                <SkeletonPulse className="h-8 w-28 rounded-full" />
                <SkeletonPulse className="h-8 w-20 rounded-full" />
              </div>
            </div>

            {/* Reviews Section Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
              <SkeletonPulse className="h-5 w-24 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <SkeletonPulse className="w-9 h-9 rounded-full shrink-0" />
                      <div className="flex-1 space-y-2">
                        <SkeletonPulse className="h-4 w-32" />
                        <SkeletonPulse className="h-3 w-24" />
                        <SkeletonPulse className="h-4 w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="order-1 lg:order-2 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <SkeletonPulse className="h-5 w-24 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <SkeletonPulse className="w-9 h-9 rounded-xl" />
                    <div className="flex-1 space-y-1">
                      <SkeletonPulse className="h-4 w-20" />
                      <SkeletonPulse className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Card Skeleton - Desktop */}
            <div className="hidden lg:block">
              <SkeletonPulse className="h-28 rounded-2xl" />
            </div>

            {/* CTA Button Skeleton - Desktop */}
            <div className="hidden lg:block">
              <SkeletonPulse className="h-12 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExpertDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation(["common", "experts"]);
  const { user } = useAuth();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isUrgentRequestModalOpen, setIsUrgentRequestModalOpen] =
    useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const [expert, setExpert] = useState<ApiExpertFromApi | null>(null);
  const [expertLoading, setExpertLoading] = useState(true);
  const [expertError, setExpertError] = useState<string | null>(null);

  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [reviewsTotalPages, setReviewsTotalPages] = useState(1);
  const [reviewsTotal, setReviewsTotal] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isQuickInfoExpanded, setIsQuickInfoExpanded] = useState(true);
  const [shareCopied, setShareCopied] = useState(false);

  const expertId = id ? parseInt(id, 10) : null;

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = expert
      ? `${expert.user.name} - Expert Profile`
      : "Expert Profile";
    const shareText = expert
      ? `Check out ${expert.user.name}, ${expert.professionalTitle} on MindCurePath!`
      : "Check out this expert on MindCurePath!";

    // Try native share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or share failed, fall back to clipboard
      }
    }

    // Fall back to clipboard copy
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  // Fetch expert data on mount
  useEffect(() => {
    if (!expertId || isNaN(expertId)) {
      setExpertError("Invalid expert ID");
      setExpertLoading(false);
      return;
    }

    let cancelled = false;

    const fetchExpert = async () => {
      setExpertLoading(true);
      setExpertError(null);
      try {
        const data = await getExpertById(expertId);
        if (!cancelled) {
          setExpert(data);
        }
      } catch (err) {
        if (!cancelled) {
          setExpertError(
            err instanceof Error ? err.message : "Failed to load expert",
          );
        }
      } finally {
        if (!cancelled) {
          setExpertLoading(false);
        }
      }
    };

    void fetchExpert();

    return () => {
      cancelled = true;
    };
  }, [expertId]);

  const fetchReviews = useCallback(
    async (page: number, append: boolean = false) => {
      if (!expertId) return;
      setReviewsLoading(true);
      setReviewsError(null);
      try {
        const res = await getExpertReviews(expertId, page, 5);
        setReviews((prev) =>
          append ? [...prev, ...res.reviews] : res.reviews,
        );
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
    [expertId, t],
  );

  useEffect(() => {
    if (expertId && !isNaN(expertId)) {
      void fetchReviews(1);
    }
  }, [expertId, fetchReviews]);

  const handleLoadMoreReviews = () => {
    if (reviewsPage < reviewsTotalPages && !reviewsLoading) {
      void fetchReviews(reviewsPage + 1, true);
    }
  };

  // Show skeleton while loading
  if (expertLoading) {
    return <ExpertDetailsSkeleton />;
  }

  // Show error state
  if (expertError || !expert) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="px-4 sm:px-6 lg:px-8 pt-2">
          <ResponsiveNavbar />
        </div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors text-sm font-medium cursor-pointer"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-red-500 font-medium mb-2">
              {expertError || "Expert not found"}
            </p>
            <p className="text-gray-500 text-sm mb-4">
              Unable to load expert details. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 text-sm font-medium transition-colors cursor-pointer"
            >
              Retry
            </button>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="px-4 sm:px-6 lg:px-8 pt-2">
        <ResponsiveNavbar />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-20 sm:pb-24">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-800 mb-4 transition-colors text-sm font-medium group cursor-pointer"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back
        </button>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden mb-6">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 px-5 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="shrink-0">
                <ExpertProfileAvatar
                  displayName={formattedName}
                  avatarUrl={avatarUrl}
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {formattedName}
                </h1>
                <p className="text-teal-100 font-medium text-sm sm:text-base mb-3">
                  {formattedTitle}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Star size={14} className="fill-amber-300 text-amber-300" />
                    <span className="text-white font-semibold text-sm">
                      {expert.rating}
                    </span>
                    <span className="text-teal-100 text-xs">
                      ({expert.totalReviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Award size={14} className="text-teal-100" />
                    <span className="text-white text-sm">
                      {expert.yearsOfExperience}+ yrs
                    </span>
                  </div>
                  {hasLanguages && (
                    <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Languages size={14} className="text-teal-100" />
                      <span className="text-white text-sm">
                        {formattedLanguages}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Share & Price - Desktop */}
              <div className="hidden sm:flex flex-col gap-2.5 shrink-0">
                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer group"
                >
                  {shareCopied ? (
                    <>
                      <Check size={16} className="text-white" />
                      <span className="text-white text-sm font-medium">
                        Copied!
                      </span>
                    </>
                  ) : (
                    <>
                      <Share2
                        size={16}
                        className="text-white group-hover:scale-110 transition-transform"
                      />
                      <span className="text-white text-sm font-medium">
                        Share
                      </span>
                    </>
                  )}
                </button>

                {/* Price Badge */}
                <div className="bg-white rounded-xl px-4 py-3 text-center shadow-lg min-w-[130px]">
                  {expert.isFreeSessionAvailable ? (
                    <>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-400 line-through decoration-2 text-xs">
                          ₹{expert.pricePerHour}
                        </span>
                        <span className="text-2xl font-bold text-emerald-600">
                          FREE
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        First session
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-2xl font-bold text-emerald-600">
                        ₹{expert.pricePerHour}
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        per session
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Share Button */}
            <div className="sm:hidden mt-4 flex justify-center">
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer"
              >
                {shareCopied ? (
                  <>
                    <Check size={16} className="text-white" />
                    <span className="text-white text-sm font-medium">
                      Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Share2 size={16} className="text-white" />
                    <span className="text-white text-sm font-medium">
                      Share Profile
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile CTA Buttons (above About section) */}
        <div className="lg:hidden space-y-3 mb-5">
          <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-5 text-white">
            <h3 className="text-sm font-medium text-teal-100 mb-2">
              Session Fee
            </h3>
            {expert.isFreeSessionAvailable ? (
              <>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-teal-200 line-through decoration-2 text-lg">
                    ₹{expert.pricePerHour}
                  </span>
                  <span className="text-3xl font-bold">FREE</span>
                </div>
                <p className="text-teal-100 text-xs">
                  First 30-min session is free
                </p>
                <p className="text-teal-200 text-[10px] mt-2 opacity-80">
                  Paid sessions are 60 minutes
                </p>
              </>
            ) : (
              <>
                <div className="text-3xl font-bold mb-1">
                  ₹{expert.pricePerHour}
                </div>
                <p className="text-teal-100 text-xs">60 minute session</p>
              </>
            )}
          </div>

          <button
            onClick={() => {
              if (!user) {
                setShowLoginPrompt(true);
              } else {
                setIsBookingModalOpen(true);
              }
            }}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold rounded-full shadow-lg shadow-teal-500/25 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <Calendar size={18} />
            {expert.isFreeSessionAvailable
              ? "Book Free Session"
              : "Book Session"}
          </button>

          {expert.emergencyAvailable && (
            <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
              <p className="text-sm font-semibold text-amber-800">
                No slots found?
              </p>
              <p className="mt-1 text-xs text-amber-700">
                Request an urgent slot within the next 30 minutes.
              </p>
              <button
                onClick={() => {
                  if (!user) {
                    setShowLoginPrompt(true);
                  } else {
                    setIsUrgentRequestModalOpen(true);
                  }
                }}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-full shadow-lg shadow-amber-500/25 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <Zap size={18} />
                Request Urgent Session
              </button>
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="order-2 lg:order-1 lg:col-span-2 space-y-5">
            {/* About Section - Collapsible */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                type="button"
                onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                className="w-full flex items-center justify-between gap-2 p-5 sm:p-6 text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
                  <FileText size={18} className="text-teal-600" />
                  About
                </h2>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isAboutExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isAboutExpanded
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {expert.bio || "No bio available."}
                  </p>
                </div>
              </div>
            </section>

            {/* Expertise Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
              <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-3">
                Areas of Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {expert.expertSpecializations &&
                expert.expertSpecializations.length > 0 ? (
                  expert.expertSpecializations.map((esp, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-600 rounded-full text-sm font-medium border border-teal-100"
                    >
                      {esp.specialization.name}
                    </span>
                  ))
                ) : expert.expertiseAreas &&
                  expert.expertiseAreas.length > 0 ? (
                  expert.expertiseAreas.map((area, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-600 rounded-full text-sm font-medium border border-teal-100"
                    >
                      {area.charAt(0).toUpperCase() + area.slice(1)}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">
                    No specializations listed
                  </span>
                )}
              </div>
            </section>

            {/* Qualifications (verified only from API) */}
            {(expert.qualifications ?? []).length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
                <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
                  <GraduationCap size={18} className="text-teal-600" />
                  {t("common:expertQualificationsTitle")}
                </h2>
                <ul className="space-y-3">
                  {(expert.qualifications ?? []).map((q) => (
                    <li
                      key={q.id}
                      className="rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-3"
                    >
                      <p className="font-semibold text-gray-900">
                        {q.degree}
                        {q.year != null ? ` (${q.year})` : ""}
                      </p>
                      <p className="text-sm text-gray-700 mt-0.5">{q.field}</p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {q.institution}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Reviews Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
                  <MessageSquare size={18} className="text-teal-600" />
                  Reviews
                  {reviewsTotal > 0 && (
                    <span className="text-gray-400 font-normal text-sm">
                      ({reviewsTotal})
                    </span>
                  )}
                </h2>
              </div>

              {reviewsLoading && reviews.length === 0 ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />
                  <span className="ml-2 text-gray-500 text-sm">
                    {t("common:expertReviewsLoading")}
                  </span>
                </div>
              ) : reviewsError ? (
                <div className="text-center py-10">
                  <p className="text-red-500 mb-3 text-sm">{reviewsError}</p>
                  <button
                    onClick={() => fetchReviews(1)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 text-sm font-medium transition-colors cursor-pointer"
                  >
                    {t("common:dashboardTryAgain")}
                  </button>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-10">
                  <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 font-medium text-sm">
                    {t("common:expertReviewsEmpty")}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {t("common:expertReviewsBeFirst")}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}

                  {reviewsTotal > reviews.length && (
                    <div className="text-center pt-3">
                      <p className="text-xs text-gray-400 mb-2">
                        {t("common:expertReviewsShowingCount", {
                          shown: reviews.length,
                          total: reviewsTotal,
                        })}
                      </p>
                      <button
                        onClick={handleLoadMoreReviews}
                        disabled={reviewsLoading}
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer"
                      >
                        {reviewsLoading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                        {t("common:expertReviewsLoadMore")}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="order-1 lg:order-2 space-y-4">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                type="button"
                onClick={() => setIsQuickInfoExpanded((prev) => !prev)}
                className="w-full flex items-center justify-between gap-2 p-5 text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <h3 className="text-sm font-semibold text-gray-900">
                  Quick Info
                </h3>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isQuickInfoExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isQuickInfoExpanded
                    ? "max-h-[600px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-3 px-5 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                      <Star
                        size={16}
                        className="text-amber-500 fill-amber-500"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {expert.rating} Rating
                      </p>
                      <p className="text-xs text-gray-500">
                        {expert.totalReviews} reviews
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
                      <Award size={16} className="text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {expert.yearsOfExperience}+ Years
                      </p>
                      <p className="text-xs text-gray-500">Experience</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
                      <Clock size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {expert.isFreeSessionAvailable ? "30 min" : "60 min"}
                      </p>
                      <p className="text-xs text-gray-500">Session duration</p>
                    </div>
                  </div>
                  {hasLanguages && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                        <Languages size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Languages
                        </p>
                        <p className="text-xs text-gray-500">
                          {formattedLanguages}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="hidden lg:block bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-5 text-white">
              <h3 className="text-sm font-medium text-teal-100 mb-2">
                Session Fee
              </h3>
              {expert.isFreeSessionAvailable ? (
                <>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-teal-200 line-through decoration-2 text-lg">
                      ₹{expert.pricePerHour}
                    </span>
                    <span className="text-3xl font-bold">FREE</span>
                  </div>
                  <p className="text-teal-100 text-xs">
                    First 30-min session is free
                  </p>
                  <p className="text-teal-200 text-[10px] mt-2 opacity-80">
                    Paid sessions are 60 minutes
                  </p>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold mb-1">
                    ₹{expert.pricePerHour}
                  </div>
                  <p className="text-teal-100 text-xs">60 minute session</p>
                </>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:block space-y-3">
              <button
                onClick={() => {
                  if (!user) {
                    setShowLoginPrompt(true);
                  } else {
                    setIsBookingModalOpen(true);
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold rounded-full shadow-lg shadow-teal-500/25 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <Calendar size={18} />
                {expert.isFreeSessionAvailable
                  ? "Book Free Session"
                  : "Book Session"}
              </button>

              {expert.emergencyAvailable && (
                <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
                  <p className="text-sm font-semibold text-amber-800">
                    No slots found?
                  </p>
                  <p className="mt-1 text-xs text-amber-700">
                    Request an urgent slot within the next 30 minutes.
                  </p>
                  <button
                    onClick={() => {
                      if (!user) {
                        setShowLoginPrompt(true);
                      } else {
                        setIsUrgentRequestModalOpen(true);
                      }
                    }}
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-full shadow-lg shadow-amber-500/25 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <Zap size={18} />
                    Request Urgent Session
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setShowLoginPrompt(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center mb-4">
              <LogIn className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Login Required
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Please log in to book a session with {formattedName}.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowLoginPrompt(false);
                  navigate(
                    `/login?redirect=${encodeURIComponent(window.location.pathname)}`,
                  );
                }}
                className="w-full px-5 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" /> Log in
              </button>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="w-full px-5 py-3 text-gray-600 rounded-full font-medium hover:bg-gray-100 transition-colors cursor-pointer"
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
