import { motion, useScroll, useTransform, Variants } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronRight, FileText, Star, Shield, Zap, Check, LayoutDashboard, Send, Download, Globe, Languages, CreditCard, Sparkles } from "lucide-react";
import { useRef } from "react";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { SaaSFeatureScroll } from "../components/SaaSFeatureScroll";

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const staggerVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-transparent text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <AnimatedBackground />
      
      {/* Premium Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-[100] transition-all duration-300"
      >
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="glass px-6 h-14 rounded-full flex items-center justify-between premium-shadow border border-white/20">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-xl font-bold flex items-center gap-2 group">
                <motion.div 
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"
                >
                  <FileText size={18} />
                </motion.div>
                <span className="tracking-tight">SmartReceipt</span>
              </Link>
              <div className="hidden lg:flex gap-8 text-sm font-medium text-slate-600">
                <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
                <Link to="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
                <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
                <Link to="/help" className="hover:text-blue-600 transition-colors">Help</Link>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Login</Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/signup" className="text-sm px-5 py-2 bg-slate-900 text-white rounded-full font-bold hover:bg-black transition-all premium-shadow flex items-center gap-2">
                  Get Started
                  <ChevronRight size={14} />
                </Link>
              </motion.div>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        <motion.div 
          variants={containerVariants}
          initial="initial"
          animate="animate"
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="max-w-5xl mx-auto text-center space-y-8 z-10"
        >
          <motion.div
            variants={staggerVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest"
          >
            <Sparkles size={12} className="animate-pulse" />
            AI-POWERED FINANCIAL AUTOMATION
          </motion.div>
          <motion.h1 
            variants={staggerVariants}
            className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] text-slate-950"
          >
            Billing that feels <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent italic animate-shimmer">supernatural.</span>
          </motion.h1>
          <motion.p 
            variants={staggerVariants}
            className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            The production-grade engine for creating, managing, and sending branded professional receipts. Designed for scale.
          </motion.p>
          <motion.div 
            variants={staggerVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
              <Link to="/signup" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/25 flex items-center justify-center gap-3">
                Start Building Now
                <ChevronRight size={20} />
              </Link>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }} 
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all border border-slate-200 flex items-center justify-center gap-3"
            >
              Book a Demo
            </motion.button>
          </motion.div>
          
          <motion.div
            variants={staggerVariants}
            className="pt-12 flex flex-col items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[1,2,3,4,5].map(i => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + (i * 0.1) }}
                  className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden"
                >
                   <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
            <p className="text-sm font-medium text-slate-500">Loved by 12,000+ developers & creators</p>
          </motion.div>
        </motion.div>

        {/* Hero Video/Visual Container */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-6xl mx-auto mt-20 px-4 w-full perspective-1000"
        >
          <motion.div 
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-3xl overflow-hidden shadow-[0_0_100px_-20px_rgba(37,99,235,0.4)] border-8 border-slate-900 bg-slate-900"
          >
             <video autoPlay loop muted playsInline className="w-full h-auto">
               <source src="https://cdn.pixabay.com/video/2022/07/04/121785-724773822_large.mp4" type="video/mp4" />
             </video>
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
          </motion.div>
          
          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 glass p-6 rounded-2xl premium-shadow hidden lg:block border border-white/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Zap fill="currentColor" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Processing Speed</div>
                <div className="text-xl font-bold">0.4s <span className="text-green-500 text-xs">(-80%)</span></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Bar */}
      <section className="py-20 border-y border-slate-100 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-slate-400 text-xs font-bold tracking-widest uppercase mb-12"
          >
            THE MOST PROFITABLE COMPANIES USE SMARTRECEIPT
          </motion.p>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 items-center justify-items-center opacity-40 grayscale group hover:opacity-100 transition-opacity duration-500">
            {['STRIPE', 'SHOPIFY', 'MERCURY', 'BREX', 'DEEL'].map((logo, i) => (
              <motion.span 
                key={logo} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1, color: '#2563eb', opacity: 1 }}
                className="font-black text-3xl tracking-tighter transition-all cursor-default"
              >
                {logo}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features List */}
      <section id="features" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-5xl font-bold tracking-tight mb-6">Built for the future <br /> of business.</h2>
            <p className="text-xl text-slate-600">Modern tools that adapt to your workflow. Automate the boring parts and focus on what matters.</p>
          </motion.div>
        </div>
        <SaaSFeatureScroll />
      </section>

      {/* Step Section (Interactive) */}
      <section className="py-32 bg-slate-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              variants={containerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-12"
            >
              <motion.h2 variants={staggerVariants} className="text-5xl font-bold tracking-tight">Three steps to <br /> absolute clarity. </motion.h2>
              <div className="space-y-10">
                {[
                  { step: "01", title: "Smart Data Entry", desc: "Our AI extracts data from your inputs instantly. No manual typing required for complex totals." },
                  { step: "02", title: "Instant Branding", desc: "Your logo, colors, and typography applied automatically to every document." },
                  { step: "03", title: "Global Delivery", desc: "Send via email, QR, or PDF. Multi-currency and multi-language support out of the box." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    variants={staggerVariants}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="flex gap-6 group cursor-pointer"
                  >
                    <div className="text-2xl font-mono text-blue-500/50 group-hover:text-blue-500 transition-colors font-bold">{item.step}</div>
                    <div>
                      <h4 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed max-w-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative perspective-1000"
            >
              <div className="aspect-square bg-blue-600/20 rounded-full blur-[100px] absolute inset-0 -z-10"></div>
              <motion.div 
                whileHover={{ rotateY: -10, rotateX: 5 }}
                className="glass-dark p-2 rounded-[2rem] border-white/5 premium-shadow transition-all duration-500"
              >
                <div className="bg-slate-900 rounded-[1.8rem] h-[500px] flex items-center justify-center relative overflow-hidden">
                   <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,theme(colors.blue.500)_0%,transparent_70%)]"
                   />
                   <div className="text-center space-y-4 z-10">
                      <motion.div 
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="w-24 h-24 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-blue-500/40"
                      >
                         <LayoutDashboard size={40} className="text-white" />
                      </motion.div>
                      <div className="text-2xl font-bold">Dynamic Live Preview</div>
                      <div className="text-sm text-slate-500">Your changes reflect in real-time</div>
                   </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Showcases */}
      <section className="py-32 bg-white overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end"
        >
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4 italic transform -skew-x-6">Templates for every vibe.</h2>
            <p className="text-slate-600">Choose from 12+ professional, high-conversion layouts.</p>
          </div>
          <Link to="/signup" className="text-blue-600 font-bold flex items-center gap-2 group underline-offset-4 hover:underline">
            View All Templates <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex gap-8 overflow-x-auto pb-12 px-[max(1.5rem,calc((100vw-80rem)/2))] no-scrollbar snap-x"
        >
          {[1,2,3,4,5].map(i => (
            <motion.div 
              key={i} 
              variants={staggerVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="min-w-[350px] aspect-[3/4] bg-slate-50 rounded-2xl border border-slate-200/60 p-8 snap-center hover:bg-slate-100 transition-all cursor-pointer group hover:shadow-xl hover:shadow-blue-500/5"
            >
               <div className="w-full h-full bg-white rounded-xl shadow-lg border border-slate-100 flex flex-col p-6 space-y-6 transition-all">
                  <div className="h-8 w-24 bg-slate-100 rounded animate-pulse"></div>
                  <div className="flex-1 space-y-4">
                    <div className="h-4 w-full bg-slate-50 rounded"></div>
                    <div className="h-4 w-3/4 bg-slate-50 rounded"></div>
                    <div className="h-4 w-full bg-slate-50 rounded"></div>
                  </div>
                  <div className="h-10 w-full bg-slate-900 rounded-lg group-hover:bg-blue-600 transition-colors"></div>
               </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-100/40 blur-[120px] -z-10 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold tracking-tight mb-16 transform skew-x-3"
          >
            Simple pricing, <br /> no hidden surprises.
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              { plan: "Free", price: "$0", features: ["10 Receipts / mo", "Standard Support", "Basic Branding"] },
              { plan: "Pro", price: "$19", recommended: true, features: ["Unlimited Receipts", "Priority Support", "Advanced AI Editor", "QR Online Portal"] },
              { plan: "Enterprise", price: "Custom", features: ["Multi-Company", "Custom Domain", "Dedicated Manager", "White Label"] }
            ].map((p, i) => (
              <motion.div 
                key={i} 
                variants={staggerVariants}
                whileHover={{ y: -10 }}
                className={`p-10 rounded-[2.5rem] ${p.recommended ? 'bg-slate-950 text-white premium-shadow' : 'bg-white border border-slate-200'} relative transition-all group`}
              >
                {p.recommended && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-[10px] font-bold rounded-full uppercase tracking-widest text-white shadow-lg shadow-blue-500/40">Most Popular</div>}
                <div className="text-xl font-bold mb-2">{p.plan}</div>
                <div className="text-5xl font-black mb-8 group-hover:scale-110 transition-transform origin-left">{p.price}<span className="text-sm font-medium text-slate-500">/mo</span></div>
                <div className="space-y-4 mb-10">
                  {p.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm font-medium text-left">
                      <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Check size={12} />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <Link to="/signup" className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${p.recommended ? 'bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/30' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'} active:scale-95`}>
                  Select {p.plan}
                  <ChevronRight size={18} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-blue-600 rounded-[3rem] p-16 md:p-24 text-white text-center relative overflow-hidden group"
          >
            <motion.div 
               animate={{ rotate: [0, 360] }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]"
            />
            <div className="relative z-10 space-y-8">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight"
              >
                Ready to fix your <br /> cash flow?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-blue-100 max-w-2xl mx-auto"
              >
                Join the new standard of financial document management. Start your 14-day free trial today.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/signup" className="px-12 py-6 bg-white text-blue-600 rounded-2xl font-bold text-xl transition-all premium-shadow">
                    Get Started for Free
                  </Link>
                </motion.div>
                <div className="text-blue-100 text-sm font-medium">No credit card required.</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="col-span-1 md:col-span-2 space-y-10"
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30"
                >
                  <FileText size={20} />
                </motion.div>
                <span className="text-3xl font-bold tracking-tighter">SmartReceipt</span>
              </div>
              <p className="text-xl text-slate-500 max-w-sm leading-relaxed underline decoration-blue-500/20 underline-offset-8">The most beautiful engine for financial clarity. Built with precision for creators.</p>
              <div className="flex gap-4">
                 {['Twitter', 'GitHub', 'LinkedIn', 'Instagram'].map(social => (
                   <motion.div 
                    key={social} 
                    whileHover={{ y: -5, backgroundColor: '#f8fafc' }}
                    className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center cursor-pointer transition-colors border border-slate-100 group"
                   >
                      <div className="w-5 h-5 bg-slate-400 group-hover:bg-blue-600 transition-colors rounded-sm"></div>
                   </motion.div>
                 ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-bold text-lg mb-8">Platform</h4>
              <ul className="space-y-6 text-slate-500 font-medium">
                <li><a href="#features" className="hover:text-blue-600 transition-colors">Features</a></li>
                <li><Link to="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Live Demo</a></li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-bold text-lg mb-8">Company</h4>
              <ul className="space-y-6 text-slate-500 font-medium">
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Story</Link></li>
                <li><Link to="/help" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms</Link></li>
              </ul>
            </motion.div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-50 text-slate-400 text-sm gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>All Systems Operational</span>
            </div>
            <div className="flex gap-12 font-medium">
              <span>© 2024 SmartReceipt Systems Inc.</span>
              <span className="flex items-center gap-2">Made by <span className="text-slate-900 border-b border-blue-500/10">Antigravity</span></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
