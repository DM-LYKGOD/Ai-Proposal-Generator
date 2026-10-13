import React, { useState, useCallback } from 'react';
import { ProposalData, UserInputs, ProposalBranding } from './types';
import { INITIAL_PROPOSAL_DATA, DEFAULT_BRANDING } from './constants';
import { generateProposalContent } from './services/geminiService';
import ProposalForm from './components/ProposalForm';
import ProposalPreview from './components/ProposalPreview';
import { FileText, Sparkles, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [userInputs, setUserInputs] = useState<UserInputs>({
    clientName: 'Turiya Communications',
    serviceDescription: 'Sales Email and LinkedIn Outreach Automation',
    industry: 'B2B Growth & Lead Generation',
    tone: 'techno-commercial',
    currency: 'INR',
    serviceProviderName: 'ThoughtBins Technologies',
  });
  const [proposalData, setProposalData] = useState<ProposalData>(INITIAL_PROPOSAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedData = await generateProposalContent(userInputs);
      if (generatedData) {
        setProposalData(generatedData);
        showNotification("Proposal successfully drafted!");
      } else {
        setError('Failed to generate proposal. Please verify the input values.');
      }
    } catch (err: any) {
      console.error("Proposal generation error:", err);
      setError(err?.message || 'An error occurred while generating the proposal.');
    } finally {
      setIsLoading(false);
    }
  }, [userInputs]);
  
  const handleDataChange = useCallback(<K extends keyof ProposalData>(key: K, value: ProposalData[K]) => {
    setProposalData(prev => {
      const next = { ...prev, [key]: value };
      // If serviceProvider changes, keep branding in sync
      if (key === 'serviceProvider' && typeof value === 'string') {
        next.branding = {
          ...(next.branding || DEFAULT_BRANDING),
          companyName: value,
        };
      }
      return next;
    });
  }, []);

  const handleApplyPreset = useCallback((presetData: Partial<ProposalData>) => {
    setProposalData(prev => ({
      ...prev,
      ...presetData,
      branding: {
        ...(prev.branding || DEFAULT_BRANDING),
        ...(presetData.branding || {}),
      },
      signatory: {
        ...(prev.signatory || { enabled: true }),
        ...(presetData.signatory || {}),
      },
    }));

    if (presetData.client) {
      setUserInputs(prev => ({
        ...prev,
        clientName: presetData.client || prev.clientName,
        serviceDescription: presetData.proposalFor?.replace(` for ${presetData.client}`, '') || prev.serviceDescription,
        serviceProviderName: presetData.serviceProvider || prev.serviceProviderName,
      }));
    }

    showNotification(`Loaded template: ${presetData.proposalFor?.slice(0, 32) || 'Preset'}...`);
  }, []);

  const handleUpdateBranding = useCallback((updated: Partial<ProposalBranding>) => {
    setProposalData(prev => ({
      ...prev,
      serviceProvider: updated.companyName || prev.serviceProvider,
      branding: {
        ...(prev.branding || DEFAULT_BRANDING),
        ...updated,
      },
    }));
  }, []);

  const handleImportData = useCallback((imported: ProposalData) => {
    setProposalData(imported);
    setUserInputs(prev => ({
      ...prev,
      clientName: imported.client || prev.clientName,
      serviceDescription: imported.proposalFor?.replace(` for ${imported.client}`, '') || prev.serviceDescription,
      serviceProviderName: imported.serviceProvider || prev.serviceProviderName,
    }));
    showNotification("Imported proposal successfully!");
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800 antialiased">
      {/* App Navigation Bar */}
      <header className="bg-white border-b border-gray-200/80 sticky top-0 z-30 shadow-xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight flex items-center gap-2">
                ThoughtBins Sales Proposal Studio
                <span className="text-[11px] font-medium bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                  Techno-Commercial
                </span>
              </h1>
              <p className="text-xs text-gray-500">
                Design, customize, AI-generate, and export print-ready PDF sales proposals
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {statusMessage && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1 animate-fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" /> {statusMessage}
              </span>
            )}
            <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Live Preview & Instant Edit</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls & AI Generation */}
        <aside className="lg:col-span-4 no-print space-y-4 sticky top-20">
          <ProposalForm 
            userInputs={userInputs}
            setUserInputs={setUserInputs}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            error={error}
            onApplyPreset={handleApplyPreset}
            currentProposal={proposalData}
            onUpdateBranding={handleUpdateBranding}
          />
        </aside>

        {/* Right Column: Live Proposal Document Preview */}
        <section className="lg:col-span-8 space-y-4">
          <ProposalPreview 
            data={proposalData}
            onDataChange={handleDataChange}
            onImportData={handleImportData}
          />
        </section>
      </main>
    </div>
  );
};

export default App;
