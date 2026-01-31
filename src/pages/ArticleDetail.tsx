import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import Footer from "../components/Footer";
import { ReadOnlyEditor } from "../components/tiptap-templates/simple/read-only-editor";
import { fetchArticleBySlug } from "../lib/articles-api";
import type { ArticleWithTags } from "../types/articles";
import {
  Calendar,
  User,
  ArrowLeft,
  BookOpen,
  Clock,
  Share2,
} from "lucide-react";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(content: unknown): number {
  // Rough estimate: count words in JSON content
  const text = JSON.stringify(content);
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200)); // ~200 words per minute
}

function ArticleDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-4" />
      <div className="flex items-center gap-4 mb-8">
        <div className="h-4 bg-gray-100 rounded w-32" />
        <div className="h-4 bg-gray-100 rounded w-28" />
        <div className="h-4 bg-gray-100 rounded w-24" />
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-5/6" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-4/5" />
      </div>
    </div>
  );
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation(["navigation", "common"]);
  const [article, setArticle] = useState<ArticleWithTags | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;

      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchArticleBySlug(slug);
        setArticle(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load article"
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  const handleShare = async () => {
    if (!article) return;

    const shareData = {
      title: article.title,
      text: article.excerpt,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafb] via-white to-[#f0f5f6]">
      <div className="px-4 sm:px-6 lg:px-8">
        <ResponsiveNavbar />
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back Link */}
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-[#44666C] hover:text-[#365a62] font-medium mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to {t("articles", { ns: "navigation" })}</span>
        </Link>

        {/* Loading State */}
        {isLoading && <ArticleDetailSkeleton />}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-[#1a2e35] mb-2">
              {error === "Article not found"
                ? "Article not found"
                : "Failed to load article"}
            </h3>
            <p className="text-[#5a6c75] mb-6">
              {error === "Article not found"
                ? "The article you're looking for doesn't exist or has been removed."
                : "Please try again later."}
            </p>
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#44666C] text-white rounded-full font-medium hover:bg-[#365a62] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </Link>
          </div>
        )}

        {/* Article Content */}
        {!isLoading && !error && article && (
          <article>
            {/* Cover Image */}
            {article.coverImage && (
              <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-8 shadow-lg">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a2e35] mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-[#5a6c75]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#44666C] to-[#62af9b] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{article.authorName}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.createdAt)}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{estimateReadTime(article.content)} min read</span>
                </div>

                <button
                  onClick={handleShare}
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ecf4f6] hover:bg-[#dde9eb] transition-colors text-[#44666C]"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </header>

            {/* Excerpt */}
            {article.excerpt && (
              <div className="bg-gradient-to-r from-[#44666C]/5 to-[#62af9b]/5 border-l-4 border-[#44666C] rounded-r-xl p-6 mb-8">
                <p className="text-lg text-[#3a4f56] leading-relaxed italic">
                  {article.excerpt}
                </p>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <ReadOnlyEditor content={article.content} />
            </div>

            {/* Footer */}
            <footer className="mt-8 pt-10 border-t border-gray-200">
              <div className="flex flex-row items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#44666C] to-[#62af9b] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8a9ba3]">Written by</p>
                    <p className="font-semibold text-[#1a2e35]">
                      {article.authorName}
                    </p>
                  </div>
                </div>

                <Link
                  to="/articles"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#44666C] text-white rounded-full font-medium hover:bg-[#365a62] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  More Articles
                </Link>
              </div>
            </footer>
          </article>
        )}
      </div>

      <Footer />
    </div>
  );
}
