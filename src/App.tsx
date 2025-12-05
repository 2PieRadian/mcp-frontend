import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ScreenProvider } from "./context/ScreenContext";
import { ExpertsProvider } from "./context/ExpertsContext";
import SelfAssessment from "./pages/SelfAssessment";
import SelfAssessmentQuestions from "./pages/SelfAssessmentQuestions";
import SelfAssessmentResult from "./pages/SelfAssessmentResult";
import WellnessExpertsIntro from "./pages/WellnessExpertsIntro";
import EducationExpertsIntro from "./pages/EducationExpertsIntro";
import FinanceExpertsIntro from "./pages/FinanceExpertsIntro";
import Therapists from "./pages/Therapists";
import YogaExperts from "./pages/YogaExperts";
import Dieticians from "./pages/Dieticians";
import Profile from "./pages/Profile";
import OAuthCallback from "./pages/OAuthCallback";
import ExpertsDashboard from "./pages/dashboards/ExpertsDashboard";
import ExpertDetails from "./pages/ExpertDetails";

export default function App() {
  return (
    <ScreenProvider>
      <ExpertsProvider>
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
          <Route
            path="/wellness-experts/therapists/*"
            element={<Therapists />}
          />
          <Route
            path="/wellness-experts/yoga-experts"
            element={<YogaExperts />}
          />
          <Route path="/wellness-experts/dieticians" element={<Dieticians />} />

          {/* Education Experts */}
          <Route
            path="/education-experts"
            element={<EducationExpertsIntro />}
          />
          <Route
            path="/education-experts/academic-counsellor"
            element={<Therapists />}
          />
          <Route
            path="/education-experts/career-planning-specialist"
            element={<Therapists />}
          />
          <Route
            path="/education-experts/path-finder-consultant"
            element={<Therapists />}
          />

          {/* Finance Experts */}
          <Route path="/finance-experts" element={<FinanceExpertsIntro />} />
          <Route
            path="/finance-experts/investment-counsellor"
            element={<Therapists />}
          />
          <Route
            path="/finance-experts/financial-expert"
            element={<Therapists />}
          />
          <Route
            path="/finance-experts/gst-&-taxation-expert"
            element={<Therapists />}
          />

          {/* Expert Details */}
          <Route path="/expert/:id" element={<ExpertDetails />} />

          {/* Authenticated */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard/expert" element={<ExpertsDashboard />} />
        </Routes>
      </ExpertsProvider>
    </ScreenProvider>
  );
}
