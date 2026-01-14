import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  /** Whether to show the footer - default is true */
  showFooter?: boolean;
  /** Whether to show the navbar - default is true */
  showNavbar?: boolean;
  /** Custom navbar padding (e.g., "px-[20px]") */
  navbarPadding?: string;
}

/**
 * Layout component with:
 * - Fixed navbar at the top (optional)
 * - Scrollable content area below
 * - Smooth scrolling for user-driven scroll (via CSS class)
 *
 * Note: Route change scroll reset is handled by RouteScrollReset component
 */
export default function Layout({
  children,
  showFooter = true,
  showNavbar = true,
  navbarPadding = "px-[16px] sm:px-[20px]",
}: LayoutProps) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Fixed Navbar */}
      {showNavbar && (
        <header className={`shrink-0 ${navbarPadding}`}>
          <Navbar />
        </header>
      )}

      {/* Scrollable Content Area - smooth scroll for user-driven scrolling */}
      <div
        id="main-scroll-container"
        className="flex-1 overflow-y-auto"
        style={{ scrollBehavior: "smooth" }}
      >
        {children}
        {showFooter && <Footer />}
      </div>
    </div>
  );
}

/**
 * Minimal layout that only provides the scroll container - no navbar/footer
 * Use this for pages that have their own custom navbar/footer
 */
export function ScrollLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden">
      <div
        id="main-scroll-container"
        className="h-full overflow-y-auto"
        style={{ scrollBehavior: "smooth" }}
      >
        {children}
      </div>
    </div>
  );
}
