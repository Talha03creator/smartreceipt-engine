import { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import { User } from 'firebase/auth';
import { collection, query, where, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, MapPin, Phone, Globe, Save, Upload, X, Loader2, Sparkles, Image as ImageIcon, FileText, PenTool, Trash2 } from 'lucide-react';

import imageCompression from 'browser-image-compression';
import { SignaturePad } from '../components/SignaturePad';

export function CompanySettings({ user }: { user: User }) {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    address: '', 
    phone: '', 
    website: '', 
    logoUrl: '', 
    charterUrl: '', 
    signatureUrl: '' 
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [charterPreview, setCharterPreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const charterInputRef = useRef<HTMLInputElement>(null);
  const sigImageInputRef = useRef<HTMLInputElement>(null);
  const sigPad = useRef<any>(null);
  const [showSigPad, setShowSigPad] = useState(false);

  useEffect(() => {
    async function fetchCompany() {
        const q = query(collection(db, 'companies'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docSnapshot = querySnapshot.docs[0];
            setCompanyId(docSnapshot.id);
            const data = docSnapshot.data() as any;
            setFormData({
              name: data.name || '',
              address: data.address || '',
              phone: data.phone || '',
              website: data.website || '',
              logoUrl: data.logoUrl || '',
              charterUrl: data.charterUrl || '',
              signatureUrl: data.signatureUrl || ''
            });
        }
    }
    fetchCompany();
  }, [user.uid]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Logo file is too large. Please use an image smaller than 5MB.");
        return;
      }

      setUploading(true);
      setUploadStatus('uploading');
      setUploadProgress(20);

      try {
        const options = {
          maxSizeMB: 0.05,
          maxWidthOrHeight: 400,
          useWebWorker: true
        };
        const compressedFile = await imageCompression(file, options);
        setUploadProgress(60);

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setFormData(prev => ({ ...prev, logoUrl: base64data }));
          setLogoPreview(base64data);
          setUploading(false);
          setUploadProgress(100);
          setUploadStatus('success');
          setTimeout(() => setUploadStatus('idle'), 3000);
        };
        reader.readAsDataURL(compressedFile);

      } catch (error: any) {
        console.error("Logo processing error:", error);
        setUploadStatus('error');
        setUploading(false);
        setLogoPreview(null);
        alert("Failed to process logo. Please try a different image.");
      }
    }
  };

  const handleCharterChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Charter file is too large. Please use an image smaller than 5MB.");
        return;
      }

      setUploading(true);
      setUploadStatus('uploading');
      setUploadProgress(20);

      try {
        const options = {
          maxSizeMB: 0.1, // Charter can be a bit larger/clearer
          maxWidthOrHeight: 1024,
          useWebWorker: true
        };
        const compressedFile = await imageCompression(file, options);
        setUploadProgress(60);

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setFormData(prev => ({ ...prev, charterUrl: base64data }));
          setCharterPreview(base64data);
          setUploading(false);
          setUploadProgress(100);
          setUploadStatus('success');
          setTimeout(() => setUploadStatus('idle'), 1000);
        };
        reader.readAsDataURL(compressedFile);

      } catch (error: any) {
        console.error("Charter processing error:", error);
        setUploadStatus('error');
        setUploading(false);
        setCharterPreview(null);
        alert("Failed to process charter. Please try a different scan/image.");
      }
    }
  };

  const clearSignature = () => {
    sigPad.current?.clear();
  };

  const [tempSignature, setTempSignature] = useState<string | null>(null);

  const saveSignature = () => {
    if (tempSignature) {
      setFormData(prev => ({ ...prev, signatureUrl: tempSignature }));
      setShowSigPad(false);
    } else {
      alert("Please provide a signature first.");
    }
  };

  const handleSigUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      setUploadStatus('uploading');
      try {
        const options = {
          maxSizeMB: 0.03, // Signatures should be very small
          maxWidthOrHeight: 400,
          useWebWorker: true
        };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setFormData(prev => ({ ...prev, signatureUrl: base64data }));
          setUploading(false);
          setUploadStatus('success');
          setTimeout(() => setUploadStatus('idle'), 1000);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        setUploading(false);
        setUploadStatus('error');
        alert("Failed to process signature image.");
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
        if (companyId) {
            await updateDoc(doc(db, 'companies', companyId), formData);
        } else {
            const docRef = await addDoc(collection(db, 'companies'), { ...formData, userId: user.uid });
            setCompanyId(docRef.id);
        }
        alert('Company settings saved successfully!');
    } catch (error) {
        console.error("Save error:", error);
        alert("Failed to save settings.");
    } finally {
        setSaving(false);
    }
  };

  const removeLogo = () => {
    setFormData(prev => ({ ...prev, logoUrl: '' }));
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeCharter = () => {
    setFormData(prev => ({ ...prev, charterUrl: '' }));
    setCharterPreview(null);
    if (charterInputRef.current) charterInputRef.current.value = '';
  };

  const removeSignature = () => {
    setFormData(prev => ({ ...prev, signatureUrl: '' }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 flex items-center gap-3">
             Company Settings
             <Building2 className="text-blue-600" size={28} />
          </h1>
          <p className="text-slate-500 font-medium mt-2">Personalize how your business appears on all documents.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Logo & Signature */}
        <div className="lg:col-span-1 space-y-8">
          {/* Logo Section */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <ImageIcon size={64} />
            </div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Business Logo</h3>
            
            <div className="flex flex-col items-center">
              <div className="relative group/logo w-full">
                <div className={`w-full aspect-square rounded-3xl overflow-hidden border-2 border-dashed transition-all flex items-center justify-center bg-slate-50 ${formData.logoUrl || logoPreview ? 'border-transparent' : 'border-slate-200'}`}>
                  {(logoPreview || formData.logoUrl) ? (
                    <img src={logoPreview || formData.logoUrl} alt="Company Logo" className="w-full h-full object-contain" />
                  ) : (
                    <div className="text-slate-300">
                      <ImageIcon size={40} />
                    </div>
                  )}
                  
                  {uploading && (
                    <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center p-4">
                       <Loader2 size={32} className="animate-spin text-blue-500 mb-2" />
                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                         <motion.div 
                           className="bg-blue-600 h-full" 
                           initial={{ width: 0 }}
                           animate={{ width: `${uploadProgress}%` }}
                         />
                       </div>
                       <span className="text-[10px] font-black text-blue-600 mt-2">{Math.round(uploadProgress)}%</span>
                    </div>
                  )}
                </div>
                
                {(formData.logoUrl || logoPreview) && !uploading && (
                  <button 
                    onClick={removeLogo}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-100 shadow-sm transition-all z-10"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="mt-6 w-full">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*" 
                  onChange={handleLogoChange} 
                  className="hidden" 
                />
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className={`w-full py-3 px-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 group-hover:scale-95 active:scale-90 ${
                    uploadStatus === 'success' ? 'bg-green-500 hover:bg-green-600' : 
                    uploadStatus === 'error' ? 'bg-red-500 hover:bg-red-600' :
                    'bg-slate-900 hover:bg-black'
                  } text-white`}
                >
                  {uploading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : uploadStatus === 'success' ? (
                    <Sparkles size={18} />
                  ) : uploadStatus === 'error' ? (
                    <X size={18} />
                  ) : (
                    <Upload size={18} />
                  )}
                  {uploading ? 'Processing...' : 
                   uploadStatus === 'success' ? 'Upload Successful!' :
                   uploadStatus === 'error' ? 'Upload Failed' :
                   formData.logoUrl ? 'Change Logo' : 'Upload Logo'}
                </button>
              </div>
            </div>
          </div>

          {/* Signature Section */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <PenTool size={64} />
            </div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Business Signature</h3>

            <div className="space-y-4">
              <div className={`w-full h-32 rounded-2xl border-2 border-dashed flex items-center justify-center bg-slate-50 relative ${formData.signatureUrl ? 'border-transparent' : 'border-slate-200'}`}>
                {formData.signatureUrl ? (
                  <div className="relative group/sig w-full h-full flex items-center justify-center p-4">
                    <img src={formData.signatureUrl} alt="Signature" className="max-h-full max-w-full object-contain" />
                    <button 
                      onClick={removeSignature}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm transition-all z-10"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No Signature Saved</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="file" 
                  ref={sigImageInputRef} 
                  accept="image/*" 
                  onChange={handleSigUpload} 
                  className="hidden" 
                />
                <button 
                  type="button"
                  onClick={() => sigImageInputRef.current?.click()}
                  className="py-3 px-4 bg-slate-50 text-slate-600 rounded-2xl font-bold text-xs border border-slate-100 hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                >
                  <Upload size={14} />
                  Upload
                </button>
                <button 
                  type="button"
                  onClick={() => setShowSigPad(true)}
                  className="py-3 px-4 bg-blue-50 text-blue-600 rounded-2xl font-bold text-xs border border-blue-100 hover:bg-blue-100 transition-all flex items-center justify-center gap-2"
                >
                  <PenTool size={14} />
                  Draw
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Charter */}
        <div className="lg:col-span-2 space-y-8">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
            <div>
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Business Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-tighter ml-1">Company Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-4 text-slate-300" size={18} />
                    <input 
                      name="name" 
                      placeholder="e.g. Acme Industries" 
                      onChange={handleChange} 
                      value={formData.name || ''} 
                      className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold transition-all" 
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-tighter ml-1">Official Website</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-4 text-slate-300" size={18} />
                    <input 
                      name="website" 
                      placeholder="e.g. acme.com" 
                      onChange={handleChange} 
                      value={formData.website || ''} 
                      className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-tighter ml-1">Business Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 text-slate-300" size={18} />
                    <input 
                      name="address" 
                      placeholder="Street, City, Country" 
                      onChange={handleChange} 
                      value={formData.address || ''} 
                      className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-tighter ml-1">Contact Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 text-slate-300" size={18} />
                    <input 
                      name="phone" 
                      placeholder="+1 (555) 000-0000" 
                      onChange={handleChange} 
                      value={formData.phone || ''} 
                      className="w-full bg-slate-50 border border-slate-100 pl-11 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold transition-all" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Charter Upload Section */}
            <div>
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Company Charter / License</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className={`aspect-video rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center bg-slate-50 overflow-hidden relative ${formData.charterUrl ? 'border-transparent' : 'border-slate-200'}`}>
                   {formData.charterUrl ? (
                     <>
                      <img src={formData.charterUrl} alt="Charter" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={removeCharter}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 shadow-lg hover:bg-white transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                     </>
                   ) : (
                     <div className="flex flex-col items-center text-slate-400 p-8 text-center">
                        <FileText size={48} className="mb-4 opacity-20" />
                        <p className="text-xs font-black uppercase tracking-widest mb-1">Company Charter</p>
                        <p className="text-[10px] font-medium opacity-60">Upload a scan or image of your official business license.</p>
                     </div>
                   )}
                </div>

                <div className="space-y-4">
                  <input 
                    type="file" 
                    ref={charterInputRef} 
                    accept="image/*" 
                    onChange={handleCharterChange} 
                    className="hidden" 
                  />
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    <p className="text-xs font-bold text-slate-600 mb-4 tracking-tight leading-relaxed">
                      Maintaining a digital record of your charter ensures identity persistence and easier verification for financial institutions.
                    </p>
                    <button 
                      type="button"
                      onClick={() => charterInputRef.current?.click()}
                      disabled={uploading}
                      className="w-full py-4 px-6 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 disabled:opacity-50"
                    >
                      <Upload size={20} />
                      {formData.charterUrl ? 'Replace Document' : 'Upload Document'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-50 flex justify-end">
              <button 
                type="submit" 
                disabled={saving || uploading}
                className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/30 active:scale-90 disabled:opacity-50"
              >
                {saving ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
                {saving ? 'UPDATING...' : 'SAVE COMPANY PROFILE'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Signature Capture Modal */}
      <AnimatePresence>
        {showSigPad && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                  <PenTool className="text-blue-600" />
                  E-Signature Capture
                </h2>
                <button onClick={() => setShowSigPad(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-4 overflow-hidden h-64">
                  <SignaturePad 
                    onSave={(data) => setTempSignature(data)}
                    penColor="#0f172a"
                  />
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      (window as any).clearSigPad?.();
                      setTempSignature(null);
                    }}
                    className="flex-1 py-4 px-6 border-2 border-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    Clear Canvas
                  </button>
                  <button 
                    onClick={saveSignature}
                    className="flex-1 py-4 px-6 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold transition-all shadow-lg active:scale-95"
                  >
                    Accept Signature
                  </button>
                </div>
                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest opacity-60">This signature will be applied to your auto-generated receipts.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Section */}
      {!formData.name && !formData.logoUrl && (
        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center gap-4">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm font-black">!</div>
           <div>
             <p className="text-blue-900 font-bold">Complete your profile</p>
             <p className="text-blue-700 text-sm">Add your company name and logo to start generating professional receipts.</p>
           </div>
        </div>
      )}
    </div>
  );
}
