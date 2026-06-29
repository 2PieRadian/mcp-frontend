import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PremiumAnimatedBackground from "../components/PremiumAnimatedBackground";
import ScrollToTopButton from "../components/ScrollToTopButton";
import {
  Check,
  XCircle,
  Mail,
  Phone,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";

export default function PrivacyPolicy() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    setLang(i18n.language);
    const handle = () => setLang(i18n.language);
    i18n.on("languageChanged", handle);
    return () => i18n.off("languageChanged", handle);
  }, [i18n]);

  const t = (key: string, options?: Record<string, unknown>) =>
    i18n.t(key, { ns: "privacy", lng: lang, ...options });

  return (
    <div key={lang}>
      <ScrollToTopButton />
      <Helmet>
        <title>{t("metaTitle")}</title>
        <meta name="description" content={t("metaDescription")} />
        <meta name="keywords" content={t("metaKeywords")} />
        <link rel="canonical" href="https://mindcurepath.com/privacy-policy" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://mindcurepath.com/privacy-policy"
        />
        <meta property="og:title" content={t("metaTitle")} />
        <meta property="og:description" content={t("ogDescription")} />
        <meta
          property="og:image"
          content="https://mindcurepath.com/og-image.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content="https://mindcurepath.com/privacy-policy"
        />
        <meta name="twitter:title" content={t("metaTitle")} />
        <meta name="twitter:description" content={t("ogDescription")} />
        <meta
          name="twitter:image"
          content="https://mindcurepath.com/og-image.jpg"
        />
      </Helmet>

      <div className="px-[16px] sm:px-[20px]">
        <Navbar />
      </div>

      <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#187360] via-[#115e4c] to-[#0d3f33] animate-gradient-x py-16 sm:py-20 md:py-24 relative overflow-hidden">
          <PremiumAnimatedBackground />
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl tracking-tight">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 text-base text-slate-100 sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t("heroSubtitle")}
            </p>
            <p className="mt-2 text-sm text-slate-100">{t("heroCin")}</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            {/* Introduction */}
            <div className="mb-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                {t("intro1")}
              </p>
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg mt-4">
                {t("intro2")}
              </p>
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg mt-4 font-medium">
                {t("intro3")}
              </p>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s1Title")}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    {t("s1_1Title")}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t("s1_1p1")}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t("s1_1p2")}
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>{t("s1_1li1")}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>{t("s1_1li2")}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>{t("s1_1li3")}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>{t("s1_1li4")}</span>
                    </li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed mt-4">
                    {t("s1_1p3")}
                  </p>
                  <p className="text-slate-600 leading-relaxed mt-4">
                    {t("s1_1p4")}
                  </p>
                  <ul className="space-y-2 text-slate-600 mt-2">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>{t("s1_1li5")}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>{t("s1_1li6")}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>{t("s1_1li7")}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                      <span>{t("s1_1li8")}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    {t("s1_2Title")}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t("s1_2p1")}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    {t("s1_3Title")}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t("s1_3p1")}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    {t("s1_4Title")}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t("s1_4p1")}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    {t("s1_5Title")}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t("s1_5p1")}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    {t("s1_6Title")}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t("s1_6p1")}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t("s1_6p2")}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t("s1_6p3")}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {t("s1_6p4Before")}
                    <a
                      href="mailto:support@mindcurepath.com"
                      className="text-teal-600 hover:text-teal-700 underline"
                    >
                      support@mindcurepath.com
                    </a>
                    {t("s1_6p4After")}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s2Title")}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    {t("s2_1Title")}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t("s2_1p1")}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {t("s2_1p2")}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    {t("s2_2Title")}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">
                        {t("s2_2aTitle")}
                      </h4>
                      <p className="text-slate-600 text-sm">{t("s2_2aDesc")}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">
                        {t("s2_2bTitle")}
                      </h4>
                      <p className="text-slate-600 text-sm">{t("s2_2bDesc")}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">
                        {t("s2_2cTitle")}
                      </h4>
                      <p className="text-slate-600 text-sm">{t("s2_2cDesc")}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">
                        {t("s2_2dTitle")}
                      </h4>
                      <p className="text-slate-600 text-sm">{t("s2_2dDesc")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s3Title")}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    {t("s3_1Title")}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t("s3_1p1")}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    {t("s3_2Title")}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {t("s3_2p1")}
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2 mb-4">
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <p className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />{" "}
                        {t("s3_2WeDo")}
                      </p>
                      <ul className="space-y-2 text-green-700 text-sm">
                        <li>{t("s3_2WeDoLi1")}</li>
                        <li>{t("s3_2WeDoLi2")}</li>
                        <li>{t("s3_2WeDoLi3")}</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                      <p className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-600" />{" "}
                        {t("s3_2WeDont")}
                      </p>
                      <ul className="space-y-2 text-red-700 text-sm">
                        <li>{t("s3_2WeDontLi1")}</li>
                        <li>{t("s3_2WeDontLi2")}</li>
                        <li>{t("s3_2WeDontLi3")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s4Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">{t("s4p1")}</p>
              <p className="text-slate-600 leading-relaxed mb-4">{t("s4p2")}</p>
              <p className="text-slate-600 leading-relaxed mb-4">{t("s4p3")}</p>
              <p className="text-slate-600 leading-relaxed">{t("s4p4")}</p>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s5Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {t("s5pIntro")}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    {t("s5_1Title")}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t("s5_1p1")}
                  </p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    {t("s5_2Title")}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t("s5_2p1")}
                  </p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    {t("s5_3Title")}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t("s5_3p1")}
                  </p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    {t("s5_4Title")}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t("s5_4p1")}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s6Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">{t("s6p1")}</p>
              <p className="text-slate-600 leading-relaxed mb-4">{t("s6p2")}</p>
              <ul className="space-y-3 text-slate-600 mb-6">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>{t("s6li1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>{t("s6li2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>{t("s6li3")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>{t("s6li4")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>{t("s6li5")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span>{t("s6li6")}</span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed mb-6">{t("s6p3")}</p>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                  {t("s6_1Title")}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {t("s6_1p1")}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {t("s6_1p2Before")}
                  <a
                    href="mailto:support@mindcurepath.com"
                    className="text-teal-600 hover:text-teal-700 underline"
                  >
                    support@mindcurepath.com
                  </a>
                  {t("s6_1p2After")}
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s7Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">{t("s7p1")}</p>
              <p className="text-slate-600 leading-relaxed mb-4">{t("s7p2")}</p>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    <strong className="text-slate-800">
                      {t("s7li1Strong")}
                    </strong>{" "}
                    {t("s7li1Text")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    <strong className="text-slate-800">
                      {t("s7li2Strong")}
                    </strong>{" "}
                    {t("s7li2Text")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>
                    <strong className="text-slate-800">
                      {t("s7li3Strong")}
                    </strong>{" "}
                    {t("s7li3Text")}
                  </span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">{t("s7p3")}</p>
            </section>

            {/* Section 8 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s8Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">{t("s8p1")}</p>
              <p className="text-slate-600 leading-relaxed mb-4">{t("s8p2")}</p>
              <p className="text-slate-600 leading-relaxed">{t("s8p3")}</p>
            </section>

            {/* Section 9 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s9Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">{t("s9p1")}</p>
              <p className="text-slate-600 leading-relaxed">{t("s9p2")}</p>
            </section>

            {/* Section 10 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s10Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s10p1")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s10p2")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s10p3")}
              </p>
              <p className="text-slate-600 leading-relaxed">{t("s10p4")}</p>
            </section>

            {/* Section 11 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s11Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s11p1")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s11p2")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s11p3")}
              </p>
              <p className="text-slate-600 leading-relaxed">{t("s11p4")}</p>
            </section>

            {/* Section 12 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s12Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s12p1")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s12p2")}
              </p>
              <p className="text-slate-600 leading-relaxed">{t("s12p3")}</p>
            </section>

            {/* Section 13 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s13Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s13p1")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s13p2")}
              </p>
              <ul className="space-y-3 text-slate-600 mb-4">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>{t("s13li1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>{t("s13li2")}</span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s13p3")}
              </p>
              <p className="text-slate-600 leading-relaxed">{t("s13p4")}</p>
            </section>

            {/* Section 14 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s14Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s14p1")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s14p2")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s14p3")}
              </p>
              <ul className="space-y-3 text-slate-600 mb-4">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>{t("s14li1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>{t("s14li2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>{t("s14li3")}</span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed">{t("s14p4")}</p>
            </section>

            {/* Section 15 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s15Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s15p1Before")}
                <a
                  href="mailto:support@mindcurepath.com"
                  className="text-teal-600 hover:text-teal-700 underline"
                >
                  support@mindcurepath.com
                </a>
                {t("s15p1After")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s15p2")}
              </p>
              <ul className="space-y-3 text-slate-600 mb-4">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>{t("s15li1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                  <span>{t("s15li2")}</span>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed">{t("s15p3")}</p>
            </section>

            {/* Section 16 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s16Title")}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    {t("s16_1Title")}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t("s16_1p1")}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    {t("s16_2Title")}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t("s16_2p1")}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 sm:text-xl mb-3">
                    {t("s16_3Title")}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t("s16_3p1")}
                  </p>
                </div>

                <p className="text-slate-600 leading-relaxed">{t("s16p2")}</p>
              </div>
            </section>

            {/* Section 17 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s17Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s17p1")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s17p2")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s17p3")}
              </p>
              <p className="text-slate-600 leading-relaxed">{t("s17p4")}</p>
            </section>

            {/* Section 18 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s18Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s18p1")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s18p2")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s18p3Before")}
                <a
                  href="mailto:support@mindcurepath.com"
                  className="text-teal-600 hover:text-teal-700 underline"
                >
                  support@mindcurepath.com
                </a>
                {t("s18p3After")}
              </p>
              <p className="text-slate-600 leading-relaxed">{t("s18p4")}</p>
            </section>

            {/* Section 19 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s19Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                <strong className="text-slate-800">{t("s19p1Strong")}</strong>
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s19p2")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s19p3")}
              </p>
              <div className="p-4 bg-teal-50 rounded-xl border border-teal-200 mb-4">
                <p className="text-teal-800 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">{t("s19EmailLabel")}</span>
                  <a
                    href="mailto:support@mindcurepath.com"
                    className="text-teal-700 hover:text-teal-800 underline"
                  >
                    support@mindcurepath.com
                  </a>
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed">{t("s19p4")}</p>
            </section>

            {/* Section 20 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s20Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed">{t("s20p1")}</p>
            </section>

            {/* Section 21 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s21Title")}
              </h2>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-4">
                <p className="text-amber-800 font-medium flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  {t("s21DisclaimerLabel")}
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s21p1")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s21p2")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s21p3")}
              </p>
              <p className="text-slate-600 leading-relaxed">{t("s21p4")}</p>
            </section>

            {/* Section 22 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s22Title")}
              </h2>
              <div className="p-4 bg-red-50 rounded-xl border border-red-200 mb-4">
                <p className="text-red-800 font-medium flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {t("s22NoticeLabel")}
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s22p1")}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s22p2")}
              </p>
              <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 mb-4">
                <p className="text-slate-800 font-medium mb-2">
                  {t("s22IndiaLabel")}
                </p>
                <p className="text-slate-700 text-lg font-semibold">
                  {t("s22Helpline")}
                </p>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t("s22p3")}
              </p>
              <p className="text-slate-600 leading-relaxed">{t("s22p4")}</p>
            </section>

            {/* Section 23 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-6 pb-3 border-b-2 border-slate-200">
                {t("s23Title")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {t("s23p1")}
              </p>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  {t("s23AddressLabel")}
                </h3>
                <div className="space-y-3 text-slate-700">
                  <p className="font-medium text-slate-900">
                    {t("s23CompanyName")}
                  </p>
                  <p>{t("s23Address1")}</p>
                  <p>{t("s23Address2")}</p>
                  <div className="pt-3 mt-3 border-t border-slate-200">
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">{t("s23PhoneLabel")}</span>
                      <a
                        href="tel:7078497263"
                        className="text-teal-600 hover:text-teal-700"
                      >
                        7078497263
                      </a>
                    </p>
                    <p className="flex items-center gap-2 mt-2">
                      <Mail className="w-4 h-4" />
                      <span className="font-medium">{t("s23EmailLabel")}</span>
                      <a
                        href="mailto:support@mindcurepath.com"
                        className="text-teal-600 hover:text-teal-700"
                      >
                        support@mindcurepath.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                {t("s23p2")}
              </p>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
