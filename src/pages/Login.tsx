import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import AuthNavbar from "../components/AuthNavbar";
import { useAuth } from "../context/AuthContext";
import { getReturnPathFromLoginLocation } from "../lib/loginRedirect";

export default function Login() {
  const { user, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const returnTo = getReturnPathFromLoginLocation(
    searchParams,
    location.state,
    "/",
  );

  if (!isLoading && user) {
    return <Navigate to={returnTo} replace />;
  }

  return (
    <div className="login-page max-w-[1350px] mx-auto px-[25px] [@media(max-width:959px)]:min-h-[calc(100svh-76px)] flex flex-col">
      <AuthNavbar />

      <LoginForm returnTo={returnTo} />
    </div>
  );
}
