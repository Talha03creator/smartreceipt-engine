import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LayoutDashboard, FileText, Zap, ShieldCheck } from "lucide-react";
import { ReceiptPreview } from "./ReceiptPreview";

interface Feature {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
}

const features: Feature[] = [
  { id: 1, icon: LayoutDashboard, title: "Real-time Dashboard", description: "Get a bird's-eye view of your financials with intuitive, interactive charts and summaries updated instantly.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400" },
  { id: 2, icon: FileText, title: "Smart Invoicing", description: "Create professional invoices in seconds using our intelligent templates that adapt to your brand.", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600&h=400" },
  { id: 3, icon: Zap, title: "Instant Payments", description: "Seamless payment integration allows you to get paid faster and manage follow-ups automatically.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600&h=400" },
  { id: 4, icon: ShieldCheck, title: "Secure Data", description: "Bank-grade encryption ensures your financial data remains safe, compliant, and accessible only to you.", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=600&h=400" }
];

const MOCK_DATA = {
  customerName: "Alex Rivera",
  customerEmail: "alex@example.com",
  customerPhone: "+1 555-0123",
  customerAddress: "742 Evergreen Terrace, Springfield",
  notes: "Standard Net-30 payment terms apply.",
  authorizedBy: "Sarah Jenkins",
  tax: 5,
  discount: 10,
  useCustomReceiptNumber: true,
  customReceiptNumber: "SR-9921-X",
  currency: "USD",
  showQR: true,
  paymentMethod: "card"
};

const MOCK_ITEMS = [
  { description: "Premium SaaS Subscription", quantity: 1, price: 199 },
  { description: "Priority API Access", quantity: 1, price: 49 },
  { description: "Data Backup Service", quantity: 3, price: 10 }
];

export function SaaSFeatureScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        
        {/* Left Side: Text Content */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <FeatureSection 
              key={feature.id} 
              feature={feature} 
              progress={scrollYProgress}
              index={index}
              total={features.length}
            />
          ))}
        </div>

        {/* Right Side: Sticky Mockup */}
        <div className="relative h-full pt-20">
          <motion.div 
            className="sticky top-40 w-full bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden h-fit"
            whileHover={{ y: -10, boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.15)" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-slate-50 p-3 flex items-center gap-2 border-b border-slate-100">
               <div className="flex gap-1.5 ml-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                 <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
               </div>
               <div className="mx-auto bg-white px-4 py-1 rounded-full text-[8px] font-bold text-slate-400 border border-slate-100 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={10} />
                  smartreceipt.io/preview
               </div>
            </div>
            <div className="p-2 origin-top scale-[0.7]">
               <ReceiptPreview 
                 data={MOCK_DATA}
                 items={MOCK_ITEMS}
                 company={{ name: "SmartReceipt AI", address: "One Hacker Way, CA", website: "smartreceipt.io" }}
                 signature={null}
               />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureSection({ feature, progress, index, total }: { key?: any, feature: Feature, progress: any, index: number, total: number }) {
  const opacity = useTransform(
    progress,
    [index / total, (index + 0.2) / total, (index + 0.9) / total],
    [0, 1, 1]
  );
  const y = useTransform(
    progress,
    [index / total, (index + 0.2) / total],
    [50, 0]
  );

  const isActive = useTransform(
    progress,
    [index / total, (index + 0.5) / total],
    [0.5, 1]
  );

  return (
    <motion.div style={{ opacity, y }} className="min-h-[400px] flex flex-row gap-6">
      <div className="flex flex-col items-center">
        <motion.div 
          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4"
          style={{
            backgroundColor: useTransform(isActive, [0.5, 1], ["#ffffff", "#2563eb"]),
            borderColor: useTransform(isActive, [0.5, 1], ["#e2e8f0", "#2563eb"]),
            color: useTransform(isActive, [0.5, 1], ["#64748b", "#ffffff"]),
            boxShadow: useTransform(isActive, [0.5, 1], ["none", "0 0 20px rgba(37, 99, 235, 0.3)"]),
          }}
        >
          {index + 1}
        </motion.div>
        {index < total - 1 && (
          <div className="w-0.5 h-full bg-slate-200 mt-4" />
        )}
      </div>
      <div className="flex-1">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
          <feature.icon className="w-8 h-8" />
        </div>
        <img src={feature.image} alt={feature.title} className="w-full h-64 object-cover rounded-2xl mb-8 shadow-md" />
        <h2 className="text-4xl font-extrabold text-slate-900 mb-6">{feature.title}</h2>
        <p className="text-xl text-slate-600 leading-relaxed max-w-md">{feature.description}</p>
      </div>
    </motion.div>
  );
}
