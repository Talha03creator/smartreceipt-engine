import { motion } from "motion/react";
import { Shield, Zap, Target } from "lucide-react";

export function About() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-slate-900 text-white py-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold mb-6"
        >
          Our Mission: Simplifying Finance
        </motion.h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto px-6">
          SmartReceipt was born from a simple observation: small businesses spend too much time on paperwork. We're here to change that with AI-driven automation.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">Innovation</h3>
            <p className="text-slate-600">We leverage the latest in AI and machine learning to make financial documents smarter and more actionable.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">Trust</h3>
            <p className="text-slate-600">Your security is our priority. We use bank-grade encryption to ensure your data stays private and safe.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">Velocity</h3>
            <p className="text-slate-600">We believe in speed. Generating a professional receipt should take seconds, not minutes.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">The Story</h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            Founded in 2024, SmartReceipt started as a small tool for freelancers to track expenses. Today, it's a comprehensive platform serving thousands of businesses worldwide. We are dedicated to building tools that empower entrepreneurs to focus on what they do best: building their business.
          </p>
        </div>
      </section>
    </div>
  );
}

