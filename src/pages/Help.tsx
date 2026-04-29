import { useState } from "react";
import { ChevronDown, ChevronUp, Mail, MessageSquare, Phone } from "lucide-react";

const faqs = [
  {
    category: "General",
    questions: [
      { q: "What is SmartReceipt?", a: "SmartReceipt is an AI-powered receipt and invoice generator designed for freelancers and small businesses to automate their billing processes." },
      { q: "Is there a free plan?", a: "Yes! Our Free plan allows you to generate a limited number of receipts per month with our standard watermark." }
    ]
  },
  {
    category: "Security",
    questions: [
      { q: "How secure is my data?", a: "We use Firebase for secure data storage and authentication. All financial data is encrypted and handled according to industry standards." },
      { q: "Can I delete my account?", a: "Absolutely. You can delete your account and all associated data from your dashboard settings at any time." }
    ]
  },
  {
    category: "Payments",
    questions: [
      { q: "Do you offer refunds?", a: "We offer a 14-day money-back guarantee for our Pro and Business plans if you are not satisfied with the service." }
    ]
  }
];

export function Help() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 py-20 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 text-center">Help Center</h1>
        <p className="text-slate-600 text-center mb-16 text-lg">Everything you need to know about SmartReceipt.</p>

        <div className="space-y-12 mb-20">
          {faqs.map((group, gIdx) => (
            <div key={gIdx}>
              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b pb-2">{group.category}</h2>
              <div className="space-y-4">
                {group.questions.map((faq, qIdx) => {
                  const id = `${gIdx}-${qIdx}`;
                  const isOpen = openIndex === id;
                  return (
                    <div key={qIdx} className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-sm">
                      <button 
                        onClick={() => setOpenIndex(isOpen ? null : id)}
                        className="w-full p-4 flex items-center justify-between text-left font-semibold hover:bg-slate-50 transition-colors"
                      >
                        {faq.q}
                        {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                      </button>
                      {isOpen && (
                        <div className="p-4 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/30">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <section className="bg-blue-600 rounded-3xl p-10 text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Our support team is here to help you 24/7. Reach out via any of the channels below.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center gap-3">
              <Mail className="w-8 h-8" />
              <div className="text-sm font-bold">Email</div>
              <div className="text-xs text-blue-100">support@smartreceipt.ai</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center gap-3">
              <MessageSquare className="w-8 h-8" />
              <div className="text-sm font-bold">Live Chat</div>
              <div className="text-xs text-blue-100">Average response: 5m</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center gap-3">
              <Phone className="w-8 h-8" />
              <div className="text-sm font-bold">Call Us</div>
              <div className="text-xs text-blue-100">+1 (555) 000-0000</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

