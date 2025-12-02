
import React from 'react';
import { 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  FileSignature, 
  Link as LinkIcon, 
  Lock, 
  Activity, 
  Scale, 
  BookOpen, 
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  Terminal,
  Cpu,
  X,
  Clock
} from 'lucide-react';
import { Card, SectionHeader, Badge, SecurityBadges } from '../components/Shared';

// --- Circular Progress Component for UX Flair ---
const CircularMetric: React.FC<{ value: number; max: number; label: string; sublabel?: string; color: string }> = ({ value, max, label, sublabel, color }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / max) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-[#252525]"
          />
          {/* Progress Circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${color} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-white font-mono">{value}</span>
          <span className="text-[9px] text-[#5f686e] font-mono">/ {max}</span>
        </div>
      </div>
      <div className="text-center mt-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#c7d7e2]">{label}</div>
        {sublabel && <div className="text-[9px] font-mono text-[#5f686e]">{sublabel}</div>}
      </div>
    </div>
  );
};

const CadetView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 font-sans">
      <SectionHeader title="Cadet Dashboard" subtitle="Identity: C. Ender • Level L1 Access" />
      <SecurityBadges />

      {/* 1. CRITICAL ALERT: SYSTEM FAILURE (Remediation) */}
      <div className="relative overflow-hidden rounded-sm border border-red-500/50 bg-red-500/5 p-1 group">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(239,68,68,0.05)_10px,rgba(239,68,68,0.05)_20px)] opacity-50"></div>
        
        <div className="relative p-6 flex flex-col md:flex-row items-center gap-6 z-10">
           <div className="p-4 bg-red-500/10 rounded-full border border-red-500/30 animate-pulse">
              <ShieldAlert size={32} className="text-red-500" />
           </div>
           
           <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                 <h3 className="text-red-500 font-bold uppercase tracking-[0.2em] text-sm animate-pulse">Critical Action Required</h3>
                 <span className="px-1.5 py-0.5 border border-red-500/50 text-[9px] font-mono text-red-400 rounded bg-red-900/20">CCR 20-7</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">Mandatory Remediation Active</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-mono text-red-300/80 mt-2">
                 <span className="flex items-center gap-2"><X size={12} /> Target: Squadron Drill Cmd</span>
                 <span className="flex items-center gap-2"><Clock size={12} /> Deadline: T-minus 7 Days</span>
              </div>
           </div>

           <button className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest text-xs rounded-sm shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all transform hover:scale-105">
              Execute Correction Plan
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COL: Holographic Dossier (Span 4) */}
        <div className="lg:col-span-4 space-y-6">
            {/* Holographic ID Card */}
            <div className="bg-[#191818]/80 backdrop-blur-md border border-[#3684ca]/30 p-6 rounded-sm relative overflow-hidden flex flex-col items-center">
              {/* Tech Decoration */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3684ca] to-transparent opacity-50"></div>
              <div className="absolute top-2 right-2 text-[8px] font-mono text-[#3684ca] opacity-50">ID: U-009-ALPHA</div>
              
              <div className="relative mb-6">
                 <div className="w-32 h-32 rounded-full border-2 border-[#3684ca] p-1 shadow-[0_0_20px_rgba(54,132,202,0.3)]">
                    <div className="w-full h-full rounded-full bg-[#252525] flex items-center justify-center overflow-hidden relative">
                       <img 
                          src="https://publish-01.obsidian.md/access/c6e84d0dba4a473d9f7c63884517ea6d/images/sfcc%20roundel%204.png"
                          className="w-20 h-20 opacity-20 absolute"
                          alt="Placeholder"
                       />
                       <span className="text-4xl font-bold text-[#5f686e]">Cdt</span>
                    </div>
                 </div>
                 <div className="absolute bottom-0 right-0 bg-[#3684ca] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#191818]">
                    L1
                 </div>
              </div>

              <div className="text-center w-full">
                 <h2 className="text-3xl font-bold text-white mb-1 tracking-tight">C/Sgt Ender</h2>
                 <p className="text-xs font-mono text-[#3684ca] uppercase tracking-[0.2em] mb-6">Cadet Sergeant</p>
                 
                 <div className="grid grid-cols-2 gap-px bg-[#3684ca]/20 border border-[#3684ca]/20 rounded-sm overflow-hidden">
                    <div className="bg-[#191818]/90 p-3">
                       <div className="text-[9px] text-[#5f686e] uppercase tracking-wider mb-1">Unit</div>
                       <div className="text-sm font-bold text-white">SQ-101</div>
                    </div>
                    <div className="bg-[#191818]/90 p-3">
                       <div className="text-[9px] text-[#5f686e] uppercase tracking-wider mb-1">TIG</div>
                       <div className="text-sm font-bold text-white font-mono">4.5 Mo</div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Promotion Timeline */}
            <div className="bg-[#191818] border border-[#5f686e]/30 p-5 rounded-sm relative">
                <h3 className="text-xs font-bold text-[#96a3ae] uppercase tracking-widest mb-6 flex items-center gap-2">
                   <TrendingUp size={14} className="text-[#3684ca]" /> Promotion Log
                </h3>
                
                {/* Watermark */}
                <img 
                    src="https://publish-01.obsidian.md/access/c6e84d0dba4a473d9f7c63884517ea6d/images/16.png" 
                    alt="Rank Watermark" 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 opacity-5 pointer-events-none grayscale" 
                />

                <div className="space-y-6 relative z-10 pl-2 border-l border-[#5f686e]/20 ml-2">
                   {[
                      { rank: 'C/Sgt', date: 'Oct 01, 2023', active: true },
                      { rank: 'C/SrA', date: 'Feb 15, 2023', active: false },
                      { rank: 'C/Amn', date: 'Sep 01, 2022', active: false },
                   ].map((item, i) => (
                      <div key={i} className="relative pl-6">
                         <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#191818] ${item.active ? 'bg-[#3684ca] shadow-[0_0_10px_#3684ca]' : 'bg-[#5f686e]'}`}></div>
                         <div className="flex justify-between items-center">
                            <span className={`text-sm font-bold ${item.active ? 'text-white' : 'text-[#5f686e]'}`}>{item.rank}</span>
                            <span className="text-[10px] font-mono text-[#5f686e]">{item.date}</span>
                         </div>
                      </div>
                   ))}
                </div>
            </div>
        </div>

        {/* RIGHT COL: Ops Metrics (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
           
           {/* Awards Case */}
           <div className="bg-[#191818] border border-[#5f686e]/30 p-1 rounded-sm">
              <div className="bg-[#252525]/30 p-4 rounded-sm border border-[#5f686e]/10">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-bold text-[#96a3ae] uppercase tracking-widest flex items-center gap-2">
                       <Award size={14} className="text-[#eab308]" /> Decorations
                    </h3>
                    <span className="text-[9px] font-mono text-[#5f686e]">3 Authorized</span>
                 </div>
                 <div className="flex flex-wrap-reverse justify-center gap-6 w-full py-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#191818]/50 to-transparent pointer-events-none"></div>
                    <img src="https://publish-01.obsidian.md/access/c6e84d0dba4a473d9f7c63884517ea6d/images/Technology-Economics.png" className="h-10 w-auto shadow-lg" alt="Award" />
                    <img src="https://publish-01.obsidian.md/access/c6e84d0dba4a473d9f7c63884517ea6d/images/Policy-Economics.png" className="h-10 w-auto shadow-lg" alt="Award" />
                    <img src="https://publish-01.obsidian.md/access/c6e84d0dba4a473d9f7c63884517ea6d/images/Sustainability-Economics.png" className="h-10 w-auto shadow-lg" alt="Award" />
                 </div>
              </div>
           </div>

           {/* Performance & Fitness Matrix */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Performance */}
              <Card title="Performance Analytics" variant="glass">
                 <div className="flex items-center justify-between">
                    <CircularMetric value={3.2} max={4.0} label="GPA" sublabel="Rubric Median" color="text-[#3684ca]" />
                    
                    <div className="flex-1 pl-8 space-y-4">
                       <div>
                          <div className="flex justify-between text-[10px] uppercase font-bold text-[#96a3ae] mb-1">
                             <span>Cyber Badge</span>
                             <span className="text-[#3684ca]">80%</span>
                          </div>
                          <div className="h-1 bg-[#252525] rounded-full overflow-hidden">
                             <div className="h-full bg-[#3684ca] w-[80%] shadow-[0_0_10px_#3684ca]"></div>
                          </div>
                       </div>
                       <div>
                          <div className="flex justify-between text-[10px] uppercase font-bold text-[#96a3ae] mb-1">
                             <span>Service Hrs</span>
                             <span className="text-emerald-500">12 / 20</span>
                          </div>
                          <div className="h-1 bg-[#252525] rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-500 w-[60%] shadow-[0_0_10px_#10b981]"></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </Card>

              {/* Fitness */}
              <Card title="LOE-F: Readiness" variant="glass">
                 <div className="flex items-center justify-around">
                    <CircularMetric value={92} max={100} label="QPT Score" sublabel="Physical Test" color="text-emerald-500" />
                    
                    <div className="space-y-4">
                       <div className="bg-[#252525] border border-[#5f686e]/30 px-4 py-2 rounded-sm text-center">
                          <div className="text-[9px] text-[#96a3ae] uppercase">Presence Board</div>
                          <div className="text-lg font-bold text-amber-500 tracking-wider">HOLD</div>
                          <div className="text-[8px] text-[#5f686e] font-mono">Uniform Def.</div>
                       </div>
                       <div className="flex items-center justify-between gap-3 text-[10px]">
                          <span className="text-[#96a3ae] uppercase font-bold">Leader PT</span>
                          <span className="px-2 py-0.5 bg-[#3684ca]/10 text-[#3684ca] border border-[#3684ca]/30 rounded">1 / 1 DONE</span>
                       </div>
                    </div>
                 </div>
              </Card>
           </div>

           {/* Progression Bars (High Tech) */}
           <div className="bg-[#191818] border border-[#5f686e]/30 p-5 rounded-sm">
              <h3 className="text-xs font-bold text-[#96a3ae] uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Cpu size={14} className="text-[#3684ca]" /> LOE Minima Tracking
              </h3>
              <div className="grid grid-cols-5 gap-2">
                 {[
                    { id: 'A', label: 'Aerospace', val: 2, max: 4, col: 'bg-blue-500' },
                    { id: 'B', label: 'STEM Labs', val: 4, max: 12, col: 'bg-emerald-500' },
                    { id: 'C', label: 'Leadership', val: 3, max: 6, col: 'bg-amber-500' },
                    { id: 'F', label: 'Fitness', val: 2, max: 2, col: 'bg-red-500' },
                    { id: 'G', label: 'Citizenship', val: 1, max: 2, col: 'bg-purple-500' }
                 ].map((loe, i) => (
                    <div key={i} className="bg-[#252525]/50 border border-[#5f686e]/20 p-2 rounded flex flex-col items-center">
                       <div className="text-xs font-bold text-white font-mono mb-1">LOE-{loe.id}</div>
                       <div className="flex gap-0.5 h-8 items-end mb-1">
                          {Array.from({ length: 5 }).map((_, idx) => {
                             const pct = (loe.val / loe.max) * 5;
                             const active = idx < pct;
                             return (
                                <div key={idx} className={`w-2 rounded-sm transition-all ${active ? loe.col : 'bg-[#252525]'}`} style={{ height: active ? `${(idx + 1) * 20}%` : '20%' }}></div>
                             )
                          })}
                       </div>
                       <div className="text-[9px] font-mono text-[#5f686e]">{loe.val}/{loe.max}</div>
                    </div>
                 ))}
              </div>
           </div>

        </div>
      </div>

      {/* BOTTOM: Evidence Portfolio Terminal */}
      <Card title="Evidence Portfolio Log" variant="glass">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-separate border-spacing-y-2">
               <thead>
                  <tr className="text-[#5f686e] font-mono text-[10px] uppercase tracking-wider">
                     <th className="pl-4">Artifact ID</th>
                     <th>Integrity Check (CCR 20-4)</th>
                     <th>Gates</th>
                     <th className="text-right pr-4">Status</th>
                  </tr>
               </thead>
               <tbody>
                  {[
                     { id: 'LOE-B: Rocketry Lab', date: 'Oct 15', pii: true, ai: 'N/A', status: 'APPROVED', score: '3/4' },
                     { id: 'LOE-C: Squadron Drill', date: 'Oct 05', pii: true, ai: 'MISSING', status: 'RETURNED', score: '1/4' },
                     { id: 'LOE-G: Ethics Essay', date: 'Draft', pii: false, ai: 'PENDING', status: 'DRAFT', score: '-' },
                  ].map((row, i) => (
                     <tr key={i} className="group bg-[#252525]/30 hover:bg-[#252525] transition-all">
                        <td className="py-3 pl-4 rounded-l-sm border-l-2 border-transparent hover:border-[#3684ca]">
                           <div className="flex items-center gap-3">
                              <Terminal size={14} className="text-[#5f686e] group-hover:text-[#3684ca]" />
                              <div>
                                 <div className="font-bold text-[#c7d7e2] text-xs group-hover:text-white">{row.id}</div>
                                 <div className="text-[9px] font-mono text-[#5f686e]">{row.date}</div>
                              </div>
                           </div>
                        </td>
                        <td className="py-3">
                           {row.pii ? (
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                                 <Lock size={10} /> PII Sanitized
                              </div>
                           ) : (
                              <button className="px-2 py-1 bg-[#3684ca]/10 text-[#3684ca] border border-[#3684ca]/30 rounded text-[9px] font-bold uppercase hover:bg-[#3684ca] hover:text-white transition-colors">
                                 Initiate Attestation
                              </button>
                           )}
                        </td>
                        <td className="py-3">
                           <div className="flex gap-2">
                              {row.ai === 'MISSING' ? (
                                 <span className="text-[9px] font-bold text-red-500 border border-red-500/30 px-1 rounded">AI DISCLOSURE REQ</span>
                              ) : (
                                 <span className="text-[9px] font-mono text-[#5f686e] opacity-50">GATES: OK</span>
                              )}
                           </div>
                        </td>
                        <td className="py-3 pr-4 rounded-r-sm text-right">
                           <div className="flex items-center justify-end gap-3">
                              <span className="font-mono font-bold text-white text-sm">{row.score}</span>
                              <Badge status={row.status === 'APPROVED' ? 'success' : row.status === 'RETURNED' ? 'danger' : 'neutral'}>
                                 {row.status}
                              </Badge>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>

    </div>
  );
};

export default CadetView;
