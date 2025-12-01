import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ScreenProvider } from "./context/ScreenContext";
import SelfAssessment from "./pages/SelfAssessment";
import SelfAssessmentQuestions from "./pages/SelfAssessmentQuestions";
import SelfAssessmentResult from "./pages/SelfAssessmentResult";
import WellnessExpertsIntro from "./pages/WellnessExpertsIntro";
import EducationExpertsIntro from "./pages/EducationExpertsIntro";
import FinanceExpertsIntro from "./pages/FinanceExpertsIntro";
import Experts from "./pages/Experts";
import Profile from "./pages/Profile";
import OAuthCallback from "./pages/OAuthCallback";

export default function App() {
  return (
    <ScreenProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth/google/callback" element={<OAuthCallback />} />

        {/* Self Assessment */}
        <Route path="/self-assessment" element={<SelfAssessment />} />
        <Route
          path="/self-assessment/questions"
          element={<SelfAssessmentQuestions />}
        />
        <Route
          path="/self-assessment/result"
          element={<SelfAssessmentResult />}
        />

        {/* Wellness Experts */}
        <Route path="/wellness-experts" element={<WellnessExpertsIntro />} />
        <Route path="/wellness-experts/therapists" element={<Experts />} />
        <Route path="/wellness-experts/yoga-experts" element={<Experts />} />
        <Route path="/wellness-experts/dieticians" element={<Experts />} />

        {/* Education Experts */}
        <Route path="/education-experts" element={<EducationExpertsIntro />} />
        <Route
          path="/education-experts/academic-counsellor"
          element={<Experts />}
        />
        <Route
          path="/education-experts/career-planning-specialist"
          element={<Experts />}
        />
        <Route
          path="/education-experts/path-finder-consultant"
          element={<Experts />}
        />

        {/* Finance Experts */}
        <Route path="/finance-experts" element={<FinanceExpertsIntro />} />
        <Route
          path="/finance-experts/investment-counsellor"
          element={<Experts />}
        />
        <Route path="/finance-experts/financial-expert" element={<Experts />} />
        <Route
          path="/finance-experts/gst-&-taxation-expert"
          element={<Experts />}
        />

        {/* Authenticated */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </ScreenProvider>
  );
}
