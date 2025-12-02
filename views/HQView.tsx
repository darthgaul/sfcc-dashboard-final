import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  AlertTriangle, 
  FileText, 
  FileCheck, 
  Gavel, 
  BookOpen, 
  Archive, 
  Activity, 
  CheckCircle2, 
  Clock,
  DollarSign,
  Box,
  Search,
  Lock,
  ArrowRight,
  X,
  FileSignature,
  Download,
  ChevronRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { MetricCard, Card, SectionHeader, SecurityBadges, Badge } from '../components/Shared';

const complianceData = [
  { name: 'NORTH', value: 92 },
  { name: 'SOUTH', value: 85 },
  { name: 'CENTRAL', value: 65 },
  { name: 'WEST', value: 96 },
];

const financialData = [
  { name: 'Ops', budget: 100, actual: 92 },
  { name: 'Trng', budget: 80, actual: 85 },
  { name: 'Log', budget: 60, actual: 45 },
];

const assetData = [
  { name: 'Audited', value: 75, color: '#10b981' },
  { name: 'Pending', value: 20, color: '#f59e0b' },
  { name: 'Missing', value: 5, color: '#ef4444' },
];

// Sample Action Data
const ACTION_ITEMS = [
  { 
    id: 'ACT-001', 
    title: 'Waiver: J. Smith', 
    type: 'Exemption', 
    req: 'SQ-102', 
    date: '2023-11-01',
    details: 'Requesting exemption from 1-mile run due to documented medical injury (ACL tear). Physican note attached.',
    status: 'PENDING' 
  },
  { 
    id: 'ACT-002', 
    title: 'Payment: XYZ Corp', 
    type: 'Finance', 
    req: 'HQ-LOG', 
    date: '2023-11-02',
    details: 'Vendor payment for Region 1 encampment supplies (MREs, Water). Amount: $4,500. Budget Code: OPS-23.',
    status: 'PENDING' 
  },
  { 
    id: 'ACT-003', 
    title: 'Promo Board: SQ-304', 
    type: 'Personnel', 
    req: 'REG-NE', 
    date: '2023-11-03',
    details: 'Promotion board results for SQ-304. 12 Cadets recommended for advancement. All requirements verified.',
    status: 'PENDING' 
  },
  { 
    id: 'ACT-004', 
    title: 'Travel Auth: Col. Miller', 
    type: 'Logistics', 
    req: 'REG-SW', 
    date: '2023-11-04',
    details: 'Authorization for site visit to Space Force Base via commercial air. Est Cost: $800.',
    status: 'PENDING' 
  },
  { 
    id: 'ACT-005', 
    title: 'Policy Memo: Uniforms', 
    type: 'Governance', 
    req: 'HQ-DO', 
    date: '2023-11-05',
    details: 'Final draft of Uniform Manual v2.1 for signature and distribution.',
    status: 'PENDING' 
  }
];

// Mock Governance Data
const ARCHIVE_RECORDS = [
  { id: 'REC-23-001', title: 'FY23 Financial Audit Report', date: '2023-10-15', type: 'PDF', size: '2.4 MB' },
  { id: 'REC-23-002', title: 'Board Meeting Minutes Q3', date: '2023-09-30', type: 'DOCX', size: '1.1 MB' },
  { id: 'REC-23-003', title: 'Unit Activation Order: SQ-304', date: '2023-08-12', type: 'PDF', size: '0.8 MB' },
  { id: 'REC-23-004', title: 'Safety Inspection Log', date: '2023-11-01', type: 'XLSX', size: '3.2 MB' },
];

const PLAYBOOK_TOC = [
  { chapter: '1.0', title: 'Mission & Vision', page: 3 },
  { chapter: '2.0', title: 'Organizational Structure', page: 8 },
  { chapter: '3.0', title: 'Unit Operations', page: 15 },
  { chapter: '3.1', title: 'Weekly Drill Schedule', page: 16 },
  { chapter: '3.2', title: 'Uniform Regulations', page: 22 },
  { chapter: '4.0', title: 'Emergency Protocols', page: 45 },
];

