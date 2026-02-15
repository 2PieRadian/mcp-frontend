import { useTranslation } from "react-i18next";
import { RefreshCw } from "lucide-react";

type EarningsTabProps = {
  totalEarnings: number;
  isLoading?: boolean;
  error?: string | null;
  onRefetch?: () => void;
};

export default function EarningsTab({
  totalEarnings,
  isLoading = false,
  error = null,
  onRefetch,
}: EarningsTabProps) {
  const { t } = useTranslation("common");
  return (
    <div className="relative bg-linear-to-br from-green-500 via-green-600 to-emerald-600 rounded-[16px] sm:rounded-[20px] p-[32px] sm:p-[40px] shadow-lg overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      {/* Main Content - Flex Layout */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[24px] sm:gap-[32px]">
        {/* Left Side - Header and Info */}
        <div className="flex-1 min-w-0">
          <div className="mb-[24px]">
            <h2 className="text-white text-[20px] sm:text-[24px] font-semibold">
              {t("tabEarnings")}
            </h2>
            <p className="text-white/70 text-[13px] sm:text-[14px] mt-[2px]">
              {t("earningsSubtitle")}
            </p>
          </div>

          <div className="mt-[20px] pt-[20px] border-t border-white/20">
            <p className="text-white/70 text-[12px] sm:text-[13px]">
              {t("earningsAllTimeDescription")}
            </p>
          </div>
          {error && (
            <p className="mt-3 text-red-200 text-sm">{error}</p>
          )}
        </div>

        {/* Right Side - Earnings Amount + Refetch */}
        <div className="flex flex-col items-start sm:items-end shrink-0">
          {onRefetch && (
            <button
              type="button"
              onClick={onRefetch}
              disabled={isLoading}
              className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-white/20 text-white text-sm font-medium hover:bg-white/30 disabled:opacity-60 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? t("dashboardRefreshing") : t("dashboardRefetch")}
            </button>
          )}
          <div className="flex items-center gap-[12px] mb-[16px]">
            <p className="text-white/90 text-[14px] sm:text-[16px] font-medium">
              {t("dashboardTotalEarnings")}
            </p>
          </div>

          <div className="flex items-baseline gap-[8px]">
            <span className="text-white/90 text-[24px] sm:text-[28px] md:text-[32px] font-semibold">₹</span>
            <p className="text-white text-[40px] sm:text-[48px] md:text-[56px] font-bold leading-none">
              {isLoading && totalEarnings === 0 ? "—" : totalEarnings.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}