import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import Footer from "../components/Footer";
import {
  fetchAllArticles,
  searchArticles,
  fetchTags,
  fetchArticlesByTag,
} from "../lib/articles-api";
import type { Article, Tag } from "../types/articles";
import {
  Calendar,
  User,
  ArrowRight,
  BookOpen,
  Search,
  X,
  Loader2,
  Tag as TagIcon,
  Hash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ArticleSearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search
  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsSearching(true);
    try {
      const data = await searchArticles(searchQuery, 6);
      setResults(data);
      setIsOpen(data.length > 0);
      setSelectedIndex(-1);
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounce input changes
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, handleSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          navigate(`/articles/${results[selectedIndex].slug}`);
          setIsOpen(false);
          setQuery("");
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#44666C] to-[#62af9b] rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
        <div className="relative flex items-center bg-white rounded-full border-2 border-transparent group-focus-within:border-[#44666C]/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="pl-5 pr-2">
            {isSearching ? (
              <Loader2 className="w-5 h-5 text-[#44666C] animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-[#8a9ba3] group-focus-within:text-[#44666C] transition-colors" />
            )}
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            placeholder="Search articles by title..."
            className="flex-1 py-4 pr-4 bg-transparent text-[#1a2e35] placeholder-[#8a9ba3] focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="pr-5 pl-2 text-[#8a9ba3] hover:text-[#44666C] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            {results.map((article, index) => (
              <Link
                key={article.id}
                to={`/articles/${article.slug}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery("");
                }}
                className={`flex items-start gap-4 p-3 rounded-xl transition-all duration-150 ${index === selectedIndex
                  ? "bg-[#44666C]/10"
                  : "hover:bg-gray-50"
                  }`}
              >
                {/* Thumbnail */}
                <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-[#44666C] to-[#62af9b]">
                  {article.coverImage ? (
                    <img
                      src={article.coverImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white/50" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#1a2e35] text-sm line-clamp-1 mb-0.5">
                    {article.title}
                  </h4>
                  <p className="text-xs text-[#5a6c75] line-clamp-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#8a9ba3]">
                    <User className="w-3 h-3" />
                    <span>{article.authorName}</span>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-[#44666C] opacity-0 group-hover:opacity-100 shrink-0 mt-1" />
              </Link>
            ))}
          </div>

          {/* Footer hint */}
          <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-[#8a9ba3]">
            <span>
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 font-mono text-[10px]">
                ↑↓
              </kbd>{" "}
              to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200 font-mono text-[10px]">
                Enter
              </kbd>{" "}
              to select
            </span>
          </div>
        </div>
      )}

      {/* No results message */}
      {isOpen && query && !isSearching && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 text-center z-50">
          <BookOpen className="w-10 h-10 text-[#8a9ba3] mx-auto mb-2" />
          <p className="text-[#5a6c75] text-sm">
            No articles found for "{query}"
          </p>
        </div>
      )}
    </div>
  );
}

interface TagsSectionProps {
  tags: Tag[];
  isLoadingTags: boolean;
  selectedTag: Tag | null;
  onSelectTag: (tag: Tag | null) => void;
}

function TagsSection({
  tags,
  isLoadingTags,
  selectedTag,
  onSelectTag,
}: TagsSectionProps) {
  const [tagSearch, setTagSearch] = useState("");
  const [filteredTags, setFilteredTags] = useState<Tag[]>(tags);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter tags based on search
  useEffect(() => {
    if (!tagSearch.trim()) {
      setFilteredTags(tags);
    } else {
      const query = tagSearch.toLowerCase();
      setFilteredTags(
        tags.filter(
          (tag) =>
            tag.name.toLowerCase().includes(query) ||
            tag.slug.toLowerCase().includes(query)
        )
      );
    }
  }, [tagSearch, tags]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check scroll position for scroll buttons
  const checkScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftScroll(scrollLeft > 0);
    setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollPosition();
    container.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [checkScrollPosition, tags]);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  if (isLoadingTags) {
    return (
      <div className="flex items-center justify-center gap-3 overflow-x-auto py-4 scrollbar-hide">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-24 bg-gray-200 rounded-full animate-pulse shrink-0"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="py-3 w-full">
      {/* Search and Scroll Container */}
      <div className="flex items-center gap-3 mb-2 w-full">
        {/* Tag Search */}
        <div ref={searchContainerRef} className="relative shrink-0">
          <div className="flex items-center bg-white/80 backdrop-blur-sm border border-[#44666C]/20 rounded-full px-4 py-2 gap-2 hover:border-[#44666C]/40 transition-colors">
            <Hash className="w-4 h-4 text-[#44666C]" />
            <input
              type="text"
              value={tagSearch}
              onChange={(e) => {
                setTagSearch(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search tags..."
              className="bg-transparent text-sm text-[#1a2e35] placeholder-[#8a9ba3] focus:outline-none w-32 sm:w-40"
            />
            {tagSearch && (
              <button
                onClick={() => {
                  setTagSearch("");
                  setIsSearchOpen(false);
                }}
                className="text-[#8a9ba3] hover:text-[#44666C]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Tag Search Dropdown */}
          {isSearchOpen && tagSearch && filteredTags.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-60 overflow-y-auto">
              {filteredTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => {
                    onSelectTag(selectedTag?.id === tag.id ? null : tag);
                    setTagSearch("");
                    setIsSearchOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${selectedTag?.id === tag.id
                    ? "bg-[#44666C]/10"
                    : "hover:bg-gray-50"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <TagIcon className="w-4 h-4 text-[#44666C]" />
                    <span className="font-medium text-[#1a2e35]">
                      {tag.name}
                    </span>
                  </div>
                  <span className="text-xs text-[#8a9ba3] bg-gray-100 px-2 py-0.5 rounded-full">
                    {tag._count.articles}
                  </span>
                </button>
              ))}
            </div>
          )}

          {isSearchOpen && tagSearch && filteredTags.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-4 text-center z-50">
              <p className="text-sm text-[#5a6c75]">No tags found</p>
            </div>
          )}
        </div>

        {/* Scrollable Tags Container */}
        <div className="relative flex-1 min-w-0 flex items-center gap-2">
          {/* Left Scroll Button */}
          {showLeftScroll && (
            <button
              onClick={scrollLeft}
              className="shrink-0 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-md flex items-center justify-center text-[#44666C] hover:bg-[#44666C] hover:text-white transition-all duration-200 z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Tags Slider */}
          <div
            ref={scrollContainerRef}
            className="flex-1 min-w-0 flex items-center gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {/* All Articles button */}
            <button
              onClick={() => onSelectTag(null)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${!selectedTag
                ? "bg-[#44666C] text-white shadow-md"
                : "bg-white/80 text-[#5a6c75] border border-gray-200 hover:border-[#44666C]/30 hover:text-[#44666C]"
                }`}
            >
              All Articles
            </button>

            {/* All Tags */}
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() =>
                  onSelectTag(selectedTag?.id === tag.id ? null : tag)
                }
                className={`group shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${selectedTag?.id === tag.id
                  ? "bg-[#44666C] text-white shadow-md"
                  : "bg-white/80 text-[#5a6c75] border border-gray-200 hover:border-[#44666C]/30 hover:text-[#44666C]"
                  }`}
              >
                <Hash
                  className={`w-3.5 h-3.5 shrink-0 ${selectedTag?.id === tag.id
                    ? "text-white/70"
                    : "text-[#8a9ba3] group-hover:text-[#44666C]"
                    }`}
                />
                <span>{tag.name}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full shrink-0 ${selectedTag?.id === tag.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-[#8a9ba3]"
                    }`}
                >
                  {tag._count.articles}
                </span>
              </button>
            ))}
          </div>

          {/* Right Scroll Button */}
          {showRightScroll && (
            <button
              onClick={scrollRight}
              className="shrink-0 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-md flex items-center justify-center text-[#44666C] hover:bg-[#44666C] hover:text-white transition-all duration-200 z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Selected Tag Info */}
      {selectedTag && (
        <div className="mt-2 flex items-center justify-center gap-2 text-sm text-[#5a6c75]">
          <span>Showing articles tagged with</span>
          <span className="font-semibold text-[#44666C] bg-[#44666C]/10 px-3 py-1 rounded-full">
            #{selectedTag.name}
          </span>
          <button
            onClick={() => onSelectTag(null)}
            className="text-[#8a9ba3] hover:text-[#44666C] ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to={`/articles/${article.slug}`}
      className="group block bg-white rounded-[20px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
    >
      {/* Cover Image */}
      {article.coverImage ? (
        <div className="aspect-[16/9] overflow-hidden bg-gray-100">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center">
          <BookOpen className="w-16 h-16 text-white/30" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#1a2e35] mb-3 line-clamp-2 group-hover:text-[#44666C] transition-colors">
          {article.title}
        </h2>

        <p className="text-[#5a6c75] text-sm leading-relaxed mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-[#8a9ba3]">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{article.authorName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(article.createdAt)}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[#44666C] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Read</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function ArticleCardSkeleton() {
  return (
    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      <div className="aspect-[16/9] bg-gray-200" />
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded-lg mb-3 w-3/4" />
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
          <div className="h-4 bg-gray-100 rounded w-2/3" />
        </div>
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          <div className="h-4 bg-gray-100 rounded w-24" />
          <div className="h-4 bg-gray-100 rounded w-28" />
        </div>
      </div>
    </div>
  );
}

export default function Articles() {
  const { t } = useTranslation(["navigation", "common"]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTags, setIsLoadingTags] = useState(true);
  const [isLoadingTagArticles, setIsLoadingTagArticles] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all articles initially
  useEffect(() => {
    async function loadArticles() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchAllArticles();
        setAllArticles(data);
        setDisplayedArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load articles");
      } finally {
        setIsLoading(false);
      }
    }

    loadArticles();
  }, []);

  // Load tags
  useEffect(() => {
    async function loadTags() {
      try {
        setIsLoadingTags(true);
        const data = await fetchTags(20);
        setTags(data);
      } catch (err) {
        console.error("Failed to load tags:", err);
      } finally {
        setIsLoadingTags(false);
      }
    }

    loadTags();
  }, []);

  // Handle tag selection
  const handleSelectTag = useCallback(
    async (tag: Tag | null) => {
      setSelectedTag(tag);

      if (!tag) {
        // Show all articles
        setDisplayedArticles(allArticles);
        return;
      }

      // Fetch articles by tag
      try {
        setIsLoadingTagArticles(true);
        const taggedArticles = await fetchArticlesByTag(tag.slug);
        setDisplayedArticles(taggedArticles);
      } catch (err) {
        console.error("Failed to load articles by tag:", err);
        setDisplayedArticles([]);
      } finally {
        setIsLoadingTagArticles(false);
      }
    },
    [allArticles]
  );

  const isLoadingArticles = isLoading || isLoadingTagArticles;

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <ResponsiveNavbar />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-6 md:pb-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a2e35] mb-6">
            {t("articles", { ns: "navigation" })}
          </h1>

          <p className="text-lg md:text-xl text-[#5a6c75] max-w-2xl mx-auto leading-relaxed mb-10">
            Explore expert insights, practical guides, and evidence-based
            articles to support your wellness journey.
          </p>

          {/* Search Bar */}
          <ArticleSearchBar />

          {/* Tags Section */}
          <div className="mt-6">
            <TagsSection
              tags={tags}
              isLoadingTags={isLoadingTags}
              selectedTag={selectedTag}
              onSelectTag={handleSelectTag}
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Loading State */}
          {isLoadingArticles && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <ArticleCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !isLoadingArticles && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a2e35] mb-2">
                Failed to load articles
              </h3>
              <p className="text-[#5a6c75] mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 bg-[#44666C] text-white rounded-full font-medium hover:bg-[#365a62] transition-colors"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoadingArticles && !error && displayedArticles.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-[#44666C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a2e35] mb-2">
                {selectedTag ? `No articles tagged with #${selectedTag.name}` : "No articles yet"}
              </h3>
              <p className="text-[#5a6c75]">
                {selectedTag ? "Try selecting a different tag." : "Check back soon for new content!"}
              </p>
              {selectedTag && (
                <button
                  onClick={() => handleSelectTag(null)}
                  className="mt-4 px-6 py-2.5 bg-[#44666C] text-white rounded-full font-medium hover:bg-[#365a62] transition-colors"
                >
                  View all articles
                </button>
              )}
            </div>
          )}

          {/* Articles */}
          {!isLoadingArticles && !error && displayedArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </div>


      <Footer />
    </div>
  );
}
