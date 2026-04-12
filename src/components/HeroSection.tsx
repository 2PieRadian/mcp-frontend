import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ArrowRight, FileText, Lock, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

const HERO_CARD_IMAGES = {
  wellness: "/images/hero/hero-wellness.jpg",
  finance: "/images/hero/hero-finance.jpg",
  education: "/images/hero/hero-education.jpg",
} as const;

const CARD_GAP = 10;
/** Top-row cards (vertical layout): image + title + body + CTA */
const ROW1_H = 308;
/** Bottom full-width card (horizontal layout): needs extra room so copy is not clipped */
const ROW2_H = 188;
const DECK_HEIGHT = ROW1_H + CARD_GAP + ROW2_H;
const ROTATE_MS = 3000;
const TWEEN_DURATION = 0.92;
const TWEEN_STAGGER = 0.06;

type Slot = "tl" | "tr" | "bottom";

const ROTATION_LAYOUTS: Array<{
  wellness: Slot;
  finance: Slot;
  education: Slot;
}> = [
  { wellness: "tl", finance: "tr", education: "bottom" },
  { wellness: "bottom", finance: "tl", education: "tr" },
  { wellness: "tr", finance: "bottom", education: "tl" },
];

function slotBox(
  slot: Slot,
  W: number,
  gap: number,
  row1: number,
  row2: number,
): { left: number; top: number; width: number; height: number } {
  const half = (W - gap) / 2;
  if (slot === "tl") {
    return { left: 0, top: 0, width: half, height: row1 };
  }
  if (slot === "tr") {
    return { left: half + gap, top: 0, width: half, height: row1 };
  }
  return { left: 0, top: row1 + gap, width: W, height: row2 };
}

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

type HeroCategoryCardProps = {
  to: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  body: string;
  footerClass: string;
  linkClassName?: string;
  layout?: "vertical" | "horizontal";
};

function HeroCategoryCard({
  to,
  imageSrc,
  imageAlt,
  title,
  body,
  footerClass,
  linkClassName = "",
  layout = "vertical",
}: HeroCategoryCardProps) {
  const { t } = useTranslation("common");
  const isHorizontal = layout === "horizontal";

  const imageBlock = (
    <div
      className={
        isHorizontal
          ? "w-[min(42%,11.5rem)] max-w-[184px] shrink-0 self-stretch overflow-hidden bg-slate-100 sm:max-w-[200px]"
          : "aspect-4/3 w-full shrink-0 overflow-hidden bg-slate-100"
      }
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className={`h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04] ${isHorizontal ? "min-h-29 sm:min-h-31" : ""}`}
        width={400}
        height={300}
        decoding="async"
      />
    </div>
  );

  const textBlock = (
    <div
      className={`flex flex-col ${isHorizontal ? "min-w-0 flex-1 justify-center px-3 py-3 sm:px-4 sm:py-3.5" : "px-3.5 pb-3 pt-3"} ${footerClass}`}
    >
      <h3 className="text-lg font-bold tracking-tight text-[#1A2B3C] sm:text-xl">
        {title}
      </h3>
      <p
        className={`mt-1.5 text-xs leading-snug text-[#555555] sm:text-[13px] sm:leading-relaxed ${isHorizontal ? "line-clamp-4" : "line-clamp-3"}`}
      >
        {body}
      </p>
      <span className="mt-2 inline-flex items-center gap-0.5 text-xs font-semibold text-[#2D8A6E] sm:text-sm">
        {t("heroCardExplore")}
        <ArrowRight
          className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 sm:h-4 sm:w-4"
          aria-hidden
        />
      </span>
    </div>
  );

  return (
    <Link
      to={to}
      className={`hero-card-link group flex h-full min-h-0 w-full min-w-0 overflow-hidden rounded-2xl border border-white/90 shadow-[0_12px_32px_-18px_rgba(26,43,60,0.18)] ring-1 ring-slate-900/5 transition-[box-shadow,transform] hover:shadow-[0_16px_36px_-18px_rgba(26,43,60,0.24)] ${isHorizontal ? "flex-row" : "flex-col"} ${linkClassName}`}
    >
      {imageBlock}
      {textBlock}
    </Link>
  );
}

