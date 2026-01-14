import { useLocation, useNavigate } from "react-router-dom";
import {
  Star,
  ArrowLeft,
  Calendar,
  DollarSign,
  Award,
  Languages,
  FileText,
} from "lucide-react";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import type { ApiExpert } from "../types/experts";
import { getAvatarUrl } from "../lib/api";
import useScrollToTop from "../hooks/useScrollToTop";

export default function ExpertDetails() {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();

  // Get expert data from navigation state (passed via props)
  const expert = location.state?.expert as ApiExpert | undefined;

  if (!expert) {
    return (
      <div className="min-h-screen bg-gray-50 px-[16px] sm:px-[20px]">
        <ResponsiveNavbar />
        <div className="max-w-6xl mx-auto py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#44666C] hover:text-[#365a62] mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-red-600 text-lg">Expert not found</p>
            <p className="text-gray-600 mt-2">
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
    <div className="min-h-screen bg-gray-50 px-[20px]">
      <ResponsiveNavbar />
      <div className="max-w-6xl mx-auto py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#44666C] hover:text-[#365a62] mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span>Go Back</span>
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#44666C] to-[#365a62] p-8 text-white">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <img
                  src={
                    getAvatarUrl(expert.user.avatar) ||
                    "/images/experts/expert_profile_img.png"
                  }
                  alt={formattedName}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{formattedName}</h1>
                <p className="text-xl opacity-90 mb-4">{formattedTitle}</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Star
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-lg font-semibold">
                      {expert.rating}
                    </span>
                    <span className="text-sm opacity-80">
                      ({expert.totalReviews}{" "}
                      {expert.totalReviews === 1 ? "review" : "reviews"})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={20} />
                    <span>{expert.yearsOfExperience}+ years of experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Bio */}
                <div>
                  <h2 className="text-2xl font-semibold text-[#304048] mb-4 flex items-center gap-2">
                    <FileText size={24} />
                    About
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {expert.bio || "No bio available."}
                  </p>
                </div>

                {/* Expertise Areas / Specializations */}
                <div>
                  <h2 className="text-2xl font-semibold text-[#304048] mb-4">
                    Areas of Expertise
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {expert.expertSpecializations &&
                    expert.expertSpecializations.length > 0 ? (
                      expert.expertSpecializations.map((esp, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-[#E0ECEE] text-[#133945] rounded-full text-sm font-medium"
                        >
                          {esp.specialization.name}
                        </span>
                      ))
                    ) : expert.expertiseAreas &&
                      expert.expertiseAreas.length > 0 ? (
                      expert.expertiseAreas.map((area, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-[#E0ECEE] text-[#133945] rounded-full text-sm font-medium"
                        >
                          {area.charAt(0).toUpperCase() + area.slice(1)}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">
                        No specializations listed
                      </span>
                    )}
                  </div>
                </div>

                {/* Languages and Experience - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Languages Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Languages size={24} className="text-[#44666C]" />
                      <h3 className="text-xl font-semibold text-[#304048]">
                        Languages
                      </h3>
                    </div>
                    <p className="text-gray-700">{formattedLanguages}</p>
                  </div>

                  {/* Experience Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Award size={24} className="text-[#44666C]" />
                      <h3 className="text-xl font-semibold text-[#304048]">
                        Experience
                      </h3>
                    </div>
                    <p className="text-gray-700 text-lg font-medium">
                      {expert.yearsOfExperience}+ years
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Price Card */}
                <div className="bg-[#E0ECEE] rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign size={24} className="text-[#44666C]" />
                    <h3 className="text-xl font-semibold text-[#304048]">
                      Pricing
                    </h3>
                  </div>
                  <div className="text-3xl font-bold text-[#44666C] mb-2">
                    ₹{expert.pricePerHour}
                  </div>
                  <p className="text-gray-600 text-sm">per hour consultation</p>
                </div>

                {/* Book Appointment Button */}
                <button
                  onClick={() => {
                    // TODO: Implement booking functionality
                    alert("Booking functionality coming soon!");
                  }}
                  className="w-full bg-[#44666C] hover:bg-[#365a62] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                >
                  <Calendar size={20} />
                  Book an Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
