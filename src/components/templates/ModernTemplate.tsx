import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'motion/react';
import { Globe, ShieldCheck, Mail, CreditCard, ChevronRight } from 'lucide-react';

interface TemplateProps {
  data: any;
  items: any[];
  company: any;
  signature: string | null;
}

export function ModernTemplate({ data, items, company, signature }: TemplateProps) {
  const currency = data.currency || 'USD';
  const symbol = '$'; // Simplified for preview
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * (item.price || 0)), 0);
  const tax = (subtotal * (parseFloat(data.tax || 0) / 100));
  const total = subtotal + tax - parseFloat(data.discount || 0);

  return (
    <div className="receipt-preview-content w-full bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden font-sans text-slate-900">
      <div className="p-10 space-y-10">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
             {company?.logoUrl ? (
               <img src={company.logoUrl} alt="Logo" className="h-12 w-auto object-contain" />
             ) : (
               <div className="w-12 h-12 bg-blue-600 rounded-xl" />
             )}
             <div>
               <h1 className="text-3xl font-black tracking-tight uppercase">Invoice</h1>
               <p className="text-sm font-bold text-slate-400">#{data.customReceiptNumber || 'SR-001'}</p>
             </div>
          </div>
          <div className="text-right">
             <div className="px-4 py-2 bg-green-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
               Completed
             </div>
             <p className="text-sm font-black">{company?.name || 'SmartReceipt AI'}</p>
             <p className="text-xs text-slate-500 font-medium">{company?.email || 'billing@domain.com'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 pt-8 border-t border-slate-100">
           <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bill To</p>
              <p className="text-lg font-black">{data.customerName || 'Customer Name'}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{data.customerAddress || 'Client Address Here'}</p>
           </div>
           <div className="text-right space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Issued</p>
              <p className="font-bold">{new Date().toLocaleDateString()}</p>
              <div className="pt-2">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Method</p>
                 <p className="text-xs font-bold uppercase">{data.paymentMethod || 'Credit Card'}</p>
              </div>
           </div>
        </div>

        <div className="space-y-4">
           <div className="grid grid-cols-12 gap-4 pb-4 border-b-2 border-slate-900">
              <div className="col-span-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Description</div>
              <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Qty</div>
              <div className="col-span-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Amount</div>
           </div>
           {items.map((item, i) => (
             <div key={i} className="grid grid-cols-12 gap-4 py-2">
                <div className="col-span-6 font-bold text-sm">{item.description}</div>
                <div className="col-span-2 text-center text-sm">{item.quantity}</div>
                <div className="col-span-4 text-right font-black text-sm">{symbol}{(item.quantity * item.price).toFixed(2)}</div>
             </div>
           ))}
        </div>

        <div className="flex justify-between items-end pt-10 border-t border-slate-100">
           <div className="space-y-4">
              {signature && (
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase">Authorized By</p>
                   <img src={signature} alt="Sig" className="h-10 object-contain" />
                </div>
              )}
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                 <ShieldCheck size={14} /> Official Record
              </div>
           </div>
           <div className="w-64 space-y-3">
              <div className="flex justify-between text-sm">
                 <span className="text-slate-500 font-bold">Subtotal</span>
                 <span className="font-bold">{symbol}{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="text-slate-500 font-bold">Tax ({data.tax}%)</span>
                 <span className="font-bold">{symbol}{tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-slate-100 my-2" />
              <div className="flex justify-between items-center bg-slate-900 text-white p-4 rounded-2xl">
                 <span className="text-xs font-black uppercase tracking-widest">Total</span>
                 <span className="text-2xl font-black">{symbol}{total.toFixed(2)}</span>
              </div>
           </div>
        </div>

        <div className="pt-8 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
           <span>SmartReceipt.io Platform</span>
           {data.showQR && (
             <div className="p-1 border border-slate-100 rounded-lg">
                <QRCodeSVG value="https://smartreceipt.io" size={40} />
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
