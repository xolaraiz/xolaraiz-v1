export type PackageCategory = 'all' | 'residential' | 'hybrid' | 'commercial';
export type CurrencyCode = 'THB' | 'USD';

export interface SolarPackage {
  id: string;
  name: string;
  category: Exclude<PackageCategory, 'all'>;
  categoryLabel: string;
  phaseLabel: string;
  capacityKw: number;
  panelCount: number;
  panelWattage: number;
  panelModel: string;
  inverterSpec: string;
  batterySpec: string | null;
  roofAreaSqm: number;
  monthlyGenerationKwh: number;
  monthlySavingsThb: number;
  paybackYears: number;
  priceThb: number;
  priceUsd: number;
  recommended?: boolean;
  summary: string;
  highlights: string[];
  bomDetails: {
    cells: string;
    mounting: string;
    protection: string;
    monitoring: string;
    permits: string;
    warranty: string;
  };
}

export interface ServiceCapability {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  metricLabel: string;
  metricValue: string;
  span: 'wide' | 'narrow';
}

export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  sector: string;
  systemSize: string;
  annualYield: string;
  billReduction: string;
  paybackPeriod: string;
  summary: string;
  attribution: string;
}

export interface OrientationPreset {
  id: 'south' | 'east-west' | 'flat';
  label: string;
  tiltAngle: string;
  peakSunHours: number;
  specificYield: string;
  efficiency: string;
  tempCoeff: string;
  notes: string;
}

export const ORIENTATION_PRESETS: OrientationPreset[] = [
  {
    id: 'south',
    label: 'South Pitch 15°',
    tiltAngle: '15° Azimuth 180°',
    peakSunHours: 5.1,
    specificYield: '1,485 kWh/kWp/yr',
    efficiency: '22.8%',
    tempCoeff: '-0.29%/°C',
    notes: 'Optimal equatorial tilt for maximum midday solar harvest on gable and hip roofs.',
  },
  {
    id: 'east-west',
    label: 'East-West Split 10°',
    tiltAngle: '10° Dual Azimuth',
    peakSunHours: 4.7,
    specificYield: '1,390 kWh/kWp/yr',
    efficiency: '22.4%',
    tempCoeff: '-0.29%/°C',
    notes: 'Flattens midday peak and extends morning-to-late-afternoon generation for residential loads.',
  },
  {
    id: 'flat',
    label: 'Commercial Flat 5°',
    tiltAngle: '5° Ballasted Rail',
    peakSunHours: 4.9,
    specificYield: '1,440 kWh/kWp/yr',
    efficiency: '23.1%',
    tempCoeff: '-0.28%/°C',
    notes: 'High-density bifacial array layout with wind-deflector rails for metal sheet and concrete decks.',
  },
];

