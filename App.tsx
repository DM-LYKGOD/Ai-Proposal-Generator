
import React, { useState, useCallback } from 'react';
import { ProposalData, UserInputs } from './types';
import { INITIAL_PROPOSAL_DATA } from './constants';
import { generateProposalContent } from './services/geminiService';
import ProposalForm from './components/ProposalForm';
import ProposalPreview from './components/ProposalPreview';

const App: React.FC = () => {
  const [userInputs, setUserInputs] = useState<UserInputs>({
    clientName: 'Turiya Communications',
    serviceDescription: 'Sales Email and LinkedIn Outreach Automation',
  });
  const [proposalData, setProposalData] = useState<ProposalData>(INITIAL_PROPOSAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedData = await generateProposalContent(userInputs);
      if (generatedData) {
        setProposalData(generatedData);
      } else {
        setError('Failed to generate proposal. The AI returned an empty response.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the proposal. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [userInputs]);
  
  const handleDataChange = useCallback(<K extends keyof ProposalData>(key: K, value: ProposalData[K]) => {
    setProposalData(prev => ({...prev, [key]: value}));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md p-4 no-print">
        <h1 className="text-3xl font-bold text-gray-800 text-center">AI Proposal Generator</h1>
      </header>
      <main className="container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 no-print">
            <ProposalForm 
                userInputs={userInputs}
                setUserInputs={setUserInputs}
                onGenerate={handleGenerate}
                isLoading={isLoading}
                error={error}
            />
        </div>
        <div className="lg:col-span-2">
            <ProposalPreview 
                data={proposalData}
                onDataChange={handleDataChange}
            />
        </div>
      </main>
    </div>
  );
};

export default App;
