import React from 'react';
import { motion } from 'motion/react';
import { Check, Palette, Sparkles, Zap, Minimize2, Laptop, Tablet, Smartphone } from 'lucide-react';
import { useTemplate, TemplateId } from '../context/TemplateContext';
import { ModernTemplate } from '../components/templates/ModernTemplate';
import { MinimalTemplate } from '../components/templates/MinimalTemplate';
import { GlassTemplate } from '../components/templates/GlassTemplate';
import { DarkTemplate } from '../components/templates/DarkTemplate';
import { FutureTemplate } from '../components/templates/FutureTemplate';

const MOCK_DATA = {
  customReceiptNumber: "SR-SAMPLE-2024",
  customerName: "Alex Rivera",
  customerEmail: "alex@example.com",
  customerAddress: "45 Innovation Way, Silicon Valley, CA 94043",
  paymentMethod: "Credit Card (Visa ****4421)",
  tax: 8.5,
  discount: 10,
  showQR: true,
  currency: 'USD'
};

const MOCK_ITEMS = [
  { description: "Product Design Service", quantity: 1, price: 1200 },
  { description: "API Integration Module", quantity: 2, price: 450 }
];

const MOCK_COMPANY = {
  name: "SmartReceipt Engine",
  email: "billing@smartreceipt.io",
  address: "Digital Nomad Headquarters, Earth",
  website: "smartreceipt.io"
};

const templates = [
  {
    id: 'dark' as TemplateId,
    name: 'New Premium',
    description: 'Deep midnight aesthetic with vibrant indigo glows and expert precision.',
    icon: <Zap className="text-indigo-400" />,
    type: 'Dark / High Contrast',
    Component: DarkTemplate
  },
  {
    id: 'modern' as TemplateId,
    name: 'Clean Studio',
    description: 'Ultra-clean professional layout with bold typography and focused clarity.',
    icon: <Laptop className="text-blue-500" />,
    type: 'Corporate / Startup',
    Component: ModernTemplate
  },
  {
    id: 'minimal' as TemplateId,
    name: 'Swiss Type',
    description: 'Timeless elegance using premium serif typography and expansive breathing room.',
    icon: <Minimize2 className="text-slate-400" />,
    type: 'Classic / Minimal',
    Component: MinimalTemplate
  },
  {
    id: 'glass' as TemplateId,
    name: 'Glass',
    description: 'Contemporary glass-morphism with frosted surfaces and dynamic gradients.',
    icon: <Sparkles className="text-purple-400" />,
    type: 'Creative / Tech',
    Component: GlassTemplate
  },
  {
    id: 'future' as TemplateId,
    name: 'Future',
    description: 'Cyber-tech interface featuring scanlines, digital stamps, and data grids.',
    icon: <Smartphone className="text-cyan-400" />,
    type: 'Cyber / Sci-Fi',
    Component: FutureTemplate
  }
];

export function TemplatesPage() {
  const { selectedTemplate, setSelectedTemplate } = useTemplate();

  return (
    <div className="min-h-screen bg-white pt-12 pb-20 px-4">
      <div className="max-w-[1400px] mx-auto space-y-10">
        <header className="text-center space-y-3">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-indigo-100"
          >
            <Palette size={12} />
            Professional Gallery
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter"
          >
            Select Your <span className="text-indigo-600">Template</span>
          </motion.h1>
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm">
            Quickly switch between high-conversion layouts. Optimized for clarity and elegance.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {templates.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedTemplate(template.id)}
              className={`group relative cursor-pointer rounded-2xl bg-white border transition-all duration-200 overflow-hidden flex flex-col h-full ${
                selectedTemplate === template.id 
                  ? 'border-indigo-600 ring-2 ring-indigo-600/10 shadow-lg scale-[1.02]' 
                  : 'border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              {/* Selection Ripple */}
              {selectedTemplate === template.id && (
                <div className="absolute inset-0 bg-indigo-600/[0.02] pointer-events-none" />
              )}

              {/* REAL VISUAL PREVIEW - High DPI Thumbnail - Adjusted scale and aspect to fill gap */}
              <div className="relative w-full aspect-[4/4] bg-slate-50 overflow-hidden border-b border-slate-100 flex items-center justify-center">
                 <div className="w-full h-full relative">
                    <div className="absolute top-0 left-0 w-[200%] origin-top-left scale-[0.5] pointer-events-none">
                        <div className="w-full shadow-lg min-h-[500px] bg-white">
                          <template.Component 
                            data={MOCK_DATA}
                            items={MOCK_ITEMS}
                            company={MOCK_COMPANY}
                            signature={null}
                          />
                        </div>
                    </div>
                 </div>

                 {/* Top Badge Overlay */}
                 <div className="absolute top-2 left-2 z-10">
                    <div className={`p-1.5 rounded-lg border transition-all ${
                      selectedTemplate === template.id ? 'bg-indigo-600 text-white border-transparent' : 'bg-white text-slate-500 border-slate-200'
                    }`}>
                      {React.cloneElement(
                        template.icon as React.ReactElement<{ size?: number }>,
                        { size: 12 },
                      )}
                    </div>
                 </div>

                 {/* Selected Checkmark */}
                 {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 z-10 bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                       <Check size={10} strokeWidth={4} />
                    </div>
                 )}
              </div>

              <div className="p-3 space-y-1">
                 <h3 className="text-xs font-black text-slate-900 tracking-tight uppercase truncate">{template.name}</h3>
                 <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{template.type}</p>
                 <p className="text-[10px] text-slate-500 font-medium leading-tight line-clamp-1 opacity-80">
                   {template.description}
                 </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="pt-20 text-center space-y-6"
        >
           <p className="text-xs font-black text-slate-300 uppercase tracking-[0.4em]">Engineered for Excellence</p>
           <div className="flex justify-center gap-12 opacity-30 invert">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Visa_2021.svg" alt="Visa" className="h-6" />
           </div>
        </motion.div>
      </div>
    </div>
  );
}
