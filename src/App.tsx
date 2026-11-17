/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import CalculatorAndProofSection from './components/CalculatorAndProofSection';
import ConsultationSection from './components/ConsultationSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import PackagesSection from './components/PackagesSection';
import ServicesSection from './components/ServicesSection';
import AiSolarAssistantModal from './components/AiSolarAssistantModal';
import LeadManagementModal from './components/LeadManagementModal';
import FloatingContactWidget from './components/FloatingContactWidget';
import { LanguageProvider } from './context/LanguageContext';
import type { CurrencyCode, SolarPackage } from './data/solarData';

function MainApp() {
  const [selectedPackageId, setSelectedPackageId] = useState<string>('x-prime-10kw');
  const [currency, setCurrency] = useState<CurrencyCode>('THB');
  const [monthlyBillThb, setMonthlyBillThb] = useState<number>(8500);

  // Modals state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isLeadAdminOpen, setIsLeadAdminOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPackage = (pkg: SolarPackage) => {
    setSelectedPackageId(pkg.id);
    scrollToSection('contact');
  };

  const handleApplyBillData = (amountThb: number, packageId: string) => {
    setMonthlyBillThb(amountThb);
    setSelectedPackageId(packageId);
    setTimeout(() => {
      scrollToSection('calculator');
    }, 150);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#071124] text-slate-100 relative">
      <Navbar
        onRequestSurvey={() => scrollToSection('contact')}
        onOpenAiAssistant={() => setIsAiModalOpen(true)}
        onOpenLeadAdmin={() => setIsLeadAdminOpen(true)}
      />

      <main className="flex-1">
        <HeroSection
          onExplorePackages={() => scrollToSection('packages')}
          onOpenCalculator={() => scrollToSection('calculator')}
          onOpenAiAssistant={() => setIsAiModalOpen(true)}
        />

        <ServicesSection />

        <PackagesSection
          selectedPackageId={selectedPackageId}
          currency={currency}
          onCurrencyChange={setCurrency}
          onSelectPackage={handleSelectPackage}
        />

        <CalculatorAndProofSection
          currency={currency}
          monthlyBillThb={monthlyBillThb}
          onMonthlyBillChange={setMonthlyBillThb}
          onApplyRecommendation={handleSelectPackage}
        />

        <ConsultationSection
          selectedPackageId={selectedPackageId}
          onPackageChange={setSelectedPackageId}
          monthlyBillThb={monthlyBillThb}
          currency={currency}
        />
      </main>

      <Footer />

      {/* Floating Quick Action Contacts & AI Pill */}
      <FloatingContactWidget
        onOpenAiAssistant={() => setIsAiModalOpen(true)}
        onOpenLeadAdmin={() => setIsLeadAdminOpen(true)}
      />

      {/* Gemini AI Solar Assistant Modal */}
      <AiSolarAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplyBillData={handleApplyBillData}
      />

      {/* Lead Management Admin Modal */}
      <LeadManagementModal
        isOpen={isLeadAdminOpen}
        onClose={() => setIsLeadAdminOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
