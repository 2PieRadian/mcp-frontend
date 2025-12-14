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
import ExpertsListing from "./pages/ExpertsListing";
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
            path="/wellness-experts/:specialization"
            element={<ExpertsListing />}
          />

          {/* Education Experts */}
          <Route
            path="/education-experts"
            element={<EducationExpertsIntro />}
          />
          <Route
            path="/education-experts/:specialization"
            element={<ExpertsListing />}
          />

          {/* Finance Experts */}
          <Route path="/finance-experts" element={<FinanceExpertsIntro />} />
          <Route
            path="/finance-experts/:specialization"
            element={<ExpertsListing />}
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
