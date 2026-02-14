import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import AuthNavbar from "../components/AuthNavbar";
import useScrollToTop from "../hooks/useScrollToTop";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  useScrollToTop();
  const { user, isLoading } = useAuth();

  if (!isLoading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-page max-w-[1350px] mx-auto px-[25px] [@media(max-width:959px)]:min-h-[calc(100svh-76px)] flex flex-col">
      <AuthNavbar />

      <LoginForm />
    </div>
  );
}
