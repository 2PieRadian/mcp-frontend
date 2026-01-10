import { useTranslation } from "react-i18next";

export default function WhyChooseUsSection() {
  const { t } = useTranslation("common");

  return (
    <section className="py-10 sm:py-14 mt-[40px] md:mt-[70px] border-t border-gray-200">
      <div className="mx-auto max-w-[1000px]">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8 text-center">
          {t("whyChooseMindCurePath", {
            defaultValue: "Why Choose MindCurePath?",
          })}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center hover:shadow-md hover:border-slate-300 transition-all duration-300">
            <h3 className="font-semibold text-slate-800 mb-2">
              Expert-Verified
            </h3>
            <p className="text-sm text-slate-600">
              All assessments are curated by domain experts
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center hover:shadow-md hover:border-slate-300 transition-all duration-300">
            <h3 className="font-semibold text-slate-800 mb-2">
              100% Confidential
            </h3>
            <p className="text-sm text-slate-600">
              Your data is secure and never shared
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center hover:shadow-md hover:border-slate-300 transition-all duration-300">
            <h3 className="font-semibold text-slate-800 mb-2">
              24/7 Available
            </h3>
            <p className="text-sm text-slate-600">
              Access assessments anytime, anywhere
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center hover:shadow-md hover:border-slate-300 transition-all duration-300">
            <h3 className="font-semibold text-slate-800 mb-2">
              Personal Guidance
            </h3>
            <p className="text-sm text-slate-600">
              Connect with verified experts directly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
