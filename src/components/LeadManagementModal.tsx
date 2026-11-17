import { useEffect, useState } from 'react';
import { X, Download, Trash2, Calendar, Phone, Mail, MapPin, Package, RefreshCw } from 'lucide-react';
import { getLeads, deleteLead, exportLeadsToCsv, type SolarLead } from '../services/leadService';

interface LeadManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadManagementModal({ isOpen, onClose }: LeadManagementModalProps) {
  const [leads, setLeads] = useState<SolarLead[]>([]);

  const loadLeads = () => {
    setLeads(getLeads());
  };

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (id: string) => {
    if (window.confirm('คุณต้องการลบรายการนี้ใช่หรือไม่?')) {
      deleteLead(id);
      loadLeads();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm text-slate-100"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl bg-[#071124] border border-[#D4AF37]/40 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B1833] border-b border-white/10 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              📋 รายการคำขอจองสำรวจหน้างาน (Lead Management)
              <span className="text-xs font-mono font-medium bg-[#D4AF37]/20 text-[#F3DC8D] px-2 py-0.5 rounded-full border border-[#D4AF37]/40">
                {leads.length} รายการ
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              ข้อมูลลูกค้าที่ลงทะเบียนผ่านหน้าเว็บ บันทึกในเบราว์เซอร์พร้อมส่งออกเป็นไฟล์ Excel/CSV
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportLeadsToCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37] hover:bg-[#E5C35E] text-[#071124] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ส่งออก CSV</span>
            </button>
            <button
              type="button"
              onClick={loadLeads}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              title="รีเฟรชข้อมูล"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {leads.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              ยังไม่มีข้อมูลคำขอสำรวจหน้างานในขณะนี้
            </div>
          ) : (
            <div className="space-y-3">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-[#0B1833] border border-white/10 hover:border-[#D4AF37]/40 rounded-xl p-4 sm:p-5 transition-colors space-y-3"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#F3DC8D] bg-[#071124] px-2.5 py-1 rounded border border-[#D4AF37]/30">
                        {lead.referenceCode}
                      </span>
                      <h4 className="font-display font-semibold text-white text-base">
                        {lead.fullName}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(lead.createdAt).toLocaleString('th-TH')}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDelete(lead.id)}
                        className="text-red-400 hover:text-red-300 transition-colors p-1"
                        title="ลบรายการ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="space-y-1">
                      <p className="text-slate-400 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <a href={`tel:${lead.phone}`} className="text-white hover:underline">
                          {lead.phone}
                        </a>
                      </p>
                      <p className="text-slate-400 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="text-slate-200 truncate">{lead.email}</span>
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-slate-400 flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="text-white font-medium">{lead.packageName}</span>
                      </p>
                      <p className="text-slate-400 pl-5">
                        งบประมาณ: <span className="text-[#E5C35E] font-mono">฿{lead.priceThb.toLocaleString()}</span> (ค่าไฟ ฿{lead.monthlyBillThb.toLocaleString()}/ด.)
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-slate-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="text-white">{lead.location}</span>
                      </p>
                      <p className="text-slate-400 pl-5">
                        หลังคา: {lead.propertyType} · {lead.roofType}
                      </p>
                    </div>
                  </div>

                  {lead.notes && (
                    <div className="text-xs bg-[#071124] p-2.5 rounded text-slate-300 border border-white/5">
                      <span className="text-slate-400 font-medium">หมายเหตุ:</span> {lead.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
