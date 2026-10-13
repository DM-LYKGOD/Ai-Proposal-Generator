
import { GoogleGenAI, Type } from "@google/genai";
import { ProposalData, UserInputs } from '../types';

const proposalSchema = {
  type: Type.OBJECT,
  properties: {
    proposalFor: { type: Type.STRING },
    client: { type: Type.STRING },
    serviceProvider: { type: Type.STRING },
    proposalDate: { type: Type.STRING, description: "Today's date in YYYY-MM-DD format." },
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
};

export async function generateProposalContent(inputs: UserInputs): Promise<ProposalData | null> {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Generate a comprehensive techno-commercial proposal in JSON format.
    The proposal is for a client named "${inputs.clientName}".
    The service being offered is "${inputs.serviceDescription}".
    
    The service provider is "ThoughtBins Technologies".
    
    Please generate compelling and professional content for all sections of the proposal, including Introduction, Project Scope, Workflow Overview, Development Timeline, Costing & Commercials, Payment Terms, Service Level Agreement (SLA), Why ThoughtBins Technologies, Next Steps, and Conclusion.
    
    Tailor the content to be persuasive for the client. The costing should be reasonable for a software automation service.
    Ensure all string array elements are concise bullet points.
    Use the client's name, "${inputs.clientName}", wherever appropriate (e.g., in the conclusion, payment terms).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: proposalSchema,
      },
    });

    const jsonText = response.text.trim();
    if (jsonText) {
        return JSON.parse(jsonText) as ProposalData;
    }
    return null;
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw error;
  }
}
