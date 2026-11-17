import { useState } from 'react';
import { Check } from 'lucide-react';
import { SERVICE_CAPABILITIES } from '../data/solarData';
import { useLanguage } from '../context/LanguageContext';

type BlueprintMode = 'on-grid' | 'hybrid' | 'commercial';

interface BlueprintSpecItem {
  title: string;
  voltage: string;
  inverter: string;
  storage: string;
  protection: string;
  meterNote: string;
}

const BLUEPRINT_SPECS_TH: Record<BlueprintMode, BlueprintSpecItem> = {
  'on-grid': {
    title: 'สถาปัตยกรรมระบบออนกริดสำหรับบ้าน (5–10 kW)',
    voltage: '2 สตริง × 550V DC → 230V AC 1-Phase',
    inverter: 'Smart String Inverter Dual-MPPT (ประสิทธิภาพ EU 98.4%)',
    storage: 'จ่ายโหลดกลางวันโดยตรง + CT กันไฟย้อน (Zero-Export)',
    protection: 'ตู้รวมสาย DC IP65 + Type II Surge + เบรกเกอร์ AC RCBO',
    meterNote: 'รองรับการเชื่อมต่อมิเตอร์อิเล็กทรอนิกส์ PEA / MEA 100%',
  },
  hybrid: {
    title: 'ไมโครกริดไฮบริดพร้อมแบตเตอรี่ LiFePO4 (10–15 kW)',
    voltage: 'High-Voltage DC Bus + 51.2V / 400V LiFePO4',
    inverter: '10–15 kW Hybrid Inverter (สลับระบบฉุกเฉิน UPS <10ms)',
    storage: '10.24–15.36 kWh LiFePO4 (รอบการใช้งาน 6,000+ Cycles)',
    protection: 'ระบบตัดไฟประกายไฟ AFCI + ตู้จ่ายโหลดสำคัญ ATS',
    meterNote: 'จ่ายไฟกลางคืน Peak-Shaving + ไม่จ่ายไฟย้อนมิเตอร์',
  },
  commercial: {
    title: 'ระบบโรงงานและอาคารพาณิชย์ (50–100+ kW)',
    voltage: 'Multi-MPPT 1,000V DC → 400V AC 3-Phase',
    inverter: '50 kW Industrial String Inverters + SCADA Gateway',
    storage: 'จ่ายตรงเข้าระบบ Chiller, ปั๊มน้ำ และ HVAC โรงงาน',
    protection: 'Motorized MCCB, เสาล่อฟ้าแรงสูง & สวิตช์ตัดไฟนักผจญเพลิง',
    meterNote: 'ขนานไฟตรงเข้าตู้ Main Distribution Board (MDB)',
  },
};

const BLUEPRINT_SPECS_EN: Record<BlueprintMode, BlueprintSpecItem> = {
  'on-grid': {
    title: 'Residential On-Grid Architecture (5–10 kW)',
    voltage: '2 Strings × 550V DC → 230V AC 1-Phase',
    inverter: 'Dual-MPPT Smart String Inverter (98.4% EU Eff.)',
    storage: 'Direct Daytime Load + Zero-Export CT Limiter',
    protection: 'IP65 DC Combiner + Type II Surge + AC RCBO',
    meterNote: 'PEA / MEA Bidirectional Smart Meter Sync',
  },
  hybrid: {
    title: 'Hybrid LiFePO4 Microgrid (10–15 kW)',
    voltage: 'High-Voltage DC Bus + 51.2V / 400V LiFePO4',
    inverter: '10–15 kW Hybrid Inverter (<10ms UPS Switch)',
    storage: '10.24–15.36 kWh LiFePO4 (6,000+ Cycles)',
    protection: 'AFCI Arc-Fault Detection + ATS Critical Load Panel',
    meterNote: 'Zero-Export + Peak-Shaving Night Dispatch',
  },
  commercial: {
    title: 'Commercial & Industrial Plant (50–100+ kW)',
    voltage: 'Multi-MPPT 1,000V DC → 400V AC 3-Phase',
    inverter: '50 kW Industrial String Inverters + SCADA Gateway',
    storage: 'Daytime Factory Chiller & HVAC Direct Tie-In',
    protection: 'Motorized MCCB, Lightning Arrestor & Rapid Shutdown',
    meterNote: 'MDB Main Bus Synchronization + Grid Relay',
  },
};

