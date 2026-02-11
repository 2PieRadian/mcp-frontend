import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "./GoogleButton";
import FloatingLabelInput from "./FloatingLabelInput";
import PrimaryButton from "./PrimaryButton";
import ErrorMessage from "./ErrorMessage";
import FormFooterLink from "./FormFooterLink";
import AuthImage from "./AuthImage";
import { BACKEND_URL, getAvatarUrl } from "../lib/api";

export default function SignupForm() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!email || !password || !phoneNumber) {
      setError("All fields are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          phoneNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to sign up");
      }

      const { user, token } = data;

      if (token) {
        window.localStorage.setItem("auth:token", token);
      }

      // Map backend user shape to AuthUser
      const avatarValue = user.avatar || user.avatarUrl;

      login({
        id: user.id != null ? String(user.id) : undefined,
        expertId:
          typeof user.expert?.id === "number"
            ? user.expert.id
            : user.expertId != null
              ? Number(user.expertId)
              : undefined,
        email: user.email,
        name: fullName || user.name || undefined,
        avatarUrl: getAvatarUrl(avatarValue),
        phoneNumber: user.phoneNumber,
        role: user.role,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        languages: user.languages,
        createdAt: user.createdAt,
        hasPassword: true, // Signup users have passwords
      });

      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to sign up");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-form flex justify-between items-start gap-[20px] [@media(max-width:959px)]:mt-0 [@media(min-width:960px)]:mt-[20px] rounded-lg flex-1 [@media(max-width:959px)]:items-center">
      <div className="flex-1 rounded-lg border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center [@media(max-width:959px)]:min-h-[400px]">
        <div className="rounded-lg w-full max-w-[500px] px-[24px] py-[32px] [@media(min-width:960px)]:px-[clamp(1.5rem,4vw,3rem)] [@media(min-width:960px)]:py-[clamp(1.5rem,4vw,3rem)]">
          <h2 className="text-[clamp(28px,5vw,30px)] font-bold text-logo-heading">
            {t("createAccount")}
          </h2>
          <p className="text-[16px] font-light text-light-text mt-[8px]">
            {t("startHealingJourney")}
          </p>

          <form className="mt-[28px]" onSubmit={handleSignup}>
            <div className="inputs flex flex-col gap-[15px]">
              <FloatingLabelInput
                type="text"
                label={t("fullName")}
                variant="with-border"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <FloatingLabelInput
                type="email"
                label={t("email")}
                variant="with-border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FloatingLabelInput
                type="password"
                label={t("password")}
                variant="with-border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FloatingLabelInput
                type="tel"
                label={t("phoneNo")}
                variant="with-border"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <p className="text-[clamp(13px,2vw,15px)] font-semibold text-light-text text-right mt-[10px]">
              {t("forgotPassword")}
            </p>

            <ErrorMessage message={error} />

            <PrimaryButton isLoading={isSubmitting} loadingText="Loading">
              {t("createAccount")}
            </PrimaryButton>

            <GoogleButton
              onClick={() => {
                window.location.href = `${BACKEND_URL}/oauth/google`;
              }}
            />

            <FormFooterLink
              questionKey="alreadyHaveAccount"
              linkTextKey="login"
              linkTo="/login"
            />
          </form>
        </div>
      </div>

      <AuthImage altTextKey="createAccount" objectPosition="0% 50%" />
    </div>
  );
}
