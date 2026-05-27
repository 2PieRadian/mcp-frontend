import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import SelfAssessmentNavbar from "../components/SelfAssessmentNavbar";
import { useAuth } from "../context/AuthContext";
import LoginRequiredModal from "../components/modals/LoginRequiredModal";

export default function SelfAssessment() {
  const { t } = useTranslation("sectors");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="self-assessment-page max-w-[1350px] mx-auto px-[25px]">
      <SelfAssessmentNavbar />

      <div className="self-assessment-intro min-h-[calc(100svh-76px)] flex flex-col items-center justify-center">
        <div className="text-center max-w-[700px] mx-auto">
          <h1 className="text-[clamp(30px,6vw,48px)] font-semibold">
            {t("selfAssessment.title")}
          </h1>

          <p className="text-[clamp(16px,3vw,20px)] text-light-text mt-[10px]">
            {t("selfAssessment.description")}
          </p>
        </div>

        <button
          onClick={() => {
            if (!user) {
              setShowLoginModal(true);
            } else {
              navigate("/self-assessment/questions");
            }
          }}
          className="mt-[50px] bg-[#44666C] text-white px-[30px] py-[13px] rounded-[30px] text-[18px] cursor-pointer"
        >
          {t("startAssessment", { ns: "common" })}
        </button>
      </div>
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
