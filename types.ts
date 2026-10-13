
export interface ProposalData {
  proposalFor: string;
  client: string;
  serviceProvider: string;
  proposalDate: string;
  introduction: string;
  projectScope: {
    salesEmail: string[];
    linkedin: string[];
    reporting: string[];
  };
  workflowOverview: string[];
  developmentTimeline: {
    phase: string;
    activity: string;
    duration: string;
  }[];
  costing: {
    description: string;
    cost: string;
    remarks: string;
  }[];
  totalMonthlyCost: string;
  paymentTerms: string[];
  sla: {
    parameter: string;
    target: string;
    description: string;
  }[];
  whyUs: string[];
  nextSteps: string[];
  conclusion: string;
}

export interface UserInputs {
    clientName: string;
    serviceDescription: string;
}
