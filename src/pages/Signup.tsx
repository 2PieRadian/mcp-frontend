import AuthNavbar from "../components/AuthNavbar";
import SignupForm from "../components/SignupForm";
import useScrollToTop from "../hooks/useScrollToTop";

export default function Signup() {
  useScrollToTop();
  return (
    <div className="signup-page max-w-[1350px] mx-auto px-[25px] flex flex-col [@media(max-width:959px)]:min-h-[calc(100svh-76px)]">
      <AuthNavbar />

      <SignupForm />
    </div>
  );
}
