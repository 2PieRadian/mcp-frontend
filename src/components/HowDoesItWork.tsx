import { useTranslation } from "react-i18next";
import { LogIn, Search, Calendar, CreditCard } from "lucide-react";

interface StepProps {
  stepNumber: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradientFrom: string;
  gradientTo: string;
  iconBg: string;
}

function Step({
  stepNumber,
  title,
  description,
  icon: Icon,
  gradientFrom,
  gradientTo,
  iconBg,
}: StepProps) {
  return (
    <div className="group relative">
      <div className="relative flex gap-4 md:gap-6 items-start">
        {/* Step number circle with gradient */}
        <div className="relative shrink-0">
          <div
            className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-linear-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <div
              className={`w-9 h-9 md:w-12 md:h-12 rounded-full ${iconBg} flex items-center justify-center`}
            >
              <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
          </div>
          {/* Step number badge */}
          <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-7 md:h-7 rounded-full bg-white border-2 border-[#44666C] flex items-center justify-center shadow-md">
            <span className="text-[10px] md:text-xs font-bold text-[#44666C]">
              {stepNumber}
            </span>
          </div>
        </div>

        {/* Content card */}
        <div className="flex-1 pt-2">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[#44666C]/20 group-hover:-translate-y-1">
            <h3 className="text-xl font-bold text-[#1a2e35] mb-2 group-hover:text-[#44666C] transition-colors">
              {title}
            </h3>
            <p className="text-[#5a6c75] leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowDoesItWork() {
  const { t } = useTranslation("sectors");

  const steps = [
    {
      stepNumber: 1,
      title: t("howDoesItWork.step1.title"),
      description: t("howDoesItWork.step1.description"),
      icon: LogIn,
      gradientFrom: "from-[#187360]",
      gradientTo: "to-[#0d3f33]",
      iconBg: "bg-[#115e4c]",
    },
    {
      stepNumber: 2,
      title: t("howDoesItWork.step2.title"),
      description: t("howDoesItWork.step2.description"),
      icon: Search,
      gradientFrom: "from-[#187360]",
      gradientTo: "to-[#0d3f33]",
      iconBg: "bg-[#115e4c]",
    },
    {
      stepNumber: 3,
      title: t("howDoesItWork.step3.title"),
      description: t("howDoesItWork.step3.description"),
      icon: Calendar,
      gradientFrom: "from-[#187360]",
      gradientTo: "to-[#0d3f33]",
      iconBg: "bg-[#115e4c]",
    },
    {
      stepNumber: 4,
      title: t("howDoesItWork.step4.title"),
      description: t("howDoesItWork.step4.description"),
      icon: CreditCard,
      gradientFrom: "from-[#187360]",
      gradientTo: "to-[#0d3f33]",
      iconBg: "bg-[#115e4c]",
    },
  ];

  return (
    <div className="mt-[80px] mb-[80px] px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-b from-[#f8fafb] via-white to-[#f8fafb] -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <h1 className="text-[clamp(24px,6vw,34px)] md:text-3xl font-bold text-center">
            {t("howDoesItWork.title")}
          </h1>
          <div className="mt-[40px] mb-4 flex justify-center">
            <img
              src="/images/how-does-it-work/how-does-it-work.png"
              alt="How does it work"
              className="max-w-xl w-full h-auto rounded-lg"
            />
          </div>
          <p className="text-[clamp(16px,2vw,17px)] mt-[10px] max-w-[800px] mx-auto text-center text-[#4F5B64]">
            {t("howDoesItWork.subtitle")}
          </p>
        </div>

        {/* Steps Section */}
        <div className="relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl -z-10" />

          {/* 2x2 Grid on large screens, 1 column on smaller screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <Step key={index} {...step} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
