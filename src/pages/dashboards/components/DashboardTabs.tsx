import { useTranslation } from "react-i18next";
import type { TabType } from "../types";

type DashboardTabsProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

export default function DashboardTabs({
  activeTab,
  onTabChange,
}: DashboardTabsProps) {
  const { t } = useTranslation("common");
  return (
    <div className="flex justify-center mb-[30px]">
      <div className="bg-white rounded-full p-[6px] shadow-m inline-flex gap-[4px]">
        <button
          onClick={() => onTabChange("sessions")}
          className={`px-[20px] sm:px-[28px] py-[10px] sm:py-[12px] rounded-full text-[14px] sm:text-[15px] font-medium transition-all duration-200 cursor-pointer ${
            activeTab === "sessions"
              ? "bg-primary text-white shadow-sm"
              : "text-light-text hover:bg-primary/10"
          }`}
        >
          {t("tabUpcomingSessions")}
        </button>
        <button
          onClick={() => onTabChange("availability")}
          className={`px-[20px] sm:px-[28px] py-[10px] sm:py-[12px] rounded-full text-[14px] sm:text-[15px] font-medium transition-all duration-200 cursor-pointer ${
            activeTab === "availability"
              ? "bg-primary text-white shadow-sm"
              : "text-light-text hover:bg-primary/10"
          }`}
        >
          {t("tabAvailabilityManagement")}
        </button>
        <button
          onClick={() => onTabChange("earnings")}
          className={`px-[20px] sm:px-[28px] py-[10px] sm:py-[12px] rounded-full text-[14px] sm:text-[15px] font-medium transition-all duration-200 cursor-pointer ${
            activeTab === "earnings"
              ? "bg-primary text-white shadow-sm"
              : "text-light-text hover:bg-primary/10"
          }`}
        >
          {t("tabEarnings")}
        </button>
      </div>
    </div>
  );
}
