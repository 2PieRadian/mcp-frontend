import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

/**
 * A minimalistic scroll-to-top button that appears when user scrolls down.
 * Uses native window scroll for mobile compatibility.
 */
export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled more than 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg text-slate-600 hover:text-primary hover:border-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ChevronUp size={20} strokeWidth={2.5} />
    </button>
  );
}
