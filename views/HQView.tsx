
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  AlertTriangle, 
  FileCheck, 
  Gavel, 
  BookOpen, 
  Archive, 
  CheckCircle2, 
  Clock,
  DollarSign,
  Box,
  Search,
  Lock,
  ArrowRight,
  X,
  FileSignature,
  Download,
  ChevronRight,
  Brain,
  Sparkles,
  Activity,
  Zap,
  Radio
} from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, AreaChart, Area } from 'recharts';
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

const trendData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 550 },
  { name: 'Thu', value: 450 },
  { name: 'Fri', value: 600 },
  { name: 'Sat', value: 700 },
  { name: 'Sun', value: 800 },
];

const assetData = [
  { name: 'Audited', value: 75, color: '#10b981' },
  { name: 'Pending', value: 20, color: '#f59e0b' },
  { name: 'Missing', value: 5, color: '#ef4444' },
];

const ACTION_ITEMS = [
  { 
    id: 'ACT-001', 
    title: 'Waiver: J. Smith', 
    type: 'Exemption', 
    req: 'SQ-102', 
    priority: 'HIGH',
    date: 'Today, 09:30',
    details: 'Requesting exemption from 1-mile run due to documented medical injury (ACL tear). Physican note attached.',
  },
  { 
    id: 'ACT-002', 
    title: 'Payment: XYZ Corp', 
    type: 'Finance', 
    req: 'HQ-LOG', 
    priority: 'MED',
    date: 'Yesterday',
    details: 'Vendor payment for Region 1 encampment supplies (MREs, Water). Amount: $4,500. Budget Code: OPS-23.',
  },
  { 
    id: 'ACT-003', 
    title: 'Promo Board: SQ-304', 
    type: 'Personnel', 
    req: 'REG-NE', 
    priority: 'LOW',
    date: 'Nov 03',
    details: 'Promotion board results for SQ-304. 12 Cadets recommended for advancement. All requirements verified.',
  },
];

