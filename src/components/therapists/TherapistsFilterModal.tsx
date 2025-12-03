import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

type TherapistsFilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  availableFilters: string[];
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  onApply: () => void;
};

export default function TherapistsFilterModal({
  isOpen,
  onClose,
  availableFilters,
  selectedFilters,
  setSelectedFilters,
  onApply,
}: TherapistsFilterModalProps) {
  const { t } = useTranslation("common");
  const modalRef = useRef<HTMLDivElement>(null);

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

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[100px]">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className="relative bg-white rounded-[15px] shadow-lg max-w-[500px] w-full mx-[20px] max-h-[80vh] flex flex-col overflow-hidden"
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
          <div className="flex flex-col gap-[10px] mb-[20px]">
            {availableFilters.map((filter) => (
              <label
                key={filter}
                className="flex items-center gap-[10px] cursor-pointer p-[10px] hover:bg-gray-50 rounded-[10px] transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(filter)}
                  onChange={() => toggleFilter(filter)}
                  className="w-[18px] h-[18px] cursor-pointer accent-[#304048]"
                />
                <span className="text-[14px] text-[#304048]">{filter}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-[25px] pt-[20px] border-t border-gray-200 flex-shrink-0">
          <button
            onClick={onApply}
            className="w-full bg-[#304048] text-white py-[12px] rounded-[10px] font-medium hover:bg-[#304048]/90 transition-colors"
          >
            {t("apply", { ns: "common" })}
          </button>
        </div>
      </div>
    </div>
  );
}
