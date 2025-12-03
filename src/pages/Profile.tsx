import { Navigate, useNavigate } from "react-router-dom";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { useAuth } from "../context/AuthContext";
import BasicInfoCard from "../components/profile/BasicInfoCard";
import ContactCard from "../components/profile/ContactCard";
import AccountActivityCard from "../components/profile/AccountActivityCard";
import GenderCard from "../components/profile/GenderCard";
import DateOfBirthCard from "../components/profile/DateOfBirthCard";
import ChangePasswordCard from "../components/profile/ChangePasswordCard";
import LanguagesCard from "../components/profile/LanguagesCard";

export default function Profile() {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.name || user?.email || "";
  const initial = displayName?.charAt(0)?.toUpperCase() ?? "?";

  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-light-100 px-[20px]">
      <ResponsiveNavbar />

      <main className="w-full py-[20px] sm:py-[30px] space-y-[16px] sm:space-y-[24px] [@media(min-width:950px)]:max-w-[900px] [@media(min-width:950px)]:mx-auto [@media(min-width:950px)]:px-[25px]">
        {/* Page heading */}
        <header className="flex flex-col gap-[4px]">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-gray-500">
            Your space
          </p>
          <h1 className="text-[clamp(22px,5vw,32px)] font-bold text-logo-heading">
            Your Profile
          </h1>
          <p className="text-[12px] sm:text-[13px] text-light-text max-w-[520px]">
            Manage your personal details and keep your account information up to
            date.
          </p>
        </header>

        {/* Hero / header */}
        <section className="bg-gradient-to-r from-[hsl(194,27%,21%)] to-[hsl(187,73%,24%)] rounded-[16px] sm:rounded-[20px] p-[16px] sm:p-[28px] text-light-100 shadow-[inset_0px_1px_5px_hsla(0,0%,100%,0.4)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[16px] sm:gap-[20px]">
          <div className="flex items-center gap-[12px] sm:gap-[16px] shadow-m-profile rounded-[30px] sm:rounded-[25px] p-[12px] sm:p-[18px]">
            <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-full bg-light-100/10 border border-light-100/40 flex items-center justify-center text-[22px] sm:text-[26px] font-semibold overflow-hidden flex-shrink-0">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                initial
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.12em] opacity-80">
                Account
              </p>
              <h1 className="text-[clamp(16px,3.5vw,24px)] font-semibold leading-tight truncate">
                {displayName}
              </h1>
              <p className="text-[11px] sm:text-xs opacity-80 break-all">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="self-start shadow-m-profile sm:self-auto w-full sm:w-auto cursor-pointer border border-light-100/10 text-light-100 rounded-full px-[18px] py-[10px] sm:py-[8px] text-sm font-medium hover:bg-light-100 hover:text-[hsl(187,73%,16%)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
          >
            Logout
          </button>
        </section>

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
