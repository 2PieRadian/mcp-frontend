import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { lazy, useState } from "react";
import useScrollToTop from "../hooks/useScrollToTop";
import { AlertTriangle, X } from "lucide-react";

const BasicInfoCard = lazy(() => import("../components/profile/BasicInfoCard"));
const ContactCard = lazy(() => import("../components/profile/ContactCard"));
const AccountActivityCard = lazy(
  () => import("../components/profile/AccountActivityCard")
);
const GenderCard = lazy(() => import("../components/profile/GenderCard"));
const DateOfBirthCard = lazy(
  () => import("../components/profile/DateOfBirthCard")
);
const ChangePasswordCard = lazy(
  () => import("../components/profile/ChangePasswordCard")
);
const LanguagesCard = lazy(() => import("../components/profile/LanguagesCard"));

export default function Profile() {
  useScrollToTop();
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const displayName = user?.name || user?.email || "";
  const initial = displayName?.charAt(0)?.toUpperCase() ?? "?";

  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading || !user) {
    return null;
  }

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="min-h-screen bg-light-100 px-[20px]">
      <ResponsiveNavbar />

      <main className="w-full py-[20px] sm:py-[30px] space-y-[16px] sm:space-y-[24px] [@media(min-width:950px)]:max-w-[900px] [@media(min-width:950px)]:mx-auto [@media(min-width:950px)]:px-[25px]">
        {/* Page heading */}
        <header className="flex flex-col gap-[4px]">
          <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.24em] text-gray-500">
            Your space
          </p>
          <h1 className="text-[clamp(28px,5vw,36px)] font-bold text-logo-heading">
            Your Profile
          </h1>
          <p className="text-[16px] sm:text-[17px] text-light-text max-w-[520px]">
            Manage your personal details and keep your account information up to
            date.
          </p>
        </header>

        {/* Hero / header */}
        <section className="bg-linear-to-r from-[hsl(194,27%,21%)] to-[hsl(187,73%,24%)] rounded-[16px] sm:rounded-[20px] p-[16px] sm:p-[28px] text-light-100 shadow-[inset_0px_1px_5px_hsla(0,0%,100%,0.4)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[16px] sm:gap-[20px]">
          <div className="flex items-center gap-[12px] sm:gap-[16px] shadow-m-profile rounded-[30px] sm:rounded-[25px] py-[12px] sm:py-[18px] px-[12px] sm:pr-[25px]">
            <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-full bg-light-100/10 border border-light-100/40 flex items-center justify-center text-[22px] sm:text-[26px] font-semibold overflow-hidden shrink-0">
              {user.avatarUrl && !imageError ? (
                <img
                  src={user.avatarUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                initial
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.12em] opacity-80">
                Account
              </p>
              <h1 className="text-[clamp(16px,3.5vw,26px)] font-semibold leading-tight truncate">
                {displayName}
              </h1>
              <p className="text-[12px] sm:text-[13px] opacity-80 break-all">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogoutClick}
            className="self-start shadow-m-profile sm:self-auto w-full sm:w-auto cursor-pointer border border-light-100/10 text-light-100 rounded-full px-[18px] py-[10px] sm:py-[8px] font-medium hover:bg-light-100 hover:text-primary transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
            style={{ fontSize: "16px" }}
          >
            Logout
          </button>
        </section>

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative">
              {/* Close Button */}
              <button
                onClick={handleCancelLogout}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="text-red-500" size={32} />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-[#1a2e35] text-center mb-3">
                Confirm Logout
              </h2>

              {/* Description */}
              <p
                className="text-[#5a6c75] text-center mb-6"
                style={{ fontSize: "16px" }}
              >
                Are you sure you want to logout? You will need to sign in again
                to access your account.
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCancelLogout}
                  className="flex-1 px-6 py-3 rounded-[10px] border hover:scale-102 border-gray-300 text-[#1a2e35] font-medium hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                  style={{ fontSize: "16px" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="flex-1 px-6 py-3 rounded-[10px] bg-[hsl(0,89%,60%)] text-white hover:scale-102 font-medium hover:bg-[hsl(0,89%,56%)] transition-all duration-200 cursor-pointer"
                  style={{ fontSize: "16px" }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info sections */}
        <section className="grid gap-[14px] sm:gap-[18px] sm:grid-cols-2 mb-[100px]">
          <BasicInfoCard />
          <ContactCard />
          <GenderCard />
          <DateOfBirthCard />
          <LanguagesCard />
          <ChangePasswordCard />
          <AccountActivityCard />
        </section>
      </main>
    </div>
  );
}
