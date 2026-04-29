import { motion } from 'motion/react';
import { Sparkles, Zap, ShieldCheck, Globe, Cpu, Layers, BarChart3, Fingerprint, Receipt, Users, Smartphone, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedBackground } from '../components/AnimatedBackground';

const features = [
  {
    title: 'Precision AI Processing',
    description: 'Our proprietary LLM logic extracts line items from any transaction with 99.9% accuracy, categorizing expenses automatically.',
    icon: Cpu,
    color: 'blue',
  },
  {
    title: 'Multi-Currency Engine',
    description: 'Support for 135+ global currencies with real-time exchange rate calculation and professional localized formatting.',
    icon: Globe,
    color: 'emerald',
  },
  {
    title: 'Enterprise Grade Security',
    description: 'SOC2 Type II compliant storage with 256-bit AES encryption at rest and TLS 1.3 in transit.',
    icon: ShieldCheck,
    color: 'indigo',
  },
  {
    title: 'Real-time Sync',
    description: 'Instant synchronization across all your devices and team members. Collaboration without lag or conflict.',
    icon: Zap,
    color: 'orange',
  },
  {
    title: 'Deep Analytics',
    description: 'Visualize your spending and revenue patterns with interactive charts that drill down into the finest details.',
    icon: BarChart3,
    color: 'pink',
  },
  {
    title: 'Biometric Signaling',
    description: 'Authorize signatures and approvals using advanced digital handwriting recognition and biometric validation.',
    icon: Fingerprint,
    color: 'purple',
  }
];

export function FeaturesPage() {
  return (
    <div className="min-h-screen bg-transparent relative selection:bg-blue-100 selection:text-blue-900">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-[100] transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="glass px-6 h-14 rounded-full flex items-center justify-between premium-shadow">
            <Link to="/" className="text-xl font-bold flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                <Globe size={18} />
              </div>
              <span className="hidden sm:inline">SmartReceipt</span>
            </Link>
            <div className="flex gap-4 items-center">
              <Link to="/pricing" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Pricing</Link>
              <Link to="/login" className="text-sm px-5 py-2 bg-slate-900 text-white rounded-full font-bold hover:bg-black transition-all premium-shadow">Login</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-40 pb-24 px-6 max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-40">
           <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em]"
              >
                <Sparkles size={12} />
                PRODUCT CAPABILITIES
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-black text-slate-950 tracking-tighter leading-[0.85]">
                Engineered for <br />
                <span className="italic text-blue-600">Performance.</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-xl">
                SmartReceipt is not just a generator—it is a full-stack financial ecosystem designed for the modern era of business.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                 <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95">Explore Infrastructure</button>
                 <button className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">API Docs</button>
              </div>
           </div>
           
           <div className="relative">
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotateY: [0, 10, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="bg-slate-900 rounded-[3rem] aspect-square p-1 shadow-2xl premium-shadow relative z-20"
              >
                 <div className="w-full h-full rounded-[2.8rem] bg-gradient-to-br from-slate-800 to-slate-950 p-10 flex flex-col justify-between border border-white/5 overflow-hidden group">
                    <div className="space-y-4">
                       <div className="w-16 h-1 bg-blue-500/50 rounded-full" />
                       <h3 className="text-3xl font-black text-white italic">01. Smart CORE</h3>
                    </div>
                    <div className="relative">
                       <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                       <p className="text-slate-400 text-lg font-medium leading-relaxed">Our infrastructure processes over 4.2M line items per second with zero-latency overhead across global clusters.</p>
                    </div>
                 </div>
              </motion.div>
              
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-400/10 rounded-full blur-[100px] -z-10" />
           </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
           {features.map((f, i) => (
             <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white border border-slate-100 rounded-[2.5rem] premium-shadow group hover:-translate-y-2 transition-all duration-500"
             >
                <div className={`w-14 h-14 bg-${f.color}-50 text-${f.color}-600 rounded-2xl flex items-center justify-center mb-8 border border-${f.color}-100 group-hover:scale-110 transition-transform`}>
                   <f.icon size={28} />
                </div>
                <h3 className="text-2xl font-black text-slate-950 tracking-tight mb-4">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{f.description}</p>
             </motion.div>
           ))}
        </div>

        {/* Interactive Stats Section */}
        <section className="bg-slate-950 rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden mb-40">
           <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div>
                 <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 italic">Unmatched <br /><span className="text-blue-500">Efficiency.</span></h2>
                 <div className="grid grid-cols-2 gap-10">
                    {[
                      { label: 'Uptime', value: '99.99%', sub: 'SLA Guaranteed' },
                      { label: 'Latency', value: '< 20ms', sub: 'Global Average' },
                      { label: 'Scale', value: 'Unlimited', sub: 'Cloud Native' },
                      { label: 'Compliance', value: 'Global', sub: 'SOC2 & HIPAA' },
                    ].map((s, i) => (
                      <div key={i} className="space-y-1">
                         <div className="text-3xl font-black text-white">{s.value}</div>
                         <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{s.label}</div>
                         <div className="text-xs text-slate-500">{s.sub}</div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="space-y-6">
                 <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
                    <div className="flex gap-4 mb-6">
                       <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center"><Bot size={20} /></div>
                       <div>
                          <div className="text-sm font-bold">System Status</div>
                          <div className="text-[10px] text-green-400 font-black flex items-center gap-1 uppercase tracking-tighter"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> All Systems Online</div>
                       </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">Our automated monitoring nodes in 32 regions ensure that your receipts are generated and delivered instantly, no matter the volume.</p>
                 </div>
                 <button className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-3 active:scale-95 group">
                    View Network Health
                    <Zap size={18} className="text-blue-600 group-hover:scale-125 transition-transform" />
                 </button>
              </div>
           </div>
           
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full -z-10" />
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full -z-10" />
        </section>

        {/* Integration Bar */}
        <div className="text-center space-y-12 mb-24">
           <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em]">Integrated within your existing stack</h3>
           <div className="flex flex-wrap justify-center gap-12 grayscale opacity-30 invert">
              <LinkIcon name="Stripe" />
              <LinkIcon name="Shopify" />
              <LinkIcon name="Clerk" />
              <LinkIcon name="Mercury" />
              <LinkIcon name="Linear" />
           </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
           <div className="text-xl font-black tracking-tighter">SmartReceipt.</div>
           <p className="text-slate-500 max-w-lg mx-auto text-sm font-medium leading-relaxed">Building the foundation for a more transparent financial future through AI and decentralized verification.</p>
           <div className="flex justify-center gap-8 pt-6">
              {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((s, i) => (
                <a key={i} href="#" className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">{s}</a>
              ))}
           </div>
        </div>
      </footer>
    </div>
  );
}

function LinkIcon({ name }: { name: string }) {
  return (
    <div className="text-2xl font-black tracking-tighter">{name}</div>
  );
}
