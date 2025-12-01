import LoginForm from "../components/LoginForm";
import AuthNavbar from "../components/AuthNavbar";

export default function Login() {
  return (
    <div className="login-page max-w-[1350px] mx-auto px-[25px] h-[calc(100svh-76px)] flex flex-col">
      <AuthNavbar />

      <LoginForm />
    </div>
  );
}
