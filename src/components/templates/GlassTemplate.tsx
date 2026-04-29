import React from 'react';
import { motion } from 'motion/react';
import { Zap, Shield, Sparkles } from 'lucide-react';

interface TemplateProps {
  data: any;
  items: any[];
  company: any;
  signature: string | null;
}

export function GlassTemplate({ data, items, company, signature }: TemplateProps) {
  const currency = data.currency || 'USD';
  const symbol = '$';
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * (item.price || 0)), 0);
  const tax = (subtotal * (parseFloat(data.tax || 0) / 100));
  const total = subtotal + tax - parseFloat(data.discount || 0);

  return (
    <div 
      className="receipt-preview-content w-full bg-[#0c0c1e] rounded-[3rem] p-1 shadow-2xl relative overflow-hidden font-sans border border-white/10 text-left"
      style={{ backgroundColor: '#0c0c1e' }}
    >
      {/* Animated Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />

      <div className="relative z-10 p-8 space-y-8 backdrop-blur-3xl bg-slate-950/40 rounded-[2.9rem]">
        <div className="flex justify-between items-center">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                 <Zap size={20} fill="currentColor" />
              </div>
              <div>
                 <h2 className="text-lg font-black text-white tracking-tight">{company?.name || 'SmartReceipt'}</h2>
                 <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Premium Settlement</p>
              </div>
           </div>
           <div className="px-5 py-1.5 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl text-white text-[9px] font-black uppercase tracking-[0.2em]">
              Draft Ready
           </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 grid grid-cols-2 gap-6">
           <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <Shield size={12} className="text-blue-400" /> Beneficiary Info
              </p>
              <div className="space-y-1">
                 <p className="text-2xl font-black text-white tracking-tighter">{data.customerName || 'Premium Client'}</p>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{data.paymentMethod || 'Wire Transfer'}</p>
              </div>
           </div>
           <div className="text-right space-y-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Digital Signature Hash</p>
              <p className="text-[10px] font-mono text-blue-300 break-all opacity-60">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 text-[10px] font-black">
                 {new Date().toLocaleDateString()}
              </div>
           </div>
        </div>

        <div className="space-y-4">
           {items.map((item, idx) => (
             <div key={idx} className="flex justify-between items-center p-6 bg-white/5 border border-white/5 rounded-3xl group hover:border-blue-500/30 transition-all">
                <div className="space-y-1">
                   <p className="text-sm font-black text-white uppercase tracking-tight">{item.description}</p>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Unit Vol: {item.quantity}</p>
                </div>
                <p className="text-lg font-black text-blue-400 tracking-tighter">
                   {symbol}{(item.quantity * item.price).toFixed(2)}
                </p>
             </div>
           ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex gap-4">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-white/40">
                 <Sparkles size={24} />
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Authorized By</p>
                 <p className="text-sm font-black text-white">{data.authorizedBy || 'System AI'}</p>
              </div>
           </div>

           <div className="w-full md:w-80 bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[2.5rem] shadow-2xl shadow-blue-500/20 relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -z-0" />
              <div className="relative z-10">
                 <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-4">Final Payable Settlement</p>
                 <div className="flex justify-between items-end">
                    <h2 className="text-5xl font-black text-white tracking-tighter">
                       {symbol}{total.toFixed(2)}
                    </h2>
                    <div className="text-[10px] font-black text-indigo-200">
                       {currency}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
