
import React, { useState } from 'react';
import { 
  Users, 
  FilePlus, 
  AlertOctagon, 
  Bookmark, 
  RefreshCw, 
  Star, 
  ClipboardCheck, 
  ShieldCheck, 
  FileWarning, 
  AlertTriangle, 
  FileSignature, 
  History, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Scale,
  Eye,
  Lock,
  FileText
} from 'lucide-react';
import { MetricCard, Card, SectionHeader, SecurityBadges, Badge } from '../components/Shared';

// --- Regulatory Badge Component (Local Definition) ---
const RegBadge: React.FC<{ label: string; code: string; status: 'pass' | 'warn' | 'fail' | 'info'; value?: string }> = ({ label, code, status, value }) => {
  const colors = {
    pass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500',
    warn: 'bg-amber-500/10 border-amber-500/30 text-amber-500',
    fail: 'bg-red-500/10 border-red-500/30 text-red-500',
    info: 'bg-[#3684ca]/10 border-[#3684ca]/30 text-[#3684ca]',
  };

  return (
    <div className={`flex flex-col border rounded px-2 py-1.5 min-w-[90px] ${colors[status]}`}>
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
        {value && <span className="text-[9px] font-mono font-bold ml-1">{value}</span>}
      </div>
      <span className="text-[8px] font-mono opacity-70 mt-0.5">{code}</span>
    </div>
  );
};

// --- Mock Data ---
const REVIEW_QUEUE = [
  { 
    id: 'ART-105',
    cadet: 'Cdt. E. Ender', 
    artifact: 'Rocketry Lab', 
    date: 'Oct 15', 
    score: 3,
    piiStatus: 'PENDING', // CCR 20-4
    aiDisclosure: 'VERIFIED',
    loe: 'B (STEM)'
  },
  { 
    id: 'ART-109',
    cadet: 'Cdt. J. Doe', 
    artifact: 'Sq. Drill Cmd', 
    date: 'Oct 18', 
    score: 1, // < 2 trigger
    piiStatus: 'ATTESTED', 
    aiDisclosure: 'MISSING',
    loe: 'C (LEAD)'
  },
  { 
    id: 'ART-112',
    cadet: 'Cdt. A. Smith', 
    artifact: 'Cyber Analysis', 
    date: 'Oct 20', 
    score: 4,
    piiStatus: 'ATTESTED', 
    aiDisclosure: 'VERIFIED',
    loe: 'B (CYBER)'
  }
];

const REMEDIATION_QUEUE = [
  { id: 'REM-001', cadet: 'Cdt. J. Doe', trigger: 'Oral Defense Failure', deadline: '2 Days', status: 'OVERDUE' },
  { id: 'REM-002', cadet: 'Cdt. B. Wayne', trigger: 'Safety Viol. (LOE-B)', deadline: '5 Days', status: 'OPEN' },
];

const WAIVER_QUEUE = [
  { id: 'WVR-23-05', type: 'Medical (Run)', status: 'PENDING HQ', date: 'Oct 25' },
  { id: 'WVR-23-06', type: 'Uniform Mod', status: 'APPROVED', date: 'Oct 10' },
];

const MISSION_CLOSURE = [
  { event: 'Regional FTX', date: 'Nov 10', aarStatus: 'PENDING', supervision: 'CONFIRMED' },
  { event: 'Unit Drill', date: 'Nov 15', aarStatus: 'MISSING', supervision: 'CONFIRMED' },
];

