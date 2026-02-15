import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom hook that smoothly scrolls to the top when the route/pathname changes.
 * Used by individual pages that need to scroll to top on mount (e.g. after navigation).
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

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
  const targetElement = document.getElementById(elementId);

  if (targetElement) {
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}
