import {
  BadgeCheck,
  Heart,
  GraduationCap,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { useScreen } from "../context/ScreenContext";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const { screenWidth } = useScreen();
  const showCardsBelow = screenWidth <= 1024;

  return (
    <div className="relative w-full bg-white">
      {/* Content Container */}
      <div className="max-w-[1350px] mx-auto py-[70px] md:py-[90px]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-[40px] lg:gap-[80px]">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#ecf4f6] rounded-full border border-primary/20 animate-badge-pulse">
              <BadgeCheck className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              <span className="text-xs md:text-sm font-medium text-primary">
                Expert-Verified Assessments
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] text-primary tracking-tight">
              Discover Your Path to
              <span className="block mt-2 text-[hsl(190,40%,29%)]">
                Better Living
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-[clamp(16px,2.5vw,20px)] text-[#4F5B64] leading-relaxed max-w-[600px] mx-auto lg:mx-0">
              Take expert-verified assessments in wellness, education, and
              finance. Get personalized insights and connect with trusted
              professionals.
            </p>

            {/* Key Points */}
            <div className="flex flex-row gap-2 md:gap-3 justify-center lg:justify-start overflow-x-auto">
              <div className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 bg-[#ecf4f6] rounded-full border border-primary/10 whitespace-nowrap">
                <span className="text-[10px] md:text-[12px] font-medium text-primary">
                  Science-Backed
                </span>
              </div>
              <div className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 bg-[#ecf4f6] rounded-full border border-primary/10 whitespace-nowrap">
                <span className="text-[10px] md:text-[12px] font-medium text-primary">
                  Expert-Verified
                </span>
              </div>
              <div className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 bg-[#ecf4f6] rounded-full border border-primary/10 whitespace-nowrap">
                <span className="text-[10px] md:text-[12px] font-medium text-primary">
                  Free Assessments
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-[10px] justify-center lg:justify-start pt-[30px]">
              <a
                href="#expert-verified-assessments"
                className="group inline-flex items-center whitespace-nowrap justify-center gap-2 px-[25px] py-[12px] bg-primary text-white rounded-[16px] font-medium text-[16px] hover:bg-[hsl(187,73%,18%)] transition-all duration-300 hover:scale-[1.02] shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
              >
                Start Free Assessment
              </a>

              <Link
                to="/login"
                className="inline-flex items-center whitespace-nowrap justify-center px-[25px] py-[12px] bg-transparent text-primary rounded-[16px] font-medium text-[16px] border border-gray-300 hover:bg-[#ecf4f6] transition-all duration-300 hover:scale-[1.02] shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
              >
                Get Free Consultation
              </Link>
            </div>
          </div>

          {/* Right Content - Visual Elements */}
          {!showCardsBelow && (
            <div className="flex-1 relative w-full max-w-[500px] lg:max-w-[600px]">
              {/* Floating Cards Preview */}
              <div className="relative h-[400px] lg:h-[500px]">
                {/* Card 1 - Wellness */}
                <Link
                  to="/wellness-experts"
                  className="group absolute top-0 right-0 w-[200px] lg:w-[240px] bg-white/95 backdrop-blur-md rounded-[20px] p-6 shadow-lg animate-float-1 border border-gray-100 hover:border-primary/30 hover:scale-[1.05] hover:shadow-xl transition-all duration-300 cursor-pointer block text-center overflow-hidden"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-[#0ea5e9] to-[#06b6d4] rounded-[12px] flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-[#0ea5e9] transition-colors duration-300">
                    Wellness
                  </h3>
                  <p className="text-[#4F5B64] text-sm leading-relaxed mb-0 group-hover:mb-3 transition-all duration-300">
                    Assess your mental health and well-being
                  </p>
                  <div className="max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300 flex items-center justify-center gap-1 text-primary">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>

                {/* Card 2 - Education */}
                <Link
                  to="/education-experts"
                  className="group absolute top-[120px] left-0 w-[200px] lg:w-[240px] bg-white/95 backdrop-blur-md rounded-[20px] p-6 shadow-lg animate-float-2 border border-gray-100 hover:border-primary/30 hover:scale-[1.05] hover:shadow-xl transition-all duration-300 cursor-pointer block text-center overflow-hidden"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-[#10b981] to-[#059669] rounded-[12px] flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-[#10b981] transition-colors duration-300">
                    Education
                  </h3>
                  <p className="text-[#4F5B64] text-sm leading-relaxed mb-0 group-hover:mb-3 transition-all duration-300">
                    Plan your career and educational journey
                  </p>
                  <div className="max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300 flex items-center justify-center gap-1 text-primary">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>

                {/* Card 3 - Finance */}
                <Link
                  to="/finance-experts"
                  className="group absolute top-[240px] right-[40px] w-[200px] lg:w-[240px] bg-white/95 backdrop-blur-md rounded-[20px] p-6 shadow-lg animate-float-3 border border-gray-100 hover:border-primary/30 hover:scale-[1.05] hover:shadow-xl transition-all duration-300 cursor-pointer block text-center overflow-hidden"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-[#f59e0b] to-[#d97706] rounded-[12px] flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-[#f59e0b] transition-colors duration-300">
                    Finance
                  </h3>
                  <p className="text-[#4F5B64] text-sm leading-relaxed mb-0 group-hover:mb-3 transition-all duration-300">
                    Build your financial foundation
                  </p>
                  <div className="max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300 flex items-center justify-center gap-1 text-primary">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              </div>
            </div>
          )}

          {showCardsBelow && (
            <div className="w-full mt-[15px] pt-[40px] border-t border-gray-200">
              <h2 className="text-[clamp(20px,5vw,24px)] font-bold text-primary text-center mb-4">
                Explore Our Expert Categories
              </h2>
              <p className="text-[#4F5B64] text-center mb-6">
                Connect with verified professionals in wellness, education, and
                finance
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full">
                <Link
                  to="/wellness-experts"
                  className="group bg-white rounded-[16px] p-2.5 sm:p-5 shadow-md border border-gray-100 hover:scale-[1.02] transition-transform text-left max-[500px]:text-center"
                >
                  <div className="w-full aspect-100/70 bg-linear-to-br from-[#0ea5e9] to-[#06b6d4] rounded-[10px] flex items-center justify-center mb-3 sm:mb-4">
                    <Heart className="w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16 text-white group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <h3 className="font-bold text-primary text-[clamp(14px,2vw,18px)] mb-1">
                    Wellness
                  </h3>
                  <p className="text-[#4F5B64] text-[clamp(12px,1.5vw,16px)]">
                    Mental health assessment
                  </p>
                </Link>

                <Link
                  to="/education-experts"
                  className="group bg-white rounded-[16px] p-2.5 sm:p-5 shadow-md border border-gray-100 hover:scale-[1.02] transition-transform text-left max-[500px]:text-center"
                >
                  <div className="w-full aspect-100/70 bg-linear-to-br from-[#10b981] to-[#059669] rounded-[10px] flex items-center justify-center mb-3 sm:mb-4">
                    <GraduationCap className="w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16 text-white group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <h3 className="font-bold text-primary text-[clamp(14px,2vw,18px)] mb-1">
                    Education
                  </h3>
                  <p className="text-[#4F5B64] text-[clamp(12px,1.5vw,16px)]">
                    Career planning
                  </p>
                </Link>

                <Link
                  to="/finance-experts"
                  className="group bg-white rounded-[16px] p-2.5 sm:p-5 shadow-md border border-gray-100 hover:scale-[1.02] transition-transform text-left max-[500px]:text-center"
                >
                  <div className="w-full aspect-100/70 bg-linear-to-br from-[#f59e0b] to-[#d97706] rounded-[10px] flex items-center justify-center mb-3 sm:mb-4">
                    <TrendingUp className="w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16 text-white group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <h3 className="font-bold text-primary text-[clamp(14px,2vw,18px)] mb-1">
                    Finance
                  </h3>
                  <p className="text-[#4F5B64] text-[clamp(12px,1.5vw,16px)]">
                    Financial planning
                  </p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
