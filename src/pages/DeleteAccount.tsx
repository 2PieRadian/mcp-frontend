import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import {
  Trash2,
  AlertTriangle,
  Smartphone,
  Monitor,
  Shield,
  Database,
  UserX,
  FileX,
} from "lucide-react";

export default function DeleteAccount() {
  return (
    <div>
      <ScrollToTopButton />
      <Helmet>
        <title>Account Deletion | MindCurePath</title>
        <meta
          name="description"
          content="Learn how to delete your MindCurePath account, what happens to your data, and our data retention policies."
        />
        <link rel="canonical" href="https://mindcurepath.com/delete-account" />
      </Helmet>

      <div className="px-[16px] sm:px-[20px]">
        <Navbar />
      </div>

      <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-[#0b1220] via-[#0f1d32] to-[#0a1528] py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <Trash2 className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl tracking-tight mb-4">
              Account Deletion Process
            </h1>
            <p className="mt-4 text-base text-slate-300 sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We believe in your right to privacy and control over your data.
              Here is everything you need to know about deleting your
              MindCurePath account.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            {/* Warning Banner */}
            <div className="mb-12 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4 shadow-sm">
              <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-red-800 mb-1">
                  Important Notice
                </h3>
                <p className="text-red-700 leading-relaxed text-sm sm:text-base">
                  Deleting your account is a permanent and irreversible action.
                  Once confirmed, you will lose access to all your appointments,
                  records, self-assessments, and profile data. Please be
                  absolutely sure before proceeding.
                </p>
              </div>
            </div>

            {/* How to Delete */}
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                How to Delete Your Account
              </h2>
              <p className="text-slate-600 mb-8 text-lg">
                Whether you are a User or an Expert, you can securely delete
                your account directly from your profile settings on either our
                website or our mobile app.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Website Instructions */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                    <Monitor className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    From the Website
                  </h3>
                  <ol className="space-y-4 text-slate-600">
                    <li className="flex gap-3">
                      <span className="font-medium text-slate-400">1.</span>
                      <span>
                        Log in to your account at{" "}
                        <span className="font-semibold text-slate-700">
                          mindcurepath.com
                        </span>
                        .
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-medium text-slate-400">2.</span>
                      <span>
                        Navigate to your{" "}
                        <span className="font-semibold text-slate-700">
                          Profile Page
                        </span>{" "}
                        from the navigation menu.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-medium text-slate-400">3.</span>
                      <span>
                        Scroll to the bottom and click on{" "}
                        <span className="text-red-600 font-medium">
                          Delete Account
                        </span>
                        .
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-medium text-slate-400">4.</span>
                      <span>
                        Follow the on-screen prompts to confirm the deletion.
                      </span>
                    </li>
                  </ol>
                </div>

                {/* App Instructions */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6">
                    <Smartphone className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    From the App
                  </h3>
                  <ol className="space-y-4 text-slate-600">
                    <li className="flex gap-3">
                      <span className="font-medium text-slate-400">1.</span>
                      <span>Open the MindCurePath mobile application.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-medium text-slate-400">2.</span>
                      <span>
                        Tap on your{" "}
                        <span className="font-semibold text-slate-700">
                          Profile Tab
                        </span>{" "}
                        located in the bottom bar.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-medium text-slate-400">3.</span>
                      <span>
                        Go to{" "}
                        <span className="font-semibold text-slate-700">
                          Account Settings
                        </span>{" "}
                        and tap{" "}
                        <span className="text-red-600 font-medium">
                          Delete Account
                        </span>
                        .
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-medium text-slate-400">4.</span>
                      <span>Confirm your password/identity when prompted.</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* What Happens to Data */}
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                What Happens to Your Data?
              </h2>

              <div className="space-y-4">
                <div className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row gap-5 items-start">
                  <div className="p-3 bg-red-50 rounded-xl shrink-0">
                    <UserX className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      Immediate Nullification of PII
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      All Personally Identifiable Information (PII) such as your
                      name, email address, phone number, and physical address
                      are permanently deleted and replaced with `null` values
                      across our databases.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row gap-5 items-start">
                  <div className="p-3 bg-slate-100 rounded-xl shrink-0">
                    <Shield className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      Data Anonymization
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Any non-identifying platform usage metrics, assessment
                      scores (without user context), and historical transaction
                      records are strictly anonymized. They are decoupled from
                      your identity and only retained for high-level statistical
                      analysis.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row gap-5 items-start">
                  <div className="p-3 bg-orange-50 rounded-xl shrink-0">
                    <FileX className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      Health & Assessment Records
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      All specific video session logs and personal journal
                      entries shared with experts are immediately purged from
                      our active servers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What Admins See */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-bold">
                  3
                </span>
                What Do Admins See After Deletion?
              </h2>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
                <div className="flex items-start gap-5">
                  <div className="hidden sm:flex p-4 bg-slate-200 rounded-full">
                    <Database className="w-8 h-8 text-slate-700" />
                  </div>
                  <div>
                    <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                      Once an account is deleted, our administrative team loses
                      all ability to view your profile. Here is exactly what is
                      visible on the backend:
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3 text-slate-700">
                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        <span>
                          <strong>User Profile:</strong> Displayed as "Deleted
                          User"
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-slate-700">
                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        <span>
                          <strong>Contact Details:</strong> Marked as `null` /
                          empty
                        </span>
                      </li>
                      <li className="flex items-center gap-3 text-slate-700">
                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        <span>
                          <strong>Financial Records:</strong> De-identified,
                          showing only the transaction hash and amount for legal
                          tax compliance.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
