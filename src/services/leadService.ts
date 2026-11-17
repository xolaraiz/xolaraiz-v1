export interface SolarLead {
  id: string;
  referenceCode: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  propertyType: string;
  roofType: string;
  location: string;
  notes: string;
  packageId: string;
  packageName: string;
  priceThb: number;
  monthlyBillThb: number;
}

const STORAGE_KEY = 'xolaraiz_leads_db';

export function saveLead(lead: Omit<SolarLead, 'id' | 'createdAt'>): SolarLead {
  const newLead: SolarLead = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };

  try {
    const existing = getLeads();
    existing.unshift(newLead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to save lead to localStorage', err);
  }

  return newLead;
}

export function getLeads(): SolarLead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function deleteLead(id: string): void {
  try {
    const leads = getLeads().filter((l) => l.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (err) {
    console.error('Failed to delete lead', err);
  }
}

export function exportLeadsToCsv(): void {
  const leads = getLeads();
  if (leads.length === 0) {
    alert('ยังไม่มีข้อมูลการจองในระบบ');
    return;
  }

  const headers = [
    'Reference Code',
    'Date',
    'Customer Name',
    'Phone',
    'Email',
    'Package',
    'Price (THB)',
    'Current Bill (THB)',
    'Property Type',
    'Roof Type',
    'Location',
    'Notes',
  ];

  const rows = leads.map((l) => [
    `"${l.referenceCode}"`,
    `"${new Date(l.createdAt).toLocaleString('th-TH')}"`,
    `"${l.fullName.replace(/"/g, '""')}"`,
    `"${l.phone}"`,
    `"${l.email}"`,
    `"${l.packageName.replace(/"/g, '""')}"`,
    l.priceThb,
    l.monthlyBillThb,
    `"${l.propertyType}"`,
    `"${l.roofType}"`,
    `"${l.location.replace(/"/g, '""')}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `xolaraiz_leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function createLineShareUrl(lead: SolarLead): string {
  const message = `☀️ [สนใจติดตั้งโซลาร์เซลล์ XOLARAIZ]
📌 รหัสอ้างอิง: ${lead.referenceCode}
👤 ชื่อ: ${lead.fullName}
📞 โทร: ${lead.phone}
⚡ ค่าไฟเฉลี่ย: ฿${lead.monthlyBillThb.toLocaleString()} /เดือน
📦 แพ็กเกจที่สนใจ: ${lead.packageName} (฿${lead.priceThb.toLocaleString()})
🏠 สถานที่/หลังคา: ${lead.propertyType} (${lead.roofType})
📍 พิกัด: ${lead.location}
📝 หมายเหตุ: ${lead.notes || '-'}`;

  return `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;
}
