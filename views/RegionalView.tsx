
import React from 'react';
import { Map, ShieldAlert, FileSearch, Scale, AlertTriangle, CheckCircle2, XCircle, FileWarning, Lock, Search, Network, Globe, Radio, BarChart3, Activity } from 'lucide-react';
import { MetricCard, Card, Badge, SectionHeader, SecurityBadges } from '../components/Shared';

// --- Regulatory Badge Component (Futuristic) ---
const RegBadge: React.FC<{ label: string; code: string; status: 'pass' | 'warn' | 'fail'; value?: string }> = ({ label, code, status, value }) => {
  const colors = {
    pass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.1)]',
    warn: 'bg-amber-500/10 border-amber-500/30 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.1)]',
    fail: 'bg-red-500/10 border-red-500/30 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]',
  };

  return (
    <div className={`flex flex-col border rounded-sm px-2 py-1.5 min-w-[90px] backdrop-blur-sm transition-all hover:scale-105 ${colors[status]}`}>
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-bold uppercase tracking-wider opacity-90">{label}</span>
      </div>
      <div className="flex justify-between items-end mt-1">
         <span className="text-[8px] font-mono opacity-60">{code}</span>
         {value && <span className="text-[10px] font-mono font-bold">{value}</span>}
      </div>
    </div>
  );
};

// --- Mock Regulatory Data ---
const OVERSIGHT_DATA = [
  { 
    unit: 'SQ-101', 
    name: 'Alpha Squadron',
    complianceScore: 94,
    distAudit: 'PASS',
    loeIndex: 'A:4 | B:2 | C:3',
    overdueRemediation: 0,
    recoveryStatus: 'CONFIRMED',
    ypCompliance: '100%',
    successionPlan: 'APPROVED',
    lastAudit: '2023-10-01',
    findingsClosure: 'CLOSED',
    piiAttestation: '100%',
    checklistRate: '98%'
  },
  { 
    unit: 'SQ-102', 
    name: 'Bravo Squadron',
    complianceScore: 75,
    distAudit: 'WARN', 
    loeIndex: 'A:1 | B:0 | C:2',
    overdueRemediation: 3, 
    recoveryStatus: 'WAIVER_REQ', 
    ypCompliance: '85%',
    successionPlan: 'MISSING', 
    lastAudit: '2023-09-15',
    findingsClosure: 'OPEN (2)',
    piiAttestation: 'PENDING', 
    checklistRate: '72%'
  },
  { 
    unit: 'SQ-205', 
    name: 'Charlie Squadron',
    complianceScore: 89,
    distAudit: 'PASS',
    loeIndex: 'A:3 | B:3 | C:3',
    overdueRemediation: 0,
    recoveryStatus: 'CONFIRMED',
    ypCompliance: '95%',
    successionPlan: 'REVIEWING',
    lastAudit: '2023-10-20',
    findingsClosure: 'CLOSED',
    piiAttestation: '100%',
    checklistRate: '92%'
  },
  { 
    unit: 'SQ-304', 
    name: 'Delta Squadron',
    complianceScore: 92,
    distAudit: 'PASS',
    loeIndex: 'A:5 | B:4 | C:4',
    overdueRemediation: 1,
    recoveryStatus: 'CONFIRMED',
    ypCompliance: '100%',
    successionPlan: 'APPROVED',
    lastAudit: '2023-08-30',
    findingsClosure: 'CLOSED',
    piiAttestation: '100%',
    checklistRate: '95%'
  },
];

