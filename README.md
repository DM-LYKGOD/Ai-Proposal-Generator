# ThoughtBins Sales Proposal Studio

> A professional techno-commercial sales proposal generator engineered to create, customize, AI-draft, and export print-ready client proposals with the exact visual styling, structure, and brand colors of **ThoughtBins Technologies**.

---

## 📋 Table of Contents
1. [Overview](#-overview)
2. [Design & Brand Styling Specification](#-design--brand-styling-specification)
3. [Document Architecture (The 10 Canonical Sections)](#-document-architecture)
4. [Key Features](#-key-features)
5. [Pre-built Templates](#-pre-built-templates)
6. [Tech Stack](#-tech-stack)
7. [Installation & Local Setup](#-installation--local-setup)
8. [Configuration & Environment Variables](#-configuration--environment-variables)
9. [PDF Export Instructions](#-pdf-export-instructions)
10. [File Structure](#-file-structure)

---

## 🌟 Overview

**ThoughtBins Sales Proposal Studio** enables sales leads, consultants, and solutions architects to generate high-converting **Techno-Commercial Proposals** in minutes. It reproduces the exact layout, header branding, typography, tabular formatting, and color palettes of ThoughtBins Technologies proposals, while giving users full freedom to edit directly on the page or generate content using Gemini 2.5 Flash.

---

## 🎨 Design & Brand Styling Specification

The visual layout reproduces the exact ThoughtBins proposal format:

| Element | Specification | Tailwind / Hex Code |
|---|---|---|
| **Primary Theme Accent** | ThoughtBins Deep Sky Blue | `#0284c7` / `text-sky-700` (`#0369a1`) |
| **Document Title Border** | 4px Bottom Solid Underline | `border-b-4 border-sky-600` |
| **Table Headers** | Deep Sky Blue Fill with White Text | `bg-sky-700 text-white font-semibold` |
| **Commercials Total Banner** | Light Emerald Highlight Callout | `bg-emerald-50 border border-emerald-200 text-emerald-800` |
| **Metadata Card** | Light Slate Container with Subtly Rounded Border | `bg-slate-50/80 border border-slate-200/80` |
| **Typography** | Modern High-Legibility Sans-Serif | `Plus Jakarta Sans`, `Roboto`, `sans-serif` |
| **Page Format** | Standard A4 Dimension & Proportions | `210mm × 297mm`, margin `12mm 15mm` |

### Multi-Theme Switcher
In addition to the signature **ThoughtBins Sky** palette, the application supports instant 1-click theme switching to:
- **Corporate Navy** (`#1e3a8a`)
- **Modern Indigo** (`#4f46e5`)
- **Emerald Tech** (`#059669`)
- **Charcoal Slate** (`#334155`)
- **Executive Crimson** (`#be123c`)

---

## 📑 Document Architecture

Every generated proposal adheres to the structured 10-section techno-commercial framework:

1. **Header & Branding:**
   - Left: Company logo (`https://i.postimg.cc/d1Yy63ch/image-removebg-preview.png`) and company address.
   - Right: Contact email (`info@thoughtbins.com`) and website (`www.thoughtbins.com`) with icon indicators.
2. **Metadata Grid:**
   - Proposal For (Project Title)
   - Client Name
   - Service Provider Name
   - Proposal Date (YYYY-MM-DD)
   - Reference Number (e.g. `TBT/PROP/2026/042`)
   - Validity Period (e.g. `30 Days from issue`)
3. **1. Introduction:** Persuasive opening statement highlighting the strategic intent and efficiency goals.
4. **2. Project Scope:** Categorized deliverables with bullet points:
   - *A. Sales Email Outreach Automation*
   - *B. LinkedIn Bulk Outreach Automation*
   - *C. Reporting & Insights*
5. **3. Workflow Overview:** Step-by-step numbered sequence of end-to-end operational execution.
6. **4. Development Timeline:** Tabular roadmap with `Phase`, `Activity`, and `Duration` columns.
7. **5. Costing & Commercials:** Tabular commercial breakdown with `Description`, `Cost (Currency)`, and `Remarks`, backed by the highlighted **Total Monthly Cost** callout banner.
8. **6. Payment Terms:** Bulleted commercial terms detailing billing milestones and payment terms.
9. **7. Service Level Agreement (SLA):** Tabular performance commitments (`SLA Parameter`, `Target`, and `Description`).
10. **8. Why ThoughtBins Technologies?:** Key differentiators and competitive advantages.
11. **9. Next Steps:** Ordered sequence of onboarding and kickoff milestones.
12. **10. Conclusion:** Professional sign-off summary.
13. **Authorization & Sign-off Block (Toggleable):** Formal dual-column acceptance block for Client and Service Provider signatures.

---

## 🚀 Key Features

- **⚡ Real-Time In-line Editing:** Click on any text, table cell, or bullet point directly on the proposal sheet to edit in real time. Changes sync instantly.
- **🤖 Powered by Gemini 2.5 Flash:** Enter client name and service description to generate complete, contextually tailored proposals adhering to strict JSON schemas.
- **🛡️ 100% Resilient Generation:** If an API key is not configured or network errors occur, an intelligent local generator produces complete, high-grade techno-commercial proposals without blocking the user.
- **➕ Dynamic Row & Item Controls:** Add or remove items from Scope lists, Workflow steps, Timeline phases, Cost line items, SLA metrics, and Next Steps with dedicated buttons (hidden during print).
- **🖨️ Pixel-Perfect Print & PDF:** Formatted with `@media print` rules, A4 margins, page-break avoidance on tables/cards, and `-webkit-print-color-adjust: exact` to preserve colors.
- **💾 Comprehensive Export Options:**
  - **Save as PDF** (Direct print dialog)
  - **Download standalone HTML** (Self-contained HTML file)
  - **Export JSON / Import JSON** (Save drafts and restore previous proposals)
  - **Copy Markdown / Text** (Copy proposal content to clipboard for docs or email)
- **🏷️ Customizable Branding:** Change the company name, logo image URL, email, website, phone, currency (`INR ₹`, `USD $`, `EUR €`, `GBP £`), and proposal reference number.

---

## 📦 Pre-built Templates

Select from 3 enterprise presets in the **Templates** tab:
1. **Sales Email & LinkedIn Outreach Automation** (The ThoughtBins reference proposal)
2. **Custom SaaS MVP & Web Platform** (Full-stack TypeScript, React, Node, PostgreSQL, CI/CD)
3. **Enterprise AI Agent & RAG System** (Vector database, knowledge ingestion, Gemini model, guardrails)

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS + Custom Print Media Rules (`index.css`)
- **Icons:** `lucide-react`
- **AI Integration:** `@google/genai` (Gemini 2.5 Flash)

---

## 💻 Installation & Local Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd ai-proposal-generator

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The application runs on `http://localhost:3000`.

---

## 🔑 Configuration & Environment Variables

Create a `.env.local` or `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note:** Even without an API key, the app functions fully using intelligent template generation and interactive in-place editing.

---

## 📄 PDF Export Instructions

To get the cleanest, highest-quality PDF document:
1. Click the green **"Save as PDF / Print"** button in the top action bar.
2. In your browser's print dialog:
   - **Destination:** Save as PDF
   - **Paper Size:** A4
   - **Margins:** Default or None
   - **Options:** Enable **"Background graphics"** (ensures table header colors and highlight boxes are printed in full color).
3. Click **Save**.

---

## 📁 File Structure

```text
├── index.html                   # HTML entry point with metadata & print styles
├── index.css                    # Tailwind setup & A4 print formatting rules
├── index.tsx                    # React DOM root entry
├── App.tsx                      # Root application layout & state orchestrator
├── constants.ts                 # Default proposal data, presets & theme palettes
├── types.ts                     # TypeScript interfaces for proposal data & branding
├── components/
│   ├── ProposalForm.tsx         # Sidebar controls: AI generator, templates & branding
│   ├── ProposalPreview.tsx      # A4 document canvas with interactive live editing
│   ├── EditableField.tsx        # In-line click-to-edit component with auto-resize
│   └── icons.tsx                # Logo & SVG vector icons
├── services/
│   └── geminiService.ts         # Gemini 2.5 Flash client & fallback generator
├── metadata.json                # Project capabilities & permissions
├── vite.config.ts               # Vite configuration
└── README.md                    # Project documentation
```

---

*Designed and maintained for ThoughtBins Technologies sales operations.*
