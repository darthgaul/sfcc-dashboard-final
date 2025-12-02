
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
  Radio,
  Landmark,
  TrendingUp,
  Server,
  Database,
  FileText,
  PieChart as PieChartIcon,
  Crosshair,
  Target,
  Signal,
  Map
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';
import { MetricCard, Card, SectionHeader, SecurityBadges, Badge } from '../components/Shared';

// --- Mock Data for Board View ---

// Data for Sector Compliance HUD
const COMPLIANCE_SECTORS = [
  { name: 'WEST SECTOR', code: 'SEC-W', value: 96, status: 'OPTIMAL', color: 'text-emerald-500', bar: 'bg-emerald-500' },
  { name: 'NORTH SECTOR', code: 'SEC-N', value: 92, status: 'STABLE', color: 'text-[#3684ca]', bar: 'bg-[#3684ca]' },
  { name: 'SOUTH SECTOR', code: 'SEC-S', value: 85, status: 'WARNING', color: 'text-amber-500', bar: 'bg-amber-500' },
  { name: 'CENTRAL SECTOR', code: 'SEC-C', value: 65, status: 'CRITICAL', color: 'text-red-500', bar: 'bg-red-500' },
];

// Strategic Roadmap Progress
const ROADMAP_DATA = [
  { name: 'Q1', progress: 100 },
  { name: 'Q2', progress: 100 },
  { name: 'Q3', progress: 85 },
  { name: 'Q4', progress: 20 },
];

// Reworked LOE Data for Radar Chart (Readiness Score 0-100)
const LOE_RADAR_DATA = [
  { subject: 'Aerospace', A: 85, fullMark: 100 },
  { subject: 'STEM', A: 92, fullMark: 100 },
  { subject: 'Leadership', A: 74, fullMark: 100 },
  { subject: 'Fitness', A: 98, fullMark: 100 },
  { subject: 'Citizen', A: 82, fullMark: 100 },
];

const TOP_ARTIFACTS = [
  { id: 'ART-901', title: 'Orbital Debris Mitigation Plan', cadet: 'C/Capt Reynolds', abstract: 'Novel approach using electrostatic nets for LEO cleanup.', loe: 'LOE-A' },
  { id: 'ART-905', title: 'Cyber Defense Architecture', cadet: 'C/1Lt Chen', abstract: 'Hardening squadron comms against mock state-actor intrusion.', loe: 'LOE-B' },
  { id: 'ART-912', title: 'Ethical Leadership Case Study', cadet: 'C/MSgt O\'Malley', abstract: 'Analysis of decision making during crisis simulation.', loe: 'LOE-C' },
];

const FIDUCIARY_LOG = [
  { id: 'PAY-23-401', vendor: 'AeroTech Supplies', amount: '$12,500', status: 'PAID: 2023-11-20', code: 'OPS-EQUIP' },
  { id: 'PAY-23-402', vendor: 'Region 1 Venue', amount: '$4,200', status: 'PENDING CEO APPRV', code: 'EVT-VENUE' },
  { id: 'PAY-23-403', vendor: 'Logistics Partner', amount: '$1,850', status: 'PENDING TREASURER', code: 'OPS-SHIP' },
];

const WAIVER_LOG = [
  { id: 'WVR-101', unit: 'SQ-102', type: 'Medical Exemption', deadline: 'PERMANENT', status: 'APPROVED', remediation: 'ALT TEST ASSIGNED' },
  { id: 'COR-205', unit: 'SQ-304', type: 'Corrective Action', deadline: '7 DAYS REMAINING', status: 'OPEN', remediation: 'AUDIT IN PROGRESS' },
];

