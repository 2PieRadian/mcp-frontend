import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsOfUse() {
  return (
    <>
      <Helmet>
        <title>Terms of Use | MindCurePath</title>
        <meta
          name="description"
          content="Understand the terms of use for MindCurePath's platform, including acceptable use policies and user responsibilities."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-[#0b1220] via-[#0f1d32] to-[#0a1528] py-16 sm:py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Terms of Use
            </h1>
            <p className="mt-4 text-base text-slate-300 sm:text-lg md:text-xl max-w-2xl mx-auto">
              Guidelines for using MindCurePath's platform and services.
            </p>
            <p className="mt-4 text-sm text-slate-400">
              Last updated: January 10, 2026
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            <div className="prose prose-slate max-w-none">
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl mb-4">
                  1. Welcome to MindCurePath
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Thank you for choosing MindCurePath. These Terms of Use govern your access to and use of our website, 
                  mobile applications, and all related services (collectively, "the Platform"). By using our Platform, 
                  you acknowledge that you have read, understood, and agree to be bound by these terms.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  If you are using the Platform on behalf of an organization, you represent that you have the authority 
                  to bind that organization to these Terms of Use.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl mb-4">
                  2. Eligibility
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  To use MindCurePath, you must:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Be at least 13 years of age (or the minimum age in your jurisdiction)</li>
                  <li>Have the legal capacity to enter into a binding agreement</li>
                  <li>Not be prohibited from using the Platform under applicable laws</li>
                  <li>Not have been previously suspended or removed from our Platform</li>
                </ul>
                <p className="text-slate-600 leading-relaxed mt-4">
                  If you are under 18, you may only use the Platform with the involvement of a parent or guardian.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl mb-4">
                  3. Acceptable Use Policy
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  You agree to use MindCurePath only for lawful purposes and in accordance with these Terms. 
                  Specifically, you agree NOT to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Use the Platform in any way that violates any applicable law or regulation</li>
                  <li>Engage in any conduct that restricts or inhibits anyone's use of the Platform</li>
                  <li>Use the Platform for commercial purposes without our express written consent</li>
                  <li>Transmit any advertising or promotional material without authorization</li>
                  <li>Impersonate or attempt to impersonate MindCurePath, an employee, or another user</li>
                  <li>Upload or transmit viruses, malware, or other malicious code</li>
                  <li>Attempt to gain unauthorized access to any part of the Platform</li>
                  <li>Use any robot, spider, or other automated device to access the Platform</li>
                  <li>Engage in any activity that could disable or overburden the Platform</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl mb-4">
                  4. User-Generated Content
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  You may submit content to the Platform, including assessment responses, profile information, 
                  and communications with experts. By submitting content, you:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Grant MindCurePath a non-exclusive, royalty-free license to use, store, and display your content</li>
                  <li>Represent that you own or have rights to the content you submit</li>
                  <li>Agree not to submit content that is illegal, harmful, or infringes on others' rights</li>
                  <li>Understand that we may remove content that violates these Terms</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl mb-4">
                  5. Assessment Results and Recommendations
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-blue-800 font-medium">Please Read Carefully</p>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The assessments and recommendations provided by MindCurePath are:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li><strong>For informational purposes only:</strong> They do not constitute professional advice</li>
                  <li><strong>Based on self-reported data:</strong> Accuracy depends on the information you provide</li>
                  <li><strong>Not a substitute for professional services:</strong> Always consult qualified professionals for important decisions</li>
                  <li><strong>Subject to limitations:</strong> No assessment can fully capture the complexity of human experiences</li>
                </ul>
                <p className="text-slate-600 leading-relaxed mt-4">
                  You acknowledge that you are solely responsible for how you use the information provided by our assessments.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl mb-4">
                  6. Account Security
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  You are responsible for maintaining the confidentiality of your account credentials. Best practices include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Using a strong, unique password for your account</li>
                  <li>Not sharing your login credentials with anyone</li>
                  <li>Logging out of shared or public devices after use</li>
                  <li>Enabling two-factor authentication when available</li>
                  <li>Notifying us immediately if you suspect unauthorized access</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl mb-4">
                  7. Third-Party Links and Services
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The Platform may contain links to third-party websites or services. Please note:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>We do not control or endorse third-party content</li>
                  <li>Accessing third-party sites is at your own risk</li>
                  <li>Third-party services have their own terms and privacy policies</li>
                  <li>We are not responsible for any harm resulting from third-party interactions</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl mb-4">
                  8. Platform Modifications
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  We reserve the right to modify, suspend, or discontinue any aspect of the Platform at any time, 
                  with or without notice. This includes adding or removing features, changing the user interface, 
                  or updating our assessment methodologies. We will not be liable to you or any third party for 
                  any such modifications.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl mb-4">
                  9. Feedback and Suggestions
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  We welcome your feedback! If you provide suggestions, ideas, or other feedback about our Platform, 
                  you grant us the right to use this feedback without restriction or compensation. Any feedback you 
                  provide becomes our property, and we may use it to improve our services.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl mb-4">
                  10. Dispute Resolution
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  In the event of any dispute arising from these Terms of Use:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>We encourage you to first contact us directly to seek a resolution</li>
                  <li>If informal resolution fails, disputes shall be resolved through binding arbitration</li>
                  <li>You agree to waive any right to participate in class action lawsuits</li>
                  <li>Small claims court remains an option for qualifying disputes</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl mb-4">
                  11. Changes to These Terms
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  We may revise these Terms of Use from time to time. When we make significant changes, 
                  we will notify you by posting a notice on our Platform or sending an email to the address 
                  associated with your account. Your continued use of the Platform after changes are posted 
                  constitutes your acceptance of the revised Terms.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl mb-4">
                  12. Contact Us
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  If you have any questions about these Terms of Use, please reach out to us:
                </p>
                <div className="mt-4 p-4 bg-slate-100 rounded-lg">
                  <p className="text-slate-700"><strong>Email:</strong> support@mindcurepath.com</p>
                  <p className="text-slate-700 mt-2"><strong>Website:</strong> mindcurepath.com</p>
                  <p className="text-slate-700 mt-2"><strong>Address:</strong> MindCurePath, India</p>
                </div>
              </section>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

