import { ArrowRight, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANDING_PAGE_QUOTES } from "../lib/constants/landingPage";
import { Link, useNavigate } from "react-router-dom";

export default function GuidanceQuotesSection() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  const handleAssessmentClick = (assessmentRoute: string) => {
    navigate(assessmentRoute);
  };

  const accent = {
    ring: "from-[#10b981] to-[#059669]",
    soft: "from-[#10b981]/12 via-transparent to-[#059669]/10",
    badge: "bg-[#10b981]/10 text-[#087a59] border-[#10b981]/20",
    quoteText: "text-[#064a36]",
    ctaBg: "bg-[#064a36]",
    ctaHover: "hover:bg-[#043625]",
  } as const;

  const destinations = [
    {
      assessmentRoute: "/assessments/wellness",
      expertsRoute: "/wellness-experts",
    },
    {
      assessmentRoute: "/assessments/education",
      expertsRoute: "/education-experts",
    },
    {
      assessmentRoute: "/assessments/finance",
      expertsRoute: "/finance-experts",
    },
  ] as const;

  return (
    <section className="relative w-full overflow-hidden bg-white mb-[70px] mt-[40px] sm:mt-[70px]">
      <div className="relative max-w-[1350px] mx-auto">
        <div className="text-center px-[4px]">
          <h2 className="mt-2 text-[clamp(30px,3.4vw,36px)] font-bold text-primary leading-tight">
            {t("guidanceQuotesHeading")}
          </h2>
          <p className="mt-3 text-[#4F5B64] text-[14px] sm:text-[15px] leading-relaxed max-w-[860px] mx-auto">
            {t("guidanceQuotesSubtitle")}
          </p>
        </div>

        <div className="mt-[20px] sm:mt-[26px] flex flex-col gap-[12px] sm:gap-[16px] px-[4px]">
          {LANDING_PAGE_QUOTES.map((item, index) => {
            const dest = destinations[index % destinations.length];
            const flip = index % 2 === 1;
            const number = String(index + 1).padStart(2, "0");

            return (
              <div
                key={item.id}
                className={`rounded-[26px] sm:rounded-[32px] bg-linear-to-br ${accent.ring} p-px`}
              >
                <div className="relative overflow-hidden rounded-[25px] sm:rounded-[31px] bg-white/85 backdrop-blur-md border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                  <div
                    className={`pointer-events-none absolute inset-0 bg-linear-to-br ${accent.soft}`}
                  />

                  <div
                    className={`relative flex flex-col md:flex-row ${
                      flip ? "md:flex-row-reverse" : ""
                    } md:items-stretch gap-[14px] sm:gap-[18px] p-[16px] sm:p-[22px]`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 ${accent.badge}`}
                        >
                          <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.18em]">
                            {t("guidanceQuotesInsight", { number })}
                          </span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-primary/70">
                          <Quote className="h-5 w-5" />
                        </div>
                      </div>

                      <blockquote className="mt-[10px] sm:mt-[12px]">
                        <p
                          className={`text-[clamp(18px,2.2vw,24px)] font-semibold leading-snug ${accent.quoteText}`}
                        >
                          "{t(`guidanceQuotesQuote${item.id}`)}"
                        </p>
                      </blockquote>
                    </div>

                    <div className="md:w-[360px] lg:w-[420px] shrink-0">
                      <div className="h-full rounded-[20px] border border-gray-100 bg-white/80 p-[14px] sm:p-[16px] shadow-[0_3px_14px_rgba(0,0,0,0.06)]">
                        <p className="text-[12px] uppercase tracking-[0.22em] text-primary/70">
                          {t("guidanceQuotesWhatToDoNext")}
                        </p>
                        <p className="mt-2 text-[13px] sm:text-[14px] text-[#4F5B64] leading-relaxed">
                          {t("guidanceQuotesCardDescription")}
                        </p>

                        <div className="mt-4 flex flex-col sm:flex-row gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleAssessmentClick(dest.assessmentRoute)
                            }
                            className={`group inline-flex cursor-pointer items-center justify-center gap-2 rounded-[14px] px-[14px] py-[10px] text-white text-[14px] font-medium transition-colors ${accent.ctaBg} ${accent.ctaHover}`}
                          >
                            {t("guidanceQuotesStartFreeAssessment")}
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                          <Link
                            to={dest.expertsRoute}
                            className="inline-flex items-center justify-center rounded-[14px] border border-gray-200 bg-white px-[14px] py-[10px] text-[14px] font-medium text-primary hover:bg-[#ecf4f6] transition-colors"
                          >
                            {t("guidanceQuotesMeetExperts")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
