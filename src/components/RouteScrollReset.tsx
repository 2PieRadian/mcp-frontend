import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * RouteScrollReset Component
 *
 * Listens to route changes and instantly scrolls to top without animation.
 * Works by temporarily disabling scroll-behavior: smooth during the reset.
 *
 * Why this works:
 * 1. When route changes, we detect it via useLocation()
 * 2. We temporarily set scroll-behavior to "auto" (instant)
 * 3. We set scrollTop = 0 (instant jump, no animation)
 * 4. We restore scroll-behavior to "smooth" using requestAnimationFrame
 *    (ensures the DOM has updated before re-enabling smooth scroll)
 *
 * Result:
 * - Route navigation: instant jump to top
 * - User scrolling within page: smooth scrolling preserved
 */
export default function RouteScrollReset() {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip on first render (initial page load)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const scrollContainer = document.getElementById("main-scroll-container");

    if (scrollContainer) {
      // Step 1: Temporarily disable smooth scrolling
      scrollContainer.style.scrollBehavior = "auto";

      // Step 2: Instantly scroll to top
      scrollContainer.scrollTop = 0;

      // Step 3: Restore smooth scrolling after the scroll completes
      // Using requestAnimationFrame ensures the scroll has been applied
      requestAnimationFrame(() => {
        scrollContainer.style.scrollBehavior = "smooth";
      });
    } else {
      // Fallback for window scroll (if not using scroll container)
      const htmlElement = document.documentElement;

      htmlElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);

      requestAnimationFrame(() => {
        htmlElement.style.scrollBehavior = "smooth";
      });
    }
  }, [pathname]);

  // This component renders nothing - it's just a scroll behavior controller
  return null;
}
