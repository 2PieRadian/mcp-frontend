import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { BACKEND_URL } from "../lib/api";
import {
  ArrowRight,
  Heart,
  Users,
  Rocket,
  Laptop,
  GraduationCap,
  Monitor,
} from "lucide-react";

type Role = {
  title: string;
  department: string;
  description: string;
};

export default function Careers() {
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [activeRolesList, setActiveRolesList] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/v1/expert/specializations`)
      .then((res) => res.json())
      .then((data) => {
        if (data.specializations) {
          const fetchedRoles = data.specializations
            .filter((s: { hasVacancies?: boolean; name: string }) => s.hasVacancies !== false)
            .map((s: { name: string; domain?: { name: string }; description?: string }) => ({
              title: s.name,
              department: s.domain?.name || "Other",
              description: s.description || "No description available.",
            }));
          setActiveRolesList(fetchedRoles);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch specializations:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const departmentFilters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const role of activeRolesList) {
      counts.set(role.department, (counts.get(role.department) ?? 0) + 1);
    }
    return [
      { name: "All Departments", count: activeRolesList.length },
      ...Array.from(counts.entries()).map(([name, count]) => ({ name, count })),
    ];
  }, [activeRolesList]);

  const filteredRoles = useMemo(() => {
    if (selectedDepartment === "All Departments") return activeRolesList;
    return activeRolesList.filter(
      (role) => role.department === selectedDepartment,
    );
  }, [selectedDepartment, activeRolesList]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="fixed inset-x-0 top-0 z-40 w-full bg-white border-b border-gray-100 px-6">
        <ResponsiveNavbar />
      </div>

      {/* Hero Section */}
      <main className="mx-auto max-w-[1300px] px-6 pt-[140px] pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          {/* Left Column */}
          <div className="max-w-xl xl:pl-4">
            <h1 className="text-[3.5rem] md:text-[4rem] leading-[1.05] font-extrabold text-[#111827] tracking-tight">
              Your work can <br />
              change lives. <br />
              <span className="text-[#15603A]">
                Let's build the future together.
              </span>
            </h1>
            <p className="mt-6 text-[1.1rem] text-[#4b5563] leading-relaxed max-w-[90%]">
              At MindCurePath, we combine technology, empathy, and expertise to
              create trusted solutions that make a real difference in people's
              lives.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#open-roles"
                className="bg-[#15603A] hover:bg-[#104b2c] text-white px-7 py-3.5 rounded-[12px] font-semibold flex items-center gap-2 transition-colors shadow-sm"
              >
                Explore Open Roles <ArrowRight size={18} strokeWidth={2.5} />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex items-center gap-2 text-[#4b5563] text-sm font-semibold">
                <Heart size={18} className="text-[#15603A]" strokeWidth={2.5} />
                <span>Purpose Driven</span>
              </div>
              <div className="flex items-center gap-2 text-[#4b5563] text-sm font-semibold">
                <Users size={18} className="text-[#15603A]" strokeWidth={2.5} />
                <span>People First</span>
              </div>
              <div className="flex items-center gap-2 text-[#4b5563] text-sm font-semibold">
                <Rocket
                  size={18}
                  className="text-[#15603A]"
                  strokeWidth={2.5}
                />
                <span>Continuous Growth</span>
              </div>
              <div className="flex items-center gap-2 text-[#4b5563] text-sm font-semibold">
                <Laptop
                  size={18}
                  className="text-[#15603A]"
                  strokeWidth={2.5}
                />
                <span>Remote Friendly</span>
              </div>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="hidden lg:flex relative h-[650px] w-full mt-10 lg:mt-0 justify-end">
            <div className="absolute top-0 right-[-100px] bottom-0 w-[120%] lg:w-[130%] rounded-l-[300px] overflow-hidden bg-gray-100 z-0">
              <img
                src="/team_working.png"
                alt="Team working"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-10 left-0 lg:left-[-20px] bg-white rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-w-[340px] border border-gray-50 z-10">
              <div className="text-[#15603A] mb-4">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>
              <p className="text-[#374151] text-[1.05rem] leading-relaxed font-medium mb-5">
                I love that my work here directly contributes to helping people
                make better decisions.
              </p>
              <p className="text-[#6b7280] text-sm font-semibold">
                — Team Member
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Legacy Roles Section - Kept so functionality is not lost */}
      <section
        id="open-roles"
        className="max-w-[1300px] mx-auto px-6 mt-10 mb-20 bg-[#f9fafb] p-8 rounded-3xl border border-gray-100"
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-[#111827]">Open Roles</h2>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {departmentFilters.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setSelectedDepartment(item.name)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                selectedDepartment === item.name
                  ? "bg-[#15603A] text-white"
                  : "bg-white text-slate-700 hover:bg-[#eefcf2] hover:text-[#15603A] border border-gray-200"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRoles.map((role) => (
            <div
              key={role.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-slate-900">
                    {role.title}
                  </h3>
                  <span className="rounded-full bg-[#eefcf2] px-3 py-1 text-xs font-bold text-[#15603A]">
                    {role.department}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-600 mb-6">
                  {role.description}
                </p>
              </div>
              <Link
                to={`/careers/apply?role=${encodeURIComponent(role.title)}`}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-white border-2 border-[#15603A] px-6 py-2.5 text-sm font-bold text-[#15603A] transition-colors hover:bg-[#15603A] hover:text-white"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Why Join Section */}
      <section className="max-w-[1300px] mx-auto px-6 mt-28 mb-32">
        <h2 className="text-[2.2rem] font-bold text-center text-[#111827] mb-16">
          Why Join <span className="text-[#15603A]">MindCurePath?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 divide-y-2 lg:divide-y-0 lg:divide-x-[1.5px] divide-gray-200/60">
          {/* Item 1 */}
          <div className="px-6 py-8 lg:py-0 lg:px-8 text-center flex flex-col items-center">
            <div className="w-[60px] h-[60px] bg-[#eefcf2] rounded-full flex items-center justify-center mb-5">
              <Users className="w-7 h-7 text-[#15603A]" strokeWidth={2} />
            </div>
            <h3 className="text-[1.1rem] font-bold text-[#111827] mb-3">
              Meaningful Impact
            </h3>
            <p className="text-[#6b7280] text-[0.95rem] leading-[1.6]">
              Work on products that positively impact millions of lives.
            </p>
          </div>

          {/* Item 2 */}
          <div className="px-6 py-8 lg:py-0 lg:px-8 text-center flex flex-col items-center">
            <div className="w-[60px] h-[60px] bg-[#eefcf2] rounded-full flex items-center justify-center mb-5">
              <Rocket className="w-7 h-7 text-[#15603A]" strokeWidth={2} />
            </div>
            <h3 className="text-[1.1rem] font-bold text-[#111827] mb-3">
              Real Ownership
            </h3>
            <p className="text-[#6b7280] text-[0.95rem] leading-[1.6]">
              Take ownership, share ideas, and see your work create real value.
            </p>
          </div>

          {/* Item 3 */}
          <div className="px-6 py-8 lg:py-0 lg:px-8 text-center flex flex-col items-center">
            <div className="w-[60px] h-[60px] bg-[#eefcf2] rounded-full flex items-center justify-center mb-5">
              <GraduationCap
                className="w-7 h-7 text-[#15603A]"
                strokeWidth={2}
              />
            </div>
            <h3 className="text-[1.1rem] font-bold text-[#111827] mb-3">
              Grow Together
            </h3>
            <p className="text-[#6b7280] text-[0.95rem] leading-[1.6]">
              Learn, upskill and grow with mentors and a culture that supports
              you.
            </p>
          </div>

          {/* Item 4 */}
          <div className="px-6 py-8 lg:py-0 lg:px-8 text-center flex flex-col items-center">
            <div className="w-[60px] h-[60px] bg-[#eefcf2] rounded-full flex items-center justify-center mb-5">
              <Monitor className="w-7 h-7 text-[#15603A]" strokeWidth={2} />
            </div>
            <h3 className="text-[1.1rem] font-bold text-[#111827] mb-3">
              Flexible & Remote
            </h3>
            <p className="text-[#6b7280] text-[0.95rem] leading-[1.6]">
              Work from anywhere with flexible hours and a healthy work-life
              balance.
            </p>
          </div>

          {/* Item 5 */}
          <div className="px-6 py-8 lg:py-0 lg:px-8 text-center flex flex-col items-center">
            <div className="w-[60px] h-[60px] bg-[#eefcf2] rounded-full flex items-center justify-center mb-5">
              <Heart className="w-7 h-7 text-[#15603A]" strokeWidth={2} />
            </div>
            <h3 className="text-[1.1rem] font-bold text-[#111827] mb-3">
              Inclusive Culture
            </h3>
            <p className="text-[#6b7280] text-[0.95rem] leading-[1.6]">
              We celebrate diversity and believe in an inclusive, respectful
              workplace.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
