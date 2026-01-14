import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";

interface Article {
  title: string;
  link?: string;
  content?: string[];
}

interface HelpCategory {
  title: string;
  description: string;
  articles: Article[];
}

const helpCategories: HelpCategory[] = [
  {
    title: "Getting Started",
    description: "New to MindCurePath? Start here to learn the basics.",
    articles: [
      {
        title: "What is MindCurePath?",
        content: [
          "MindCurePath is a comprehensive mental wellness and personal growth platform. We provide a bridge between self-discovery through assessments and professional guidance from verified experts.",
          "Our mission is to make mental wellness, educational clarity, and financial peace of mind accessible to everyone through data-driven insights and human expertise.",
        ],
      },
      {
        title: "Creating your first assessment",
        content: [
          "To begin your journey, click on 'Take Assessment' or navigate to the 'Self Assessment' page from the navbar.",
          "Choose a category that interests you—Wellness, Education, or Finance. Each assessment is designed by experts to provide meaningful insights into your current state.",
          "Once completed, your results will be saved to your dashboard for future reference.",
        ],
      },
      {
        title: "How to use the dashboard",
        content: [
          "Your dashboard is your personal command center. Here you can view your latest assessment scores, track your progress over time, and manage your upcoming expert consultations.",
          "You can also find recommended resources based on your assessment results to help you take the next steps in your growth journey.",
        ],
      },
    ],
  },
  {
    title: "Assessments",
    description: "Learn how to take and understand your assessments.",
    articles: [
      {
        title: "How to take a self-assessment",
        link: "/self-assessment",
        content: [
          "Select the 'Self Assessment' option from the main menu.",
          "Choose between Wellness, Education, or Finance assessments.",
          "Read each question carefully and select the response that most accurately reflects your situation.",
          "There are no right or wrong answers—honesty is key to getting the most accurate results.",
        ],
      },
      {
        title: "Understanding your scores",
        content: [
          "Our scoring system uses a proprietary algorithm developed with mental health professionals.",
          "A 'High' score typically indicates strong alignment or positive state in that area, while a 'Lower' score suggests opportunities for growth or areas where professional support might be beneficial.",
          "Detailed breakdowns for each sub-category are provided at the end of every assessment.",
        ],
      },
      {
        title: "Sharing results with experts",
        content: [
          "You can choose to share your assessment results with your chosen counsellor to provide them with better context before your first session.",
          "To do this, navigate to your assessment history and click 'Share with Expert' next to the relevant result. You can revoke this access at any time.",
        ],
      },
    ],
  },
  {
    title: "Expert Consultations",
    description: "Everything about connecting with our verified experts.",
    articles: [
      {
        title: "Finding the right expert",
        link: "/find-counsellors",
        content: [
          "Visit the 'Find Counsellors' page to browse our network of verified professionals.",
          "You can filter experts by their specialty (e.g., Anxiety, Career Guidance, Financial Stress), language, and availability.",
          "Read through their profiles and reviews from other community members to find someone who resonates with your needs.",
        ],
      },
      {
        title: "Booking your first session",
        content: [
          "Once you've found an expert, click 'Book Session' on their profile.",
          "Select a date and time that works for you from their calendar.",
          "Complete the payment process, and you'll receive a confirmation email with the session link and instructions.",
        ],
      },
      {
        title: "Expert verification process",
        content: [
          "Every expert on MindCurePath goes through a rigorous vetting process.",
          "We verify their professional qualifications, years of experience, and conduct a personal interview before they are allowed to join our platform.",
          "We also regularly monitor feedback to ensure the highest quality of care for our users.",
        ],
      },
    ],
  },
  {
    title: "Billing & Payments",
    description: "Manage your payments, invoices, and subscriptions.",
    articles: [
      {
        title: "Accepted payment methods",
        content: [
          "We accept all major credit and debit cards (Visa, Mastercard, American Express).",
          "We also support popular digital wallets and UPI for a seamless transaction experience.",
          "All payments are processed through secure, encrypted gateways to ensure your financial data is always protected.",
        ],
      },
      {
        title: "Refund Policy",
        content: [
          "To maintain the highest quality of service and ensure our experts are fairly compensated for their dedicated time, MindCurePath maintains a strict no-refund policy.",
          "Once a session is booked, our experts commit their time and resources specifically to your consultation, often turning away other individuals who may need urgent support. This policy helps us sustain a network of top-tier professionals who are fully committed to your growth and wellness.",
          "While refunds are not possible, we understand that life happens. If you need to reschedule, you can do so free of charge up to 24 hours before your appointment to ensure your credits remain valid for a future session.",
        ],
      },
    ],
  },
  {
    title: "Account & Security",
    description: "Manage your account settings and data privacy.",
    articles: [
      {
        title: "How we protect your data",
        content: [
          "Your privacy is our top priority. All personal data and assessment results are encrypted using industry-standard SSL/TLS technology.",
          "We never sell your personal information to third parties. Your data is used solely to provide you with personalized insights and connect you with experts.",
          "For more details, please review our comprehensive Privacy Policy.",
        ],
      },
      {
        title: "Deleting your account",
        content: [
          "If you wish to delete your account, you can do so from the 'Account Settings' page.",
          "Please note that this action is permanent and will result in the deletion of all your assessment history and consultation records.",
          "If you have any active subscriptions or upcoming sessions, please cancel them before deleting your account.",
        ],
      },
    ],
  },
];

