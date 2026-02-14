import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom hook that instantly scrolls to the top on route change.
 * Uses native window scroll for mobile pull-to-refresh compatibility.
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

    // Use native window scroll
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
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
