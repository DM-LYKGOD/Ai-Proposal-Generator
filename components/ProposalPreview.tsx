import React, { useState } from 'react';
import { ProposalData, TimelineItem, CostItem, SLAItem } from '../types';
import EditableField from './EditableField';
import { LogoIcon, MailIcon, WebIcon } from './icons';
import { THEME_CONFIGS } from '../constants';
import { 
  Printer, 
  Download, 
  Copy, 
  Plus, 
  Trash2, 
  Check, 
  FileCode, 
  Upload,
  CheckCircle2,
  FileCheck,
  Palette
} from 'lucide-react';

interface ProposalPreviewProps {
  data: ProposalData;
  onDataChange: <K extends keyof ProposalData>(key: K, value: ProposalData[K]) => void;
  onImportData?: (imported: ProposalData) => void;
}

const ProposalPreview: React.FC<ProposalPreviewProps> = ({ 
  data, 
  onDataChange,
  onImportData 
}) => {
  const [copied, setCopied] = useState(false);
  const [showSignatory, setShowSignatory] = useState(data.signatory?.enabled ?? true);
  const themeKey = data.branding?.themeColor || 'sky';
  const theme = THEME_CONFIGS[themeKey] || THEME_CONFIGS.sky;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = async () => {
    const textContent = `
# ${data.proposalFor}
**Client:** ${data.client}
**Service Provider:** ${data.serviceProvider}
**Date:** ${data.proposalDate}
**Reference:** ${data.referenceNumber || 'N/A'}

---

## 1. Introduction
${data.introduction}

## 2. Project Scope
### A. Sales Outreach Automation
${data.projectScope.salesEmail.map(item => `- ${item}`).join('\n')}

### B. LinkedIn Outreach Automation
${data.projectScope.linkedin.map(item => `- ${item}`).join('\n')}

### C. Reporting & Insights
${data.projectScope.reporting.map(item => `- ${item}`).join('\n')}

## 3. Workflow Overview
${data.workflowOverview.map((item, idx) => `${idx + 1}. ${item}`).join('\n')}

## 4. Development Timeline
| Phase | Activity | Duration |
|---|---|---|
${data.developmentTimeline.map(t => `| ${t.phase} | ${t.activity} | ${t.duration} |`).join('\n')}

## 5. Costing & Commercials
| Description | Cost | Remarks |
|---|---|---|
${data.costing.map(c => `| ${c.description} | ${c.cost} | ${c.remarks} |`).join('\n')}

**${data.totalMonthlyCost}**

## 6. Payment Terms
${data.paymentTerms.map(t => `- ${t}`).join('\n')}

## 7. Service Level Agreement (SLA)
| Parameter | Target | Description |
|---|---|---|
${data.sla.map(s => `| ${s.parameter} | ${s.target} | ${s.description} |`).join('\n')}

## 8. Why ${data.serviceProvider}?
${data.whyUs.map(w => `- ${w}`).join('\n')}

## 9. Next Steps
${data.nextSteps.map((n, idx) => `${idx + 1}. ${n}`).join('\n')}

## 10. Conclusion
${data.conclusion}
    `.trim();

    try {
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      console.error("Failed to copy", e);
    }
  };

  const handleDownloadHtml = () => {
    const printArea = document.getElementById('print-area');
    if (!printArea) return;
    const htmlString = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${data.proposalFor}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #f8fafc; padding: 24px; }
    .no-print { display: none !important; }
    @media print {
      body { background: white; padding: 0; }
    }
  </style>
</head>
<body>
  <div style="max-width: 860px; margin: 0 auto; background: white; padding: 48px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border-radius: 8px;">
    ${printArea.innerHTML}
  </div>
</body>
</html>
    `;
    const blob = new Blob([htmlString], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.client.replace(/[^a-zA-Z0-9]/g, '_')}_Proposal.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.client.replace(/[^a-zA-Z0-9]/g, '_')}_Proposal.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.proposalFor && parsed.client) {
          if (onImportData) {
            onImportData(parsed);
          } else {
            Object.keys(parsed).forEach(k => {
              onDataChange(k as keyof ProposalData, parsed[k]);
            });
          }
        }
      } catch (err) {
        alert("Invalid JSON proposal file.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Scope handlers
  const handleScopeChange = (scopeKey: keyof ProposalData['projectScope'], index: number, value: string) => {
    const newScope = { ...data.projectScope };
    newScope[scopeKey][index] = value;
    onDataChange('projectScope', newScope);
  };

  const handleAddScopeItem = (scopeKey: keyof ProposalData['projectScope']) => {
    const newScope = { ...data.projectScope };
    newScope[scopeKey] = [...newScope[scopeKey], "New deliverable item specification"];
    onDataChange('projectScope', newScope);
  };

  const handleRemoveScopeItem = (scopeKey: keyof ProposalData['projectScope'], index: number) => {
    const newScope = { ...data.projectScope };
    newScope[scopeKey] = newScope[scopeKey].filter((_, i) => i !== index);
    onDataChange('projectScope', newScope);
  };

  // List handlers
  const handleListChange = (section: keyof ProposalData, index: number, value: string) => {
    const list = (data[section] as string[]).slice();
    list[index] = value;
    onDataChange(section, list as any);
  };

  const handleAddListItem = (section: keyof ProposalData, placeholder: string) => {
    const list = [...(data[section] as string[]), placeholder];
    onDataChange(section, list as any);
  };

  const handleRemoveListItem = (section: keyof ProposalData, index: number) => {
    const list = (data[section] as string[]).filter((_, i) => i !== index);
    onDataChange(section, list as any);
  };

  // Table handlers - Timeline
  const handleTimelineChange = (index: number, field: keyof TimelineItem, value: string) => {
    const timeline = data.developmentTimeline.slice();
    timeline[index] = { ...timeline[index], [field]: value };
    onDataChange('developmentTimeline', timeline);
  };

  const handleAddTimelineRow = () => {
    const timeline: TimelineItem[] = [
      ...data.developmentTimeline,
      { phase: `Phase ${data.developmentTimeline.length + 1}`, activity: "New milestone activity details", duration: "5 business days" },
    ];
    onDataChange('developmentTimeline', timeline);
  };

  const handleRemoveTimelineRow = (index: number) => {
    const timeline = data.developmentTimeline.filter((_, i) => i !== index);
    onDataChange('developmentTimeline', timeline);
  };

  // Table handlers - Costing
  const handleCostingChange = (index: number, field: keyof CostItem, value: string) => {
    const costing = data.costing.slice();
    costing[index] = { ...costing[index], [field]: value };
    onDataChange('costing', costing);
  };

  const handleAddCostingRow = () => {
    const currency = data.branding?.currency || 'INR';
    const curr = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : 'INR ';
    const costing: CostItem[] = [
      ...data.costing,
      { description: "Additional Service / Module", cost: `${curr}10,000`, remarks: "Standard package specification" },
    ];
    onDataChange('costing', costing);
  };

  const handleRemoveCostingRow = (index: number) => {
    const costing = data.costing.filter((_, i) => i !== index);
    onDataChange('costing', costing);
  };

  // Table handlers - SLA
  const handleSLAChange = (index: number, field: keyof SLAItem, value: string) => {
    const sla = data.sla.slice();
    sla[index] = { ...sla[index], [field]: value };
    onDataChange('sla', sla);
  };

  const handleAddSLARow = () => {
    const sla: SLAItem[] = [
      ...data.sla,
      { parameter: "Maintenance Window", target: "Scheduled Sundays", description: "Minimal impact off-peak maintenance updates" },
    ];
    onDataChange('sla', sla);
  };

  const handleRemoveSLARow = (index: number) => {
    const sla = data.sla.filter((_, i) => i !== index);
    onDataChange('sla', sla);
  };

  const handleThemeSelect = (colorKey: 'sky' | 'navy' | 'indigo' | 'emerald' | 'charcoal' | 'crimson') => {
    onDataChange('branding', {
      ...(data.branding || {
        companyName: data.serviceProvider,
        logoUrl: "https://i.postimg.cc/d1Yy63ch/image-removebg-preview.png",
        email: "info@thoughtbins.com",
        website: "www.thoughtbins.com",
        currency: "INR",
        themeColor: colorKey,
      }),
      themeColor: colorKey,
    });
  };

  const toggleSignatory = () => {
    const nextVal = !showSignatory;
    setShowSignatory(nextVal);
    onDataChange('signatory', {
      ...(data.signatory || {
        enabled: nextVal,
        clientSignerName: `Authorized Signatory (${data.client})`,
        clientSignerTitle: "Director / Vice President",
        providerSignerName: "Authorized Signatory",
        providerSignerTitle: data.serviceProvider,
      }),
      enabled: nextVal,
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Document Action Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1">
            <Palette className="w-4 h-4 text-gray-500" /> Theme:
          </span>
          <div className="flex items-center space-x-1.5">
            {(['sky', 'navy', 'indigo', 'emerald', 'charcoal', 'crimson'] as const).map(color => (
              <button
                key={color}
                type="button"
                onClick={() => handleThemeSelect(color)}
                title={`Select ${color} theme`}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  themeKey === color ? 'border-gray-900 scale-110 shadow-sm' : 'border-transparent hover:scale-105'
                } ${
                  color === 'sky' ? 'bg-sky-600' :
                  color === 'navy' ? 'bg-blue-900' :
                  color === 'indigo' ? 'bg-indigo-600' :
                  color === 'emerald' ? 'bg-emerald-600' :
                  color === 'charcoal' ? 'bg-slate-700' : 'bg-rose-700'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={toggleSignatory}
            className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-colors ml-2 ${
              showSignatory 
                ? 'bg-sky-50 text-sky-700 border-sky-200' 
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
            }`}
          >
            {showSignatory ? '✓ Sign-off Block On' : '+ Add Sign-off Block'}
          </button>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <label className="cursor-pointer inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <Upload className="w-3.5 h-3.5 mr-1 text-gray-500" />
            Import JSON
            <input type="file" accept=".json" onChange={handleImportJsonFile} className="hidden" />
          </label>

          <button
            onClick={handleExportJson}
            title="Export as JSON for future editing"
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <FileCode className="w-3.5 h-3.5 mr-1 text-gray-500" />
            JSON
          </button>

          <button
            onClick={handleCopyMarkdown}
            title="Copy clean proposal text for docs or email"
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1 text-gray-500" />
                Copy Text
              </>
            )}
          </button>

          <button
            onClick={handleDownloadHtml}
            title="Download formatted standalone HTML"
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 mr-1 text-gray-500" />
            HTML
          </button>

          <button
            onClick={handlePrint}
            title="Print or Save as high-quality PDF document"
            className="inline-flex items-center px-5 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
          >
            <Printer className="w-4 h-4 mr-2" />
            Save as PDF / Print
          </button>
        </div>
      </div>

      {/* Editing Hint Badge */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-2 no-print">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Click on any text, table cell, or bullet point directly in the document to edit in real time.
        </span>
        <span className="text-gray-400">Standard A4 Format (210mm × 297mm)</span>
      </div>

      {/* The Printable Proposal Sheet */}
      <div 
        id="print-area" 
        className="bg-white p-10 md:p-14 shadow-2xl rounded-xl border border-gray-200/80 w-full max-w-[850px] mx-auto min-h-[1100px] text-gray-800 transition-all font-sans leading-relaxed selection:bg-sky-100"
      >
        {/* Header - Logo and Contact Info */}
        <div className="flex justify-between items-start pb-8 border-b border-gray-100">
          <div className="flex flex-col">
            <LogoIcon 
              src={data.branding?.logoUrl || "https://i.postimg.cc/d1Yy63ch/image-removebg-preview.png"} 
              alt={data.branding?.companyName || data.serviceProvider}
            />
            {data.branding?.address && (
              <p className="text-xs text-gray-400 mt-2 font-normal">
                {data.branding.address}
              </p>
            )}
          </div>
          <div className="text-right text-xs md:text-sm text-gray-600 space-y-1.5 pt-1">
            <div className="flex items-center justify-end space-x-2">
              <span className="font-medium text-gray-700">
                <EditableField 
                  value={data.branding?.email || "info@thoughtbins.com"} 
                  onChange={v => onDataChange('branding', { ...(data.branding || {}), email: v } as any)} 
                />
              </span>
              <MailIcon className={`h-4 w-4 md:h-5 md:w-5 ${theme.accentIcon}`} />
            </div>
            <div className="flex items-center justify-end space-x-2">
              <span className="font-medium text-gray-700">
                <EditableField 
                  value={data.branding?.website || "www.thoughtbins.com"} 
                  onChange={v => onDataChange('branding', { ...(data.branding || {}), website: v } as any)} 
                />
              </span>
              <WebIcon className={`h-4 w-4 md:h-5 md:w-5 ${theme.accentIcon}`} />
            </div>
            {data.branding?.phone && (
              <p className="text-xs text-gray-500 font-medium">{data.branding.phone}</p>
            )}
          </div>
        </div>

        {/* Title Section */}
        <div className="my-8">
          <div className="inline-block border-b-4 pb-2" style={{ borderColor: theme.primaryHex }}>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Techno-Commercial Proposal
            </h1>
          </div>
          
          <div className="mt-6 bg-slate-50/80 p-5 rounded-lg border border-slate-200/80 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
            <div className="space-y-2">
              <p className="flex items-baseline">
                <strong className="w-32 font-bold text-gray-800 shrink-0">Proposal For:</strong> 
                <span className="font-semibold text-gray-900 flex-1">
                  <EditableField value={data.proposalFor} onChange={v => onDataChange('proposalFor', v)} />
                </span>
              </p>
              <p className="flex items-baseline">
                <strong className="w-32 font-bold text-gray-800 shrink-0">Client:</strong> 
                <span className="font-medium text-gray-800 flex-1">
                  <EditableField value={data.client} onChange={v => onDataChange('client', v)} />
                </span>
              </p>
              <p className="flex items-baseline">
                <strong className="w-32 font-bold text-gray-800 shrink-0">Service Provider:</strong> 
                <span className="font-medium text-gray-800 flex-1">
                  <EditableField value={data.serviceProvider} onChange={v => onDataChange('serviceProvider', v)} />
                </span>
              </p>
            </div>

            <div className="space-y-2">
              <p className="flex items-baseline">
                <strong className="w-32 font-bold text-gray-800 shrink-0">Proposal Date:</strong> 
                <span className="font-medium text-gray-800 flex-1">
                  <EditableField value={data.proposalDate} onChange={v => onDataChange('proposalDate', v)} />
                </span>
              </p>
              <p className="flex items-baseline">
                <strong className="w-32 font-bold text-gray-800 shrink-0">Reference No.:</strong> 
                <span className="font-mono text-xs text-gray-700 flex-1 font-medium">
                  <EditableField value={data.referenceNumber || 'TBT/PROP/2026/042'} onChange={v => onDataChange('referenceNumber', v)} />
                </span>
              </p>
              <p className="flex items-baseline">
                <strong className="w-32 font-bold text-gray-800 shrink-0">Valid Until:</strong> 
                <span className="font-medium text-gray-700 flex-1">
                  <EditableField value={data.validUntil || '30 Days from issue'} onChange={v => onDataChange('validUntil', v)} />
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-9 text-gray-800 text-[14px] md:text-[15px] leading-relaxed">
          {/* 1. Introduction */}
          <section className="page-break-inside-avoid">
            <h2 className="text-xl md:text-2xl font-bold mb-3 tracking-tight" style={{ color: theme.primaryDarkHex }}>
              1. Introduction
            </h2>
            <div className="text-justify text-gray-700 leading-relaxed">
              <EditableField 
                value={data.introduction} 
                onChange={v => onDataChange('introduction', v)} 
                type="textarea"
                multilineRows={4} 
              />
            </div>
          </section>

          {/* 2. Project Scope */}
          <section className="page-break-inside-avoid">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: theme.primaryDarkHex }}>
                2. Project Scope
              </h2>
            </div>

            {/* Subsection A */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">
                  A. Sales Email Outreach Automation
                </h3>
                <button
                  onClick={() => handleAddScopeItem('salesEmail')}
                  className="no-print text-xs text-sky-600 hover:text-sky-800 font-medium flex items-center gap-0.5"
                >
                  <Plus className="w-3 h-3" /> Add Item
                </button>
              </div>
              <ul className="list-disc list-outside space-y-1.5 pl-5 mt-2 text-gray-700">
                {data.projectScope.salesEmail.map((item, i) => (
                  <li key={i} className="group relative">
                    <EditableField value={item} onChange={v => handleScopeChange('salesEmail', i, v)} />
                    <button
                      onClick={() => handleRemoveScopeItem('salesEmail', i)}
                      title="Remove item"
                      className="no-print opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-700 ml-2 text-xs transition-opacity inline-block align-middle"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subsection B */}
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">
                  B. LinkedIn Bulk Outreach Automation
                </h3>
                <button
                  onClick={() => handleAddScopeItem('linkedin')}
                  className="no-print text-xs text-sky-600 hover:text-sky-800 font-medium flex items-center gap-0.5"
                >
                  <Plus className="w-3 h-3" /> Add Item
                </button>
              </div>
              <ul className="list-disc list-outside space-y-1.5 pl-5 mt-2 text-gray-700">
                {data.projectScope.linkedin.map((item, i) => (
                  <li key={i} className="group relative">
                    <EditableField value={item} onChange={v => handleScopeChange('linkedin', i, v)} />
                    <button
                      onClick={() => handleRemoveScopeItem('linkedin', i)}
                      title="Remove item"
                      className="no-print opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-700 ml-2 text-xs transition-opacity inline-block align-middle"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subsection C */}
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">
                  C. Reporting & Insights
                </h3>
                <button
                  onClick={() => handleAddScopeItem('reporting')}
                  className="no-print text-xs text-sky-600 hover:text-sky-800 font-medium flex items-center gap-0.5"
                >
                  <Plus className="w-3 h-3" /> Add Item
                </button>
              </div>
              <ul className="list-disc list-outside space-y-1.5 pl-5 mt-2 text-gray-700">
                {data.projectScope.reporting.map((item, i) => (
                  <li key={i} className="group relative">
                    <EditableField value={item} onChange={v => handleScopeChange('reporting', i, v)} />
                    <button
                      onClick={() => handleRemoveScopeItem('reporting', i)}
                      title="Remove item"
                      className="no-print opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-700 ml-2 text-xs transition-opacity inline-block align-middle"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 3. Workflow Overview */}
          <section className="page-break-inside-avoid">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: theme.primaryDarkHex }}>
                3. Workflow Overview
              </h2>
              <button
                onClick={() => handleAddListItem('workflowOverview', 'New automated processing workflow stage')}
                className="no-print text-xs text-sky-600 hover:text-sky-800 font-medium flex items-center gap-0.5"
              >
                <Plus className="w-3 h-3" /> Add Step
              </button>
            </div>
            <ol className="list-decimal list-outside space-y-1.5 pl-5 mt-2 text-gray-700">
              {data.workflowOverview.map((item, i) => (
                <li key={i} className="group relative">
                  <EditableField value={item} onChange={v => handleListChange('workflowOverview', i, v)} />
                  <button
                    onClick={() => handleRemoveListItem('workflowOverview', i)}
                    title="Remove step"
                    className="no-print opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-700 ml-2 text-xs transition-opacity inline-block align-middle"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ol>
          </section>

          {/* 4. Development Timeline */}
          <section className="page-break-inside-avoid">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: theme.primaryDarkHex }}>
                4. Development Timeline
              </h2>
              <button
                onClick={handleAddTimelineRow}
                className="no-print text-xs text-sky-600 hover:text-sky-800 font-medium flex items-center gap-0.5"
              >
                <Plus className="w-3 h-3" /> Add Phase
              </button>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr style={{ backgroundColor: theme.primaryDarkHex }} className="text-white">
                    <th className="p-3 text-left font-semibold w-1/4">Phase</th>
                    <th className="p-3 text-left font-semibold w-1/2">Activity</th>
                    <th className="p-3 text-left font-semibold w-1/4">Duration</th>
                    <th className="p-3 text-center w-10 no-print"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.developmentTimeline.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="p-3 align-top font-medium text-gray-900">
                        <EditableField value={row.phase} onChange={v => handleTimelineChange(i, 'phase', v)} />
                      </td>
                      <td className="p-3 align-top text-gray-700">
                        <EditableField value={row.activity} onChange={v => handleTimelineChange(i, 'activity', v)} type="textarea" />
                      </td>
                      <td className="p-3 align-top text-gray-700 whitespace-nowrap">
                        <EditableField value={row.duration} onChange={v => handleTimelineChange(i, 'duration', v)} />
                      </td>
                      <td className="p-3 align-top text-center no-print">
                        <button
                          onClick={() => handleRemoveTimelineRow(i)}
                          title="Delete phase"
                          className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Costing & Commercials */}
          <section className="page-break-inside-avoid">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: theme.primaryDarkHex }}>
                5. Costing & Commercials
              </h2>
              <button
                onClick={handleAddCostingRow}
                className="no-print text-xs text-sky-600 hover:text-sky-800 font-medium flex items-center gap-0.5"
              >
                <Plus className="w-3 h-3" /> Add Item
              </button>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr style={{ backgroundColor: theme.primaryDarkHex }} className="text-white">
                    <th className="p-3 text-left font-semibold w-5/12">Description</th>
                    <th className="p-3 text-left font-semibold w-3/12">Cost ({data.branding?.currency || 'INR'})</th>
                    <th className="p-3 text-left font-semibold w-4/12">Remarks</th>
                    <th className="p-3 text-center w-10 no-print"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.costing.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="p-3 align-top font-medium text-gray-900">
                        <EditableField value={row.description} onChange={v => handleCostingChange(i, 'description', v)} />
                      </td>
                      <td className="p-3 align-top font-semibold text-gray-900 whitespace-nowrap">
                        <EditableField value={row.cost} onChange={v => handleCostingChange(i, 'cost', v)} />
                      </td>
                      <td className="p-3 align-top text-gray-600 text-xs md:text-sm">
                        <EditableField value={row.remarks} onChange={v => handleCostingChange(i, 'remarks', v)} />
                      </td>
                      <td className="p-3 align-top text-center no-print">
                        <button
                          onClick={() => handleRemoveCostingRow(i)}
                          title="Delete row"
                          className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Commercial Total Callout Banner */}
            <div className={`mt-3 text-center font-bold p-3.5 rounded-lg text-sm md:text-base ${theme.totalBoxBg} shadow-sm`}>
              <EditableField value={data.totalMonthlyCost} onChange={v => onDataChange('totalMonthlyCost', v)} />
            </div>
          </section>

          {/* 6. Payment Terms */}
          <section className="page-break-inside-avoid">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: theme.primaryDarkHex }}>
                6. Payment Terms
              </h2>
              <button
                onClick={() => handleAddListItem('paymentTerms', 'Payment terms clause specification')}
                className="no-print text-xs text-sky-600 hover:text-sky-800 font-medium flex items-center gap-0.5"
              >
                <Plus className="w-3 h-3" /> Add Term
              </button>
            </div>
            <ul className="list-disc list-outside space-y-1.5 pl-5 mt-2 text-gray-700">
              {data.paymentTerms.map((item, i) => (
                <li key={i} className="group relative">
                  <EditableField value={item} onChange={v => handleListChange('paymentTerms', i, v)} />
                  <button
                    onClick={() => handleRemoveListItem('paymentTerms', i)}
                    title="Remove item"
                    className="no-print opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-700 ml-2 text-xs transition-opacity inline-block align-middle"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* 7. Service Level Agreement (SLA) */}
          <section className="page-break-inside-avoid">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: theme.primaryDarkHex }}>
                7. Service Level Agreement (SLA)
              </h2>
              <button
                onClick={handleAddSLARow}
                className="no-print text-xs text-sky-600 hover:text-sky-800 font-medium flex items-center gap-0.5"
              >
                <Plus className="w-3 h-3" /> Add SLA
              </button>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr style={{ backgroundColor: theme.primaryDarkHex }} className="text-white">
                    <th className="p-3 text-left font-semibold w-1/3">SLA Parameter</th>
                    <th className="p-3 text-left font-semibold w-1/4">Target</th>
                    <th className="p-3 text-left font-semibold w-5/12">Description</th>
                    <th className="p-3 text-center w-10 no-print"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.sla.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="p-3 align-top font-medium text-gray-900">
                        <EditableField value={row.parameter} onChange={v => handleSLAChange(i, 'parameter', v)} />
                      </td>
                      <td className="p-3 align-top font-semibold text-gray-900 whitespace-nowrap">
                        <EditableField value={row.target} onChange={v => handleSLAChange(i, 'target', v)} />
                      </td>
                      <td className="p-3 align-top text-gray-600 text-xs md:text-sm">
                        <EditableField value={row.description} onChange={v => handleSLAChange(i, 'description', v)} />
                      </td>
                      <td className="p-3 align-top text-center no-print">
                        <button
                          onClick={() => handleRemoveSLARow(i)}
                          title="Delete SLA"
                          className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 8. Why ThoughtBins / Service Provider? */}
          <section className="page-break-inside-avoid">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: theme.primaryDarkHex }}>
                8. Why {data.serviceProvider}?
              </h2>
              <button
                onClick={() => handleAddListItem('whyUs', 'Unique strategic value proposition')}
                className="no-print text-xs text-sky-600 hover:text-sky-800 font-medium flex items-center gap-0.5"
              >
                <Plus className="w-3 h-3" /> Add Point
              </button>
            </div>
            <ul className="list-disc list-outside space-y-1.5 pl-5 mt-2 text-gray-700">
              {data.whyUs.map((item, i) => (
                <li key={i} className="group relative">
                  <EditableField value={item} onChange={v => handleListChange('whyUs', i, v)} />
                  <button
                    onClick={() => handleRemoveListItem('whyUs', i)}
                    title="Remove item"
                    className="no-print opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-700 ml-2 text-xs transition-opacity inline-block align-middle"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* 9. Next Steps */}
          <section className="page-break-inside-avoid">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: theme.primaryDarkHex }}>
                9. Next Steps
              </h2>
              <button
                onClick={() => handleAddListItem('nextSteps', 'Next procedural rollout step')}
                className="no-print text-xs text-sky-600 hover:text-sky-800 font-medium flex items-center gap-0.5"
              >
                <Plus className="w-3 h-3" /> Add Step
              </button>
            </div>
            <ol className="list-decimal list-outside space-y-1.5 pl-5 mt-2 text-gray-700">
              {data.nextSteps.map((item, i) => (
                <li key={i} className="group relative">
                  <EditableField value={item} onChange={v => handleListChange('nextSteps', i, v)} />
                  <button
                    onClick={() => handleRemoveListItem('nextSteps', i)}
                    title="Remove item"
                    className="no-print opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-700 ml-2 text-xs transition-opacity inline-block align-middle"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ol>
          </section>

          {/* 10. Conclusion */}
          <section className="page-break-inside-avoid">
            <h2 className="text-xl md:text-2xl font-bold mb-3 tracking-tight" style={{ color: theme.primaryDarkHex }}>
              10. Conclusion
            </h2>
            <div className="text-justify text-gray-700 leading-relaxed">
              <EditableField 
                value={data.conclusion} 
                onChange={v => onDataChange('conclusion', v)} 
                type="textarea"
                multilineRows={3} 
              />
            </div>
          </section>

          {/* Optional 11. Acceptance & Sign-off Block */}
          {showSignatory && (
            <section className="page-break-inside-avoid pt-6 mt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Authorization & Acceptance
              </h3>
              <p className="text-xs text-gray-500 mb-8">
                By signing below, both parties confirm their mutual acceptance of the terms, scope, commercials, and Service Level Agreement outlined in this proposal.
              </p>

              <div className="grid grid-cols-2 gap-12 text-sm">
                {/* Client Side */}
                <div className="space-y-4">
                  <p className="font-semibold text-gray-800">For and on behalf of:</p>
                  <p className="font-bold text-gray-900 border-b border-gray-300 pb-1">
                    <EditableField value={data.client} onChange={v => onDataChange('client', v)} />
                  </p>
                  <div className="h-16 flex items-end">
                    <div className="w-full border-b border-gray-400 border-dashed" />
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>
                      <strong>Authorized Signatory:</strong>{' '}
                      <EditableField 
                        value={data.signatory?.clientSignerName || `Representative (${data.client})`} 
                        onChange={v => onDataChange('signatory', { ...(data.signatory || { enabled: true }), clientSignerName: v })} 
                      />
                    </p>
                    <p>
                      <strong>Title:</strong>{' '}
                      <EditableField 
                        value={data.signatory?.clientSignerTitle || 'Director / Vice President'} 
                        onChange={v => onDataChange('signatory', { ...(data.signatory || { enabled: true }), clientSignerTitle: v })} 
                      />
                    </p>
                    <p>
                      <strong>Date:</strong> ________________________
                    </p>
                  </div>
                </div>

                {/* Service Provider Side */}
                <div className="space-y-4">
                  <p className="font-semibold text-gray-800">For and on behalf of:</p>
                  <p className="font-bold text-gray-900 border-b border-gray-300 pb-1">
                    <EditableField value={data.serviceProvider} onChange={v => onDataChange('serviceProvider', v)} />
                  </p>
                  <div className="h-16 flex items-end">
                    <div className="w-full border-b border-gray-400 border-dashed" />
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>
                      <strong>Authorized Signatory:</strong>{' '}
                      <EditableField 
                        value={data.signatory?.providerSignerName || 'Business Head / Partner'} 
                        onChange={v => onDataChange('signatory', { ...(data.signatory || { enabled: true }), providerSignerName: v })} 
                      />
                    </p>
                    <p>
                      <strong>Title:</strong>{' '}
                      <EditableField 
                        value={data.signatory?.providerSignerTitle || data.serviceProvider} 
                        onChange={v => onDataChange('signatory', { ...(data.signatory || { enabled: true }), providerSignerTitle: v })} 
                      />
                    </p>
                    <p>
                      <strong>Date:</strong> ________________________
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Footer watermark in document */}
          <div className="pt-8 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
            <span>{data.serviceProvider} — Confidential Techno-Commercial Document</span>
            <span>{data.referenceNumber || 'TBT/PROP/2026/042'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalPreview;