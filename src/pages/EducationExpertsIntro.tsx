import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import {
  ArrowRight,
  Compass,
  Target,
  BookOpen,
  Brain,
  GraduationCap,
  Lightbulb,
  School,
  type LucideIcon,
} from "lucide-react";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { EXPERT_CATEGORIES } from "../lib/constants/experts";

// Icon mapping for education specializations
const EDUCATION_ICONS: Record<string, LucideIcon> = {
  "Career Path Finder": Compass,
  "Academic Counsellor": BookOpen,
  Achievers: Target,
  Aspirants: Brain,
  "Academic Scholars": GraduationCap,
  Educator: School,
};

// Catchier accent colors for education
const EDUCATION_COLORS: Record<string, string> = {
  // Bright colors with cues (direction, focus, achievement, ambition, growth)
  "Career Path Finder": "#14B8A6", // teal (direction / clarity)
  "Academic Counsellor": "#6366F1", // indigo (focus / guidance)
  Achievers: "#F59E0B", // gold/amber (achievement)
  Aspirants: "#8B5CF6", // violet (ambition / potential)
  "Academic Scholars": "#22C55E", // green (growth / mastery)
  Educator: "#0EA5E9", // sky (teaching / clarity in the classroom)
};

interface ExpertCategoryCardProps {
  title: string;
  description: string;
  specializationValue: string;
  specializationSlug: string;
  icon: LucideIcon;
  accentColor: string;
  index: number;
}

