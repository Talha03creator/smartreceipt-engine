/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from './firebase/config';
import { Auth } from './components/Auth';
import { Chatbot } from './components/Chatbot';
import { Dashboard } from './pages/Dashboard';
import { CompanySettings } from './pages/CompanySettings';
import { TemplatesPage } from './pages/Templates';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Help } from './pages/Help';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { PricingPage } from './pages/Pricing';
import { FeaturesPage } from './pages/Features';
import { 
  LayoutDashboard, Building2, LogOut, Moon, Sun, Menu, X, Bell, User as UserIcon, Globe, Sparkles, Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TemplateProvider } from './context/TemplateContext';

function DashboardLayout({ user, darkMode, setDarkMode, children }: { user: User, darkMode: boolean, setDarkMode: (d: boolean) => void, children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const handleLogout = () => signOut(auth);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Templates', path: '/dashboard/templates', icon: Palette },
    { name: 'Company Settings', path: '/dashboard/settings', icon: Building2 },
  ];

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#F8FAFC] text-slate-900'}`}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 border-r border-slate-200/60 bg-white/80 backdrop-blur-xl`}>
        <div className="flex flex-col h-full">
          <div className="p-8">
            <Link to="/" className="text-xl font-bold flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:rotate-12 transition-transform">
                <Globe size={22} />
              </div>
              <span className="tracking-tighter">SmartReceipt</span>
            </Link>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <item.icon size={20} className={`${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
                  <span className="font-bold text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-6 mt-auto border-t border-slate-100">
            <div className="bg-slate-50 rounded-[2rem] p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-black">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-slate-900 truncate uppercase tracking-tighter">{user.email?.split('@')[0]}</p>
                <p className="text-[10px] text-slate-400 font-bold truncate">Premium Agent</p>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 flex items-center justify-between px-8 bg-white/50 backdrop-blur-md sticky top-0 z-40">
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
           
           <div className="flex items-center gap-4 ml-auto">
              <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-tighter">Systems Nominal</span>
              </div>
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
              </button>
              <div className="h-8 w-px bg-slate-200 mx-2" />
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
           </div>
        </header>

        <main className="p-8 flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
       <motion.div 
         animate={{ rotate: 360 }}
         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
         className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full shadow-xl"
       />
    </div>
  );

  return (
    <TemplateProvider>
      <Router>
        <div className={`min-h-screen ${darkMode ? 'dark' : ''} font-sans transition-colors duration-300`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Auth />} />
            <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Auth />} />
            <Route 
              path="/dashboard/*" 
              element={user ? (
                <DashboardLayout user={user} darkMode={darkMode} setDarkMode={setDarkMode}>
                  <Routes>
                    <Route path="/" element={<Dashboard user={user} />} />
                    <Route path="/templates" element={<TemplatesPage />} />
                    <Route path="/settings" element={<CompanySettings user={user} />} />
                  </Routes>
                </DashboardLayout>
              ) : <Navigate to="/login" />} 
            />
          </Routes>
          <Chatbot />
        </div>
      </Router>
    </TemplateProvider>
  );
}
