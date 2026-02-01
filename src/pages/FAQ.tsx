import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useMemo } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface FAQItem {
  question: string;
  answer: string | string[];
}

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15", "q16", "q17", "q18", "q19", "q20", "q21", "q22", "q23", "q24"];

function useFaqData(): FAQItem[] {
  const { t } = useTranslation("faq");
  return useMemo(() => {
    return FAQ_KEYS.map((key) => {
      const question = t(`items.${key}.question`);
      const answer = t(`items.${key}.answer`);
      if (answer && !answer.startsWith("items.")) {
        return { question, answer };
      }
      const list: string[] = [];
      for (let i = 0; i < 10; i++) {
        const part = t(`items.${key}.answer_${i}`);
        if (part && !part.startsWith("items.")) list.push(part);
        else break;
      }
      return { question, answer: list };
    });
  }, [t]);
}

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-primary/30 bg-primary/2 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-5 sm:p-6 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
          {index + 1}
        </span>
        <span className="flex-1 text-base sm:text-lg font-medium text-slate-800 pr-2">
          {item.question}
        </span>
        <ChevronDown
          className={`shrink-0 w-5 h-5 text-slate-400 transition-transform duration-300 mt-1 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[72px] sm:pl-[88px]">
          {Array.isArray(item.answer) ? (
            <ul className="space-y-2">
              {item.answer.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-600 leading-relaxed">{item.answer}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useTranslation("faq");
  const faqData = useFaqData();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Split FAQs into categories for better organization
  const generalFAQs = faqData.slice(0, 6);
  const serviceFAQs = faqData.slice(6, 12);
  const userFAQs = faqData.slice(12, 18);
  const additionalFAQs = faqData.slice(18);

  return (
    <>
      <Helmet>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
        <meta name="keywords" content={t("meta.keywords")} />
        <link rel="canonical" href="https://mindcurepath.com/faq" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mindcurepath.com/faq" />
        <meta property="og:title" content={t("meta.ogTitle")} />
        <meta property="og:description" content={t("meta.ogDescription")} />
        <meta property="og:image" content="https://mindcurepath.com/og-image.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://mindcurepath.com/faq" />
        <meta name="twitter:title" content={t("meta.ogTitle")} />
        <meta name="twitter:description" content={t("meta.ogDescription")} />
        <meta name="twitter:image" content="https://mindcurepath.com/og-image.jpg" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: Array.isArray(item.answer)
                  ? item.answer.join(" ")
                  : item.answer,
              },
            })),
          })}
        </script>
      </Helmet>

      <div className="px-[16px] sm:px-[20px]">
        <Navbar />
      </div>

      <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-[#0b1220] via-[#0f1d32] to-[#0a1528] py-16 sm:py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-base text-slate-300 sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            {/* General Questions */}
            <div className="mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                {t("sections.general")}
              </h2>
              <div className="space-y-3">
                {generalFAQs.map((item, index) => (
                  <FAQAccordionItem
                    key={index}
                    item={item}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Services & Features */}
            <div className="mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                {t("sections.services")}
              </h2>
              <div className="space-y-3">
                {serviceFAQs.map((item, index) => (
                  <FAQAccordionItem
                    key={index + 6}
                    item={item}
                    isOpen={openIndex === index + 6}
                    onToggle={() => handleToggle(index + 6)}
                    index={index + 6}
                  />
                ))}
              </div>
            </div>

            {/* User Experience */}
            <div className="mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                {t("sections.userExperience")}
              </h2>
              <div className="space-y-3">
                {userFAQs.map((item, index) => (
                  <FAQAccordionItem
                    key={index + 12}
                    item={item}
                    isOpen={openIndex === index + 12}
                    onToggle={() => handleToggle(index + 12)}
                    index={index + 12}
                  />
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                {t("sections.additional")}
              </h2>
              <div className="space-y-3">
                {additionalFAQs.map((item, index) => (
                  <FAQAccordionItem
                    key={index + 18}
                    item={item}
                    isOpen={openIndex === index + 18}
                    onToggle={() => handleToggle(index + 18)}
                    index={index + 18}
                  />
                ))}
              </div>
            </div>

            {/* Still Have Questions */}
            <div className="bg-linear-to-br from-primary/5 to-teal-50 rounded-2xl p-8 sm:p-10 text-center border border-primary/10">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">
                {t("stillHaveQuestions.title")}
              </h3>
              <p className="text-slate-600 mb-6 max-w-lg mx-auto">
                {t("stillHaveQuestions.description")}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              >
                {t("stillHaveQuestions.contactUs")}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
