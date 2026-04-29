import React from 'react';
import { motion } from 'motion/react';

interface TemplateProps {
  data: any;
  items: any[];
  company: any;
  signature: string | null;
}

export function MinimalTemplate({ data, items, company, signature }: TemplateProps) {
  const symbol = '$';
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * (item.price || 0)), 0);
  const tax = (subtotal * (parseFloat(data.tax || 0) / 100));
  const total = subtotal + tax - parseFloat(data.discount || 0);

  return (
    <div className="receipt-preview-content w-full bg-[#fdfdfd] min-h-[600px] border border-slate-200 p-16 font-serif text-slate-800 shadow-sm">
      <div className="max-w-3xl mx-auto space-y-20">
        <div className="flex justify-between items-baseline">
           <h1 className="text-4xl font-light tracking-tight italic">Receipt.</h1>
           <div className="text-right space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest">{company?.name || 'SmartReceipt'}</p>
              <p className="text-[10px] text-slate-400">{company?.email || 'contact@domain.com'}</p>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-20">
           <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest border-b border-slate-200 pb-2">For</p>
              <div className="space-y-1">
                 <p className="text-lg font-medium">{data.customerName}</p>
                 <p className="text-xs text-slate-500 leading-relaxed">{data.customerAddress}</p>
              </div>
           </div>
           <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest border-b border-slate-200 pb-2">Details</p>
              <div className="text-xs space-y-1">
                 <p className="flex justify-between"><span>Number</span> <span className="font-bold">{data.customReceiptNumber || '001'}</span></p>
                 <p className="flex justify-between"><span>Date</span> <span className="font-bold">{new Date().toLocaleDateString()}</span></p>
                 <p className="flex justify-between"><span>Method</span> <span className="font-bold">{data.paymentMethod}</span></p>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-900">
                 <tr>
                    <th className="py-4 font-bold uppercase tracking-widest">Service</th>
                    <th className="py-4 font-bold uppercase tracking-widest text-center w-20">Qty</th>
                    <th className="py-4 font-bold uppercase tracking-widest text-right w-32">Total</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {items.map((item, i) => (
                   <tr key={i}>
                      <td className="py-6 font-medium">{item.description}</td>
                      <td className="py-6 text-center text-slate-400">{item.quantity}</td>
                      <td className="py-6 text-right font-bold">{symbol}{(item.quantity * item.price).toFixed(2)}</td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>

        <div className="flex justify-end pt-10">
           <div className="w-64 space-y-4">
              <div className="flex justify-between text-xs">
                 <span className="text-slate-400">Subtotal</span>
                 <span>{symbol}{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                 <span className="text-slate-400">Tax</span>
                 <span>{symbol}{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-light pt-4 border-t border-slate-900">
                 <span>Total</span>
                 <span className="font-bold underline decoration-slate-200 underline-offset-8">{symbol}{total.toFixed(2)}</span>
              </div>
           </div>
        </div>

        <div className="pt-20 text-center">
           <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-300">Thank you for your business</p>
        </div>
      </div>
    </div>
  );
}
