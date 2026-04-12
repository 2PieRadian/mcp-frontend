import { useTranslation } from "react-i18next";

type ExpertsTitleProps = {
  specialization?: string;
  sector?: string;
};

export default function ExpertsTitle({
  specialization,
  sector,
}: ExpertsTitleProps) {
  const { t } = useTranslation(["experts"]);

  const displayTitle =
    specialization ||
    (sector
      ? `${sector} ${t("expertsTitleAll", { ns: "experts" })}`
      : t("expertsTitleAll", { ns: "experts" }));

  return (
    <div className="max-w-[1350px] mx-auto">
      <h1 className="text-white text-[16px] md:text-[20px] font-medium bg-experts-hero-bg text-center py-[10px] rounded-[30px] my-[10px]">
        {displayTitle}
      </h1>
    </div>
  );
}