const quickActions = [
  {
    title: "Contact Support",
    description: "Get help from our team",
    link: "/contact",
  },
  {
    title: "Browse FAQ",
    description: "Find quick answers",
    link: "/faq",
  },
  {
    title: "Take Assessment",
    description: "Start your journey",
    link: "/self-assessment",
  },
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedArticleIndex, setSelectedArticleIndex] = useState<
    number | null
  >(null);

  const filteredCategories = searchQuery
    ? helpCategories.filter(
        (cat) =>
          cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.articles.some((a) =>
            a.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : helpCategories;

  const selectedCategory =
    filteredCategories[selectedCategoryIndex] || filteredCategories[0];

  const handleCategoryClick = (index: number) => {
    setSelectedCategoryIndex(index);
    setSelectedArticleIndex(null); // Reset article selection when category changes
  };

  const selectedArticle =
    selectedArticleIndex !== null
      ? selectedCategory.articles[selectedArticleIndex]
      : null;

  return (
    <>
      <Helmet>
        <title>Help Center | MindCurePath Consultancy - Knowledge Base & Support</title>
        <meta
          name="description"
          content="Find answers to your questions about MindCurePath assessments, expert consultations, billing, and data security in our comprehensive Help Center."
        />
        <meta name="keywords" content="help center, knowledge base, MindCurePath support, assessment guide, consultation help, billing questions" />
        <link rel="canonical" href="https://mindcurepath.com/help" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mindcurepath.com/help" />
        <meta property="og:title" content="Help Center | MindCurePath Consultancy" />
        <meta property="og:description" content="Your complete guide to using the MindCurePath platform. Find articles on assessments, experts, and more." />
        <meta property="og:image" content="https://mindcurepath.com/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://mindcurepath.com/help" />
        <meta name="twitter:title" content="Help Center | MindCurePath Consultancy" />
        <meta name="twitter:description" content="Your complete guide to using the MindCurePath platform. Find articles on assessments, experts, and more." />
        <meta name="twitter:image" content="https://mindcurepath.com/og-image.jpg" />
      </Helmet>

      <div className="px-[16px] sm:px-[20px]">
        <Navbar />
      </div>

      <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-[#0b1220] via-[#0f1d32] to-[#0a1528] py-16 sm:py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl tracking-tight">
              How can we help you?
            </h1>
            <p className="mt-4 text-base text-slate-300 sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Find answers, guides, and support for your MindCurePath journey
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedCategoryIndex(0);
                  }}
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Help Topics - Sidebar Layout */}
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8">
              Browse Help Topics
            </h2>

            {filteredCategories.length > 0 ? (
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Sidebar */}
                <nav className="md:w-64 shrink-0">
                  <ul className="space-y-1">
                    {filteredCategories.map((category, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleCategoryClick(index)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                            selectedCategoryIndex === index
                              ? "bg-primary text-white font-medium"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {category.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Content Area */}
                <div className="flex-1 bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  {selectedCategory && (
                    <div className="flex flex-col h-full">
                      {/* Category Header */}
                      <div className="bg-slate-50 border-b border-slate-100 p-6 sm:p-8">
                        {selectedArticle ? (
                          <button
                            onClick={() => setSelectedArticleIndex(null)}
                            className="text-primary text-sm font-medium hover:underline mb-4 flex items-center gap-1 cursor-pointer"
                          >
                            <ChevronRight className="w-4 h-4 rotate-180" />
                            Back to {selectedCategory.title}
                          </button>
                        ) : null}
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
                          {selectedArticle
                            ? selectedArticle.title
                            : selectedCategory.title}
                        </h3>
                        {!selectedArticle && (
                          <p className="text-slate-500 mt-2">
                            {selectedCategory.description}
                          </p>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-8">
                        {selectedArticle ? (
                          <div className="space-y-6">
                            {selectedArticle.content?.map(
                              (paragraph, pIndex) => (
                                <p
                                  key={pIndex}
                                  className="text-slate-600 leading-relaxed text-lg"
                                >
                                  {paragraph}
                                </p>
                              )
                            )}
                            {selectedArticle.link && (
                              <div className="pt-4">
                                <Link
                                  to={selectedArticle.link}
                                  className="inline-flex items-center justify-center bg-primary/10 text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/20 transition-all duration-200"
                                >
                                  Go to {selectedArticle.title}
                                </Link>
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">
                              Articles in this category
                            </h4>
                            <ul className="grid grid-cols-1 gap-3">
                              {selectedCategory.articles.map(
                                (article, index) => (
                                  <li key={index}>
                                    <button
                                      onClick={() =>
                                        setSelectedArticleIndex(index)
                                      }
                                      className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-primary transition-all group border border-slate-100 hover:border-primary/20 text-left cursor-pointer"
                                    >
                                      <span className="font-medium">
                                        {article.title}
                                      </span>
                                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors shrink-0" />
                                    </button>
                                  </li>
                                )
                              )}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600 text-lg">
                  No results found for "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-primary hover:underline cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Still Need Help */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            <div className="bg-linear-to-br from-primary/5 to-teal-50 rounded-2xl p-8 sm:p-12 text-center border border-primary/10">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
                Still Need Help?
              </h3>
              <p className="text-slate-600 mb-8 max-w-lg mx-auto text-lg">
                Our support team is available 24/7 to assist you with any
                questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                >
                  Contact Support
                </Link>
                <Link
                  to="/faq"
                  className="inline-flex items-center justify-center bg-white text-slate-700 px-8 py-4 rounded-full font-medium border border-slate-300 hover:border-slate-400 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                >
                  Browse FAQ
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-10 sm:py-14 pb-16 sm:pb-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8 text-center">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="flex items-center justify-between bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {action.title}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {action.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