const RegionalView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 font-sans">
      <SectionHeader title="Regional Command" subtitle="Sector Oversight • Audit Matrix v3.0" />
      <SecurityBadges />

      {/* --- Top Level Oversight Indicators (System Nodes) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
            { 
               icon: ShieldAlert, color: 'text-red-500', 
               label: 'Critical Risks', value: '2 ACTIVE', subtext: 'Open Findings > 30 Days',
               glow: 'shadow-[0_0_20px_rgba(239,68,68,0.2)] bg-red-900/10 border-red-500/30'
            },
            { 
               icon: FileSearch, color: 'text-[#3684ca]', 
               label: 'Audit Cycle', value: '75%', subtext: 'Q4 Completion Rate',
               glow: 'shadow-[0_0_15px_rgba(54,132,202,0.2)] bg-[#3684ca]/10 border-[#3684ca]/30'
            },
            { 
               icon: Scale, color: 'text-emerald-500', 
               label: 'YP Compliance', value: '95%', subtext: 'Youth Protection (CCR 20-2)',
               glow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)] bg-emerald-500/10 border-emerald-500/30'
            },
            { 
               icon: FileWarning, color: 'text-amber-500', 
               label: 'Remediation', value: '4 PENDING', subtext: 'Actions > 7 Days Old',
               glow: 'shadow-[0_0_15px_rgba(245,158,11,0.2)] bg-amber-500/10 border-amber-500/30'
            }
         ].map((card, i) => (
            <div key={i} className={`p-5 rounded-sm relative overflow-hidden group border transition-all ${card.glow}`}>
               {/* Scan Line */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30 animate-scan"></div>
               
               <div className="flex justify-between items-start mb-3 relative z-10">
                  <div className={`p-2 rounded bg-[#191818]/50 ${card.color}`}>
                     <card.icon size={24} />
                  </div>
                  <Activity size={16} className={`${card.color} opacity-50 animate-pulse`} />
               </div>
               
               <div className="relative z-10">
                  <div className={`text-2xl font-bold font-mono ${card.color}`}>{card.value}</div>
                  <div className="text-xs font-bold text-[#c7d7e2] uppercase tracking-wider mt-1">{card.label}</div>
                  <div className="text-[9px] font-mono text-[#96a3ae] mt-1">{card.subtext}</div>
               </div>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Main Holographic Compliance Grid (Span 9) */}
        <div className="xl:col-span-9 bg-[#191818]/80 backdrop-blur-md border border-[#3684ca]/30 rounded-sm relative overflow-hidden flex flex-col">
           {/* Tech Header */}
           <div className="p-5 border-b border-[#5f686e]/20 flex justify-between items-center bg-[#252525]/30">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                 <Network size={16} className="text-[#3684ca]" /> Squadron Regulatory Matrix
              </h3>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-mono text-[#3684ca] uppercase tracking-wider">Live Feed</span>
              </div>
           </div>

           <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-separate border-spacing-y-1 px-2 pb-2">
              <thead>
                <tr className="text-[#5f686e] font-mono text-[10px] uppercase tracking-wider">
                  <th className="pb-2 pl-4">Unit Identity</th>
                  <th className="pb-2">Ops Compliance (CCR 20-2)</th>
                  <th className="pb-2">Risk & Recovery (CCT 20-10T)</th>
                  <th className="pb-2">Personnel (CCT 20-1-C)</th>
                  <th className="pb-2 text-right pr-4">Audit Integrity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#5f686e]/10">
                {OVERSIGHT_DATA.map((row, i) => (
                  <tr key={i} className="hover:bg-[#252525] group transition-all">
                    {/* Column 1: Unit ID */}
                    <td className="py-4 pl-4 align-top border-l-2 border-transparent hover:border-[#3684ca] transition-all">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded bg-[#3684ca]/10 border border-[#3684ca]/30 flex items-center justify-center text-[#3684ca] font-bold text-xs">
                            {row.unit.split('-')[1]}
                         </div>
                         <div>
                            <div className="font-bold text-white text-xs uppercase tracking-wide group-hover:text-[#3684ca] transition-colors">{row.name}</div>
                            <div className="text-[10px] font-mono text-[#5f686e]">{row.unit}</div>
                         </div>
                      </div>
                      <div className="mt-2">
                         <Badge status={row.complianceScore > 90 ? 'success' : row.complianceScore < 80 ? 'danger' : 'warning'}>
                           Score: {row.complianceScore}%
                         </Badge>
                      </div>
                    </td>

                    {/* Column 2: Operational Compliance */}
                    <td className="py-4 align-top space-y-2 pr-2">
                      <RegBadge 
                        label="Dist. Audit" 
                        code="CCR 20-2" 
                        status={row.distAudit === 'PASS' ? 'pass' : 'warn'} 
                      />
                      <div className="border border-[#5f686e]/30 rounded-sm p-1.5 bg-[#191818]/50">
                        <div className="flex justify-between items-center text-[8px] text-[#5f686e] font-mono mb-1 uppercase tracking-wider">
                          <span>LOE Minima</span>
                          <span>CCC 20-2-1</span>
                        </div>
                        <div className="text-[9px] font-mono text-[#c7d7e2]">{row.loeIndex}</div>
                      </div>
                    </td>

                    {/* Column 3: Risk & Recovery */}
                    <td className="py-4 align-top space-y-2 pr-2">
                      <RegBadge 
                        label="Remediation" 
                        code="7-Day Rule" 
                        value={row.overdueRemediation > 0 ? `${row.overdueRemediation} Overdue` : 'Clear'}
                        status={row.overdueRemediation > 0 ? 'fail' : 'pass'} 
                      />
                      <RegBadge 
                        label="Recovery" 
                        code="CCT 20-10T" 
                        value={row.recoveryStatus === 'CONFIRMED' ? 'OK' : 'WAIVER'}
                        status={row.recoveryStatus === 'CONFIRMED' ? 'pass' : 'warn'} 
                      />
                    </td>

                    {/* Column 4: Personnel */}
                    <td className="py-4 align-top space-y-2 pr-2">
                      <RegBadge 
                        label="YP Compliance" 
                        code="Mandatory" 
                        value={row.ypCompliance}
                        status={parseInt(row.ypCompliance) === 100 ? 'pass' : parseInt(row.ypCompliance) > 90 ? 'warn' : 'fail'} 
                      />
                      <RegBadge 
                        label="Succession" 
                        code="CCT 20-1-C" 
                        value={row.successionPlan}
                        status={row.successionPlan === 'APPROVED' ? 'pass' : row.successionPlan === 'MISSING' ? 'fail' : 'warn'} 
                      />
                    </td>

                    {/* Column 5: Audit & Data */}
                    <td className="py-4 align-top text-right pr-4">
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 mb-1">
                           <span className="text-[9px] font-mono text-[#5f686e] uppercase">Last Audit: {row.lastAudit}</span>
                           <Badge status={row.findingsClosure.includes('OPEN') ? 'danger' : 'success'}>{row.findingsClosure}</Badge>
                        </div>
                        <div className="flex gap-2">
                           <RegBadge 
                              label="PII Sanitized" 
                              code="CCC 20-4-2" 
                              status={row.piiAttestation === '100%' ? 'pass' : 'fail'} 
                           />
                           <RegBadge 
                              label="Checklists" 
                              code="CCC 20-8-1" 
                              value={row.checklistRate}
                              status={parseInt(row.checklistRate) > 90 ? 'pass' : 'warn'} 
                           />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           </div>
        </div>

        {/* Sidebar: Regional Map & Actions (Span 3) */}
        <div className="xl:col-span-3 space-y-6">
           
           {/* Theater Map Concept */}
           <div className="bg-[#191818] border border-[#5f686e]/30 rounded-sm p-1 relative overflow-hidden">
              <div className="bg-[#252525]/20 h-48 w-full relative flex items-center justify-center border border-[#5f686e]/10">
                 {/* Map Grid Background */}
                 <div className="absolute inset-0 opacity-10" 
                      style={{ backgroundImage: 'linear-gradient(#3684ca 1px, transparent 1px), linear-gradient(90deg, #3684ca 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                 </div>
                 {/* Map Pulse */}
                 <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-[#3684ca]/20 rounded-full blur-xl animate-pulse"></div>
                 <Globe className="text-[#3684ca]/50 relative z-10" size={64} />
                 
                 <div className="absolute bottom-2 left-2 text-[8px] font-mono text-[#3684ca] uppercase">Sector: NE-01 Active</div>
              </div>
              <div className="p-3 border-t border-[#5f686e]/20 bg-[#191818]">
                 <div className="flex justify-between items-center text-[10px] font-bold text-[#96a3ae] uppercase">
                    <span>Units Online</span>
                    <span className="text-emerald-500">4 / 4</span>
                 </div>
              </div>
           </div>

           {/* Schedule */}
           <Card title="Regional Schedule">
            <div className="space-y-4">
              {[
                { type: 'MTE', title: 'Regional FTX', date: 'Nov 10', code: 'CCT 20-10', color: 'bg-[#3684ca]' },
                { type: 'AUDIT', title: 'SQ-102 Inspection', date: 'Nov 15', code: 'CCR 20-2', color: 'bg-amber-500' },
                { type: 'DEADLINE', title: 'Q4 Report Closeout', date: 'Dec 01', code: 'FIN 10-1', color: 'bg-emerald-500' },
              ].map((event, i) => (
                <div key={i} className="relative pl-4 border-l border-[#5f686e]/30 group">
                  <div className={`absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full border-2 border-[#191818] ${event.color} group-hover:scale-125 transition-transform`}></div>
                  <div className="flex justify-between items-center mb-1">
                     <span className="text-[9px] font-mono text-[#5f686e] uppercase tracking-widest">{event.type}</span>
                     <span className="text-[8px] font-mono text-[#3684ca] border border-[#3684ca]/30 px-1 rounded bg-[#3684ca]/10">{event.code}</span>
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-[#3684ca] transition-colors">{event.title}</div>
                  <div className="text-[10px] font-mono text-[#96a3ae] mt-0.5">{event.date}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card title="Command Actions">
             <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 bg-[#252525]/30 border border-[#5f686e]/30 hover:border-[#3684ca] hover:bg-[#3684ca]/10 rounded-sm transition-all group">
                    <span className="text-[10px] font-bold uppercase text-[#c7d7e2] tracking-wider">Initiate Spot Check</span>
                    <Search size={14} className="text-[#5f686e] group-hover:text-[#3684ca]" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-[#252525]/30 border border-[#5f686e]/30 hover:border-[#3684ca] hover:bg-[#3684ca]/10 rounded-sm transition-all group">
                    <span className="text-[10px] font-bold uppercase text-[#c7d7e2] tracking-wider">Review Open Waivers</span>
                    <FileSearch size={14} className="text-[#5f686e] group-hover:text-[#3684ca]" />
                </button>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegionalView;
