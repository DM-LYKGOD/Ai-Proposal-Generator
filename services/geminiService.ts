import { GoogleGenAI, Type } from "@google/genai";
import { ProposalData, UserInputs } from '../types';
import { DEFAULT_BRANDING } from '../constants';

const proposalSchema = {
  type: Type.OBJECT,
  properties: {
    proposalFor: { type: Type.STRING },
    client: { type: Type.STRING },
    serviceProvider: { type: Type.STRING },
    proposalDate: { type: Type.STRING, description: "Today's date in YYYY-MM-DD format." },
    referenceNumber: { type: Type.STRING, description: "Proposal reference ID, e.g. TBT/PROP/2026/..." },
    validUntil: { type: Type.STRING, description: "Validity period, e.g. 30 Days from issue" },
    introduction: { type: Type.STRING },
    projectScope: {
      type: Type.OBJECT,
      properties: {
        salesEmail: { type: Type.ARRAY, items: { type: Type.STRING } },
        linkedin: { type: Type.ARRAY, items: { type: Type.STRING } },
        reporting: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
    workflowOverview: { type: Type.ARRAY, items: { type: Type.STRING } },
    developmentTimeline: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          phase: { type: Type.STRING },
          activity: { type: Type.STRING },
          duration: { type: Type.STRING },
        },
      },
    },
    costing: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          description: { type: Type.STRING },
          cost: { type: Type.STRING },
          remarks: { type: Type.STRING },
        },
      },
    },
    totalMonthlyCost: { type: Type.STRING },
    paymentTerms: { type: Type.ARRAY, items: { type: Type.STRING } },
    sla: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          parameter: { type: Type.STRING },
          target: { type: Type.STRING },
          description: { type: Type.STRING },
        },
      },
    },
    whyUs: { type: Type.ARRAY, items: { type: Type.STRING } },
    nextSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
    conclusion: { type: Type.STRING },
  },
  required: [
    "proposalFor",
    "client",
    "serviceProvider",
    "proposalDate",
    "introduction",
    "projectScope",
    "workflowOverview",
    "developmentTimeline",
    "costing",
    "totalMonthlyCost",
    "paymentTerms",
    "sla",
    "whyUs",
    "nextSteps",
    "conclusion",
  ],
};

/**
 * Intelligent fallback generator when Gemini API key is missing or encounters network errors.
 * Ensures the application is 100% resilient and always yields tailored techno-commercial content.
 */
export function generateLocalProposal(inputs: UserInputs): ProposalData {
  const provider = inputs.serviceProviderName || "ThoughtBins Technologies";
  const client = inputs.clientName || "Valued Client";
  const service = inputs.serviceDescription || "Technology & Automation Services";
  const currency = inputs.currency || "INR";
  const currSymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "INR ";
  const today = new Date().toLocaleDateString('en-CA');
  const ref = `TBT/PROP/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`;

  return {
    proposalFor: `${service} for ${client}`,
    client,
    serviceProvider: provider,
    proposalDate: today,
    referenceNumber: ref,
    validUntil: "30 Days from date of issuance",
    branding: {
      ...DEFAULT_BRANDING,
      companyName: provider,
      currency,
    },
    introduction: `${provider} is pleased to present this comprehensive techno-commercial proposal to ${client}. Our focus is delivering high-impact, scalable, and dependable solutions for ${service}. This document details our technical execution strategy, deliverable scope, phased roadmap, commercial structure, and Service Level Agreement (SLA) to guarantee mutual success and transparency.`,
    projectScope: {
      salesEmail: [
        `Architecture & Solution Design tailored specifically for ${client}'s operational requirements`,
        `Integration with existing systems, data models, and team workflows`,
        `Automated data validation, schema mapping, and process error handling`,
        `High-throughput execution pipelines with monitoring and alerts`,
      ],
      linkedin: [
        `Automated engagement workflows and intelligent scheduling controls`,
        `Custom rules engine, personalization placeholders, and conditional routing`,
        `Security best practices, encryption at rest, and credential protection`,
      ],
      reporting: [
        `Real-time executive performance dashboard tracking core KPIs and turnaround times`,
        `Automated weekly summary reports and downloadable raw audit logs`,
      ],
    },
    workflowOverview: [
      `Phase 1: Discovery workshop & requirement freeze with ${client}'s key stakeholders`,
      `Phase 2: Architectural setup, sandbox environment provisioning, and security clearance`,
      `Phase 3: Core development, pipeline construction, and unit testing`,
      `Phase 4: Pilot deployment, stakeholder feedback cycles, and fine-tuning`,
      `Phase 5: Production go-live, team knowledge handover, and SLA monitoring`,
    ],
    developmentTimeline: [
      { phase: "Week 1", activity: "Requirements freeze, architecture blueprint, environment setup", duration: "5 business days" },
      { phase: "Week 2", activity: "Core implementation, API & pipeline development, internal QA", duration: "5 business days" },
      { phase: "Week 3", activity: "End-to-end user acceptance testing (UAT), bug triage, pilot run", duration: "5 business days" },
      { phase: "Week 4", activity: "Production rollout, team training, SLA kick-off", duration: "3 business days" },
    ],
    costing: [
      { description: `Core Implementation & Setup for ${service}`, cost: `${currSymbol}45,000`, remarks: "One-time technical configuration and onboarding" },
      { description: "Managed Infrastructure, Monitoring & Maintenance", cost: `${currSymbol}15,000 / month`, remarks: "Includes hosting, security patches, backups, and 24/7 alerting" },
      { description: "Onboarding & Stakeholder Training Session", cost: "Waived Off", remarks: "Complimentary 2-hour hands-on training workshop" },
    ],
    totalMonthlyCost: `Total Monthly Cost: ${currSymbol}15,000 (plus one-time setup of ${currSymbol}45,000, exclusive of taxes)`,
    paymentTerms: [
      "50% of initial setup fee due upon agreement execution and technical kickoff",
      "50% balance upon successful User Acceptance Testing (UAT) sign-off",
      "Recurring monthly maintenance invoices billed at the start of each service cycle (Net-15 terms)",
      "All invoices payable via standard Electronic Bank Transfer (NEFT/RTGS/Wire) or Corporate Card",
    ],
    sla: [
      { parameter: "System Availability", target: "99.5%", description: "Continuous production uptime excluding scheduled off-hours maintenance" },
      { parameter: "Incident Response", target: "< 2 hours", description: "First response by a designated technical lead during business hours" },
      { parameter: "Critical Resolution", target: "< 12 hours", description: "Expedited fix for any mission-critical blocker" },
      { parameter: "Routine Requests", target: "< 48 hours", description: "Minor configuration tweaks, copy adjustments, or general queries" },
      { parameter: "Monthly Review", target: "Monthly", description: "Joint performance and roadmap alignment session" },
    ],
    whyUs: [
      `Proven domain expertise in architecting robust systems for ${service}`,
      "Engineering-first mindset with transparent, zero-surprise commercial commitments",
      "Enterprise security compliance and comprehensive documentation handed over to your team",
      "Dedicated Slack/Email communication channel with direct access to senior engineers",
    ],
    nextSteps: [
      "Review and mutual digital sign-off of this techno-commercial proposal",
      `Schedule the technical kickoff and discovery session with ${client}'s lead team`,
      "Provisioning of required credentials, APIs, and sandbox infrastructure",
      "Delivery of initial milestone demonstration within 10 business days",
    ],
    conclusion: `${provider} is excited about the opportunity to partner with ${client}. We are committed to delivering high-caliber engineering, measurable business value, and a collaborative relationship built on trust and technical excellence.`,
    signatory: {
      enabled: true,
      clientSignerName: `Authorized Signatory (${client})`,
      clientSignerTitle: "Director / Vice President",
      providerSignerName: "Authorized Signatory",
      providerSignerTitle: provider,
    },
  };
}

