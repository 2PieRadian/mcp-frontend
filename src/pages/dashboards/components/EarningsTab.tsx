type EarningsTabProps = {
  totalEarnings: number;
};

export default function EarningsTab({
  totalEarnings,
}: EarningsTabProps) {
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
              Earnings
            </h2>
            <p className="text-white/70 text-[13px] sm:text-[14px] mt-[2px]">
              Your total earnings from all sessions
            </p>
          </div>

          <div className="mt-[20px] pt-[20px] border-t border-white/20">
            <p className="text-white/70 text-[12px] sm:text-[13px]">
              All time earnings from completed sessions
            </p>
          </div>
        </div>

        {/* Right Side - Earnings Amount */}
        <div className="flex flex-col items-start sm:items-end shrink-0">
          <div className="flex items-center gap-[12px] mb-[16px]">
            <p className="text-white/90 text-[14px] sm:text-[16px] font-medium">
              Total Earnings
            </p>
          </div>

          <div className="flex items-baseline gap-[8px]">
            <span className="text-white/90 text-[24px] sm:text-[28px] md:text-[32px] font-semibold">₹</span>
            <p className="text-white text-[40px] sm:text-[48px] md:text-[56px] font-bold leading-none">
              {totalEarnings.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}