import { useTranslation } from "react-i18next";

type ExpertsTitleProps = {
  sector: string;
};

export default function ExpertsTitle({ sector }: ExpertsTitleProps) {
  const { t } = useTranslation("common");

  const sectorTitles: Record<string, string> = {
    wellness: "Therapists",
    education: t("educationSector"),
    finance: t("financeSector"),
    yoga: "Yoga Experts",
    dieticians: "Dieticians",
  };

  return (
    <div className="max-w-[1350px] mx-auto">
      <h1 className="text-white text-[16px] md:text-[20px] font-medium bg-therapists-hero-bg text-center py-[10px] rounded-[30px] my-[10px]">
        {sectorTitles[sector] || t("expertSector")}
      </h1>
    </div>
  );
}

