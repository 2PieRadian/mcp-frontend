import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { WHY_CHOOSE_US_SECTION } from "../lib/constants/landingPage";

function WhyChooseUsCard({
  title,
  description,
  callToAction,
  image,
}: {
  title: string;
  description: string;
  callToAction: string;
  image?: string;
}) {
  return (
    <div className="flex justify-between flex-col border border-[#B5B5B5] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-none hover:scale-[0.99] trasition-scale-transform transition-shadow p-[25px] relative rounded-[15px] mt-[40px] w-full md:max-w-[calc(50%-10px)] lg:max-w-[calc(33.333%-14px)]">
      <div>
        {image && (
          <div className="flex justify-center bg-white rounded-full absolute top-[-35px] left-[50%] translate-x-[-50%]">
            <img
              src={`images/why-choose-us/${image}`}
              alt={title}
              className="w-[80px]"
            />
          </div>
        )}
        <h2 className="font-bold text-lg mt-[30px]">{title}</h2>
        <p className="text-[#4F5B64]">{description}</p>
      </div>

      <div className="text-blue-500 hover:underline transform-all duration-300 cursor-pointer mt-[25px] whitespace-nowrap">
        <div className="flex items-center gap-[10px]">
          <span>{callToAction}</span>
          <ArrowRight size={20} />
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUsSection() {
  const { t } = useTranslation("sectors");

  // Map IDs to translation keys
  const getTranslationKeys = (id: number) => {
    const keyMap: Record<
      number,
      { title: string; description: string; cta: string }
    > = {
      1: {
        title: "whyChooseUs.expertTherapists.title",
        description: "whyChooseUs.expertTherapists.description",
        cta: "whyChooseUs.expertTherapists.cta",
      },
      2: {
        title: "whyChooseUs.accessibility.title",
        description: "whyChooseUs.accessibility.description",
        cta: "whyChooseUs.accessibility.cta",
      },
      3: {
        title: "whyChooseUs.privacy.title",
        description: "whyChooseUs.privacy.description",
        cta: "whyChooseUs.privacy.cta",
      },
      4: {
        title: "whyChooseUs.progressTracking.title",
        description: "whyChooseUs.progressTracking.description",
        cta: "whyChooseUs.progressTracking.cta",
      },
      5: {
        title: "whyChooseUs.affordableCare.title",
        description: "whyChooseUs.affordableCare.description",
        cta: "whyChooseUs.affordableCare.cta",
      },
      6: {
        title: "whyChooseUs.communitySupport.title",
        description: "whyChooseUs.communitySupport.description",
        cta: "whyChooseUs.communitySupport.cta",
      },
    };
    return keyMap[id] || { title: "", description: "", cta: "" };
  };

  return (
    <div className="py-[50px] max-w-[1350px] mx-auto mt-[70px]">
      <h1 className="text-3xl font-bold text-center">
        {t("whyChooseUs.title")}
      </h1>

      <div className="flex flex-wrap gap-[20px] mt-[40px]">
        {WHY_CHOOSE_US_SECTION.map((item) => {
          const keys = getTranslationKeys(item.id);
          return (
            <WhyChooseUsCard
              key={item.id}
              title={t(keys.title)}
              description={t(keys.description)}
              callToAction={t(keys.cta)}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
}
