import { useTranslation } from "react-i18next";

export default function WhyChooseUsSection() {
  const { t } = useTranslation("common");

  return (
    <section className="py-10 sm:py-14 mt-[40px] md:mt-[70px] border-t border-gray-200">
      <div className="mx-auto max-w-[1000px]">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8 text-center">
          {t("whyChooseUsTitle")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center hover:shadow-md hover:border-slate-300 transition-all duration-300">
            <h3 className="font-semibold text-slate-800 mb-2">
              {t("whyChooseUsExpertVerifiedTitle")}
            </h3>
            <p className="text-sm text-slate-600">
              {t("whyChooseUsExpertVerifiedDescription")}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center hover:shadow-md hover:border-slate-300 transition-all duration-300">
            <h3 className="font-semibold text-slate-800 mb-2">
              {t("whyChooseUsConfidentialTitle")}
            </h3>
            <p className="text-sm text-slate-600">
              {t("whyChooseUsConfidentialDescription")}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center hover:shadow-md hover:border-slate-300 transition-all duration-300">
            <h3 className="font-semibold text-slate-800 mb-2">
              {t("whyChooseUsAvailableTitle")}
            </h3>
            <p className="text-sm text-slate-600">
              {t("whyChooseUsAvailableDescription")}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center hover:shadow-md hover:border-slate-300 transition-all duration-300">
            <h3 className="font-semibold text-slate-800 mb-2">
              {t("whyChooseUsGuidanceTitle")}
            </h3>
            <p className="text-sm text-slate-600">
              {t("whyChooseUsGuidanceDescription")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
