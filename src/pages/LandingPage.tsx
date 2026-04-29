import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronRight, FileText, Star, Shield, Zap, Check, Sparkles } from "lucide-react";
import { SaaSFeatureScroll } from "../components/SaaSFeatureScroll";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans scroll-smooth selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-50">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black text-slate-900 flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white group-hover:rotate-6 transition-transform">
              <FileText size={20} />
            </div>
            <span className="tracking-tighter">SmartReceipt<span className="text-blue-600">.</span></span>
          </motion.div>
          <div className="hidden md:flex gap-10 text-xs font-black uppercase tracking-widest text-slate-500">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <Link to="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
          </div>
          <div className="flex gap-4 items-center">
            <Link to="/login" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">Login</Link>
            <Link to="/signup" className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-500/20 active:scale-95">Get Started</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-100/50">
            <Sparkles size={12} />
            The Future of Billing is Here
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
            Billing that feels <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Supernatural.</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            SmartReceipt automates your invoicing, payments, and follow-ups. Professional tools designed to grow your business faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/signup" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-2 group">
              Start Free Trial <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              Book Demo
            </button>
          </div>
          
          <div className="pt-12 flex items-center justify-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                </div>
              ))}
            </div>
            <span>Trusted by 5,000+ top-tier companies</span>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-24 w-full max-w-6xl relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur-3xl opacity-20 animate-pulse" />
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 bg-white p-4">
             <div className="bg-slate-900 rounded-[2rem] aspect-[16/9] overflow-hidden relative group">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000">
                  <source src="https://cdn.pixabay.com/video/2022/07/04/121785-724773822_large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-10 left-10 text-left">
                   <div className="flex gap-2 mb-4">
                      <div className="px-3 py-1 bg-blue-600 rounded-full text-[10px] font-black uppercase text-white">Live Engine</div>
                      <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-white">Verified Secure</div>
                   </div>
                   <h3 className="text-3xl font-black text-white tracking-tight">Automated Verification Ready.</h3>
                </div>
             </div>
          </div>
          
          {/* Floating Element 1 */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden lg:block max-w-[240px] text-left"
          >
             <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-green-500/20">
                <Shield size={20} />
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Security Score</p>
             <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-2">99.9% Robust</h4>
             <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="w-full bg-green-500 h-full" />
             </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Social Proof */}
      <section className="bg-slate-50 py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 opacity-50 grayscale">
          <span className="font-bold text-2xl tracking-tighter">STRIPE</span>
          <span className="font-bold text-2xl tracking-tighter">SHOPIFY</span>
          <span className="font-bold text-2xl tracking-tighter">BREX</span>
          <span className="font-bold text-2xl tracking-tighter">MERCURY</span>
          <span className="font-bold text-2xl tracking-tighter">DEEL</span>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-3xl mx-auto text-center px-6 mb-16">
          <h2 className="text-4xl font-bold mb-6 italic transform -skew-x-6">Built for Modern Teams</h2>
          <p className="text-xl text-slate-600">Everything you need to manage your business financials in one simple, elegant interface.</p>
        </div>
        <SaaSFeatureScroll />
      </section>

      {/* Testimonials */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Don't take our word for it. Hear from our users.</h2>
              <div className="flex gap-2 mb-12">
                {[1,2,3,4,5].map(i => <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />)}
              </div>
              <div className="flex gap-12">
                <div>
                  <div className="text-4xl font-bold mb-1 italic">99%</div>
                  <div className="text-slate-400 text-sm">Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-1 italic">24/7</div>
                  <div className="text-slate-400 text-sm">Expert Support</div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { name: "John Doe", role: "Freelance Designer", quote: "SmartReceipt has saved me at least 5 hours a week in billing. It's incredibly intuitive." },
                { name: "Sarah Smith", role: "CEO at TechFlow", quote: "The AI branding feature is a game changer. Our receipts look more professional than ever." }
              ].map((t, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-colors">
                  <p className="text-lg italic text-slate-300 mb-6">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center font-bold">{t.name[0]}</div>
                    <div>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-sm text-slate-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 space-y-6">
              <div className="text-2xl font-bold flex items-center gap-2">
                <FileText className="text-blue-600" />
                <span>SmartReceipt</span>
              </div>
              <p className="text-slate-500 max-w-xs">The intelligent way to manage business financials. Automated, secure, and beautiful.</p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer">T</div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer">L</div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer">I</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-blue-600">Features</a></li>
                <li><Link to="/pricing" className="hover:text-blue-600">Pricing</Link></li>
                <li><a href="#" className="hover:text-blue-600">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
                <li><a href="#" className="hover:text-blue-600">Careers</a></li>
                <li><Link to="/help" className="hover:text-blue-600">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
                <li><a href="#" className="hover:text-blue-600">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-slate-50 text-slate-400 text-sm gap-4">
            <div>© 2024 SmartReceipt AI. All rights reserved.</div>
            <div className="flex gap-8">
              <span>English (US)</span>
              <span>USD</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