function ExpertCategoryCard({
  title,
  description,
  specializationValue,
  specializationSlug,
  icon: Icon,
  accentColor,
}: ExpertCategoryCardProps) {
  const navigate = useNavigate();
  const [isTapped, setIsTapped] = useState(false);

  const handleClick = () => {
    if (isTapped) return;

    const isMobileLike =
      typeof window !== "undefined" &&
      !!window.matchMedia &&
      (window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(pointer: coarse)").matches);

    if (isMobileLike) {
      setIsTapped(true);
      window.setTimeout(() => {
        navigate(`/education-experts/${specializationSlug}`, {
          state: { specialization: specializationValue },
        });
      }, 350);
      return;
    }

    navigate(`/education-experts/${specializationSlug}`, {
      state: { specialization: specializationValue },
    });
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      className={`group relative cursor-pointer transition-all duration-500 transform-gpu md:hover:-translate-y-1 md:hover:scale-[1.02] ${isTapped ? "scale-[1.02] -translate-y-0.5" : ""
        }`}
    >
      {/* Card container */}
      <div
        className="relative rounded-2xl h-full overflow-hidden transition-all duration-500"
        style={
          {
            border: `1px solid ${accentColor}30`,
            ["--accent" as any]: accentColor,
          } as CSSProperties
        }
      >
        {/* Background fill animation */}
        <div
          className={`absolute inset-0 transition-all duration-500 ease-out origin-top ${isTapped ? "scale-y-100" : "scale-y-0"
            } md:scale-y-0 md:group-hover:scale-y-100`}
          style={{ backgroundColor: accentColor }}
        />

        {/* White background (fades out on hover) */}
        <div
          className={`absolute inset-0 bg-white transition-opacity duration-500 ${isTapped ? "opacity-0" : "opacity-100"
            } md:opacity-100 md:group-hover:opacity-0`}
        />

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Icon + Arrow */}
          <div className="flex items-start justify-between mb-5">
            <Icon
              className={`w-7 h-7 relative z-20 transition-transform duration-500 ${isTapped ? "scale-110 text-white" : "text-(--accent)"
                } md:text-(--accent) md:group-hover:scale-110 md:group-hover:text-white`}
            />
            <span
              className={`relative z-20 inline-flex items-center justify-center rounded-[10px] p-1 transition-all duration-500 bg-transparent border border-transparent ${isTapped ? "bg-white border-white/90 translate-x-1 scale-110" : ""
                } md:group-hover:bg-white md:group-hover:border-white/90 md:group-hover:translate-x-1 md:group-hover:scale-110`}
            >
              <ArrowRight className="w-5 h-5 text-(--accent)" />
            </span>
          </div>

          {/* Title */}
          <h3
            className={`text-lg font-semibold mb-3 leading-snug transition-colors duration-500 ${isTapped ? "text-white" : "text-stone-800"
              } md:text-stone-800 md:group-hover:text-white`}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className={`text-sm leading-relaxed mb-0 line-clamp-3 transition-colors duration-500 ${isTapped ? "text-white/80" : "text-stone-500"
              } md:text-stone-500 md:group-hover:text-white/80`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function EducationExpertsIntro() {
  const { t } = useTranslation(["common", "experts"]);

  // Section refs for stagger animation
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const sectionHeadingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const categories = EXPERT_CATEGORIES.education.map((spec) => ({
    title: t(`${spec.i18nKey}.title`, { ns: "experts" }),
    description:
      t(`${spec.i18nKey}.description`, { ns: "experts" }) ||
      t("expertsFallbackDescription"),
    specializationValue: spec.value,
    specializationSlug: spec.slug,
    icon: EDUCATION_ICONS[spec.value] || GraduationCap,
    accentColor: EDUCATION_COLORS[spec.value] || "#6B8E7D",
  }));

  // Simple stagger animation on mount
  useEffect(() => {
    const sections = [
      heroSectionRef.current,
      sectionHeadingRef.current,
      cardsRef.current,
      footerRef.current,
    ].filter(Boolean);

    if (sections.length === 0) return;

    // Set initial state
    gsap.set(sections, { opacity: 0, y: 30 });

    // Stagger fade in
    gsap.to(sections, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.15,
    });
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50/30 via-white to-stone-50/50">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="w-full bg-white px-[16px] sm:px-[20px]">
        <ResponsiveNavbar />
      </div>

      <div className="max-w-5xl mx-auto px-[16px] sm:px-[20px] pb-24">
        {/* Hero Section */}
        <div ref={heroSectionRef}>
          <div className="pt-14 pb-20 text-center">
            {/* Decorative icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-[#6B8E7D]/15 to-[#7D8EAB]/15 flex items-center justify-center">
                  <Lightbulb className="w-9 h-9 text-[#6B8E7D]" />
                </div>
                {/* Decorative dots */}
                <div
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#AB8E7D]"
                  style={{ animation: "pulse-soft 2s infinite" }}
                />
                <div
                  className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-[#7D8EAB]"
                  style={{ animation: "pulse-soft 2s infinite 0.5s" }}
                />
              </div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-[#6B8E7D]/10 to-[#7D8EAB]/10 mb-8">
              <span className="text-xs font-semibold tracking-wider text-[#6B8E7D] uppercase">
                {t("educationExpertsBadge")}
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-5 tracking-tight">
              {t("educationExpertsTitleLine1")}
              <br />
              <span className="bg-linear-to-r from-[#6B8E7D] to-[#7D8EAB] bg-clip-text text-transparent">
                {t("educationExpertsTitleLine2")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-stone-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              {t("educationExpertsSubtitle")}
            </p>
          </div>
        </div>

        {/* Section heading */}
        <div ref={sectionHeadingRef} className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-stone-800 mb-2">
            {t("expertsChooseHeading")}
          </h2>
          <p className="text-stone-500 text-sm md:text-base">
            {t("expertsChooseSubheading")}
          </p>
        </div>

        {/* Categories Grid - Larger cards for education */}
        <div ref={cardsRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <ExpertCategoryCard
                key={category.specializationSlug}
                title={category.title}
                description={category.description}
                specializationValue={category.specializationValue}
                specializationSlug={category.specializationSlug}
                icon={category.icon}
                accentColor={category.accentColor}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Inspirational footer */}
        <div ref={footerRef} className="text-center mt-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-stone-50 border border-stone-100">
            <GraduationCap className="w-4 h-4 text-[#6B8E7D]" />
            <p className="text-stone-500 text-sm font-medium">
              Every expert was once a beginner
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