const HQView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'audit'>('overview');
  const [aiMode, setAiMode] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 relative font-sans">
      
      {/* Header with Board-Specific Tools */}
      <SectionHeader 
        title="Board Command" 
        subtitle="Strategic Oversight • Fiduciary Control" 
        rightContent={
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setAiMode(!aiMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border transition-all duration-300 ${aiMode ? 'bg-[#3684ca] border-[#3684ca] text-white shadow-[0_0_15px_rgba(54,132,202,0.4)]' : 'bg-transparent border-[#3684ca]/30 text-[#3684ca] hover:bg-[#3684ca]/10'}`}
            >
              {aiMode ? <Sparkles size={14} className="animate-spin-slow" /> : <Brain size={14} />}
              <span className="text-[10px] font-bold uppercase tracking-widest">{aiMode ? 'AI Audit: ACTIVE' : 'AI Audit'}</span>
            </button>
            <div className="text-right hidden md:block">
              <div className="text-xl font-bold text-white font-mono leading-none">{time.toLocaleTimeString([], { hour12: false })}</div>
              <div className="text-[10px] text-[#96a3ae] uppercase tracking-widest font-mono">Zulu Time</div>
            </div>
          </div>
        }
      />

      {/* --- Row 1: Strategic Health Indicators (KPIs) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          icon={Shield} 
          label="Risk Remediation" 
          value="78%" 
          subtext="Critical Findings Resolved" 
          trend="up" 
          trendValue="+12% QoQ"
        />
        <MetricCard 
          icon={Landmark} 
          label="Fiscal Compliance" 
          value="COMPLIANT" 
          subtext="SFA Agreement Status" 
          trend="neutral" 
          trendValue="Audited"
          color="green"
        />
        <MetricCard 
          icon={TrendingUp} 
          label="Strategic Roadmap" 
          value="ON TRACK" 
          subtext="Charter Milestones" 
          trend="up"
          trendValue="Q3 Goals Met"
        />
        <MetricCard 
          icon={Server} 
          label="System Health" 
          value="NOMINAL" 
          subtext="Audit Trail Active" 
          trend="neutral"
          trendValue="Sync: 100%"
        />
      </div>

      {/* AI Insight Banner */}
      {aiMode && (
        <div className="bg-[#3684ca]/10 border-y border-[#3684ca]/30 p-4 flex items-start gap-4 animate-in slide-in-from-top-2">
           <div className="p-2 bg-[#3684ca]/20 rounded-full text-[#3684ca]">
              <Sparkles size={18} />
           </div>
           <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Predictive Risk Analysis</h4>
              <p className="text-xs text-[#c7d7e2] leading-relaxed">
                 Financial velocity suggests a <span className="text-[#3684ca] font-bold">surplus in LOE-B spend</span> vs. budget. 
                 Recommendation: Reallocate remaining Q4 STEM funds to Cadet Scholarship pool to maintain non-profit utilization targets.
              </p>
           </div>
        </div>
      )}

      {/* --- Row 2: Fiduciary & Governance --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Fiduciary Oversight (Span 8) */}
        <Card title="Fiduciary Oversight (DTM 25-02)" variant="glass" className="lg:col-span-8">
           <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6 bg-[#252525]/50 p-3 rounded-sm border border-[#5f686e]/20">
                 <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-500/10 rounded text-emerald-500"><FileCheck size={20} /></div>
                    <div>
                       <div className="text-[10px] text-[#96a3ae] uppercase tracking-widest">Fiscal Sponsor Status</div>
                       <div className="text-sm font-bold text-white">SFA AGREEMENT: ACTIVE</div>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] text-[#96a3ae] uppercase tracking-widest">Financial Reporting</div>
                    <div className="text-sm font-bold text-emerald-500">SECURE & AUDITED</div>
                 </div>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm border-separate border-spacing-y-1">
                    <thead>
                       <tr className="text-[#5f686e] font-mono text-[10px] uppercase tracking-wider">
                          <th className="pb-2 pl-2">Transaction ID</th>
                          <th className="pb-2">Vendor / Entity</th>
                          <th className="pb-2">Amount</th>
                          <th className="pb-2">Execution Chain Status</th>
                          <th className="pb-2 text-right pr-2">Ledger</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-[#5f686e]/10">
                       {FIDUCIARY_LOG.map((row, i) => (
                          <tr key={i} className="hover:bg-[#252525] transition-colors">
                             <td className="py-3 pl-2 font-mono text-[#3684ca] text-xs">{row.id}</td>
                             <td className="py-3 font-bold text-white text-xs">{row.vendor}</td>
                             <td className="py-3 font-mono text-[#c7d7e2]">{row.amount}</td>
                             <td className="py-3">
                                <Badge status={row.status.includes('PAID') ? 'success' : 'warning'}>{row.status}</Badge>
                             </td>
                             <td className="py-3 text-right pr-2 font-mono text-[10px] text-[#5f686e]">{row.code}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </Card>

        {/* Governance Vault (Span 4) */}
        <Card title="Governance Vault" variant="default" className="lg:col-span-4 flex flex-col">
           <div className="space-y-3 flex-1">
              {[
                 { name: 'SFCC Bylaws', id: 'DOC-001', secure: true },
                 { name: 'Ops Playbook v3.0', id: 'DOC-OPS', secure: true },
                 { name: 'DTM 25-02 (Financial)', id: 'DOC-FIN', secure: true },
                 { name: 'Fiscal Sponsor Agrmt', id: 'DOC-SFA', secure: true },
              ].map((doc, i) => (
                 <div key={i} className="flex items-center justify-between p-3 bg-[#191818] border border-[#5f686e]/30 rounded-sm hover:border-[#3684ca] group transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-[#252525] rounded text-[#96a3ae] group-hover:text-[#3684ca]">
                          <Lock size={16} />
                       </div>
                       <div>
                          <div className="text-xs font-bold text-white group-hover:text-[#3684ca] transition-colors">{doc.name}</div>
                          <div className="text-[9px] font-mono text-[#5f686e]">ID: {doc.id}</div>
                       </div>
                    </div>
                    <ChevronRight size={14} className="text-[#5f686e] group-hover:text-white" />
                 </div>
              ))}
           </div>
           <button className="w-full mt-6 py-3 border border-dashed border-[#5f686e]/50 text-[#96a3ae] text-[10px] font-bold uppercase tracking-widest hover:bg-[#252525] hover:text-white transition-colors flex items-center justify-center gap-2">
              <Archive size={14} /> Access Full Archive
           </button>
        </Card>
      </div>

      {/* --- Row 3: Strategic Accountability (Board Packet) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         
         {/* Strategic Snapshot (Span 12) */}
         <div className="lg:col-span-12">
            <SectionHeader title="Strategic Accountability" subtitle="Quarterly Board Packet Audit" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               
               {/* 1. Promotion & Readiness Stats */}
               <Card title="Cadet Readiness Profile" variant="glass">
                  <div className="flex items-center justify-around py-4">
                     <div className="text-center">
                        <div className="text-[10px] text-[#96a3ae] uppercase tracking-widest mb-1">Rubric Median</div>
                        <div className="text-4xl font-bold text-white font-mono">3.4<span className="text-lg text-[#5f686e]">/4</span></div>
                        <div className="text-[9px] text-emerald-500 font-bold mt-1">+0.2 vs Last Qtr</div>
                     </div>
                     <div className="w-px h-16 bg-[#5f686e]/30"></div>
                     <div className="text-center">
                        <div className="text-[10px] text-[#96a3ae] uppercase tracking-widest mb-1">QPT Compliance</div>
                        <div className="text-4xl font-bold text-emerald-500 font-mono">98%</div>
                        <div className="text-[9px] text-[#5f686e] font-bold mt-1">Physical Readiness</div>
                     </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#5f686e]/20">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-[#c7d7e2]">Presence Board Pass Rate</span>
                        <span className="text-xs font-mono text-white">92%</span>
                     </div>
                     <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden">
                        <div className="h-full bg-[#3684ca] w-[92%]"></div>
                     </div>
                  </div>
               </Card>

               {/* 2. LOE Strategic Balance (RADAR) */}
               <Card title="LOE Strategic Balance" variant="glass">
                  <div className="h-64 w-full -ml-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={LOE_RADAR_DATA}>
                           <PolarGrid stroke="#5f686e" strokeOpacity={0.3} />
                           <PolarAngleAxis dataKey="subject" tick={{ fill: '#96a3ae', fontSize: 10, fontWeight: 'bold' }} />
                           <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                           <Radar
                              name="Cohort Proficiency"
                              dataKey="A"
                              stroke="#3684ca"
                              strokeWidth={2}
                              fill="#3684ca"
                              fillOpacity={0.3}
                           />
                           <Tooltip 
                              cursor={false}
                              contentStyle={{ backgroundColor: '#191818', borderColor: '#3684ca', color: '#fff' }}
                              itemStyle={{ color: '#fff' }}
                           />
                        </RadarChart>
                     </ResponsiveContainer>
                  </div>
                  {/* Legend */}
                  <div className="flex items-center justify-center gap-4 text-[9px] text-[#5f686e] font-mono uppercase -mt-4 mb-2">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#3684ca]/30 border border-[#3684ca] rounded-full"></div>
                        <span>Cohort Actuals</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 border border-[#5f686e]/30 rounded-full"></div>
                        <span>Target</span>
                     </div>
                  </div>
               </Card>

               {/* 3. Top Artifacts Highlight */}
               <Card title="Cohort Highlights" variant="glass">
                  <div className="space-y-3">
                     {TOP_ARTIFACTS.map((art, i) => (
                        <div key={i} className="bg-[#252525]/30 p-3 rounded border-l-2 border-[#3684ca] hover:bg-[#252525] transition-all cursor-pointer group">
                           <div className="flex justify-between items-start mb-1">
                              <span className="text-[10px] font-bold text-[#3684ca] uppercase bg-[#3684ca]/10 px-1.5 rounded">{art.loe}</span>
                              <span className="text-[9px] font-mono text-[#5f686e]">{art.cadet}</span>
                           </div>
                           <h4 className="text-xs font-bold text-white mb-1 group-hover:text-[#3684ca] transition-colors">{art.title}</h4>
                           <p className="text-[10px] text-[#96a3ae] line-clamp-2 leading-relaxed">{art.abstract}</p>
                        </div>
                     ))}
                  </div>
               </Card>

            </div>
         </div>
      </div>

      {/* --- Row 4: Operational Oversight & Audit --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         
         {/* National Compliance HUD (Replaces Radial Heatmap) Span 6 */}
         <Card title="Sector Intelligence Grid" className="lg:col-span-6 flex flex-col" variant="glass">
            <div className="flex-1 p-4 bg-[#0f0f11] rounded-sm border border-[#5f686e]/20 relative overflow-hidden flex flex-col justify-between">
               {/* HUD Overlay Effects */}
               <div className="absolute inset-0 pointer-events-none opacity-20" 
                    style={{ backgroundImage: 'linear-gradient(#3684ca 1px, transparent 1px), linear-gradient(90deg, #3684ca 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
               </div>
               <div className="absolute top-0 left-0 w-full h-1 bg-[#3684ca]/50 shadow-[0_0_10px_#3684ca] animate-scan"></div>
               
               {/* Header HUD */}
               <div className="flex justify-between items-center mb-6 relative z-10">
                  <div className="flex items-center gap-2">
                     <Target className="text-[#3684ca] animate-pulse" size={16} />
                     <span className="text-[10px] font-mono text-[#3684ca] uppercase tracking-widest">Target Acquisition: Compliance</span>
                  </div>
                  <div className="px-2 py-0.5 bg-[#252525] border border-[#5f686e]/50 rounded text-[9px] font-mono text-[#5f686e]">
                     REF: CCR-20-2
                  </div>
               </div>

               {/* Sector Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                  {COMPLIANCE_SECTORS.map((sector, i) => (
                     <div key={i} className="group bg-[#191818]/80 border border-[#5f686e]/30 hover:border-[#3684ca] p-3 rounded-sm transition-all">
                        <div className="flex justify-between items-start mb-2">
                           <div>
                              <div className="text-[10px] font-mono text-[#5f686e] mb-0.5">{sector.code}</div>
                              <div className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-[#3684ca] transition-colors">{sector.name}</div>
                           </div>
                           <div className={`text-[9px] font-bold px-1.5 py-0.5 rounded border border-current ${sector.color} bg-opacity-10`}>
                              {sector.status}
                           </div>
                        </div>
                        
                        {/* Tactical Power Bar */}
                        <div className="flex items-center gap-3">
                           <div className="flex-1 h-1.5 bg-[#252525] flex gap-[1px]">
                              {Array.from({ length: 10 }).map((_, idx) => (
                                 <div 
                                    key={idx} 
                                    className={`flex-1 ${idx < (sector.value / 10) ? sector.bar : 'bg-[#252525]'} ${idx < (sector.value / 10) ? 'shadow-[0_0_5px_currentColor]' : ''} transition-all duration-500`}
                                 ></div>
                              ))}
                           </div>
                           <div className={`font-mono text-sm font-bold ${sector.color}`}>
                              {sector.value}%
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Footer HUD */}
               <div className="mt-6 flex justify-between items-end relative z-10 border-t border-[#5f686e]/20 pt-2">
                  <div className="text-[9px] font-mono text-[#5f686e]">
                     SCANNING: ACTIVE<br/>
                     UPDATED: 14:00Z
                  </div>
                  <div className="flex gap-1">
                     <div className="w-1 h-1 bg-[#3684ca] rounded-full animate-ping"></div>
                     <div className="w-1 h-1 bg-[#3684ca] rounded-full"></div>
                     <div className="w-1 h-1 bg-[#3684ca] rounded-full"></div>
                  </div>
               </div>
            </div>
         </Card>

         {/* Enhanced Waiver/Action Log (Span 6) */}
         <Card title="Waiver & Corrective Action Log" className="lg:col-span-6 flex flex-col">
            <div className="overflow-x-auto flex-1">
               <table className="w-full text-left text-sm border-separate border-spacing-y-2">
                  <thead>
                     <tr className="text-[#5f686e] font-mono text-[10px] uppercase tracking-wider">
                        <th className="pl-4">Reference ID</th>
                        <th>Type / Unit</th>
                        <th>Deadline Status</th>
                        <th className="text-right pr-4">Remediation Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     {WAIVER_LOG.map((row, i) => (
                        <tr key={i} className="bg-[#252525] group hover:bg-[#3684ca]/5 transition-all">
                           <td className="py-3 pl-4 rounded-l-sm border-l-2 border-transparent group-hover:border-[#3684ca]">
                              <span className="font-mono text-xs text-[#c7d7e2]">{row.id}</span>
                           </td>
                           <td className="py-3">
                              <div className="text-xs font-bold text-white">{row.type}</div>
                              <div className="text-[9px] font-mono text-[#5f686e]">{row.unit}</div>
                           </td>
                           <td className="py-3">
                              <Badge status={row.deadline.includes('REMAINING') ? 'warning' : 'neutral'}>{row.deadline}</Badge>
                           </td>
                           <td className="py-3 text-right pr-4 rounded-r-sm">
                              <span className="text-[10px] font-bold text-[#3684ca] uppercase tracking-wider">{row.remediation}</span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Card>

      </div>

      {/* Sticky Bottom Ticker: System Health */}
      <div className="fixed bottom-0 left-0 w-full bg-[#0f0f11] border-t border-[#3684ca] py-1 px-4 z-40 flex items-center gap-8 overflow-hidden shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
         <div className="flex items-center gap-2 shrink-0">
            <Database size={12} className="text-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Audit Trail: Secure</span>
         </div>
         <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap text-[10px] font-mono text-[#96a3ae] flex gap-12">
               <span>ROSTER SYNC: COMPLETE [10:00Z]</span>
               <span>BACKUP STATUS: ENCRYPTED_OFFSITE_OK</span>
               <span>FISCAL REPORTING: Q3 FINALIZED</span>
               <span>GOVERNANCE: BYLAWS V4.1 ACTIVE</span>
            </div>
         </div>
      </div>

    </div>
  );
};

export default HQView;
