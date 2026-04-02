import { Star, Loader2, Zap } from "lucide-react";
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
  className,
}: {
  name: string;
  image: string;
  className?: string;
}) {
  const [loadFailed, setLoadFailed] = useState(false);
  const trimmed = image?.trim() ?? "";
  const showImage = Boolean(trimmed) && !loadFailed;

  useEffect(() => {
    setLoadFailed(false);
  }, [trimmed]);

  const initial = nameInitial(name);
  const boxClass =
    "rounded-lg bg-[#44666C]/15 text-[#44666C] flex items-center justify-center font-semibold select-none " +
    (className ?? "");

  if (showImage) {
    return (
      <img
        src={trimmed}
        alt=""
        className={className}
        onError={() => setLoadFailed(true)}
      />
    );
  }

  return (
    <div className={boxClass} aria-hidden>
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
  expertData?: ApiExpert; // Full expert data to pass to details page
  professionalTitle: string;
};

type NextSlotResponse = {
  day: string; // "MONDAY", "TUESDAY", etc.
  date: number; // Day of month (1-31)
  month: number; // Month number (1-12)
  year: number; // Full year (e.g., 2026)
  startTime: string; // "HH:mm" format (e.g., "09:00", "21:00")
  endTime: string; // "HH:mm" format (e.g., "10:00", "22:00")
} | null; // null when no slot is found

export default function ExpertCard({
  id,
  name,
  image,
  rating,
  ratingCount,
  tags,
  languages,
  nextSlot: _nextSlot, // Keep prop for backward compatibility but don't use it
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
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to fetch next slot");
        }

        const data: NextSlotResponse = await response.json();

        // API returns null when no slot is found, or an object when a slot exists
        setNextSlotData(data);
      } catch (error) {
        console.error("Error fetching next slot:", error);
        setNextSlotData(null);
      } finally {
        setIsLoadingNextSlot(false);
      }
    };

    fetchNextSlot();
  }, [id]);

  const formatNextSlot = (): string => {
    if (!nextSlotData) {
      return t("nextSlot", { ns: "common" }) || "Available soon";
    }

    try {
      // Construct Date objects from the API response fields
      // month is 1-12, but Date constructor expects 0-11, so subtract 1
      const startDate = new Date(
        nextSlotData.year,
        nextSlotData.month - 1,
        nextSlotData.date,
        ...nextSlotData.startTime.split(":").map(Number),
      );
      const endDate = new Date(
        nextSlotData.year,
        nextSlotData.month - 1,
        nextSlotData.date,
        ...nextSlotData.endTime.split(":").map(Number),
      );

      // Format: "Feb 16, 2026 at 9:00 PM - 10:00 PM"
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      const startFormatted = startDate.toLocaleString("en-US", options);
      const endTime = endDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      return `${startFormatted} - ${endTime}`;
    } catch (error) {
      console.error("Error formatting slot time:", error);
      return t("nextSlot", { ns: "common" }) || "Available soon";
    }
  };

  const handleCardClick = () => {
    // Pass full expert data via navigation state
    navigate(`/expert/${id}`, { state: { expert: expertData } });
  };

  const hasLanguages = Boolean(languages?.trim());
  const isEmergencyAvailable = expertData?.emergencyAvailable ?? false;

  return (
    <div
      onClick={handleCardClick}
      className={`Expert-Card border flex flex-col justify-between transform hover:scale-[1.011] duration-100 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] transition-all p-[15px] relative rounded-[15px] w-full cursor-pointer ${
        isEmergencyAvailable
          ? "border-amber-400 ring-1 ring-amber-200"
          : "border-[#B5B5B5]"
      }`}
    >
      {/* Emergency Available Badge */}
      {isEmergencyAvailable && (
        <div className="absolute -top-2 -right-2 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-md">
            <Zap className="w-3 h-3" />
            {t("emergencyAvailable")}
          </span>
        </div>
      )}
      {/* Mobile Layout: Stacked */}
      <div className="flex flex-col min-[600px]:hidden">
        <div className="Profile-Image w-full">
          <ExpertAvatar
            name={name}
            image={image}
            className="w-full aspect-square rounded-lg object-cover text-[clamp(36px,18vw,56px)]"
          />
        </div>

        <div className="flex flex-col justify-between flex-1 min-w-0 py-[10px] mt-[2px]">
          <div>
            <div className="Name-Container flex items-center justify-between gap-2">
              <h1 className="Name text-[16px] font-medium truncate">{name}</h1>
              {rating > 0 && (
                <div className="Rating-Container flex items-center gap-[4px] shrink-0">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="Rating-Value text-yellow-400 text-[14px]">
                    {rating}
                  </span>
                </div>
              )}
            </div>
            <div className="Specialization-Container text-[#8F9EA0] text-[13px] mt-[2px]">
              {professionalTitle}
            </div>
          </div>

          <div className="Next-Available-Slot text-[13px] flex flex-col gap-[2px] mt-[10px]">
            <span className="font-light text-[#8F9EA0]">
              {t("nextAvailableSlot")}
            </span>
            {isLoadingNextSlot ? (
              <Loader2 className="w-3 h-3 text-[#8F9EA0] animate-spin" />
            ) : (
              <span className="font-medium text-[#516A6E] text-[14px]">
                {formatNextSlot()}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Section: Professional Title, Tags, Languages, Price */}
        <div className="mt-[12px] pt-[12px] border-t border-gray-200">
          <div className="Tags-Container text-[#516A6E] text-[13px]">
            {tags}
          </div>

          {hasLanguages && (
            <div className="Languages-Container text-[#516A6E] mt-[6px] text-[13px]">
              <span className="text-[#8F9EA0]">{t("speaks")}</span>
              {languages}
            </div>
          )}

          <div className="Price-Container mt-[10px]">
            {expertData?.isFreeSessionAvailable ? (
              <div className="space-y-[4px]">
                <div className="flex items-center gap-[6px] flex-wrap">
                  <p
                    className="text-[14px] font-medium text-gray-400"
                    style={{ textDecoration: "line-through" }}
                  >
                    ₹ {price}
                  </p>
                  <p className="text-[20px] font-bold text-green-600">₹0</p>
                  <p className="text-[13px] text-green-600">
                    {t("forFirstTime")}
                  </p>
                  <p className="text-[13px] text-gray-500">· 30 min</p>
                </div>
                <p className="text-[12px] text-gray-400">
                  {t("onlyPaidAppointmentsOneHour")}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-[6px]">
                <p className="text-[18px] font-medium">₹ {price}</p>
                <p className="text-[13px] text-gray-500">
                  {t("for60MinConsultation")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout: Side by side */}
      <div className="hidden min-[600px]:flex items-start justify-between gap-[16px] min-[800px]:gap-[20px]">
        <div className="Profile-Image flex flex-col flex-1 min-w-0 w-full">
          <ExpertAvatar
            name={name}
            image={image}
            className="w-full aspect-square rounded-lg object-cover text-[clamp(32px,6vw,52px)]"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="w-full border border-[#44666C] hover:bg-[#44666C] hover:text-white transition-colors duration-200 text-[#44666C] text-center cursor-pointer text-[14px] font-medium rounded-[20px] py-[4px] mt-[8px]"
          >
            {t("viewProfile")}
          </button>
        </div>

        <div className="Profile-Details flex flex-col flex-2">
          <div className="Name-Container flex items-center justify-between">
            <h1 className="Name text-[16px] min-[800px]:text-[21px] font-medium">
              {name}
            </h1>

            {rating > 0 && (
              <div className="Rating-Container flex items-center gap-[5px]">
                <Star size={18} className="fill-yellow-400 text-yellow-400" />
                <span className="Rating-Value text-yellow-400 text-[16px]">
                  {rating}
                </span>
                <span className="Rating-Count text-gray-500 text-[14px]">
                  ({ratingCount})
                </span>
              </div>
            )}
          </div>

          <div className="Specialization-Container text-[#8F9EA0] text-[14px]">
            {professionalTitle}
          </div>

          <div className="Tags-Container text-[#516A6E] text-[14px] mt-[8px]">
            {tags}
          </div>

          {hasLanguages && (
            <div className="Languages-Container text-[#516A6E] mt-[8px] text-[14px]">
              <span className="text-[#8F9EA0]">{t("speaks")} </span>
              {languages}
            </div>
          )}

          <div className="Next-Available-Slot mt-[8px] text-[14px] flex items-center gap-2 flex-wrap">
            <span className="font-light text-[#8F9EA0] whitespace-nowrap">
              {t("nextAvailableSlot")}{" "}
            </span>
            {isLoadingNextSlot ? (
              <Loader2 className="w-3 h-3 text-[#8F9EA0] animate-spin shrink-0" />
            ) : (
              <span className="font-medium text-[#516A6E] min-w-0 text-[16px]">
                {formatNextSlot()}
              </span>
            )}
          </div>

          <div className="Price-Container mt-[8px]">
            {expertData?.isFreeSessionAvailable ? (
              <div className="space-y-[6px]">
                <div className="flex items-center gap-[4px] flex-wrap">
                  <p
                    className="text-[16px] font-medium text-gray-400"
                    style={{ textDecoration: "line-through" }}
                  >
                    ₹ {price}
                  </p>
                  <p className="text-[24px] font-bold text-green-600">₹0</p>
                  <p className="text-[14px] text-green-600">for first time</p>
                  <p className="text-[14px] text-gray-500">
                    · 30 min free consultation
                  </p>
                </div>
                <p className="text-[13px] text-gray-400">
                  Only paid appointments are 1 hour long
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-[8px]">
                <p className="text-[21px] font-medium">₹ {price}</p>
                <p className="text-[14px] text-gray-500">
                  {t("for60MinConsultation")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          handleCardClick();
        }}
        className="mt-[16px] bg-[#44666C] text-white text-center cursor-pointer text-[16px] font-medium rounded-[20px] py-[8px]"
      >
        {expertData?.isFreeSessionAvailable !== false
          ? "Book Free Appointment"
          : "Book Appointment"}
      </div>
    </div>
  );
}
