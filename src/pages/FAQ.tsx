import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface FAQItem {
  question: string;
  answer: string | string[];
}

const faqData: FAQItem[] = [
  {
    question: "What is MindCurePath?",
    answer:
      "MindCurePath is a structured guidance and self-assessment platform designed to help individuals make informed decisions related to wellness, education, mindset, and personal growth through expert-verified insights and digital tools.",
  },
  {
    question: "What services are offered on MindCurePath?",
    answer: [
      "Self-assessment tools",
      "One-on-one virtual consultation",
      "Guided insights and learning resources",
      "Expert-curated recommendations",
      "Personal growth and wellness frameworks",
    ],
  },
  {
    question: "Who can use MindCurePath?",
    answer: [
      "Students and learners",
      "Working professionals",
      "Entrepreneurs",
      "Individuals seeking structured self-improvement",
    ],
  },
  {
    question: "Are MindCurePath services free or paid?",
    answer:
      "Some content and assessments may be offered free of charge. Premium tools, reports, or expert-level guidance may require payment. Pricing details are clearly displayed where applicable.",
  },
  {
    question: "How does expert guidance work?",
    answer:
      "Experts on MindCurePath are carefully selected based on their domain experience. Guidance is provided through structured assessments, expert insights, and one-on-one virtual consultations, depending on expert availability and session options.",
  },
  {
    question: "Does MindCurePath offer one-on-one expert consultations?",
    answer:
      "Yes. MindCurePath offers one-on-one expert consultations across its key segments, including wellness, education, and personal growth. Consultations are conducted virtually through secure communication channels. Availability of one-on-one sessions depends on the expert's schedule, slot preferences, and availability at the time of booking.",
  },
  {
    question:
      "Can MindCurePath replace professional medical, financial, or legal advice?",
    answer:
      "No. MindCurePath provides informational and guidance-based support only. It does not replace certified medical, legal, or financial advice.",
  },
  {
    question: "Is MindCurePath accessible on mobile devices?",
    answer:
      "Yes. The platform is web-based and accessible on smartphones, tablets, and desktops.",
  },
  {
    question: "How is user data protected?",
    answer:
      "User data is handled securely and confidentially in accordance with the platform's Privacy Policy and Terms of Use. MindCurePath does not sell personal data to third parties.",
  },
  {
    question: "How can users contact MindCurePath?",
    answer:
      "Users can submit queries through the Contact Us page available on the website. Responses are provided within a reasonable timeframe.",
  },
  {
    question: "Is MindCurePath a legitimate and trustworthy platform?",
    answer:
      "Yes. MindCurePath follows a structured, transparent, and guidance-based approach. Content and insights are curated with a focus on clarity, ethics, and user well-being, ensuring a trustworthy user experience.",
  },
  {
    question:
      "How is MindCurePath different from other wellness or guidance platforms?",
    answer:
      "MindCurePath emphasizes self-assessment first, followed by expert-curated guidance, rather than generic advice. This structured approach helps users make informed and conscious decisions instead of relying on assumptions.",
  },
  {
    question: "Does MindCurePath offer career and education guidance?",
    answer:
      "Yes. MindCurePath provides guidance related to education paths, learning decisions, and career clarity through structured insights and assessments where applicable.",
  },
  {
    question: "Can MindCurePath help with mindset and personal development?",
    answer:
      "Yes. The platform includes tools and frameworks focused on mindset awareness, self-growth, and clarity-driven personal development.",
  },
  {
    question:
      "How long does it take to complete a self-assessment on MindCurePath?",
    answer:
      "Most self-assessments are designed to be user-friendly and can typically be completed within a short time, depending on the assessment type and user engagement.",
  },
  {
    question: "Can MindCurePath be used by beginners with no prior knowledge?",
    answer:
      "Yes. MindCurePath is designed for beginners as well as experienced individuals. All content is presented in a clear and easy-to-understand manner.",
  },
  {
    question: "Does MindCurePath provide personalized guidance?",
    answer:
      "Yes. Personalized insights may be generated based on user inputs and assessment results. However, outcomes may vary depending on individual participation and information provided.",
  },
  {
    question:
      "Will I receive a report or result after completing an assessment?",
    answer:
      "Yes. Users may receive structured insights or summaries based on their assessment responses, depending on the service selected.",
  },
  {
    question: "Is registration mandatory to use MindCurePath?",
    answer:
      "Some features may be accessible without registration. However, creating an account may be required to access personalized insights, reports, or saved progress.",
  },
  {
    question:
      "Can MindCurePath help in decision-making during confusion or uncertainty?",
    answer:
      "MindCurePath is specifically designed to support clarity and awareness during decision-making by offering structured guidance and reflective assessments.",
  },
  {
    question: "Is MindCurePath suitable for long-term personal growth?",
    answer:
      "Yes. The platform supports ongoing self-awareness and growth by encouraging informed decisions and continuous learning rather than quick fixes.",
  },
  {
    question: "Does MindCurePath provide instant results?",
    answer:
      "Some insights may be available instantly after assessments. However, meaningful progress depends on user reflection, consistency, and application of guidance.",
  },
  {
    question: "Is MindCurePath available internationally?",
    answer:
      "As a web-based platform, MindCurePath can be accessed from most locations with an internet connection, subject to applicable terms and policies.",
  },
  {
    question:
      "Can organizations or institutions collaborate with MindCurePath?",
    answer:
      "Collaboration opportunities may be available. Interested organizations can reach out through the official Contact Us page for partnership discussions.",
  },
];

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
        <title>Frequently Asked Questions | MindCurePath Consultancy</title>
        <meta
          name="description"
          content="Get answers to your questions about MindCurePath's mental wellness, education, and finance assessments. Learn how we help you achieve clarity and growth."
        />
        <meta
          name="keywords"
          content="FAQ, MindCurePath questions, assessment help, wellness platform FAQ, education guidance FAQ, finance wellness FAQ"
        />
        <link rel="canonical" href="https://mindcurepath.com/faq" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mindcurepath.com/faq" />
        <meta
          property="og:title"
          content="Frequently Asked Questions | MindCurePath Consultancy"
        />
        <meta
          property="og:description"
          content="Common questions and answers about MindCurePath's services and platform."
        />
        <meta
          property="og:image"
          content="https://mindcurepath.com/og-image.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://mindcurepath.com/faq" />
        <meta
          name="twitter:title"
          content="Frequently Asked Questions | MindCurePath Consultancy"
        />
        <meta
          name="twitter:description"
          content="Common questions and answers about MindCurePath's services and platform."
        />
        <meta
          name="twitter:image"
          content="https://mindcurepath.com/og-image.jpg"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": ${JSON.stringify(
                faqData.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: Array.isArray(item.answer)
                      ? item.answer.join(" ")
                      : item.answer,
                  },
                })),
              )}
            }
          `}
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
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-base text-slate-300 sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about MindCurePath
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
                General Questions
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
                Services & Features
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
                User Experience
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
                Additional Information
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
                Still Have Questions?
              </h3>
              <p className="text-slate-600 mb-6 max-w-lg mx-auto">
                Can't find what you're looking for? Our support team is here to
                help you 24/7.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
