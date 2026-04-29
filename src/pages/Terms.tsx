import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b py-6">
        <div className="max-w-4xl mx-auto px-6 flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <FileText className="text-blue-600" />
            <span className="font-bold text-xl">SmartReceipt</span>
          </Link>
          <span className="text-slate-300 mx-4">|</span>
          <span className="text-slate-500 font-medium">Terms of Service</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20 font-sans">
        <div className="space-y-12">
          <section>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Terms of Service</h1>
            <p className="text-lg text-slate-600">Please read these terms carefully before using SmartReceipt.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold">1. Acceptance of Terms</h2>
            <p className="text-slate-600 italic">By accessing or using our service, you agree to be bound by these terms.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold">2. Use of Service</h2>
            <p className="text-slate-600">SmartReceipt provides tools for receipt generation. You are responsible for the accuracy of the data you input and the legality of the receipts you generate.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold">3. Subscription and Fees</h2>
            <p className="text-slate-600">Certain features require a paid subscription. Fees are non-refundable except as required by law or as stated in our Refund Policy.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold">4. Limitation of Liability</h2>
            <p className="text-slate-600">To the maximum extent permitted by law, SmartReceipt shall not be liable for any indirect, incidental, or special damages resulting from your use of the service.</p>
          </section>
        </div>
      </main>
    </div>
  );
}