function relativeRect(
  el: HTMLElement,
  containerRect: DOMRect,
): { left: number; top: number; width: number; height: number } {
  const r = el.getBoundingClientRect();
  return {
    left: r.left - containerRect.left,
    top: r.top - containerRect.top,
    width: r.width,
    height: r.height,
  };
}

function HeroRotatingCards() {
  const { t } = useTranslation("common");
  const containerRef = useRef<HTMLDivElement>(null);
  const wellnessWrapRef = useRef<HTMLDivElement>(null);
  const financeWrapRef = useRef<HTMLDivElement>(null);
  const educationWrapRef = useRef<HTMLDivElement>(null);

  const [layoutStep, setLayoutStep] = useState(0);
  const layoutStepRef = useRef(0);
  layoutStepRef.current = layoutStep;

  const busyRef = useRef(false);

  const applyPositions = useCallback((step: number, immediate: boolean) => {
    const c = containerRef.current;
    const wEl = wellnessWrapRef.current;
    const fEl = financeWrapRef.current;
    const eEl = educationWrapRef.current;
    if (!c || !wEl || !fEl || !eEl) return;

    const W = c.clientWidth;
    const L = ROTATION_LAYOUTS[step];
    const map = {
      wellness: slotBox(L.wellness, W, CARD_GAP, ROW1_H, ROW2_H),
      finance: slotBox(L.finance, W, CARD_GAP, ROW1_H, ROW2_H),
      education: slotBox(L.education, W, CARD_GAP, ROW1_H, ROW2_H),
    };

    const els = [wEl, fEl, eEl];
    const boxes = [map.wellness, map.finance, map.education];
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    els.forEach((el, i) => {
      const b = boxes[i];
      if (immediate || reduceMotion) {
        gsap.set(el, {
          left: b.left,
          top: b.top,
          width: b.width,
          height: b.height,
        });
      }
    });
  }, []);

  const tweenToStep = useCallback(
    (toStep: number, onComplete: () => void) => {
      const c = containerRef.current;
      const wEl = wellnessWrapRef.current;
      const fEl = financeWrapRef.current;
      const eEl = educationWrapRef.current;
      if (!c || !wEl || !fEl || !eEl) {
        onComplete();
        return;
      }

      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        layoutStepRef.current = toStep;
        setLayoutStep(toStep);
        applyPositions(toStep, true);
        onComplete();
        return;
      }

      const cRect = c.getBoundingClientRect();
      const W = c.clientWidth;
      const toL = ROTATION_LAYOUTS[toStep];

      const cards = [
        { el: wEl, key: "wellness" as const },
        { el: fEl, key: "finance" as const },
        { el: eEl, key: "education" as const },
      ];

      gsap.killTweensOf([wEl, fEl, eEl]);

      const tl = gsap.timeline({
        defaults: { duration: TWEEN_DURATION, ease: "power3.inOut" },
        onComplete: onComplete,
      });

      cards.forEach((card, index) => {
        const to = slotBox(toL[card.key], W, CARD_GAP, ROW1_H, ROW2_H);
        const start = relativeRect(card.el, cRect);
        gsap.set(card.el, {
          left: start.left,
          top: start.top,
          width: start.width,
          height: start.height,
        });
        tl.to(
          card.el,
          {
            left: to.left,
            top: to.top,
            width: to.width,
            height: to.height,
            overwrite: "auto",
          },
          index * TWEEN_STAGGER,
        );
      });

      tl.call(
        () => {
          layoutStepRef.current = toStep;
          setLayoutStep(toStep);
        },
        undefined,
        TWEEN_DURATION * 0.55,
      );
    },
    [applyPositions],
  );

  useLayoutEffect(() => {
    applyPositions(0, true);
  }, [applyPositions]);

  useEffect(() => {
    const onResize = () => {
      applyPositions(layoutStepRef.current, true);
    };
    const ro = new ResizeObserver(onResize);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [applyPositions]);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (busyRef.current) return;
      busyRef.current = true;
      const from = layoutStepRef.current;
      const to = (from + 1) % ROTATION_LAYOUTS.length;
      tweenToStep(to, () => {
        busyRef.current = false;
      });
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [tweenToStep]);

  const L = ROTATION_LAYOUTS[layoutStep];

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-lg xl:mx-0 xl:max-w-[440px]"
      style={{ height: DECK_HEIGHT }}
    >
      <div
        ref={wellnessWrapRef}
        className="absolute z-1 overflow-hidden rounded-2xl will-change-[left,top,width,height]"
        style={{ left: 0, top: 0 }}
      >
        <HeroCategoryCard
          to="/wellness-experts"
          imageSrc={HERO_CARD_IMAGES.wellness}
          imageAlt={t("wellness")}
          title={t("wellness")}
          body={t("heroCardWellnessBody")}
          footerClass="bg-white"
          layout={L.wellness === "bottom" ? "horizontal" : "vertical"}
        />
      </div>
      <div
        ref={financeWrapRef}
        className="absolute z-1 overflow-hidden rounded-2xl will-change-[left,top,width,height]"
        style={{ left: 0, top: 0 }}
      >
        <HeroCategoryCard
          to="/finance-experts"
          imageSrc={HERO_CARD_IMAGES.finance}
          imageAlt={t("finance")}
          title={t("finance")}
          body={t("heroCardFinanceBody")}
          footerClass="bg-[#f4fafc]"
          layout={L.finance === "bottom" ? "horizontal" : "vertical"}
        />
      </div>
      <div
        ref={educationWrapRef}
        className="absolute z-1 overflow-hidden rounded-2xl will-change-[left,top,width,height]"
        style={{ left: 0, top: 0 }}
      >
        <HeroCategoryCard
          to="/education-experts"
          imageSrc={HERO_CARD_IMAGES.education}
          imageAlt={t("education")}
          title={t("education")}
          body={t("heroCardEducationBody")}
          footerClass="bg-[#fffbf3]"
          layout={L.education === "bottom" ? "horizontal" : "vertical"}
        />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { t } = useTranslation("common");

  const leftColumn = (
    <div className="mx-auto min-w-0 max-w-xl flex-1 text-center xl:mx-0 xl:text-left">
      <h1 className="text-balance text-[clamp(2.5rem,7.2vw,3.35rem)] font-bold leading-[1.1] tracking-tight text-[#1A2B3C] sm:text-[clamp(2.65rem,5vw,3.35rem)]">
        {t("heroDesignTitle1")}
        <span className="mt-1 block text-[#2D8A6E]">
          {t("heroDesignTitle2")}
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-[#555555] sm:text-lg xl:mx-0">
        {t("heroDesignSub")}
      </p>

      <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center xl:justify-start">
        <Link
          to="/choose-experts"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F5A4E] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_28px_-6px_rgba(15,90,78,0.55)] transition hover:bg-[#0c4d42] hover:shadow-[0_12px_32px_-6px_rgba(15,90,78,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D8A6E]"
        >
          {t("heroDesignCtaPrimary")}
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
        </Link>
        <a
          href="#expert-verified-assessments"
          onClick={(e) => smoothScrollToHash(e, "#expert-verified-assessments")}
          className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#2D8A6E]/35 bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0F5A4E] shadow-sm transition hover:border-[#2D8A6E]/55 hover:bg-emerald-50/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D8A6E]"
        >
          <FileText className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
          {t("heroDesignCtaSecondary")}
        </a>
      </div>

      <ul
        className="mt-10 flex max-w-full flex-nowrap items-center justify-center gap-x-4 overflow-x-auto sm:gap-x-8 xl:justify-start [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <li className="flex shrink-0 items-center gap-2 text-xs font-medium text-[#1A2B3C] whitespace-nowrap sm:gap-2.5 sm:text-sm">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#2D8A6E] sm:h-9 sm:w-9">
            <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
          </span>
          {t("heroDesignTrustExpert")}
        </li>
        <li className="flex shrink-0 items-center gap-2 text-xs font-medium text-[#1A2B3C] whitespace-nowrap sm:gap-2.5 sm:text-sm">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#2D8A6E] sm:h-9 sm:w-9">
            <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
          </span>
          {t("heroDesignTrustPrivate")}
        </li>
      </ul>
    </div>
  );

  return (
    <section className="isolate w-full overflow-x-hidden pb-16 mt-10 sm:pb-20 sm:pt-12 lg:min-h-0 lg:pb-24 lg:pt-10 xl:pt-12">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-between xl:gap-10">
          {leftColumn}
          <div className="min-w-0 shrink-0 xl:w-[min(100%,460px)]">
            <HeroRotatingCards />
          </div>
        </div>
      </div>
    </section>
  );
}
