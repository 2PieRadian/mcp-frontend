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
import Wellness from "./pages/assessments/Wellness";
import Finance from "./pages/assessments/Finance";
import Education from "./pages/assessments/Education";
import AssessmentIntro from "./pages/AssessmentIntro";
import AssessmentQuestions from "./pages/AssessmentQuestions";
import AssessmentResult from "./pages/AssessmentResult";
import FindCounsellors from "./pages/FindCounsellors";
import { useGoogleAnalytics } from "./hooks/useGoogleAnalytics";

export default function App() {
  // Track page views on every route change
  useGoogleAnalytics();
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

          {/* Assessments */}
          <Route path="/assessments/wellness" element={<Wellness />} />
          <Route
            path="/assessments/wellness/:assessmentType"
            element={<AssessmentIntro />}
          />
          <Route
            path="/assessments/wellness/:assessmentType/questions"
            element={<AssessmentQuestions />}
          />
          <Route
            path="/assessments/wellness/:assessmentType/result"
            element={<AssessmentResult />}
          />
          <Route path="/assessments/education" element={<Education />} />
          <Route
            path="/assessments/education/:assessmentType"
            element={<AssessmentIntro />}
          />
          <Route
            path="/assessments/education/:assessmentType/questions"
            element={<AssessmentQuestions />}
          />
          <Route
            path="/assessments/education/:assessmentType/result"
            element={<AssessmentResult />}
          />
          <Route path="/assessments/finance" element={<Finance />} />
          <Route
            path="/assessments/finance/:assessmentType"
            element={<AssessmentIntro />}
          />
          <Route
            path="/assessments/finance/:assessmentType/questions"
            element={<AssessmentQuestions />}
          />
          <Route
            path="/assessments/finance/:assessmentType/result"
            element={<AssessmentResult />}
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

          {/* Find Counsellors */}
          <Route path="/find-counsellors" element={<FindCounsellors />} />

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
