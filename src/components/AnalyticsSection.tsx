import { useScreen } from "../context/ScreenContext";
import { useTranslation } from "react-i18next";

function AnalyticsSectionCard({
  value,
  description,
  isHorizontal = false,
  animatedValue,
}: {
  value: string;
  description: string;
  isHorizontal?: boolean;
  animatedValue?: number;
}) {
  return (
    <div
      className={`border border-[#B5B5B5] bg-white rounded-[15px] ${
        isHorizontal ? "p-[15px]" : "p-[20px]"
      } ${isHorizontal ? "flex-1" : "min-w-[300px]"}`}
    >
      <h1
        className={`font-semibold ${
          isHorizontal ? "text-[28px]" : "text-[35px]"
        } text-[#323949] text-center`}
      >
        {animatedValue !== undefined
          ? animatedValue.toLocaleString() + "+"
          : value}
      </h1>
      <p
        className={`text-center ${
          isHorizontal ? "text-[14px]" : "text-[17px]"
        } text-light-text`}
      >
        {description}
      </p>
    </div>
  );
}

export default function AnalyticsSection() {
  const { t } = useTranslation("common");
  const { screenWidth } = useScreen();

  if (screenWidth <= 1170) {
    return (
      <div className="w-[calc(100% + 40px)] -mx-[20px] pt-[50px] pb-[50px] bg-light-100">
        <div
          className={`flex items-stretch gap-[15px] px-[20px] ${
            screenWidth <= 600 ? "flex-col" : ""
          }`}
        >
          <AnalyticsSectionCard
            value="X"
            description={t("certifiedPioneerProfessionals")}
            isHorizontal={true}
          />

          <AnalyticsSectionCard
            value="Y"
            description={t("livesTransformed")}
            isHorizontal={true}
          />

          <AnalyticsSectionCard
            value="Z"
            description={t("specializedTools")}
            isHorizontal={true}
          />
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="w-[calc(100% + 40px)] -mx-[20px] pt-[50px] pb-[50px] bg-light-100 flex justify-center items-center gap-[30px] px-[20px]">
      <AnalyticsSectionCard
        value="X"
        description={t("mentalWellnessProfessionals")}
      />

      <AnalyticsSectionCard value="Y" description={t("livesTransformed")} />

      <AnalyticsSectionCard value="Z" description={t("specializedTools")} />
    </div>
  );
}
