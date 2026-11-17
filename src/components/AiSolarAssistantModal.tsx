import { useState, useRef } from 'react';
import {
  X,
  Upload,
  Bot,
  FileText,
  Sparkles,
  ArrowRight,
  Send,
  CheckCircle,
  Key,
  HelpCircle,
  Zap,
} from 'lucide-react';
import {
  analyzeBillImage,
  chatWithSolarAdvisor,
  getStoredApiKey,
  saveApiKey,
  type BillAnalysisResult,
} from '../services/geminiService';
import { useLanguage } from '../context/LanguageContext';

interface AiSolarAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyBillData: (amountThb: number, packageId: string) => void;
}

export default function AiSolarAssistantModal({
  isOpen,
  onClose,
  onApplyBillData,
}: AiSolarAssistantModalProps) {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'bill' | 'chat'>('bill');

  // Bill Scanner State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [billResult, setBillResult] = useState<BillAnalysisResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chat State
  const [chatMessages, setChatMessages] = useState<
    { role: 'user' | 'model'; text: string }[]
  >([
    {
      role: 'model',
      text:
        lang === 'th'
          ? 'สวัสดีครับ ผมคือวิศวกร AI ของ XOLARAIZ พร้อมให้คำปรึกษาเรื่องการออกแบบ ขนาดแผงที่เหมาะสม ทิศทางแดด หรือขั้นตอนการยื่นขอขนานไฟกับการไฟฟ้า (PEA / MEA) ครับ มีข้อสงสัยเรื่องใดสอบถามได้เลยครับ!'
          : 'Hello! I am XOLARAIZ AI Solar Chief Engineer. Ask me anything about solar rooftop design, capacity sizing, battery storage, or PEA/MEA grid regulations!',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // API Key Settings State
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [inputApiKey, setInputApiKey] = useState(getStoredApiKey());
  const [savedKeySuccess, setSavedKeySuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = (reader.result as string).split(',')[1];
      setImagePreview(reader.result as string);
      setIsAnalyzing(true);
      try {
        const result = await analyzeBillImage(base64Data, file.type, false);
        setBillResult(result);
      } catch (err) {
        console.error('Bill analysis error', err);
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSampleBill = async () => {
    setIsAnalyzing(true);
    setImagePreview('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80');
    try {
      const result = await analyzeBillImage(undefined, 'image/jpeg', true);
      setBillResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const msg = textToSend || chatInput;
    if (!msg.trim() || isChatLoading) return;

    const updatedHistory = [...chatMessages, { role: 'user' as const, text: msg.trim() }];
    setChatMessages(updatedHistory);
    if (!textToSend) setChatInput('');
    setIsChatLoading(true);

    try {
      const reply = await chatWithSolarAdvisor(updatedHistory, msg.trim());
      setChatMessages([...updatedHistory, { role: 'model', text: reply }]);
    } catch (err) {
      console.error(err);
      setChatMessages([
        ...updatedHistory,
        { role: 'model', text: 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง' },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    saveApiKey(inputApiKey);
    setSavedKeySuccess(true);
    setTimeout(() => {
      setSavedKeySuccess(false);
      setShowKeyModal(false);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl bg-[#071124] border border-[#D4AF37]/40 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B1833] border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#E5C35E]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                {t.aiModal.title}
                <span className="text-[10px] font-mono font-semibold bg-[#D4AF37]/20 text-[#F3DC8D] px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                  Gemini Flash 2.5
                </span>
              </h3>
              <p className="text-xs text-slate-400">{t.aiModal.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowKeyModal((v) => !v)}
              title="ตั้งค่า Gemini API Key"
              className="p-2 text-slate-400 hover:text-[#F3DC8D] transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <Key className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* API Key Drawer/Notice */}
        {showKeyModal && (
          <div className="px-6 py-3 bg-[#102142] border-b border-[#D4AF37]/30 flex flex-col sm:flex-row items-center gap-3 text-xs">
            <span className="text-slate-300 shrink-0 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#E5C35E]" />
              Gemini API Key:
            </span>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={inputApiKey}
              onChange={(e) => setInputApiKey(e.target.value)}
              className="flex-1 w-full sm:w-auto px-3 py-1.5 bg-[#071124] border border-white/20 rounded text-white text-xs focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="button"
              onClick={handleSaveApiKey}
              className="px-3 py-1.5 bg-[#D4AF37] text-[#071124] font-semibold rounded hover:bg-[#E5C35E] transition-colors cursor-pointer shrink-0"
            >
              {savedKeySuccess ? 'บันทึกแล้ว!' : 'บันทึก Key'}
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-[#071124]">
          <button
            type="button"
            onClick={() => setActiveTab('bill')}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'bill'
                ? 'border-[#D4AF37] text-[#F3DC8D] bg-white/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            {t.aiModal.tabBill}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'chat'
                ? 'border-[#D4AF37] text-[#F3DC8D] bg-white/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4" />
            {t.aiModal.tabChat}
          </button>
        </div>

        {/* Tab 1: Electricity Bill Scanner */}
        {activeTab === 'bill' && (
          <div className="p-6 overflow-y-auto space-y-6">
            {!billResult ? (
              <div className="space-y-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] bg-[#0B1833]/50 rounded-2xl p-8 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-3"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#E5C35E]">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-semibold text-white">
                      {t.aiModal.billUploadTitle}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                      {t.aiModal.billUploadDesc}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-2 px-4 py-2 text-xs font-semibold text-[#071124] bg-[#D4AF37] hover:bg-[#E5C35E] rounded-lg transition-colors cursor-pointer"
                  >
                    {t.aiModal.billUploadBtn}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <span className="text-xs text-slate-500">หรือ</span>
                  <button
                    type="button"
                    onClick={handleSampleBill}
                    className="text-xs text-[#E5C35E] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    {t.aiModal.billSampleBtn}
                  </button>
                </div>

                {isAnalyzing && (
                  <div className="text-center py-6 text-sm text-[#F3DC8D] flex items-center justify-center gap-2 animate-pulse">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    {t.aiModal.analyzing}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 className="font-display text-base font-semibold text-white flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    {t.aiModal.extractedTitle}
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      setBillResult(null);
                      setImagePreview(null);
                    }}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    สแกนภาพอื่นใหม่
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0B1833] p-4 rounded-xl border border-white/10">
                  <div>
                    <span className="text-[11px] text-slate-400 block">{t.aiModal.customerName}</span>
                    <span className="text-sm font-semibold text-white truncate block mt-0.5">
                      {billResult.customerName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">{t.aiModal.amountPaid}</span>
                    <span className="text-sm font-mono font-bold text-[#E5C35E] block mt-0.5">
                      ฿{billResult.totalAmountThb.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">{t.aiModal.unitsUsed}</span>
                    <span className="text-sm font-mono font-semibold text-white block mt-0.5">
                      {billResult.totalKwh.toLocaleString()} kWh
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">{t.aiModal.tariffType}</span>
                    <span className="text-xs text-slate-200 block mt-0.5 truncate">
                      {billResult.tariffType}
                    </span>
                  </div>
                </div>

                {/* AI Advice Card */}
                <div className="p-4 bg-[#102142] border border-[#D4AF37]/30 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#E5C35E]">
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {t.aiModal.recommendedSystem}: {billResult.recommendedPackageName} ({billResult.recommendedKw} kW)
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {billResult.engineeringAdvice}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
                    <span>
                      ประหยัดได้: <strong className="text-emerald-400">~฿{billResult.estMonthlySavingsThb.toLocaleString()}/เดือน</strong>
                    </span>
                    <span>
                      คืนทุนโดยประมาณ: <strong className="text-[#F3DC8D]">{billResult.paybackYears} ปี</strong>
                    </span>
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  type="button"
                  onClick={() => {
                    onApplyBillData(billResult.totalAmountThb, billResult.recommendedPackageId);
                    onClose();
                  }}
                  className="w-full py-3 px-4 bg-[#D4AF37] hover:bg-[#E5C35E] text-[#071124] font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>{t.aiModal.applyToCalc}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: AI Solar Chat Advisor */}
        {activeTab === 'chat' && (
          <div className="flex flex-col flex-1 h-[520px] max-h-[60vh]">
            {/* Chat Body */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 text-xs sm:text-sm ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'model' && (
                    <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C35E] shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-[#D4AF37] text-[#071124] font-medium'
                        : 'bg-[#0B1833] border border-white/10 text-slate-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex gap-3 text-xs text-slate-400 items-center">
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#E5C35E] shrink-0">
                    <Bot className="w-4 h-4 animate-spin" />
                  </div>
                  <span className="italic">วิศวกร AI กำลังประมวลผลคำตอบ...</span>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="px-5 py-2 border-t border-white/5 bg-[#0B1833]/50 flex gap-2 overflow-x-auto text-[11px]">
              {[
                t.aiModal.chatSuggestedPrompt1,
                t.aiModal.chatSuggestedPrompt2,
                t.aiModal.chatSuggestedPrompt3,
              ].map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(p)}
                  className="px-3 py-1 bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/50 rounded-full text-slate-300 hover:text-[#F3DC8D] transition-colors whitespace-nowrap cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-[#0B1833] border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                placeholder={t.aiModal.chatPlaceholder}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                className="flex-1 px-4 py-2.5 bg-[#071124] border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={isChatLoading || !chatInput.trim()}
                className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#E5C35E] text-[#071124] font-semibold rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline text-xs">{t.aiModal.chatSend}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
