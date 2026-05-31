import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const HERO_CATEGORIES = [
  {
    key: "wellness",
    to: "/wellness-experts",
    imageSrc: "/images/hero/hero-wellness.jpg",
    titleKey: "wellness",
    bodyKey: "heroCardWellnessBody",
    gradient: "from-emerald-500/45 via-teal-500/35 to-cyan-500/30",
    glow: "bg-emerald-300/35",
  },
  {
    key: "education",
    to: "/education-experts",
    imageSrc: "/images/hero/hero-education.jpg",
    titleKey: "education",
    bodyKey: "heroCardEducationBody",
    gradient: "from-amber-500/45 via-orange-400/35 to-yellow-400/30",
    glow: "bg-amber-300/35",
  },
  {
    key: "finance",
    to: "/finance-experts",
    imageSrc: "/images/hero/hero-finance.jpg",
    titleKey: "finance",
    bodyKey: "heroCardFinanceBody",
    gradient: "from-sky-500/45 via-blue-500/35 to-indigo-500/30",
    glow: "bg-sky-300/35",
  },
  {
    key: "technology",
    to: "/digital-technology-solutions",
    imageSrc: "/career-domains/it-services.svg",
    title: "Digital & Technology Solutions",
    body: "Build websites, mobile apps, custom software, e-commerce platforms, cloud systems, and digital growth tools tailored to your business.",
    gradient: "from-[#149373]/40 via-[#62af9b]/28 to-[#dff3ee]/35",
    glow: "bg-[#149373]/25",
    imageClassName: "object-contain p-10",
    highlights: ["Websites", "Mobile Apps", "Software", "Cloud"],
  },
] as const;

function smoothScrollToHash(
  e: React.MouseEvent<HTMLAnchorElement>,
  hash: string,
) {
  e.preventDefault();
  const el = document.getElementById(hash.replace("#", ""));
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.hash = hash;
  }
}

function CategoryCard({
  category,
}: {
  category: (typeof HERO_CATEGORIES)[number];
}) {
  const { t } = useTranslation("common");
  const title = "title" in category ? category.title : t(category.titleKey);
  const body = "body" in category ? category.body : t(category.bodyKey);

  return (
    <Link
      to={category.to}
      className="group relative isolate flex min-h-[430px] overflow-hidden rounded-4xl border border-white/70 bg-white shadow-[0_24px_70px_-34px_rgba(15,23,42,0.5)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_34px_80px_-32px_rgba(15,90,78,0.45)]"
    >
      <div
        className={`absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl transition duration-500 group-hover:scale-125 ${category.glow}`}
      />

      <div className="flex w-full flex-col">
        <div className="relative h-56 overflow-hidden">
          <div className="absolute right-[-24px] top-[-24px] h-28 w-28 rounded-full bg-white/35 blur-2xl" />
          <div
            className="pointer-events-none absolute left-5 top-5 z-10 h-[86px] w-[110px] opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(20,147,115,0.7) 1.4px, transparent 1.6px)",
              backgroundSize: "12px 12px",
            }}
          />
          <img
            src={category.imageSrc}
            alt={title}
            className={`h-full w-full transition duration-700 ease-out group-hover:scale-110 ${
              "imageClassName" in category
                ? category.imageClassName
                : "object-cover"
            }`}
            width={520}
            height={340}
            decoding="async"
          />
          <div
            className={`absolute inset-0 bg-linear-to-br ${category.gradient}`}
          />
        </div>

        <div className="relative flex flex-1 flex-col p-6 sm:p-7">
          <div className="pointer-events-none absolute inset-x-7 top-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
          <h3 className="text-2xl font-bold tracking-tight text-[#1A2B3C]">
            {title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
            {body}
          </p>
          {"highlights" in category && (
            <div className="mt-5 flex flex-wrap gap-2">
              {category.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-[#149373]/15 bg-[#e9f5ef] px-3 py-1 text-xs font-semibold text-[#0F5A4E]"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}
          <span className="mt-auto inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#0F5A4E] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_26px_-10px_rgba(15,90,78,0.75)] transition group-hover:bg-[#0c4d42]">
            {t("heroCardExplore")}
            <ArrowRight
              className="h-4 w-4 shrink-0 transition group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function HeroSection() {
  const { t } = useTranslation("common");

  return (
    <>
      <section className="relative isolate w-full overflow-hidden px-[16px] pb-12 pt-4 sm:px-[20px] sm:pb-16 sm:pt-8 lg:pb-20">
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-white via-[#f7fbfa] to-white" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t from-white to-transparent" />

        <div className="mx-auto flex min-h-[clamp(340px,48vw,500px)] max-w-[1000px] flex-col items-center justify-center text-center">
          <h1 className="max-w-4xl text-balance text-[clamp(2.05rem,5vw,4rem)] font-bold leading-[1.04] tracking-tight text-[#1A2B3C]">
            <Trans
              i18nKey="discoverYourPath"
              components={{ highlight: <span className="text-[#2D8A6E]" /> }}
            />
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-[#555555] sm:text-xl">
            {t("heroDesignSub")}
          </p>

          <div className="mt-9 flex w-full max-w-xl flex-col items-stretch justify-center gap-3 sm:flex-row">
            <Link
              to="/choose-experts"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2D8A6E] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_14px_34px_-12px_rgba(45,138,110,0.75)] transition hover:-translate-y-0.5 hover:bg-[#25765e] hover:shadow-[0_18px_42px_-14px_rgba(45,138,110,0.8)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D8A6E]"
            >
              {t("heroDesignCtaPrimary")}
            </Link>
            <a
              href="#expert-verified-assessments"
              onClick={(e) =>
                smoothScrollToHash(e, "#expert-verified-assessments")
              }
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-[15px] font-semibold text-black shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D8A6E]"
            >
              {t("heroDesignCtaSecondary")}
            </a>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="categories-heading"
        className="w-full px-[16px] pb-16 sm:px-[20px] sm:pb-20 lg:pb-24"
      >
        <div className="mx-auto max-w-[1350px]">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2
              id="categories-heading"
              className="text-[clamp(2rem,4vw,3.4rem)] font-bold leading-tight tracking-tight text-[#1A2B3C]"
            >
              {t("categoriesSectionTitle", { defaultValue: "Categories" })}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {t("categoriesSectionSubtitle", {
                defaultValue:
                  "Explore support across wellness, education, and finance with clear next steps.",
              })}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 lg:gap-8">
            {HERO_CATEGORIES.map((category, index) => (
              <div
                key={category.key}
                className={
                  index === HERO_CATEGORIES.length - 1 ? "xl:col-start-2" : ""
                }
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
