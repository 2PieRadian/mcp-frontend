import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckCircle2, X } from "lucide-react";
import { consumeLoginSuccessToastPending } from "../lib/loginSuccessToast";

const DISPLAY_MS = 3000;

export default function LoginSuccessToast() {
  const { pathname, search } = useLocation();
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false);

  // Consume the one-shot flag when the route updates (e.g. after login redirect).
  useEffect(() => {
    if (!consumeLoginSuccessToastPending()) return;
    setVisible(true);
  }, [pathname, search]);

  // Dismiss timer must NOT live in the route effect: its cleanup cancels the timer on
  // every navigation, and the flag is already consumed so nothing re-arms the hide.
  useEffect(() => {
    if (!visible) return;
    const id = window.setTimeout(() => setVisible(false), DISPLAY_MS);
    return () => window.clearTimeout(id);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed top-5 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 px-0"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-xl border border-green-200 bg-green-50/95 px-5 py-3.5 text-green-800 shadow-2xl backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
        <CheckCircle2 className="size-6 shrink-0 text-green-600" aria-hidden />
        <p className="flex-1 text-[15px] font-medium leading-snug">
          {t("loggedInSuccessfully")}
        </p>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="shrink-0 p-1 rounded-lg hover:bg-green-200/50 transition-colors"
          aria-label={t("close")}
        >
          <X className="size-4 text-green-700" />
        </button>
      </div>
    </div>
  );
}
