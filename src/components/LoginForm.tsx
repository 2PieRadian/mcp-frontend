import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "./GoogleButton";
import FloatingLabelInput from "./FloatingLabelInput";
import PrimaryButton from "./PrimaryButton";
import ErrorMessage from "./ErrorMessage";
import FormFooterLink from "./FormFooterLink";
import AuthImage from "./AuthImage";
import { BACKEND_URL, getAvatarUrl } from "../lib/api";

export default function LoginForm() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    setError(null);

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to login");
      }

      const { user, token } = data;

      if (token) {
        window.localStorage.setItem("auth:token", token);
      }

      // Map backend user shape to AuthUser
      const avatarValue = user.avatar || user.avatarUrl;
      console.log("LoginForm - Raw avatar value from backend:", avatarValue);

      login({
        id: String(user.id),
        email: user.email,
        name: user.name,
        avatarUrl: getAvatarUrl(avatarValue),
        phoneNumber: user.phoneNumber,
        role: user.role,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        languages: user.languages,
        createdAt: user.createdAt,
        hasPassword: true, // Regular login users have passwords
      });

      navigate("/");
    } catch (error: any) {
      console.error(error);
      setError(error?.message || "Failed to login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-form flex justify-between gap-[20px] mt-[20px] rounded-lg flex-1">
      <AuthImage altTextKey="login" objectPosition="0% 50%" />

      <div className="flex-1 rounded-lg border-0 [@media(min-width:960px)]:border-2 [@media(min-width:960px)]:border-border-light flex items-center justify-center">
        <div className="rounded-lg w-full max-w-[500px] p-0 [@media(min-width:960px)]:p-[clamp(1.5rem,4vw,3rem)]">
          <h2 className="text-[clamp(24px,5vw,30px)] font-bold text-logo-heading">
            {t("welcomeBack")}
          </h2>
          <p className="text-[clamp(13px,2vw,15px)] font-light text-light-text">
            {t("transformMentalHealthJourney")}
          </p>

          <form className="mt-[30px]" onSubmit={handleLogin} noValidate={false}>
            <div className="inputs flex flex-col gap-[15px]">
              <FloatingLabelInput
                type="email"
                label={t("emailOrPhone")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <FloatingLabelInput
                type="password"
                label={t("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <p className="text-[clamp(13px,2vw,15px)] font-semibold text-light-text text-right mt-[10px]">
              {t("forgotPassword")}
            </p>

            <ErrorMessage message={error} />

            <PrimaryButton isLoading={isSubmitting} loadingText="Loading">
              {t("login")}
            </PrimaryButton>

            <GoogleButton
              onClick={() => {
                window.location.href = `${BACKEND_URL}/oauth/google`;
              }}
            />

            <FormFooterLink
              questionKey="dontHaveAccount"
              linkTextKey="signUpItsFree"
              linkTo="/signup"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
