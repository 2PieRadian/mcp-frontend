import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  type ReactNode,
} from "react";

interface ScreenContextType {
  screenWidth: number;
}

const ScreenContext = createContext<ScreenContextType | undefined>(undefined);

interface ScreenProviderProps {
  children: ReactNode;
}

// Safe getter for window.innerWidth (returns reasonable default if window unavailable)
function getWindowWidth(): number {
  if (typeof window !== "undefined" && window.innerWidth) {
    return window.innerWidth;
  }
  // Default to desktop width so navbar renders correctly on SSR/initial load
  return 1200;
}

export function ScreenProvider({ children }: ScreenProviderProps) {
  const [screenWidth, setScreenWidth] = useState<number>(getWindowWidth);

  // Use useLayoutEffect to measure before paint (avoids flash of wrong navbar)
  useLayoutEffect(() => {
    // Immediately set correct width on mount
    setScreenWidth(getWindowWidth());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const value: ScreenContextType = {
    screenWidth,
  };

  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  );
}

export function useScreen(): ScreenContextType {
  const context = useContext(ScreenContext);

  if (context === undefined) {
    throw new Error("useScreen must be used within a ScreenProvider");
  }
  return context;
}
