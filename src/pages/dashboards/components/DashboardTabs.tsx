import { useTranslation } from "react-i18next";
import { Calendar, Clock, Wallet, User, GraduationCap, Zap } from "lucide-react";
import type { TabType } from "../types";

type DashboardTabsProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

const tabs: { key: TabType; labelKey: string; icon: typeof Calendar }[] = [
  { key: "sessions", labelKey: "tabSessions", icon: Calendar },
  { key: "urgent", labelKey: "tabUrgent", icon: Zap },
  { key: "availability", labelKey: "tabAvailability", icon: Clock },
  { key: "earnings", labelKey: "tabEarnings", icon: Wallet },
  { key: "qualifications", labelKey: "tabQualifications", icon: GraduationCap },
  { key: "profile", labelKey: "tabProfile", icon: User },
];

export default function DashboardTabs({
  activeTab,
  onTabChange,
}: DashboardTabsProps) {
  const { t } = useTranslation("common");

  return (
    <div className="mb-6 sm:mb-8">
      {/* Mobile: horizontal scroll, compact pills */}
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1 sm:mx-0 sm:px-0">
        <div className="flex sm:justify-center gap-2 sm:gap-1 min-w-max sm:min-w-0 py-1">
          <div className="bg-white rounded-full p-1 sm:p-1.5 shadow-sm border border-gray-100 inline-flex gap-1">
            {tabs.map(({ key, labelKey, icon: Icon }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onTabChange(key)}
                  className={`
                    flex items-center gap-1.5 sm:gap-2
                    px-3 sm:px-4 py-2 sm:py-2.5
                    rounded-full
                    text-xs sm:text-sm font-medium
                    transition-all duration-200 cursor-pointer
                    whitespace-nowrap
                    ${
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{t(labelKey)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
