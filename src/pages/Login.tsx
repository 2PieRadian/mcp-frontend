import LoginForm from "../components/LoginForm";
import AuthNavbar from "../components/AuthNavbar";
import useScrollToTop from "../hooks/useScrollToTop";

export default function Login() {
  useScrollToTop();
  return (
    <div className="login-page max-w-[1350px] mx-auto px-[25px] min-h-[calc(100svh-76px)] flex flex-col">
      <AuthNavbar />

      <LoginForm />
    </div>
  );
}
