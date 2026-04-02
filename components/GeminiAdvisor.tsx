import React, { useState, useRef, useEffect } from 'react';
import { getCourseAdvice } from '../services/geminiService';

interface GeminiAdvisorProps {
  theme?: 'hacks' | 'speed';
}

const GeminiAdvisor: React.FC<GeminiAdvisorProps> = ({ theme = 'hacks' }) => {
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
    <div className="fixed bottom-6 right-6 z-[250]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 bg-primary text-white hover:bg-primary-dark`}
        >
          <span className="material-symbols-outlined text-3xl">chat_bubble</span>
        </button>
      ) : (
        <div className={`w-[320px] rounded-[24px] overflow-hidden flex flex-col h-[500px] shadow-2xl animate-fade-in bg-surface border border-gray-100`}>
          <div className={`p-5 flex justify-between items-center bg-gray-50 border-b border-gray-100`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-primary text-white shadow-sm`}>
                <span className="material-symbols-outlined text-[20px] font-bold">bolt</span>
              </div>
              <div>
                <span className="font-display font-bold text-text-main block leading-tight">Advisor AI</span>
                <span className={`text-[10px] font-semibold uppercase tracking-widest block text-text-body`}>Prometheus Support</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className={`text-gray-400 hover:text-text-main transition-colors p-1 active:scale-95`}>
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
          
          <div ref={scrollRef} className={`flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth bg-background/50`}>
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className={`text-sm font-medium leading-relaxed max-w-[200px] text-text-body`}>
                  Need help choosing a class or event? Ask away!
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-[16px] text-[13px] font-medium leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-br-sm' 
                    : 'bg-white text-text-main border border-gray-100 rounded-bl-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`p-3 rounded-[16px] rounded-bl-sm font-medium text-[12px] flex items-center gap-2 bg-white text-text-body border border-gray-100 shadow-sm`}>
                  <span className={`w-1.5 h-1.5 rounded-full animate-bounce bg-primary`}></span>
                  <span className={`w-1.5 h-1.5 rounded-full animate-bounce bg-primary`}></span>
                  <span className={`w-1.5 h-1.5 rounded-full animate-bounce bg-primary`}></span>
                </div>
              </div>
            )}
          </div>

          <div className={`p-4 border-t border-gray-100 bg-white flex gap-3`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className={`flex-1 text-sm rounded-xl focus:ring-0 h-11 px-4 font-medium border border-gray-200 focus:border-primary transition-all text-text-main placeholder:text-gray-400`}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`w-11 h-11 rounded-xl flex items-center justify-center disabled:opacity-50 transition-all bg-primary text-white hover:bg-primary-dark active:scale-95`}
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