export const SOLAR_PACKAGES: SolarPackage[] = [
  {
    id: 'x-home-5kw',
    name: 'X-Home 5 kW Essential',
    category: 'residential',
    categoryLabel: 'Residential On-Grid',
    phaseLabel: '1-Phase 230V',
    capacityKw: 5.5,
    panelCount: 10,
    panelWattage: 550,
    panelModel: '10× 550W N-Type TOPCon Monocrystalline',
    inverterSpec: '5 kW Smart Grid-Tie Inverter (Dual MPPT)',
    batterySpec: null,
    roofAreaSqm: 26,
    monthlyGenerationKwh: 685,
    monthlySavingsThb: 3200,
    paybackYears: 3.9,
    priceThb: 149000,
    priceUsd: 4290,
    summary: 'Engineered for modern townhomes and single-family residences with daytime air-conditioning loads.',
    highlights: [
      '22.6% N-Type TOPCon cell efficiency with low thermal loss',
      'Zero-export CT clamp & smart Wi-Fi generation telemetry',
      'Full PEA / MEA utility permit documentation included',
    ],
    bomDetails: {
      cells: '10× Tier-1 550W N-Type Bifacial Half-Cut Modules',
      mounting: 'Anodized 6005-T5 Aluminum Rail & SS304 Roof Hooks',
      protection: 'IP65 DC Combiner, Type II SPD Surge Arresters, DC Isolator',
      monitoring: 'Real-time string & consumption app telemetry',
      permits: 'Complete structural engineer sign-off + PEA/MEA filing',
      warranty: '25-year linear output · 10-year inverter · 5-year workmanship',
    },
  },
  {
    id: 'x-prime-10kw',
    name: 'X-Prime 10 kW Hybrid',
    category: 'hybrid',
    categoryLabel: 'Hybrid Storage',
    phaseLabel: '1-Phase / 3-Phase',
    capacityKw: 10.44,
    panelCount: 18,
    panelWattage: 580,
    panelModel: '18× 580W N-Type TOPCon Dual-Glass',
    inverterSpec: '10 kW High-Voltage Hybrid Inverter',
    batterySpec: '10.24 kWh LiFePO4 Wall Storage (6,000 Cycles)',
    roofAreaSqm: 47,
    monthlyGenerationKwh: 1310,
    monthlySavingsThb: 6400,
    paybackYears: 4.3,
    priceThb: 329000,
    priceUsd: 9450,
    recommended: true,
    summary: 'Daytime solar production paired with evening LiFePO4 battery dispatch and automatic <10ms outage backup.',
    highlights: [
      'Seamless <10ms UPS transfer keeps critical circuits online',
      '10.24 kWh modular LiFePO4 storage for night cooling',
      'Smart peak-shaving schedule via mobile telemetry',
    ],
    bomDetails: {
      cells: '18× Tier-1 580W N-Type Dual-Glass Modules (22.8% eff.)',
      mounting: 'Heavy-duty extruded aluminum rails with EPDM weather seal',
      protection: 'Dual-pole DC/AC breakers, Type I+II surge, arc-fault AFCI',
      monitoring: '24/7 battery SOC, grid import/export & circuit load dashboard',
      permits: 'Licensed PE electrical schematic + utility synchronization',
      warranty: '30-year dual-glass power · 10-year battery & inverter · 5-year site care',
    },
  },
  {
    id: 'x-villa-15kw',
    name: 'X-Villa 15 kW Executive',
    category: 'hybrid',
    categoryLabel: 'Hybrid Storage',
    phaseLabel: '3-Phase 400V',
    capacityKw: 15.08,
    panelCount: 26,
    panelWattage: 580,
    panelModel: '26× 580W N-Type TOPCon Dual-Glass',
    inverterSpec: '15 kW 3-Phase Hybrid Inverter (3 MPPT)',
    batterySpec: '15.36 kWh LiFePO4 Stack + EV Charger Ready',
    roofAreaSqm: 68,
    monthlyGenerationKwh: 1920,
    monthlySavingsThb: 9500,
    paybackYears: 4.1,
    priceThb: 469000,
    priceUsd: 13480,
    summary: 'Whole-estate energy independence designed for multi-zone residences, pool pumps, and overnight EV charging.',
    highlights: [
      'Balanced 3-phase power delivery for heavy HVAC & EV loads',
      '15.36 kWh expandable LiFePO4 bank with active thermal BMS',
      'Dedicated EV surplus-solar charging integration',
    ],
    bomDetails: {
      cells: '26× Tier-1 580W N-Type Dual-Glass Bifacial Modules',
      mounting: 'Custom-pitched anodized rail matrix engineered for 160 km/h wind',
      protection: '3-Phase ATS automatic transfer, IP66 enclosures, earthing grid',
      monitoring: 'Per-phase load balancing + EV solar surplus controller',
      permits: 'Full engineering dossier, municipal & PEA/MEA approval',
      warranty: '30-year module output · 10-year hybrid & battery · 5-year O&M',
    },
  },
  {
    id: 'x-biz-50kw',
    name: 'X-Biz 50 kW Enterprise',
    category: 'commercial',
    categoryLabel: 'Commercial & Plant',
    phaseLabel: '3-Phase 400V',
    capacityKw: 50.31,
    panelCount: 86,
    panelWattage: 585,
    panelModel: '86× 585W Commercial Bifacial TOPCon',
    inverterSpec: '50 kW Commercial String Inverter (5 MPPT)',
    batterySpec: null,
    roofAreaSqm: 228,
    monthlyGenerationKwh: 6450,
    monthlySavingsThb: 31500,
    paybackYears: 3.4,
    priceThb: 1290000,
    priceUsd: 37100,
    summary: 'High-yield daytime offset for clinics, retail showrooms, cold-storage facilities, and corporate offices.',
    highlights: [
      'Zero-export & power-factor control compliant with industrial grids',
      '5 independent MPPT trackers for multi-roof orientation',
      'Includes 2-year scheduled thermal imaging inspection',
    ],
    bomDetails: {
      cells: '86× 585W Commercial Bifacial TOPCon Modules',
      mounting: 'Non-penetrating Klip-Lok metal clamp or concrete ballast system',
      protection: 'MDB tie-in with motorized MCCB, lightning protection & AFCI',
      monitoring: 'SCADA / Modbus RS485 industrial energy gateway',
      permits: 'ERC / DiW / PEA-MEA commercial permitting & structural stamp',
      warranty: '30-year power output · 10-year commercial inverter · 2-year free PM',
    },
  },
  {
    id: 'x-industrial-100kw',
    name: 'X-Industrial 100 kW Plant',
    category: 'commercial',
    categoryLabel: 'Commercial & Plant',
    phaseLabel: '3-Phase 400V / MV',
    capacityKw: 100.62,
    panelCount: 172,
    panelWattage: 585,
    panelModel: '172× 585W High-Yield Bifacial Modules',
    inverterSpec: '2× 50 kW Industrial Inverters + Grid Relay',
    batterySpec: null,
    roofAreaSqm: 455,
    monthlyGenerationKwh: 12950,
    monthlySavingsThb: 64000,
    paybackYears: 3.1,
    priceThb: 2390000,
    priceUsd: 68700,
    summary: 'Turnkey rooftop solar power plant delivering predictable daytime electricity cost reduction for manufacturing.',
    highlights: [
      'Sub-3.2 year payback on daytime manufacturing shift profiles',
      'Dual-inverter redundancy prevents single-point generation loss',
      'Full BOI / green-energy tax compliance documentation',
    ],
    bomDetails: {
      cells: '172× 585W Industrial Bifacial N-Type Modules',
      mounting: 'Wind-tunnel tested non-penetrating standing-seam clamp array',
      protection: 'Grid protection relay, fireman rapid-shutdown switch, SPD Type I+II',
      monitoring: 'Plant-level SCADA portal + automated fault alerting',
      permits: 'Complete regulatory licensing (Sor.Gor.1 / Or.Bor.Tor / PEA)',
      warranty: '30-year linear performance · 10-year inverter · 3-year O&M included',
    },
  },
];

