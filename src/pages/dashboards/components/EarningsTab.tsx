import { DollarSign } from "lucide-react";

type EarningsTabProps = {
  totalEarnings: number;
  monthlyEarnings: number;
};

export default function EarningsTab({
  totalEarnings,
  monthlyEarnings,
}: EarningsTabProps) {
  return (
    <section className="bg-[hsl(0,0%,97%)] shadow-m rounded-[16px] sm:rounded-[20px] p-[16px] sm:p-[24px]">
      <div className="flex items-center gap-[10px] mb-[20px]">
        <DollarSign className="text-primary w-6 h-6" />
        <h2 className="text-[20px] sm:text-[24px] font-semibold text-logo-heading">
          Earnings
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-[12px] p-[20px] border border-green-200">
          <p className="text-[13px] text-gray-600 mb-[8px]">Total Earnings</p>
          <p className="text-[28px] sm:text-[32px] font-bold text-green-700">
            ₹{totalEarnings.toLocaleString()}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-[12px] p-[20px] border border-blue-200">
          <p className="text-[13px] text-gray-600 mb-[8px]">This Month</p>
          <p className="text-[28px] sm:text-[32px] font-bold text-blue-700">
            ₹{monthlyEarnings.toLocaleString()}
          </p>
        </div>
      </div>
    </section>
  );
}
