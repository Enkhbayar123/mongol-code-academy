import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#030712]/80 border-t border-white/5 mt-20 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Brand/About Section */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <Link to="/" className="text-2xl font-black tracking-wider gradient-text mb-4 inline-block hover:opacity-90 transition-opacity">
                Mongol Code Academy
              </Link>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-6">
                {t('footer_desc')}
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-5 border-l-2 border-sky-400 pl-3">
              {t('footer_links_section')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-400 hover:text-sky-400 text-sm transition-all duration-200 flex items-center gap-1 hover:translate-x-1">
                  <span>→</span> {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-slate-400 hover:text-sky-400 text-sm transition-all duration-200 flex items-center gap-1 hover:translate-x-1">
                  <span>→</span> {t('courses')}
                </Link>
              </li>
              <li>
                <Link to="/practice-hub" className="text-slate-400 hover:text-sky-400 text-sm transition-all duration-200 flex items-center gap-1 hover:translate-x-1">
                  <span>→</span> {t('practice')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-5 border-l-2 border-pink-500 pl-3">
              Academy
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-sky-400 text-sm transition-all duration-200 flex items-center gap-1 hover:translate-x-1">
                  <span>→</span> {t('footer_contact')}
                </Link>
              </li>
              <li>
                <Link to="/mongol-gpt" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold text-sm transition-all duration-200 flex items-center gap-1 hover:translate-x-1">
                  <span>→</span> MongolGPT
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Separator */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-xs text-slate-500">
            {t('footer_copyright')}
          </p>
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:text-sky-400 transition-colors flex items-center gap-1">
              <span>🐱</span> GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:text-sky-400 transition-colors flex items-center gap-1">
              <span>💼</span> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;