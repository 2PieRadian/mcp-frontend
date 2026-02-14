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
 * - Mobile-friendly: uses min-h-screen instead of h-screen to allow native pull-to-refresh
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
    <div className="min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      {showNavbar && (
        <header className={`shrink-0 sticky top-0 z-40 w-full bg-white ${navbarPadding}`}>
          <Navbar />
        </header>
      )}

      {/* Main Content Area - allows native scroll and pull-to-refresh on mobile */}
      <main
        id="main-scroll-container"
        className="flex-1"
      >
        {children}
        {showFooter && <Footer />}
      </main>
    </div>
  );
}

/**
 * Minimal layout wrapper - no navbar/footer
 * Use this for pages that have their own custom navbar/footer
 * Uses native document scroll for mobile pull-to-refresh compatibility
 */
export function ScrollLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
