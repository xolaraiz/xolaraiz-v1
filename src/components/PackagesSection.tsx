import { useEffect, useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import {
  SOLAR_PACKAGES,
  type CurrencyCode,
  type PackageCategory,
  type SolarPackage,
} from '../data/solarData';
import { useLanguage } from '../context/LanguageContext';

interface PackagesSectionProps {
  selectedPackageId: string;
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onSelectPackage: (pkg: SolarPackage) => void;
}

export function formatMoney(thb: number, usd: number, currency: CurrencyCode): string {
  if (currency === 'USD') {
    return `$${usd.toLocaleString('en-US')}`;
  }
  return `฿${thb.toLocaleString('en-US')}`;
}

export default function PackagesSection({
  selectedPackageId,
  currency,
  onCurrencyChange,
  onSelectPackage,
}: PackagesSectionProps) {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<PackageCategory>('all');
  const [specModalPkg, setSpecModalPkg] = useState<SolarPackage | null>(null);

  const categoryTabs: { id: PackageCategory; label: string }[] = [
    { id: 'all', label: t.packages.allTab },
    { id: 'residential', label: t.packages.resTab },
    { id: 'hybrid', label: t.packages.hybridTab },
    { id: 'commercial', label: t.packages.comTab },
  ];

  const filteredPackages =
    activeCategory === 'all'
      ? SOLAR_PACKAGES
      : SOLAR_PACKAGES.filter((pkg) => pkg.category === activeCategory);

  useEffect(() => {
    if (!specModalPkg) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSpecModalPkg(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [specModalPkg]);

  return (
    <section
      id="packages"
      className="bg-[#081329] text-white py-16 lg:py-24 border-b border-[#D4AF37]/20"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header & Interactive Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#E5C35E]">
              {t.packages.badge}
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2"
              style={{ textWrap: 'balance' }}
            >
              {t.packages.title}
            </h2>
            <p className="mt-3 text-base text-slate-300 leading-relaxed">
              {t.packages.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Currency Switch */}
            <div
              role="group"
              aria-label="Currency display"
              className="inline-flex items-center p-1 bg-[#071124] border border-white/10 rounded-lg"
            >
              {(['THB', 'USD'] as const).map((code) => {
                const active = currency === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => onCurrencyChange(code)}
                    className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-[#D4AF37] text-[#071124] font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {code === 'THB' ? 'THB (฿)' : 'USD ($)'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {categoryTabs.map((tab) => {
            const active = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#D4AF37] text-[#071124]'
                    : 'bg-[#0B1833] text-slate-300 hover:text-white border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Packages Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            return (
              <div
                key={pkg.id}
                className={`relative bg-[#0B1833] rounded-2xl p-6 sm:p-7 flex flex-col justify-between border transition-all duration-200 shadow-xl ${
                  isSelected
                    ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50'
                    : 'border-white/10 hover:border-[#D4AF37]/50'
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-3 right-6 bg-[#D4AF37] text-[#071124] text-[11px] font-bold px-3 py-0.5 rounded-full shadow">
                    {t.packages.recommendedBadge}
                  </div>
                )}

                <div>
                  <div className="flex items-baseline justify-between gap-2 pb-3 border-b border-white/10">
                    <span className="text-xs font-mono text-[#E5C35E] uppercase tracking-wider">
                      {pkg.phaseLabel}
                    </span>
                    <span className="text-xs text-slate-400">{pkg.categoryLabel}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mt-4">
                    {pkg.name}
                  </h3>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-bold text-[#E5C35E]">
                      {formatMoney(pkg.priceThb, pkg.priceUsd, currency)}
                    </span>
                    <span className="text-xs text-slate-400">
                      {lang === 'th' ? 'ราคารวมติดตั้งครบวงจร' : 'turnkey'}
                    </span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pkg.summary}
                  </p>

                  {/* Key Metrics */}
                  <div className="mt-5 grid grid-cols-2 gap-2 p-3 bg-[#071124] rounded-xl border border-white/5 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">{t.packages.capacity}</span>
                      <strong className="text-white font-mono">{pkg.capacityKw} kWp</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">{t.packages.panels}</span>
                      <strong className="text-white font-mono">{pkg.panelCount} แผง</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">{t.packages.monthlyGen}</span>
                      <strong className="text-white font-mono">~{pkg.monthlyGenerationKwh} kWh</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">{t.packages.payback}</span>
                      <strong className="text-emerald-400 font-mono">~{pkg.paybackYears} ปี</strong>
                    </div>
                  </div>

                  {/* Highlights List */}
                  <ul className="mt-5 space-y-2 text-xs text-slate-300">
                    {pkg.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#E5C35E] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg)}
                    className="w-full py-2.5 px-4 bg-[#D4AF37] hover:bg-[#E5C35E] text-[#071124] font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow"
                  >
                    <span>{t.packages.selectPackage}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpecModalPkg(pkg)}
                    className="w-full py-2 px-3 text-xs text-[#F3DC8D] hover:text-white border border-white/10 hover:border-[#D4AF37]/50 rounded-lg transition-colors cursor-pointer"
                  >
                    {t.packages.viewBom}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOM Detail Modal */}
      {specModalPkg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-[#0B1833] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-[#E5C35E]">{specModalPkg.phaseLabel}</span>
                <h3 className="font-display text-2xl font-bold text-white mt-0.5">
                  {specModalPkg.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{t.packages.bomModalTitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setSpecModalPkg(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <dl className="mt-6 space-y-4 text-xs sm:text-sm">
              <div className="p-3 bg-[#071124] rounded-lg border border-white/5">
                <dt className="text-slate-400 font-medium">Solar Modules (แผงโซลาร์เซลล์)</dt>
                <dd className="text-white font-semibold mt-1">{specModalPkg.bomDetails.cells}</dd>
              </div>
              <div className="p-3 bg-[#071124] rounded-lg border border-white/5">
                <dt className="text-slate-400 font-medium">Mounting & Structural (โครงสร้างยึดหลังคา)</dt>
                <dd className="text-white font-semibold mt-1">{specModalPkg.bomDetails.mounting}</dd>
              </div>
              <div className="p-3 bg-[#071124] rounded-lg border border-white/5">
                <dt className="text-slate-400 font-medium">Safety & Electrical Protection (ตู้คอนโทรล & อุปกรณ์ป้องกัน)</dt>
                <dd className="text-white font-semibold mt-1">{specModalPkg.bomDetails.protection}</dd>
              </div>
              <div className="p-3 bg-[#071124] rounded-lg border border-white/5">
                <dt className="text-slate-400 font-medium">Monitoring & Telemetry (ระบบติดตามการผลิต)</dt>
                <dd className="text-white font-semibold mt-1">{specModalPkg.bomDetails.monitoring}</dd>
              </div>
              <div className="p-3 bg-[#071124] rounded-lg border border-white/5">
                <dt className="text-slate-400 font-medium">Permits & Grid Connection (การยื่นขออนุญาต PEA/MEA)</dt>
                <dd className="text-white font-semibold mt-1">{specModalPkg.bomDetails.permits}</dd>
              </div>
              <div className="p-3 bg-[#071124] rounded-lg border border-white/5">
                <dt className="text-slate-400 font-medium">Warranty & Service (การรับประกันและบริการ)</dt>
                <dd className="text-[#E5C35E] font-semibold mt-1">{specModalPkg.bomDetails.warranty}</dd>
              </div>
            </dl>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setSpecModalPkg(null)}
                className="px-5 py-2 text-xs font-semibold text-[#071124] bg-[#D4AF37] hover:bg-[#E5C35E] rounded-lg transition-colors cursor-pointer"
              >
                {t.packages.bomClose}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
