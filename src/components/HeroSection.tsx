import { HandHeart, UserStar } from "lucide-react";
import { useScreen } from "../context/ScreenContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function HeroSectionCard({
  title,
  description,
  className,
  icon,
  isHorizontal = false,
  linkTo,
}: {
  title: string;
  description: string;
  className?: string;
  icon?: React.ReactNode;
  isHorizontal?: boolean;
  linkTo?: string;
}) {
  return (
    <Link
      to={linkTo || ""}
      className={isHorizontal ? "flex-1 flex flex-col" : ""}
    >
      <div
        className={`shadow-drop-shadow flex flex-col gap-[8px] hover:scale-[1.03] hover:shadow-[4px_4px_10px_rgba(0,0,0,0.28)] transition-all duration-150 cursor-pointer ${
          isHorizontal ? "w-full flex-1" : "w-[274px]"
        } rounded-[15px] ${
          isHorizontal
            ? "py-[20px] px-[15px] border border-hero"
            : "py-[25px] px-[25px]"
        } ${isHorizontal ? "relative" : "absolute"} ${className}`}
      >
        {/* Icon */}
        <div className="flex justify-center">{icon}</div>

        {/* Title and Description */}
        <div className={isHorizontal ? "text-center" : "text-center"}>
          <h3
            className={`${
              isHorizontal ? "text-[16px]" : "text-[18px]"
            } font-medium`}
          >
            {title}
          </h3>
          <p
            className={`${
              isHorizontal ? "text-[12px]" : "text-[14px]"
            } mt-[5px]`}
          >
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

function HeroSectionContent() {
  const { screenWidth } = useScreen();
  const { t } = useTranslation("sectors");

  return (
    <div className="flex-1">
      <h1 className="font-bold text-[45px] leading-none text-[hsl(186,48%,28%)]">
        Get Expert Guidance for Life, Career, and Money.
      </h1>

      <p className="text-[18px] mt-[20px] text-[hsl(186,22%,37%)]">
        Because the right advice can change everything.
      </p>

      <div
        className={`flex mt-[30px] ${
          screenWidth <= 500 ? "flex-col gap-[10px]" : "gap-[20px]"
        }`}
      >
        <Link
          to="/login"
          className="border-none bg-[hsl(186,54%,29%)] cursor-pointer text-white text-center rounded-[15px] px-[25px] py-[13px] hover:bg-[hsl(185,39%,25%)] transition shadow-drop-shadow hover:translate-y-[-2px]"
        >
          {t("bookYourAppointment", { ns: "common" })}
        </Link>
      </div>
    </div>
  );
}

function HeroSectionFloatingCards() {
  const { t } = useTranslation("sectors");

  return (
    <div className="flex-1 relative">
      <HeroSectionCard
        icon={<HandHeart size={70} className="m-auto mb-[10px]" />}
        title={t("hero.wellnessEcosystem")}
        description={t("hero.wellnessDescription")}
        className="bg-[hsl(0,0%,98%,70%)] top-[-80px] right-[250px] z-2 text-hero-heading animate-float-1"
        linkTo="/wellness-experts"
      />

      <HeroSectionCard
        icon={<UserStar size={70} className="m-auto mb-[10px]" />}
        title={t("hero.financeSector")}
        description={t("hero.financeDescription")}
        className="bg-[hsl(0,0%,98%,60%)] top-[140px] right-[285px] text-hero-heading z-1 animate-float-2"
        linkTo="/finance-experts"
      />

      <HeroSectionCard
        icon={
          <img
            src="./images/healing.png"
            alt="Education Sector"
            className="w-[70px] m-auto mb-[10px]"
          />
        }
        title={t("hero.educationSector")}
        description={t("hero.educationDescription")}
        className="bg-[hsl(194,19%,18%)] top-[50px] right-0 text-white z-1 animate-float-3"
        linkTo="/education-experts"
      />

      <div className="absolute top-[129px] right-[280px] w-[10px] h-[10px] bg-[hsl(194,7%,64%)] shadow-background-light"></div>
    </div>
  );
}

function HeroSectionHorizontalCards() {
  const { screenWidth } = useScreen();
  const { t } = useTranslation("sectors");

  return (
    <div
      className={`flex items-stretch gap-[15px] mt-16 mb-[70px] ${
        screenWidth <= 500 ? "flex-col" : ""
      }`}
    >
      <HeroSectionCard
        icon={<HandHeart size={50} className="m-auto mb-[6px]" />}
        title={t("hero.wellnessEcosystem")}
        description={t("hero.wellnessDescription")}
        className="bg-[hsl(0,0%,98%,70%)] text-hero-heading"
        isHorizontal={true}
        linkTo="/wellness-experts"
      />

      <HeroSectionCard
        icon={<UserStar size={50} className="m-auto mb-[6px]" />}
        title={t("hero.financeSector")}
        description={t("hero.financeDescription")}
        className="bg-[hsl(0,0%,98%,60%)] text-hero-heading"
        isHorizontal={true}
        linkTo="/finance-experts"
      />

      <HeroSectionCard
        icon={
          <img
            src="./images/healing.png"
            alt="Education Sector"
            className="w-[50px] m-auto mb-[6px]"
          />
        }
        title={t("hero.educationSector")}
        description={t("hero.educationDescription")}
        className="bg-[hsl(194,19%,18%)] text-white"
        isHorizontal={true}
        linkTo="/education-experts"
      />
    </div>
  );
}

export default function HeroSection() {
  const { screenWidth } = useScreen();

  if (screenWidth <= 1170) {
    return (
      <div className="max-w-[1350px] mx-auto mt-16">
        {/* Content */}
        <HeroSectionContent />

        {/* Horizontal Cards */}
        <HeroSectionHorizontalCards />
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="flex max-w-[1350px] mx-auto justify-between mt-44 min-h-[480px]">
      {/* Left Div */}
      <HeroSectionContent />

      {/* Right Div */}
      <HeroSectionFloatingCards />
    </div>
  );
}
