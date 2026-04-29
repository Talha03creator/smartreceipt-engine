import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Lang = 'en' | 'ur' | 'rur';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string, sender: 'user' | 'bot' }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<Lang>('en');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const currentInput = input;
    const userMessage = { text: currentInput, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Chatbot request failed');
      }

      const data = await response.json();
      const responseText = data.reply || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { text: responseText, sender: 'bot' as const }]);
    } catch (error) {
       setMessages(prev => [...prev, { text: "AI Service temporarily unavailable. Please check your configuration.", sender: 'bot' as const }]);
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    if (language === 'en') return 'Ask me anything about receipts...';
    if (language === 'ur') return 'رسیدوں کے بارے میں کچھ بھی پوچھیں...';
    return 'Rashid k baray mein puchen...';
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, y: 20, filter: 'blur(10px)' }}
            className="w-[400px] h-[600px] bg-white dark:bg-slate-900 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800 flex flex-col overflow-hidden mb-6"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full" />
              <div className="z-10 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-black text-sm tracking-tight flex items-center gap-2">
                    SMART AGENT
                    <Sparkles size={12} className="text-blue-400" />
                  </h3>
                  <div className="text-[10px] text-green-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Online Now
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex bg-white/10 p-1 rounded-xl">
                  {(['en', 'ur', 'rur'] as Lang[]).map((l) => (
                    <button 
                      key={l}
                      onClick={() => setLanguage(l)}
                      className={`text-[9px] font-black w-8 h-6 flex items-center justify-center rounded-lg transition-all ${language === l ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-white'}`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button onClick={() => setIsOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors"><X size={20} /></button>
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-950 no-scrollbar">
              {messages.length === 0 && (
                <div className="text-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-3xl mx-auto flex items-center justify-center premium-shadow mb-4">
                    <MessageCircle className="text-blue-600" size={32} />
                  </div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-2">Welcome Back!</h4>
                  <p className="text-slate-400 text-sm max-w-[200px] mx-auto font-medium lead-relaxed">
                    {language === 'en' ? 'I can help you create, manage or localize your receipts in seconds.' : 
                     language === 'ur' ? 'میں سیکنڈوں میں آپ کی رسیدیں بنانے، ان کا انتظام کرنے یا ان کو مقامی بنانے میں آپ کی مدد کر سکتا ہوں۔' : 
                     'Main apki rashid banane aur manage karne mein help kar sakta hun.'}
                  </p>
                </div>
              )}

              {messages.map((m, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: m.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed max-w-[85%] ${
                    m.sender === 'user' 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm border border-slate-100 dark:border-slate-800'
                  } ${language === 'ur' && m.sender === 'bot' ? 'text-right' : ''}`}>
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-2 font-bold uppercase tracking-widest">{m.sender === 'user' ? 'You' : 'Assistant'}</span>
                </motion.div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-blue-600">
                    <div className="flex gap-1">
                      <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <div className="flex gap-3 items-center bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl border border-transparent focus-within:border-blue-500/50 focus-within:bg-white transition-all">
                <input 
                  value={input} 
                  onChange={e => setInput(e.target.value)} 
                  onKeyPress={e => e.key === 'Enter' && sendMessage()} 
                  dir={language === 'ur' ? 'rtl' : 'ltr'}
                  className="flex-1 bg-transparent px-3 py-2 outline-none text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:font-medium" 
                  placeholder={getPlaceholder()} 
                />
                <button 
                  onClick={sendMessage} 
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center shadow-lg shadow-blue-500/30 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="flex justify-between items-center mt-4">
                 <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Encrypted AI Channel</p>
                 <div className="flex gap-1">
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)} 
        className="w-16 h-16 bg-blue-600 text-white rounded-full shadow-[0_20px_50px_rgba(37,99,235,0.4)] flex items-center justify-center relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
              <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-4 border-slate-50 dark:border-slate-900 rounded-full" />
      </motion.button>
    </div>
  );
}
