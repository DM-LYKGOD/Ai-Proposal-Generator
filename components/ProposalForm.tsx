import React, { useState } from 'react';
import { UserInputs, ProposalData, ProposalBranding } from '../types';
import { PROPOSAL_PRESETS, THEME_CONFIGS, DEFAULT_BRANDING, INITIAL_PROPOSAL_DATA } from '../constants';
import { 
  Sparkles, 
  RotateCcw, 
  Settings, 
  Building2, 
  FileText, 
  DollarSign, 
  Check, 
  Briefcase, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  Sliders,
  Send
} from 'lucide-react';

interface ProposalFormProps {
  userInputs: UserInputs;
  setUserInputs: React.Dispatch<React.SetStateAction<UserInputs>>;
  onGenerate: () => void;
  isLoading: boolean;
  error: string | null;
  onApplyPreset: (presetData: Partial<ProposalData>) => void;
  currentProposal: ProposalData;
  onUpdateBranding: (branding: Partial<ProposalBranding>) => void;
}

const ProposalForm: React.FC<ProposalFormProps> = ({
  userInputs,
  setUserInputs,
  onGenerate,
  isLoading,
  error,
  onApplyPreset,
  currentProposal,
  onUpdateBranding,
}) => {
  const [activeTab, setActiveTab] = useState<'generate' | 'presets' | 'branding'>('generate');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleBrandingChange = (key: keyof ProposalBranding, value: string) => {
    onUpdateBranding({ [key]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 bg-slate-50/70 p-1">
        <button
          onClick={() => setActiveTab('generate')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'generate'
              ? 'bg-white text-sky-700 shadow-sm border border-gray-200/60'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-sky-600" />
          AI Creator
        </button>

        <button
          onClick={() => setActiveTab('presets')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'presets'
              ? 'bg-white text-sky-700 shadow-sm border border-gray-200/60'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-600" />
          Templates
        </button>

        <button
          onClick={() => setActiveTab('branding')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'branding'
              ? 'bg-white text-sky-700 shadow-sm border border-gray-200/60'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Building2 className="w-4 h-4 text-indigo-600" />
          Branding
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* TAB 1: AI GENERATOR */}
        {activeTab === 'generate' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center justify-between">
                <span>Create Proposal</span>
                <span className="text-[11px] font-normal text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                  Powered by Gemini AI
                </span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Input your client and service requirements to generate a tailored 10-section proposal.
              </p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="clientName" className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                Client / Company Name *
              </label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={userInputs.clientName}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                placeholder="e.g., Turiya Communications"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="serviceDescription" className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                Service / Offering Description *
              </label>
              <textarea
                id="serviceDescription"
                name="serviceDescription"
                value={userInputs.serviceDescription}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                placeholder="e.g., Sales Email and LinkedIn Outreach Automation with multi-domain warmup and CRM integration"
              />
            </div>

            {/* Quick Toggle for Advanced Options */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs text-sky-700 font-semibold flex items-center gap-1 hover:text-sky-800"
              >
                <Sliders className="w-3.5 h-3.5" />
                {showAdvanced ? "Hide Advanced Parameters" : "Show Advanced Parameters (Industry, Tone, Currency)"}
                {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showAdvanced && (
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Industry / Target Sector
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={userInputs.industry || ''}
                    onChange={handleInputChange}
                    placeholder="e.g., B2B SaaS, Agency, Real Estate, E-Commerce"
                    className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Proposal Tone</label>
                    <select
                      name="tone"
                      value={userInputs.tone || 'techno-commercial'}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-sky-500"
                    >
                      <option value="techno-commercial">Techno-Commercial</option>
                      <option value="formal">Enterprise Formal</option>
                      <option value="consultative">Consultative Advisory</option>
                      <option value="agile">Agile & Startup</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Commercial Currency</label>
                    <select
                      name="currency"
                      value={userInputs.currency || 'INR'}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-sky-500"
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Service Provider (Your Agency Name)
                  </label>
                  <input
                    type="text"
                    name="serviceProviderName"
                    value={userInputs.serviceProviderName || currentProposal.serviceProvider}
                    onChange={handleInputChange}
                    placeholder="e.g., ThoughtBins Technologies"
                    className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs">
                {error}
              </div>
            )}

            <button
              onClick={onGenerate}
              disabled={isLoading || !userInputs.clientName.trim()}
              className="w-full flex justify-center items-center px-4 py-2.5 text-sm font-semibold rounded-lg shadow-sm text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Drafting Proposal...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Proposal with AI
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onApplyPreset(INITIAL_PROPOSAL_DATA)}
              className="w-full flex items-center justify-center text-xs font-medium text-gray-600 hover:text-sky-700 py-1.5 transition-colors gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Original ThoughtBins Proposal
            </button>
          </div>
        )}

        {/* TAB 2: PRE-BUILT TEMPLATES */}
        {activeTab === 'presets' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Pre-built Templates</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Load fully-formed sales proposals formatted with authentic scope, SLA, and commercials.
              </p>
            </div>

            <div className="space-y-2.5">
              {PROPOSAL_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className="p-3.5 border border-gray-200 hover:border-sky-400 rounded-lg bg-white hover:bg-sky-50/40 transition-all cursor-pointer group"
                  onClick={() => onApplyPreset(preset.data)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {preset.tag}
                    </span>
                    <span className="text-xs text-sky-600 opacity-0 group-hover:opacity-100 font-medium transition-opacity flex items-center gap-0.5">
                      Load Template →
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mt-1.5">{preset.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {preset.data.introduction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BRANDING & COMPANY DETAILS */}
        {activeTab === 'branding' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Company & Header Info</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Configure your agency branding, contact links, and document numbering.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Company / Provider Name</label>
                <input
                  type="text"
                  value={currentProposal.branding?.companyName || currentProposal.serviceProvider}
                  onChange={(e) => {
                    handleBrandingChange('companyName', e.target.value);
                    onUpdateBranding({ companyName: e.target.value });
                  }}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Logo Image URL</label>
                <input
                  type="text"
                  value={currentProposal.branding?.logoUrl || ''}
                  onChange={(e) => handleBrandingChange('logoUrl', e.target.value)}
                  placeholder="https://... logo image URL"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-sky-500"
                />
                <button
                  type="button"
                  onClick={() => handleBrandingChange('logoUrl', DEFAULT_BRANDING.logoUrl)}
                  className="text-[11px] text-sky-600 hover:underline mt-1 block"
                >
                  Use ThoughtBins Default Logo
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={currentProposal.branding?.email || 'info@thoughtbins.com'}
                    onChange={(e) => handleBrandingChange('email', e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Website</label>
                  <input
                    type="text"
                    value={currentProposal.branding?.website || 'www.thoughtbins.com'}
                    onChange={(e) => handleBrandingChange('website', e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Proposal Ref ID</label>
                  <input
                    type="text"
                    value={currentProposal.referenceNumber || 'TBT/PROP/2026/042'}
                    onChange={(e) => handleBrandingChange('referenceNumber', e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Validity</label>
                  <input
                    type="text"
                    value={currentProposal.validUntil || '30 Days from issue'}
                    onChange={(e) => handleBrandingChange('validityDays', e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Currency Code</label>
                <select
                  value={currentProposal.branding?.currency || 'INR'}
                  onChange={(e) => handleBrandingChange('currency', e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-sky-500"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalForm;
