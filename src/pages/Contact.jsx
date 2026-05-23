import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Simulate successful form submit
    setFormSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] text-white pt-28 pb-16 relative overflow-hidden flex flex-col justify-start z-10">
      {/* Background glow elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight gradient-text">
            {t('contact_title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-semibold">
            {t('contact_desc')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Panel */}
          <div className="md:col-span-5 glass-card rounded-3xl p-10 backdrop-blur-md flex flex-col justify-between shadow-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-100 mb-8 border-b border-white/5 pb-5 flex items-center gap-3">
                <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('contact_info_title')}
              </h2>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0 text-sky-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Email Support</h4>
                    <a href="mailto:Enkhbayare111@gmail.com" className="text-slate-200 hover:text-sky-400 transition-colors text-sm font-bold">
                      Enkhbayare111@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 text-purple-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">GitHub Repository</h4>
                    <a href="https://github.com/Enkhbayar123" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-purple-400 transition-colors text-sm font-bold">
                      github.com/mongol-code-academy
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">LinkedIn Profile</h4>
                    <a href="https://www.linkedin.com/in/enkhbayar-enkhbaatar-2063b9312" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-emerald-400 transition-colors text-sm font-bold">
                      linkedin.com/in/mongol-code-academy
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-xs text-slate-500 flex justify-between items-center relative z-10 font-bold">
              <span>Active Response Period</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                Under 12 hours
              </span>
            </div>
          </div>

          {/* Contact Form Panel */}
          <div className="md:col-span-7 glass-card rounded-3xl p-10 backdrop-blur-md flex flex-col justify-center shadow-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-100 mb-8 border-b border-white/5 pb-5 flex items-center gap-3">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                {t('contact_form_title')}
              </h2>

              {formSubmitted ? (
                <div className="text-center py-12 animate-fade-in flex flex-col items-center">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/5">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-slate-100 mb-2">Message Sent Successfully!</h3>
                  <p className="text-slate-400 text-sm font-semibold max-w-sm">
                    Thank you for reaching out. We have received your message and will respond as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                      {t('contact_name_label')}
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('contact_name_placeholder')}
                      className="w-full bg-white/5 border border-white/10 text-slate-100 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 rounded-2xl px-5 py-3.5 text-sm transition-all duration-300 placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                      {t('contact_email_label')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('contact_email_placeholder')}
                      className="w-full bg-white/5 border border-white/10 text-slate-100 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 rounded-2xl px-5 py-3.5 text-sm transition-all duration-300 placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                      {t('contact_msg_label')}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows="5"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('contact_msg_placeholder')}
                      className="w-full bg-white/5 border border-white/10 text-slate-100 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 rounded-2xl px-5 py-3.5 text-sm transition-all duration-300 placeholder-slate-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-sky-500/20 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    {t('contact_send_btn')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
