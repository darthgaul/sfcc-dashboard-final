import React from 'react';
import { Map, ShieldCheck, FileClock, CalendarDays } from 'lucide-react';
import { MetricCard, Card, Badge, SectionHeader, SecurityStatusCard } from '../components/Shared';

const RegionalView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SectionHeader title="Regional Dashboard" subtitle="Secure Connection • Neutral Portfolio v2.5" />

      {/* Security Status Section */}
      <SecurityStatusCard />

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Map} label="Total Squadrons" value="4" subtext="North-East Region" />
        <MetricCard icon={ShieldCheck} label="Regional Compliance" value="88%" subtext="Avg Approval Rate" />
        <MetricCard icon={FileClock} label="Pending Reviews" value="3" subtext="Across all units" />
        <MetricCard icon={CalendarDays} label="Next Major Event" value="11-10" subtext="Regional FTX (MTE)" alert />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Overview */}
        <Card title="Squadron Performance Overview" className="lg:col-span-2">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-sfcc-border text-zinc-500 font-mono text-xs uppercase tracking-wider">
                <th className="pb-3 pl-2">Unit</th>
                <th className="pb-3">Compliance %</th>
                <th className="pb-3">Artifacts</th>
                <th className="pb-3 text-right pr-2">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sfcc-border">
              {[
                { unit: 'SQ-101', comp: '94%', art: 4, risk: 'LOW' },
                { unit: 'SQ-102', comp: '75%', art: 2, risk: 'HIGH' },
                { unit: 'SQ-205', comp: '89%', art: 2, risk: 'LOW' },
                { unit: 'SQ-304', comp: '92%', art: 4, risk: 'LOW' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-zinc-800/50">
                  <td className="py-3 pl-2 font-mono text-zinc-300">{row.unit}</td>
                  <td className={`py-3 font-mono ${parseInt(row.comp) > 90 ? 'text-sfcc-success' : parseInt(row.comp) < 80 ? 'text-sfcc-danger' : 'text-sfcc-warning'}`}>{row.comp}</td>
                  <td className="py-3 text-zinc-400 font-mono">{row.art}</td>
                  <td className="py-3 text-right pr-2">
                    <Badge status={row.risk === 'LOW' ? 'success' : 'danger'}>{row.risk}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Schedule */}
        <Card title="Regional Schedule">
          <div className="space-y-6">
            {[
              { type: 'MTE', title: 'Regional FTX (MTE)', date: '2023-11-10' },
              { type: 'REGULAR', title: 'Squadron Meeting', date: '2023-11-15' },
              { type: 'MTE', title: 'Annual Inspection', date: '2023-12-01' },
            ].map((event, i) => (
              <div key={i} className="relative pl-4 border-l border-zinc-700">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-zinc-600 border-2 border-sfcc-panel"></div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{event.type}</div>
                <div className="text-sm font-bold text-zinc-200">{event.title}</div>
                <div className="text-xs font-mono text-zinc-500 mt-1">{event.date}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegionalView;