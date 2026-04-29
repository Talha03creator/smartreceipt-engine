import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b py-6">
        <div className="max-w-4xl mx-auto px-6 flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <FileText className="text-blue-600" />
            <span className="font-bold text-xl">SmartReceipt</span>
          </Link>
          <span className="text-slate-300 mx-4">|</span>
          <span className="text-slate-500 font-medium">Privacy Policy</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="prose prose-slate max-w-none space-y-10">
          <section>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Privacy Policy</h1>
            <p className="text-lg text-slate-600 leading-relaxed">Last updated: April 26, 2026</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">1. Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed">
              We collect information you provide directly to us when you create an account, generate receipts, and use our financial tools. This includes your name, email address, company details, and billing information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">2. How We Use Your Information</h2>
            <p className="text-slate-600 leading-relaxed">
              Your information is used to provide and improve the SmartReceipt services, process payments, and communicate with you about your account. We do not sell your personal data to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">3. Data Security</h2>
            <p className="text-slate-600 leading-relaxed">
              We use industry-standard encryption and security protocols (Firebase Auth and Firestore) to protect your data. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="space-y-4 text-sm text-slate-400 border-t pt-10">
            <p>If you have questions about this policy, please contact us at privacy@smartreceipt.ai</p>
          </section>
        </div>
      </main>
    </div>
  );
}

