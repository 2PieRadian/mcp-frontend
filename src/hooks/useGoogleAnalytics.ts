import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Declare gtag as a global function for TypeScript
// This tells TypeScript that 'gtag' exists on the window object
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

// Your Google Analytics Measurement ID
const GA_MEASUREMENT_ID = "G-5LJ400CZM3";

/**
 * Custom hook to track page views in Google Analytics
 * whenever the route changes in a React SPA.
 *
 * How it works:
 * 1. useLocation() returns the current URL location object
 * 2. useEffect() runs every time the location changes
 * 3. We call gtag() to send a page_view event to Google Analytics
 */
export const useGoogleAnalytics = () => {
  // Get the current location object from React Router
  // This object contains: pathname, search, hash, state, key
  const location = useLocation();

  useEffect(() => {
    // Check if gtag function exists (it's loaded from the script in index.html)
    // This prevents errors if the script hasn't loaded yet or is blocked
    if (typeof window.gtag !== "function") {
      return;
    }

    // Send a page_view event to Google Analytics
    // 'config' command with page_path triggers a pageview
    window.gtag("config", GA_MEASUREMENT_ID, {
      // The current page path (e.g., "/login", "/wellness-experts/therapist")
      page_path: location.pathname + location.search,

      // The page title - uses the document title which may be set by react-helmet
      page_title: document.title,

      // The full page URL
      page_location: window.location.href,
    });
  }, [location]); // Re-run this effect whenever location changes
};

/**
 * Helper function to track custom events in Google Analytics
 * Use this to track button clicks, form submissions, etc.
 *
 * Example usage:
 * trackEvent('button_click', 'signup', 'header_cta', 1);
 *
 * @param action - What happened (e.g., 'click', 'submit', 'download')
 * @param category - Event category (e.g., 'engagement', 'signup', 'assessment')
 * @param label - Optional label for more context
 * @param value - Optional numeric value
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  // Check if gtag exists before calling
  if (typeof window.gtag !== "function") {
    return;
  }

  // Send a custom event to Google Analytics
  // 'event' command sends an event with the specified parameters
  window.gtag("event", action, {
    event_category: category, // Groups similar events together
    event_label: label, // Provides additional context
    value: value, // Numeric value (useful for tracking amounts, scores, etc.)
  });
};
