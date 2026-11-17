import { useState } from 'react';
import { Sun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-[#050B18] text-slate-300 py-12">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-[#D4AF37]/60 bg-white shrink-0 flex items-center justify-center">
              {!logoError ? (
                <img
                  src="/assets/aistudio/29228_0419e174.jpg"
                  alt="XOLARAIZ X ECO Solar Crest"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                  className="w-full h-full object-cover scale-[1.06]"
                />
              ) : (
                <div className="w-full h-full bg-[#071124] flex items-center justify-center text-[#D4AF37]">
                  <Sun className="w-5 h-5" />
                </div>
              )}
            </div>

            <div>
              <p className="font-display text-lg font-bold text-white tracking-tight">XOLARAIZ</p>
              <p className="text-xs text-slate-400">
                {t.footer.tagline}
              </p>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-xs sm:text-sm">
            <a href="#services" className="hover:text-[#F3DC8D] transition-colors whitespace-nowrap">
              {t.nav.services}
            </a>
            <a href="#design-blueprint" className="hover:text-[#F3DC8D] transition-colors whitespace-nowrap">
              {t.nav.solarDesign}
            </a>
            <a href="#packages" className="hover:text-[#F3DC8D] transition-colors whitespace-nowrap">
              {t.nav.packages}
            </a>
            <a href="#calculator" className="hover:text-[#F3DC8D] transition-colors whitespace-nowrap">
              {t.nav.calculator}
            </a>
            <a href="#projects" className="hover:text-[#F3DC8D] transition-colors whitespace-nowrap">
              {t.nav.projects}
            </a>
            <a href="#contact" className="hover:text-[#F3DC8D] transition-colors whitespace-nowrap">
              {t.nav.requestSurvey}
            </a>
          </nav>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} XOLARAIZ · X ECO Solar. {t.footer.copyright}</p>
          <p>
            <span>{t.footer.standards}</span>
            <span aria-hidden="true" className="mx-2 text-[#D4AF37]/50">
              ·
            </span>
            <span>xecoxolaraiz@gmail.com</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
