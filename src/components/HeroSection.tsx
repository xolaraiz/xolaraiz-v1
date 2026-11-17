import { useState } from 'react';
import { ArrowRight, Sun, Sparkles } from 'lucide-react';
import { ORIENTATION_PRESETS, type OrientationPreset } from '../data/solarData';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onExplorePackages: () => void;
  onOpenCalculator: () => void;
  onOpenAiAssistant: () => void;
}

export default function HeroSection({
  onExplorePackages,
  onOpenCalculator,
  onOpenAiAssistant,
}: HeroSectionProps) {
  const { t, lang } = useLanguage();
  const [selectedPreset, setSelectedPreset] = useState<OrientationPreset>(ORIENTATION_PRESETS[0]);
  const [crestError, setCrestError] = useState(false);

  const angleDegrees =
    selectedPreset.id === 'south' ? -15 : selectedPreset.id === 'east-west' ? -10 : -5;

  const getPresetLabel = (id: string) => {
    if (id === 'south') return t.hero.tiltPresetSouth;
    if (id === 'east-west') return t.hero.tiltPresetEastWest;
    return t.hero.tiltPresetFlat;
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#071124] border-b border-[#D4AF37]/20"
    >
      {/* Subtle architectural hairline blueprint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 pt-12 pb-14 lg:pt-16 lg:pb-16">
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Core Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium text-[#E5C35E] tracking-wide mb-4">
              <span>{t.hero.badgePre}</span>
              <span aria-hidden="true" className="mx-2 text-[#D4AF37]/50">
                ·
              </span>
              <span className="text-slate-300">{t.hero.badgePost}</span>
            </p>

            <h1
              className="font-display font-bold text-white tracking-tight leading-[1.12] max-w-2xl"
              style={{
                fontSize: 'clamp(2.15rem, 3.8vw, 3.5rem)',
                textWrap: 'balance',
              }}
            >
              {t.hero.title}
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              {t.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExplorePackages}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#071124] bg-[#D4AF37] hover:bg-[#E5C35E] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-lg"
              >
                <span>{t.hero.btnPackages}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenCalculator}
                className="inline-flex items-center justify-center px-5 py-3.5 text-sm font-medium text-[#F3DC8D] hover:text-white border border-[#D4AF37]/35 hover:border-[#D4AF37] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.hero.btnCalculator}
              </button>

              <button
                type="button"
                onClick={onOpenAiAssistant}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-[#F5E096] bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#E5C35E]" />
                <span>{t.hero.btnAiScan}</span>
              </button>
            </div>

            <p className="mt-6 text-xs sm:text-sm text-slate-400">
              <span>{t.hero.cert1}</span>
              <span aria-hidden="true" className="mx-2 text-[#D4AF37]/50">
                ·
              </span>
              <span>{t.hero.cert2}</span>
              <span aria-hidden="true" className="mx-2 text-[#D4AF37]/50">
                ·
              </span>
              <span>{t.hero.cert3}</span>
            </p>
          </div>

          {/* Right Column: Official Crest & Interactive Cell Orientation Studio */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1 bg-[#0B1833] border border-[#D4AF37]/30 rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-xl">
              {/* Top Crest Medallion */}
              <div className="flex items-center gap-5 pb-5 border-b border-white/10">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-[#D4AF37]/70 bg-white shrink-0 flex items-center justify-center">
                  {!crestError ? (
                    <img
                      src="/assets/aistudio/29228_0419e174.jpg"
                      alt="XOLARAIZ X ECO Solar official crest emblem"
                      referrerPolicy="no-referrer"
                      onError={() => setCrestError(true)}
                      className="w-full h-full object-cover scale-[1.06]"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#071124] flex flex-col items-center justify-center text-[#D4AF37]">
                      <Sun className="w-8 h-8" />
                      <span className="font-display text-xs font-bold mt-1">XOLARAIZ</span>
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#E5C35E]">{t.hero.crestTitle}</p>
                  <h2 className="font-display text-lg sm:text-xl font-semibold text-white mt-0.5">
                    {t.hero.crestHeading}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {t.hero.crestSlogan}
                  </p>
                </div>
              </div>

              {/* Interactive Roof Array Tilt & Yield Simulator */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-medium text-slate-300">
                    {t.hero.arraySim}
                  </span>
                  <span className="font-mono text-xs text-[#E5C35E] tabular-nums">
                    {selectedPreset.tiltAngle}
                  </span>
                </div>

                {/* Segmented Orientation Selector */}
                <div
                  role="tablist"
                  aria-label="Solar roof orientation presets"
                  className="grid grid-cols-3 gap-1 p-1 bg-[#071124] border border-white/10 rounded-lg mb-4"
                >
                  {ORIENTATION_PRESETS.map((preset) => {
                    const active = preset.id === selectedPreset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSelectedPreset(preset)}
                        className={`px-2 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap truncate cursor-pointer ${
                          active
                            ? 'bg-[#D4AF37] text-[#071124] font-semibold'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {getPresetLabel(preset.id)}
                      </button>
                    );
                  })}
                </div>

                {/* Precision SVG Array Angle Diagram */}
                <div className="bg-[#071124] border border-white/10 rounded-xl p-4">
                  <svg
                    viewBox="0 0 360 130"
                    className="w-full h-28"
                    role="img"
                    aria-label={`Solar panel array tilt schematic for ${selectedPreset.label}`}
                  >
                    {/* Sun rays */}
                    <circle cx="305" cy="28" r="14" fill="#D4AF37" fillOpacity="0.2" />
                    <circle cx="305" cy="28" r="7" fill="#E5C35E" />
                    <line
                      x1="285"
                      y1="38"
                      x2="195"
                      y2="78"
                      stroke="#E5C35E"
                      strokeWidth="1.25"
                      strokeDasharray="4 4"
                      strokeOpacity="0.7"
                    />
                    <line
                      x1="295"
                      y1="46"
                      x2="225"
                      y2="88"
                      stroke="#E5C35E"
                      strokeWidth="1.25"
                      strokeDasharray="4 4"
                      strokeOpacity="0.5"
                    />

                    {/* Roof Deck Baseline */}
                    <line
                      x1="24"
                      y1="108"
                      x2="336"
                      y2="108"
                      stroke="#334155"
                      strokeWidth="1.5"
                    />

                    {/* Tilted Solar Cell Array */}
                    <g
                      transform={`translate(150, 96) rotate(${angleDegrees})`}
                      style={{ transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)' }}
                    >
                      {/* Aluminum mounting rail */}
                      <rect x="-95" y="4" width="190" height="4" rx="1" fill="#94A3B8" />
                      {/* Panel frame */}
                      <rect
                        x="-90"
                        y="-12"
                        width="180"
                        height="14"
                        rx="2"
                        fill="#0F2650"
                        stroke="#D4AF37"
                        strokeWidth="1.5"
                      />
                      {/* Cell grid lines */}
                      <line x1="-60" y1="-12" x2="-60" y2="2" stroke="#D4AF37" strokeOpacity="0.45" />
                      <line x1="-30" y1="-12" x2="-30" y2="2" stroke="#D4AF37" strokeOpacity="0.45" />
                      <line x1="0" y1="-12" x2="0" y2="2" stroke="#D4AF37" strokeOpacity="0.45" />
                      <line x1="30" y1="-12" x2="30" y2="2" stroke="#D4AF37" strokeOpacity="0.45" />
                      <line x1="60" y1="-12" x2="60" y2="2" stroke="#D4AF37" strokeOpacity="0.45" />
                    </g>

                    {/* Labels */}
                    <text x="24" y="24" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">
                      N-TYPE TOPCON MATRIX
                    </text>
                    <text x="24" y="124" fill="#64748B" fontSize="9.5" fontFamily="JetBrains Mono">
                      PEAK SUN: {selectedPreset.peakSunHours.toFixed(1)} HRS/DAY
                    </text>
                  </svg>
                </div>
              </div>

              {/* Live Tabular Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/10">
                <div>
                  <p className="text-xs text-slate-400">{t.hero.specYield}</p>
                  <p className="font-mono text-sm font-semibold text-white tabular-nums mt-0.5">
                    {selectedPreset.specificYield.split(' ')[0]}
                    <span className="text-xs font-normal text-slate-400 ml-1">kWh/kWp</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">{t.hero.efficiency}</p>
                  <p className="font-mono text-sm font-semibold text-[#E5C35E] tabular-nums mt-0.5">
                    {selectedPreset.efficiency}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">{t.hero.tempCoeff}</p>
                  <p className="font-mono text-sm font-semibold text-white tabular-nums mt-0.5">
                    {selectedPreset.tempCoeff}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Engineering Proof Strip */}
        <div className="mt-12 pt-8 border-t border-[#D4AF37]/20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-semibold text-[#E5C35E] tabular-nums">
              22.8%
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {t.hero.stat1Label}
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-semibold text-white tabular-nums">
              25–30 Yrs
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {t.hero.stat2Label}
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-semibold text-white tabular-nums">
              3.1–4.3 Yrs
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {t.hero.stat3Label}
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl sm:text-3xl font-semibold text-white tabular-nums">
              100%
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {t.hero.stat4Label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
