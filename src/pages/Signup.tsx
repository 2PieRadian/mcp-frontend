import AuthNavbar from "../components/AuthNavbar";
import SignupForm from "../components/SignupForm";

export default function Signup() {
  return (
    <div className="signup-page max-w-[1350px] mx-auto px-[25px] flex flex-col h-[calc(100svh-76px)] [@media(min-width:960px)]:mb-[70px] [@media(min-width:960px)]:h-auto">
      <AuthNavbar />

      <SignupForm />
    </div>
  );
}
