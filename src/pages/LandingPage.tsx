import HeroSection from "../components/HeroSection";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import HowDoesItWork from "../components/HowDoesItWork";
import Footer from "../components/Footer";
import ExpertVerifiedAssessmentsSection from "../components/ExpertVerifiedAssessmentsSection";
import MakeInIndia from "../components/MakeInIndia";
import { Helmet } from "react-helmet-async";
import useScrollToTop from "../hooks/useScrollToTop";

export default function UserDashboard() {
  useScrollToTop();
  return (
    <>
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

      <div className="landing-page px-[20px] overflow-x-hidden w-full max-w-full bg-white">
        <ResponsiveNavbar />
        <HeroSection />
        <MakeInIndia />
        <ExpertVerifiedAssessmentsSection />
        <HowDoesItWork />
        <WhyChooseUsSection />
        <Footer />
      </div>
    </>
  );
}
