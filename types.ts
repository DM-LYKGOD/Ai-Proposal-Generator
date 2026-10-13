export interface ScopeSection {
  category: string;
  items: string[];
}

export interface TimelineItem {
  phase: string;
  activity: string;
  duration: string;
}

export interface CostItem {
  description: string;
  cost: string;
  remarks: string;
}

export interface SLAItem {
  parameter: string;
  target: string;
  description: string;
}

export interface SignatoryInfo {
  enabled: boolean;
  clientSignerName?: string;
  clientSignerTitle?: string;
  providerSignerName?: string;
  providerSignerTitle?: string;
}

export interface ProposalBranding {
  companyName: string;
  logoUrl: string;
  email: string;
  website: string;
  phone?: string;
  address?: string;
  referenceNumber?: string;
  validityDays?: string;
  currency: string;
  themeColor: 'sky' | 'navy' | 'indigo' | 'emerald' | 'charcoal' | 'crimson';
}

export interface ProposalData {
  proposalFor: string;
  client: string;
  serviceProvider: string;
  proposalDate: string;
  referenceNumber?: string;
  validUntil?: string;
  introduction: string;
  projectScope: {
    salesEmail: string[];
    linkedin: string[];
    reporting: string[];
    [key: string]: string[];
  };
  customScopeCategories?: ScopeSection[];
  workflowOverview: string[];
  developmentTimeline: TimelineItem[];
  costing: CostItem[];
  totalMonthlyCost: string;
  paymentTerms: string[];
  sla: SLAItem[];
  whyUs: string[];
  nextSteps: string[];
  conclusion: string;
  signatory?: SignatoryInfo;
  branding?: ProposalBranding;
}

export interface UserInputs {
  clientName: string;
  serviceDescription: string;
  industry?: string;
  tone?: 'techno-commercial' | 'formal' | 'consultative' | 'agile';
  currency?: string;
  pricingType?: 'monthly' | 'fixed' | 'milestone';
  serviceProviderName?: string;
}