const HQView: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<typeof ACTION_ITEMS[0] | null>(null);
  const [activeGovernanceModal, setActiveGovernanceModal] = useState<'archive' | 'playbook' | 'bylaws' | null>(null);
  const [aiMode, setAiMode] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 relative font-sans">
      
      {/* Header with Tools */}
      <SectionHeader 
        title="Mission Control" 
        subtitle="HQ Command Suite v3.2" 
        rightContent={
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setAiMode(!aiMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border transition-all duration-300 ${aiMode ? 'bg-[#3684ca] border-[#3684ca] text-white shadow-[0_0_15px_rgba(54,132,202,0.4)]' : 'bg-transparent border-[#3684ca]/30 text-[#3684ca] hover:bg-[#3684ca]/10'}`}
            >
              {aiMode ? <Sparkles size={14} className="animate-spin-slow" /> : <Brain size={14} />}
              <span className="text-[10px] font-bold uppercase tracking-widest">{aiMode ? 'AI Analysis: ON' : 'Enable AI'}</span>
            </button>
            <div className="text-right hidden md:block">
              <div className="text-xl font-bold text-white font-mono leading-none">{time.toLocaleTimeString([], { hour12: false })}</div>
              <div className="text-[10px] text-[#96a3ae] uppercase tracking-widest font-mono">Zulu Time</div>
            </div>
          </div>
        }
      />

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          icon={Users} 
          label="Total Cadets" 
          value="1,240" 
          subtext="Active Roster" 
          trend="up" 
          trendValue="12%"
        />
        <MetricCard 
          icon={Shield} 
          label="Compliance" 
          value="94%" 
          subtext="National Avg" 
          trend="up" 
          trendValue="2.4%"
        />
        <MetricCard 
          icon={AlertTriangle} 
          label="Risk Items" 
          value="40%" 
          subtext="Remediation Rate" 
          alert
          trend="down"
          trendValue="5%"
        />
        <MetricCard 
          icon={DollarSign} 
          label="Budget" 
          value="$842k" 
          subtext="YTD Spend" 
          trend="neutral"
          trendValue="On Track"
        />
      </div>

      {/* AI Insight Banner */}
      {aiMode && (
        <div className="bg-[#3684ca]/10 border-y border-[#3684ca]/30 p-4 flex items-start gap-4 animate-in slide-in-from-top-2">
           <div className="p-2 bg-[#3684ca]/20 rounded-full text-[#3684ca]">
              <Sparkles size={18} />
           </div>
           <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">AI Predictive Insight</h4>
              <p className="text-xs text-[#c7d7e2] leading-relaxed">
                 Analysis detects a <span className="text-[#3684ca] font-bold">15% increase</span> in medical waivers in the Northeast Region. 
                 Correlation suggests seasonal impact. Recommendation: Review physical training protocols for winter conditions.
              </p>
           </div>
        </div>
      )}

      {/* Main Command Grid (Bento Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Row 1, Col 1: National Status (Map/Heatmap) - Span 8 */}
        <Card title="National Compliance Vector" variant="glass" className="lg:col-span-8 min-h-[350px]">
          <div className="flex flex-col h-full">
             <div className="flex items-center gap-6 mb-4">
                <div className="flex gap-2">
                   <span className="w-3 h-3 bg-[#96a3ae] rounded-sm"></span>
                   <span className="text-[10px] text-[#96a3ae] uppercase">Standard</span>
                </div>
                <div className="flex gap-2">
                   <span className="w-3 h-3 bg-[#5f686e] rounded-sm"></span>
                   <span className="text-[10px] text-[#96a3ae] uppercase">At Risk</span>
                </div>
             </div>
             
             <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={complianceData} barSize={60}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#5f686e', fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold' }} 
                      axisLine={false} 
                      tickLine={false} 
                      dy={10}
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(54,132,202,0.1)' }}
                      contentStyle={{ backgroundColor: '#191818', borderColor: '#3684ca', color: '#c7d7e2', borderRadius: '4px' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {complianceData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.value < 70 ? '#5f686e' : 'url(#colorGradient)'} 
                          stroke={entry.value < 70 ? 'transparent' : '#3684ca'}
                          strokeWidth={entry.value < 70 ? 0 : 1}
                        />
                      ))}
                    </Bar>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3684ca" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#3684ca" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
                
                {/* Overlay Graphic */}
                <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-20">
                   <Activity size={100} className="text-[#3684ca]" />
                </div>
             </div>
          </div>
        </Card>

        {/* Row 1, Col 2: Action Queue - Span 4 */}
        <Card title="Command Queue" className="lg:col-span-4 flex flex-col">
           <div className="space-y-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
              {ACTION_ITEMS.map((item, i) => (
                 <div key={i} className="group relative bg-[#252525] border border-[#5f686e]/30 p-4 rounded-sm hover:border-[#3684ca] transition-all cursor-pointer overflow-hidden" onClick={() => setSelectedAction(item)}>
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5f686e] group-hover:bg-[#3684ca] transition-colors"></div>
                    <div className="flex justify-between items-start mb-1 pl-2">
                       <h4 className="text-xs font-bold text-white group-hover:text-[#3684ca] transition-colors">{item.title}</h4>
                       <Badge status={item.priority === 'HIGH' ? 'danger' : item.priority === 'MED' ? 'warning' : 'neutral'}>{item.priority}</Badge>
                    </div>
                    <div className="flex justify-between items-center pl-2">
                       <span className="text-[10px] font-mono text-[#96a3ae]">{item.req}</span>
                       <span className="text-[10px] font-mono text-[#5f686e]">{item.date}</span>
                    </div>
                 </div>
              ))}
           </div>
           <button className="w-full mt-4 py-2 border border-dashed border-[#5f686e]/50 text-[#96a3ae] text-[10px] font-bold uppercase tracking-widest hover:bg-[#252525] hover:text-white transition-colors">
              View Full Log
           </button>
        </Card>

        {/* Row 2: Operational Blocks */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
           
           {/* Governance */}
           <Card title="Governance" variant="glass">
              <div className="grid grid-cols-1 gap-2">
                 {[
                    { label: 'Official Archive', icon: Archive, modal: 'archive' },
                    { label: 'Ops Playbook', icon: BookOpen, modal: 'playbook' },
                    { label: 'Bylaws', icon: Gavel, modal: 'bylaws' }
                 ].map((btn, i) => (
                    <button 
                       key={i}
                       onClick={() => setActiveGovernanceModal(btn.modal as any)}
                       className="flex items-center justify-between p-3 rounded bg-[#252525]/50 border border-[#5f686e]/20 hover:border-[#3684ca] hover:bg-[#3684ca]/10 group transition-all"
                    >
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#191818] rounded text-[#96a3ae] group-hover:text-[#3684ca] transition-colors">
                             <btn.icon size={16} />
                          </div>
                          <span className="text-xs font-bold text-[#c7d7e2] uppercase tracking-wide group-hover:text-white">{btn.label}</span>
                       </div>
                       <ChevronRight size={14} className="text-[#5f686e] group-hover:text-[#3684ca] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </button>
                 ))}
              </div>
           </Card>

           {/* Workflow Monitor */}
           <Card title="Workflow Pulse">
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="relative">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                       </div>
                       <span className="text-xs font-bold text-[#c7d7e2]">Roster Synchronization</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-500">OPTIMAL</span>
                 </div>
                 <div className="h-1 bg-[#252525] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[92%] animate-pulse"></div>
                 </div>

                 <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                       <span className="text-xs font-bold text-[#c7d7e2]">Financial Audit Trail</span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-500">PROCESSING</span>
                 </div>
                 <div className="h-1 bg-[#252525] rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[45%]"></div>
                 </div>
              </div>
           </Card>

           {/* Financial Mini-Chart */}
           <Card title="Resource Allocation">
              <div className="h-32 w-full relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                       <defs>
                          <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#3684ca" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#3684ca" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <Tooltip cursor={false} content={<></>} />
                       <Area type="monotone" dataKey="value" stroke="#3684ca" fillOpacity={1} fill="url(#chartColor)" />
                    </AreaChart>
                 </ResponsiveContainer>
                 <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] text-[#5f686e] font-mono uppercase">
                    <span>Q1</span>
                    <span>Q2</span>
                    <span>Q3</span>
                    <span>Q4</span>
                 </div>
              </div>
           </Card>

        </div>
      </div>

      {/* Sticky Bottom Ticker */}
      <div className="fixed bottom-0 left-0 w-full bg-[#0f0f11] border-t border-[#3684ca] py-1 px-4 z-40 flex items-center gap-8 overflow-hidden shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
         <div className="flex items-center gap-2 shrink-0">
            <Radio size={12} className="text-[#3684ca] animate-pulse" />
            <span className="text-[10px] font-bold text-[#3684ca] uppercase tracking-widest">Live Feed</span>
         </div>
         <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap text-[10px] font-mono text-[#96a3ae] flex gap-12">
               <span>SYS: ALL SYSTEMS NOMINAL</span>
               <span>ALERT: SQ-102 WAIVER PENDING APPROVAL</span>
               <span>UPDATE: POLICY 23-4 EFFECTIVE 2400</span>
               <span>SECURE: ENCRYPTION KEY ROTATED</span>
               <span>WEATHER: NE REGION CAUTION ADVISED</span>
            </div>
         </div>
      </div>

      {/* Modal Re-implementation (Simplified for Brevity - keeping existing logic hook) */}
      {selectedAction && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedAction(null)}></div>
           <div className="relative bg-[#191818] border border-[#3684ca] w-full max-w-lg rounded shadow-[0_0_50px_rgba(54,132,202,0.2)] animate-in zoom-in-95 duration-200 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3684ca] to-transparent"></div>
              
              <div className="p-6 border-b border-[#5f686e]/30 flex justify-between items-start">
                 <div>
                    <Badge status="info">{selectedAction.type}</Badge>
                    <h2 className="text-xl font-bold text-white mt-2">{selectedAction.title}</h2>
                    <p className="text-xs font-mono text-[#3684ca] mt-1">ID: {selectedAction.id}</p>
                 </div>
                 <button onClick={() => setSelectedAction(null)} className="text-[#5f686e] hover:text-white"><X size={20} /></button>
              </div>

              <div className="p-6">
                 <div className="bg-[#252525] border border-[#5f686e]/30 p-4 rounded text-sm text-[#96a3ae] mb-6 font-mono leading-relaxed">
                    {selectedAction.details}
                 </div>
                 <div className="flex gap-3">
                    <button onClick={() => setSelectedAction(null)} className="flex-1 py-3 border border-[#5f686e]/50 text-[#96a3ae] hover:text-white hover:border-white uppercase font-bold text-xs rounded transition-colors">
                       Request Info
                    </button>
                    <button onClick={() => setSelectedAction(null)} className="flex-1 py-3 bg-[#3684ca] hover:bg-[#3684ca]/80 text-white uppercase font-bold text-xs rounded shadow-lg shadow-[#3684ca]/20 flex items-center justify-center gap-2 transition-colors">
                       <FileSignature size={16} /> Approve
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default HQView;
