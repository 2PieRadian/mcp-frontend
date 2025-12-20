import { Flag, Users, Shield, Heart } from "lucide-react";

export default function MakeInIndia() {
  return (
    <section className="max-w-[1350px] mx-auto mb-[60px] md:mb-[80px]">
      <div className="bg-[#ffffff] rounded-[24px] p-[15px] md:p-[24px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.09),0_8px_16px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300">
        {/* Header Section with Gradient Background */}
        <div className="bg-linear-to-br from-[#d4e8eb] via-[#ffffff] to-[#b8d4db] rounded-[20px] p-[24px] md:p-[32px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),0_4px_8px_rgba(0,0,0,0.1)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[24px]">
            {/* Logo and Brand */}
            <div className="flex items-center gap-[16px]">
              <div className="p-[5px] bg-white/80 rounded-[16px] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.1)] backdrop-blur-sm shrink-0">
          <img
                  src="/images/navbar/logo.png"
            alt="MindCurePath Logo"
                  className="w-[50px] h-[50px] object-contain aspect-square mt-[2px]"
          />
              </div>
              <div>
                <h2 className="text-primary text-[22px] md:text-[28px] font-bold leading-tight mb-[4px]">
                  Mind<span className="text-[#119c95]">Cure</span>Path
                </h2>
                <p className="text-[#44666C] text-[14px] md:text-[15px] font-medium leading-snug">
                  India's own virtual counselling platform
            </p>
          </div>
        </div>

            {/* Make in India Badge */}
            <div className="flex flex-col items-start md:items-end gap-[5px]">
              <div className="inline-flex items-center gap-[10px] px-3 py-1.5 bg-white/70 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_2px_4px_rgba(0,0,0,0.1)] backdrop-blur-sm mb-2">
                <Flag className="w-4 h-4 text-primary" />
                <span className="text-[11px] md:text-[12px] font-semibold text-primary uppercase tracking-wide">
            Proudly Supports
                </span>
              </div>

              <h3 className="text-primary whitespace-nowrap text-[24px] md:text-[36px] font-bold tracking-tight leading-none">
            MAKE IN INDIA
              </h3>
            </div>
        </div>
      </div>

        {/* Content Section */}
        <div className="px-[4px] md:px-[8px] py-[32px] md:py-[40px]">
          {/* Services Grid - Soft UI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[20px] mb-[32px] md:mb-[40px]">
            <div className="flex items-start gap-[16px] p-[20px] md:p-[24px] bg-[#f4f9fb] rounded-[16px] shadow-m transition-all duration-300 hover:-translate-y-1">
              <div className="w-[48px] h-[48px] bg-white/80 rounded-[6px] flex items-center justify-center shrink-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.08)]">
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

            <div className="flex items-start gap-[16px] p-[20px] md:p-[24px] bg-[#f4f9fb] rounded-[16px] shadow-m transition-all duration-300 hover:-translate-y-1">
              <div className="w-[48px] h-[48px] bg-white/80 rounded-[6px] flex items-center justify-center shrink-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.08)]">
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
            <div className="flex items-start gap-[16px] p-[24px] md:p-[28px] bg-[#f3f7f9] rounded-[20px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),0_4px_8px_rgba(0,0,0,0.08)]">
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
