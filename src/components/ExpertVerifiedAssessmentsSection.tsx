import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

function ExpertVerifiedAssessmentsSectionItem({
  title,
  subtitle,
  description,
  imageSrc,
  imageSize,
  rightImage,
  linkTo,
}: {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageSize: number;
  rightImage: boolean;
  linkTo: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const updateImageSize = () => {
      if (imgRef.current) {
        if (window.innerWidth >= 768) {
          imgRef.current.style.maxWidth = `${imageSize}px`;
        } else {
          imgRef.current.style.maxWidth = "280px";
        }
      }
    };

    updateImageSize();
    window.addEventListener("resize", updateImageSize);
    return () => window.removeEventListener("resize", updateImageSize);
  }, [imageSize]);

  return (
    <Link to={linkTo} className="block w-full">
      <div
        className={`flex flex-col md:flex-row ${
          rightImage ? "md:flex-row" : "md:flex-row-reverse"
        } overflow-hidden items-center justify-center gap-[20px] md:gap-[16px] bg-white rounded-[10px] md:rounded-[20px] shadow-lg p-[24px] md:p-[32px] border border-gray-100 hover:shadow-xl transition-all duration-300 w-full`}
      >
        <div className="left flex-1 w-full md:w-auto order-2 md:order-0">
          <h1 className="text-[clamp(26px,5vw,40px)] font-bold text-primary leading-tight">
            {title}
          </h1>
          <p className="text-[clamp(16px,3vw,25px)] text-[#12434a] mt-[8px] md:mt-0 font-medium">
            {subtitle}
          </p>
          <p className="text-[clamp(14px,2vw,15px)] text-[#4F5B64] mt-[12px] md:mt-[5px] leading-relaxed">
            {description}
          </p>
          <button className="bg-[#ecf4f6] text-primary border border-primary cursor-pointer px-[20px] py-[12px] rounded-[20px] mt-[20px] md:mt-[20px] text-[clamp(14px,2vw,16px)] w-full md:w-auto hover:bg-primary hover:text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] font-medium">
            Take a Free Assessment
          </button>
        </div>

        <div
          className={`right flex-1 w-full md:w-auto flex justify-center order-1 md:order-0`}
        >
          <img
            ref={imgRef}
            src={imageSrc}
            alt={title}
            className="w-full object-cover animate-float-2"
            style={{ maxWidth: "280px" }}
          />
        </div>
      </div>
    </Link>
  );
}

export default function ExpertVerifiedAssessmentsSection() {
  const { t } = useTranslation(["common", "navigation"]);

  return (
    <div
      id="expert-verified-assessments"
      className="mt-[40px] md:mt-[70px] max-w-[1000px] mx-auto md:px-0 scroll-mt-[60px] md:scroll-mt-[80px]"
    >
      <h1 className="text-[clamp(24px,6vw,34px)] md:text-3xl font-bold text-center">
        {t("expertVerifiedAssessments", { ns: "common" })}
      </h1>
      <p className="text-[clamp(16px,2vw,17px)] mt-[10px] max-w-[800px] mx-auto text-center text-[#4F5B64]">
        {t("takePreScreenerTests", { ns: "common" })}
      </p>

      <div className="flex flex-col mt-[40px] md:mt-[70px] h-fit gap-[32px] md:gap-[30px]">
        <ExpertVerifiedAssessmentsSectionItem
          title="Wellness"
          subtitle="The greatest wealth is health."
          description="Wellness means complete well-being. We offer personalized tools to reduce stress, boost vitality, and achieve the holistic balance needed to live your most resilient, purposeful life."
          imageSrc="images/expert-verified-assessment/wellness.png"
          imageSize={400}
          rightImage={true}
          linkTo="/assessments/wellness"
        />

        <ExpertVerifiedAssessmentsSectionItem
          title="Education"
          subtitle="A good education is a foundation for a better future."
          description="Education is power and opportunity. We provide the knowledge and skills needed to confidently build a successful future and create lasting change."
          imageSrc="images/expert-verified-assessment/education.png"
          imageSize={360}
          rightImage={false}
          linkTo="/assessments/education"
        />

        <ExpertVerifiedAssessmentsSectionItem
          title="Finance"
          subtitle="The best investment is in the tools of one’s own trade."
          description="Finance is the foundation of wealth. We offer personalized tools to build a strong financial foundation and achieve financial freedom."
          imageSrc="images/expert-verified-assessment/finance.png"
          imageSize={320}
          rightImage={true}
          linkTo="/assessments/finance"
        />
      </div>
    </div>
  );
}
