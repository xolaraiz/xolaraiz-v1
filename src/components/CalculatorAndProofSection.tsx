import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  CASE_STUDIES,
  SOLAR_PACKAGES,
  type CurrencyCode,
  type SolarPackage,
} from '../data/solarData';
import { formatMoney } from './PackagesSection';
import { useLanguage } from '../context/LanguageContext';

interface CalculatorAndProofSectionProps {
  currency: CurrencyCode;
  monthlyBillThb: number;
  onMonthlyBillChange: (bill: number) => void;
  onApplyRecommendation: (pkg: SolarPackage) => void;
}

type SunCondition = 'full' | 'moderate' | 'partial';
type UsageProfile = 'daytime' | 'balanced' | 'evening-hybrid';

const SUN_HOURS_MAP_TH: Record<SunCondition, { label: string; factor: number; hours: string }> = {
  full: { label: 'แดดจัดเต็มวัน ไม่มีร่มเงา (5.1 ชม./วัน)', factor: 1.0, hours: '5.1 ชม./วัน' },
  moderate: { label: 'มีเงาบังเล็กน้อยช่วงเช้า/เย็น (4.5 ชม./วัน)', factor: 0.88, hours: '4.5 ชม./วัน' },
  partial: { label: 'มีเงาต้นไม้หรืออาคารข้างเคียง (3.9 ชม./วัน)', factor: 0.76, hours: '3.9 ชม./วัน' },
};

const SUN_HOURS_MAP_EN: Record<SunCondition, { label: string; factor: number; hours: string }> = {
  full: { label: 'Unshaded Roof (5.1 hrs/day)', factor: 1.0, hours: '5.1 hrs/day' },
  moderate: { label: 'Light Morning Shade (4.5 hrs/day)', factor: 0.88, hours: '4.5 hrs/day' },
  partial: { label: 'Partial Obstruction (3.9 hrs/day)', factor: 0.76, hours: '3.9 hrs/day' },
};

const USAGE_MAP_TH: Record<UsageProfile, { label: string; selfConsumption: number; preferHybrid: boolean }> = {
  daytime: { label: 'ใช้ไฟกลางวันเป็นหลัก / โฮมออฟฟิศ (70% Day)', selfConsumption: 0.92, preferHybrid: false },
  balanced: { label: 'ครอบครัวทั่วไป ใช้ไฟสม่ำเสมอ (50% Day)', selfConsumption: 0.82, preferHybrid: true },
  'evening-hybrid': { label: 'เน้นเปิดแอร์กลางคืน + ชาร์จรถ EV (ระบบไฮบริด)', selfConsumption: 0.96, preferHybrid: true },
};

const USAGE_MAP_EN: Record<UsageProfile, { label: string; selfConsumption: number; preferHybrid: boolean }> = {
  daytime: { label: 'Daytime Home / Office (70% Day)', selfConsumption: 0.92, preferHybrid: false },
  balanced: { label: 'Balanced Family Load (50% Day)', selfConsumption: 0.82, preferHybrid: true },
  'evening-hybrid': { label: 'Night Cooling + EV (Battery)', selfConsumption: 0.96, preferHybrid: true },
};

