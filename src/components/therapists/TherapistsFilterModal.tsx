import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import type { FilterState } from "../../types/filters";

type TherapistsFilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApply: () => void;
};

export default function TherapistsFilterModal({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApply,
}: TherapistsFilterModalProps) {
  const { t } = useTranslation(["common", "experts"]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  // Only sync filters when modal opens, not when filters prop changes while modal is open
  const prevIsOpenRef = useRef(isOpen);

  useEffect(() => {
    // Only sync when modal transitions from closed to open
    if (isOpen && !prevIsOpenRef.current) {
      setLocalFilters(filters);
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen, filters]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateFilter = (key: keyof FilterState, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleLanguage = (language: string) => {
    const currentLanguages = localFilters.languages || [];
    const updatedLanguages = currentLanguages.includes(language)
      ? currentLanguages.filter((lang) => lang !== language)
      : [...currentLanguages, language];
    updateFilter("languages", updatedLanguages);
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onApply();
  };

  const handleClear = () => {
    const clearedFilters: FilterState = {
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
      minExperience: undefined,
      languages: [],
      searchName: undefined,
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onApply();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[100px]">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className="relative bg-white rounded-[15px] shadow-lg max-w-[600px] w-full mx-[20px] max-h-[85vh] flex flex-col overflow-hidden"
      >
        <div className="flex justify-between items-center p-[25px] pb-[20px] border-b border-gray-200 flex-shrink-0">
          <h2 className="text-[20px] font-semibold text-[#304048]">
            {t("selectFilters", { ns: "common" })}
          </h2>
          <button
            onClick={onClose}
            className="p-[5px] hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-[#304048] cursor-pointer" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-[25px] py-[20px]">
          {/* Price Range */}
          <div className="mb-[25px]">
            <label className="block text-[14px] font-medium text-[#304048] mb-[10px]">
              {t("price", { ns: "common" })} (₹ per hour)
            </label>
            <div className="flex items-center gap-[10px]">
              <input
                type="number"
                placeholder="Min"
                value={localFilters.minPrice || ""}
                onChange={(e) =>
                  updateFilter(
                    "minPrice",
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="flex-1 px-[12px] py-[8px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#304048] text-sm"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={localFilters.maxPrice || ""}
                onChange={(e) =>
                  updateFilter(
                    "maxPrice",
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="flex-1 px-[12px] py-[8px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#304048] text-sm"
              />
            </div>
          </div>

          {/* Rating */}
          <div className="mb-[25px]">
            <label className="block text-[14px] font-medium text-[#304048] mb-[10px]">
              {t("rating", { ns: "common" })} (Minimum)
            </label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="0.0 - 5.0"
              value={localFilters.minRating || ""}
              onChange={(e) =>
                updateFilter(
                  "minRating",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full px-[12px] py-[8px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#304048] text-sm"
            />
          </div>

          {/* Experience */}
          <div className="mb-[25px]">
            <label className="block text-[14px] font-medium text-[#304048] mb-[10px]">
              {t("experience", { ns: "common" })} (Minimum years)
            </label>
            <input
              type="number"
              min="0"
              placeholder="Years of experience"
              value={localFilters.minExperience || ""}
              onChange={(e) =>
                updateFilter(
                  "minExperience",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full px-[12px] py-[8px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#304048] text-sm"
            />
          </div>

          {/* Languages */}
          <div className="mb-[25px]">
            <label className="block text-[14px] font-medium text-[#304048] mb-[10px]">
              {t("languages", { ns: "common" })}
            </label>
            <div className="flex flex-col gap-[8px]">
              {["hindi", "english"].map((lang) => (
                <label
                  key={lang}
                  className="flex items-center gap-[10px] cursor-pointer p-[10px] hover:bg-gray-50 rounded-[10px] transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={localFilters.languages?.includes(lang) || false}
                    onChange={() => toggleLanguage(lang)}
                    className="w-[18px] h-[18px] cursor-pointer accent-[#304048]"
                  />
                  <span className="text-[14px] text-[#304048] capitalize">
                    {t(lang, { ns: "experts" })}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-[25px] pt-[20px] border-t border-gray-200 flex-shrink-0 flex gap-[10px]">
          <button
            onClick={handleClear}
            className="flex-1 bg-gray-200 text-[#304048] py-[12px] rounded-[10px] font-medium hover:bg-gray-300 transition-colors"
          >
            {t("clear", { ns: "common" })}
          </button>
          <button
            onClick={handleApply}
            className="flex-1 bg-[#304048] text-white py-[12px] rounded-[10px] font-medium hover:bg-[#304048]/90 transition-colors"
          >
            {t("apply", { ns: "common" })}
          </button>
        </div>
      </div>
    </div>
  );
}
