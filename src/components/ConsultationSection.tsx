import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Mail, MapPin, Phone, MessageCircle, Copy, Check } from 'lucide-react';
import { SOLAR_PACKAGES, type CurrencyCode } from '../data/solarData';
import { formatMoney } from './PackagesSection';
import { useLanguage } from '../context/LanguageContext';
import { saveLead, createLineShareUrl, type SolarLead } from '../services/leadService';

interface ConsultationSectionProps {
  selectedPackageId: string;
  onPackageChange: (id: string) => void;
  monthlyBillThb: number;
  currency: CurrencyCode;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  propertyType: string;
  roofType: string;
  location: string;
  notes: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
}

export default function ConsultationSection({
  selectedPackageId,
  onPackageChange,
  monthlyBillThb,
  currency,
}: ConsultationSectionProps) {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    propertyType: lang === 'th' ? 'บ้านเดี่ยว / ทาวน์โฮม' : 'Residential Home',
    roofType: lang === 'th' ? 'กระเบื้องซีแพคโมเนีย (CPAC)' : 'Concrete Tile (CPAC)',
    location: '',
    notes: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [savedLead, setSavedLead] = useState<SolarLead | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedPkg =
    SOLAR_PACKAGES.find((p) => p.id === selectedPackageId) ?? SOLAR_PACKAGES[1];

  useEffect(() => {
    setSavedLead(null);
  }, [selectedPackageId]);

  const timelineSteps = [
    {
      step: '01.',
      title: t.consultation.timelineStep1Title,
      detail: t.consultation.timelineStep1Desc,
    },
    {
      step: '02.',
      title: t.consultation.timelineStep2Title,
      detail: t.consultation.timelineStep2Desc,
    },
    {
      step: '03.',
      title: t.consultation.timelineStep3Title,
      detail: t.consultation.timelineStep3Desc,
    },
    {
      step: '04.',
      title: t.consultation.timelineStep4Title,
      detail: t.consultation.timelineStep4Desc,
    },
  ];

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = lang === 'th' ? 'กรุณากรอกชื่อ-นามสกุล' : 'Please enter your full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = lang === 'th' ? 'กรุณากรอกอีเมลที่ถูกต้อง' : 'Please enter a valid email address.';
    }
    if (!/^[+\d\s()-]{8,18}$/.test(form.phone.trim())) {
      nextErrors.phone = lang === 'th' ? 'กรุณากรอกเบอร์โทรศัพท์อย่างน้อย 8-10 หลัก' : 'Please enter a valid phone number.';
    }
    if (!form.location.trim()) {
      nextErrors.location = lang === 'th' ? 'กรุณาระบุเขต/อำเภอ และจังหวัดที่ติดตั้ง' : 'Please provide your district or province.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const refCode = `XLR-${Math.floor(100000 + Math.random() * 900000)}`;

    const newLead = saveLead({
      referenceCode: refCode,
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      propertyType: form.propertyType,
      roofType: form.roofType,
      location: form.location.trim(),
      notes: form.notes.trim(),
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      priceThb: selectedPkg.priceThb,
      monthlyBillThb,
    });

    setSavedLead(newLead);
  };

  const handleCopySummary = () => {
    if (!savedLead) return;
    const text = `ใบเสนอราคาและจองสำรวจ XOLARAIZ
รหัสอ้างอิง: ${savedLead.referenceCode}
ลูกค้า: ${savedLead.fullName} (${savedLead.phone})
แพ็กเกจ: ${savedLead.packageName} (฿${savedLead.priceThb.toLocaleString()})
สถานที่: ${savedLead.propertyType} (${savedLead.roofType}) - ${savedLead.location}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="bg-[#081329] text-white py-16 lg:py-24 border-b border-[#D4AF37]/20">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Deployment Process & Direct Engineering Contact */}
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold tracking-wide text-[#E5C35E]">
            {t.consultation.badge}
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2"
            style={{ textWrap: 'balance' }}
          >
            {t.consultation.title}
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            {t.consultation.description}
          </p>

          <ol className="mt-8 space-y-5">
            {timelineSteps.map((item) => (
              <li key={item.step} className="pb-4 border-b border-white/10 last:border-b-0">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs font-semibold text-[#E5C35E] tabular-nums">
                    {item.step}
                  </span>
                  <h3 className="font-display text-base font-semibold text-white">{item.title}</h3>
                </div>
                <p className="mt-1.5 pl-8 text-sm text-slate-300 leading-relaxed">{item.detail}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <a
                href="mailto:xecoxolaraiz@gmail.com"
                className="hover:text-[#F3DC8D] transition-colors"
              >
                xecoxolaraiz@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{t.consultation.deskTitle}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{t.consultation.coverageTitle}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Validated Package Quote & Survey Form */}
        <div className="lg:col-span-7 bg-[#0B1833] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          {savedLead ? (
            <div className="py-6 space-y-6" role="status" aria-live="polite">
              <div className="flex items-center gap-3 text-[#E5C35E]">
                <CheckCircle2 className="w-8 h-8 shrink-0 text-emerald-400" />
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {t.consultation.successTitle}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {t.consultation.refNumber}: <strong className="font-mono text-[#F3DC8D] text-sm">{savedLead.referenceCode}</strong>
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {t.consultation.successDesc}
              </p>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-[#071124] border border-white/10 rounded-xl text-xs sm:text-sm">
                <div>
                  <dt className="text-slate-400">{t.consultation.selectedPackage}</dt>
                  <dd className="text-white font-semibold mt-0.5">{savedLead.packageName}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">{t.consultation.packagePrice}</dt>
                  <dd className="font-mono text-[#E5C35E] font-semibold mt-0.5 tabular-nums">
                    {formatMoney(savedLead.priceThb, Math.round(savedLead.priceThb / 34.8), currency)}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">{t.consultation.propertyRoof}</dt>
                  <dd className="text-white mt-0.5">
                    {savedLead.propertyType} · {savedLead.roofType}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">{t.consultation.siteLocation}</dt>
                  <dd className="text-white mt-0.5">{savedLead.location}</dd>
                </div>
              </dl>

              {/* Action Buttons: Line, Copy, Modify */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={createLineShareUrl(savedLead)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-[#06C755] hover:bg-[#05b34c] text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{t.consultation.lineSendBtn}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="py-3 px-4 bg-[#071124] hover:bg-white/10 text-slate-200 border border-white/15 text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? t.consultation.copiedText : t.consultation.copyBtn}</span>
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setSavedLead(null)}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  {t.consultation.modifyBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="pb-4 border-b border-white/10 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-bold text-white">
                  {t.consultation.formTitle}
                </h3>
                <span className="font-mono text-xs text-[#E5C35E] tabular-nums">
                  {t.consultation.estBill}: {formatMoney(monthlyBillThb, Math.round(monthlyBillThb / 34.8), currency)}/mo
                </span>
              </div>

              {/* Selected Package Selector */}
              <div>
                <label htmlFor="package-select" className="block text-xs font-medium text-slate-300 mb-1.5">
                  {t.consultation.packageSelectLabel}
                </label>
                <select
                  id="package-select"
                  value={selectedPackageId}
                  onChange={(e) => onPackageChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#071124] border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  {SOLAR_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} ({pkg.capacityKw} kWp —{' '}
                      {formatMoney(pkg.priceThb, pkg.priceUsd, currency)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="full-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                    {t.consultation.fullNameLabel} <span className="text-[#E5C35E]">*</span>
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder={lang === 'th' ? 'เช่น คุณธนกร สุขเกษม' : 'e.g. John Doe'}
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#071124] border rounded-lg text-white focus:outline-none ${
                      errors.fullName ? 'border-rose-500' : 'border-white/15 focus:border-[#D4AF37]'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-slate-300 mb-1.5">
                    {t.consultation.phoneLabel} <span className="text-[#E5C35E]">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder={lang === 'th' ? '08X-XXX-XXXX' : '+66 8X XXX XXXX'}
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#071124] border rounded-lg text-white focus:outline-none ${
                      errors.phone ? 'border-rose-500' : 'border-white/15 focus:border-[#D4AF37]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
                    {t.consultation.emailLabel} <span className="text-[#E5C35E]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#071124] border rounded-lg text-white focus:outline-none ${
                      errors.email ? 'border-rose-500' : 'border-white/15 focus:border-[#D4AF37]'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="location" className="block text-xs font-medium text-slate-300 mb-1.5">
                    {t.consultation.locationLabel} <span className="text-[#E5C35E]">*</span>
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder={lang === 'th' ? 'เช่น เขตประเวศ กรุงเทพฯ / อ.บางพลี' : 'e.g. Bang Na, Bangkok'}
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#071124] border rounded-lg text-white focus:outline-none ${
                      errors.location ? 'border-rose-500' : 'border-white/15 focus:border-[#D4AF37]'
                    }`}
                  />
                  {errors.location && <p className="text-[11px] text-rose-400 mt-1">{errors.location}</p>}
                </div>
              </div>

              {/* Property & Roof types */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="property-type" className="block text-xs font-medium text-slate-300 mb-1.5">
                    {t.consultation.propertyTypeLabel}
                  </label>
                  <select
                    id="property-type"
                    value={form.propertyType}
                    onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#071124] border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Residential Home">{lang === 'th' ? 'บ้านเดี่ยว / ทาวน์โฮม' : 'Residential Home'}</option>
                    <option value="Commercial Building">{lang === 'th' ? 'อาคารพาณิชย์ / คลินิก / ออฟฟิศ' : 'Commercial Building'}</option>
                    <option value="Industrial Factory">{lang === 'th' ? 'โรงงานอุตสาหกรรม / คลังสินค้า' : 'Industrial Factory'}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="roof-type" className="block text-xs font-medium text-slate-300 mb-1.5">
                    {t.consultation.roofTypeLabel}
                  </label>
                  <select
                    id="roof-type"
                    value={form.roofType}
                    onChange={(e) => setForm({ ...form, roofType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#071124] border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Concrete Tile (CPAC)">{lang === 'th' ? 'กระเบื้องซีแพคโมเนีย / คอนกรีต' : 'Concrete Tile (CPAC)'}</option>
                    <option value="Ceramic / Prestige Tile">{lang === 'th' ? 'กระเบื้องเซรามิก / เพรสทีจ' : 'Ceramic / Prestige Tile'}</option>
                    <option value="Metal Sheet (Screw / Klip-Lok)">{lang === 'th' ? 'เมทัลชีท (Klip-Lok ไม่เจาะหลังคา)' : 'Metal Sheet (Screw / Klip-Lok)'}</option>
                    <option value="Concrete Slab Deck">{lang === 'th' ? 'ดาดฟ้าคอนกรีตเรียบ (Flat Slab)' : 'Concrete Slab Deck'}</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-xs font-medium text-slate-300 mb-1.5">
                  {t.consultation.notesLabel}
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder={lang === 'th' ? 'เช่น สนใจติดชาร์จรถ EV, ต้องการสำรองไฟตอนไฟดับ...' : 'e.g. EV charger integration, backup power requirements...'}
                  className="w-full px-3.5 py-2 text-sm bg-[#071124] border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#D4AF37] hover:bg-[#E5C35E] text-[#071124] font-bold text-sm rounded-xl transition-colors cursor-pointer shadow-lg"
              >
                {t.consultation.submitBtn}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
