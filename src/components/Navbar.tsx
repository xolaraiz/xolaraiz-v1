import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onRequestSurvey: () => void;
  onOpenAiAssistant: () => void;
  onOpenLeadAdmin: () => void;
}

export default function Navbar({
  onRequestSurvey,
  onOpenAiAssistant,
  onOpenLeadAdmin,
}: NavbarProps) {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.solarDesign, href: '#design-blueprint' },
    { label: t.nav.packages, href: '#packages' },
    { label: t.nav.calculator, href: '#calculator' },
    { label: t.nav.projects, href: '#projects' },
  ];

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#071124]/95 backdrop-blur-md border-b border-[#D4AF37]/20">
      <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight text-white hover:text-[#E5C35E] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>XOLARAIZ</span>
        </a>

        {/* Primary nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 hover:text-[#F3DC8D] transition-colors whitespace-nowrap shrink-0 after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions Zone */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language Switcher */}
          <div className="flex items-center p-0.5 bg-[#0B1833] border border-white/10 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLang('th')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                lang === 'th' ? 'bg-[#D4AF37] text-[#071124]' : 'text-slate-400 hover:text-white'
              }`}
            >
              TH
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                lang === 'en' ? 'bg-[#D4AF37] text-[#071124]' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* AI Assistant button */}
          <button
            type="button"
            onClick={onOpenAiAssistant}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#F3DC8D] hover:text-white bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5C35E]" />
            <span>{t.nav.aiAssistant}</span>
          </button>

          {/* Request Survey CTA */}
          <button
            type="button"
            onClick={onRequestSurvey}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-[#071124] bg-[#D4AF37] hover:bg-[#E5C35E] rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow"
          >
            {t.nav.requestSurvey}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 text-slate-200 hover:text-[#E5C35E] border border-[#D4AF37]/25 rounded-lg transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0B1833] border-b border-[#D4AF37]/25 px-6 py-4 shadow-xl">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="py-2 text-sm font-medium text-slate-200 hover:text-[#F3DC8D] border-b border-white/5 whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}

            <button
              type="button"
              onClick={() => {
                handleLinkClick();
                onOpenAiAssistant();
              }}
              className="mt-2 w-full py-2.5 px-4 text-xs font-semibold text-[#F3DC8D] bg-[#D4AF37]/15 border border-[#D4AF37]/40 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#E5C35E]" />
              <span>{t.nav.aiAssistant}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                handleLinkClick();
                onRequestSurvey();
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-[#071124] bg-[#D4AF37] hover:bg-[#E5C35E] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow"
            >
              {t.nav.requestSurvey}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