export default function CalculatorAndProofSection({
  currency,
  monthlyBillThb,
  onMonthlyBillChange,
  onApplyRecommendation,
}: CalculatorAndProofSectionProps) {
  const { t, lang } = useLanguage();
  const [sunCondition, setSunCondition] = useState<SunCondition>('full');
  const [usageProfile, setUsageProfile] = useState<UsageProfile>('balanced');

  const sunMap = lang === 'th' ? SUN_HOURS_MAP_TH : SUN_HOURS_MAP_EN;
  const usageMap = lang === 'th' ? USAGE_MAP_TH : USAGE_MAP_EN;

  const simulation = useMemo(() => {
    const sun = sunMap[sunCondition];
    const usage = usageMap[usageProfile];

    // Pick closest appropriate XOLARAIZ package based on monthly utility spend & profile
    let recommended: SolarPackage = SOLAR_PACKAGES[0];
    if (monthlyBillThb >= 45000) {
      recommended = SOLAR_PACKAGES[4]; // X-Industrial 100 kW
    } else if (monthlyBillThb >= 22000) {
      recommended = SOLAR_PACKAGES[3]; // X-Biz 50 kW
    } else if (monthlyBillThb >= 9500) {
      recommended = SOLAR_PACKAGES[2]; // X-Villa 15 kW
    } else if (monthlyBillThb >= 4800 || usage.preferHybrid) {
      recommended = SOLAR_PACKAGES[1]; // X-Prime 10 kW Hybrid
    } else {
      recommended = SOLAR_PACKAGES[0]; // X-Home 5 kW
    }

    const annualGenerationKwh = Math.round(recommended.monthlyGenerationKwh * 12 * sun.factor);
    const tariffRateThb = 4.65; // Average residential/commercial Ft blended rate
    const rawMonthlyOffsetThb = (annualGenerationKwh / 12) * tariffRateThb * usage.selfConsumption;
    const estimatedMonthlySavingsThb = Math.min(
      Math.round(rawMonthlyOffsetThb),
      Math.round(monthlyBillThb * 0.88)
    );
    const annualSavingsThb = estimatedMonthlySavingsThb * 12;
    const paybackYears = Number(
      Math.max(2.4, recommended.priceThb / Math.max(annualSavingsThb, 1)).toFixed(1)
    );
    const twentyFiveYearSavingsThb = Math.round(annualSavingsThb * 25 * 0.94 - recommended.priceThb);
    const co2TonsPerYear = Number(((annualGenerationKwh * 0.00049) / 1).toFixed(1));

    // Build 10-year cumulative cashflow curve (Year 0 to Year 10)
    const yearlyPoints = Array.from({ length: 11 }, (_, year) => {
      const cumulativeSavings = annualSavingsThb * year;
      const netPositionThb = cumulativeSavings - recommended.priceThb;
      return {
        year,
        netPositionThb,
        gridOnlySpendThb: monthlyBillThb * 12 * year,
      };
    });

    return {
      recommended,
      annualGenerationKwh,
      estimatedMonthlySavingsThb,
      annualSavingsThb,
      paybackYears,
      twentyFiveYearSavingsThb,
      co2TonsPerYear,
      yearlyPoints,
    };
  }, [monthlyBillThb, sunCondition, usageProfile, lang]);

  // SVG Chart Geometry
  const chartWidth = 540;
  const chartHeight = 190;
  const padLeft = 58;
  const padRight = 18;
  const padTop = 18;
  const padBottom = 28;
  const plotW = chartWidth - padLeft - padRight;
  const plotH = chartHeight - padTop - padBottom;

  const minVal = -simulation.recommended.priceThb;
  const maxVal = Math.max(
    simulation.yearlyPoints[10].netPositionThb,
    simulation.recommended.priceThb * 0.5
  );
  const range = Math.max(maxVal - minVal, 1);

  const toX = (year: number) => padLeft + (year / 10) * plotW;
  const toY = (val: number) => padTop + ((maxVal - val) / range) * plotH;
  const zeroY = toY(0);

  const linePath = simulation.yearlyPoints
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${toX(pt.year).toFixed(1)} ${toY(pt.netPositionThb).toFixed(1)}`)
    .join(' ');

  const breakevenX = toX(Math.min(10, simulation.paybackYears));
  const estSavingsUsd = Math.round(simulation.estimatedMonthlySavingsThb / 34.8);
  const net25Usd = Math.round(simulation.twentyFiveYearSavingsThb / 34.8);

  return (
    <section id="calculator" className="bg-[#F7F8FA] text-[#071124] py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Calculator Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wide text-[#9A7815]">
            {t.calculator.badge}
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold text-[#071124] tracking-tight mt-2"
            style={{ textWrap: 'balance' }}
          >
            {t.calculator.title}
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            {t.calculator.description}
          </p>
        </div>

        {/* Interactive Calculator Container */}
        <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 shadow-sm">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="monthly-bill-slider" className="text-sm font-semibold text-[#071124]">
                  {t.calculator.billLabel}
                </label>
                <span className="font-mono text-lg font-bold text-[#9A7815] tabular-nums">
                  {formatMoney(monthlyBillThb, Math.round(monthlyBillThb / 34.8), currency)}
                </span>
              </div>
              <input
                id="monthly-bill-slider"
                type="range"
                min={2500}
                max={80000}
                step={500}
                value={monthlyBillThb}
                onChange={(e) => onMonthlyBillChange(Number(e.target.value))}
                className="mt-3 w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="mt-1.5 flex justify-between text-xs font-mono text-slate-500 tabular-nums">
                <span>{currency === 'THB' ? '฿2,500' : '$72'}</span>
                <span>{currency === 'THB' ? '฿40,000' : '$1,150'}</span>
                <span>{currency === 'THB' ? '฿80,000' : '$2,300'}</span>
              </div>
            </div>

            <div>
              <span className="block text-sm font-semibold text-[#071124] mb-2.5">
                {t.calculator.sunExposure}
              </span>
              <div className="grid grid-cols-1 gap-2">
                {(['full', 'moderate', 'partial'] as const).map((key) => {
                  const active = sunCondition === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSunCondition(key)}
                      className={`px-3.5 py-2.5 text-left text-xs sm:text-sm rounded-lg border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#071124] text-white border-[#071124] font-medium'
                          : 'bg-[#F7F8FA] text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {sunMap[key].label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="block text-sm font-semibold text-[#071124] mb-2.5">
                {t.calculator.loadSchedule}
              </span>
              <div className="grid grid-cols-1 gap-2">
                {(['daytime', 'balanced', 'evening-hybrid'] as const).map((key) => {
                  const active = usageProfile === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setUsageProfile(key)}
                      className={`px-3.5 py-2.5 text-left text-xs sm:text-sm rounded-lg border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#071124] text-white border-[#071124] font-medium'
                          : 'bg-[#F7F8FA] text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {usageMap[key].label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Calculated Output + Breakeven Chart Column */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="bg-[#071124] text-white rounded-xl p-6 border border-[#D4AF37]/30 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div>
                  <p className="text-xs text-[#E5C35E] font-medium">{t.calculator.recommendedConfig}</p>
                  <h3 className="font-display text-2xl font-bold text-white mt-0.5">
                    {simulation.recommended.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {simulation.recommended.panelModel} · {simulation.recommended.roofAreaSqm} m² roof
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs text-slate-400">{t.calculator.investment}</p>
                  <p className="font-mono text-2xl font-semibold text-[#E5C35E] tabular-nums">
                    {formatMoney(
                      simulation.recommended.priceThb,
                      simulation.recommended.priceUsd,
                      currency
                    )}
                  </p>
                </div>
              </div>

              {/* 4 Key Calculated Outputs */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-slate-400">{t.calculator.monthlySavings}</p>
                  <p className="font-mono text-lg font-semibold text-white tabular-nums mt-0.5">
                    {formatMoney(simulation.estimatedMonthlySavingsThb, estSavingsUsd, currency)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">{t.calculator.paybackWindow}</p>
                  <p className="font-mono text-lg font-semibold text-[#E5C35E] tabular-nums mt-0.5">
                    {simulation.paybackYears} {lang === 'th' ? 'ปี' : 'Yrs'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">{t.calculator.annualYield}</p>
                  <p className="font-mono text-lg font-semibold text-white tabular-nums mt-0.5">
                    {simulation.annualGenerationKwh.toLocaleString('en-US')} kWh
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">{t.calculator.netReturn25}</p>
                  <p className="font-mono text-lg font-semibold text-emerald-400 tabular-nums mt-0.5">
                    {formatMoney(simulation.twentyFiveYearSavingsThb, net25Usd, currency)}
                  </p>
                </div>
              </div>
            </div>

            {/* 10-Year Cumulative Cashflow Chart */}
            <div className="bg-[#F7F8FA] border border-slate-200 rounded-xl p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <p className="text-xs font-semibold text-[#071124]">
                  {t.calculator.chartTitle}
                </p>
                <p className="font-mono text-xs text-slate-600 tabular-nums">
                  {t.calculator.co2Label}: {simulation.co2TonsPerYear} tons/yr
                </p>
              </div>

              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-auto"
                role="img"
                aria-label="10-year cumulative solar return and breakeven chart"
              >
                {/* Zero / Breakeven Axis */}
                <line
                  x1={padLeft}
                  y1={zeroY}
                  x2={chartWidth - padRight}
                  y2={zeroY}
                  stroke="#94A3B8"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={padLeft - 8}
                  y={zeroY + 4}
                  textAnchor="end"
                  fill="#475569"
                  fontSize="9.5"
                  fontFamily="JetBrains Mono"
                >
                  0
                </text>

                {/* Year 0 Initial Outlay Label */}
                <text
                  x={padLeft - 8}
                  y={toY(minVal) + 3}
                  textAnchor="end"
                  fill="#64748B"
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                >
                  {currency === 'THB'
                    ? `-${Math.round(simulation.recommended.priceThb / 1000)}k`
                    : `-$${Math.round(simulation.recommended.priceUsd / 1000)}k`}
                </text>

                {/* Year 10 Net Positive Label */}
                <text
                  x={padLeft - 8}
                  y={toY(maxVal) + 4}
                  textAnchor="end"
                  fill="#9A7815"
                  fontSize="9.5"
                  fontFamily="JetBrains Mono"
                  fontWeight="600"
                >
                  {currency === 'THB'
                    ? `+${Math.round(maxVal / 1000)}k`
                    : `+$${Math.round(maxVal / 34.8 / 1000)}k`}
                </text>

                {/* Cumulative Cashflow Line */}
                <path
                  d={linePath}
                  fill="none"
                  stroke="#071124"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Breakeven Marker */}
                {simulation.paybackYears <= 10 && (
                  <g>
                    <line
                      x1={breakevenX}
                      y1={padTop}
                      x2={breakevenX}
                      y2={chartHeight - padBottom}
                      stroke="#D4AF37"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    <circle cx={breakevenX} cy={zeroY} r="5" fill="#D4AF37" stroke="#071124" strokeWidth="1.5" />
                    <text
                      x={Math.min(breakevenX + 8, chartWidth - 110)}
                      y={zeroY - 10}
                      fill="#9A7815"
                      fontSize="10"
                      fontFamily="JetBrains Mono"
                      fontWeight="600"
                    >
                      {lang === 'th' ? `คืนทุน ${simulation.paybackYears} ปี` : `Breakeven ${simulation.paybackYears}y`}
                    </text>
                  </g>
                )}

                {/* X-Axis Year Ticks */}
                {[0, 2, 4, 6, 8, 10].map((yr) => (
                  <text
                    key={yr}
                    x={toX(yr)}
                    y={chartHeight - 8}
                    textAnchor="middle"
                    fill="#64748B"
                    fontSize="9.5"
                    fontFamily="JetBrains Mono"
                  >
                    Y{yr}
                  </text>
                ))}
              </svg>

              <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-slate-600">
                  {t.calculator.chartDisclaimer}
                </p>
                <button
                  type="button"
                  onClick={() => onApplyRecommendation(simulation.recommended)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#071124] bg-[#D4AF37] hover:bg-[#E5C35E] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow"
                >
                  <span>{t.calculator.reserveBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Adjacent Proof of Impact / Verified Installations */}
        <div id="projects" className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#9A7815]">
                {t.calculator.projectsBadge}
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#071124] mt-1.5">
                {t.calculator.projectsTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              {t.calculator.projectsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CASE_STUDIES.map((study) => (
              <article
                key={study.id}
                className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <p className="text-xs text-slate-500 font-medium">
                    <span>{study.sector}</span>
                    <span aria-hidden="true" className="mx-1.5 text-[#B08D22]">
                      ·
                    </span>
                    <span>{study.location}</span>
                  </p>

                  <h4 className="font-display text-xl font-bold text-[#071124] mt-2">
                    {study.title}
                  </h4>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{study.summary}</p>
                </div>

                <div className="mt-6">
                  <div className="grid grid-cols-3 gap-4 py-4 px-4 bg-[#F7F8FA] border border-slate-200 rounded-xl">
                    <div>
                      <p className="text-[11px] text-slate-500">{lang === 'th' ? 'ผลิตไฟฟ้าต่อปี' : 'Annual Output'}</p>
                      <p className="font-mono text-xs sm:text-sm font-semibold text-[#071124] tabular-nums mt-0.5">
                        {study.annualYield}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500">{lang === 'th' ? 'ลดค่าใช้จ่าย' : 'Cost Reduction'}</p>
                      <p className="font-mono text-xs sm:text-sm font-semibold text-[#9A7815] tabular-nums mt-0.5">
                        {study.billReduction}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500">{lang === 'th' ? 'คืนทุนจริง' : 'Payback'}</p>
                      <p className="font-mono text-xs sm:text-sm font-semibold text-[#071124] tabular-nums mt-0.5">
                        {study.paybackPeriod}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">{study.attribution}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
