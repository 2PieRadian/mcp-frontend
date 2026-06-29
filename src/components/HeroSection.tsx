import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

type HeroCategory = {
  key: string;
  to: string;
  imageSrc: string;
  titleKey: string;
  bodyKey: string;
  glow: string;
  imageClassName?: string;
};

const HERO_CATEGORIES: readonly HeroCategory[] = [
  {
    key: "wellness",
    to: "/wellness-experts",
    imageSrc: "/images/category/wellness/wellness.png",
    titleKey: "wellness",
    bodyKey: "heroCardWellnessBody",
    glow: "bg-emerald-300/35",
  },
  {
    key: "education",
    to: "/education-experts",
    imageSrc: "/images/category/education/education.png",
    titleKey: "education",
    bodyKey: "heroCardEducationBody",
    glow: "bg-amber-300/35",
  },
  {
    key: "finance",
    to: "/finance-experts",
    imageSrc: "/images/category/finance/finance.png",
    titleKey: "finance",
    bodyKey: "heroCardFinanceBody",
    glow: "bg-sky-300/35",
  },
  {
    key: "technology",
    to: "/digital-technology-solutions",
    imageSrc: "/images/category/it/it_solutions.png",
    titleKey: "digitalTechnologySolutions",
    bodyKey: "heroCardTechnologyBody",
    glow: "bg-[#149373]/25",
    imageClassName: "object-contain",
  },
];

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

function WaveShape({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute text-[#dff3ee] ${className}`}
      viewBox="0 0 900 360"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 280C162 120 254 218 386 186C535 150 556 15 720 50C802 68 858 136 898 176V360H0C0 360 -10 312 18 280Z"
        fill="currentColor"
        opacity="0.62"
      />
      {Array.from({ length: 8 }).map((_, index) => (
        <path
          key={index}
          d={`M${10 + index * 4} ${270 - index * 14}C160 ${
            110 - index * 2
          } 255 ${210 - index * 9} 390 ${178 - index * 12}C535 ${
            142 - index * 13
          } 560 ${18 + index * 2} 716 ${54 + index * 8}C802 ${
            72 + index * 8
          } 854 ${132 + index * 5} 898 ${170 + index * 6}`}
          stroke="#b7dfd5"
          strokeWidth="1"
          opacity="0.45"
        />
      ))}
    </svg>
  );
}

function CategoryCard({
  category,
}: {
  category: (typeof HERO_CATEGORIES)[number];
}) {
  const { t } = useTranslation("common");
  const title = t(category.titleKey);
  const body = t(category.bodyKey);

  return (
    <Link
      to={category.to}
      className="group relative isolate flex min-h-[430px] overflow-hidden rounded-4xl border border-stone-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div
        className={`absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl transition duration-500 group-hover:scale-125 ${category.glow}`}
      />

      <div className="flex w-full flex-col">
        <div className="relative h-56 overflow-hidden">
          <div className="absolute right-[-24px] top-[-24px] h-28 w-28 rounded-full bg-white/35 blur-2xl" />

          <img
            src={category.imageSrc}
            alt={title}
            className={`h-full w-full transition duration-700 ease-out group-hover:scale-110 ${
              category.imageClassName || "object-cover"
            }`}
            decoding="async"
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
          <span className="mt-[20px] inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#0F766E] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_26px_-10px_rgba(15,118,110,0.75)] transition group-hover:bg-[#0D635C]">
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
      <section className="relative min-h-[calc(100svh-88px)] bg-white flex flex-col overflow-hidden pt-[10vh]">
        <WaveShape className="right-[-10%] bottom-[-25%] w-[120%] min-w-[1400px] h-auto" />
        <div className="relative mx-auto flex w-full max-w-[1350px] flex-col px-[16px] sm:px-[20px] pb-24 z-10">
          <div className="max-w-[760px]">
            <h1 className="mt-4 text-[42px] font-extrabold leading-[1.1] tracking-[-0.04em] text-[#0d1f36] sm:text-[56px] lg:text-[64px]">
              <Trans
                i18nKey="discoverYourPath"
                components={{ highlight: <span className="text-[#159374]" /> }}
              />
            </h1>

            <p className="mt-8 max-w-[620px] text-[22px] leading-[1.55] text-[#5d6672]">
              {t("heroDesignSub")}
            </p>

            <div className="mt-10 flex w-full flex-col gap-4 sm:flex-row">
              <Link
                to="/choose-experts"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#149373] px-9 py-[18px] text-[16px] font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#107b5f]"
              >
                {t("heroDesignCtaPrimary")}
              </Link>
              <a
                href="#expert-verified-assessments"
                onClick={(e) =>
                  smoothScrollToHash(e, "#expert-verified-assessments")
                }
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-9 py-[18px] text-[16px] font-semibold text-black shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
              >
                {t("heroDesignCtaSecondary")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="categories-heading"
        className="w-full px-[16px] py-16 sm:px-[20px] sm:py-20 lg:py-24"
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

          <div className="grid gap-[10px] md:grid-cols-2 xl:grid-cols-4">
            {HERO_CATEGORIES.map((category) => (
              <CategoryCard key={category.key} category={category} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
