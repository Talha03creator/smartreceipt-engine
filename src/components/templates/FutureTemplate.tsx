import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'motion/react';
import { Cpu, Zap, Activity, HardDrive, ShieldAlert } from 'lucide-react';

interface TemplateProps {
  data: any;
  items: any[];
  company: any;
  signature: string | null;
}

export function FutureTemplate({ data, items, company, signature }: TemplateProps) {
  const currency = data.currency || 'USD';
  const symbol = '$';
  const subtotal = items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0);
  const tax = (subtotal * (parseFloat(data.tax?.toString() || '0') / 100));
  const total = subtotal + tax - parseFloat(data.discount?.toString() || '0');

  return (
    <div 
      className="receipt-preview-content w-full bg-black text-cyan-400 p-8 font-mono border-4 border-cyan-500/50 rounded-none relative overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.3)]"
      style={{ backgroundColor: '#000000', color: '#22d3ee', minHeight: '800px' }}
    >
      {/* Heavy Grid Pattern for Sci-Fi feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      
      {/* Decorative Corner Brackets */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-cyan-500" />
      <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-cyan-500" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-cyan-500" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-cyan-500" />

      {/* Main Content */}
      <div className="relative z-10 space-y-10">
        <div className="flex justify-between items-start border-b-4 border-cyan-500 pb-8 bg-cyan-500/5 p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-cyan-500 flex items-center justify-center text-black shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                <Cpu size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-[0.2em] uppercase italic">TRANSACTION_LOG</h1>
                <p className="text-[10px] font-black bg-cyan-500 text-black inline-block px-2 mt-1 uppercase">Secure Protocol v4.2</p>
              </div>
            </div>
            <div className="text-[11px] space-y-1 font-bold">
              <p className="flex gap-2 underline"><span>ID_HEX:</span> <span className="text-white">{data.customReceiptNumber || '0x4A7B9C'}</span></p>
              <p className="flex gap-2"><span>TIMESTAMP:</span> <span className="text-white">{new Date().toISOString()}</span></p>
            </div>
          </div>
          <div className="text-right space-y-4">
            <div className="bg-cyan-500 text-black px-4 py-2 font-black text-sm uppercase skew-x-[-12deg] shadow-[5px_5px_0_rgba(6,182,212,0.4)]">
              STATUS: VERIFIED
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase font-black tracking-widest text-white">{company?.name || 'CYBER_CORE_ID'}</p>
              <p className="text-[9px] opacity-60">ENCRYPTION: AES_256_GCM</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4 p-6 border-2 border-cyan-500/40 bg-cyan-950/30">
            <p className="text-[10px] font-black uppercase text-cyan-500 skew-x-[-10deg]">Target_Identity</p>
            <div className="space-y-2">
              <p className="text-2xl font-black text-white uppercase tracking-tighter">{data.customerName || 'UNIDENTIFIED_USER'}</p>
              <p className="text-sm font-bold opacity-80">{data.customerEmail}</p>
              <p className="text-[10px] italic opacity-50">{data.customerAddress}</p>
            </div>
          </div>
          <div className="space-y-4 p-6 border-2 border-cyan-500/40 bg-cyan-950/30 text-right">
            <p className="text-[10px] font-black uppercase text-cyan-500 skew-x-[10deg]">Network_Node</p>
            <div className="space-y-1">
               <p className="text-lg font-black text-white">SECURE_PAY_NET</p>
               <p className="text-[11px]">GATEWAY: 192.168.1.254</p>
               <div className="inline-flex items-center gap-2 text-[10px] font-black bg-cyan-500/20 px-2 py-1 border border-cyan-500/30 text-cyan-400 mt-2">
                  <ShieldAlert size={12} /> HASH_VERIFIED
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 border-2 border-cyan-500/20 p-6 bg-cyan-950/10">
           <div className="grid grid-cols-12 gap-4 text-[11px] font-black uppercase text-cyan-500 pb-4 border-b-2 border-cyan-500/30 italic">
              <div className="col-span-8">Module_Service_Description</div>
              <div className="col-span-4 text-right">Credit_Value_Manifest</div>
           </div>
           {items.map((item, idx) => (
             <div key={idx} className="grid grid-cols-12 gap-4 py-4 text-sm border-b border-cyan-500/10 last:border-0 relative">
                <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-1 h-4 bg-cyan-500/30" />
                <div className="col-span-8 space-y-2">
                   <p className="font-black text-white uppercase text-base">{item.description}</p>
                   <div className="flex gap-4 text-[10px] font-bold">
                      <span className="bg-cyan-500/20 px-2">QTY: {item.quantity}</span>
                      <span className="opacity-50">UNIT: {symbol}{item.price.toFixed(2)}</span>
                   </div>
                </div>
                <div className="col-span-4 text-right">
                   <p className="text-xl font-black text-cyan-300 font-mono tracking-tighter">
                      {symbol}{(item.quantity * item.price).toFixed(2)}
                   </p>
                </div>
             </div>
           ))}
        </div>

        <div className="pt-10 flex justify-between items-end">
           <div className="space-y-4">
              {data.showQR && (
                <div className="p-4 border-2 border-cyan-500 bg-white inline-block shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                   <QRCodeSVG value="https://smartreceipt.io" size={80} fgColor="#000000" bgColor="#FFFFFF" />
                </div>
              )}
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase text-cyan-700">Digital_Signature_Seal</p>
                 <div className="h-0.5 w-32 bg-cyan-900" />
              </div>
           </div>
           
           <div className="w-full max-w-sm space-y-4">
              <div className="space-y-2 border-l-4 border-cyan-500/30 pl-4">
                 <div className="flex justify-between text-xs font-black uppercase text-cyan-500/60">
                    <span>Subtotal_Buffer</span>
                    <span>{symbol}{subtotal.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-xs font-black uppercase text-cyan-500/60 font-mono">
                    <span>System_Tax_V3</span>
                    <span>+{symbol}{tax.toFixed(2)}</span>
                 </div>
                 {parseFloat(data.discount?.toString() || '0') > 0 && (
                    <div className="flex justify-between text-xs font-black uppercase text-red-500/80">
                       <span>Credit_Rebate</span>
                       <span>-{symbol}{parseFloat(data.discount?.toString() || '0').toFixed(2)}</span>
                    </div>
                 )}
              </div>
              
              <div className="p-8 bg-cyan-500 text-black relative overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                 <div className="absolute top-0 right-0 w-16 h-16 bg-white/[0.15] rotate-45 translate-x-8 -translate-y-8" />
                 <div className="relative z-10 flex justify-between items-center">
                    <span className="text-lg font-black uppercase italic tracking-tighter">Total_Cred_Val</span>
                    <span className="text-5xl font-black tracking-tighter font-mono">
                      {symbol}{total.toFixed(2)}
                    </span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex justify-between items-center pt-10 border-t-2 border-cyan-500/20">
           <div className="flex items-center gap-6">
              <Activity size={24} className="text-cyan-500 animate-pulse" />
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase italic text-cyan-500">Neural_Link_Status</p>
                 <p className="text-[9px] font-mono opacity-50 tracking-[0.3em]">CONNECTED // SYNC_OK</p>
              </div>
           </div>
           <div className="text-right">
              <p className="text-[10px] font-black uppercase italic text-white mb-2">Authorized_By</p>
              {signature ? (
                 <img src={signature} alt="Signature" className="h-12 w-auto invert grayscale brightness-200" />
              ) : (
                 <div className="h-12 w-48 border-b-2 border-cyan-500/50 flex items-end pb-1 text-[10px] font-black text-cyan-500/30 uppercase tracking-widest">
                    AWAITING_BIO_SIGN
                 </div>
              )}
           </div>
        </div>
        
        {/* Footer Warning */}
        <div className="text-center pt-8 opacity-30">
           <p className="text-[8px] font-black uppercase tracking-[0.5em]">This is a legal encryption log. TAMPERING_IS_VOID.</p>
        </div>
      </div>
    </div>
  );
}
