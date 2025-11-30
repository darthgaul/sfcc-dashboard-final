import React from 'react';
import { Users, FilePlus, AlertOctagon, Bookmark, RefreshCw, Star, ClipboardCheck } from 'lucide-react';
import { MetricCard, Card, SectionHeader, SecurityBadges } from '../components/Shared';

const SquadronView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SectionHeader title="Squadron Dashboard" subtitle="Secure Connection • Neutral Portfolio v2.5" />
      <SecurityBadges />

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Users} label="Total Cadets" value="42" subtext="Active in SQ-101" />
        <MetricCard icon={FilePlus} label="New Submissions" value="2" subtext="Awaiting Review" />
        <MetricCard icon={AlertOctagon} label="Remediation Items" value="1" subtext="Needs attention" alert />
        <MetricCard icon={Bookmark} label="Board Ready" value="1/2" subtext="Eligible Promotables" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Review Queue */}
        <Card title="Artifact Review Queue" className="lg:col-span-2">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-sfcc-border text-zinc-500 font-mono text-xs uppercase tracking-wider">
                <th className="pb-3 pl-2">Cadet</th>
                <th className="pb-3">Artifact</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right pr-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sfcc-border">
              {[
                { name: 'Cdt. E. Ender', art: 'Squadron Drill Cmd', date: '10-05', status: 'RETURNED' },
                { name: 'Cdt. J. Doe', art: '1 Mile Run Log', date: '10-10', status: 'SUBMITTED' },
                { name: 'Cdt. A. Smith', art: 'Cyber Security Basics', date: '10-12', status: 'SUBMITTED' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-zinc-800/50">
                  <td className="py-3 pl-2 font-bold text-zinc-200">{row.name}</td>
                  <td className="py-3 text-zinc-400">{row.art}</td>
                  <td className="py-3 font-mono text-zinc-500">{row.date}</td>
                  <td className="py-3 text-right pr-2">
                    <span className={`text-[10px] font-bold border px-1 py-0.5 uppercase tracking-wider ${
                      row.status === 'RETURNED' 
                      ? 'text-red-400 border-red-900 bg-red-900/10' 
                      : 'text-amber-400 border-amber-900 bg-amber-900/10'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Quick Actions */}
        <Card title="Quick Actions">
          <div className="space-y-3">
             <button className="w-full flex items-center gap-3 p-3 rounded bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition-all group">
                <RefreshCw size={18} className="text-zinc-400 group-hover:text-white" />
                <span className="text-sm font-medium">Update Roster Status</span>
             </button>
             <button className="w-full flex items-center gap-3 p-3 rounded bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition-all group">
                <Star size={18} className="text-zinc-400 group-hover:text-white" />
                <span className="text-sm font-medium">Recommend Promotion Board</span>
             </button>
             <button className="w-full flex items-center gap-3 p-3 rounded bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition-all group">
                <ClipboardCheck size={18} className="text-zinc-400 group-hover:text-white" />
                <span className="text-sm font-medium">Log Event Attendance</span>
             </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SquadronView;