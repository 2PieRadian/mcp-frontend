import { useTranslation } from "react-i18next";

function ExpertVerifiedAssessmentsSectionItem({
  title,
  subtitle,
  description,
  imageSrc,
  imageSize,
  rightImage,
}: {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageSize: number;
  rightImage: boolean;
}) {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        rightImage ? "md:flex-row" : "md:flex-row-reverse"
      } mb-[20px] md:mb-[30px] overflow-hidden items-center justify-between gap-[15px] md:gap-[20px] px-[20px] md:px-0`}
    >
      <div className="left flex-1 w-full md:w-auto order-2 md:order-none">
        <h1 className="text-[clamp(28px,5vw,40px)] font-bold text-primary">
          {title}
        </h1>
        <p className="text-[clamp(18px,3vw,25px)] text-[#12434a] mt-[5px] md:mt-0">
          {subtitle}
        </p>
        <p className="text-[clamp(14px,2vw,15px)] text-[#4F5B64] mt-[10px] md:mt-[5px]">
          {description}
        </p>
        <button className="bg-[#E0ECEE] text-primary border border-primary cursor-pointer px-[clamp(15px,3vw,20px)] py-[clamp(8px,2vw,10px)] rounded-[20px] mt-[15px] md:mt-[20px] text-[clamp(13px,2vw,16px)] w-full md:w-auto hover:bg-primary hover:text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]">
          Take a Free Assessment
        </button>
      </div>

      <div
        className={`right flex-1 w-full md:w-auto md:mt-[-40px] mt-0 flex justify-center order-1 md:order-none ${
          rightImage ? "md:justify-end" : "md:justify-start"
        }`}
      >
        <img
          src={imageSrc}
          alt={title}
          className="w-full object-cover"
          style={{ maxWidth: `${imageSize}px` }}
        />
      </div>
    </div>
  );
}

export default function ExpertVerifiedAssessmentsSection() {
  const { t } = useTranslation(["common", "navigation"]);

  return (
    <div className="mt-[40px] md:mt-[70px] max-w-[1350px] mx-auto px-[20px] md:px-0">
      <h1 className="text-[clamp(24px,5vw,30px)] md:text-3xl font-bold text-center">
        {t("expertVerifiedAssessments", { ns: "common" })}
      </h1>
      <p className="text-[clamp(13px,2vw,15px)] mt-[10px] max-w-[800px] mx-auto text-center text-[#4F5B64]">
        {t("takePreScreenerTests", { ns: "common" })}
      </p>

      <div className="flex flex-col mt-[40px] md:mt-[70px] h-fit">
        <ExpertVerifiedAssessmentsSectionItem
          title="Wellness"
          subtitle="The greatest wealth is health."
          description="Wellness means complete well-being. We offer personalized tools to reduce stress, boost vitality, and achieve the holistic balance needed to live your most resilient, purposeful life."
          imageSrc="images/expert-verified-assessment/wellness.png"
          imageSize={900}
          rightImage={true}
        />

        <ExpertVerifiedAssessmentsSectionItem
          title="Education"
          subtitle="A good education is a foundation for a better future."
          description="Education is power and opportunity. We provide the knowledge and skills needed to confidently build a successful future and create lasting change."
          imageSrc="images/expert-verified-assessment/education.png"
          imageSize={600}
          rightImage={false}
        />

        <ExpertVerifiedAssessmentsSectionItem
          title="Finance"
          subtitle="The best investment is in the tools of one’s own trade."
          description="Finance is the foundation of wealth. We offer personalized tools to build a strong financial foundation and achieve financial freedom."
          imageSrc="images/expert-verified-assessment/finance.png"
          imageSize={500}
          rightImage={true}
        />
      </div>
    </div>
  );
}