const BYLAWS_ARTICLES = [
  { article: 'ARTICLE I', title: 'NAME AND PURPOSES', content: 'The name of the corporation shall be Space Force Cadet Corps. The purpose of the corporation is to provide leadership training and STEM education to youth...' },
  { article: 'ARTICLE II', title: 'OFFICES', content: 'The principal office of the Corporation shall be located at HQ SFCC. The Corporation may have other offices as the Board of Directors may determine...' },
  { article: 'ARTICLE III', title: 'MEMBERSHIP', content: 'Membership in the Corporation shall be open to all individuals who meet the criteria established by the Board of Directors, without regard to race, color, religion...' },
  { article: 'ARTICLE IV', title: 'BOARD OF DIRECTORS', content: 'The business and affairs of the Corporation shall be managed by its Board of Directors. The Board shall consist of not less than three directors...' },
];


const HQView: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<typeof ACTION_ITEMS[0] | null>(null);
  const [showAllActions, setShowAllActions] = useState(false);
  const [activeGovernanceModal, setActiveGovernanceModal] = useState<'archive' | 'playbook' | 'bylaws' | null>(null);

  const renderGovernanceContent = () => {
    switch(activeGovernanceModal) {
      case 'archive':
        return (
          <div className="space-y-4">
             <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                   <Search size={14} className="absolute left-3 top-2.5 text-sfcc-secondary" />
                   <input type="text" placeholder="Search records..." className="w-full bg-sfcc-dark border border-sfcc-border rounded py-2 pl-9 pr-3 text-sm text-sfcc-primary focus:outline-none focus:border-sfcc-accent" />
                </div>
                <button className="px-4 py-2 bg-sfcc-panel border border-sfcc-border text-sfcc-primary text-sm rounded font-bold uppercase hover:bg-sfcc-dark transition-colors">Filter</button>
             </div>
             <table className="w-full text-left text-sm">
                <thead>
                   <tr className="border-b border-sfcc-border text-sfcc-secondary font-mono text-xs uppercase tracking-wider">
                      <th className="pb-3 pl-2">ID</th>
                      <th className="pb-3">Document Title</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3 text-right pr-2">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-sfcc-border">
                   {ARCHIVE_RECORDS.map((rec, i) => (
                      <tr key={i} className="hover:bg-sfcc-dark/50">
                         <td className="py-3 pl-2 font-mono text-sfcc-secondary">{rec.id}</td>
                         <td className="py-3">
                            <div className="text-sfcc-primary font-bold">{rec.title}</div>
                            <div className="text-[10px] text-sfcc-secondary font-mono">{rec.type} • {rec.size}</div>
                         </td>
                         <td className="py-3 font-mono text-sfcc-secondary">{rec.date}</td>
                         <td className="py-3 text-right pr-2">
                            <button className="text-sfcc-accent hover:text-white p-2">
                               <Download size={16} />
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        );
      case 'playbook':
        return (
          <div className="space-y-2">
             <div className="p-4 bg-sfcc-dark border border-sfcc-border rounded mb-4">
                <h3 className="text-lg font-bold text-sfcc-primary uppercase tracking-widest mb-1">Operational Playbook v4.1</h3>
                <p className="text-xs text-sfcc-secondary font-mono">Effective Date: 2023-01-01</p>
             </div>
             <div className="space-y-1">
                {PLAYBOOK_TOC.map((chapter, i) => (
                   <button key={i} className="w-full flex items-center justify-between p-3 hover:bg-sfcc-dark rounded border border-transparent hover:border-sfcc-border group transition-all">
                      <div className="flex items-center gap-4">
                         <span className="font-mono text-sfcc-secondary text-xs w-8">{chapter.chapter}</span>
                         <span className="text-sm font-bold text-sfcc-primary group-hover:text-sfcc-accent">{chapter.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className="text-xs font-mono text-sfcc-secondary">pg {chapter.page}</span>
                         <ChevronRight size={14} className="text-sfcc-secondary group-hover:text-sfcc-accent" />
                      </div>
                   </button>
                ))}
             </div>
          </div>
        );
      case 'bylaws':
        return (
          <div className="space-y-6 pr-2">
             <div className="text-center border-b border-sfcc-border pb-6">
                <Gavel size={32} className="mx-auto text-sfcc-secondary mb-3" />
                <h3 className="text-xl font-bold text-sfcc-primary uppercase tracking-widest">Bylaws of the SFCC</h3>
                <p className="text-xs text-sfcc-secondary font-mono mt-2">Adopted by the Board of Directors</p>
             </div>
             <div className="space-y-8">
                {BYLAWS_ARTICLES.map((art, i) => (
                   <div key={i}>
                      <h4 className="text-sm font-bold text-sfcc-accent uppercase tracking-wider mb-2">{art.article} - {art.title}</h4>
                      <p className="text-sm text-sfcc-secondary leading-relaxed text-justify border-l-2 border-sfcc-border pl-4">
                         {art.content}
                      </p>
                   </div>
                ))}
             </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10 relative">
      <SectionHeader 
        title="HQ Dashboard" 
        subtitle="Secure Connection • Neutral Portfolio v2.5" 
      />
      <SecurityBadges />

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Users} label="Total Cadets" value="1,240" subtext="+12% YoY Growth" />
        <MetricCard icon={Shield} label="Compliance Rate" value="94%" subtext="Q3 Reports Submitted" />
        <MetricCard icon={AlertTriangle} label="Remediation Rate" value="40%" subtext="Artifacts Scoring < 2" alert />
        <MetricCard icon={FileCheck} label="Pending Approvals" value="3" subtext="Pending Approval & Sign-Off" />
      </div>

      {/* Main Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1: Heatmap */}
        <Card title="National Compliance Heatmap" className="min-h-[300px]">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complianceData}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#96a3ae', fontSize: 10, fontFamily: 'monospace' }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#252525', borderColor: '#5f686e', color: '#c7d7e2' }}
                />
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {complianceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value < 70 ? '#5f686e' : '#96a3ae'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between px-2 mt-2">
             <div className="text-xs text-sfcc-secondary font-mono">AVG: 84%</div>
             <div className="text-xs text-sfcc-secondary font-mono">TARGET: 90%</div>
          </div>
        </Card>

        {/* Col 2: Risk Log */}
        <Card title="Critical Risk / Waiver Log">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-sfcc-border text-sfcc-secondary font-mono text-xs uppercase tracking-wider">
                  <th className="pb-3 pl-2">Unit</th>
                  <th className="pb-3">Issue</th>
                  <th className="pb-3 text-right pr-2">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sfcc-border">
                {[
                  { unit: 'SQ-404', issue: 'Missing YP Certs', risk: 'HIGH' },
                  { unit: 'SQ-102', issue: 'Safety Ratio Waiver', risk: 'MED' },
                  { unit: 'SQ-305', issue: 'Equip Audit Fail', risk: 'HIGH' },
                  { unit: 'SQ-201', issue: 'Delayed Board', risk: 'LOW' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-sfcc-dark/50 transition-colors">
                    <td className="py-3 pl-2 font-mono text-sfcc-primary">{row.unit}</td>
                    <td className="py-3 text-sfcc-secondary truncate max-w-[120px]" title={row.issue}>{row.issue}</td>
                    <td className="py-3 text-right pr-2">
                      <span className={`font-bold font-mono ${row.risk === 'HIGH' ? 'text-sfcc-danger' : row.risk === 'MED' ? 'text-sfcc-warning' : 'text-sfcc-success'}`}>
                        {row.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Col 3: Action Queue (Interactive) */}
        <Card title="Action Queue">
          <div className="space-y-4">
             {ACTION_ITEMS.slice(0, 3).map((item, i) => (
               <button 
                key={i} 
                onClick={() => setSelectedAction(item)}
                className="w-full text-left flex items-center justify-between p-3 bg-sfcc-dark/50 rounded border border-sfcc-border hover:border-sfcc-secondary hover:bg-sfcc-panel transition-all group"
               >
                 <div>
                   <p className="text-sm font-bold text-sfcc-primary group-hover:text-white">{item.title}</p>
                   <p className="text-[10px] text-sfcc-secondary font-mono uppercase mt-0.5">{item.type} • {item.req}</p>
                 </div>
                 <div className="flex gap-2">
                   <div className="text-[10px] uppercase font-bold text-sfcc-secondary px-2 py-1 border border-sfcc-border rounded bg-sfcc-dark">
                     View
                   </div>
                   <div className="text-[10px] uppercase font-bold text-sfcc-dark bg-emerald-500 px-2 py-1 rounded flex items-center gap-1">
                     Sign
                   </div>
                 </div>
               </button>
             ))}
             <div className="pt-2 text-center">
                <button 
                  onClick={() => setShowAllActions(true)}
                  className="text-xs text-sfcc-secondary hover:text-sfcc-accent flex items-center justify-center gap-1 w-full uppercase tracking-wider font-bold p-2 hover:bg-sfcc-dark rounded"
                >
                  View All Actions <ArrowRight size={12} />
                </button>
             </div>
          </div>
        </Card>
      </div>

      {/* Governance & Operations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Governance & Records */}
        <Card title="Governance & Records" className="lg:col-span-1">
          <div className="grid gap-3">
             <button 
                onClick={() => setActiveGovernanceModal('archive')}
                className="flex items-center gap-3 p-3 text-left rounded bg-sfcc-dark border border-sfcc-border hover:bg-sfcc-panel transition-all group"
             >
                <Archive size={18} className="text-sfcc-secondary group-hover:text-sfcc-accent" />
                <div>
                   <span className="block text-sm font-bold text-sfcc-primary group-hover:text-sfcc-primary">Official Archive</span>
                   <span className="text-[10px] text-sfcc-secondary font-mono">FY23 Records</span>
                </div>
             </button>
             <button 
                onClick={() => setActiveGovernanceModal('playbook')}
                className="flex items-center gap-3 p-3 text-left rounded bg-sfcc-dark border border-sfcc-border hover:bg-sfcc-panel transition-all group"
             >
                <BookOpen size={18} className="text-sfcc-secondary group-hover:text-sfcc-accent" />
                <div>
                   <span className="block text-sm font-bold text-sfcc-primary group-hover:text-sfcc-primary">Operational Playbook</span>
                   <span className="text-[10px] text-sfcc-secondary font-mono">v4.1 Active</span>
                </div>
             </button>
             <button 
                onClick={() => setActiveGovernanceModal('bylaws')}
                className="flex items-center gap-3 p-3 text-left rounded bg-sfcc-dark border border-sfcc-border hover:bg-sfcc-panel transition-all group"
             >
                <Gavel size={18} className="text-sfcc-secondary group-hover:text-sfcc-accent" />
                <div>
                   <span className="block text-sm font-bold text-sfcc-primary group-hover:text-sfcc-primary">Org. Bylaws</span>
                   <span className="text-[10px] text-sfcc-secondary font-mono">Rev. 2022</span>
                </div>
             </button>
          </div>
        </Card>

        {/* Automated Workflows */}
        <Card title="Automated Workflows" className="lg:col-span-1">
           <div className="space-y-4">
              {[
                { name: 'Policy Distribution', status: 'active' },
                { name: 'Document Review', status: 'active' },
                { name: 'Roster Sync', status: 'warning' },
                { name: 'Audit Trail Backup', status: 'active' },
              ].map((wf, i) => (
                <div key={i} className="flex items-center justify-between">
                   <span className="text-sm text-sfcc-secondary">{wf.name}</span>
                   {wf.status === 'active' ? (
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase">
                        <CheckCircle2 size={12} /> OK
                      </span>
                   ) : (
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-500 uppercase">
                        <Clock size={12} /> Sync
                      </span>
                   )}
                </div>
              ))}
           </div>
        </Card>

        {/* Corrective Actions */}
        <Card title="Corrective Actions" className="lg:col-span-2">
           <table className="w-full text-left text-sm">
              <thead>
                 <tr className="border-b border-sfcc-border text-sfcc-secondary font-mono text-xs uppercase tracking-wider">
                    <th className="pb-3 pl-2">ID</th>
                    <th className="pb-3">Finding</th>
                    <th className="pb-3">Issued</th>
                    <th className="pb-3 text-right pr-2">Status</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-sfcc-border">
                 <tr className="hover:bg-sfcc-dark/50">
                    <td className="py-3 pl-2 font-mono text-sfcc-secondary">CAR-001</td>
                    <td className="py-3 text-sfcc-primary">Incomplete Inventory Log</td>
                    <td className="py-3 font-mono text-sfcc-secondary">2023-10-15</td>
                    <td className="py-3 text-right pr-2"><Badge status="warning">Open</Badge></td>
                 </tr>
                 <tr className="hover:bg-sfcc-dark/50">
                    <td className="py-3 pl-2 font-mono text-sfcc-secondary">CAR-003</td>
                    <td className="py-3 text-sfcc-primary">Unauthorized Building Access</td>
                    <td className="py-3 font-mono text-sfcc-secondary">2023-11-01</td>
                    <td className="py-3 text-right pr-2"><Badge status="danger">Critical</Badge></td>
                 </tr>
                 <tr className="hover:bg-sfcc-dark/50">
                    <td className="py-3 pl-2 font-mono text-sfcc-secondary">CAR-004</td>
                    <td className="py-3 text-sfcc-primary">Training Record Gap</td>
                    <td className="py-3 font-mono text-sfcc-secondary">2023-11-05</td>
                    <td className="py-3 text-right pr-2"><Badge status="info">Review</Badge></td>
                 </tr>
              </tbody>
           </table>
        </Card>
      </div>

      {/* Financial & Board Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Financial Overview */}
        <Card title="Financial Overview">
           <div className="h-40 w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={financialData} layout="vertical" barSize={10}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={40} tick={{fill: '#96a3ae', fontSize: 10}} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#252525', borderColor: '#5f686e', color: '#c7d7e2'}} />
                    <Bar dataKey="budget" name="Budget" fill="#5f686e" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="actual" name="Actual" fill="#3684ca" radius={[0, 4, 4, 0]} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
           <div className="flex justify-between items-end border-t border-sfcc-border pt-3">
              <div>
                 <p className="text-[10px] text-sfcc-secondary uppercase tracking-widest">YTD Spending</p>
                 <p className="text-xl font-bold text-sfcc-primary font-mono flex items-center gap-1"><DollarSign size={16} className="text-sfcc-secondary" />842.5k</p>
              </div>
              <div className="text-right">
                 <p className="text-[10px] text-sfcc-secondary uppercase tracking-widest">Rem. Budget</p>
                 <p className="text-lg font-bold text-emerald-500 font-mono">15.2%</p>
              </div>
           </div>
        </Card>

        {/* Asset Audit Status */}
        <Card title="Asset Audit Status">
           <div className="flex items-center gap-6 h-full">
              <div className="h-32 w-32 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie 
                         data={assetData} 
                         innerRadius={35} 
                         outerRadius={55} 
                         paddingAngle={5} 
                         dataKey="value"
                         stroke="none"
                       >
                         {assetData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                       </Pie>
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Box size={20} className="text-sfcc-secondary" />
                 </div>
              </div>
              <div className="space-y-3 flex-1">
                 {assetData.map((item, i) => (
                   <div key={i} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                         <span className="text-sfcc-primary uppercase tracking-wider font-bold">{item.name}</span>
                      </div>
                      <span className="font-mono text-sfcc-secondary">{item.value}%</span>
                   </div>
                 ))}
                 <div className="border-t border-sfcc-border pt-2 mt-2">
                   <p className="text-[10px] text-sfcc-secondary">Next Audit: <span className="text-sfcc-primary">12/01/2023</span></p>
                 </div>
              </div>
           </div>
        </Card>

        {/* Portfolio & Board Review */}
        <Card title="Portfolio & Board Review">
           <div className="space-y-4">
              <div className="bg-sfcc-dark/50 p-3 rounded border border-sfcc-border">
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-sfcc-primary uppercase tracking-wider">Board Packet</h4>
                    <Badge status="success">Ready</Badge>
                 </div>
                 <p className="text-[10px] text-sfcc-secondary mb-2">Integrated Q3 Performance Snapshot</p>
                 <button className="w-full py-1.5 bg-[#3684ca]/10 text-[#3684ca] hover:bg-[#3684ca]/20 border border-[#3684ca]/20 rounded text-[10px] font-bold uppercase tracking-wider transition-colors">
                    View Packet
                 </button>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-sfcc-secondary uppercase tracking-widest">Ad-Hoc Portfolio Query</label>
                 <div className="flex gap-2">
                    <div className="relative flex-1">
                       <select className="w-full bg-sfcc-dark border border-sfcc-border text-sfcc-primary text-xs rounded py-1.5 pl-2 pr-6 appearance-none focus:outline-none focus:border-sfcc-secondary">
                          <option>Select Region...</option>
                          <option>Select Unit...</option>
                          <option>Select Risk Level...</option>
                       </select>
                       <Search size={12} className="absolute right-2 top-2 text-sfcc-secondary" />
                    </div>
                    <button className="bg-sfcc-panel hover:bg-sfcc-dark border border-sfcc-border text-sfcc-primary px-3 rounded text-xs">
                       Go
                    </button>
                 </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-sfcc-border">
                 <span className="text-[10px] font-bold text-sfcc-secondary uppercase tracking-wider flex items-center gap-1">
                    <Lock size={10} /> PII Compliance
                 </span>
                 <span className="text-[10px] font-mono text-emerald-500">SANITIZED: OK</span>
              </div>
           </div>
        </Card>
      </div>

      {/* --- Action Details Modal --- */}
      {selectedAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedAction(null)}></div>
           <div className="relative bg-sfcc-panel border border-sfcc-border w-full max-w-lg rounded-sm shadow-2xl animate-in zoom-in-95 duration-200">
              <button onClick={() => setSelectedAction(null)} className="absolute top-4 right-4 text-sfcc-secondary hover:text-white">
                 <X size={20} />
              </button>
              
              <div className="p-6 border-b border-sfcc-border">
                 <div className="flex items-center gap-2 mb-2">
                    <Badge status="info">{selectedAction.type}</Badge>
                    <span className="text-xs font-mono text-sfcc-secondary">{selectedAction.id}</span>
                 </div>
                 <h2 className="text-xl font-bold text-sfcc-primary">{selectedAction.title}</h2>
              </div>

              <div className="p-6 space-y-4">
                 <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                    <div>
                      <p className="text-sfcc-secondary uppercase tracking-widest text-[10px]">Requestor</p>
                      <p className="font-bold text-sfcc-primary">{selectedAction.req}</p>
                    </div>
                    <div>
                      <p className="text-sfcc-secondary uppercase tracking-widest text-[10px]">Date Submitted</p>
                      <p className="font-mono text-sfcc-primary">{selectedAction.date}</p>
                    </div>
                 </div>

                 <div className="bg-sfcc-dark/50 border border-sfcc-border p-4 rounded text-sm text-sfcc-secondary">
                    {selectedAction.details}
                 </div>

                 <div className="flex gap-3 pt-4">
                    <button onClick={() => setSelectedAction(null)} className="flex-1 py-3 border border-sfcc-border text-sfcc-secondary hover:text-sfcc-primary uppercase font-bold text-xs rounded hover:bg-sfcc-dark transition-colors">
                       Return for Review
                    </button>
                    <button onClick={() => setSelectedAction(null)} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white uppercase font-bold text-xs rounded shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-colors">
                       <FileSignature size={16} />
                       Sign & Approve
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- View All Actions Modal --- */}
      {showAllActions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAllActions(false)}></div>
           <div className="relative bg-sfcc-panel border border-sfcc-border w-full max-w-4xl max-h-[80vh] flex flex-col rounded-sm shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-6 border-b border-sfcc-border">
                 <h2 className="text-xl font-bold text-sfcc-primary uppercase tracking-wider flex items-center gap-3">
                   <FileCheck size={24} className="text-sfcc-accent" />
                   Pending Action Queue
                 </h2>
                 <button onClick={() => setShowAllActions(false)} className="text-sfcc-secondary hover:text-white">
                    <X size={20} />
                 </button>
              </div>
              
              <div className="overflow-y-auto p-6">
                 <table className="w-full text-left text-sm">
                    <thead>
                       <tr className="border-b border-sfcc-border text-sfcc-secondary font-mono text-xs uppercase tracking-wider">
                          <th className="pb-3 pl-2">ID</th>
                          <th className="pb-3">Action Item</th>
                          <th className="pb-3">Type</th>
                          <th className="pb-3">Unit</th>
                          <th className="pb-3">Date</th>
                          <th className="pb-3 text-right pr-2">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-sfcc-border">
                       {ACTION_ITEMS.map((item, i) => (
                          <tr key={i} className="hover:bg-sfcc-dark/50 transition-colors">
                             <td className="py-3 pl-2 font-mono text-sfcc-secondary">{item.id}</td>
                             <td className="py-3 font-bold text-sfcc-primary">{item.title}</td>
                             <td className="py-3"><Badge status="neutral">{item.type}</Badge></td>
                             <td className="py-3 font-mono text-sfcc-secondary">{item.req}</td>
                             <td className="py-3 font-mono text-sfcc-secondary">{item.date}</td>
                             <td className="py-3 text-right pr-2">
                                <button 
                                  onClick={() => { setShowAllActions(false); setSelectedAction(item); }}
                                  className="text-[10px] font-bold uppercase text-sfcc-accent border border-sfcc-border hover:bg-sfcc-accent hover:text-white px-3 py-1.5 rounded transition-colors"
                                >
                                   Review
                                </button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      )}

      {/* --- Governance Details Modal --- */}
      {activeGovernanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveGovernanceModal(null)}></div>
           <div className="relative bg-sfcc-panel border border-sfcc-border w-full max-w-2xl max-h-[80vh] flex flex-col rounded-sm shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-6 border-b border-sfcc-border">
                 <h2 className="text-xl font-bold text-sfcc-primary uppercase tracking-wider flex items-center gap-3">
                   {activeGovernanceModal === 'archive' && <Archive className="text-sfcc-accent" />}
                   {activeGovernanceModal === 'playbook' && <BookOpen className="text-sfcc-accent" />}
                   {activeGovernanceModal === 'bylaws' && <Gavel className="text-sfcc-accent" />}
                   
                   {activeGovernanceModal === 'archive' && "Official Archive"}
                   {activeGovernanceModal === 'playbook' && "Operational Playbook"}
                   {activeGovernanceModal === 'bylaws' && "Organizational Bylaws"}
                 </h2>
                 <button onClick={() => setActiveGovernanceModal(null)} className="text-sfcc-secondary hover:text-white">
                    <X size={20} />
                 </button>
              </div>
              
              <div className="overflow-y-auto p-6 scroll-smooth">
                 {renderGovernanceContent()}
              </div>

              <div className="p-4 border-t border-sfcc-border bg-sfcc-dark/50 text-right">
                  <button onClick={() => setActiveGovernanceModal(null)} className="text-xs font-bold uppercase text-sfcc-secondary hover:text-white px-4 py-2 border border-sfcc-border rounded hover:bg-sfcc-panel transition-colors">
                     Close Viewer
                  </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default HQView;