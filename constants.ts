
import { ProposalData } from './types';

export const INITIAL_PROPOSAL_DATA: ProposalData = {
  proposalFor: "Sales Email and LinkedIn Outreach Automation for [Client Name]",
  client: "[Client Name]",
  serviceProvider: "ThoughtBins Technologies",
  proposalDate: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD
  introduction: "ThoughtBins Technologies specializes in intelligent automation solutions that streamline communication workflows and drive improved conversion outcomes. This proposal presents our plan to implement a Sales Email and LinkedIn Outreach Automation System for [Client Name], emphasizing scalability, transparency, and operational efficiency. Our objective is to empower your team to efficiently manage bulk outreach campaigns while sustaining personalization, tracking engagement, and automating follow-ups.",
  projectScope: {
    salesEmail: [
      "Lead upload via Excel or CRM integration",
      "Automated lead cleaning and formatting",
      "Personalized outreach template generation",
      "Bulk email scheduling and sending with intelligent throttling",
      "Email tracking (opens, clicks, replies)",
      "Response categorization using sentiment detection (positive, negative, neutral)",
      "Automatic forwarding of actionable responses to relevant team members",
    ],
    linkedin: [
      "Lead upload or scraping from LinkedIn (by keyword, location, or title)",
      "Automated connection requests and follow-up messaging",
      "Smart message personalization via placeholders",
      "Reply and engagement rate tracking",
      "CRM integration for lead management and conversion tracking",
    ],
    reporting: [
      "Dashboard for key metrics visualization (sent emails, connection requests, reply rate, conversion rate, engagement ratio)",
      "Automated report generation and daily activity logs",
    ],
  },
  workflowOverview: [
    "Input data (keywords, lead list, filters)",
    "Automated LinkedIn and email data fetching",
    "Smart campaign creation (personalized emails/messages)",
    "Outreach execution (email and LinkedIn)",
    "Response categorization and notifications",
    "Reporting and data storage for ongoing optimization",
  ],
  developmentTimeline: [
    { phase: "Week 1", activity: "Requirement finalization, bot architecture setup, LinkedIn API configuration", duration: "5 days" },
    { phase: "Week 2", activity: "Testing, optimization, and training session", duration: "5 days" },
  ],
  costing: [
    { description: "Monthly Support & Infrastructure", cost: "15,000", remarks: "Includes infrastructure, hosting, maintenance, and monitoring" },
    { description: "Domain & Email Setup", cost: "To be borne by client", remarks: "Optional if client has existing domain" },
    { description: "Development Cost", cost: "Waived Off (Normally INR 35,000)", remarks: "Waived as part of our partnership" },
  ],
  totalMonthlyCost: "Total Monthly Cost: INR 15,000 (exclusive of GST, if applicable)",
  paymentTerms: [
    "No upfront or development charge",
    "Billing commences post successful testing and final approval by [Client Name]",
    "Monthly payments in advance to ensure uninterrupted automation services",
  ],
  sla: [
    { parameter: "System Uptime", target: "99.5%", description: "Operational and accessible 24/7, excluding planned maintenance" },
    { parameter: "Response Time", target: "Within 24 hours", description: "Initial response to client issues within 24 hours" },
    { parameter: "Issue Resolution Time", target: "Within 48 hours", description: "Resolution of minor (non-critical) issues within 48 hours" },
    { parameter: "Critical Issue Resolution", target: "Within 12 hours", description: "Resolution of high-priority or business-critical issues within 12 hours" },
    { parameter: "Reporting Accuracy", target: ">98%", description: "Over 98% accuracy for generated reports (email tracking, LinkedIn metrics)" },
    { parameter: "Monthly Review Meeting", target: "Once per month", description: "Performance review and improvement discussion with client team" },
  ],
  whyUs: [
    "Transparent pricing with no hidden charges",
    "Fully managed automation with minimal client overhead",
    "Expertise in SaaS automation, AI-based messaging, and workflow design",
    "Fast turnaround with dedicated post-deployment support",
    "Clear SLA-driven operations and monthly transparency reports",
  ],
  nextSteps: [
    "Proposal approval",
    "Kick-off meeting to finalize campaign details",
    "Bot setup and testing phase (2 weeks)",
    "Final demonstration and go-live",
  ],
  conclusion: "ThoughtBins Technologies looks forward to partnering with [Client Name] to modernize and automate your outreach campaigns. Together, we'll foster long-term efficiency, insight-driven engagement, and meaningful communication with prospects.",
};
