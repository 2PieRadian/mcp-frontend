import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * RouteScrollReset Component
 *
 * Listens to route changes and instantly scrolls to top without animation.
 * Uses native window scroll for mobile pull-to-refresh compatibility.
 *
 * Why this works:
 * 1. When route changes, we detect it via useLocation()
 * 2. We temporarily set scroll-behavior to "auto" (instant)
 * 3. We scroll to top instantly (no animation)
 * 4. We restore scroll-behavior to "smooth" using requestAnimationFrame
 *
 * Result:
 * - Route navigation: instant jump to top
 * - User scrolling within page: smooth scrolling preserved
 * - Pull-to-refresh works on mobile (native window scroll)
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

    // Use native window scroll for mobile compatibility
    const htmlElement = document.documentElement;

    // Temporarily disable smooth scrolling for instant jump
    htmlElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    // Restore smooth scrolling after the scroll completes
    requestAnimationFrame(() => {
      htmlElement.style.scrollBehavior = "";
    });
  }, [pathname]);

  // This component renders nothing - it's just a scroll behavior controller
  return null;
}
