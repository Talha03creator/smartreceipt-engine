import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, HelpCircle, Save, Plus, Trash2, Globe, CreditCard, Download, Image as ImageIcon, Users, FileText } from 'lucide-react';
import { doc, getDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { SignaturePad } from './SignaturePad';
import { ReceiptPreview } from './ReceiptPreview';
import { toPng } from 'html-to-image';
import { generateReceiptPDF } from '../utils/pdfGenerator';

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'PKR', symbol: 'Rs' },
  { code: 'INR', symbol: '₹' },
];

export function ReceiptForm({ onSave, initialData, companyData }: { onSave: (data: any) => void, initialData?: any, companyData?: any }) {
  const [formData, setFormData] = useState(initialData || {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    notes: '',
    authorizedBy: '',
    tax: 0,
    discount: 0,
    useCustomReceiptNumber: false,
    customReceiptNumber: '',
    currency: 'USD',
    showQR: true,
    paymentMethod: 'cash'
  });
  const [items, setItems] = useState(initialData?.items || [{ description: '', quantity: 1, price: 0 }]);
  const [signature, setSignature] = useState(initialData?.signature || companyData?.signatureUrl || null);
  const [isExporting, setIsExporting] = useState(false);
  const sigUploadRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const saveSignature = (dataUrl: string) => {
    setSignature(dataUrl);
  };

  const handleSigUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignature(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!initialData?.signature && companyData?.signatureUrl) {
      setSignature(companyData.signatureUrl);
    }
  }, [companyData?.signatureUrl, initialData?.signature]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prev: any) => ({ ...prev, [name]: checked }));
    } else {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { description: '', quantity: 1, price: 0 }]);
  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleExportImage = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(previewRef.current, { cacheBust: true, quality: 1, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `Receipt_${formData.customReceiptNumber || 'Draft'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('oops, something went wrong!', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      // The generator now captures the rendered UI automatically
      await generateReceiptPDF(formData.customReceiptNumber || 'Draft', companyData?.name);
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0);
    const finalData = { 
      ...formData, 
      items, 
      signature,
      subtotal,
      total: subtotal + (subtotal * (parseFloat(formData.tax?.toString() || '0') / 100)) - parseFloat(formData.discount?.toString() || '0')
    };
    onSave(finalData);
  };

  const subtotal = items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0);
  const taxAmt = (subtotal * (parseFloat(formData.tax?.toString() || '0') / 100));
  const total = subtotal + taxAmt - parseFloat(formData.discount?.toString() || '0');

  return (
    <div className="grid lg:grid-cols-2 gap-10 max-w-[1400px] mx-auto items-start">
      {/* LEFT: FORM */}
      <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 shadow-2xl premium-shadow space-y-8 h-full">
        <div className="flex justify-between items-start border-b border-slate-100 pb-8">
          <div className="flex items-center gap-4">
            {companyData?.logoUrl ? (
              <img src={companyData.logoUrl} alt="Logo" className="w-16 h-16 object-contain rounded-2xl bg-slate-50 border border-slate-100 p-2" />
            ) : (
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Globe size={28} />
              </div>
            )}
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                Document Core
                <Sparkles className="text-blue-600" size={20} />
              </h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                Professional Billing Agent
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <select 
              name="currency" 
              value={formData.currency} 
              onChange={handleChange}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>)}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Users size={12} /> Recipients Details
             </h4>
             <div className="space-y-3">
                <input name="customerName" placeholder="Client Full Name" onChange={handleChange} value={formData.customerName} className="w-full bg-slate-50/50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium" required />
                <input name="customerEmail" type="email" placeholder="Email@domain.com" onChange={handleChange} value={formData.customerEmail} className="w-full bg-slate-50/50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium" />
                <div className="flex gap-3">
                  <input name="customerPhone" placeholder="Mobile / Phone" onChange={handleChange} value={formData.customerPhone} className="flex-1 bg-slate-50/50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium" />
                  <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-32 bg-slate-50 border border-slate-200 p-3 rounded-xl text-[10px] font-black uppercase outline-none">
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="crypto">Crypto</option>
                  </select>
                </div>
                <textarea name="customerAddress" placeholder="Physical / Shipping Address" onChange={handleChange} value={formData.customerAddress} className="w-full bg-slate-50/50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium min-h-[80px]" />
             </div>
          </div>

          <div className="space-y-4">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FileText size={12} /> Meta Configurations
             </h4>
             <div className="space-y-4 bg-slate-50/50 p-6 rounded-3xl border border-slate-200">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" name="useCustomReceiptNumber" onChange={handleChange} checked={formData.useCustomReceiptNumber} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900">Custom Receipt ID</span>
                </label>
                {formData.useCustomReceiptNumber && (
                  <input name="customReceiptNumber" placeholder="SR-XXXXX" onChange={handleChange} value={formData.customReceiptNumber} className="w-full bg-white border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xs font-mono" />
                )}
                <label className="flex items-center gap-3 cursor-pointer group pt-2">
                  <input type="checkbox" name="showQR" onChange={handleChange} checked={formData.showQR} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900">Dynamic Verifier QR</span>
                    <HelpCircle size={12} className="text-slate-400" />
                  </div>
                </label>
                <div className="pt-4 flex gap-2">
                   <div className="px-2 py-1 bg-green-100 text-green-700 text-[8px] font-black rounded uppercase tracking-tighter">Verified Engine</div>
                   <div className="px-2 py-1 bg-blue-100 text-blue-700 text-[8px] font-black rounded uppercase tracking-tighter">SSL Secure</div>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <CreditCard size={12} /> Purchase Inventory
             </h4>
             <button type="button" onClick={addItem} className="text-blue-600 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-50 px-3 py-2 rounded-lg">
                <Plus size={14} /> Add Line
             </button>
          </div>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
             {items.map((item: any, i: number) => (
               <div key={i} className="flex gap-3 items-center group">
                  <input placeholder="Item Description" value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="number" placeholder="Qty" value={item.quantity} onChange={e => updateItem(i, 'quantity', parseFloat(e.target.value))} className="w-16 bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-medium text-center outline-none" />
                  <input type="number" placeholder="Price" value={item.price} onChange={e => updateItem(i, 'price', parseFloat(e.target.value))} className="w-24 bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm font-medium text-right outline-none" />
                  <button type="button" onClick={() => removeItem(i)} className="p-2 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                    <Trash2 size={16} />
                  </button>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
           <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Financial Summary</span>
              <div className="flex gap-6">
                 <div className="flex flex-col items-end">
                    <span className="text-[8px] text-slate-500 uppercase font-bold">Tax {formData.tax}%</span>
                    <input type="number" name="tax" value={formData.tax} onChange={handleChange} className="w-12 bg-transparent text-right text-xs font-bold outline-none border-b border-white/10" />
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[8px] text-slate-500 uppercase font-bold">Discount</span>
                    <input type="number" name="discount" value={formData.discount} onChange={handleChange} className="w-16 bg-transparent text-right text-xs font-bold outline-none border-b border-white/10" />
                 </div>
              </div>
           </div>
           <div className="flex justify-between items-end">
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Total Premium Payable</p>
                 <h2 className="text-5xl font-black tracking-tighter">
                    {CURRENCIES.find(c => c.code === formData.currency)?.symbol}
                    {total.toFixed(2)}
                 </h2>
              </div>
              <div className="flex flex-col items-end gap-2">
                 <div className="flex -space-x-1">
                    {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full border-2 border-slate-900 bg-blue-600 flex items-center justify-center text-[8px] font-bold">✓</div>)}
                 </div>
                 <span className="text-[8px] font-black text-slate-500 uppercase">Verified Engine Activity</span>
              </div>
           </div>
        </div>

        <div className="space-y-4">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Authorization Context</h4>
           <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-3">
                 <input name="authorizedBy" placeholder="Authorized Signatory Name" onChange={handleChange} value={formData.authorizedBy} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold" />
                 <textarea name="notes" placeholder="Special Terms, Guarantee Details or Refill Policy..." onChange={handleChange} value={formData.notes} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-xs min-h-[100px]" />
              </div>
              <div className="w-full md:w-64 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30 flex items-center justify-center relative min-h-[150px]">
                 {signature ? (
                   <div className="relative w-full h-full p-4 flex items-center justify-center group/sig">
                      <img src={signature} alt="Signature" className="max-h-full max-w-full object-contain" />
                      <button type="button" onClick={() => setSignature(null)} className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm text-red-500 opacity-0 group-hover/sig:opacity-100 transition-all"><Trash2 size={12} /></button>
                   </div>
                 ) : (
                   <div className="flex flex-col items-center">
                      <SignaturePad onSave={saveSignature} penColor="#0f172a" />
                      <button type="button" onClick={() => sigUploadRef.current?.click()} className="mt-2 text-[8px] font-black uppercase text-blue-600 tracking-widest hover:underline">Or Upload Image</button>
                      <input type="file" ref={sigUploadRef} accept="image/*" onChange={handleSigUpload} className="hidden" />
                   </div>
                 )}
              </div>
           </div>
        </div>

        <div className="flex flex-col gap-3 pt-6">
          <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 flex items-center justify-center gap-3 active:scale-95 group">
            <Save size={24} className="group-hover:scale-110 transition-transform" />
            {initialData ? 'Sync Global Data' : 'Generate Production Asset'}
          </button>
          
          <div className="flex gap-3">
             <button type="button" onClick={handleExportImage} disabled={isExporting} className="flex-1 py-4 bg-slate-100 text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 transition-all disabled:opacity-50">
                {isExporting ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><ImageIcon size={16} /></motion.div> : <ImageIcon size={16} />}
                Export PNG
             </button>
             <button type="button" onClick={handleExportPDF} disabled={isExporting} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl disabled:opacity-50 group">
                <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                Download PDF
             </button>
          </div>
        </div>
      </form>

      {/* RIGHT: LIVE PREMIUM PREVIEW */}
      <div className="hidden lg:block space-y-6">
        <div className="flex justify-between items-center px-4">
           <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Sparkles size={16} className="text-yellow-500" /> 
              Real-time Premium Render
           </h3>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black text-slate-500 uppercase">Live Engine</span>
           </div>
        </div>
        
        <div ref={previewRef} className="origin-top scale-[0.85] xl:scale-95 transition-transform">
           <ReceiptPreview 
            data={formData} 
            items={items} 
            company={companyData} 
            signature={signature}
           />
        </div>

        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 mt-10">
           <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                 <HelpCircle size={20} />
              </div>
              <div className="space-y-1">
                 <p className="text-xs font-black text-blue-900 uppercase">Design Excellence Tips</p>
                 <p className="text-[10px] text-blue-700 leading-relaxed font-medium">Use consistent currency throughout. High-quality logos (PNG) provide the best professional printing result. Ensure authorized signatory name matches the visual signature for trust compliance.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
