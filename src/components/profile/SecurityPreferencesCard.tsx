export default function SecurityPreferencesCard() {
  return (
    <div className="bg-[hsl(0,0%,97%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px] sm:col-span-2">
      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
        Security & preferences
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap gap-[8px] sm:gap-[10px] text-[13px] sm:text-[14px] text-light-text">
        <div className="bg-white px-[12px] sm:px-4 py-[10px] sm:py-[10px] rounded-[16px] sm:rounded-[20px] flex flex-col gap-[4px] flex-1 min-w-0">
          <p className="text-[11px] sm:text-xs text-gray-500">Login</p>
          <p className="font-medium text-[13px] sm:text-[14px]">
            Email & password
          </p>
          <p className="text-[11px] sm:text-xs text-gray-500">
            Contact support if you'd like to change your email.
          </p>
        </div>
        <div className="bg-white px-[12px] sm:px-4 py-[10px] sm:py-[10px] rounded-[16px] sm:rounded-[20px] flex flex-col gap-[4px] flex-1 min-w-0">
          <p className="text-[11px] sm:text-xs text-gray-500">Language</p>
          <p className="font-medium text-[13px] sm:text-[14px]">
            Controlled from the top navigation.
          </p>
        </div>
      </div>
    </div>
  );
}
