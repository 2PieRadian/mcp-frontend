import { useTranslation } from "react-i18next";

type TherapistsTitleProps = {
  sector: string;
};

export default function TherapistsTitle({ sector }: TherapistsTitleProps) {
  const { t } = useTranslation("common");

  const sectorTitles: Record<string, string> = {
    wellness: "Therapists",
    education: t("educationSector"),
    finance: t("financeSector"),
  };

  return (
    <div className="max-w-[1350px] mx-auto">
      <h1 className="text-white text-[16px] md:text-[20px] font-medium bg-[#304048] text-center py-[10px] rounded-[30px] my-[10px]">
        {sectorTitles[sector] || t("expertSector")}
      </h1>
    </div>
  );
}
