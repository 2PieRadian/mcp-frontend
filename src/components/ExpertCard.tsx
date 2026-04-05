import { Star, Loader2, Zap, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { ApiExpert } from "../types/experts";
import { BACKEND_URL } from "../lib/api";

function nameInitial(displayName: string): string {
  const t = displayName.trim();
  if (!t) return "?";
  return t.charAt(0).toUpperCase();
}

function ExpertAvatar({
  name,
  image,
  size = "md",
}: {
  name: string;
  image: string;
  size?: "sm" | "md" | "lg";
}) {
  const [loadFailed, setLoadFailed] = useState(false);
  const trimmed = image?.trim() ?? "";
  const showImage = Boolean(trimmed) && !loadFailed;

  useEffect(() => {
    setLoadFailed(false);
  }, [trimmed]);

  const initial = nameInitial(name);

  const sizeClasses = {
    sm: "w-14 h-14 text-lg",
    md: "w-20 h-20 text-2xl",
    lg: "w-24 h-24 text-3xl",
  };

  const baseClass = `${sizeClasses[size]} rounded-full object-cover shrink-0`;

  if (showImage) {
    return (
      <img
        src={trimmed}
        alt=""
        className={baseClass}
        onError={() => setLoadFailed(true)}
      />
    );
  }

  return (
    <div
      className={`${baseClass} bg-gradient-to-br from-teal-500 to-teal-700 text-white flex items-center justify-center font-semibold`}
      aria-hidden
    >
      {initial}
    </div>
  );
}

type ExpertCardProps = {
  id: number;
  name: string;
  image: string;
  rating: number;
  ratingCount: number;
  tags: string;
  languages: string;
  nextSlot: string;
  price: number;
  expertData?: ApiExpert;
  professionalTitle: string;
};

type NextSlotResponse = {
  day: string;
  date: number;
  month: number;
  year: number;
  startTime: string;
  endTime: string;
} | null;

export default function ExpertCard({
  id,
  name,
  image,
  rating,
  ratingCount,
  tags,
  languages,
  price,
  expertData,
  professionalTitle,
}: ExpertCardProps) {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [nextSlotData, setNextSlotData] = useState<NextSlotResponse>(null);
  const [isLoadingNextSlot, setIsLoadingNextSlot] = useState(true);

  useEffect(() => {
    const fetchNextSlot = async () => {
      setIsLoadingNextSlot(true);
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/appointments/availability/${id}/next-slot`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
          },
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data: NextSlotResponse = await response.json();
        setNextSlotData(data);
      } catch {
        setNextSlotData(null);
      } finally {
        setIsLoadingNextSlot(false);
      }
    };
    fetchNextSlot();
  }, [id]);

  const formatNextSlot = (): string => {
    if (!nextSlotData) return "Available soon";
    try {
      const startDate = new Date(
        nextSlotData.year,
        nextSlotData.month - 1,
        nextSlotData.date,
        ...nextSlotData.startTime.split(":").map(Number),
      );
      return startDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "Available soon";
    }
  };

  const handleCardClick = () => {
    navigate(`/expert/${id}`);
  };

  const hasLanguages = Boolean(languages?.trim());
  const isEmergencyAvailable = expertData?.emergencyAvailable ?? false;
  const isFreeSession = expertData?.isFreeSessionAvailable ?? false;
  const qualifications = expertData?.qualifications ?? [];

  return (
    <div
      onClick={handleCardClick}
      className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col ${
        isEmergencyAvailable
          ? "ring-2 ring-amber-400 ring-offset-2"
          : "border border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Top Section: Avatar + Info */}
        <div className="flex gap-4">
          <ExpertAvatar name={name} image={image} size="md" />

          <div className="flex-1 min-w-0">
            {/* Name */}
            <h3 className="font-bold text-gray-900 text-lg leading-tight truncate">
              {name}
            </h3>

            {/* Title */}
            <p className="text-gray-600 text-sm font-medium mt-1 truncate">
              {professionalTitle}
            </p>

            {/* Rating */}
            {rating > 0 && (
              <div className="flex items-center gap-1.5 mt-2">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium text-gray-900">
                  {rating}
                </span>
                <span className="text-xs text-gray-400">({ratingCount})</span>
              </div>
            )}
          </div>
        </div>

        {/* Tags / Specializations */}
        {tags && (
          <div className="mt-4">
            <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
              <span className="font-medium text-gray-800">
                {t("expertCardAreasOfExpertisePrefix")}
              </span>
              {tags}
            </p>
          </div>
        )}

        {/* Languages */}
        {hasLanguages && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-800">Speaks:</span>{" "}
              {languages}
            </p>
          </div>
        )}

        {qualifications.length === 1 && (
          <p className="text-xs text-teal-700 font-medium mt-2 line-clamp-2 flex items-start gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>
              {t("expertCardCredentialPreview", {
                degree: qualifications[0].degree,
                field: qualifications[0].field,
              })}
            </span>
          </p>
        )}
        {qualifications.length > 1 && (
          <p className="text-xs text-teal-700 font-medium mt-2 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span>
              {t("expertCardVerifiedCredentialsCount", {
                count: qualifications.length,
              })}
            </span>
          </p>
        )}

        {/* Next Slot */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between gap-2 py-3 px-4 bg-gray-50 rounded-xl">
            <span className="text-sm text-gray-600 shrink-0">Next slot</span>
            {isLoadingNextSlot ? (
              <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
            ) : (
              <span className="text-sm font-bold text-teal-700 truncate">
                {formatNextSlot()}
              </span>
            )}
          </div>
        </div>

        {/* Urgent Booking Badge (below Next Slot) */}
        {isEmergencyAvailable && (
          <div
            className="mt-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative group/urgent">
              <span
                tabIndex={0}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-xl shadow-md cursor-help outline-none transition-all duration-200 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2"
                title={t("expertCardUrgentBookingTooltip")}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                <Zap className="w-3.5 h-3.5 shrink-0" aria-hidden />
                <span>{t("expertCardUrgentBookingAvailable")}</span>
              </span>
              <div
                role="tooltip"
                className="pointer-events-none invisible absolute left-0 bottom-full z-30 mb-2 w-64 -translate-y-1 rounded-xl bg-gray-900/95 backdrop-blur-sm px-3.5 py-3 text-left text-xs font-normal leading-relaxed text-white shadow-2xl opacity-0 transition-all duration-200 group-hover/urgent:visible group-hover/urgent:translate-y-0 group-hover/urgent:opacity-100 group-focus-within/urgent:visible group-focus-within/urgent:translate-y-0 group-focus-within/urgent:opacity-100"
              >
                <span className="block">{t("expertCardUrgentBookingTooltip")}</span>
                <span
                  className="absolute top-full left-6 -mt-px h-0 w-0 border-x-[7px] border-t-[7px] border-x-transparent border-t-gray-900/95"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer: Price + CTA */}
      <div className="border-t border-gray-100 bg-gray-50/50 px-4 sm:px-5 py-3.5">
        <div className="flex items-center justify-between gap-3">
          {/* Price */}
          <div className="shrink-0">
            {isFreeSession ? (
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-400 line-through decoration-2">
                  ₹{price}
                </span>
                <span className="text-xl font-bold text-emerald-600 animate-mcp-free-rotate">
                  FREE
                </span>
              </div>
            ) : (
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-gray-900">
                  ₹{price}
                </span>
                <span className="text-xs text-gray-500">/hr</span>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="flex-1 max-w-[160px] py-2.5 px-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-sm font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-200 text-center cursor-pointer"
          >
            {isFreeSession ? "Book Free" : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
