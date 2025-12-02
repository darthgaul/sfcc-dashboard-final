
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
  FileText,
  Activity,
  Terminal,
  Gavel,
  ChevronRight
} from 'lucide-react';
import { MetricCard, Card, SectionHeader, SecurityBadges, Badge } from '../components/Shared';

// --- Regulatory Badge Component (Futuristic) ---
const RegBadge: React.FC<{ label: string; code: string; status: 'pass' | 'warn' | 'fail' | 'info'; value?: string }> = ({ label, code, status, value }) => {
  const colors = {
    pass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.1)]',
    warn: 'bg-amber-500/10 border-amber-500/30 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.1)]',
    fail: 'bg-red-500/10 border-red-500/30 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]',
    info: 'bg-[#3684ca]/10 border-[#3684ca]/30 text-[#3684ca] shadow-[0_0_10px_rgba(54,132,202,0.1)]',
  };

  return (
    <div className={`flex flex-col border rounded-sm px-3 py-2 min-w-[100px] backdrop-blur-sm ${colors[status]}`}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[9px] font-bold uppercase tracking-widest opacity-80">{label}</span>
      </div>
      <div className="flex justify-between items-end">
         <span className="text-[8px] font-mono opacity-60">{code}</span>
         {value && <span className="text-xs font-mono font-bold">{value}</span>}
      </div>
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
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 font-sans">
      <SectionHeader title="Squadron Command" subtitle="Compliance Gate • Attestation Tool v3.1" />
      <SecurityBadges />

      {/* --- Top Level Compliance Indicators (System Nodes) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
            { 
               icon: ShieldCheck, color: 'text-emerald-500', 
               code: 'CCT 20-1-C', label: 'Succession Plan', value: 'CURRENT', 
               glow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]'
            },
            { 
               icon: Users, color: 'text-[#3684ca]', 
               code: 'SAFETY STD', label: 'Two-Deep Lead', value: '100% OK', 
               glow: 'shadow-[0_0_15px_rgba(54,132,202,0.2)]'
            },
            { 
               icon: FileWarning, color: 'text-amber-500', 
               code: '7-DAY RULE', label: 'Remediation', value: '2 ACTIVE', 
               glow: 'shadow-[0_0_15px_rgba(245,158,11,0.2)]'
            },
            { 
               icon: ClipboardCheck, color: 'text-[#96a3ae]', 
               code: 'CCC 20-8-1', label: 'Pre-Flight', value: 'VERIFIED', 
               glow: ''
            }
         ].map((card, i) => (
            <div key={i} className={`bg-[#191818]/80 backdrop-blur-md border border-[#5f686e]/30 p-4 rounded-sm relative overflow-hidden group ${card.glow}`}>
               <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#5f686e]/50 to-transparent group-hover:via-[#3684ca] transition-all"></div>
               <div className="flex justify-between items-start mb-3">
                  <card.icon className={`${card.color}`} size={24} />
                  <span className="text-[9px] font-mono text-[#5f686e] border border-[#5f686e]/30 px-1.5 rounded">{card.code}</span>
               </div>
               <div className="text-xs font-bold text-[#96a3ae] uppercase tracking-widest mb-1">{card.label}</div>
               <div className={`text-lg font-bold font-mono ${card.color}`}>{card.value}</div>
            </div>
         ))}
      </div>

      {/* --- Main Workflow: Artifact Attestation Gate --- */}
      <div className="bg-[#191818]/80 backdrop-blur-md border border-[#3684ca]/30 rounded-sm relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3684ca] to-transparent opacity-50"></div>
         
         <div className="p-5 border-b border-[#5f686e]/20 flex justify-between items-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
               <Gavel size={16} className="text-[#3684ca]" /> Artifact Review & Attestation Gate
            </h3>
            <div className="text-[10px] font-mono text-[#5f686e]">PENDING: {REVIEW_QUEUE.length}</div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-separate border-spacing-y-1 px-2 pb-2">
               <thead>
                  <tr className="text-[#5f686e] font-mono text-[10px] uppercase tracking-wider">
                     <th className="pb-2 pl-4">Cadet Identity</th>
                     <th className="pb-2">Data Integrity (CCR 20-4)</th>
                     <th className="pb-2">Academic Checks</th>
                     <th className="pb-2">Score</th>
                     <th className="pb-2 text-right pr-4">Command Action</th>
                  </tr>
               </thead>
               <tbody>
                  {REVIEW_QUEUE.map((row, i) => (
                     <tr key={i} className="group bg-[#252525]/30 hover:bg-[#252525] transition-all">
                        <td className="py-3 pl-4 rounded-l-sm border-l-2 border-transparent hover:border-[#3684ca]">
                           <div className="font-bold text-white text-xs">{row.cadet}</div>
                           <div className="text-[10px] text-[#96a3ae] font-mono">{row.artifact}</div>
                           <div className="mt-1"><Badge status="neutral">{row.loe}</Badge></div>
                        </td>
                        <td className="py-3">
                           {row.piiStatus === 'PENDING' ? (
                              <button className="flex items-center gap-2 px-3 py-1.5 bg-[#3684ca]/10 border border-[#3684ca]/30 text-[#3684ca] hover:bg-[#3684ca] hover:text-white rounded-sm transition-all text-[9px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(54,132,202,0.1)]">
                                 <FileSignature size={12} />
                                 Attest CCC 20-4-2
                              </button>
                           ) : (
                              <div className="flex items-center gap-2 text-emerald-500">
                                 <Lock size={12} />
                                 <span className="text-[10px] font-bold uppercase tracking-wider">Sanitized</span>
                              </div>
                           )}
                        </td>
                        <td className="py-3">
                           <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${row.aiDisclosure === 'VERIFIED' ? 'text-emerald-500' : 'text-red-500'}`}>
                              {row.aiDisclosure === 'VERIFIED' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                              AI: {row.aiDisclosure}
                           </div>
                        </td>
                        <td className="py-3">
                           <div className={`text-xl font-bold font-mono ${row.score < 2 ? 'text-red-500' : 'text-emerald-500'}`}>
                              {row.score}<span className="text-sm text-[#5f686e]">/4</span>
                           </div>
                        </td>
                        <td className="py-3 text-right pr-4 rounded-r-sm">
                           {row.score < 2 ? (
                              <button className="bg-red-500/10 border border-red-500/30 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all">
                                 Assign Remediation
                              </button>
                           ) : row.piiStatus === 'PENDING' ? (
                              <span className="text-[10px] text-[#5f686e] font-mono italic">Awaiting Attestation</span>
                           ) : (
                              <button className="bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500 text-emerald-500 hover:text-white px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ml-auto">
                                 <Star size={12} /> Promote
                              </button>
                           )}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
         {/* --- Remediation & Waivers --- */}
         <div className="space-y-6">
            <Card title="Mandatory Remediation Queue" variant="glass">
               <div className="space-y-3">
                  {REMEDIATION_QUEUE.map((item, i) => (
                     <div key={i} className="flex justify-between items-center p-3 bg-[#191818] border border-[#5f686e]/30 rounded-sm hover:border-amber-500 transition-colors group">
                        <div>
                           <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white group-hover:text-amber-500 transition-colors">{item.cadet}</span>
                              {item.status === 'OVERDUE' && <span className="text-[9px] font-bold bg-red-500 text-white px-1 rounded">OVERDUE</span>}
                           </div>
                           <div className="text-[10px] text-[#96a3ae] mt-1 font-mono">
                              Trigger: <span className="text-white">{item.trigger}</span>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-[9px] font-bold text-[#5f686e] uppercase tracking-wider">Deadline</div>
                           <div className={`font-mono text-xs font-bold ${item.status === 'OVERDUE' ? 'text-red-500' : 'text-amber-500'}`}>
                              {item.deadline}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </Card>

            <Card title="Waiver Log (CCT 20-10T)" variant="glass">
               <div className="space-y-1">
                  {WAIVER_QUEUE.map((w, i) => (
                     <div key={i} className="flex justify-between items-center p-3 border-b border-[#5f686e]/20 last:border-0 hover:bg-[#252525]/50 transition-colors">
                        <div>
                           <span className="text-[10px] font-mono text-[#3684ca] block mb-0.5">{w.id}</span>
                           <span className="text-xs font-bold text-white">{w.type}</span>
                        </div>
                        <Badge status={w.status.includes('PENDING') ? 'warning' : 'success'}>{w.status}</Badge>
                     </div>
                  ))}
                  <button className="w-full mt-4 py-3 border border-dashed border-[#5f686e]/50 text-[#96a3ae] hover:text-white hover:border-white text-[10px] uppercase font-bold tracking-widest rounded-sm transition-all flex items-center justify-center gap-2">
                     <FilePlus size={14} /> Draft New Waiver
                  </button>
               </div>
            </Card>
         </div>

         {/* --- Operational Checklists & Closure --- */}
         <div className="space-y-6">
            <Card title="Mission / AAR Closure Queue" variant="glass">
               <div className="space-y-4">
                  {MISSION_CLOSURE.map((m, i) => (
                     <div key={i} className="bg-[#191818] p-4 rounded-sm border border-[#5f686e]/30 relative overflow-hidden">
                        <div className="flex justify-between mb-3">
                           <span className="text-sm font-bold text-white tracking-wide">{m.event}</span>
                           <span className="text-[10px] font-mono text-[#5f686e]">{m.date}</span>
                        </div>
                        <div className="flex gap-3 mb-4">
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
                        <button className="w-full bg-[#252525] hover:bg-[#3684ca] hover:text-white border border-[#5f686e]/30 hover:border-[#3684ca] text-[#96a3ae] py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                           <FileText size={14} /> Attach Report
                        </button>
                     </div>
                  ))}
               </div>
            </Card>

            <Card title="Operational Checklists">
               <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 bg-[#191818] border border-[#5f686e]/30 hover:border-[#3684ca] hover:bg-[#3684ca]/5 rounded-sm transition-all text-left group">
                     <ClipboardCheck className="text-[#5f686e] group-hover:text-[#3684ca] mb-3 transition-colors" size={24} />
                     <div className="text-[9px] font-mono text-[#5f686e] mb-1">CCC 20-8-1</div>
                     <div className="text-xs font-bold text-white group-hover:text-[#3684ca] transition-colors">Safety Pre-Flight</div>
                  </button>
                  <button className="p-4 bg-[#191818] border border-[#5f686e]/30 hover:border-[#3684ca] hover:bg-[#3684ca]/5 rounded-sm transition-all text-left group">
                     <Scale className="text-[#5f686e] group-hover:text-[#3684ca] mb-3 transition-colors" size={24} />
                     <div className="text-[9px] font-mono text-[#5f686e] mb-1">CCC 20-7-1</div>
                     <div className="text-xs font-bold text-white group-hover:text-[#3684ca] transition-colors">Oral Defense</div>
                  </button>
               </div>
            </Card>
         </div>

      </div>
    </div>
  );
};

export default SquadronView;
