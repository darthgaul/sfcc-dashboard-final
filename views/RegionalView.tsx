
import React from 'react';
import { Map, ShieldAlert, FileSearch, Scale, AlertTriangle, CheckCircle2, XCircle, FileWarning, Lock, Search } from 'lucide-react';
import { MetricCard, Card, Badge, SectionHeader, SecurityBadges } from '../components/Shared';

// --- Regulatory Badge Component ---
const RegBadge: React.FC<{ label: string; code: string; status: 'pass' | 'warn' | 'fail'; value?: string }> = ({ label, code, status, value }) => {
  const colors = {
    pass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500',
    warn: 'bg-amber-500/10 border-amber-500/30 text-amber-500',
    fail: 'bg-red-500/10 border-red-500/30 text-red-500',
  };

  return (
    <div className={`flex flex-col border rounded px-2 py-1.5 min-w-[100px] ${colors[status]}`}>
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
        {value && <span className="text-[10px] font-mono font-bold ml-2">{value}</span>}
      </div>
      <span className="text-[8px] font-mono opacity-70 mt-0.5">{code}</span>
    </div>
  );
};

// --- Mock Regulatory Data ---
const OVERSIGHT_DATA = [
  { 
    unit: 'SQ-101', 
    name: 'Alpha Squadron',
    complianceScore: 94,
    // Ops
    distAudit: 'PASS',
    loeIndex: 'A:4 | B:2 | C:3',
    // Risk
    overdueRemediation: 0,
    recoveryStatus: 'CONFIRMED',
    // Personnel
    ypCompliance: '100%',
    successionPlan: 'APPROVED',
    // Data/Audit
    lastAudit: '2023-10-01',
    findingsClosure: 'CLOSED',
    piiAttestation: '100%',
    checklistRate: '98%'
  },
  { 
    unit: 'SQ-102', 
    name: 'Bravo Squadron',
    complianceScore: 75,
    // Ops
    distAudit: 'WARN', // CCR 20-2
    loeIndex: 'A:1 | B:0 | C:2',
    // Risk
    overdueRemediation: 3, // 7-Day Deadline
    recoveryStatus: 'WAIVER_REQ', // CCT 20-10T
    // Personnel
    ypCompliance: '85%',
    successionPlan: 'MISSING', // CCT 20-1-C
    // Data/Audit
    lastAudit: '2023-09-15',
    findingsClosure: 'OPEN (2)',
    piiAttestation: 'PENDING', // CCC 20-4-2
    checklistRate: '72%'
  },
  { 
    unit: 'SQ-205', 
    name: 'Charlie Squadron',
    complianceScore: 89,
    // Ops
    distAudit: 'PASS',
    loeIndex: 'A:3 | B:3 | C:3',
    // Risk
    overdueRemediation: 0,
    recoveryStatus: 'CONFIRMED',
    // Personnel
    ypCompliance: '95%',
    successionPlan: 'REVIEWING',
    // Data/Audit
    lastAudit: '2023-10-20',
    findingsClosure: 'CLOSED',
    piiAttestation: '100%',
    checklistRate: '92%'
  },
  { 
    unit: 'SQ-304', 
    name: 'Delta Squadron',
    complianceScore: 92,
    // Ops
    distAudit: 'PASS',
    loeIndex: 'A:5 | B:4 | C:4',
    // Risk
    overdueRemediation: 1,
    recoveryStatus: 'CONFIRMED',
    // Personnel
    ypCompliance: '100%',
    successionPlan: 'APPROVED',
    // Data/Audit
    lastAudit: '2023-08-30',
    findingsClosure: 'CLOSED',
    piiAttestation: '100%',
    checklistRate: '95%'
  },
];

