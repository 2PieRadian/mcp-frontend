import AuthNavbar from "../components/AuthNavbar";
import SignupForm from "../components/SignupForm";

export default function Signup() {
  return (
    <div className="signup-page max-w-[1350px] mx-auto px-[25px] flex flex-col mb-[70px]">
      <AuthNavbar />

      <SignupForm />
    </div>
  );
}
