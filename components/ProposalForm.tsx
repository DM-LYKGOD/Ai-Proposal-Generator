
import React from 'react';
import { UserInputs } from '../types';

interface ProposalFormProps {
  userInputs: UserInputs;
  setUserInputs: React.Dispatch<React.SetStateAction<UserInputs>>;
  onGenerate: () => void;
  isLoading: boolean;
  error: string | null;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ userInputs, setUserInputs, onGenerate, isLoading, error }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInputs(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-700 border-b pb-2">Proposal Details</h2>
      
      <div className="space-y-2">
        <label htmlFor="clientName" className="block text-sm font-medium text-gray-600">Client Name</label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={userInputs.clientName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
          placeholder="e.g., Turiya Communications"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="serviceDescription" className="block text-sm font-medium text-gray-600">Service / Product Description</label>
        <textarea
          id="serviceDescription"
          name="serviceDescription"
          value={userInputs.serviceDescription}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
          placeholder="e.g., Sales Email and LinkedIn Outreach Automation"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate with AI'
        )}
      </button>
    </div>
  );
};

export default ProposalForm;
