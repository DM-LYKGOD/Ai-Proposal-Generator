import React from 'react';
import { ProposalData } from '../types';
import EditableField from './EditableField';
import { LogoIcon, MailIcon, WebIcon } from './icons';

interface ProposalPreviewProps {
  data: ProposalData;
  onDataChange: <K extends keyof ProposalData>(key: K, value: ProposalData[K]) => void;
}

const ProposalPreview: React.FC<ProposalPreviewProps> = ({ data, onDataChange }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleListChange = (section: keyof ProposalData, index: number, value: string) => {
    const list = (data[section] as any[]).slice();
    list[index] = value;
    onDataChange(section, list as any);
  };

  const handleTableChange = <T extends {}>(section: keyof ProposalData, index: number, field: keyof T, value: string) => {
    const tableData = ((data[section] as any).slice()) as T[];
    tableData[index] = { ...tableData[index], [field]: value };
    onDataChange(section, tableData as any);
  };

  const handleScopeChange = (scopeKey: keyof ProposalData['projectScope'], index: number, value: string) => {
    const newScope = { ...data.projectScope };
    newScope[scopeKey][index] = value;
    onDataChange('projectScope', newScope);
  };


  return (
    <div>
        <div className="flex justify-end mb-4 no-print">
            <button
            onClick={handlePrint}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
            >
            Save as PDF
            </button>
      </div>
      <div id="print-area" className="bg-white p-12 shadow-2xl rounded-lg w-[210mm] min-h-[297mm] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center pb-12">
            <LogoIcon />
            <div className="text-right text-sm text-gray-600">
                <div className="flex items-center justify-end space-x-2">
                <p>info@thoughtbins.com</p>
                <MailIcon className="h-5 w-5 text-sky-600" />
                </div>
                <div className="flex items-center justify-end space-x-2">
                <p>www.thoughtbins.com</p>
                <WebIcon className="h-5 w-5 text-sky-600" />
                </div>
            </div>
        </div>

        {/* Title Section */}
        <div className="my-10">
          <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-sky-600 pb-2 inline-block">Techno-Commercial Proposal</h2>
          <div className="mt-6 space-y-1 text-gray-700">
            <p><strong className="font-semibold">Proposal For:</strong> <EditableField value={data.proposalFor} onChange={v => onDataChange('proposalFor', v)} /></p>
            <p><strong className="font-semibold">Client:</strong> <EditableField value={data.client} onChange={v => onDataChange('client', v)} /></p>
            <p><strong className="font-semibold">Service Provider:</strong> <EditableField value={data.serviceProvider} onChange={v => onDataChange('serviceProvider', v)} /></p>
            <p><strong className="font-semibold">Proposal Date:</strong> <EditableField value={data.proposalDate} onChange={v => onDataChange('proposalDate', v)} /></p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 text-gray-700">
            <h3 className="text-2xl font-bold text-sky-700">1. Introduction</h3>
            <EditableField value={data.introduction} onChange={v => onDataChange('introduction', v)} type="textarea" />

            <h3 className="text-2xl font-bold text-sky-700">2. Project Scope</h3>
            <h4 className="text-lg font-semibold text-gray-800 mt-4">A. Sales Email Outreach Automation</h4>
            <ul className="list-disc list-inside space-y-1 pl-4">
                {data.projectScope.salesEmail.map((item, i) => <li key={i}><EditableField value={item} onChange={v => handleScopeChange('salesEmail', i, v)} /></li>)}
            </ul>
             <h4 className="text-lg font-semibold text-gray-800 mt-4">B. LinkedIn Bulk Outreach Automation</h4>
            <ul className="list-disc list-inside space-y-1 pl-4">
                {data.projectScope.linkedin.map((item, i) => <li key={i}><EditableField value={item} onChange={v => handleScopeChange('linkedin', i, v)} /></li>)}
            </ul>
            <h4 className="text-lg font-semibold text-gray-800 mt-4">C. Reporting & Insights</h4>
            <ul className="list-disc list-inside space-y-1 pl-4">
                {data.projectScope.reporting.map((item, i) => <li key={i}><EditableField value={item} onChange={v => handleScopeChange('reporting', i, v)} /></li>)}
            </ul>
            
            <h3 className="text-2xl font-bold text-sky-700">3. Workflow Overview</h3>
             <ol className="list-decimal list-inside space-y-1 pl-4">
                {data.workflowOverview.map((item, i) => <li key={i}><EditableField value={item} onChange={v => handleListChange('workflowOverview', i, v)} /></li>)}
            </ol>

            <h3 className="text-2xl font-bold text-sky-700">4. Development Timeline</h3>
            <table className="w-full border-collapse">
                <thead className="bg-sky-700 text-white">
                    <tr>
                        <th className="p-3 text-left font-semibold">Phase</th>
                        <th className="p-3 text-left font-semibold">Activity</th>
                        <th className="p-3 text-left font-semibold">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {data.developmentTimeline.map((row, i) => (
                        <tr key={i} className="border-b border-gray-200">
                           <td className="p-3"><EditableField value={row.phase} onChange={v => handleTableChange('developmentTimeline', i, 'phase', v)} /></td>
                           <td className="p-3"><EditableField value={row.activity} onChange={v => handleTableChange('developmentTimeline', i, 'activity', v)} /></td>
                           <td className="p-3"><EditableField value={row.duration} onChange={v => handleTableChange('developmentTimeline', i, 'duration', v)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className="text-2xl font-bold text-sky-700">5. Costing & Commercials</h3>
             <table className="w-full border-collapse">
                <thead className="bg-sky-700 text-white">
                    <tr>
                        <th className="p-3 text-left font-semibold">Description</th>
                        <th className="p-3 text-left font-semibold">Cost (INR)</th>
                        <th className="p-3 text-left font-semibold">Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {data.costing.map((row, i) => (
                        <tr key={i} className="border-b border-gray-200">
                           <td className="p-3"><EditableField value={row.description} onChange={v => handleTableChange('costing', i, 'description', v)} /></td>
                           <td className="p-3"><EditableField value={row.cost} onChange={v => handleTableChange('costing', i, 'cost', v)} /></td>
                           <td className="p-3"><EditableField value={row.remarks} onChange={v => handleTableChange('costing', i, 'remarks', v)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-center font-bold bg-green-100 text-green-800 p-3"><EditableField value={data.totalMonthlyCost} onChange={v => onDataChange('totalMonthlyCost', v)} /></div>


            <h3 className="text-2xl font-bold text-sky-700">6. Payment Terms</h3>
             <ul className="list-disc list-inside space-y-1 pl-4">
                {data.paymentTerms.map((item, i) => <li key={i}><EditableField value={item} onChange={v => handleListChange('paymentTerms', i, v)} /></li>)}
            </ul>

            <h3 className="text-2xl font-bold text-sky-700">7. Service Level Agreement (SLA)</h3>
             <table className="w-full border-collapse">
                <thead className="bg-sky-700 text-white">
                    <tr>
                        <th className="p-3 text-left font-semibold">SLA Parameter</th>
                        <th className="p-3 text-left font-semibold">Target</th>
                        <th className="p-3 text-left font-semibold">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.sla.map((row, i) => (
                        <tr key={i} className="border-b border-gray-200">
                           <td className="p-3"><EditableField value={row.parameter} onChange={v => handleTableChange('sla', i, 'parameter', v)} /></td>
                           <td className="p-3"><EditableField value={row.target} onChange={v => handleTableChange('sla', i, 'target', v)} /></td>
                           <td className="p-3"><EditableField value={row.description} onChange={v => handleTableChange('sla', i, 'description', v)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className="text-2xl font-bold text-sky-700">8. Why ThoughtBins Technologies?</h3>
             <ul className="list-disc list-inside space-y-1 pl-4">
                {data.whyUs.map((item, i) => <li key={i}><EditableField value={item} onChange={v => handleListChange('whyUs', i, v)} /></li>)}
            </ul>

            <h3 className="text-2xl font-bold text-sky-700">9. Next Steps</h3>
             <ol className="list-decimal list-inside space-y-1 pl-4">
                {data.nextSteps.map((item, i) => <li key={i}><EditableField value={item} onChange={v => handleListChange('nextSteps', i, v)} /></li>)}
            </ol>
            
            <h3 className="text-2xl font-bold text-sky-700">10. Conclusion</h3>
            <EditableField value={data.conclusion} onChange={v => onDataChange('conclusion', v)} type="textarea" />
        </div>

      </div>
    </div>
  );
};

export default ProposalPreview;