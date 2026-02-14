import { useState, useEffect } from "react";
import { BACKEND_URL } from "../lib/api";
import { X, Mail, Phone, Shield, Lock, Check, AlertCircle, Pencil } from "lucide-react";
import FloatingLabelInput from "./FloatingLabelInput";
import PhoneInput from "./PhoneInput";
import PrimaryButton from "./PrimaryButton";

type ForgotPasswordStep = "method" | "otp" | "newPassword" | "success";
type ResetMethod = "email" | "phone";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>("method");
  const [resetMethod, setResetMethod] = useState<ResetMethod>("email");

  // Form fields
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");

  // Loading and message states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep("method");
      setResetMethod("email");
      setEmail("");
      setCountryCode("+91");
      setPhoneNumber("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setResetToken("");
      setError(null);
      setSuccessMessage(null);
    }
  }, [isOpen]);

  // Auto-dismiss success toast
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

  // Auto-dismiss error toast
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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Build full E.164 phone number
  const fullPhoneNumber = `${countryCode}${phoneNumber}`;

  // Step 1: Request Password Reset (Send OTP)
  const handleSendOtp = async () => {
    setError(null);

    if (resetMethod === "email") {
      if (!email || !email.includes("@")) {
        setError("Please enter a valid email address");
        return;
      }
    } else {
      if (!phoneNumber || phoneNumber.length < 6) {
        setError("Please enter a valid phone number");
        return;
      }
      const phoneRegex = /^\+[1-9]\d{6,14}$/;
      if (!phoneRegex.test(fullPhoneNumber)) {
        setError("Please enter a valid phone number");
        return;
      }
    }

    setIsLoading(true);
    try {
      const body = resetMethod === "email" ? { email } : { phoneNumber: fullPhoneNumber };

      const response = await fetch(`${BACKEND_URL}/api/v1/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to send OTP");
      }

      setSuccessMessage(data.message || "OTP sent successfully");
      setCurrentStep("otp");
    } catch (err: any) {
      setError(err?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    setError(null);

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const body = resetMethod === "email"
        ? { email, otp }
        : { phoneNumber: fullPhoneNumber, otp };

      const response = await fetch(`${BACKEND_URL}/api/v1/verify-forgot-password-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Invalid OTP");
      }

      setResetToken(data.resetToken);
      setSuccessMessage("OTP verified successfully");
      setCurrentStep("newPassword");
    } catch (err: any) {
      setError(err?.message || "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    setError(null);

    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to reset password");
      }

      setCurrentStep("success");
    } catch (err: any) {
      setError(err?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setOtp("");
    await handleSendOtp();
  };

  // Edit contact info
  const handleEditContact = () => {
    setOtp("");
    setError(null);
    setCurrentStep("method");
  };

  const getStepInfo = () => {
    switch (currentStep) {
      case "method":
        return {
          title: "Reset Password",
          subtitle: "Enter your email or phone number to receive a verification code"
        };
      case "otp":
        return {
          title: "Enter Verification Code",
          subtitle: ""
        };
      case "newPassword":
        return {
          title: "Create New Password",
          subtitle: "Enter your new password below"
        };
      case "success":
        return {
          title: "Password Reset Successfully",
          subtitle: "You can now login with your new password"
        };
    }
  };

  const stepInfo = getStepInfo();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      {/* Success Toast */}
      {successMessage && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-[60] bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-3 transition-all duration-300 ${showSuccessToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
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
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-[60] bg-red-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-3 transition-all duration-300 ${showErrorToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
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

      {/* Modal */}
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#304048]">{stepInfo.title}</h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {stepInfo.subtitle && (
            <p className="text-gray-500 text-sm mb-6">{stepInfo.subtitle}</p>
          )}

          {/* Step 1: Choose method and enter email/phone */}
          {currentStep === "method" && (
            <div className="space-y-4">
              {/* Method Toggle */}
              <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setResetMethod("email")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${resetMethod === "email"
                    ? "bg-white text-[#44666C] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
                <button
                  onClick={() => setResetMethod("phone")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${resetMethod === "phone"
                    ? "bg-white text-[#44666C] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <Phone className="w-4 h-4" />
                  Phone
                </button>
              </div>

              {/* Input Field */}
              {resetMethod === "email" ? (
                <FloatingLabelInput
                  type="email"
                  label="Email Address"
                  variant="with-border"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              ) : (
                <PhoneInput
                  countryCode={countryCode}
                  phoneNumber={phoneNumber}
                  onCountryCodeChange={setCountryCode}
                  onPhoneNumberChange={setPhoneNumber}
                  required
                />
              )}

              <PrimaryButton
                onClick={handleSendOtp}
                isLoading={isLoading}
                loadingText="Sending OTP..."
              >
                Send Verification Code
              </PrimaryButton>
            </div>
          )}

          {/* Step 2: Enter OTP */}
          {currentStep === "otp" && (
            <div className="space-y-4">
              {/* Contact display with edit option */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                <span>
                  OTP sent to{" "}
                  <span className="font-medium text-gray-800">
                    {resetMethod === "email" ? email : fullPhoneNumber}
                  </span>
                </span>
                <button
                  onClick={handleEditContact}
                  className="flex items-center gap-1 text-[#44666C] hover:underline cursor-pointer"
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
              </div>

              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#E0ECEE] rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-[#44666C]" />
                </div>
              </div>

              <FloatingLabelInput
                type="text"
                label="6-Digit OTP"
                variant="with-border"
                value={otp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtp(val);
                }}
                required
                maxLength={6}
              />

              <PrimaryButton
                onClick={handleVerifyOtp}
                isLoading={isLoading}
                loadingText="Verifying..."
              >
                Verify OTP
              </PrimaryButton>

              <p className="text-center text-sm text-gray-500">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="text-[#44666C] font-medium hover:underline cursor-pointer disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </p>
            </div>
          )}

          {/* Step 3: New Password */}
          {currentStep === "newPassword" && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#E0ECEE] rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-[#44666C]" />
                </div>
              </div>

              <FloatingLabelInput
                type="password"
                label="New Password"
                variant="with-border"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              <FloatingLabelInput
                type="password"
                label="Confirm New Password"
                variant="with-border"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <PrimaryButton
                onClick={handleResetPassword}
                isLoading={isLoading}
                loadingText="Resetting Password..."
              >
                Reset Password
              </PrimaryButton>
            </div>
          )}

          {/* Step 4: Success */}
          {currentStep === "success" && (
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-green-500" />
                </div>
              </div>

              <p className="text-gray-600">
                Your password has been reset successfully. You can now login with your new password.
              </p>

              <PrimaryButton onClick={onClose}>
                Back to Login
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