const SquadronView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <SectionHeader title="Squadron Command" subtitle="Compliance Gate • Attestation Tool v3.1" />
      <SecurityBadges />

      {/* --- Top Level Compliance Indicators --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <Card className="flex flex-col justify-center p-4 border-l-4 border-l-emerald-500">
            <div className="flex justify-between items-start mb-2">
               <ShieldCheck className="text-emerald-500" size={20} />
               <span className="text-[10px] font-mono text-sfcc-secondary">CCT 20-1-C</span>
            </div>
            <div className="text-sm font-bold text-white uppercase tracking-wider">Succession Plan</div>
            <div className="text-xs font-mono text-emerald-500 mt-1">STATUS: CURRENT</div>
         </Card>

         <Card className="flex flex-col justify-center p-4 border-l-4 border-l-sfcc-accent">
            <div className="flex justify-between items-start mb-2">
               <Users className="text-sfcc-accent" size={20} />
               <span className="text-[10px] font-mono text-sfcc-secondary">SAFETY STD</span>
            </div>
            <div className="text-sm font-bold text-white uppercase tracking-wider">Two-Deep Leadership</div>
            <div className="text-xs font-mono text-sfcc-accent mt-1">EPA/MTE: 100% COMPLIANT</div>
         </Card>

         <Card className="flex flex-col justify-center p-4 border-l-4 border-l-sfcc-warning">
            <div className="flex justify-between items-start mb-2">
               <FileWarning className="text-sfcc-warning" size={20} />
               <span className="text-[10px] font-mono text-sfcc-secondary">7-DAY RULE</span>
            </div>
            <div className="text-sm font-bold text-white uppercase tracking-wider">Remediation Queue</div>
            <div className="text-xs font-mono text-sfcc-warning mt-1">2 OPEN ACTIONS</div>
         </Card>

         <Card className="flex flex-col justify-center p-4 border-l-4 border-l-sfcc-border">
            <div className="flex justify-between items-start mb-2">
               <ClipboardCheck className="text-sfcc-secondary" size={20} />
               <span className="text-[10px] font-mono text-sfcc-secondary">CCC 20-8-1</span>
            </div>
            <div className="text-sm font-bold text-white uppercase tracking-wider">Pre-Flight Checks</div>
            <div className="text-xs font-mono text-sfcc-secondary mt-1">LAST: 2023-11-01</div>
         </Card>
      </div>

      {/* --- Main Workflow: Artifact Attestation Gate --- */}
      <Card title="Artifact Review & Attestation Gate">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead>
                  <tr className="border-b border-sfcc-border text-sfcc-secondary font-mono text-[10px] uppercase tracking-wider">
                     <th className="pb-3 pl-2">Cadet / Artifact</th>
                     <th className="pb-3">Data Integrity (CCR 20-4)</th>
                     <th className="pb-3">Academic Integrity</th>
                     <th className="pb-3">Rubric Score</th>
                     <th className="pb-3 text-right pr-2">Command Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-sfcc-border">
                  {REVIEW_QUEUE.map((row, i) => (
                     <tr key={i} className="hover:bg-sfcc-dark/50 group">
                        <td className="py-4 pl-2">
                           <div className="font-bold text-sfcc-primary text-xs">{row.cadet}</div>
                           <div className="text-[10px] text-sfcc-secondary">{row.artifact}</div>
                           <Badge status="neutral">{row.loe}</Badge>
                        </td>
                        <td className="py-4">
                           {row.piiStatus === 'PENDING' ? (
                              <button className="flex items-center gap-2 px-3 py-1.5 bg-sfcc-accent/10 border border-sfcc-accent/30 text-sfcc-accent hover:bg-sfcc-accent hover:text-white rounded transition-colors text-[10px] font-bold uppercase tracking-wider">
                                 <FileSignature size={12} />
                                 Attest CCC 20-4-2
                              </button>
                           ) : (
                              <RegBadge label="PII Check" code="CCC 20-4-2" status="pass" value="SIGNED" />
                           )}
                        </td>
                        <td className="py-4">
                           <RegBadge 
                              label="AI Disclosure" 
                              code="Mandatory" 
                              status={row.aiDisclosure === 'VERIFIED' ? 'pass' : 'fail'} 
                              value={row.aiDisclosure}
                           />
                        </td>
                        <td className="py-4">
                           <div className={`text-lg font-bold font-mono ${row.score < 2 ? 'text-sfcc-danger' : 'text-sfcc-success'}`}>
                              {row.score}/4
                           </div>
                           {row.score < 2 && (
                              <span className="text-[9px] font-bold text-sfcc-danger uppercase">Remediation Req.</span>
                           )}
                        </td>
                        <td className="py-4 text-right pr-2">
                           {row.score < 2 ? (
                              <button className="bg-sfcc-danger hover:bg-red-600 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-red-900/20">
                                 Assign Remediation
                              </button>
                           ) : row.piiStatus === 'PENDING' ? (
                              <span className="text-[10px] text-sfcc-secondary italic">Awaiting Attestation</span>
                           ) : (
                              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-emerald-900/20 flex items-center gap-2 ml-auto">
                                 <Star size={12} /> Promote
                              </button>
                           )}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
         {/* --- Remediation & Waivers --- */}
         <div className="space-y-6">
            <Card title="Mandatory Remediation Queue">
               <div className="space-y-3">
                  {REMEDIATION_QUEUE.map((item, i) => (
                     <div key={i} className="flex justify-between items-center p-3 bg-sfcc-dark border border-sfcc-border rounded hover:border-sfcc-warning transition-colors">
                        <div>
                           <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-sfcc-primary">{item.cadet}</span>
                              {item.status === 'OVERDUE' && <Badge status="danger">OVERDUE</Badge>}
                           </div>
                           <div className="text-[10px] text-sfcc-secondary mt-1">
                              Trigger: <span className="text-sfcc-primary">{item.trigger}</span>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-[10px] font-bold text-sfcc-secondary uppercase tracking-wider">Deadline</div>
                           <div className={`font-mono text-xs font-bold ${item.status === 'OVERDUE' ? 'text-sfcc-danger' : 'text-sfcc-warning'}`}>
                              {item.deadline}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </Card>

            <Card title="Waiver Log (CCT 20-10T)">
               <div className="space-y-2">
                  {WAIVER_QUEUE.map((w, i) => (
                     <div key={i} className="flex justify-between items-center p-2 border-b border-sfcc-border/50 last:border-0">
                        <div>
                           <span className="text-xs font-mono text-sfcc-secondary block">{w.id}</span>
                           <span className="text-xs font-bold text-sfcc-primary">{w.type}</span>
                        </div>
                        <Badge status={w.status.includes('PENDING') ? 'warning' : 'success'}>{w.status}</Badge>
                     </div>
                  ))}
                  <button className="w-full mt-2 py-2 border border-dashed border-sfcc-border text-sfcc-secondary hover:text-sfcc-primary hover:border-sfcc-primary text-[10px] uppercase font-bold tracking-wider rounded transition-all">
                     + Draft New Waiver
                  </button>
               </div>
            </Card>
         </div>

         {/* --- Operational Checklists & Closure --- */}
         <div className="space-y-6">
            <Card title="Mission / AAR Closure Queue">
               <div className="space-y-4">
                  {MISSION_CLOSURE.map((m, i) => (
                     <div key={i} className="bg-sfcc-dark p-3 rounded border border-sfcc-border">
                        <div className="flex justify-between mb-2">
                           <span className="text-xs font-bold text-white">{m.event}</span>
                           <span className="text-[10px] font-mono text-sfcc-secondary">{m.date}</span>
                        </div>
                        <div className="flex gap-2">
                           <RegBadge 
                              label="48h AAR" 
                              code="Mandatory" 
                              status={m.aarStatus === 'PENDING' ? 'warn' : 'fail'} 
                              value={m.aarStatus}
                           />
                           <RegBadge 
                              label="Supervision" 
                              code="2-Deep" 
                              status="pass" 
                              value={m.supervision}
                           />
                        </div>
                        <button className="w-full mt-3 bg-sfcc-panel hover:bg-sfcc-accent hover:text-white border border-sfcc-border text-sfcc-secondary py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors">
                           Attach After Action Report
                        </button>
                     </div>
                  ))}
               </div>
            </Card>

            <Card title="Operational Checklists">
               <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-sfcc-dark border border-sfcc-border hover:border-sfcc-accent hover:bg-sfcc-accent/5 rounded transition-all text-left group">
                     <ClipboardCheck className="text-sfcc-secondary group-hover:text-sfcc-accent mb-2" size={20} />
                     <div className="text-[10px] font-mono text-sfcc-secondary">CCC 20-8-1</div>
                     <div className="text-xs font-bold text-white group-hover:text-sfcc-accent">Safety Pre-Flight</div>
                  </button>
                  <button className="p-3 bg-sfcc-dark border border-sfcc-border hover:border-sfcc-accent hover:bg-sfcc-accent/5 rounded transition-all text-left group">
                     <Scale className="text-sfcc-secondary group-hover:text-sfcc-accent mb-2" size={20} />
                     <div className="text-[10px] font-mono text-sfcc-secondary">CCC 20-7-1</div>
                     <div className="text-xs font-bold text-white group-hover:text-sfcc-accent">Oral Defense</div>
                  </button>
               </div>
            </Card>
         </div>

      </div>
    </div>
  );
};

export default SquadronView;
