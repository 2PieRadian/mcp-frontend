import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "./GoogleButton";
import FloatingLabelInput from "./FloatingLabelInput";
import PrimaryButton from "./PrimaryButton";
import FormFooterLink from "./FormFooterLink";
import AuthImage from "./AuthImage";
import { BACKEND_URL, getAvatarUrl } from "../lib/api";
import { ArrowLeft, Mail, Phone, Shield, User, Check, Pencil, X, AlertCircle } from "lucide-react";

type SignupStep = "email" | "emailOtp" | "phone" | "phoneOtp" | "details";

const STEPS: SignupStep[] = ["email", "emailOtp", "phone", "phoneOtp", "details"];

export default function SignupForm() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Step management
  const [currentStep, setCurrentStep] = useState<SignupStep>("email");
  
  // Form fields
  const [email, setEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  
  // Verification status
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Toast visibility states
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const currentStepIndex = STEPS.indexOf(currentStep);

  // Auto-dismiss success toast after 3 seconds
  useEffect(() => {
    if (successMessage) {
      setShowSuccessToast(true);
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
        setTimeout(() => setSuccessMessage(null), 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Auto-dismiss error toast after 5 seconds
  useEffect(() => {
    if (error) {
      setShowErrorToast(true);
      const timer = setTimeout(() => {
        setShowErrorToast(false);
        setTimeout(() => setError(null), 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const goBack = () => {
    setError(null);
    if (currentStep === "emailOtp") setCurrentStep("email");
    else if (currentStep === "phone") setCurrentStep("emailOtp");
    else if (currentStep === "phoneOtp") setCurrentStep("phone");
    else if (currentStep === "details") setCurrentStep("phoneOtp");
  };

  // Step 1: Send Email OTP
  const handleSendEmailOtp = async () => {
    setError(null);
    
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    try {
      // First check if email already exists
      const checkResponse = await fetch(`${BACKEND_URL}/api/v1/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const checkData = await checkResponse.json();
      
      if (!checkResponse.ok) {
        throw new Error(checkData?.message || "Failed to check email");
      }
      
      if (checkData.exists) {
        setError("Email is already registered, please login");
        setIsLoading(false);
        return;
      }
      
      // Email doesn't exist, proceed to send OTP
      const response = await fetch(`${BACKEND_URL}/api/v1/email/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data?.message || "Failed to send OTP");
      }
      
      setSuccessMessage("OTP sent to your email");
      setCurrentStep("emailOtp");
    } catch (err: any) {
      setError(err?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify Email OTP
  const handleVerifyEmailOtp = async () => {
    setError(null);
    
    if (!emailOtp || emailOtp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/email/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: emailOtp }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data?.message || "Invalid OTP");
      }
      
      setEmailVerified(true);
      setSuccessMessage("Email verified successfully!");
      setCurrentStep("phone");
    } catch (err: any) {
      setError(err?.message || "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Send Phone OTP
  const handleSendPhoneOtp = async () => {
    setError(null);
    
    // Basic E.164 validation
    const phoneRegex = /^\+[1-9]\d{6,14}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      setError("Please enter a valid phone number in E.164 format (e.g., +919876543210)");
      return;
    }
    
    setIsLoading(true);
    try {
      // First check if phone already exists
      const checkResponse = await fetch(`${BACKEND_URL}/api/v1/check-phone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });
      
      const checkData = await checkResponse.json();
      
      if (!checkResponse.ok) {
        throw new Error(checkData?.message || "Failed to check phone number");
      }
      
      if (checkData.exists) {
        setError("Phone number is already registered, please login");
        setIsLoading(false);
        return;
      }
      
      // Phone doesn't exist, proceed to send OTP
      const response = await fetch(`${BACKEND_URL}/api/v1/sms/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data?.message || "Failed to send OTP");
      }
      
      setSuccessMessage("OTP sent to your phone");
      setCurrentStep("phoneOtp");
    } catch (err: any) {
      setError(err?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 4: Verify Phone OTP
  const handleVerifyPhoneOtp = async () => {
    setError(null);
    
    if (!phoneOtp || phoneOtp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/sms/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp: phoneOtp }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data?.message || "Invalid OTP");
      }
      
      setPhoneVerified(true);
      setSuccessMessage("Phone verified successfully!");
      setCurrentStep("details");
    } catch (err: any) {
      setError(err?.message || "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 5: Create Account
  const handleCreateAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!emailVerified || !phoneVerified) {
      setError("Please complete email and phone verification first");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          phoneNumber,
          name: fullName || undefined,
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
        hasPassword: true,
      });

      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP handlers
  const handleResendEmailOtp = async () => {
    setEmailOtp("");
    await handleSendEmailOtp();
  };

  const handleResendPhoneOtp = async () => {
    setPhoneOtp("");
    setCurrentStep("phone");
    await handleSendPhoneOtp();
  };

  // Step indicator component
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {STEPS.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;
        return (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                isCompleted
                  ? "bg-green-500 text-white"
                  : isCurrent
                  ? "bg-[#44666C] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`w-6 sm:w-10 h-1 mx-1 rounded ${
                  isCompleted ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  // Get step title and icon
  const getStepInfo = () => {
    switch (currentStep) {
      case "email":
        return { title: "Verify Your Email", icon: Mail, subtitle: "We'll send you a verification code" };
      case "emailOtp":
        return { title: "Enter Email OTP", icon: Shield, subtitle: `Enter the 6-digit code sent to ${email}` };
      case "phone":
        return { title: "Verify Your Phone", icon: Phone, subtitle: "We'll send you an SMS verification code" };
      case "phoneOtp":
        return { title: "Enter Phone OTP", icon: Shield, subtitle: `Enter the 6-digit code sent to ${phoneNumber}` };
      case "details":
        return { title: "Complete Your Profile", icon: User, subtitle: "Almost there! Set up your account" };
    }
  };

  const stepInfo = getStepInfo();
  const StepIcon = stepInfo.icon;

  return (
    <div className="login-form flex justify-between items-start gap-[20px] [@media(max-width:959px)]:mt-0 [@media(min-width:960px)]:mt-[20px] rounded-lg flex-1 [@media(max-width:959px)]:items-center">
      <div className="flex-1 rounded-lg border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center [@media(max-width:959px)]:min-h-[400px]">
        <div className="rounded-lg w-full max-w-[500px] px-[24px] py-[32px] [@media(min-width:960px)]:px-[clamp(1.5rem,4vw,3rem)] [@media(min-width:960px)]:py-[clamp(1.5rem,4vw,3rem)]">
          
          {/* Back button for non-first steps */}
          {currentStep !== "email" && (
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>
          )}

          {/* Step Indicator */}
          <StepIndicator />

          {/* Step Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#E0ECEE] rounded-full flex items-center justify-center">
              <StepIcon className="w-8 h-8 text-[#44666C]" />
            </div>
            <h2 className="text-[clamp(22px,4vw,26px)] font-bold text-logo-heading">
              {stepInfo.title}
            </h2>
            <p className="text-[14px] font-light text-light-text mt-2">
              {stepInfo.subtitle}
            </p>
          </div>

          {/* Success Toast */}
          {successMessage && (
            <div 
              className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-3 transition-all duration-300 ${
                showSuccessToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              <div className="bg-white/20 rounded-full p-1">
                <Check className="w-4 h-4" />
              </div>
              {successMessage}
              <button
                onClick={() => {
                  setShowSuccessToast(false);
                  setTimeout(() => setSuccessMessage(null), 300);
                }}
                className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Error Toast */}
          {error && (
            <div 
              className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-3 transition-all duration-300 ${
                showErrorToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              <div className="bg-white/20 rounded-full p-1">
                <AlertCircle className="w-4 h-4" />
              </div>
              {error}
              <button
                onClick={() => {
                  setShowErrorToast(false);
                  setTimeout(() => setError(null), 300);
                }}
                className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 1: Email Input */}
          {currentStep === "email" && (
            <div className="space-y-4">
              <FloatingLabelInput
                type="email"
                label={t("email")}
                variant="with-border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <PrimaryButton
                onClick={handleSendEmailOtp}
                isLoading={isLoading}
                loadingText="Sending OTP..."
              >
                Send Verification Code
              </PrimaryButton>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

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
            </div>
          )}

          {/* Step 2: Email OTP Verification */}
          {currentStep === "emailOtp" && (
            <div className="space-y-4">
              {/* Email display with edit option */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                <span>OTP sent to <span className="font-medium text-gray-800">{email}</span></span>
                <button
                  onClick={() => {
                    setEmailOtp("");
                    setError(null);
                    setCurrentStep("email");
                  }}
                  className="flex items-center gap-1 text-[#44666C] hover:underline cursor-pointer"
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
              </div>
              <FloatingLabelInput
                type="text"
                label="6-Digit OTP"
                variant="with-border"
                value={emailOtp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setEmailOtp(val);
                }}
                required
                maxLength={6}
              />
              <PrimaryButton
                onClick={handleVerifyEmailOtp}
                isLoading={isLoading}
                loadingText="Verifying..."
              >
                Verify Email
              </PrimaryButton>
              <p className="text-center text-sm text-gray-500">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResendEmailOtp}
                  disabled={isLoading}
                  className="text-[#44666C] font-medium hover:underline cursor-pointer disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </p>
            </div>
          )}

          {/* Step 3: Phone Input */}
          {currentStep === "phone" && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm flex items-center gap-2">
                <Check className="w-4 h-4" />
                Email verified: {email}
              </div>
              <FloatingLabelInput
                type="tel"
                label="Phone Number (e.g., +919876543210)"
                variant="with-border"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <PrimaryButton
                onClick={handleSendPhoneOtp}
                isLoading={isLoading}
                loadingText="Sending OTP..."
              >
                Send Verification Code
              </PrimaryButton>
            </div>
          )}

          {/* Step 4: Phone OTP Verification */}
          {currentStep === "phoneOtp" && (
            <div className="space-y-4">
              {/* Phone number display with edit option */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                <span>OTP sent to <span className="font-medium text-gray-800">{phoneNumber}</span></span>
                <button
                  onClick={() => {
                    setPhoneOtp("");
                    setError(null);
                    setCurrentStep("phone");
                  }}
                  className="flex items-center gap-1 text-[#44666C] hover:underline cursor-pointer"
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
              </div>
              <FloatingLabelInput
                type="text"
                label="6-Digit OTP"
                variant="with-border"
                value={phoneOtp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setPhoneOtp(val);
                }}
                required
                maxLength={6}
              />
              <PrimaryButton
                onClick={handleVerifyPhoneOtp}
                isLoading={isLoading}
                loadingText="Verifying..."
              >
                Verify Phone
              </PrimaryButton>
              <p className="text-center text-sm text-gray-500">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResendPhoneOtp}
                  disabled={isLoading}
                  className="text-[#44666C] font-medium hover:underline cursor-pointer disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </p>
            </div>
          )}

          {/* Step 5: Complete Profile */}
          {currentStep === "details" && (
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div className="space-y-2 mb-4">
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Email verified: {email}
                </div>
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Phone verified: {phoneNumber}
                </div>
              </div>
              
              <FloatingLabelInput
                type="text"
                label={t("fullName")}
                variant="with-border"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <FloatingLabelInput
                type="password"
                label={t("password")}
                variant="with-border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <PrimaryButton isLoading={isLoading} loadingText="Creating Account...">
                {t("createAccount")}
              </PrimaryButton>
            </form>
          )}
        </div>
      </div>

      <AuthImage altTextKey="createAccount" objectPosition="0% 50%" />
    </div>
  );
}
