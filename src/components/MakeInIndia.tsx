import { Flag, Users, Shield, Heart } from "lucide-react";

export default function MakeInIndia() {
  return (
    <section className="max-w-[1350px] mx-auto mb-[60px] md:mb-[80px]">
      <div className="bg-white rounded-[20px] shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Header Section with Gradient Background */}
        <div className="bg-linear-to-br from-[#ecf4f6] to-[#d4e8eb] px-[24px] md:px-[48px] pt-[40px] md:pt-[56px] pb-[32px] md:pb-[40px]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[24px]">
            {/* Logo and Brand */}
            <div className="flex items-center gap-[16px]">
              <div className="w-[64px] h-[64px] bg-white rounded-[16px] flex items-center justify-center shadow-md border border-gray-100">
                <img
                  src="/images/navbar/logo.png"
                  alt="MindCurePath Logo"
                  className="w-[48px] h-[48px]"
                />
              </div>
              <div>
                <h2 className="text-primary text-[22px] md:text-[28px] font-bold leading-tight mb-[4px]">
                  MindCurePath
                </h2>
                <p className="text-[#4F5B64] text-[14px] md:text-[15px] font-medium leading-snug">
                  India's own virtual counselling platform
                </p>
              </div>
            </div>

            {/* Make in India Badge */}
            <div className="flex flex-col items-start md:items-end">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-full border border-primary/20 mb-2">
                <Flag className="w-4 h-4 text-primary" />
                <span className="text-[11px] md:text-[12px] font-semibold text-primary uppercase tracking-wide">
                  Proudly Supports
                </span>
              </div>
              <h3 className="text-primary whitespace-nowrap text-[28px] md:text-[36px] font-bold tracking-tight leading-none">
                MAKE IN INDIA
              </h3>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-[24px] md:px-[48px] py-[40px] md:py-[56px]">
          {/* Services Grid - Modern Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-[15px] mb-[32px] md:mb-[40px]">
            <div className="flex items-start gap-[16px] p-[20px] md:p-[24px] bg-[#ecf4f6] rounded-[16px] border border-primary/10 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-[48px] h-[48px] bg-primary/10 rounded-[12px] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-primary text-[16px] md:text-[17px] font-semibold mb-[6px]">
                  Certified Indian Professionals
                </h4>
                <p className="text-[#4F5B64] text-[14px] md:text-[15px] leading-relaxed">
                  Licensed Counselors, Therapists, Nutritionists & Expert
                  Advisors
                </p>
              </div>
            </div>

            <div className="flex items-start gap-[16px] p-[20px] md:p-[24px] bg-[#ecf4f6] rounded-[16px] border border-primary/10 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-[48px] h-[48px] bg-primary/10 rounded-[12px] flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-primary text-[16px] md:text-[17px] font-semibold mb-[6px]">
                  Career & Financial Advisors
                </h4>
                <p className="text-[#4F5B64] text-[14px] md:text-[15px] leading-relaxed">
                  Academic Advisors, Career Counselors, Financial Planners & Tax
                  Experts
                </p>
              </div>
            </div>
          </div>

          {/* Main Description */}
          <div>
            <div className="flex items-start gap-[16px] p-[24px] md:p-[28px] bg-linear-to-br from-[#f3f7f9] to-[#f3f7f9] rounded-[16px] border border-gray-200">
              <Heart className="hidden md:block w-6 h-6 text-primary shrink-0 mt-[2px]" />

              <div>
                <p className="text-[#4F5B64] text-[15px] md:text-[16px] leading-relaxed mb-[12px]">
                  MindCurePath proudly supports the Make in India initiative — a
                  movement that celebrates innovation, entrepreneurship, and
                  self-reliance across the nation. By connecting individuals
                  with certified Indian counselors, therapists, dieticians,
                  academic advisors, financial consultants, and GST & taxation
                  experts, we aim to build a trusted virtual platform where
                  personal and professional guidance is accessible, affordable,
                  and locally empowered.
                </p>
                <p className="text-primary text-[15px] md:text-[16px] font-semibold leading-relaxed">
                  At MindCurePath, we believe true growth begins from within —
                  both for individuals and for our nation. India's own virtual
                  counselling platform — built by Indians, for Indians.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
