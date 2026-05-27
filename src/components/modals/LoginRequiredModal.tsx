import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { X, LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function LoginRequiredModal({
  isOpen,
  onClose,
  title,
  message,
}: LoginRequiredModalProps) {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const location = useLocation();
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const isVisible = isOpen || isClosing;

  useEffect(() => {
    if (!isOpen || !backdropRef.current || !panelRef.current) return;
    setIsClosing(false);
    document.body.style.overflow = "hidden";
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" },
    );
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" },
    );

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    if (!backdropRef.current || !panelRef.current) {
      onClose();
      return;
    }
    setIsClosing(true);
    gsap.to(panelRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.2,
      ease: "power2.in",
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setIsClosing(false);
        onClose();
      },
    });
  };

  const handleLogin = () => {
    handleClose();
    // Pass the current pathname as state so they can be redirected back after login
    navigate("/login", { state: { from: location.pathname } });
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      aria-modal="true"
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mt-2 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#E0ECEE] flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-[#44666C]" />
          </div>
          <h2 className="text-xl font-bold text-[#1a2e35] mb-2">
            {title || "Login Required"}
          </h2>
          <p className="text-[#5a6c75] text-sm leading-relaxed">
            {message || "Please login first to take an assessment."}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-[#44666C] hover:bg-[#38555a] text-white rounded-xl font-semibold transition-colors"
          >
            {t("login", { defaultValue: "Log In" })}
          </button>
          <button
            onClick={handleClose}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-[#1a2e35] rounded-xl font-semibold transition-colors"
          >
            {t("cancel", { defaultValue: "Cancel" })}
          </button>
        </div>
      </div>
    </div>
  );
}