export const SERVICE_CAPABILITIES: ServiceCapability[] = [
  {
    id: 'site-survey',
    number: '01.',
    title: 'Site Survey & 3D Shading Simulation',
    subtitle: 'Drone Photogrammetry & Structural Load Engineering',
    description:
      'Every project begins with millimeter-accurate drone roof mapping and hourly sun-path simulation. We calculate structural uplift, shading losses across seasons, and cable routing lengths before fabrication.',
    deliverables: [
      'Annual hourly irradiance & horizon shading model',
      'Roof truss & wind-load structural verification',
      'Exact kWh production forecast before contract sign-off',
    ],
    metricLabel: 'Forecast Accuracy',
    metricValue: '±3.5% vs. Actual Meter',
    span: 'wide',
  },
  {
    id: 'cell-design',
    number: '02.',
    title: 'Solar Cell & String Architecture',
    subtitle: 'N-Type TOPCon & Multi-MPPT Optimization',
    description:
      'We match Tier-1 monocrystalline N-Type TOPCon cells with balanced MPPT string voltages to minimize thermal derating in tropical heat and maximize early-morning output.',
    deliverables: [
      'Low -0.29%/°C temperature coefficient cells',
      'Voltage-matched strings for partial shade resilience',
      'Single-line PE-stamped electrical schematics',
    ],
    metricLabel: 'Cell Efficiency',
    metricValue: '22.8% TOPCon',
    span: 'narrow',
  },
  {
    id: 'installation',
    number: '03.',
    title: 'Certified Installation & Grid Sync',
    subtitle: 'Watertight Mounting & IP68 Protection',
    description:
      'In-house certified installation crews execute non-penetrating metal clamps or EPDM-sealed tile mounts, full DC/AC surge protection, and official PEA/MEA bidirectional meter permitting.',
    deliverables: [
      'SS304 stainless fasteners & anodized aluminum rails',
      'Type I+II surge arresters & rapid-shutdown safety',
      'End-to-end utility permitting & inspection',
    ],
    metricLabel: 'Residential Turnaround',
    metricValue: '2–3 Days On-Site',
    span: 'narrow',
  },
  {
    id: 'telemetry',
    number: '04.',
    title: 'Smart Telemetry & Lifecycle Care',
    subtitle: 'Thermal Diagnostics & Performance Audits',
    description:
      'Post-commissioning monitoring tracks real-time solar harvest against household or plant demand, backed by scheduled module cleaning and infrared hotspot inspections.',
    deliverables: [
      'Live generation, self-consumption & battery SOC tracking',
      'Annual infrared thermography cell health scan',
      'Dedicated warranty claim & inverter firmware management',
    ],
    metricLabel: 'System Availability',
    metricValue: '99.4% Measured Uptime',
    span: 'wide',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'sathorn-clinic',
    title: 'Sathorn Specialty Medical Center',
    location: 'Bangkok · 30 kW Commercial Array',
    sector: 'Healthcare Facility',
    systemSize: '30.16 kW (52× 580W TOPCon)',
    annualYield: '43,800 kWh / yr',
    billReduction: '41.8% Annual Bill Drop',
    paybackPeriod: '3.6 Years',
    summary:
      'High daytime HVAC and diagnostic equipment demand aligned directly with solar generation peaks, cutting monthly utility spend by ฿17,800 without roof penetration.',
    attribution: 'Dr. Narongrit S., Operations Director — Sathorn Medical Group',
  },
  {
    id: 'bangna-logistics',
    title: 'Bangna Cold-Chain Logistics Hub',
    location: 'Samut Prakan · 100 kW Industrial Plant',
    sector: 'Cold Storage & Distribution',
    systemSize: '100.62 kW (172× 585W Bifacial)',
    annualYield: '146,200 kWh / yr',
    billReduction: '฿614,000 Saved in Year 1',
    paybackPeriod: '3.1 Years',
    summary:
      'Dual 50 kW inverters with Klip-Lok non-penetrating clamps offset daytime chiller compressor loads across 455 m² of standing-seam warehouse roof.',
    attribution: 'Kittipong V., Plant Engineering Manager — Eastern Cold Logistics',
  },
];
