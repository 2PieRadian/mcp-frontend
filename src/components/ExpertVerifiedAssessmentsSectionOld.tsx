import { BadgeIndianRupee, Cross, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ExpertVerifiedAssessmentsSection() {
  const { t } = useTranslation(["common", "navigation"]);

  return (
    <div className="mt-[70px] max-w-[1350px] mx-auto">
      <h1 className="text-3xl font-bold text-center">
        {t("expertVerifiedAssessments", { ns: "common" })}
      </h1>
      <p className="text-[15px] mt-[10px] max-w-[800px] mx-auto text-center text-[#4F5B64]">
        {t("takePreScreenerTests", { ns: "common" })}
      </p>

      <div className="flex items-center justify-center gap-[10px] mt-[70px]">
        <div className="border-2 relative border-[#0bca87] rounded-[15px] p-[20px] cursor-pointer flex-1 py-[50px] flex items-center justify-center">
          <div className="absolute top-[-30px] left-[50%] -translate-x-1/2 bg-white px-[7px]">
            <Cross size={60} className="text-[#0bca87]" />
          </div>

          <h1 className="text-xl font-medium text-[#0bca87]">
            {t("wellnessExperts", { ns: "navigation" })}
          </h1>
        </div>

        <div className="border-2 relative border-[#244ea7] rounded-[15px] p-[20px] cursor-pointer flex-1 py-[50px] flex items-center justify-center">
          <div className="absolute top-[-30px] left-[50%] -translate-x-1/2 bg-white px-[7px]">
            <GraduationCap size={60} className="text-[#244ea7]" />
          </div>

          <h1 className="text-xl font-medium text-[#244ea7]">
            {t("educationExperts", { ns: "navigation" })}
          </h1>
        </div>

        <div className="border-2 relative border-[#f7c11f] rounded-[15px] p-[20px] cursor-pointer flex-1 py-[50px] flex items-center justify-center">
          <div className="absolute top-[-30px] left-[50%] -translate-x-1/2 bg-white px-[7px]">
            <BadgeIndianRupee size={60} className="text-[#f7c11f]" />
          </div>

          <h1 className="text-xl font-medium text-[#f7c11f]">
            {t("financeExperts", { ns: "navigation" })}
          </h1>
        </div>
      </div>
    </div>
  );
}
