import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom hook that instantly scrolls to the top on route change.
 * Temporarily disables smooth scrolling to ensure instant jump.
 *
 * NOTE: If using ScrollLayout + RouteScrollReset in App.tsx,
 * this hook is not needed. It's kept for backward compatibility
 * with pages that may still use it.
 */
export default function useScrollToTop() {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const scrollContainer = document.getElementById("main-scroll-container");

    if (scrollContainer) {
      // Temporarily disable smooth scroll
      const originalBehavior = scrollContainer.style.scrollBehavior;
      scrollContainer.style.scrollBehavior = "auto";

      // Instant scroll to top
      scrollContainer.scrollTop = 0;

      // Restore smooth scroll
      requestAnimationFrame(() => {
        scrollContainer.style.scrollBehavior = originalBehavior || "smooth";
      });
    } else {
      // Fallback: window scroll
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });
    }
  }, [pathname]);
}

/**
 * Scrolls to a specific element with smooth animation.
 * Use this for in-page anchor navigation.
 *
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top (default: 0)
 */
export function scrollToElement(elementId: string, offset: number = 0) {
  const scrollContainer = document.getElementById("main-scroll-container");
  const targetElement = document.getElementById(elementId);

  if (scrollContainer && targetElement) {
    const containerRect = scrollContainer.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    const targetPosition =
      targetRect.top - containerRect.top + scrollContainer.scrollTop - offset;

    scrollContainer.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  } else if (targetElement) {
    // Fallback: use window scroll
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
}