export async function generateProposalContent(inputs: UserInputs): Promise<ProposalData> {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.warn("Gemini API key is not configured in process.env. Using smart local generator.");
    return generateLocalProposal(inputs);
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an expert enterprise sales engineer. Generate a comprehensive, professional Techno-Commercial Sales Proposal in JSON matching the exact schema.
    
    Client Name: "${inputs.clientName}"
    Service / Solution: "${inputs.serviceDescription}"
    Industry / Domain: "${inputs.industry || 'Technology & Digital Transformation'}"
    Tone: "${inputs.tone || 'techno-commercial'}"
    Currency: "${inputs.currency || 'INR'}"
    Service Provider Name: "${inputs.serviceProviderName || 'ThoughtBins Technologies'}"
    
    Structure and Content Requirements:
    1. Header metadata: proposalFor (e.g. "${inputs.serviceDescription} for ${inputs.clientName}"), client, serviceProvider, proposalDate (today YYYY-MM-DD), referenceNumber (e.g. TBT/PROP/${new Date().getFullYear()}/XXX), validUntil ("30 Days from issue").
    2. Introduction: Professional paragraph framing the client's strategic advantage, operational efficiency, and ROI.
    3. Project Scope: 3 clear categories:
       - salesEmail (or primary technical component): 5-7 clear, high-impact bullet points.
       - linkedin (or secondary workflow / automation component): 4-6 bullet points.
       - reporting (or analytics/insights component): 2-3 bullet points.
    4. Workflow Overview: 5-6 numbered steps outlining the end-to-end sequence of execution.
    5. Development Timeline: 3-4 phases with phase name, activity summary, and realistic duration (in days or weeks).
    6. Costing & Commercials: 3-4 line items with description, cost in ${inputs.currency || 'INR'}, and strategic remarks (including any waived onboarding/partner benefits).
    7. Total Cost: Clear summary string e.g. "Total Monthly Cost: ${inputs.currency || 'INR'} 15,000 (exclusive of GST)".
    8. Payment Terms: 3-4 clear commercial terms (milestones, billing start, Net-15).
    9. SLA: 5-6 standard enterprise SLA rows (System Uptime, Response Time, Critical Resolution, Reporting Accuracy, Monthly Review).
    10. Why Us: 4-5 compelling differentiators for "${inputs.serviceProviderName || 'ThoughtBins Technologies'}".
    11. Next Steps: 4-5 actionable steps to move to kickoff.
    12. Conclusion: Persuasive closing statement addressing "${inputs.clientName}".

    Output ONLY valid JSON adhering to the specified schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: proposalSchema,
        temperature: 0.3,
      },
    });

    const jsonText = response.text?.trim();
    if (jsonText) {
      const parsed = JSON.parse(jsonText) as ProposalData;
      // Ensure branding and signatory defaults exist
      parsed.branding = {
        ...DEFAULT_BRANDING,
        companyName: parsed.serviceProvider || inputs.serviceProviderName || DEFAULT_BRANDING.companyName,
        currency: inputs.currency || "INR",
      };
      parsed.signatory = {
        enabled: true,
        clientSignerName: `Authorized Signatory (${inputs.clientName})`,
        clientSignerTitle: "Director / Authorized Representative",
        providerSignerName: "Authorized Signatory",
        providerSignerTitle: parsed.serviceProvider || DEFAULT_BRANDING.companyName,
      };
      return parsed;
    }
    
    return generateLocalProposal(inputs);
  } catch (error) {
    console.error("Gemini API error, falling back to local proposal generator:", error);
    return generateLocalProposal(inputs);
  }
}
