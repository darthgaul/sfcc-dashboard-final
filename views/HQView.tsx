import React from 'react';
import { 
  Users, 
  Shield, 
  AlertTriangle, 
  FileText, 
  FileCheck, 
  Gavel, 
  BookOpen, 
  Archive, 
  Activity, 
  CheckCircle2, 
  Clock,
  DollarSign,
  Box,
  Search,
  Lock,
  ArrowRight,
  PieChart as PieChartIcon
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { MetricCard, Card, SectionHeader, SecurityBadges, Badge } from '../components/Shared';

const complianceData = [
  { name: 'NORTH', value: 92 },
  { name: 'SOUTH', value: 85 },
  { name: 'CENTRAL', value: 65 },
  { name: 'WEST', value: 96 },
];

const financialData = [
  { name: 'Ops', budget: 100, actual: 92 },
  { name: 'Trng', budget: 80, actual: 85 },
  { name: 'Log', budget: 60, actual: 45 },
];

const assetData = [
  { name: 'Audited', value: 75, color: '#10b981' },
  { name: 'Pending', value: 20, color: '#f59e0b' },
  { name: 'Missing', value: 5, color: '#ef4444' },
];

const HQView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <SectionHeader 
        title="HQ Dashboard" 
        subtitle="Secure Connection • Neutral Portfolio v2.5" 
      />
      <SecurityBadges />

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Users} label="Total Cadets" value="1,240" subtext="+12% YoY Growth" />
        <MetricCard icon={Shield} label="Compliance Rate" value="94%" subtext="Q3 Reports Submitted" />
        <MetricCard icon={AlertTriangle} label="Remediation Rate" value="40%" subtext="Artifacts Scoring < 2" alert />
        <MetricCard icon={FileCheck} label="Pending Approvals" value="3" subtext="Pending Approval & Sign-Off" />
      </div>

      {/* Main Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1: Heatmap */}
        <Card title="National Compliance Heatmap" className="min-h-[300px]">
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

        {/* Col 2: Risk Log */}
        <Card title="Critical Risk / Waiver Log">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-sfcc-border text-zinc-500 font-mono text-xs uppercase tracking-wider">
                  <th className="pb-3 pl-2">Unit</th>
                  <th className="pb-3">Issue</th>
                  <th className="pb-3 text-right pr-2">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sfcc-border">
                {[
                  { unit: 'SQ-404', issue: 'Missing YP Certs', risk: 'HIGH' },
                  { unit: 'SQ-102', issue: 'Safety Ratio Waiver', risk: 'MED' },
                  { unit: 'SQ-305', issue: 'Equip Audit Fail', risk: 'HIGH' },
                  { unit: 'SQ-201', issue: 'Delayed Board', risk: 'LOW' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="py-3 pl-2 font-mono text-zinc-300">{row.unit}</td>
                    <td className="py-3 text-zinc-400 truncate max-w-[120px]" title={row.issue}>{row.issue}</td>
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

        {/* Col 3: Action Queue (New) */}
        <Card title="Action Queue">
          <div className="space-y-4">
             {[
               { title: 'Waiver: J. Smith', type: 'Exemption', req: 'SQ-102' },
               { title: 'Payment: XYZ Corp', type: 'Finance', req: 'HQ-LOG' },
               { title: 'Promo Board: SQ-304', type: 'Personnel', req: 'REG-NE' }
             ].map((item, i) => (
               <div key={i} className="flex items-center justify-between p-3 bg-zinc-900/50 rounded border border-zinc-800 hover:border-zinc-600 transition-colors">
                 <div>
                   <p className="text-sm font-bold text-white">{item.title}</p>
                   <p className="text-[10px] text-zinc-500 font-mono uppercase mt-0.5">{item.type} • {item.req}</p>
                 </div>
                 <div className="flex gap-2">
                   <button className="text-[10px] uppercase font-bold text-zinc-400 hover:text-white px-2 py-1 border border-zinc-700 rounded hover:bg-zinc-800 transition-colors">
                     View
                   </button>
                   <button className="text-[10px] uppercase font-bold text-sfcc-dark bg-emerald-500 hover:bg-emerald-400 px-2 py-1 rounded transition-colors">
                     Sign
                   </button>
                 </div>
               </div>
             ))}
             <div className="pt-2 text-center">
                <button className="text-xs text-zinc-500 hover:text-blue-400 flex items-center justify-center gap-1 w-full uppercase tracking-wider font-bold">
                  View All Actions <ArrowRight size={12} />
                </button>
             </div>
          </div>
        </Card>
      </div>

      {/* Governance & Operations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Governance & Records */}
        <Card title="Governance & Records" className="lg:col-span-1">
          <div className="grid gap-3">
             <button className="flex items-center gap-3 p-3 text-left rounded bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition-all group">
                <Archive size={18} className="text-zinc-500 group-hover:text-blue-400" />
                <div>
                   <span className="block text-sm font-bold text-zinc-300 group-hover:text-white">Official Archive</span>
                   <span className="text-[10px] text-zinc-600 font-mono">FY23 Records</span>
                </div>
             </button>
             <button className="flex items-center gap-3 p-3 text-left rounded bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition-all group">
                <BookOpen size={18} className="text-zinc-500 group-hover:text-blue-400" />
                <div>
                   <span className="block text-sm font-bold text-zinc-300 group-hover:text-white">Operational Playbook</span>
                   <span className="text-[10px] text-zinc-600 font-mono">v4.1 Active</span>
                </div>
             </button>
             <button className="flex items-center gap-3 p-3 text-left rounded bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition-all group">
                <Gavel size={18} className="text-zinc-500 group-hover:text-blue-400" />
                <div>
                   <span className="block text-sm font-bold text-zinc-300 group-hover:text-white">Org. Bylaws</span>
                   <span className="text-[10px] text-zinc-600 font-mono">Rev. 2022</span>
                </div>
             </button>
          </div>
        </Card>

        {/* Automated Workflows */}
        <Card title="Automated Workflows" className="lg:col-span-1">
           <div className="space-y-4">
              {[
                { name: 'Policy Distribution', status: 'active' },
                { name: 'Document Review', status: 'active' },
                { name: 'Roster Sync', status: 'warning' },
                { name: 'Audit Trail Backup', status: 'active' },
              ].map((wf, i) => (
                <div key={i} className="flex items-center justify-between">
                   <span className="text-sm text-zinc-400">{wf.name}</span>
                   {wf.status === 'active' ? (
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase">
                        <CheckCircle2 size={12} /> OK
                      </span>
                   ) : (
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-500 uppercase">
                        <Clock size={12} /> Sync
                      </span>
                   )}
                </div>
              ))}
           </div>
        </Card>

        {/* Corrective Actions */}
        <Card title="Corrective Actions" className="lg:col-span-2">
           <table className="w-full text-left text-sm">
              <thead>
                 <tr className="border-b border-sfcc-border text-zinc-500 font-mono text-xs uppercase tracking-wider">
                    <th className="pb-3 pl-2">ID</th>
                    <th className="pb-3">Finding</th>
                    <th className="pb-3">Issued</th>
                    <th className="pb-3 text-right pr-2">Status</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-sfcc-border">
                 <tr className="hover:bg-zinc-800/50">
                    <td className="py-3 pl-2 font-mono text-zinc-500">CAR-001</td>
                    <td className="py-3 text-zinc-300">Incomplete Inventory Log</td>
                    <td className="py-3 font-mono text-zinc-500">2023-10-15</td>
                    <td className="py-3 text-right pr-2"><Badge status="warning">Open</Badge></td>
                 </tr>
                 <tr className="hover:bg-zinc-800/50">
                    <td className="py-3 pl-2 font-mono text-zinc-500">CAR-003</td>
                    <td className="py-3 text-zinc-300">Unauthorized Building Access</td>
                    <td className="py-3 font-mono text-zinc-500">2023-11-01</td>
                    <td className="py-3 text-right pr-2"><Badge status="danger">Critical</Badge></td>
                 </tr>
                 <tr className="hover:bg-zinc-800/50">
                    <td className="py-3 pl-2 font-mono text-zinc-500">CAR-004</td>
                    <td className="py-3 text-zinc-300">Training Record Gap</td>
                    <td className="py-3 font-mono text-zinc-500">2023-11-05</td>
                    <td className="py-3 text-right pr-2"><Badge status="info">Review</Badge></td>
                 </tr>
              </tbody>
           </table>
        </Card>
      </div>

      {/* Financial & Board Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Financial Overview */}
        <Card title="Financial Overview">
           <div className="h-40 w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={financialData} layout="vertical" barSize={10}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={40} tick={{fill: '#71717a', fontSize: 10}} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff'}} />
                    <Bar dataKey="budget" name="Budget" fill="#3f3f46" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="actual" name="Actual" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
           <div className="flex justify-between items-end border-t border-zinc-800 pt-3">
              <div>
                 <p className="text-[10px] text-zinc-500 uppercase tracking-widest">YTD Spending</p>
                 <p className="text-xl font-bold text-white font-mono flex items-center gap-1"><DollarSign size={16} className="text-zinc-500" />842.5k</p>
              </div>
              <div className="text-right">
                 <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Rem. Budget</p>
                 <p className="text-lg font-bold text-emerald-500 font-mono">15.2%</p>
              </div>
           </div>
        </Card>

        {/* Asset Audit Status */}
        <Card title="Asset Audit Status">
           <div className="flex items-center gap-6 h-full">
              <div className="h-32 w-32 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie 
                         data={assetData} 
                         innerRadius={35} 
                         outerRadius={55} 
                         paddingAngle={5} 
                         dataKey="value"
                         stroke="none"
                       >
                         {assetData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                       </Pie>
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Box size={20} className="text-zinc-500" />
                 </div>
              </div>
              <div className="space-y-3 flex-1">
                 {assetData.map((item, i) => (
                   <div key={i} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                         <span className="text-zinc-300 uppercase tracking-wider font-bold">{item.name}</span>
                      </div>
                      <span className="font-mono text-zinc-500">{item.value}%</span>
                   </div>
                 ))}
                 <div className="border-t border-zinc-800 pt-2 mt-2">
                   <p className="text-[10px] text-zinc-500">Next Audit: <span className="text-zinc-300">12/01/2023</span></p>
                 </div>
              </div>
           </div>
        </Card>

        {/* Portfolio & Board Review */}
        <Card title="Portfolio & Board Review">
           <div className="space-y-4">
              <div className="bg-zinc-900/50 p-3 rounded border border-zinc-800">
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Board Packet</h4>
                    <Badge status="success">Ready</Badge>
                 </div>
                 <p className="text-[10px] text-zinc-500 mb-2">Integrated Q3 Performance Snapshot</p>
                 <button className="w-full py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 rounded text-[10px] font-bold uppercase tracking-wider transition-colors">
                    View Packet
                 </button>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ad-Hoc Portfolio Query</label>
                 <div className="flex gap-2">
                    <div className="relative flex-1">
                       <select className="w-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs rounded py-1.5 pl-2 pr-6 appearance-none focus:outline-none focus:border-zinc-500">
                          <option>Select Region...</option>
                          <option>Select Unit...</option>
                          <option>Select Risk Level...</option>
                       </select>
                       <Search size={12} className="absolute right-2 top-2 text-zinc-500" />
                    </div>
                    <button className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white px-3 rounded text-xs">
                       Go
                    </button>
                 </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                 <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <Lock size={10} /> PII Compliance
                 </span>
                 <span className="text-[10px] font-mono text-emerald-500">SANITIZED: OK</span>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
};

export default HQView;