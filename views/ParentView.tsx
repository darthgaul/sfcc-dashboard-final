import React from 'react';
import { User, CheckSquare, AlertCircle, ChevronRight } from 'lucide-react';
import { MetricCard, Card, SectionHeader, SecurityStatusCard } from '../components/Shared';

const ParentView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SectionHeader title="Parent Dashboard" subtitle="Secure Connection • Neutral Portfolio v2.5" />

      {/* Security Status Section */}
      <SecurityStatusCard />

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard icon={User} label="Cadet Rank" value="C/Sgt" subtext="Cadet Sergeant" />
        <MetricCard icon={CheckSquare} label="Approved Artifacts" value="2" subtext="Evidence Items" />
        <MetricCard icon={AlertCircle} label="Pending Action" value="1" subtext="Items needing attention" alert />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Log */}
        <Card title="Cdt. E. Ender's Progress Log" className="lg:col-span-2">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-sfcc-border text-zinc-500 font-mono text-xs uppercase tracking-wider">
                <th className="pb-3 pl-2">LOE</th>
                <th className="pb-3">Title</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 text-right pr-2">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sfcc-border">
              {[
                { loe: 'STEM', title: 'Rocketry Lab Report', status: 'APPROVED', score: 3 },
                { loe: 'LEADERSHIP', title: 'Squadron Drill Cmd', status: 'RETURNED', score: 1 },
                { loe: 'SERVICE', title: 'Community Cleanup', status: 'APPROVED', score: 4 },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-zinc-800/50">
                  <td className="py-3 pl-2">
                      <span className="text-[10px] border border-zinc-700 bg-zinc-800 text-zinc-400 px-1 py-0.5">{row.loe}</span>
                  </td>
                  <td className="py-3 text-zinc-300">{row.title}</td>
                  <td className="py-3 text-center">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 border ${
                        row.status === 'APPROVED' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10' : 'text-red-500 border-red-500/20 bg-red-500/10'
                    }`}>
                        {row.status}
                    </span>
                  </td>
                  <td className="py-3 text-right pr-2 font-mono text-zinc-400">{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Contact Info */}
        <Card title="Squadron Contact">
          <div className="space-y-4">
            <div>
                <p className="text-[10px] uppercase text-zinc-500 font-bold mb-1">Unit Leader</p>
                <p className="text-white font-medium">Maj. C. Davis</p>
            </div>
            <div>
                <p className="text-[10px] uppercase text-zinc-500 font-bold mb-1">Unit</p>
                <p className="text-white font-medium">SQ-101</p>
            </div>
            
            <button className="w-full mt-4 bg-zinc-400 hover:bg-zinc-300 text-sfcc-dark font-bold py-3 px-4 rounded text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
                Request Update
                <ChevronRight size={16} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParentView;