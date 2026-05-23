import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { askGeminiCounselor } from '../utils/gemini';

const MongolGPT = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Re-translate or initialize welcome message when language changes
  useEffect(() => {
    if (messages.length === 0 || (messages.length === 1 && messages[0].sender === 'ai')) {
      setMessages([
        {
          sender: 'ai',
          text: t('mongolgpt_welcome')
        }
      ]);
    }
  }, [language]);

  // Auto-scroll chat window inside the scrollable container only
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || loading) return;

    const userText = inputText;
    setInputText('');

    // 1. Add user message
    const userMsg = { sender: 'user', text: userText };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setLoading(true);

    try {
      // 2. Call Gemini counselor helper with the active language parameter
      const aiResponseText = await askGeminiCounselor(updatedHistory, language);
      
      // 3. Add AI message
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponseText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev, 
        { sender: 'ai', text: t('mongolgpt_error') }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedPrompt = (promptKey) => {
    setInputText(t(promptKey));
  };

  return (
    <div className="min-h-[calc(100vh-80px)] text-white flex flex-col items-center pt-28 pb-16 px-4 sm:px-8 relative z-10">
      <div className="w-full max-w-4xl flex-grow flex flex-col glass-card rounded-3xl overflow-hidden shadow-2xl border border-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 pointer-events-none"></div>

        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-slate-950/40 backdrop-blur-md flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-black text-xl shadow-lg shadow-purple-500/25 animate-pulse">
              GPT
            </div>
            <div>
              <h1 className="font-extrabold text-lg sm:text-xl tracking-wide gradient-text">MongolGPT</h1>
              <p className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                AI Assistant Engine Ready
              </p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div ref={chatContainerRef} className="flex-grow p-6 overflow-y-auto space-y-6 max-h-[50vh] sm:max-h-[55vh] z-10 scroll-reveal">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className="flex items-start gap-3.5 max-w-[85%] sm:max-w-[75%]">
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-black shadow-md shadow-purple-500/20 shrink-0 select-none">
                    AI
                  </div>
                )}
                <div
                  className={`rounded-2xl p-4 text-sm leading-relaxed shadow-xl border whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-sky-500 to-indigo-600 border-sky-400/20 text-white rounded-tr-none'
                      : 'bg-white/5 border-white/5 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start animate-pulse">
              <div className="flex items-start gap-3.5 max-w-[85%] sm:max-w-[75%]">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-black shadow-md shadow-purple-500/20 shrink-0 select-none">
                  AI
                </div>
                <div className="rounded-2xl p-4 text-sm bg-white/5 border border-white/5 text-slate-400 rounded-tl-none flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="px-6 py-4 border-t border-white/5 flex gap-3 overflow-x-auto whitespace-nowrap bg-slate-950/30 z-10">
          <button 
            onClick={() => handleSuggestedPrompt('mongolgpt_suggested_roadmap_prompt')}
            className="text-xs bg-white/5 hover:bg-sky-500/10 border border-white/10 hover:border-sky-500/30 px-4 py-2.5 rounded-2xl text-slate-300 font-semibold transition-all duration-200 shadow-sm"
          >
            {t('mongolgpt_suggested_roadmap_btn')}
          </button>
          <button 
            onClick={() => handleSuggestedPrompt('mongolgpt_suggested_career_prompt')}
            className="text-xs bg-white/5 hover:bg-sky-500/10 border border-white/10 hover:border-sky-500/30 px-4 py-2.5 rounded-2xl text-slate-300 font-semibold transition-all duration-200 shadow-sm"
          >
            {t('mongolgpt_suggested_career_btn')}
          </button>
          <button 
            onClick={() => handleSuggestedPrompt('mongolgpt_suggested_stress_prompt')}
            className="text-xs bg-white/5 hover:bg-sky-500/10 border border-white/10 hover:border-sky-500/30 px-4 py-2.5 rounded-2xl text-slate-300 font-semibold transition-all duration-200 shadow-sm"
          >
            {t('mongolgpt_suggested_stress_btn')}
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-5 border-t border-white/5 bg-slate-950/40 backdrop-blur-md flex gap-4 z-10">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            placeholder={loading ? t('mongolgpt_placeholder_loading') : t('mongolgpt_placeholder')}
            className="flex-grow bg-white/5 border border-white/5 focus:border-sky-500/40 focus:ring-1 focus:ring-sky-500/30 rounded-2xl px-5 py-4 text-sm focus:outline-none transition-all duration-300 placeholder-slate-500 text-slate-100 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-sky-500/15 flex items-center justify-center gap-2 text-sm transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{t('mongolgpt_send')}</span>
            <span>🚀</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MongolGPT;
