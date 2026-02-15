import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import ImageViewer from "../components/ImageViewer";
import { lazy, useState, useRef } from "react";
import { AlertTriangle, X, CheckCircle2, XCircle, Eye, Upload } from "lucide-react";
import googleIcon from "../assets/google.svg";
import { useTranslation } from "react-i18next";
import { BACKEND_URL } from "../lib/api";

const BasicInfoCard = lazy(() => import("../components/profile/BasicInfoCard"));
const ContactCard = lazy(() => import("../components/profile/ContactCard"));
const AccountActivityCard = lazy(
  () => import("../components/profile/AccountActivityCard"),
);
const GenderCard = lazy(() => import("../components/profile/GenderCard"));
const AgeCard = lazy(() => import("../components/profile/AgeCard"));
const ChangePasswordCard = lazy(
  () => import("../components/profile/ChangePasswordCard"),
);
const LanguagesCard = lazy(() => import("../components/profile/LanguagesCard"));

export default function Profile() {
  const { user, isLoading, logout, updateUserAvatar } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation("profile");
  const [imageError, setImageError] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayName = user?.name || user?.email || "";
  const initial = displayName?.charAt(0)?.toUpperCase() ?? "?";

  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading || !user) {
    return null;
  }

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageClick = () => {
    setShowProfileImageModal(true);
  };

  const handleViewProfilePicture = () => {
    setShowProfileImageModal(false);
    setShowImageViewer(true);
  };

  const handleUploadNewImage = () => {
    setShowProfileImageModal(false);
    fileInputRef.current?.click();
  };

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type, message: "" });
    }, 4000);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showToast("error", "Please select a valid image file (PNG, JPG, etc.)");
      return;
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast(
        "error",
        "Image size should be less than 5MB. Please choose a smaller file.",
      );
      return;
    }

    setIsUploadingImage(true);

    try {
      const token =
        localStorage.getItem("auth:token") || localStorage.getItem("token");

      if (!token) {
        showToast("error", "Your session has expired. Please log in again.");
        return;
      }

      // Extract file extension from MIME type (e.g., "image/png" -> "png")
      const fileExtension = file.type.split("/")[1];

      // Step 1: Get presigned URL - Updated endpoint
      const presignedResponse = await fetch(
        `${BACKEND_URL}/api/v1/upload/profile-image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id, fileType: fileExtension }),
        },
      );

      if (!presignedResponse.ok) {
        const errorData = await presignedResponse.json().catch(() => ({}));
        if (presignedResponse.status === 401) {
          showToast("error", "Your session has expired. Please log in again.");
          logout();
          navigate("/login");
          return;
        }
        showToast(
          "error",
          errorData.message ||
          "Unable to prepare image upload. Please try again later.",
        );
        return;
      }

      const presignedData = await presignedResponse.json();

      const { uploadURL, fileURL } = presignedData;

      if (!uploadURL || !fileURL) {
        showToast("error", "Something went wrong. Please try again.");
        return;
      }

      // Step 2: Upload image to presigned URL
      const uploadResponse = await fetch(uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        showToast(
          "error",
          "Failed to upload image. Please check your internet connection and try again.",
        );
        return;
      }

      // Step 3: Update database
      const updateResponse = await fetch(
        `${BACKEND_URL}/api/v1/profile/profile-image`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileURL: fileURL }),
        },
      );

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json().catch(() => ({}));
        if (updateResponse.status === 401) {
          showToast("error", "Your session has expired. Please log in again.");
          logout();
          navigate("/login");
          return;
        }
        showToast(
          "error",
          errorData.message || t("profileImageUploadError", { ns: "common" }),
        );
        return;
      }

      // Step 4: Update auth context with the new avatar URL
      updateUserAvatar(fileURL);

      setImageError(false);
      showToast("success", "Profile picture updated successfully! 🎉");
    } catch (error) {
      console.error("Error uploading profile image:", error);
      showToast(
        "error",
        "Unable to upload image. Please check your connection and try again.",
      );
    } finally {
      setIsUploadingImage(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="min-h-screen bg-light-100 px-[16px] sm:px-[20px]">
      <ResponsiveNavbar />

      <main className="w-full py-[20px] sm:py-[30px] space-y-[16px] sm:space-y-[24px] [@media(min-width:950px)]:max-w-[900px] [@media(min-width:950px)]:mx-auto [@media(min-width:950px)]:px-[25px]">
        {/* Page heading */}
        <header className="flex flex-col gap-[4px]">
          <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.24em] text-gray-500">
            {t("page.kicker")}
          </p>
          <h1 className="text-[clamp(28px,5vw,36px)] font-bold text-logo-heading">
            {t("page.title")}
          </h1>
          <p className="text-[16px] sm:text-[17px] text-light-text max-w-[520px]">
            {t("page.subtitle")}
          </p>
        </header>

        {/* Hero / header */}
        <section className="bg-linear-to-r from-[hsl(194,27%,21%)] to-[hsl(187,73%,24%)] rounded-[16px] sm:rounded-[20px] p-[16px] sm:p-[28px] text-light-100 shadow-[inset_0px_1px_5px_hsla(0,0%,100%,0.4)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[16px] sm:gap-[20px]">
          <div className="flex items-center gap-[12px] sm:gap-[16px] shadow-m-profile rounded-[30px] sm:rounded-[25px] py-[12px] sm:py-[18px] px-[12px] sm:pr-[25px]">
            <div className="relative w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] shrink-0">
              <div
                onClick={handleImageClick}
                className="w-full h-full rounded-full bg-light-100/10 border border-light-100/40 flex items-center justify-center text-[22px] sm:text-[26px] font-semibold overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
              >
                {user.avatarUrl && !imageError ? (
                  <img
                    src={user.avatarUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                ) : (
                  initial
                )}
              </div>
              {isUploadingImage && (
                <div className="absolute inset-0 rounded-full bg-black/70 flex items-center justify-center z-10">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.12em] opacity-80">
                {t("hero.accountLabel")}
              </p>
              <h1 className="text-[clamp(16px,3.5vw,26px)] font-semibold leading-tight truncate">
                {displayName}
              </h1>
              <p className="text-[12px] sm:text-[13px] opacity-80 break-all">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[10px] self-start sm:self-auto w-full sm:w-auto">
            {/* Google Connection Status */}
            {user.googleId ? (
              <button
                type="button"
                disabled
                className="flex items-center justify-center gap-[8px] border border-light-100/10 text-light-100/70 rounded-full px-[18px] py-[10px] sm:py-[8px] text-[16px] font-medium shadow-m-profile cursor-default opacity-80"
              >
                <img src={googleIcon} alt="Google" className="w-[20px]" />
                {t("hero.googleConnected")}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  window.location.href = `${BACKEND_URL}/oauth/google?linkTo=${user.id}`;
                }}
                className="flex items-center justify-center gap-[8px] cursor-pointer border border-light-100/10 text-light-100 rounded-full px-[18px] py-[10px] sm:py-[8px] font-medium hover:bg-light-100 hover:text-primary transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] shadow-m-profile"
                style={{ fontSize: "16px" }}
              >
                <img src={googleIcon} alt="Google" className="w-[20px]" />
                {t("hero.connectGoogle")}
              </button>
            )}

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogoutClick}
              className="w-full cursor-pointer border border-light-100/10 text-light-100 rounded-full px-[18px] py-[10px] sm:py-[8px] font-medium hover:bg-light-100 hover:text-primary transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] shadow-m-profile"
              style={{ fontSize: "16px" }}
            >
              {t("hero.logout")}
            </button>
          </div>
        </section>

        {/* Info sections */}
        <section className="grid gap-[14px] sm:gap-[18px] sm:grid-cols-2 mb-[100px]">
          <BasicInfoCard />
          <ContactCard />
          <GenderCard />
          <AgeCard />
          <LanguagesCard />
          <ChangePasswordCard />
          <AccountActivityCard />
        </section>
      </main>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm border ${toast.type === "success"
              ? "bg-green-50/95 border-green-200 text-green-800"
              : "bg-red-50/95 border-red-200 text-red-800"
              } max-w-md`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="text-green-600 shrink-0" size={24} />
            ) : (
              <XCircle className="text-red-600 shrink-0" size={24} />
            )}
            <p className="text-[15px] font-medium leading-snug">
              {toast.message}
            </p>
            <button
              onClick={() => setToast({ ...toast, show: false })}
              className={`ml-2 shrink-0 ${toast.type === "success"
                ? "text-green-600 hover:text-green-800"
                : "text-red-600 hover:text-red-800"
                } transition-colors`}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleCancelLogout}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCancelLogout}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              aria-label={t("logoutModal.closeAria")}
            >
              <X size={24} />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="text-red-500" size={32} />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-[#1a2e35] text-center mb-3">
              {t("logoutModal.title")}
            </h2>

            {/* Description */}
            <p
              className="text-[#5a6c75] text-center mb-6"
              style={{ fontSize: "16px" }}
            >
              {t("logoutModal.description")}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancelLogout}
                className="flex-1 px-6 py-3 rounded-[10px] border hover:scale-102 border-gray-300 text-[#1a2e35] font-medium hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                style={{ fontSize: "16px" }}
              >
                {t("logoutModal.cancel")}
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 px-6 py-3 rounded-[10px] bg-[hsl(0,89%,60%)] text-white hover:scale-102 font-medium hover:bg-[hsl(0,89%,56%)] transition-all duration-200 cursor-pointer"
                style={{ fontSize: "16px" }}
              >
                {t("logoutModal.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Image Options Modal */}
      {showProfileImageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowProfileImageModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowProfileImageModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Title */}
            <h2 className="text-xl font-bold text-[#1a2e35] text-center mb-6">
              Profile Picture
            </h2>

            {/* Options */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleViewProfilePicture}
                disabled={!user.avatarUrl || imageError}
                className="flex items-center gap-3 px-4 py-3 rounded-[10px] border border-gray-300 text-[#1a2e35] font-medium hover:bg-gray-50 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontSize: "16px" }}
              >
                <Eye size={20} />
                <span>View profile picture</span>
              </button>
              <button
                onClick={handleUploadNewImage}
                disabled={isUploadingImage}
                className="flex items-center gap-3 px-4 py-3 rounded-[10px] border border-gray-300 text-[#1a2e35] font-medium hover:bg-gray-50 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontSize: "16px" }}
              >
                <Upload size={20} />
                <span>Upload a new image</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Viewer */}
      {showImageViewer && user.avatarUrl && !imageError && (
        <ImageViewer
          src={user.avatarUrl}
          alt={displayName}
          isOpen={showImageViewer}
          onClose={() => setShowImageViewer(false)}
        />
      )}
    </div>
  );
}
