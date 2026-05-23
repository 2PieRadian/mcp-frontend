import { type FormEvent, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import Footer from "../components/Footer";

export default function JobApplication() {
  const [searchParams] = useSearchParams();
  const selectedRole = useMemo(
    () => searchParams.get("role") || "Selected Job Role",
    [searchParams],
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [resumeFileName, setResumeFileName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#F4FCF8] via-white to-[#F8FAFC]">
      <div className="fixed inset-x-0 top-0 z-40 w-full bg-white px-[16px] sm:px-[20px] border-b border-emerald-100">
        <ResponsiveNavbar />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-20">
        <div className="rounded-3xl border border-emerald-100 bg-white/90 shadow-[0_24px_50px_-30px_rgba(15,90,78,0.45)] overflow-hidden">
          <div className="bg-linear-to-r from-emerald-700 via-teal-700 to-cyan-700 px-6 sm:px-10 py-10 text-white">
            <p className="text-sm sm:text-base text-emerald-100 mb-3">
              Careers Application
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              Apply for {selectedRole}
            </h1>
            <p className="mt-4 text-emerald-50 max-w-2xl">
              Fill in your details and upload your resume. Our recruitment team
              will review your profile and get in touch.
            </p>
          </div>

          <div className="p-6 sm:p-10">
            {isSubmitted ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                <h2 className="text-2xl font-semibold text-emerald-900 mb-2">
                  Application Submitted
                </h2>
                <p className="text-emerald-800">
                  Thank you for applying to the {selectedRole} role. We have
                  received your details.
                </p>
                <div className="mt-6">
                  <Link
                    to="/careers"
                    className="inline-block rounded-xl bg-emerald-700 text-white px-5 py-3 font-medium hover:bg-emerald-800 transition-colors"
                  >
                    Back to Careers
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Job Role
                    </label>
                    <input
                      type="text"
                      value={selectedRole}
                      readOnly
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }))
                      }
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="Enter your phone number"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="resume"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Resume Upload
                    </label>
                    <label
                      htmlFor="resume"
                      className="block w-full cursor-pointer rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 px-4 py-8 text-center hover:bg-emerald-50 transition-colors"
                    >
                      <span className="block text-emerald-900 font-medium">
                        {resumeFileName || "Click to upload your resume"}
                      </span>
                      <span className="mt-1 block text-sm text-emerald-700">
                        PDF, DOC, or DOCX (max 10MB)
                      </span>
                    </label>
                    <input
                      id="resume"
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) =>
                        setResumeFileName(e.target.files?.[0]?.name || "")
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-700 text-white px-6 py-3 font-semibold hover:bg-emerald-800 transition-colors"
                  >
                    Submit Application
                  </button>
                  <Link
                    to="/careers"
                    className="rounded-xl border border-slate-300 text-slate-700 px-6 py-3 font-semibold hover:bg-slate-50 transition-colors text-center"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
