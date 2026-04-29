import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'motion/react';
import { Globe, ShieldCheck, Mail, CreditCard, ExternalLink } from 'lucide-react';

interface TemplateProps {
  data: any;
  items: any[];
  company: any;
  signature: string | null;
}

export function DarkTemplate({ data, items, company, signature }: TemplateProps) {
  const currency = data.currency || 'USD';
  const symbol = '$';
  const subtotal = items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0);
  const tax = (subtotal * (parseFloat(data.tax?.toString() || '0') / 100));
  const total = subtotal + tax - parseFloat(data.discount?.toString() || '0');

  return (
    <div 
      className="receipt-preview-content w-full bg-slate-950 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] border border-white/5 overflow-hidden font-sans relative"
      style={{ backgroundColor: '#020617' }}
    >
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] -z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] -z-0" />

      {/* Top Gradient Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600" />

      <div className="p-8 md:p-12 space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-6">
            <div className="relative inline-block">
              {company?.logoUrl ? (
                <img src={company.logoUrl} alt="Logo" className="h-10 w-auto object-contain filter brightness-110" />
              ) : (
                <div className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-lg" />
                  {company?.name?.toUpperCase() || 'SMARTRECEIPT'}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tighter text-white">RECEIPT</h1>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  REF: {data.useCustomReceiptNumber ? data.customReceiptNumber : 'SR-DRAFT-2024'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 rounded-full border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">VERIFIED & SETTLED</span>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-black text-white tracking-tight">{company?.name || 'Smart Billing Engine'}</p>
              <div className="text-[11px] text-slate-400 font-bold space-y-1 uppercase tracking-wider">
                <p>{company?.address || 'Digital Nomad Base, Earth'}</p>
                <div className="flex items-center justify-end gap-2 text-indigo-400">
                   <Mail size={12} /> <span className="lowercase">{company?.email || 'billing@smartreceipt.io'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/5 hover:border-white/10 transition-colors text-left">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">RECIPIENT</p>
            <div className="space-y-2">
              <p className="text-xl font-black text-white tracking-tight">{data.customerName || 'Premium Client'}</p>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                 <Mail size={12} /> <span>{data.customerEmail || 'no-email@provided.io'}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2 line-clamp-2">
                {data.customerAddress || 'Direct Digital Settlement'}
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/5 hover:border-white/10 transition-colors">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-left">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">ISSUED</p>
                <p className="font-black text-white text-sm">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">METHOD</p>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-md border border-indigo-500/20 text-[10px] font-black uppercase">
                  <CreditCard size={10} />
                  {data.paymentMethod || 'SECURE PAY'}
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-left">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1">TRANSACTION STATUS</p>
              <p className="text-xs font-bold text-slate-300">AUTHORIZED_SUCCESS</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">DESCRIPTION</p>
            <div className="flex gap-12">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] w-12 text-center">QTY</p>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] w-24 text-right">TOTAL</p>
            </div>
          </div>

          <div className="space-y-1">
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 rounded-2xl transition-colors group">
                 <div className="text-left space-y-1">
                    <p className="text-sm font-black text-white uppercase tracking-tight">
                      {item.description || 'Enterprise Solution'}
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      UNIT COST: ${parseFloat(item.price || 0).toFixed(2)}
                    </p>
                 </div>
                 <div className="flex gap-12 items-center">
                    <p className="text-sm font-black text-slate-400 w-12 text-center">{item.quantity || 1}</p>
                    <p className="text-sm font-black text-white w-24 text-right">
                      ${(parseFloat(item.quantity || 0) * parseFloat(item.price || 0)).toFixed(2)}
                    </p>
                 </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 pt-8 border-t border-white/10">
          <div className="flex-1 space-y-6 w-full lg:w-auto text-left">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">SUBTOTAL</p>
                  <p className="text-lg font-black text-white tracking-tighter">${subtotal.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">TAX ({data.tax}%)</p>
                  <p className="text-lg font-black text-white tracking-tighter">${tax.toFixed(2)}</p>
                </div>
             </div>
             
             {signature && (
               <div className="space-y-3 pt-4">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">AUTH_VERIFIED_SIGNATURE</p>
                  <img src={signature} alt="Signature" className="h-12 w-auto object-contain filter invert opacity-60 brightness-200" />
               </div>
             )}
          </div>

          <div className="w-full lg:w-80 relative group">
             <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[2rem] blur opacity-30 group-hover:opacity-50 transition duration-1000" />
             <div className="relative bg-slate-900 rounded-[2rem] p-8 border border-white/10">
                <div className="flex justify-between items-center mb-6">
                   <div className="text-left space-y-1">
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">FINAL SETTLEMENT</p>
                      <h2 className="text-4xl font-black text-white tracking-tighter">
                        ${total.toFixed(2)}
                      </h2>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-6 border-t border-white/5">
           <div className="flex flex-col md:flex-row items-center gap-6">
              {data.showQR && (
                <div className="p-3 bg-white rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)] relative">
                  <QRCodeSVG value="https://smartreceipt.io" size={64} fgColor="#0f172a" includeMargin={true} />
                </div>
              )}
              <div className="space-y-2 text-center md:text-left">
                <p className="text-xs font-black text-white tracking-tight flex items-center gap-2 justify-center md:justify-start">
                  <ShieldCheck size={14} className="text-indigo-400" />
                  CRYPTOGRAPHICALLY SECURE
                </p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-loose">
                  Powered by the SmartReceipt® high-performance billing engine.
                </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
