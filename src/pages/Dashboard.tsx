import { useState, useEffect, useMemo } from 'react';
import { User } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs, serverTimestamp, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { generateReceiptPDF } from '../utils/pdfGenerator';
import { ReceiptForm } from '../components/ReceiptForm';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Plus, Search, Download, Edit, Trash2, TrendingUp, Users, FileText, CreditCard, Filter, ChevronRight, LayoutGrid, List, Sparkles, X
} from 'lucide-react';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {
  const [editingReceipt, setEditingReceipt] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [receipts, setReceipts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [companyData, setCompanyData] = useState<any>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCompany() {
        try {
            const q = query(collection(db, 'companies'), where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                setCompanyId(doc.id);
                setCompanyData(doc.data());
                fetchReceipts(doc.id);
            }
        } catch (e) {
            handleFirestoreError(e, OperationType.LIST, 'companies');
        }
    }
    fetchCompany();
  }, [user.uid]);

  async function fetchReceipts(id: string) {
    try {
        const q = query(
            collection(db, 'receipts'), 
            where('userId', '==', user.uid),
            where('companyId', '==', id)
        );
        const querySnapshot = await getDocs(q);
        const fetchedReceipts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort in memory to avoid missing index error
        fetchedReceipts.sort((a: any, b: any) => {
          const timeA = a.createdAt?.seconds || 0;
          const timeB = b.createdAt?.seconds || 0;
          return timeB - timeA;
        });
        setReceipts(fetchedReceipts);
    } catch (e) {
        handleFirestoreError(e, OperationType.LIST, 'receipts');
    }
  }

  const filteredReceipts = useMemo(() => {
    return receipts.filter(r => {
      const matchesSearch = r.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.receiptNumber?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || r.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [receipts, searchTerm, filterStatus]);

  const stats = useMemo(() => {
    const totalRevenue = receipts.reduce((sum, r) => sum + (parseFloat(r.total) || 0), 0);
    const activeCustomers = new Set(receipts.map(r => r.customerEmail)).size;
    const avgValue = receipts.length > 0 ? totalRevenue / receipts.length : 0;
    
    // Chart data for last 6 months (mocked based on real receipts if possible)
    const chartData = [
      { month: 'Jan', amount: 4500 },
      { month: 'Feb', amount: 5200 },
      { month: 'Mar', amount: 4800 },
      { month: 'Apr', amount: 6100 },
      { month: 'May', amount: totalRevenue * 0.4 },
      { month: 'Jun', amount: totalRevenue * 0.6 },
    ];

    return { totalRevenue, activeCustomers, avgValue, chartData };
  }, [receipts]);

  const handleDownload = async (receipt: any) => {
    // To ensure the PDF is the exact same as the template, 
    // we open it in the form which has the high-fidelity preview renderer
    setEditingReceipt({ ...receipt, isViewOnly: true });
    setShowForm(true);
  }

  const handleSaveReceipt = async (data: any) => {
    if (!companyId) return;
    try {
        const receiptData = {
            ...data,
            userId: user.uid,
            companyId: companyId,
            createdAt: serverTimestamp(),
            status: 'completed'
        };

        if (editingReceipt) {
            import('firebase/firestore').then(module => {
                module.updateDoc(module.doc(db, 'receipts', editingReceipt.id), receiptData);
            });
        } else {
            await addDoc(collection(db, 'receipts'), {
                ...receiptData,
                receiptNumber: data.useCustomReceiptNumber ? data.customReceiptNumber : 'SR-' + Date.now().toString().slice(-6),
            });
        }
        setShowForm(false);
        setEditingReceipt(null);
        fetchReceipts(companyId);
    } catch (e) {
        console.error("Error saving receipt: ", e);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Top Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 flex items-center gap-3">
             Dashboard
             <Sparkles className="text-blue-600" size={24} />
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage your professional documents and financial growth.</p>
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search documents..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all premium-shadow font-medium"
            />
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 active:scale-95"
          >
            <Plus size={20} />
            Create
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, color: 'blue', icon: TrendingUp, trend: '+12.5%' },
          { label: 'Active Customers', value: stats.activeCustomers, color: 'indigo', icon: Users, trend: '+4' },
          { label: 'Average Value', value: `$${stats.avgValue.toFixed(0)}`, color: 'emerald', icon: CreditCard, trend: '-2.1%' },
          { label: 'Total Documents', value: receipts.length, color: 'orange', icon: FileText, trend: '+8%' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 premium-shadow flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-black ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'} bg-slate-50 px-2 py-1 rounded-full`}>
                {stat.trend}
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</h3>
              <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 premium-shadow">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold tracking-tight">Revenue Analytics</h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert("Report generation for the full analytics suite is coming in the next update!")}
                className="p-2 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                title="Download Analytics Report"
              >
                <Download size={18} />
              </button>
              <select className="bg-slate-50 border-none text-xs font-bold px-4 py-2 rounded-xl outline-none">
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 800, color: '#2563eb' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorAmt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="z-10">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/40">
              <Sparkles size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Smart Insights</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">Your revenue is up 12% from last month. Most of your growth comes from recurring service clients.</p>
            <div className="space-y-4">
               {[
                 { label: 'Projections', value: 'High' },
                 { label: 'Client Retention', value: '88%' }
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-xs font-bold text-slate-500 uppercase">{item.label}</span>
                    <span className="font-bold text-blue-400">{item.value}</span>
                 </div>
               ))}
            </div>
          </div>
          <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold mt-8 hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
             View Full Report
             <ChevronRight size={18} />
          </button>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] -z-10 rounded-full"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden premium-shadow">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-bold tracking-tight">Recent Activity</h2>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}><List size={18} /></button>
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}><LayoutGrid size={18} /></button>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-slate-100 px-4 py-2 rounded-xl">
               <Filter size={16} />
               <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-transparent border-none outline-none">
                 <option value="all">All Documents</option>
                 <option value="completed">Completed</option>
                 <option value="pending">Pending</option>
               </select>
             </div>
          </div>
        </div>

        <div className="p-4 overflow-x-auto">
          {viewMode === 'list' ? (
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  <th className="p-4">Document Details</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {filteredReceipts.map((r, i) => (
                    <motion.tr 
                      key={r.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group hover:bg-slate-50/50 transition-all cursor-pointer"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                            <FileText size={18} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{r.receiptNumber}</div>
                            <div className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded inline-block uppercase font-black tracking-tighter">Verified</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-700">{r.customerName}</div>
                        <div className="text-xs text-slate-400">{r.customerEmail}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-slate-500">
                          {r.createdAt?.toDate ? r.createdAt.toDate().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Pending...'}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-black text-slate-950">
                          {r.currency || 'USD'} {(parseFloat(r.total) || 0).toFixed(2)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                           <button 
                             onClick={(e) => { e.stopPropagation(); handleDownload(r); }} 
                             disabled={downloadingId === r.id}
                             className={`p-2 bg-white border border-slate-200 rounded-xl transition-all shadow-sm ${downloadingId === r.id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 hover:text-white'}`}
                           >
                             {downloadingId === r.id ? (
                               <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                 <Sparkles size={16} />
                               </motion.div>
                             ) : (
                               <Download size={16} />
                             )}
                           </button>
                           <button 
                             onClick={(e) => { e.stopPropagation(); setEditingReceipt(r); setShowForm(true); }} 
                             className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                           >
                             <Edit size={16} />
                           </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
               {filteredReceipts.map((r, i) => (
                  <div key={r.id} className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 group relative hover:bg-white hover:shadow-xl transition-all h-64 flex flex-col justify-between">
                     <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center premium-shadow font-bold text-blue-600">
                           <FileText size={24} />
                        </div>
                        <div className="text-right">
                           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</div>
                           <div className="text-xl font-black">{r.currency} {parseFloat(r.total).toFixed(2)}</div>
                        </div>
                     </div>
                     <div>
                        <div className="font-black text-slate-900 truncate">{r.customerName}</div>
                        <div className="text-xs text-slate-500 font-medium truncate">{r.receiptNumber} • {r.createdAt?.toDate ? r.createdAt.toDate().toLocaleDateString() : 'N/A'}</div>
                     </div>
                     <div className="flex gap-2 pt-4">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDownload(r); }} 
                          disabled={downloadingId === r.id}
                          className={`flex-1 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${downloadingId === r.id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50'}`}
                        >
                          {downloadingId === r.id ? (
                             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                               <Sparkles size={14} />
                             </motion.div>
                          ) : (
                             <Download size={14} />
                          )}
                          {downloadingId === r.id ? 'GENERATING...' : 'PDF'}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); setEditingReceipt(r); setShowForm(true); }} className="flex-1 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-black transition-all"><Edit size={14} /> Open</button>
                     </div>
                  </div>
               ))}
            </div>
          )}
          {filteredReceipts.length === 0 && (
            <div className="py-20 text-center space-y-4">
               <div className="w-20 h-20 bg-slate-50 rounded-full mx-auto flex items-center justify-center text-slate-300">
                  <Search size={40} />
               </div>
               <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No documents found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Form Overlay */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative w-full max-w-5xl my-auto"
            >
              <button 
                onClick={() => { setShowForm(false); setEditingReceipt(null); }}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors z-10 p-2"
              >
                <X size={24} />
              </button>
              <div className="max-h-[90vh] overflow-y-auto rounded-[2.5rem] no-scrollbar">
                <ReceiptForm onSave={handleSaveReceipt} initialData={editingReceipt} companyData={companyData} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
