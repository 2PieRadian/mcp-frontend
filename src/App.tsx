import { useEffect, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ScreenProvider } from "./context/ScreenContext";
import { ExpertsProvider } from "./context/ExpertsContext";
import { AvailabilityProvider } from "./context/AvailabilityContext";
import { BookingProvider } from "./context/BookingContext";
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
import Dashboard from "./pages/Dashboard";
import UrgentRequests from "./pages/UrgentRequests";
import AppointmentVideoSession from "./pages/AppointmentVideoSession";
import ExpertDetails from "./pages/ExpertDetails";
import Wellness from "./pages/assessments/Wellness";
import Finance from "./pages/assessments/Finance";
import Education from "./pages/assessments/Education";
import AssessmentIntro from "./pages/AssessmentIntro";
import AssessmentQuestions from "./pages/AssessmentQuestions";
import AssessmentResult from "./pages/AssessmentResult";
import FindCounsellors from "./pages/FindCounsellors";
import ChooseExpertCategory from "./pages/ChooseExpertCategory";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import TermsOfUse from "./pages/TermsOfUse";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import HelpCenter from "./pages/HelpCenter";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import { useGoogleAnalytics } from "./hooks/useGoogleAnalytics";
import LoginSuccessToast from "./components/LoginSuccessToast";
import Careers from "./pages/Careers";
import JobApplication from "./pages/JobApplication";
import About from "./pages/About";
import DigitalTechnologySolutions from "./pages/DigitalTechnologySolutions";
import TechnologyContact from "./pages/TechnologyContact";
import DeleteAccount from "./pages/DeleteAccount";

export default function App() {
  const { pathname } = useLocation();

  useGoogleAnalytics();

  // Prevent browser from trying to restore scroll on SPA navigations
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Always start new routes at the top (runs before paint)
  useLayoutEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;

    // Force an instant scroll reset even if CSS has scroll-behavior: smooth
    html.style.scrollBehavior = "auto";

    // Reset any likely scroll containers
    window.scrollTo(0, 0);
    document.scrollingElement?.scrollTo(0, 0);
    document.body.scrollTop = 0;
    html.scrollTop = 0;

    const main = document.getElementById("main-scroll-container");
    main?.scrollTo(0, 0);

    // Restore previous behavior on next frame
    requestAnimationFrame(() => {
      html.style.scrollBehavior = prev;
    });
  }, [pathname]);

  return (
    <ScreenProvider>
      <ExpertsProvider>
        <AvailabilityProvider>
          <BookingProvider>
            <LoginSuccessToast />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/oauth/google/callback"
                element={<OAuthCallback />}
              />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/apply" element={<JobApplication />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/digital-technology-solutions"
                element={<DigitalTechnologySolutions />}
              />
              <Route
                path="/technology-contact"
                element={<TechnologyContact />}
              />

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
              <Route
                path="/wellness-experts"
                element={<WellnessExpertsIntro />}
              />
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
              <Route
                path="/finance-experts"
                element={<FinanceExpertsIntro />}
              />
              <Route
                path="/finance-experts/:specialization"
                element={<ExpertsListing />}
              />

              {/* Choose Expert Category */}
              <Route
                path="/choose-experts"
                element={<ChooseExpertCategory />}
              />

              {/* Find Counsellors */}
              <Route path="/find-counsellors" element={<FindCounsellors />} />

              {/* Expert Details */}
              <Route path="/expert/:id" element={<ExpertDetails />} />

              {/* Authenticated */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/dashboard/urgent-requests"
                element={<UrgentRequests />}
              />
              <Route path="/dashboard/expert" element={<ExpertsDashboard />} />
              <Route
                path="/appointments/:appointmentId/video"
                element={<AppointmentVideoSession />}
              />

              {/* Legal Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/delete-account" element={<DeleteAccount />} />

              {/* Contact, FAQ & Help */}
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/help" element={<HelpCenter />} />

              {/* Articles */}
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ArticleDetail />} />
            </Routes>
          </BookingProvider>
        </AvailabilityProvider>
      </ExpertsProvider>
    </ScreenProvider>
  );
}
