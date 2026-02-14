import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { BACKEND_URL, updatePhone } from "../../lib/api";
import PhoneInput from "../PhoneInput";
import FloatingLabelInput from "../FloatingLabelInput";
import ProfileButton from "./ProfileButton";
import { Pencil } from "lucide-react";

/** Format E.164 phone with a space between country code and number (e.g. +91 9876543210). */
function formatPhoneWithGap(phone: string | undefined): string {
  if (!phone) return "";
  if (phone.startsWith("+91")) return "+91 " + phone.slice(3);
  return phone.replace(/^(\+\d{1,3})/, "$1 ");
}

type PhoneStep = "phone" | "otp";

export default function ContactCard() {
  const { user, updateUserFromApi } = useAuth();
  const { t } = useTranslation("profile");

  const [expanded, setExpanded] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [step, setStep] = useState<PhoneStep>("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fullPhoneNumber = `${countryCode}${phoneNumber}`;
  const hasPhone = Boolean(user?.phoneNumber?.trim());
  const displayPhone = user?.phoneNumber
    ? formatPhoneWithGap(user.phoneNumber)
    : t("values.notAdded");

  const handleSendOtp = async () => {
    setError(null);
    if (!phoneNumber || phoneNumber.length < 6) {
      setError("Please enter a valid phone number");
      return;
    }
    const phoneRegex = /^\+[1-9]\d{6,14}$/;
    if (!phoneRegex.test(fullPhoneNumber)) {
      setError("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    try {
      // Check if phone number already exists (for another user)
      const checkRes = await fetch(`${BACKEND_URL}/api/v1/check-phone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: fullPhoneNumber }),
      });
      const checkData = await checkRes.json();
      if (!checkRes.ok) {
        throw new Error(checkData?.message || "Failed to check phone number");
      }
      if (checkData.exists) {
        setError("This phone number is already registered to another account");
        setIsLoading(false);
        return;
      }

      // Phone doesn't exist, proceed to send OTP
      const res = await fetch(`${BACKEND_URL}/api/v1/sms/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: fullPhoneNumber }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to send OTP");
      setStep("otp");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndUpdate = async () => {
    setError(null);
    if (!phoneOtp || phoneOtp.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const verifyRes = await fetch(`${BACKEND_URL}/api/v1/sms/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: fullPhoneNumber, otp: phoneOtp }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyData?.message || "Invalid OTP");

      const { user: updatedUser } = await updatePhone(fullPhoneNumber);
      updateUserFromApi(updatedUser);
      setExpanded(false);
      setStep("phone");
      setPhoneNumber("");
      setPhoneOtp("");
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update phone");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCollapse = () => {
    setExpanded(false);
    setStep("phone");
    setPhoneNumber("");
    setPhoneOtp("");
    setError(null);
  };

  return (
    <div className="bg-[hsl(0,0%,97%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px]">
      <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
        {t("sections.contact")}
      </p>
      <div className="space-y-[6px] sm:space-y-[8px] text-[16px] sm:text-[17px] text-light-text">
        <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
          <p className="text-[14px] sm:text-[15px] text-gray-500">
            {t("labels.email")}
          </p>
          <p className="font-medium break-all text-[16px] sm:text-[17px]">
            {user?.email}
          </p>
        </div>
        <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
          <p className="text-[14px] sm:text-[15px] text-gray-500">
            {t("labels.phone")}
          </p>
          <p className="font-medium text-[16px] sm:text-[17px]">
            {displayPhone}
          </p>

          {!expanded && (
            <div className="flex items-center justify-between gap-[8px] mt-[6px]">
              <ProfileButton
                type="button"
                onClick={() => setExpanded(true)}
                variant="secondary"
              >
                {hasPhone ? t("buttons.change") : t("buttons.add")}
              </ProfileButton>
            </div>
          )}

          {expanded && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[14px]">
                  {error}
                </div>
              )}

              {step === "phone" && (
                <>
                  <PhoneInput
                    countryCode={countryCode}
                    phoneNumber={phoneNumber}
                    onCountryCodeChange={setCountryCode}
                    onPhoneNumberChange={setPhoneNumber}
                    required
                  />
                  <div className="flex items-center gap-[8px] sm:gap-[10px] flex-wrap">
                    <ProfileButton
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isLoading}
                      variant="primary"
                    >
                      {isLoading ? "Sending..." : "Send OTP"}
                    </ProfileButton>
                    <ProfileButton
                      type="button"
                      onClick={handleCollapse}
                      variant="secondary"
                    >
                      {t("buttons.cancel")}
                    </ProfileButton>
                  </div>
                </>
              )}

              {step === "otp" && (
                <>
                  <div className="flex items-center gap-2 text-[14px] text-gray-600">
                    <span>
                      OTP sent to{" "}
                      <span className="font-medium text-gray-800">
                        {fullPhoneNumber}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setPhoneOtp("");
                        setError(null);
                        setStep("phone");
                      }}
                      className="flex items-center gap-1 text-[#44666C] hover:underline cursor-pointer text-[14px]"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      {t("buttons.edit")}
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
                  <div className="flex items-center gap-[8px] sm:gap-[10px] flex-wrap">
                    <ProfileButton
                      type="button"
                      onClick={handleVerifyAndUpdate}
                      disabled={isLoading}
                      variant="primary"
                    >
                      {isLoading ? "Verifying..." : "Verify"}
                    </ProfileButton>
                    <ProfileButton
                      type="button"
                      onClick={handleCollapse}
                      variant="secondary"
                    >
                      {t("buttons.cancel")}
                    </ProfileButton>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isLoading}
                      className="text-[14px] text-[#44666C] font-medium hover:underline cursor-pointer disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
