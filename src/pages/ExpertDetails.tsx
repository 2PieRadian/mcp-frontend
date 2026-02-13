import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Star,
  ArrowLeft,
  Calendar,
  Award,
  Languages,
  FileText,
} from "lucide-react";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import BookingModal from "../components/BookingModal";
import ImageViewer from "../components/ImageViewer";
import type { ApiExpert } from "../types/experts";
import { getAvatarUrl } from "../lib/api";
import useScrollToTop from "../hooks/useScrollToTop";

export default function ExpertDetails() {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Get expert data from navigation state (passed via props)
  const expert = location.state?.expert as ApiExpert | undefined;

  if (!expert) {
    return (
      <div className="min-h-screen bg-white px-4 sm:px-5">
        <ResponsiveNavbar />
        <div className="max-w-6xl mx-auto py-6 sm:py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#44666C] hover:text-[#365a62] mb-6 transition-colors cursor-pointer"
            style={{ fontSize: '16px' }}
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            <span>Go Back</span>
          </button>
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
            <p className="text-red-600 mb-2" style={{ fontSize: 'clamp(16px, 1rem, 20.8px)' }}>Expert not found</p>
            <p className="text-gray-600" style={{ fontSize: '16px' }}>
              Please navigate from an expert card to view their profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const formattedName = expert.user.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const formattedTitle =
    expert.professionalTitle.charAt(0).toUpperCase() +
    expert.professionalTitle.slice(1);

  const formattedLanguages = expert.user.languages
    .map((lang) => lang.charAt(0).toUpperCase() + lang.slice(1))
    .join(", ");

  return (
    <div className="min-h-screen bg-white px-4 sm:px-5">
      <ResponsiveNavbar />
      <div className="max-w-6xl mx-auto py-6 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#44666C] hover:text-[#365a62] mb-4 sm:mb-6 transition-colors cursor-pointer"
          style={{ fontSize: '16px' }}
        >
          <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          <span>Go Back</span>
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
          {/* Header Section - Profile Card */}
          <div className="bg-linear-to-r from-[#44666C] to-[#365a62] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            <div className="relative p-6 sm:p-8 md:p-10 text-white">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                    <ImageViewer
                      src={
                        getAvatarUrl(expert.user.avatar) ||
                        "/images/experts/expert_profile_img.png"
                      }
                      alt={formattedName}
                      className="relative"
                    >
                      <img
                        src={
                          getAvatarUrl(expert.user.avatar) ||
                          "/images/experts/expert_profile_img.png"
                        }
                        alt={formattedName}
                        className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full border-4 border-white object-cover shadow-2xl"
                      />
                    </ImageViewer>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left w-full space-y-4">
                  {/* Name and Title */}
                  <div className="space-y-2">
                    <h1 className="font-bold leading-tight drop-shadow-sm" style={{ fontSize: 'clamp(20.8px, 1.3rem, 27px)' }}>
                      {formattedName}
                    </h1>
                    <p className="opacity-95 font-medium" style={{ fontSize: 'clamp(16px, 1rem, 20.8px)' }}>
                      {formattedTitle}
                    </p>
                  </div>

                  {/* Rating and Experience */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 flex-wrap justify-center md:justify-start">
                    {/* Rating Badge */}
                    <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/30 shadow-lg">
                      <Star
                        size={18}
                        className="fill-yellow-400 text-yellow-400 shrink-0"
                      />
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold" style={{ fontSize: '16px' }}>
                          {expert.rating}
                        </span>
                        <span className="opacity-90" style={{ fontSize: '14px' }}>
                          ({expert.totalReviews} {expert.totalReviews === 1 ? "review" : "reviews"})
                        </span>
                      </div>
                    </div>

                    {/* Experience Badge */}
                    <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/30 shadow-lg">
                      <Award size={18} className="shrink-0" />
                      <span style={{ fontSize: '16px' }}>
                        {expert.yearsOfExperience}+ years of experience
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-5 sm:space-y-6 order-2 lg:order-1">
                {/* Bio */}
                <div>
                  <h2 className="font-semibold text-[#304048] mb-3 sm:mb-4 flex items-center gap-2" style={{ fontSize: 'clamp(16px, 1rem, 20.8px)' }}>
                    <FileText size={20} className="sm:w-6 sm:h-6" />
                    About
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap" style={{ fontSize: '16px' }}>
                    {expert.bio || "No bio available."}
                  </p>
                </div>

                {/* Expertise Areas / Specializations */}
                <div>
                  <h2 className="font-semibold text-[#304048] mb-3 sm:mb-4" style={{ fontSize: 'clamp(16px, 1rem, 20.8px)' }}>
                    Areas of Expertise
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {expert.expertSpecializations &&
                      expert.expertSpecializations.length > 0 ? (
                      expert.expertSpecializations.map((esp, index) => (
                        <span
                          key={index}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#E0ECEE] text-[#133945] rounded-full font-medium"
                          style={{ fontSize: '14px' }}
                        >
                          {esp.specialization.name}
                        </span>
                      ))
                    ) : expert.expertiseAreas &&
                      expert.expertiseAreas.length > 0 ? (
                      expert.expertiseAreas.map((area, index) => (
                        <span
                          key={index}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#E0ECEE] text-[#133945] rounded-full font-medium"
                          style={{ fontSize: '14px' }}
                        >
                          {area.charAt(0).toUpperCase() + area.slice(1)}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500" style={{ fontSize: '16px' }}>
                        No specializations listed
                      </span>
                    )}
                  </div>
                </div>

                {/* Languages and Experience - Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Languages Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <Languages size={20} className="sm:w-6 sm:h-6 text-[#44666C]" />
                      <h3 className="font-semibold text-[#304048]" style={{ fontSize: 'clamp(16px, 1rem, 20.8px)' }}>
                        Languages
                      </h3>
                    </div>
                    <p className="text-gray-700" style={{ fontSize: '16px' }}>{formattedLanguages}</p>
                  </div>

                  {/* Experience Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <Award size={20} className="sm:w-6 sm:h-6 text-[#44666C]" />
                      <h3 className="font-semibold text-[#304048]" style={{ fontSize: 'clamp(16px, 1rem, 20.8px)' }}>
                        Experience
                      </h3>
                    </div>
                    <p className="text-gray-700 font-medium" style={{ fontSize: 'clamp(16px, 1rem, 20.8px)' }}>
                      Experience {expert.yearsOfExperience}+ years of experience
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                {/* Price Card */}
                <div className="bg-[#E0ECEE] rounded-lg p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <h3 className="font-semibold text-[#304048]" style={{ fontSize: 'clamp(16px, 1rem, 20.8px)' }}>
                      Pricing
                    </h3>
                  </div>
                  <div className="font-bold text-[#44666C] mb-2" style={{ fontSize: 'clamp(20.8px, 1.3rem, 27px)' }}>
                    ₹{expert.pricePerHour}
                  </div>
                  <p className="text-gray-600" style={{ fontSize: '14px' }}>1 hour consultation</p>
                </div>

                {/* Book Appointment Button */}
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full bg-[#44666C] hover:bg-[#365a62] active:bg-[#2d4d54] text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 sm:hover:-translate-y-1 cursor-pointer"
                  style={{ fontSize: '16px' }}
                >
                  <Calendar size={18} className="sm:w-5 sm:h-5" />
                  <span>Book an Appointment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {expert && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          expertId={expert.id}
          expertName={formattedName}
          expertPrice={expert.pricePerHour}
        />
      )}
    </div>
  );
}
