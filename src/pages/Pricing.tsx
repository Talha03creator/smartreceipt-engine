import { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedBackground } from '../components/AnimatedBackground';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for freelancers just starting their journey.',
    features: ['10 Receipts per month', 'Standard Templates', 'Email Support', 'Basic Analytics'],
    cta: 'Get Started',
    color: 'slate',
  },
  {
    name: 'Pro',
    price: '$19',
    description: 'The standard for growing agencies and power users.',
    features: ['Unlimited Receipts', 'Custom Branding & Logos', 'Signature Authorizations', 'Priority Support', 'Advanced AI Assistant'],
    cta: 'Start 14-Day Free Trial',
    highlight: true,
    color: 'blue',
  },
  {
    name: 'Business',
    price: '$49',
    description: 'Advanced features for teams that need to scale.',
    features: ['Multi-Company Support', 'Team Collaboration', 'API & Webhooks', 'Dedicated Account Manager', 'White Label Options'],
    cta: 'Contact Sales',
    color: 'indigo',
  },
];

const comparison = [
  { feature: 'Monthly Documents', free: '10', pro: 'Unlimited', business: 'Unlimited' },
  { feature: 'Custom Branding', free: false, pro: true, business: true },
  { feature: 'AI Assistant', free: 'Basic', pro: 'Advanced', business: 'Advanced' },
  { feature: 'Multi-Currency', free: true, pro: true, business: true },
  { feature: 'QR Online Portal', free: false, pro: true, business: true },
  { feature: 'Signature Pad', free: false, pro: true, business: true },
  { feature: 'API Access', free: false, pro: false, business: true },
  { feature: 'Custom Domain', free: false, pro: false, business: true },
];

export function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

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
              <span>SmartReceipt</span>
            </Link>
            <div className="flex gap-4 items-center">
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Login</Link>
              <Link to="/signup" className="text-sm px-5 py-2 bg-slate-900 text-white rounded-full font-bold hover:bg-black transition-all premium-shadow">Get Started</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <Sparkles size={12} />
            PRICING OPTIONS
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter leading-[0.9]">
            Simple plans for <br />
            <span className="italic text-blue-600">infinite scale.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">No hidden fees. No complicated tiers. Just pure financial clarity for your business.</p>

          <div className="pt-10">
            <div className="glass inline-flex p-1 rounded-2xl premium-shadow">
              <button 
                onClick={() => setIsAnnual(false)}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${!isAnnual ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsAnnual(true)}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all relative ${isAnnual ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">Save 20%</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {plans.map((plan, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-[3rem] relative overflow-hidden transition-all duration-500 hover:-translate-y-2 ${plan.highlight ? 'bg-slate-950 text-white premium-shadow' : 'bg-white border border-slate-100'}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 px-6 py-2 bg-blue-600 text-[10px] font-black uppercase tracking-widest text-white rounded-bl-3xl">Most Popular</div>
              )}
              <div className={`text-xl font-black mb-4 ${plan.highlight ? 'text-blue-400' : 'text-slate-500'}`}>{plan.name}</div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-6xl font-black">{isAnnual ? `$${(parseInt(plan.price.slice(1)) * 0.8).toFixed(0)}` : plan.price}</span>
                <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">/ month</span>
              </div>
              <p className={`text-sm font-medium mb-10 ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{plan.description}</p>
              
              <div className="h-px bg-slate-100/10 mb-10"></div>
              
              <ul className="space-y-5 mb-12">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-bold">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${plan.highlight ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-50 text-slate-400'}`}>
                      <Check size={14} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link to="/signup" className={`w-full py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest ${plan.highlight ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20' : 'bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900 font-bold'}`}>
                {plan.cta}
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-[3rem] border border-slate-100 premium-shadow overflow-hidden hidden md:block">
           <div className="p-10 border-b border-slate-50">
             <h3 className="text-2xl font-black tracking-tight">Technical Comparison</h3>
             <p className="text-slate-500 font-medium">Deep dive into every feature across our infrastructure.</p>
           </div>
           <div className="p-10">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
                    <th className="pb-8">Feature Entity</th>
                    <th className="pb-8">Free</th>
                    <th className="pb-8">Pro</th>
                    <th className="pb-8">Business</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {comparison.map((item, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-6 font-bold text-slate-700">{item.feature}</td>
                      <td className="py-6 text-sm font-medium text-slate-500">
                        {typeof item.free === 'boolean' ? (item.free ? <Check className="text-green-500" /> : <X className="text-slate-300" />) : item.free}
                      </td>
                      <td className="py-6 text-sm font-black text-blue-600">
                        {typeof item.pro === 'boolean' ? (item.pro ? <Check className="text-blue-500" /> : <X className="text-slate-300" />) : item.pro}
                      </td>
                      <td className="py-6 text-sm font-bold text-slate-800">
                        {typeof item.business === 'boolean' ? (item.business ? <Check className="text-slate-800" /> : <X className="text-slate-300" />) : item.business}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      </main>

      {/* Footer (Simplified) */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm font-medium">© 2024 SmartReceipt Systems. Secure payments powered by Antigravity Checkout.</p>
      </footer>
    </div>
  );
}

function X({ className }: { className?: string }) {
  return <div className={`w-5 h-5 rounded-md bg-slate-50 flex items-center justify-center text-slate-300 font-bold ${className}`}>-</div>;
}
