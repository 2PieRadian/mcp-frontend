import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PremiumAnimatedBackground from "../components/PremiumAnimatedBackground";
import {
  Mail,
  Clock,
  MessageCircle,
  HelpCircle,
  Shield,
  Heart,
} from "lucide-react";

export default function ContactUs() {
  const { t } = useTranslation("contact");
  return (
    <>
      <Helmet>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
        <meta name="keywords" content={t("meta.keywords")} />
        <link rel="canonical" href="https://mindcurepath.com/contact" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mindcurepath.com/contact" />
        <meta property="og:title" content={t("meta.ogTitle")} />
        <meta property="og:description" content={t("meta.ogDescription")} />
        <meta
          property="og:image"
          content="https://mindcurepath.com/og-image.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://mindcurepath.com/contact" />
        <meta name="twitter:title" content={t("meta.ogTitle")} />
        <meta name="twitter:description" content={t("meta.ogDescription")} />
        <meta
          name="twitter:image"
          content="https://mindcurepath.com/og-image.jpg"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: t("meta.schemaName"),
            description: t("meta.schemaDescription"),
            url: "https://mindcurepath.com/contact",
            contactPoint: {
              "@type": "ContactPoint",
              email: "support@mindcurepath.com",
              contactType: t("meta.contactType"),
              availableLanguage: t("meta.availableLanguage"),
            },
          })}
        </script>
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
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-base text-slate-300 sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            {/* Main Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-12">
              <div className="bg-linear-to-r from-primary/5 to-teal-50 p-8 sm:p-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
                  {t("getInTouch.title")}
                </h2>
                <p className="text-slate-600 text-lg max-w-xl mx-auto mb-6">
                  {t("getInTouch.description")}
                </p>
                <a
                  href="mailto:support@mindcurepath.com"
                  className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  {t("getInTouch.emailLabel")}
                </a>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid gap-6 sm:grid-cols-2 mb-12">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      {t("available247.title")}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {t("available247.description")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      {t("quickResponse.title")}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {t("quickResponse.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What We Can Help With */}
            <div className="bg-slate-50 rounded-2xl p-8 sm:p-10 mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center">
                {t("whatCanWeHelp.title")}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white rounded-xl p-5 border border-slate-200">
                  <HelpCircle className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-2">
                    {t("whatCanWeHelp.generalInquiries.title")}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {t("whatCanWeHelp.generalInquiries.description")}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200">
                  <Shield className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-2">
                    {t("whatCanWeHelp.accountPrivacy.title")}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {t("whatCanWeHelp.accountPrivacy.description")}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200">
                  <Heart className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-2">
                    {t("whatCanWeHelp.expertConnections.title")}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {t("whatCanWeHelp.expertConnections.description")}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-center space-y-6">
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <p className="text-amber-800 text-sm sm:text-base">
                  {t("pleaseNote")}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-slate-600">{t("weValueEveryMessage")}</p>
                <p className="text-slate-500 text-sm">{t("companyName")}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
