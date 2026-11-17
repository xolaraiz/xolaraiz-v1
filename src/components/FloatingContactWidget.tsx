import { useState } from 'react';
import { MessageCircle, Phone, Sparkles, ClipboardList, ChevronUp, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FloatingContactWidgetProps {
  onOpenAiAssistant: () => void;
  onOpenLeadAdmin: () => void;
}

export default function FloatingContactWidget({
  onOpenAiAssistant,
  onOpenLeadAdmin,
}: FloatingContactWidgetProps) {
  const { lang } = useLanguage();
  const [expanded, setExpanded] = useState(true);

  // Line official account or chat link
  const lineUrl = 'https://line.me/R/ti/p/@xolaraiz';
  const phoneTel = 'tel:0825559898';

  return (
    <aside
      aria-label="ช่องทางติดต่อด่วนและผู้ช่วย AI"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2"
    >
      {/* Expanded Action List */}
      {expanded && (
        <div className="flex flex-col items-end gap-2.5 transition-all duration-200">
          {/* AI Assistant Quick Pill */}
          <button
            type="button"
            onClick={onOpenAiAssistant}
            className="group flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C35E] hover:from-[#E5C35E] hover:to-[#F3DC8D] text-[#071124] font-bold text-xs sm:text-sm rounded-full shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 animate-pulse text-[#071124]" />
            <span>{lang === 'th' ? 'AI สแกนบิลค่าไฟ & ปรึกษาโซลาร์' : 'AI Solar & Bill Scanner'}</span>
          </button>

          {/* LINE OA Button */}
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-semibold text-xs sm:text-sm rounded-full shadow-lg transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{lang === 'th' ? 'คุยกับวิศวกรผ่าน LINE' : 'Chat via LINE OA'}</span>
          </a>

          {/* Phone Call Button */}
          <a
            href={phoneTel}
            className="flex items-center gap-2.5 px-4 py-2 bg-[#0B1833] hover:bg-[#102142] text-slate-100 border border-[#D4AF37]/50 font-medium text-xs sm:text-sm rounded-full shadow-lg transition-all hover:scale-105"
          >
            <Phone className="w-3.5 h-3.5 text-[#E5C35E]" />
            <span>{lang === 'th' ? 'โทร 082-555-9898' : 'Call 082-555-9898'}</span>
          </a>

          {/* Lead Admin Shortcut */}
          <button
            type="button"
            onClick={onOpenLeadAdmin}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#071124]/90 text-slate-400 hover:text-[#F3DC8D] border border-white/10 text-xs rounded-full shadow transition-all cursor-pointer"
            title="ดูรายการจองที่บันทึกไว้ในเครื่อง"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>{lang === 'th' ? 'รายการจอง (Admin)' : 'Leads Admin'}</span>
          </button>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-10 h-10 rounded-full bg-[#071124] border border-[#D4AF37]/60 text-[#E5C35E] hover:text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        aria-label="ย่อหรือขยายแถบติดต่อด่วน"
      >
        {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
      </button>
    </aside>
  );
}
