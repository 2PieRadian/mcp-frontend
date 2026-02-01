import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import { useState, useMemo } from "react";

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

const CATEGORY_KEYS = ["gettingStarted", "assessments", "expertConsultations", "billingPayments", "accountSecurity"] as const;
const ARTICLE_COUNTS: Record<string, number> = { gettingStarted: 3, assessments: 3, expertConsultations: 3, billingPayments: 2, accountSecurity: 2 };

function useHelpCategories(): HelpCategory[] {
  const { t } = useTranslation("help");
  return useMemo(() => {
    return CATEGORY_KEYS.map((catKey) => {
      const title = t(`categories.${catKey}.title`);
      const description = t(`categories.${catKey}.description`);
      const count = ARTICLE_COUNTS[catKey] ?? 0;
      const articles: Article[] = [];
      for (let i = 0; i < count; i++) {
        const artKey = `art${i}`;
        const artTitle = t(`categories.${catKey}.${artKey}.title`);
        const linkRaw = t(`categories.${catKey}.${artKey}.link`);
        const link = linkRaw && !linkRaw.startsWith("categories.") ? linkRaw : undefined;
        const content: string[] = [];
        for (let j = 0; j < 10; j++) {
          const para = t(`categories.${catKey}.${artKey}.content_${j}`);
          if (para && !para.startsWith("categories.")) content.push(para);
          else break;
        }
        articles.push({ title: artTitle, link, content });
      }
      return { title, description, articles };
    });
  }, [t]);
}

const QUICK_ACTION_LINKS = ["/contact", "/faq", "/self-assessment"];

export default function HelpCenter() {
  const { t } = useTranslation("help");
  const helpCategories = useHelpCategories();
  const quickActions = useMemo(
    () => [
      { title: t("quickAction1.title"), description: t("quickAction1.description"), link: QUICK_ACTION_LINKS[0] },
      { title: t("quickAction2.title"), description: t("quickAction2.description"), link: QUICK_ACTION_LINKS[1] },
      { title: t("quickAction3.title"), description: t("quickAction3.description"), link: QUICK_ACTION_LINKS[2] },
    ],
    [t]
  );
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
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
        <meta name="keywords" content={t("meta.keywords")} />
        <link rel="canonical" href="https://mindcurepath.com/help" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mindcurepath.com/help" />
        <meta property="og:title" content={t("meta.ogTitle")} />
        <meta property="og:description" content={t("meta.ogDescription")} />
        <meta property="og:image" content="https://mindcurepath.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://mindcurepath.com/help" />
        <meta name="twitter:title" content={t("meta.ogTitle")} />
        <meta name="twitter:description" content={t("meta.ogDescription")} />
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
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-base text-slate-300 sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder={t("hero.searchPlaceholder")}
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
              {t("browseTopics")}
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
                            {t("backToCategory", { category: selectedCategory.title })}
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
                                  {t("goToArticle", { title: selectedArticle.title })}
                                </Link>
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">
                              {t("articlesInCategory")}
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
                  {t("noResultsFor", { query: searchQuery })}
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-primary hover:underline cursor-pointer"
                >
                  {t("clearSearch")}
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
                {t("stillNeedHelp.title")}
              </h3>
              <p className="text-slate-600 mb-8 max-w-lg mx-auto text-lg">
                {t("stillNeedHelp.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                >
                  {t("stillNeedHelp.contactSupport")}
                </Link>
                <Link
                  to="/faq"
                  className="inline-flex items-center justify-center bg-white text-slate-700 px-8 py-4 rounded-full font-medium border border-slate-300 hover:border-slate-400 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                >
                  {t("stillNeedHelp.browseFaq")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-10 sm:py-14 pb-16 sm:pb-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8 text-center">
              {t("quickActions")}
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
