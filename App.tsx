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

  const [viewMode, setViewMode] = useState<'split' | 'document' | 'editor'>('split');

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800 antialiased selection:bg-sky-100">
      {/* App Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight flex items-center gap-2">
                ThoughtBins Proposal Studio
                <span className="hidden sm:inline-block text-[11px] font-medium bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                  Techno-Commercial
                </span>
              </h1>
              <p className="hidden sm:block text-xs text-gray-500">
                Design, customize, AI-generate, and export print-ready PDF sales proposals
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* View Mode Switcher */}
            <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 flex items-center text-xs font-semibold">
              <button
                type="button"
                onClick={() => setViewMode('editor')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'editor'
                    ? 'bg-white text-sky-700 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Controls
              </button>
              <button
                type="button"
                onClick={() => setViewMode('split')}
                className={`hidden lg:block px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'split'
                    ? 'bg-white text-sky-700 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Split
              </button>
              <button
                type="button"
                onClick={() => setViewMode('document')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'document'
                    ? 'bg-white text-sky-700 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Document
              </button>
            </div>

            {statusMessage && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1 animate-fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" /> {statusMessage}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className={`grid gap-8 items-start ${
          viewMode === 'split' 
            ? 'grid-cols-1 lg:grid-cols-12' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {/* Left Column: Form Controls & AI Generation */}
          {(viewMode === 'split' || viewMode === 'editor') && (
            <aside className={`no-print space-y-4 ${
              viewMode === 'split'
                ? 'lg:col-span-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto pr-1'
                : 'w-full'
            }`}>
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
          )}

          {/* Right Column: Live Proposal Document Preview */}
          {(viewMode === 'split' || viewMode === 'document') && (
            <section className={`space-y-4 ${
              viewMode === 'split' ? 'lg:col-span-8' : 'w-full'
            }`}>
              <ProposalPreview 
                data={proposalData}
                onDataChange={handleDataChange}
                onImportData={handleImportData}
              />
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
