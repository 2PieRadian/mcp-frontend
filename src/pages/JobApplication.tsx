import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useSearchParams } from "react-router-dom";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import Footer from "../components/Footer";
import {
  ApiHttpError,
  type ApiFieldError,
  EXPERT_APPLICATION_MAX_FILE_SIZE_BYTES,
  EXPERT_APPLICATION_PHONE_PATTERN,
  type ExpertApplicationFormValues,
  submitExpertApplication,
} from "../lib/api";

type FormErrors = Partial<Record<keyof ExpertApplicationFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimToMaxLength(value: string, maxLength: number): string {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function validateExpertApplication(
  values: ExpertApplicationFormValues,
): FormErrors {
  const errors: FormErrors = {};
  const fullName = values.fullName.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const expertise = values.expertise.trim();
  const experience = values.experience.trim();
  const resume = values.resume;

  if (!fullName) {
    errors.fullName = "Full name is required.";
  } else if (fullName.length > 120) {
    errors.fullName = "Full name must be 120 characters or fewer.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (email.length > 254) {
    errors.email = "Email must be 254 characters or fewer.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (phone.length < 7 || phone.length > 20) {
    errors.phone = "Phone number must be between 7 and 20 characters.";
  } else if (!EXPERT_APPLICATION_PHONE_PATTERN.test(phone)) {
    errors.phone =
      "Phone number can only include digits, spaces, +, (, ), and -.";
  }

  if (!expertise) {
    errors.expertise = "Area of expertise is required.";
  } else if (expertise.length > 150) {
    errors.expertise = "Area of expertise must be 150 characters or fewer.";
  }

  if (!experience) {
    errors.experience = "Experience summary is required.";
  } else if (experience.length > 2000) {
    errors.experience = "Experience summary must be 2000 characters or fewer.";
  }

  if (!resume) {
    errors.resume = "Resume PDF file is required.";
  } else if (resume.type !== "application/pdf") {
    errors.resume = "Only PDF resume files are allowed.";
  } else if (resume.size > EXPERT_APPLICATION_MAX_FILE_SIZE_BYTES) {
    errors.resume = "Resume file size must not exceed 5MB.";
  }

  return errors;
}

function mapApiFieldErrors(
  fieldErrors: ApiFieldError[] | undefined,
): FormErrors {
  const next: FormErrors = {};

  for (const error of fieldErrors ?? []) {
    const field = error.field as keyof ExpertApplicationFormValues;
    if (
      field in next ||
      !(
        field in
        {
          fullName: true,
          email: true,
          phone: true,
          expertise: true,
          experience: true,
          resume: true,
        }
      )
    ) {
      continue;
    }

    next[field] = error.message;
  }

  return next;
}

function fieldClassName(error?: string): string {
  return `w-full rounded-xl border px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
    error
      ? "border-rose-300 bg-rose-50/70 focus:border-rose-400 focus:ring-rose-200"
      : "border-slate-300 focus:border-emerald-400 focus:ring-emerald-400"
  }`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-sm text-rose-600">{message}</p>;
}

export default function JobApplication() {
  const [searchParams] = useSearchParams();
  const selectedRole = useMemo(
    () => searchParams.get("role")?.trim() || "Selected Job Role",
    [searchParams],
  );
  const previousSelectedRoleRef = useRef(selectedRole);

  const [formData, setFormData] = useState<ExpertApplicationFormValues>({
    fullName: "",
    email: "",
    phone: "",
    expertise:
      selectedRole === "Selected Job Role"
        ? ""
        : trimToMaxLength(selectedRole, 150),
    experience: "",
    resume: null,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const previousRole = previousSelectedRoleRef.current;
    const nextExpertise =
      selectedRole === "Selected Job Role"
        ? ""
        : trimToMaxLength(selectedRole, 150);

    setFormData((prev) => {
      const expertiseMatchesPreviousRole =
        prev.expertise.trim() === "" ||
        prev.expertise === previousRole ||
        prev.expertise === trimToMaxLength(previousRole, 150);

      if (!expertiseMatchesPreviousRole) {
        return prev;
      }

      return {
        ...prev,
        expertise: nextExpertise,
      };
    });

    previousSelectedRoleRef.current = selectedRole;
  }, [selectedRole]);

  const handleInputChange =
    (field: keyof ExpertApplicationFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const maxLengthByField: Partial<
        Record<keyof ExpertApplicationFormValues, number>
      > = {
        fullName: 120,
        email: 254,
        phone: 20,
        expertise: 150,
        experience: 2000,
      };
      const maxLength = maxLengthByField[field];
      const nextValue =
        typeof maxLength === "number"
          ? trimToMaxLength(event.target.value, maxLength)
          : event.target.value;

      setFormData((prev) => ({
        ...prev,
        [field]: nextValue,
      }));
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
      setSubmitError("");
    };

  const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, resume: file }));
    setFormErrors((prev) => ({ ...prev, resume: undefined }));
    setSubmitError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateExpertApplication(formData);

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setSubmitError("Please fix the highlighted fields and try again.");
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});
    setSubmitError("");

    try {
      const result = await submitExpertApplication(formData);
      setSuccessMessage(result.message);
      setIsSubmitted(true);
    } catch (error) {
      if (error instanceof ApiHttpError) {
        const body =
          error.body && typeof error.body === "object"
            ? (error.body as { errors?: ApiFieldError[] })
            : undefined;
        setFormErrors(mapApiFieldErrors(body?.errors));
        setSubmitError(error.message);
      } else if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Failed to submit expert application");
      }
    } finally {
      setIsSubmitting(false);
    }
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
              Expert Application
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              Apply as a MindCurePath Expert
            </h1>
            <p className="mt-4 text-emerald-50 max-w-2xl">
              Share your profile, highlight your experience, and upload your
              resume in PDF format. We will review your application and reach
              out if there is a fit.
            </p>
          </div>

          <div className="p-6 sm:p-10">
            {isSubmitted ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                <h2 className="text-2xl font-semibold text-emerald-900 mb-2">
                  Application Submitted
                </h2>
                <p className="text-emerald-800">
                  {successMessage ||
                    `Thank you for applying as a ${formData.expertise.trim() || selectedRole}. We have received your details.`}
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
                {submitError ? (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {submitError}
                  </div>
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="expertise"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Area of Expertise
                    </label>
                    <input
                      id="expertise"
                      type="text"
                      required
                      value={formData.expertise}
                      onChange={handleInputChange("expertise")}
                      placeholder="Enter your area of expertise"
                      className={fieldClassName(formErrors.expertise)}
                    />
                    <p className="mt-2 text-xs text-slate-500">
                      {formData.expertise.length} / 150
                    </p>
                    <FieldError message={formErrors.expertise} />
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
                      onChange={handleInputChange("fullName")}
                      placeholder="Enter your full name"
                      className={fieldClassName(formErrors.fullName)}
                    />
                    <p className="mt-2 text-xs text-slate-500">
                      {formData.fullName.length} / 120
                    </p>
                    <FieldError message={formErrors.fullName} />
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
                      onChange={handleInputChange("email")}
                      placeholder="Enter your email"
                      className={fieldClassName(formErrors.email)}
                    />
                    <p className="mt-2 text-xs text-slate-500">
                      {formData.email.length} / 254
                    </p>
                    <FieldError message={formErrors.email} />
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
                      onChange={handleInputChange("phone")}
                      placeholder="Enter your phone number"
                      className={fieldClassName(formErrors.phone)}
                    />
                    <p className="mt-2 text-xs text-slate-500">
                      {formData.phone.length} / 20
                    </p>
                    <FieldError message={formErrors.phone} />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Experience Summary
                    </label>
                    <textarea
                      id="experience"
                      required
                      rows={6}
                      value={formData.experience}
                      onChange={handleInputChange("experience")}
                      placeholder="Summarize your relevant experience, certifications, and the kind of clients or learners you support."
                      className={`${fieldClassName(formErrors.experience)} resize-y`}
                    />
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="text-xs text-slate-500">
                        Tell us about your work, outcomes, and specializations.
                      </p>
                      <p className="text-xs text-slate-500">
                        {formData.experience.length} / 2000
                      </p>
                    </div>
                    <FieldError message={formErrors.experience} />
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
                      className={`block w-full cursor-pointer rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
                        formErrors.resume
                          ? "border-rose-300 bg-rose-50 hover:bg-rose-100/60"
                          : "border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50"
                      }`}
                    >
                      <span className="block text-slate-900 font-medium">
                        {formData.resume
                          ? formData.resume.name
                          : "Click to upload your resume"}
                      </span>
                      <span className="mt-1 block text-sm text-slate-600">
                        PDF only, up to 5MB
                      </span>
                      {formData.resume ? (
                        <span className="mt-1 block text-xs text-slate-500">
                          {formatFileSize(formData.resume.size)}
                        </span>
                      ) : null}
                    </label>
                    <input
                      id="resume"
                      type="file"
                      required
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={handleResumeChange}
                    />
                    <FieldError message={formErrors.resume} />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-emerald-700 text-white px-6 py-3 font-semibold hover:bg-emerald-800 transition-colors disabled:cursor-not-allowed disabled:bg-emerald-400"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
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