const RegionalView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SectionHeader title="Regional Oversight & Compliance" subtitle="Regulatory Enforcement • Audit View v3.0" />
      <SecurityBadges />

      {/* Oversight Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={ShieldAlert} label="Critical Risks" value="2" subtext="Open Findings > 30 Days" alert />
        <MetricCard icon={FileSearch} label="Audit Completion" value="75%" subtext="Q4 Cycle Progress" />
        <MetricCard icon={Scale} label="Avg YP Compliance" value="95%" subtext="Youth Protection (CCR 20-2)" />
        <MetricCard icon={FileWarning} label="Overdue Remediation" value="4" subtext="Corrective Actions > 7 Days" alert />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Compliance Table */}
        <Card title="Squadron Regulatory Performance Overview" className="xl:col-span-3">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-sfcc-border text-sfcc-secondary font-mono text-[10px] uppercase tracking-wider">
                  <th className="pb-3 pl-2">Unit Identity</th>
                  <th className="pb-3">Operational Compliance (CCR 20-2)</th>
                  <th className="pb-3">Risk & Recovery (CCT 20-10T)</th>
                  <th className="pb-3">Personnel & Safety (CCT 20-1-C)</th>
                  <th className="pb-3 text-right pr-2">Audit & Data Integrity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sfcc-border">
                {OVERSIGHT_DATA.map((row, i) => (
                  <tr key={i} className="hover:bg-sfcc-dark/50 group">
                    {/* Column 1: Unit ID */}
                    <td className="py-4 pl-2 align-top">
                      <div className="font-bold text-sfcc-primary text-sm">{row.unit}</div>
                      <div className="text-xs text-sfcc-secondary mb-2">{row.name}</div>
                      <Badge status={row.complianceScore > 90 ? 'success' : row.complianceScore < 80 ? 'danger' : 'warning'}>
                        Score: {row.complianceScore}%
                      </Badge>
                    </td>

                    {/* Column 2: Operational Compliance */}
                    <td className="py-4 align-top space-y-2 pr-4">
                      <RegBadge 
                        label="Dist. Audit" 
                        code="CCR 20-2" 
                        status={row.distAudit === 'PASS' ? 'pass' : 'warn'} 
                      />
                      <div className="border border-sfcc-border rounded p-1.5 bg-sfcc-dark/30">
                        <div className="flex justify-between items-center text-[9px] text-sfcc-secondary font-mono mb-1 uppercase tracking-wider">
                          <span>LOE Minima</span>
                          <span>CCC 20-2-1</span>
                        </div>
                        <div className="text-[10px] font-mono text-sfcc-primary">{row.loeIndex}</div>
                      </div>
                    </td>

                    {/* Column 3: Risk & Recovery */}
                    <td className="py-4 align-top space-y-2 pr-4">
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
                    <td className="py-4 align-top space-y-2 pr-4">
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
                    <td className="py-4 align-top space-y-2 text-right">
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-mono text-sfcc-secondary">Last Audit: {row.lastAudit}</span>
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
        </Card>

        {/* Sidebar: Regional Actions & Calendar */}
        <div className="space-y-6">
           <Card title="Regional Schedule">
            <div className="space-y-6">
              {[
                { type: 'MTE', title: 'Regional FTX (MTE)', date: '2023-11-10', code: 'CCT 20-10' },
                { type: 'AUDIT', title: 'SQ-102 Inspection', date: '2023-11-15', code: 'CCR 20-2' },
                { type: 'DEADLINE', title: 'Q4 Report Closeout', date: '2023-12-01', code: 'FIN 10-1' },
              ].map((event, i) => (
                <div key={i} className="relative pl-4 border-l border-sfcc-border">
                  <div className={`absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full border-2 border-sfcc-panel ${event.type === 'MTE' ? 'bg-sfcc-accent' : event.type === 'AUDIT' ? 'bg-sfcc-warning' : 'bg-sfcc-success'}`}></div>
                  <div className="flex justify-between items-center mb-1">
                     <span className="text-[10px] font-mono text-sfcc-secondary uppercase tracking-widest">{event.type}</span>
                     <span className="text-[9px] font-mono text-sfcc-secondary border border-sfcc-border px-1 rounded">{event.code}</span>
                  </div>
                  <div className="text-sm font-bold text-sfcc-primary">{event.title}</div>
                  <div className="text-xs font-mono text-sfcc-secondary mt-1">{event.date}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Oversight Actions">
             <button className="w-full flex items-center justify-between p-3 mb-3 bg-sfcc-dark border border-sfcc-border hover:border-sfcc-accent rounded transition-all group">
                <span className="text-xs font-bold text-sfcc-primary">Initiate Spot Check</span>
                <Search size={14} className="text-sfcc-secondary group-hover:text-sfcc-accent" />
             </button>
             <button className="w-full flex items-center justify-between p-3 bg-sfcc-dark border border-sfcc-border hover:border-sfcc-accent rounded transition-all group">
                <span className="text-xs font-bold text-sfcc-primary">Review Open Waivers</span>
                <FileSearch size={14} className="text-sfcc-secondary group-hover:text-sfcc-accent" />
             </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegionalView;
