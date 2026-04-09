import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import HowDoesItWork from "../components/HowDoesItWork";
import Footer from "../components/Footer";
import ExpertVerifiedAssessmentsSection from "../components/ExpertVerifiedAssessmentsSection";
import MakeInIndia from "../components/MakeInIndia";
import GuidanceQuotesSection from "../components/GuidanceQuotesSection";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../context/AuthContext";

const TOAST_DURATION_MS = 10_000;

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user, isLoading, syncSessionFromStorage } = useAuth();
  const [showProfileToast, setShowProfileToast] = useState(false);

  useEffect(() => {
    syncSessionFromStorage();
  }, [syncSessionFromStorage]);

  useEffect(() => {
    if (isLoading || !user) return;
    if (!user.phoneNumber?.trim()) {
      setShowProfileToast(true);
      const t = setTimeout(() => setShowProfileToast(false), TOAST_DURATION_MS);
      return () => clearTimeout(t);
    }
  }, [user, isLoading]);

  return (
    <>
      {showProfileToast && user && !user.phoneNumber?.trim() && (
        <div
          className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:w-auto z-50 flex flex-row items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-2xl text-[15px] sm:text-[16px] font-medium bg-[#1a2e35]/60 backdrop-blur-sm text-white border border-white/15"
          style={{
            animation: "toast-slide-in 0.4s ease-out forwards",
            opacity: 0,
          }}
        >
          <span className="whitespace-nowrap">
            Please Complete Your Profile
          </span>
          <button
            type="button"
            onClick={() => {
              setShowProfileToast(false);
              navigate("/profile");
            }}
            className="shrink-0 bg-white/90 text-[#1a2e35] rounded-lg px-3 sm:px-4 py-1.5 text-[14px] sm:text-[15px] font-medium hover:bg-white transition-colors cursor-pointer backdrop-blur-sm"
          >
            Profile
          </button>
        </div>
      )}

      <style>{`
        @keyframes toast-slide-in {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @media (min-width: 640px) {
          @keyframes toast-slide-in {
            from {
              transform: translateX(-50%) translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateX(-50%) translateY(0);
              opacity: 1;
            }
          }
        }
      `}</style>

      <Helmet>
        <title>
          MindCurePath | Expert‑Verified Wellness, Education &amp; Finance
          Assessments
        </title>
        <meta
          name="description"
          content="Take expert‑verified, science‑backed self‑assessments in wellness, education, and finance on MindCurePath. Get personalized insights and connect with trusted experts."
        />
        <link rel="canonical" href="https://mindcurepath.com/" />

        {/* Open Graph overrides for homepage */}
        <meta
          property="og:title"
          content="MindCurePath | Expert‑Verified Wellness, Education &amp; Finance Assessments"
        />
        <meta
          property="og:description"
          content="Discover your wellness, education, and financial readiness with expert‑verified self‑assessments and curated experts."
        />
        <meta property="og:url" content="https://mindcurepath.com/" />

        {/* Twitter card overrides */}
        <meta
          name="twitter:title"
          content="MindCurePath | Expert‑Verified Wellness, Education &amp; Finance Assessments"
        />
        <meta
          name="twitter:description"
          content="Expert‑verified self‑assessments for wellness, education, and finance. Start your journey on MindCurePath."
        />
      </Helmet>

      <div className="landing-page w-full max-w-full bg-white">
        <div className="px-[16px] sm:px-[20px]">
          <ResponsiveNavbar />
        </div>
        <HeroSection />
        <div className="px-[16px] sm:px-[20px]">
          <GuidanceQuotesSection />
          <MakeInIndia />
          <ExpertVerifiedAssessmentsSection />
          <HowDoesItWork />
          <WhyChooseUsSection />
        </div>
      </div>
      <Footer />
    </>
  );
}
