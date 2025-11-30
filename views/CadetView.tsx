import React from 'react';
import { Target, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, SectionHeader, Badge, SecurityStatusCard } from '../components/Shared';

const CadetView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <SectionHeader title="Cadet Dashboard" subtitle="Secure Connection • Neutral Portfolio v2.5" />

      {/* Security Status Section */}
      <SecurityStatusCard />

      {/* Profile & Main Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ID Card */}
        <div className="lg:col-span-1 bg-sfcc-panel border border-sfcc-border p-6 rounded-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Target size={120} />
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-40 bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center mb-4 relative shadow-inner">
               <span className="text-2xl font-bold text-zinc-600">Cadet</span>
               <div className="absolute -bottom-3 -right-3 bg-zinc-900 rounded-full border border-zinc-600 w-10 h-10 flex items-center justify-center text-[10px] font-bold text-zinc-300">
                 SSgt
               </div>
            </div>
            <h2 className="text-2xl font-bold text-white">C/SSgt</h2>
            <p className="text-xs font-mono tracking-[0.2em] text-zinc-500 uppercase mt-1">Staff Sergeant</p>
          </div>
        </div>

        {/* Info & Log */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
             <div>
               <h1 className="text-3xl font-bold text-white">Cadet E. Ender</h1>
               <div className="flex gap-4 text-xs font-mono text-zinc-500 mt-1 uppercase tracking-wider">
                  <span>SQ-101</span>
                  <span>Joined Aug 15, 2022</span>
               </div>
             </div>
             
             <Card className="h-full border-t-0 border-l border-r-0 border-b-0 border-zinc-700 bg-transparent px-4 py-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                  Promotion Log
                </h3>
                <div className="space-y-4 relative">
                  <div className="absolute left-[3px] top-2 bottom-2 w-px bg-zinc-700"></div>
                  {[
                    { rank: 'C/SSgt', date: 'Oct 01, 2023', active: true },
                    { rank: 'C/SrA', date: 'Feb 15, 2023', active: false },
                    { rank: 'C/Amn', date: 'Sep 01, 2022', active: false },
                  ].map((log, i) => (
                    <div key={i} className="flex justify-between items-center text-sm relative pl-4">
                      <div className={`absolute left-0 w-2 h-2 rounded-full ${log.active ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-zinc-600'}`}></div>
                      <span className={log.active ? 'text-white font-bold' : 'text-zinc-500'}>{log.rank}</span>
                      <span className="font-mono text-zinc-600 text-xs">{log.date}</span>
                    </div>
                  ))}
                </div>
             </Card>
          </div>

          <Card title="Awards">
             <div className="flex flex-wrap-reverse justify-center gap-2 mb-6 w-full">
                <img src="https://publish-01.obsidian.md/access/c6e84d0dba4a473d9f7c63884517ea6d/images/Technology-Economics.png" alt="Tech Econ Award" className="h-auto w-[30%] min-w-[80px] object-contain" />
                <img src="https://publish-01.obsidian.md/access/c6e84d0dba4a473d9f7c63884517ea6d/images/Policy-Economics.png" alt="Policy Econ Award" className="h-auto w-[30%] min-w-[80px] object-contain" />
                <img src="https://publish-01.obsidian.md/access/c6e84d0dba4a473d9f7c63884517ea6d/images/Sustainability-Economics.png" alt="Sustain Econ Award" className="h-auto w-[30%] min-w-[80px] object-contain" />
             </div>
             
             <div className="space-y-4">
               <div>
                 <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-500 mb-1">
                    <span>Cyber Badge</span>
                    <span>80%</span>
                 </div>
                 <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-[80%]"></div>
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-500 mb-1">
                    <span>Community Service</span>
                    <span>45%</span>
                 </div>
                 <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 w-[45%]"></div>
                 </div>
               </div>
             </div>
          </Card>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="border border-red-500/30 bg-red-900/10 p-4 rounded-sm flex items-start gap-3">
        <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h3 className="text-red-500 font-bold uppercase text-sm tracking-wide">Action Required: Remediation</h3>
          <p className="text-zinc-400 text-sm mt-1">You have 1 artifact(s) that scored below the minimum (2/4). Please revise and resubmit per CCR 20-7.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Requirements */}
        <Card title="Promotion Requirements" className="lg:col-span-2">
            <div className="space-y-6">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-300">STEM Requirements</span>
                        <span className="font-mono text-zinc-400">2/3</span>
                    </div>
                    <div className="h-2 bg-zinc-800 w-full relative">
                        <div className="h-full bg-zinc-500 w-2/3 absolute top-0 left-0"></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-300">Leadership Logs</span>
                        <span className="font-mono text-zinc-400">4/5</span>
                    </div>
                    <div className="h-2 bg-zinc-800 w-full relative">
                        <div className="h-full bg-zinc-500 w-4/5 absolute top-0 left-0"></div>
                    </div>
                </div>
            </div>
        </Card>
        
        {/* Next Event */}
        <Card className="flex flex-col justify-center">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Next Major Event</p>
            <h2 className="text-2xl font-bold text-white mb-1">Regional FTX</h2>
            <p className="font-mono text-zinc-400 text-sm mb-4">NOV 10, 2023</p>
            <div className="bg-emerald-900/20 border border-emerald-500/20 text-emerald-500 p-2 text-xs flex items-center gap-2 rounded">
                <CheckCircle2 size={14} />
                Recovery Period Confirmed
            </div>
        </Card>
      </div>

      {/* Portfolio Table */}
      <Card title="My Evidence Portfolio">
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="text-zinc-500 font-mono text-xs uppercase tracking-wider border-b border-sfcc-border">
                    <th className="pb-2">LOE</th>
                    <th className="pb-2">Title</th>
                    <th className="pb-2 text-right">Status</th>
                    <th className="pb-2 text-right">Score</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-sfcc-border">
                <tr className="group">
                    <td className="py-3"><span className="bg-zinc-800 text-zinc-500 px-1 text-[10px] uppercase">STEM</span></td>
                    <td className="py-3 text-zinc-200">Rocketry Lab Report</td>
                    <td className="py-3 text-right"><Badge status="success">Approved</Badge></td>
                    <td className="py-3 text-right font-mono text-zinc-400">3/4</td>
                </tr>
                 <tr className="group">
                    <td className="py-3"><span className="bg-zinc-800 text-zinc-500 px-1 text-[10px] uppercase">Leadership</span></td>
                    <td className="py-3 text-zinc-200">Squadron Drill Cmd</td>
                    <td className="py-3 text-right"><Badge status="danger">Returned</Badge></td>
                    <td className="py-3 text-right font-mono text-zinc-400">1/4</td>
                </tr>
            </tbody>
        </table>
      </Card>
    </div>
  );
};

export default CadetView;