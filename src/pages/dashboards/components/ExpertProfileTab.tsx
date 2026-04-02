import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FileText, Loader2, Check, AlertCircle } from "lucide-react";
import {
  updateExpertBio,
  EXPERT_BIO_MAX_LENGTH,
  ApiHttpError,
} from "../../../lib/api";

type ExpertProfileTabProps = {
  initialBio: string | null;
  onBioUpdated?: (newBio: string | null) => void;
};

export default function ExpertProfileTab({
  initialBio,
  onBioUpdated,
}: ExpertProfileTabProps) {
  const { t } = useTranslation("common");
  const [bio, setBio] = useState(initialBio ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setBio(initialBio ?? "");
  }, [initialBio]);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const trimmedBio = bio.trim();
      const result = await updateExpertBio(trimmedBio || null);
      setBio(result.expert.bio ?? "");
      onBioUpdated?.(result.expert.bio);
      setIsEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      if (err instanceof ApiHttpError) {
        setError(err.message);
      } else {
        setError(err instanceof Error ? err.message : "Failed to update bio");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setBio(initialBio ?? "");
    setIsEditing(false);
    setError(null);
  };

  const charCount = bio.length;
  const isOverLimit = charCount > EXPERT_BIO_MAX_LENGTH;

  return (
    <section className="bg-[hsl(0,0%,97%)] shadow-m rounded-[16px] sm:rounded-[20px] p-[16px] sm:p-[24px]">
      <div className="flex items-center justify-between gap-[10px] mb-[16px]">
        <div className="flex items-center gap-[10px]">
          <FileText className="text-primary w-6 h-6" />
          <h2 className="text-[20px] sm:text-[24px] font-semibold text-logo-heading">
            {t("expertProfileBioTitle")}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-[14px] py-[8px] rounded-full text-[13px] sm:text-[14px] font-medium bg-primary text-white shadow-sm hover:bg-primary/90 cursor-pointer transition-all duration-200"
            >
              {t("expertProfileEditBio")}
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="px-[14px] py-[8px] rounded-full text-[13px] sm:text-[14px] font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 cursor-pointer transition-all duration-200"
              >
                {t("cancel")}
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving || isOverLimit}
                className="px-[14px] py-[8px] rounded-full text-[13px] sm:text-[14px] font-medium bg-primary text-white shadow-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 flex items-center gap-2"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSaving ? t("saving") : t("save")}
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-[13px] sm:text-[14px] text-light-text mb-[16px]">
        {t("expertProfileBioDescription")}
      </p>

      {error && (
        <div className="mb-[16px] text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-[8px] px-[10px] py-[8px] flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-[16px] text-[13px] text-green-700 bg-green-50 border border-green-100 rounded-[8px] px-[10px] py-[8px] flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{t("expertProfileBioSaved")}</span>
        </div>
      )}

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder={t("expertProfileBioPlaceholder")}
            rows={6}
            className={`w-full px-4 py-3 rounded-xl border ${
              isOverLimit
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-gray-200 focus:border-primary focus:ring-primary/20"
            } focus:ring-2 outline-none resize-y text-[#304048] placeholder-gray-400 text-[14px] sm:text-[15px] leading-relaxed`}
          />
          <div className="flex justify-end">
            <span
              className={`text-xs ${
                isOverLimit ? "text-red-600 font-medium" : "text-gray-500"
              }`}
            >
              {charCount.toLocaleString()} / {EXPERT_BIO_MAX_LENGTH.toLocaleString()}
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
          {bio.trim() ? (
            <p className="text-[#304048] text-[14px] sm:text-[15px] leading-relaxed whitespace-pre-wrap">
              {bio}
            </p>
          ) : (
            <p className="text-gray-400 text-[14px] sm:text-[15px] italic">
              {t("expertProfileNoBio")}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
