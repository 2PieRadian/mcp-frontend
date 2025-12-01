import { useTranslation } from "react-i18next";

function Step({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-[5px] bg-[hsl(0,0%,98%)] border border-[hsl(0,0%,80%)] p-[20px] rounded-2xl">
      <h2 className="font-medium text-[#3C4753] text-[20px]">{title}</h2>
      <p className="text-[#727A8B]">{description}</p>
    </div>
  );
}

export default function HowDoesItWork() {
  const { t } = useTranslation("sectors");

  return (
    <div className="mt-[70px] rounded-2xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{t("howDoesItWork.title")}</h1>
        <p className="text-[#4F5B64] mb-[40px] mt-[10px]">
          {t("howDoesItWork.subtitle")}
        </p>
      </div>

      <div className="flex items-start max-w-[800px] mx-auto justify-center gap-[30px]">
        <div className="hidden [@media(min-width:840px)]:flex items-center self-center justify-center flex-1">
          <img
            src="images/how-does-it-work/how_does_it_work.png"
            alt="How Does it Work?"
            className="w-[330px] rounded-2xl"
          />
        </div>

        <div className="flex flex-1 [@media(max-width:839px)]:w-full flex-col gap-[10px]">
          <Step
            title={t("howDoesItWork.step1.title")}
            description={t("howDoesItWork.step1.description")}
          />
          <Step
            title={t("howDoesItWork.step2.title")}
            description={t("howDoesItWork.step2.description")}
          />
          <Step
            title={t("howDoesItWork.step3.title")}
            description={t("howDoesItWork.step3.description")}
          />
          <Step
            title={t("howDoesItWork.step4.title")}
            description={t("howDoesItWork.step4.description")}
          />
        </div>
      </div>
    </div>
  );
}
