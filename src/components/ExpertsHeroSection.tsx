import { useMemo } from "react";

interface ExpertsHeroSectionProps {
  subtitle: string;
  title: string;
  description: string;
  badgeText: string;
  badgeDescription: string;
  imageSrc: string;
  imageAlt: string;
  imageSize: number;
  maxWidth: number;
}

export default function ExpertsHeroSection({
  subtitle,
  title,
  description,
  badgeText,
  badgeDescription,
  imageSrc,
  imageAlt,
  imageSize = 420,
  maxWidth = 420,
}: ExpertsHeroSectionProps) {
  const imageId = useMemo(
    () => `expert-hero-image-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  return (
    <section className="mt-[16px] px-0 mb-[15px]">
      <style>{`
        #${imageId} {
          max-width: 100%;
        }
        @media (min-width: 770px) {
          #${imageId} {
            max-width: ${imageSize}px;
          }
        }
      `}</style>
      <div className="expert-hero-gradient w-full sm:max-w-[1350px] mx-auto rounded-[20px] sm:rounded-[30px] shadow-[0_3px_7px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col md:flex-row md:items-stretch justify-between gap-[16px] sm:gap-[24px] px-[18px] sm:px-[28px] py-[20px] sm:py-[30px]">
          {/* Left content */}
          <div className="flex-1 flex flex-col gap-[10px] sm:gap-[14px] text-white max-w-[520px] md:max-w-[480px]">
            <p className="text-[11px] sm:text-[12px] tracking-[0.24em] uppercase text-white/80">
              {subtitle}
            </p>
            <h1 className="text-[clamp(22px,4.2vw,32px)] font-semibold leading-tight">
              {title}
            </h1>
            <p className="text-[13px] sm:text-[14px] text-white/90 leading-relaxed">
              {description}
            </p>

            <div className="mt-[6px] sm:mt-[10px] flex flex-wrap items-center gap-[10px] sm:gap-[12px]">
              <div className="px-[14px] sm:px-[18px] py-[8px] sm:py-[9px] rounded-full bg-[hsl(0,0%,95%)] text-[12px] sm:text-[13px] font-medium text-[hsl(194,57%,17%)] shadow-m cursor-default">
                {badgeText}
              </div>

              <p className="text-[11px] sm:text-[12px] text-white/85">
                {badgeDescription}
              </p>
            </div>
          </div>

          {/* Right image */}
          <div className="hidden min-[770px]:flex flex-1 justify-start min-[770px]:justify-end w-full sm:w-auto">
            <div className="relative flex items-center justify-start min-[770px]:justify-end w-full mt-[10px] sm:mt-0 animate-float-1 max-[770px]:max-w-full md:max-w-[380px] lg:max-w-[420px]">
              <div className="absolute -inset-[10%] bg-linear-to-tr from-white/15 via-transparent to-white/5 blur-3xl opacity-70 pointer-events-none" />

              <img
                id={imageId}
                src={imageSrc}
                alt={imageAlt}
                className="relative w-full h-auto object-contain drop-shadow-[0_5px_4px_rgba(0,0,0,0.15)] rounded-[20px]"
                style={{ maxWidth: `${maxWidth}px` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