export default function ServicesSection() {
  const { t, lang } = useLanguage();
  const [blueprintMode, setBlueprintMode] = useState<BlueprintMode>('hybrid');
  const activeSpec = lang === 'th' ? BLUEPRINT_SPECS_TH[blueprintMode] : BLUEPRINT_SPECS_EN[blueprintMode];

  return (
    <section id="services" className="bg-[#F7F8FA] text-[#071124] py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wide text-[#9A7815]">
            {t.services.badge}
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold text-[#071124] tracking-tight mt-2"
            style={{ textWrap: 'balance' }}
          >
            {t.services.title}
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            {t.services.description}
          </p>
        </div>

        {/* Asymmetric 3-Column Bento Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SERVICE_CAPABILITIES.map((service, idx) => {
            const title =
              lang === 'th'
                ? idx === 0
                  ? t.services.s1Title
                  : idx === 1
                  ? t.services.s2Title
                  : idx === 2
                  ? t.services.s3Title
                  : t.services.s4Title
                : service.title;

            const desc =
              lang === 'th'
                ? idx === 0
                  ? t.services.s1Desc
                  : idx === 1
                  ? t.services.s2Desc
                  : idx === 2
                  ? t.services.s3Desc
                  : t.services.s4Desc
                : service.description;

            return (
              <article
                key={service.id}
                className={`bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between transition-colors duration-150 hover:border-[#B08D22]/60 shadow-sm ${
                  service.span === 'wide' ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-slate-100">
                    <span className="font-mono text-sm font-semibold text-[#9A7815] tabular-nums">
                      {service.number}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{service.subtitle}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#071124] mt-5">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                    {desc}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {service.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-[#9A7815] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{service.metricLabel}</span>
                  <span className="font-mono text-xs font-semibold text-[#071124] bg-slate-100 px-3 py-1 rounded-md">
                    {service.metricValue}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Blueprint Electrical Schematic Interactive Sub-section */}
        <div id="design-blueprint" className="mt-16 bg-[#0B1833] text-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#D4AF37]/30 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#E5C35E]">
                {lang === 'th' ? 'สเปกวิศวกรรมไฟฟ้าและแปลนระบบ' : 'Electrical System Architecture'}
              </p>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                {activeSpec.title}
              </h3>
            </div>

            <div className="flex p-1 bg-[#071124] border border-white/10 rounded-lg text-xs font-medium">
              {(['on-grid', 'hybrid', 'commercial'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setBlueprintMode(mode)}
                  className={`px-3 py-1.5 rounded transition-colors capitalize cursor-pointer ${
                    blueprintMode === mode
                      ? 'bg-[#D4AF37] text-[#071124] font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {mode === 'on-grid'
                    ? lang === 'th'
                      ? 'ออนกริด'
                      : 'On-Grid'
                    : mode === 'hybrid'
                    ? lang === 'th'
                      ? 'ไฮบริด'
                      : 'Hybrid'
                    : lang === 'th'
                    ? 'โรงงาน'
                    : 'Commercial'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#071124] p-4 rounded-xl border border-white/10">
              <span className="text-slate-400 block mb-1">
                {lang === 'th' ? 'ระดับแรงดันและสตริง DC' : 'DC String & Voltage'}
              </span>
              <p className="text-sm font-semibold text-white">{activeSpec.voltage}</p>
            </div>
            <div className="bg-[#071124] p-4 rounded-xl border border-white/10">
              <span className="text-slate-400 block mb-1">
                {lang === 'th' ? 'สเปกอินเวอร์เตอร์' : 'Inverter Topology'}
              </span>
              <p className="text-sm font-semibold text-white">{activeSpec.inverter}</p>
            </div>
            <div className="bg-[#071124] p-4 rounded-xl border border-white/10">
              <span className="text-slate-400 block mb-1">
                {lang === 'th' ? 'ระบบกักเก็บพลังงาน / กันไฟย้อน' : 'Energy Storage / Export Control'}
              </span>
              <p className="text-sm font-semibold text-white">{activeSpec.storage}</p>
            </div>
            <div className="bg-[#071124] p-4 rounded-xl border border-white/10">
              <span className="text-slate-400 block mb-1">
                {lang === 'th' ? 'การขนานมิเตอร์ไฟฟ้า' : 'Grid Interconnection'}
              </span>
              <p className="text-sm font-semibold text-[#E5C35E]">{activeSpec.meterNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
