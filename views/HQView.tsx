import React from 'react';
import { Users, Shield, AlertTriangle, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MetricCard, Card, SectionHeader, SecurityStatusCard } from '../components/Shared';

const complianceData = [
  { name: 'NORTH', value: 92 },
  { name: 'SOUTH', value: 85 },
  { name: 'CENTRAL', value: 65 },
  { name: 'WEST', value: 96 },
];

const HQView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SectionHeader 
        title="HQ Dashboard" 
        subtitle="Secure Connection • Neutral Portfolio v2.5" 
      />

      {/* Security Status Section */}
      <SecurityStatusCard />

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Users} label="Total Cadets" value="1,240" subtext="+12% YoY Growth" />
        <MetricCard icon={Shield} label="Compliance Rate" value="94%" subtext="Q3 Reports Submitted" />
        <MetricCard icon={AlertTriangle} label="Remediation Rate" value="40%" subtext="Artifacts Scoring < 2" alert />
        <MetricCard icon={FileText} label="Waiver Logs" value="3" subtext="Pending Approval" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap Chart */}
        <Card title="National Compliance Heatmap" className="lg:col-span-1 min-h-[300px]">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complianceData}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'monospace' }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                />
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {complianceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value < 70 ? '#52525b' : '#9ca3af'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between px-2 mt-2">
             <div className="text-xs text-zinc-500 font-mono">AVG: 84%</div>
             <div className="text-xs text-zinc-500 font-mono">TARGET: 90%</div>
          </div>
        </Card>

        {/* Risk Log Table */}
        <Card title="Critical Risk / Waiver Log" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-sfcc-border text-zinc-500 font-mono text-xs uppercase tracking-wider">
                  <th className="pb-3 pl-2">Unit</th>
                  <th className="pb-3">Issue</th>
                  <th className="pb-3 text-right pr-2">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sfcc-border">
                {[
                  { unit: 'SQ-404', issue: 'Missing Youth Protection Certs', risk: 'HIGH' },
                  { unit: 'SQ-102', issue: 'Safety Ratio Waiver Request', risk: 'MED' },
                  { unit: 'SQ-305', issue: 'Equipment Audit Failure', risk: 'HIGH' },
                  { unit: 'SQ-201', issue: 'Delayed Promotion Board', risk: 'LOW' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="py-3 pl-2 font-mono text-zinc-300">{row.unit}</td>
                    <td className="py-3 text-zinc-400">{row.issue}</td>
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
      </div>
    </div>
  );
};

export default HQView;