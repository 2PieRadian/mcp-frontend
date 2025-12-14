import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { X, DollarSign, Star, Award, SlidersHorizontal } from "lucide-react";
import type { FilterState } from "../../types/filters";

type ExpertsFilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApply: () => void;
};

export default function ExpertsFilterModal({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApply,
}: ExpertsFilterModalProps) {
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

  const hasActiveFilters =
    localFilters.minPrice !== undefined ||
    localFilters.maxPrice !== undefined ||
    localFilters.minRating !== undefined ||
    localFilters.minExperience !== undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-2xl max-w-[520px] w-full max-h-[90vh] flex flex-col overflow-hidden transform transition-all"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#44666C] to-[#365a62] px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <SlidersHorizontal className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">
              {t("selectFilters", { ns: "common" })}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6">
          {/* Price Range */}
          <div className="bg-gradient-to-br from-[#f8fafb] to-white rounded-xl p-5 border border-[#e0e7eb] hover:border-[#44666C]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-[#44666C] to-[#365a62] rounded-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <label className="text-base font-semibold text-[#1a2e35]">
                {t("price", { ns: "common" })} (₹ per hour)
              </label>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
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
                  className="w-full px-4 py-3 border-2 border-[#e0e7eb] rounded-xl focus:outline-none focus:border-[#44666C] focus:ring-2 focus:ring-[#44666C]/20 transition-all text-sm font-medium"
                />
              </div>
              <span className="text-[#5a6c75] font-medium">-</span>
              <div className="flex-1">
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
                  className="w-full px-4 py-3 border-2 border-[#e0e7eb] rounded-xl focus:outline-none focus:border-[#44666C] focus:ring-2 focus:ring-[#44666C]/20 transition-all text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="bg-gradient-to-br from-[#f8fafb] to-white rounded-xl p-5 border border-[#e0e7eb] hover:border-[#44666C]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-[#44666C] to-[#365a62] rounded-lg">
                <Star className="w-5 h-5 text-white fill-white" />
              </div>
              <label className="text-base font-semibold text-[#1a2e35]">
                {t("rating", { ns: "common" })} (Minimum)
              </label>
            </div>
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
              className="w-full px-4 py-3 border-2 border-[#e0e7eb] rounded-xl focus:outline-none focus:border-[#44666C] focus:ring-2 focus:ring-[#44666C]/20 transition-all text-sm font-medium"
            />
          </div>

          {/* Experience */}
          <div className="bg-gradient-to-br from-[#f8fafb] to-white rounded-xl p-5 border border-[#e0e7eb] hover:border-[#44666C]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-[#44666C] to-[#365a62] rounded-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <label className="text-base font-semibold text-[#1a2e35]">
                {t("experience", { ns: "common" })} (Minimum years)
              </label>
            </div>
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
              className="w-full px-4 py-3 border-2 border-[#e0e7eb] rounded-xl focus:outline-none focus:border-[#44666C] focus:ring-2 focus:ring-[#44666C]/20 transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-[#e0e7eb] bg-[#f8fafb] flex gap-3">
          <button
            onClick={handleClear}
            disabled={!hasActiveFilters}
            className={`flex-1 py-3 px-5 rounded-xl font-semibold transition-all duration-200 ${
              hasActiveFilters
                ? "bg-white border-2 border-[#e0e7eb] text-[#5a6c75] hover:bg-[#f0f4f5] hover:border-[#44666C]/30 cursor-pointer"
                : "bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {t("clear", { ns: "common" })}
          </button>
          <button
            onClick={handleApply}
            className="flex-1 bg-gradient-to-r from-[#44666C] to-[#365a62] hover:from-[#365a62] hover:to-[#2d4d54] text-white py-3 px-5 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
          >
            {t("apply", { ns: "common" })}
          </button>
        </div>
      </div>
    </div>
  );
}
