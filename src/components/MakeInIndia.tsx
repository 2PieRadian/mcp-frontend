export default function MakeInIndia() {
  return (
    <section className="max-w-[1350px] mx-auto mb-[60px] md:mb-[80px]">
      <div className="bg-make-in-india-bg rounded-[16px] md:rounded-[24px] overflow-hidden">
        {/* Header Section */}
        <div className="px-[24px] md:px-[48px] pt-[40px] md:pt-[56px] pb-[32px] md:pb-[40px] border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[24px]">
            {/* Logo and Brand */}
            <div className="flex items-center gap-[16px]">
              <img
                src="/images/navbar/logo_white.png"
                alt="MindCurePath Logo"
                className="w-[56px] h-[56px] shrink-0"
              />
              <div>
                <h2 className="text-white text-[20px] md:text-[24px] font-medium leading-tight mb-[4px]">
                  MindCurePath
                </h2>
                <p className="text-white/80 text-[13px] md:text-[14px] font-normal leading-snug">
                  India's own virtual counselling platform
                </p>
              </div>
            </div>

            {/* Make in India Badge */}
            <div className="flex flex-col items-start md:items-end">
              <p className="text-white/70 text-[12px] md:text-[13px] font-normal tracking-wide uppercase mb-[6px]">
                Proudly Supports
              </p>
              <h3 className="text-white text-[32px] whitespace-nowrap md:text-[42px] font-bold tracking-tight leading-none">
                MAKE IN INDIA
              </h3>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-[24px] md:px-[48px] py-[32px] md:py-[48px]">
          {/* Services Grid - Floating Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[20px] mb-[32px] md:mb-[40px]">
            <div className="flex items-start gap-[14px] py-[16px] px-[20px] bg-white/10 rounded-[12px] backdrop-blur-sm border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 animate-float-subtle-1">
              <div className="shrink-0 mt-[2px]">
                <div className="w-[6px] h-[6px] rounded-full bg-white/60"></div>
              </div>
              <p className="text-white/85 text-[14px] md:text-[15px] leading-relaxed">
                Certified Indian Counselors, Therapists & Dieticians
              </p>
            </div>

            <div className="flex items-start gap-[14px] py-[16px] px-[20px] bg-white/10 rounded-[12px] backdrop-blur-sm border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 animate-float-subtle-2">
              <div className="shrink-0 mt-[2px]">
                <div className="w-[6px] h-[6px] rounded-full bg-white/60"></div>
              </div>
              <p className="text-white/85 text-[14px] md:text-[15px] leading-relaxed">
                Academic Advisors, Financial Consultants & GST & Taxation
                Experts
              </p>
            </div>
          </div>

          {/* Main Description */}
          <div>
            <p className="text-white/90 text-[15px] md:text-[16px] leading-relaxed mb-[16px] max-w-[900px]">
              MindCurePath proudly supports the Make in India initiative — a
              movement that celebrates innovation, entrepreneurship, and
              self-reliance across the nation. By connecting individuals with
              certified Indian counselors, therapists, dieticians, academic
              advisors, financial consultants, and GST & taxation experts, we
              aim to build a trusted virtual platform where personal and
              professional guidance is accessible, affordable, and locally
              empowered.
            </p>
            <p className="text-white/90 text-[15px] md:text-[16px] leading-relaxed max-w-[900px]">
              At MindCurePath, we believe true growth begins from within — both
              for individuals and for our nation. India's own virtual
              counselling platform — built by Indians, for Indians.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
