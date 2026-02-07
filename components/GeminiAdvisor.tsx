
import React, { useState, useRef, useEffect } from 'react';
import { getCourseAdvice } from '../services/geminiService';

interface GeminiAdvisorProps {
  theme?: 'hacks' | 'speed';
}

const GeminiAdvisor: React.FC<GeminiAdvisorProps> = ({ theme = 'hacks' }) => {
  const isSpeed = theme === 'speed';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await getCourseAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[110]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`size-14 md:size-16 rounded-[22px] flex items-center justify-center shadow-2xl transition-all hover:scale-110 border-2 ${isSpeed ? 'bg-blue-600 text-white border-blue-400' : 'btn-gold border-white/40'}`}
        >
          <span className="material-symbols-outlined text-3xl">psychology</span>
        </button>
      ) : (
        <div className={`w-[280px] md:w-[350px] rounded-[32px] overflow-hidden flex flex-col max-h-[480px] shadow-2xl animate-in slide-in-from-bottom-8 duration-300 border-2 ${isSpeed ? 'bg-white border-blue-200' : 'bg-[#f3e9dc] border-white'}`}>
          <div className={`p-4 flex justify-between items-center border-b transition-colors ${isSpeed ? 'bg-blue-950 text-white border-blue-800' : 'bg-wood-dark text-white border-primary/20'}`}>
            <div className="flex items-center gap-3">
              <div className={`size-9 rounded-lg flex items-center justify-center transition-colors ${isSpeed ? 'bg-blue-600 text-white' : 'bg-primary text-wood-dark'}`}>
                <span className="material-symbols-outlined text-[20px] font-bold">all_inclusive</span>
              </div>
              <div>
                <span className="font-black text-sm tracking-tight block leading-none">SMART Advisor</span>
                <span className={`text-[8px] font-black uppercase tracking-widest block ${isSpeed ? 'text-green-400' : 'text-primary/80'}`}>Concise Help</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className={`transition-colors flex items-center p-1 ${isSpeed ? 'hover:text-green-400' : 'hover:text-primary'}`}>
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
          
          <div ref={scrollRef} className={`flex-1 overflow-y-auto p-4 space-y-4 min-h-[250px] scroll-smooth transition-colors ${isSpeed ? 'bg-blue-50/50' : 'bg-wood-pale/30'}`}>
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full pt-4 text-center">
                <p className={`text-[11px] italic font-bold leading-relaxed max-w-[200px] ${isSpeed ? 'text-blue-900/60' : 'text-wood-dark/60'}`}>
                  "Ask me anything about our free workshops."
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-3 px-4 rounded-[20px] text-[12px] font-bold shadow-sm leading-relaxed ${
                  m.role === 'user' 
                    ? (isSpeed ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-wood-dark text-white rounded-tr-none') 
                    : (isSpeed ? 'bg-white text-blue-900 rounded-tl-none border border-blue-100' : 'bg-white text-wood-dark rounded-tl-none border border-white')
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`p-3 rounded-[20px] rounded-tl-none animate-pulse text-[8px] font-black uppercase tracking-widest flex items-center gap-2 ${isSpeed ? 'bg-blue-100 text-blue-800' : 'bg-white/50 text-wood-med'}`}>
                  <span className={`size-1.5 rounded-full animate-ping ${isSpeed ? 'bg-blue-600' : 'bg-primary'}`}></span>
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className={`p-4 border-t flex gap-2 backdrop-blur-md transition-colors ${isSpeed ? 'bg-blue-50/80 border-blue-100' : 'bg-white/40 border-white'}`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask away..."
              className={`flex-1 text-[12px] rounded-[14px] focus:ring-0 h-11 px-4 font-bold shadow-inner border transition-all ${isSpeed ? 'bg-white border-blue-100 focus:border-blue-600 text-blue-900' : 'bg-white/90 border-primary/10 focus:border-primary text-wood-dark'}`}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className={`size-11 rounded-[14px] flex items-center justify-center disabled:opacity-50 border border-white/20 transition-all ${isSpeed ? 'bg-blue-600 text-white hover:bg-green-600' : 'btn-gold'}`}
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiAdvisor;
