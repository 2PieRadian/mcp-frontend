import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./i18n/config";
import { AuthProvider } from "./context/AuthContext";
import { HelmetProvider } from "react-helmet-async";

// Ensure body is never stuck in scroll-locked state on page load/refresh
function unlockBodyScroll() {
  const body = document.body;
  if (body.style.position === "fixed") {
    const scrollY = Math.abs(parseInt(body.style.top || "0", 10));
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";
    body.style.overflow = "";
    document.documentElement.style.overflow = "";
    window.scrollTo(0, scrollY);
  }
}

// Run on initial load and when page becomes visible
unlockBodyScroll();
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    unlockBodyScroll();
  }
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AuthProvider>
  </BrowserRouter>
);
