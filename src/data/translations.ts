export type Language = 'th' | 'en';

export interface Translations {
  nav: {
    services: string;
    solarDesign: string;
    packages: string;
    calculator: string;
    projects: string;
    requestSurvey: string;
    aiAssistant: string;
    leadAdmin: string;
  };
  hero: {
    badgePre: string;
    badgePost: string;
    title: string;
    description: string;
    btnPackages: string;
    btnCalculator: string;
    btnAiScan: string;
    cert1: string;
    cert2: string;
    cert3: string;
    crestTitle: string;
    crestHeading: string;
    crestSlogan: string;
    arraySim: string;
    tiltPresetSouth: string;
    tiltPresetEastWest: string;
    tiltPresetFlat: string;
    specYield: string;
    efficiency: string;
    tempCoeff: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
    stat4Label: string;
  };
  services: {
    badge: string;
    title: string;
    description: string;
    forecastMetric: string;
    cellMetric: string;
    turnaroundMetric: string;
    uptimeMetric: string;
    s1Title: string;
    s1Desc: string;
    s2Title: string;
    s2Desc: string;
    s3Title: string;
    s3Desc: string;
    s4Title: string;
    s4Desc: string;
  };
  packages: {
    badge: string;
    title: string;
    description: string;
    allTab: string;
    resTab: string;
    hybridTab: string;
    comTab: string;
    recommendedBadge: string;
    capacity: string;
    panels: string;
    roofSpace: string;
    monthlyGen: string;
    estSavings: string;
    payback: string;
    viewBom: string;
    selectPackage: string;
    bomModalTitle: string;
    bomClose: string;
  };
  calculator: {
    badge: string;
    title: string;
    description: string;
    billLabel: string;
    sunExposure: string;
    sunFull: string;
    sunModerate: string;
    sunPartial: string;
    loadSchedule: string;
    loadDaytime: string;
    loadBalanced: string;
    loadEvening: string;
    recommendedConfig: string;
    investment: string;
    monthlySavings: string;
    paybackWindow: string;
    annualYield: string;
    netReturn25: string;
    chartTitle: string;
    co2Label: string;
    chartDisclaimer: string;
    reserveBtn: string;
    projectsBadge: string;
    projectsTitle: string;
    projectsSubtitle: string;
  };
  consultation: {
    badge: string;
    title: string;
    description: string;
    timelineStep1Title: string;
    timelineStep1Desc: string;
    timelineStep2Title: string;
    timelineStep2Desc: string;
    timelineStep3Title: string;
    timelineStep3Desc: string;
    timelineStep4Title: string;
    timelineStep4Desc: string;
    deskTitle: string;
    coverageTitle: string;
    formTitle: string;
    estBill: string;
    packageSelectLabel: string;
    fullNameLabel: string;
    phoneLabel: string;
    emailLabel: string;
    propertyTypeLabel: string;
    roofTypeLabel: string;
    locationLabel: string;
    notesLabel: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
    refNumber: string;
    selectedPackage: string;
    packagePrice: string;
    propertyRoof: string;
    siteLocation: string;
    modifyBtn: string;
    lineSendBtn: string;
    copyBtn: string;
    copiedText: string;
  };
  footer: {
    tagline: string;
    standards: string;
    copyright: string;
  };
  aiModal: {
    title: string;
    subtitle: string;
    tabBill: string;
    tabChat: string;
    billUploadTitle: string;
    billUploadDesc: string;
    billUploadBtn: string;
    billSampleBtn: string;
    analyzing: string;
    extractedTitle: string;
    customerName: string;
    amountPaid: string;
    unitsUsed: string;
    tariffType: string;
    recommendedSystem: string;
    aiAdvice: string;
    applyToCalc: string;
    chatPlaceholder: string;
    chatSend: string;
    chatSuggestedPrompt1: string;
    chatSuggestedPrompt2: string;
    chatSuggestedPrompt3: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  th: {
    nav: {
      services: 'บริการวิศวกรรม',
      solarDesign: 'แปลนและเทคโนโลยี',
      packages: 'แพ็กเกจติดตั้ง',
      calculator: 'คำนวณจุดคุ้มทุน',
      projects: 'ผลงานจริง',
      requestSurvey: 'จองสำรวจหน้างานฟรี',
      aiAssistant: 'วิศวกร AI & สแกนบิล',
      leadAdmin: 'รายการจอง (Admin)',
    },
    hero: {
      badgePre: 'X ECO Solar Engineering',
      badgePost: 'นวัตกรรมพลังงานแสงอาทิตย์อัจฉริยะ คุ้มค่า ปลอดภัย ได้มาตรฐานสากล',
      title: 'ออกแบบและติดตั้งโซลาร์เซลล์เกรดวิศวกรรม คืนทุนไว มั่นคงยาวนานกว่า 25 ปี',
      description:
        'XOLARAIZ ให้บริการออกแบบ ติดตั้ง และขออนุญาตขนานไฟแบบเบ็ดเสร็จ (Turnkey) ด้วยเซลล์ N-Type TOPCon ประสิทธิภาพสูง ผสานการจำลอง 3D ทิศทางแดดและเงา ระบบความปลอดภัยขั้นสูง และเชื่อมต่อมิเตอร์ PEA/MEA ครบวงจร',
      btnPackages: 'เลือกดูแพ็กเกจโซลาร์',
      btnCalculator: 'คำนวณค่าไฟที่ประหยัดได้',
      btnAiScan: '🤖 AI สแกนบิลค่าไฟอัตโนมัติ',
      cert1: 'มาตรฐานขนานไฟ PEA & MEA',
      cert2: 'รับประกันประสิทธิภาพแผง 25–30 ปี',
      cert3: 'ดูแลเบ็ดเสร็จตั้งแต่สำรวจถึงเปลี่ยนมิเตอร์',
      crestTitle: 'มาตรฐานวิศวกรรมโซลาร์',
      crestHeading: 'X ECO Solar Architecture',
      crestSlogan: 'คุ้มค่า ประหยัด ปลอดภัย ได้มาตรฐาน บริการดี คัดสรรเทคโนโลยีเพื่อคุณ',
      arraySim: 'จำลองการเอียงแผงตามทิศหลังคา',
      tiltPresetSouth: 'ทิศใต้ เอียง 15°',
      tiltPresetEastWest: 'ทิศตอก/ตอ เอียง 10°',
      tiltPresetFlat: 'ดาดฟ้าแบน เอียง 5°',
      specYield: 'กำลังผลิตจำเพาะ',
      efficiency: 'ประสิทธิภาพเซลล์',
      tempCoeff: 'สัมประสิทธิ์อุณหภูมิ',
      stat1Label: 'ประสิทธิภาพแผง N-Type TOPCon',
      stat2Label: 'รับประกันผลผลิตไฟฟ้าระยะยาว',
      stat3Label: 'ระยะเวลาคืนทุนเฉลี่ย',
      stat4Label: 'มาตรฐานความปลอดภัย PEA/MEA',
    },
    services: {
      badge: 'ขั้นตอนการทำงานระดับวิศวกรรม',
      title: 'บริการครบวงจรตั้งแต่สำรวจ 3D, งานติดตั้งมาตรฐาน, จนถึงขนานไฟเข้ากับการไฟฟ้า',
      description:
        'ทุกระบบของ XOLARAIZ ผ่านการคำนวณโหลดโครงสร้าง ป้องกันปัญหารั่วซึม 100% และจัดสายแบบ Multi-MPPT เพื่อลดการสูญเสียกำลังผลิตในสภาพอากาศร้อนชื้นของไทย',
      forecastMetric: 'ความแม่นยำการผลิต',
      cellMetric: 'ประสิทธิภาพแผง',
      turnaroundMetric: 'ระยะเวลาติดตั้งหน้างาน',
      uptimeMetric: 'ความพร้อมใช้งานของระบบ',
      s1Title: 'สำรวจหน้างาน & ซิมูเลชัน 3D เงาตกกระทบ',
      s1Desc: 'ใช้โดรนทำแผนที่หลังคาระดับมิลลิเมตร วิเคราะห์ทิศทางแดดตลอด 365 วัน และตรวจสอบการรับน้ำหนักโครงสร้างก่อนการติดตั้งจริง',
      s2Title: 'วิศวกรรมแผงและวงจรสตริงไฟฟ้า',
      s2Desc: 'เลือกใช้แผง N-Type TOPCon ทนความร้อนสูง (-0.29%/°C) พร้อมจับคู่สตริงอินเวอร์เตอร์หลาย MPPT รองรับหลังคาหลายทิศทาง',
      s3Title: 'ติดตั้งมาตรฐานสูง & ประสานงานการไฟฟ้า',
      s3Desc: 'ทีมช่างวิศวกรผู้เชี่ยวชาญ ติดตั้งรางอลูมิเนียมกันน้ำรั่ว อุปกรณ์ป้องกันไฟกระชาก (Surge Protection) และดำเนินการขออนุญาต MEA/PEA ให้ครบถ้วน',
      s4Title: 'ระบบมอนิเตอร์อัจฉริยะ & บำรุงรักษาเชิงรุก',
      s4Desc: 'ติดตามการผลิตไฟฟ้าแบบเรียลไทม์ผ่านสมาร์ตโฟน พร้อมการตรวจสอบภาพถ่ายความร้อน (Thermal Scan) ป้องกันจุดร้อนและการรับประกันยาวนาน',
    },
    packages: {
      badge: 'แพ็กเกจติดตั้งแบบเบ็ดเสร็จ (Turnkey Packages)',
      title: 'แพ็กเกจราคาเดียวจบ พร้อมระบุสเปกอุปกรณ์ชัดเจนโปร่งใส',
      description:
        'ทุกแพ็กเกจรวมแผง Tier-1 N-Type TOPCon, อินเวอร์เตอร์อัจฉริยะ, ตู้ควบคุมความปลอดภัย AC/DC, อุปกรณ์ติดตั้งกันน้ำ และการยื่นขออนุญาตขนานไฟกับการไฟฟ้าเรียบร้อยแล้ว',
      allTab: 'ทุกแพ็กเกจ',
      resTab: 'บ้านพักอาศัย (On-Grid)',
      hybridTab: 'ไฮบริดสำรองไฟ (Hybrid + Battery)',
      comTab: 'ธุรกิจและโรงงาน (Commercial & Plant)',
      recommendedBadge: 'ยอดนิยมสำหรับบ้าน',
      capacity: 'ขนาดกำลังผลิต',
      panels: 'จำนวนแผง',
      roofSpace: 'พื้นที่หลังคาที่ใช้',
      monthlyGen: 'ผลิตไฟได้เฉลี่ย',
      estSavings: 'ประหยัดค่าไฟได้ประมาณ',
      payback: 'ระยะเวลาคืนทุน',
      viewBom: 'ดูสเปกและรายการอุปกรณ์ (BOM)',
      selectPackage: 'เลือกแพ็กเกจนี้',
      bomModalTitle: 'รายการอุปกรณ์และสเปกวิศวกรรม (Bill of Materials)',
      bomClose: 'ปิดหน้าต่าง',
    },
    calculator: {
      badge: 'โปรแกรมจำลองผลตอบแทน (Yield & Payback Calculator)',
      title: 'คำนวณค่าไฟที่ประหยัดได้ และดูกราฟผลตอบแทนสะสม 10 ปี',
      description: 'ปรับค่าไฟฟ้ารายเดือนในปัจจุบัน และสภาพแสงแดดบนหลังคาของคุณ เพื่อค้นหาขนาดระบบโซลาร์เซลล์ที่คุ้มค่าที่สุด',
      billLabel: 'ค่าไฟฟ้าเฉลี่ยต่อเดือนในปัจจุบัน',
      sunExposure: 'สภาพแสงแดดบนหลังคา',
      sunFull: 'แดดเต็มวัน ไม่มีร่มเงา (5.1 ชม./วัน)',
      sunModerate: 'มีเงาบังเล็กน้อยช่วงเช้า/เย็น (4.5 ชม./วัน)',
      sunPartial: 'มีร่มเงาต้นไม้/ตึกบังบางส่วน (3.9 ชม./วัน)',
      loadSchedule: 'พฤติกรรมการใช้ไฟฟ้าหลัก',
      loadDaytime: 'เน้นใช้ไฟกลางวัน / โฮมออฟฟิศ (70% Day)',
      loadBalanced: 'ครอบครัวทั่วไป ใช้ไฟทั้งวัน (50% Day)',
      loadEvening: 'เน้นใช้ไฟกลางคืน + ชาร์จรถ EV (แนะนํา Hybrid)',
      recommendedConfig: 'ระบบที่แนะนำสำหรับคุณ',
      investment: 'งบประมาณการลงทุนเบ็ดเสร็จ',
      monthlySavings: 'ประหยัดได้เฉลี่ยต่อเดือน',
      paybackWindow: 'ระยะเวลาคืนทุนโดยประมาณ',
      annualYield: 'พลังงานผลิตได้ต่อปี',
      netReturn25: 'กำไรสุทธิสะสม 25 ปี (หักค่าระบบ)',
      chartTitle: 'กราฟผลตอบแทนสะสมสุทธิ 10 ปี (หลังหักเงินลงทุน)',
      co2Label: 'ลดการปล่อยคาร์บอน CO₂',
      chartDisclaimer: 'คำนวณจากค่าไฟเฉลี่ย ฿4.65/หน่วย (รวม Ft) และอัตราเสื่อมประสิทธิภาพแผง N-Type เพียง 0.4%/ปี',
      reserveBtn: 'จองสิทธิ์แพ็กเกจนี้',
      projectsBadge: 'ผลงานการติดตั้งจริง',
      projectsTitle: 'ตัวเลขผลประหยัดค่าไฟจริงจากหน้างานที่เปิดใช้งานแล้ว',
      projectsSubtitle: 'ข้อมูลตรวจสอบจากมิเตอร์จริงหลังใช้งานต่อเนื่อง 12 เดือน',
    },
    consultation: {
      badge: 'จองสิทธิ์สำรวจหน้างาน & ล็อกราคาพิเศษ',
      title: 'นัดหมายวิศวกรสำรวจหลังคา พร้อมรับข้อเสนอราคาคงที่',
      description: 'วิศวกรโซลาร์ของ XOLARAIZ จะตรวจสอบโครงสร้างหลังคา วิเคราะห์การใช้ไฟ และประเมินระบบไฟฟ้าหลัก ก่อนยืนยันแผนงานติดตั้งจริง',
      timelineStep1Title: 'สำรวจหน้างานและใช้โดรนถ่ายภาพ (ฟรี)',
      timelineStep1Desc: 'วัดขนาดหลังคา ตรวจตู้ MDB และตรวจทิศทางแดดภายใน 48 ชั่วโมง',
      timelineStep2Title: 'ออกแบบจำลอง 3D Shading & อนุมัติแบบ',
      timelineStep2Desc: 'รับรายงานประมาณการผลิตไฟฟ้า kWh, โหลดโครงสร้าง และใบเสนอราคาคงที่',
      timelineStep3Title: 'ติดตั้งโดยทีมช่างมาตรฐานสากล (2–7 วัน)',
      timelineStep3Desc: 'ยึดรางอลูมิเนียมกันน้ำรั่ว 100%, ระบบความปลอดภัย IP65/IP66 และเดินท่อสายไฟเรียบร้อย',
      timelineStep4Title: 'ประสานงานขนานไฟ PEA / MEA',
      timelineStep4Desc: 'ดำเนินการเอกสาร ยื่นขออนุญาต ตรวจสอบระบบ เปลี่ยนมิเตอร์ และส่งมอบคู่มือรับประกัน',
      deskTitle: 'ฝ่ายวิศวกรรม · จันทร์–เสาร์ 08:30–18:00',
      coverageTitle: 'ให้บริการครอบคลุมกรุงเทพฯ ปริมณฑล และโรงงานอุตสาหกรรมทั่วประเทศ',
      formTitle: 'ลงทะเบียนรับใบเสนอราคา & นัดสำรวจหน้างาน',
      estBill: 'ค่าไฟปัจจุบันประเมิน',
      packageSelectLabel: 'แพ็กเกจโซลาร์เซลล์ที่ต้องการ',
      fullNameLabel: 'ชื่อ - นามสกุล',
      phoneLabel: 'เบอร์โทรศัพท์ติดต่อ',
      emailLabel: 'อีเมล',
      propertyTypeLabel: 'ประเภทสถานที่ติดตั้ง',
      roofTypeLabel: 'ประเภทหลังคา',
      locationLabel: 'เขต/อำเภอ และจังหวัดที่ติดตั้ง',
      notesLabel: 'ข้อความเพิ่มเติม / จุดประสงค์การใช้งาน (ถ้ามี)',
      submitBtn: 'ส่งข้อมูลเพื่อนัดสำรวจหน้างานฟรี',
      successTitle: 'บันทึกคำขอนัดสำรวจเรียบร้อยแล้ว!',
      successDesc: 'ขอบคุณครับ ทีมวิศวกร XOLARAIZ ได้รับข้อมูลของคุณแล้ว และจะติดต่อกลับทางเบอร์โทรศัพท์เพื่อยืนยันวันเวลานัดหมายภายใน 1 วันทำการ',
      refNumber: 'รหัสอ้างอิงของคุณ',
      selectedPackage: 'แพ็กเกจที่เลือก',
      packagePrice: 'งบประมาณแพ็กเกจ',
      propertyRoof: 'สถานที่และหลังคา',
      siteLocation: 'พิกัดติดตั้ง',
      modifyBtn: 'แก้ไขข้อมูลหรือส่งคำขอใหม่',
      lineSendBtn: 'ส่งข้อมูลนี้ต่อเข้า LINE เจ้าหน้าที่ทันที',
      copyBtn: 'คัดลอกรายละเอียดใบเสนอราคา',
      copiedText: 'คัดลอกสำเร็จ!',
    },
    footer: {
      tagline: 'Excellent & Economical Smart Solar Solutions · ผู้นำด้านวิศวกรรมพลังงานสะอาด',
      standards: 'มาตรฐานวิศวกรรมและความปลอดภัยตามเกณฑ์ PEA & MEA Grid-Code',
      copyright: 'สงวนลิขสิทธิ์ทุกประการ',
    },
    aiModal: {
      title: 'XOLARAIZ AI Solar Assistant',
      subtitle: 'ระบบวิเคราะห์บิลค่าไฟและที่ปรึกษาวิศวกรรมโซลาร์อัจฉริยะ (ขับเคลื่อนด้วย Gemini AI)',
      tabBill: '📸 สแกนบิลค่าไฟ (Bill Scanner)',
      tabChat: '💬 ปรึกษาวิศวกร AI (Solar Expert)',
      billUploadTitle: 'อัปโหลดภาพบิลค่าไฟ (PEA หรือ MEA)',
      billUploadDesc: 'ถ่ายภาพบิลค่าไฟเดือนล่าสุดให้เห็นยอดเงินและหน่วยไฟฟ้า เพื่อให้ AI คำนวณขนาดโซลาร์เซลล์ที่ประหยัดได้สูงสุด',
      billUploadBtn: 'เลือกไฟล์ภาพบิลค่าไฟ (JPG/PNG)',
      billSampleBtn: 'ทดลองด้วยตัวอย่างบิล MEA / PEA',
      analyzing: 'กำลังใช้ Gemini AI วิเคราะห์บิลค่าไฟ...',
      extractedTitle: 'ผลการวิเคราะห์ข้อมูลบิลไฟฟ้า',
      customerName: 'ชื่อผู้ใช้ไฟฟ้า',
      amountPaid: 'ยอดเงินค่าไฟฟ้า',
      unitsUsed: 'หน่วยการใช้ไฟ (kWh)',
      tariffType: 'ประเภทอัตราค่าไฟ',
      recommendedSystem: 'ขนาดโซลาร์เซลล์ที่แนะนำ',
      aiAdvice: 'คำแนะนำทางวิศวกรรมโดย AI',
      applyToCalc: 'นำค่าไฟนี้ไปคำนวณในหน้าเว็บทันที ⚡',
      chatPlaceholder: 'พิมพ์คำถามเกี่ยวกับระบบโซลาร์เซลล์ เช่น งบประมาณ, แบตเตอรี่, การขออนุญาต...',
      chatSend: 'ส่งคำถาม',
      chatSuggestedPrompt1: 'บ้านเดี่ยวค่าไฟ 7,500 บาท ติดโซลาร์เซลล์กี่ kW คุ้มที่สุด?',
      chatSuggestedPrompt2: 'ระบบ On-Grid กับ Hybrid แตกต่างกันอย่างไร และแบบไหนดีกว่า?',
      chatSuggestedPrompt3: 'ติดโซลาร์เซลล์ต้องขออนุญาต PEA/MEA อย่างไร ใช้เวลากี่วัน?',
    },
  },
  en: {
    nav: {
      services: 'Services',
      solarDesign: 'Solar Design',
      packages: 'Packages',
      calculator: 'Calculator',
      projects: 'Projects',
      requestSurvey: 'Request Survey',
      aiAssistant: 'AI Solar & Bill Scan',
      leadAdmin: 'Leads (Admin)',
    },
    hero: {
      badgePre: 'X ECO Solar Engineering',
      badgePost: 'Excellent & Economical Smart Solar Solutions',
      title: 'Precision solar cell design built for decades of return.',
      description:
        'XOLARAIZ engineers, installs, and commissions turnkey N-Type TOPCon solar cell arrays for residences, commercial roofs, and industrial facilities—backed by 3D shading simulations, certified safety protection, and full utility permitting.',
      btnPackages: 'Explore Solar Packages',
      btnCalculator: 'Estimate Yield & Payback',
      btnAiScan: '🤖 AI Electricity Bill Scanner',
      cert1: 'PEA & MEA Grid-Code Certified',
      cert2: '25-Year Linear Output Guarantee',
      cert3: 'Turnkey Design to Meter Sync',
      crestTitle: 'Official Engineering Standard',
      crestHeading: 'X ECO Solar Architecture',
      crestSlogan: 'คุ้มค่า ประหยัด ปลอดภัย ได้มาตรฐาน บริการดี คัดสรรเทคโนโลยีเพื่อคุณ',
      arraySim: 'Array Geometry Simulation',
      tiltPresetSouth: 'South Pitch 15°',
      tiltPresetEastWest: 'East-West Split 10°',
      tiltPresetFlat: 'Commercial Flat 5°',
      specYield: 'Specific Yield',
      efficiency: 'Cell Efficiency',
      tempCoeff: 'Temp Coeff.',
      stat1Label: 'N-Type TOPCon Cell Efficiency',
      stat2Label: 'Linear Power Output Guarantee',
      stat3Label: 'Measured Turnkey Payback Range',
      stat4Label: 'PEA / MEA Grid-Code Compliance',
    },
    services: {
      badge: 'Engineering & Installation Workflow',
      title: 'End-to-end solar cell design, structural mounting, and grid compliance.',
      description:
        'Every XOLARAIZ system is engineered from cell chemistry upward—eliminating roof leaks, voltage mismatch, and unverified yield estimates.',
      forecastMetric: 'Forecast Accuracy',
      cellMetric: 'Cell Efficiency',
      turnaroundMetric: 'Residential Turnaround',
      uptimeMetric: 'System Availability',
      s1Title: 'Site Survey & 3D Shading Simulation',
      s1Desc: 'Millimeter-accurate drone roof mapping and hourly sun-path simulation across seasons before fabrication.',
      s2Title: 'Solar Cell & String Architecture',
      s2Desc: 'Tier-1 monocrystalline N-Type TOPCon cells matched with balanced MPPT string voltages for heat resilience.',
      s3Title: 'Certified Installation & Grid Sync',
      s3Desc: 'In-house certified crews with non-penetrating clamps, surge protection, and PEA/MEA meter permitting.',
      s4Title: 'Smart Telemetry & Lifecycle Care',
      s4Desc: 'Real-time solar harvest tracking, infrared hotspot inspections, and dedicated warranty management.',
    },
    packages: {
      badge: 'Turnkey Solar Packages',
      title: 'Fixed-price installation packages with transparent hardware specs.',
      description:
        'Every package includes Tier-1 N-Type TOPCon modules, structural mounting, DC/AC surge protection, and full PEA/MEA utility permitting.',
      allTab: 'All Packages',
      resTab: 'Residential On-Grid',
      hybridTab: 'Hybrid Storage',
      comTab: 'Commercial & Plant',
      recommendedBadge: 'Most Popular',
      capacity: 'System Capacity',
      panels: 'Panel Count',
      roofSpace: 'Roof Space Needed',
      monthlyGen: 'Avg. Monthly Generation',
      estSavings: 'Estimated Savings',
      payback: 'Estimated Payback',
      viewBom: 'View Full BOM Specifications',
      selectPackage: 'Select This Package',
      bomModalTitle: 'Bill of Materials & Engineering Specifications',
      bomClose: 'Close Specifications',
    },
    calculator: {
      badge: 'Yield & Payback Calculator',
      title: 'Simulate your monthly electricity offset and 10-year return.',
      description: 'Adjust your current monthly electricity bill and roof sun exposure to match the optimal XOLARAIZ system size.',
      billLabel: 'Current Monthly Electricity Bill',
      sunExposure: 'Roof Sunlight Exposure',
      sunFull: 'Unshaded Roof (5.1 hrs/day)',
      sunModerate: 'Light Morning Shade (4.5 hrs/day)',
      sunPartial: 'Partial Obstruction (3.9 hrs/day)',
      loadSchedule: 'Primary Load Schedule',
      loadDaytime: 'Daytime Home / Office (70% Day)',
      loadBalanced: 'Balanced Family Load (50% Day)',
      loadEvening: 'Night Cooling + EV (Hybrid Battery)',
      recommendedConfig: 'Recommended Configuration',
      investment: 'Turnkey Investment',
      monthlySavings: 'Monthly Savings',
      paybackWindow: 'Payback Window',
      annualYield: 'Annual Yield',
      netReturn25: '25-Yr Net Return',
      chartTitle: '10-Year Cumulative Net Cashflow (After System Cost)',
      co2Label: 'CO₂ Offset',
      chartDisclaimer: 'Estimate assumes blended daytime grid tariff of ฿4.65/kWh and N-Type 0.4%/yr degradation.',
      reserveBtn: 'Reserve Package',
      projectsBadge: 'Verified Field Deployments',
      projectsTitle: 'Measured utility savings across commissioned sites.',
      projectsSubtitle: 'Audited 12-month post-commissioning meter data',
    },
    consultation: {
      badge: 'Site Survey & Package Reservation',
      title: 'Schedule an engineering survey and lock your turnkey quote.',
      description: 'Our solar engineers evaluate your roof structure, daytime load profile, and utility meter phase before confirming your final installation schedule.',
      timelineStep1Title: 'Free Site Audit & Drone Survey',
      timelineStep1Desc: 'Roof measurement, main distribution board inspection, and shading capture within 48 hours.',
      timelineStep2Title: '3D Shading & String Design Sign-Off',
      timelineStep2Desc: 'Receive your custom kWh generation forecast, structural load sheet, and fixed BOM quote.',
      timelineStep3Title: 'Certified Installation (2–7 Days)',
      timelineStep3Desc: 'Watertight rail mounting, IP65/IP66 DC-AC surge protection, and clean conduit routing.',
      timelineStep4Title: 'PEA / MEA Grid Synchronization',
      timelineStep4Desc: 'Complete utility permitting, testing, telemetry activation, and handover warranty kit.',
      deskTitle: 'Engineering Desk · Mon–Sat 08:30–18:00',
      coverageTitle: 'Bangkok Metropolitan & Nationwide Industrial Coverage',
      formTitle: 'Request Package Quote & Site Survey',
      estBill: 'Est. Bill',
      packageSelectLabel: 'Solar Package Selection',
      fullNameLabel: 'Full Name',
      phoneLabel: 'Phone Number',
      emailLabel: 'Email Address',
      propertyTypeLabel: 'Property Type',
      roofTypeLabel: 'Roof Type',
      locationLabel: 'Site District & Province',
      notesLabel: 'Additional Notes / Project Specifics',
      submitBtn: 'Submit Site Survey Request',
      successTitle: 'Site Survey Request Confirmed',
      successDesc: 'Thank you. Your survey inquiry has been logged. An XOLARAIZ solar engineer will contact you within 1 business day.',
      refNumber: 'Your Reference Code',
      selectedPackage: 'Selected Package',
      packagePrice: 'Package Price',
      propertyRoof: 'Property & Roof',
      siteLocation: 'Site Location',
      modifyBtn: 'Modify Package or Submit Another Request',
      lineSendBtn: 'Send Details via LINE Chat',
      copyBtn: 'Copy Quotation Summary',
      copiedText: 'Copied to clipboard!',
    },
    footer: {
      tagline: 'Excellent & Economical Smart Solar Solutions · Precision Clean Energy Engineering',
      standards: 'PEA & MEA Grid-Code Standards & Certified Hardware',
      copyright: 'All rights reserved.',
    },
    aiModal: {
      title: 'XOLARAIZ AI Solar Assistant',
      subtitle: 'Smart Bill Scanner & Solar Engineering Advisor (Powered by Gemini AI)',
      tabBill: '📸 Bill Scanner',
      tabChat: '💬 AI Solar Expert',
      billUploadTitle: 'Upload Electricity Bill (PEA or MEA)',
      billUploadDesc: 'Upload a photo of your latest electricity bill to automatically calculate optimal solar system capacity and savings.',
      billUploadBtn: 'Select Bill Image (JPG/PNG)',
      billSampleBtn: 'Try Sample MEA/PEA Bill',
      analyzing: 'Gemini AI is analyzing your electricity bill...',
      extractedTitle: 'Extracted Bill Insights',
      customerName: 'Customer Name',
      amountPaid: 'Bill Amount',
      unitsUsed: 'Energy Consumed (kWh)',
      tariffType: 'Tariff Type',
      recommendedSystem: 'Recommended Solar System',
      aiAdvice: 'Engineering Recommendation',
      applyToCalc: 'Apply Values to Calculator ⚡',
      chatPlaceholder: 'Ask anything about solar rooftop, battery, PEA/MEA regulations...',
      chatSend: 'Send Question',
      chatSuggestedPrompt1: 'My bill is ฿7,500/month. What kW size is best for me?',
      chatSuggestedPrompt2: 'What is the difference between On-Grid and Hybrid storage?',
      chatSuggestedPrompt3: 'What are the steps and permits needed for PEA / MEA grid connection?',
    },
  },
};
