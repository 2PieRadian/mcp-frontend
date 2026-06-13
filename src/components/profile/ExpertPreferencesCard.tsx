import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileButton from "./ProfileButton";
import ExpertPreferencesModal from "./ExpertPreferencesModal";

export default function ExpertPreferencesCard() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const preferences = user?.expertPreferences || [];

  return (
    <div className="bg-[hsl(0,0%,97%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px] sm:col-span-2">
      <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
        Expert Preferences
      </p>
      <div className="space-y-[6px] sm:space-y-[8px] text-[16px] sm:text-[17px] text-light-text">
        <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
          <div className="flex items-start justify-between gap-[8px] sm:gap-[10px] mt-[-2px]">
            <div className="flex flex-wrap gap-2 pt-1">
              {preferences.length > 0 ? (
                preferences.map((pref, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#E0ECEE] text-[#44666C] rounded-full text-sm font-medium"
                  >
                    {pref}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm italic py-1">
                  No preferences set
                </span>
              )}
            </div>
            <ProfileButton
              type="button"
              onClick={() => setIsModalOpen(true)}
              variant="secondary"
              className="shrink-0"
            >
              {preferences.length > 0 ? "Edit" : "Set"}
            </ProfileButton>
          </div>
        </div>
      </div>

      <ExpertPreferencesModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
