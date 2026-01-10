import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Clock, MessageCircle, HelpCircle, Shield, Heart } from "lucide-react";

export default function ContactUs() {
  return (
    <>
      <Helmet>
        <title>Contact Us | MindCurePath</title>
        <meta
          name="description"
          content="Get in touch with MindCurePath. We're here to help you 24/7 with any questions about our wellness, education, and finance assessment services."
        />
      </Helmet>

      <div className="px-[20px]">
        <Navbar />
      </div>

      <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-[#0b1220] via-[#0f1d32] to-[#0a1528] py-16 sm:py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl tracking-tight">
              Contact Us
            </h1>
            <p className="mt-4 text-base text-slate-300 sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We're here to help you on your journey
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            {/* Main Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-12">
              <div className="bg-linear-to-r from-primary/5 to-teal-50 p-8 sm:p-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
                  Get in Touch
                </h2>
                <p className="text-slate-600 text-lg max-w-xl mx-auto mb-6">
                  Have questions, feedback, or need assistance? We'd love to hear from you. 
                  Our dedicated support team is available around the clock to help you.
                </p>
                <a
                  href="mailto:support@mindcurepath.com"
                  className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  support@mindcurepath.com
                </a>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid gap-6 sm:grid-cols-2 mb-12">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      Available 24/7
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Our inbox is always open. Whether it's day or night, feel free to 
                      reach out whenever you need assistance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      Quick Response
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      We typically respond within 24-48 hours. Our team works diligently 
                      to address your queries as promptly as possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What We Can Help With */}
            <div className="bg-slate-50 rounded-2xl p-8 sm:p-10 mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center">
                What Can We Help You With?
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white rounded-xl p-5 border border-slate-200">
                  <HelpCircle className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-2">General Inquiries</h3>
                  <p className="text-slate-600 text-sm">
                    Questions about our platform, assessments, or how MindCurePath works.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200">
                  <Shield className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-2">Account & Privacy</h3>
                  <p className="text-slate-600 text-sm">
                    Help with your account, data privacy concerns, or security-related queries.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200">
                  <Heart className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-2">Expert Connections</h3>
                  <p className="text-slate-600 text-sm">
                    Assistance with finding the right expert or booking consultations.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-center space-y-6">
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <p className="text-amber-800 text-sm sm:text-base">
                  <strong>Please Note:</strong> For urgent mental health concerns or emergencies, 
                  please contact your local emergency services or call the National Mental Health 
                  Helpline at <strong>1800-599-0019</strong> (India).
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-slate-600">
                  We value every message we receive and are committed to providing you with 
                  the best possible support experience.
                </p>
                <p className="text-slate-500 text-sm">
                  MindCurePath Consultancy Private Limited
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

