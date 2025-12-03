
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
  Map,
  Command,
  Filter,
  Calendar,
  ExternalLink,
  Info,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Eye,
  AlertCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
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
  Legend,
  LineChart,
  Line
} from 'recharts';
import { MetricCard, Card, SectionHeader, SecurityBadges, Badge } from '../components/Shared';

// --- Mock Data for Board View ---

// Data for Sector Compliance HUD
const COMPLIANCE_SECTORS = [
  {
    name: 'WEST SECTOR',
    code: 'SEC-W',
    value: 96,
    status: 'OPTIMAL',
    color: 'text-emerald-500',
    bar: 'bg-emerald-500',
    squadrons: [
      { id: 'SQ-201', name: 'Seattle Squadron', score: 98 },
      { id: 'SQ-202', name: 'San Francisco Squadron', score: 95 },
      { id: 'SQ-203', name: 'Los Angeles Squadron', score: 94 }
    ]
  },
  {
    name: 'NORTH SECTOR',
    code: 'SEC-N',
    value: 92,
    status: 'STABLE',
    color: 'text-[#3684ca]',
    bar: 'bg-[#3684ca]',
    squadrons: [
      { id: 'SQ-301', name: 'Chicago Squadron', score: 93 },
      { id: 'SQ-302', name: 'Detroit Squadron', score: 91 }
    ]
  },
  {
    name: 'SOUTH SECTOR',
    code: 'SEC-S',
    value: 85,
    status: 'WARNING',
    color: 'text-amber-500',
    bar: 'bg-amber-500',
    squadrons: [
      { id: 'SQ-401', name: 'Houston Squadron', score: 87 },
      { id: 'SQ-402', name: 'Atlanta Squadron', score: 83 }
    ]
  },
  {
    name: 'CENTRAL SECTOR',
    code: 'SEC-C',
    value: 65,
    status: 'CRITICAL',
    color: 'text-red-500',
    bar: 'bg-red-500',
    squadrons: [
      { id: 'SQ-501', name: 'Denver Squadron', score: 68 },
      { id: 'SQ-502', name: 'Kansas City Squadron', score: 62 }
    ]
  },
];

// Historical trend data for metrics
const HISTORICAL_TRENDS = [
  { month: 'Jul', remediation: 65, fiscal: 88, roadmap: 75, system: 98 },
  { month: 'Aug', remediation: 70, fiscal: 92, roadmap: 82, system: 99 },
  { month: 'Sep', remediation: 73, fiscal: 95, roadmap: 87, system: 99 },
  { month: 'Oct', remediation: 78, fiscal: 98, roadmap: 92, system: 100 },
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
  { subject: 'Aerospace', A: 85, fullMark: 100, count: 142 },
  { subject: 'STEM', A: 92, fullMark: 100, count: 268 },
  { subject: 'Leadership', A: 74, fullMark: 100, count: 189 },
  { subject: 'Fitness', A: 98, fullMark: 100, count: 312 },
  { subject: 'Citizen', A: 82, fullMark: 100, count: 205 },
];

const TOP_ARTIFACTS = [
  {
    id: 'ART-901',
    title: 'Orbital Debris Mitigation Plan',
    cadet: 'C/Capt Reynolds',
    abstract: 'Novel approach using electrostatic nets for LEO cleanup.',
    fullDescription: 'This comprehensive analysis explores electromagnetic tether systems for debris capture in Low Earth Orbit. Reynolds demonstrates exceptional understanding of orbital mechanics and propulsion physics.',
    score: '4/4',
    reviewer: 'Dr. T. Martinez',
    date: '2023-10-15',
    squadron: 'SQ-101',
    loe: 'LOE-A',
    attachments: ['research_paper.pdf', 'simulation_data.xlsx', 'prototype_images.zip']
  },
  {
    id: 'ART-905',
    title: 'Cyber Defense Architecture',
    cadet: 'C/1Lt Chen',
    abstract: 'Hardening squadron comms against mock state-actor intrusion.',
    fullDescription: 'Chen developed a multi-layered defense system capable of detecting and responding to advanced persistent threats. Implementation includes IDS, honeypots, and automated response protocols.',
    score: '4/4',
    reviewer: 'Maj. K. Singh',
    date: '2023-10-18',
    squadron: 'SQ-205',
    loe: 'LOE-B',
    attachments: ['network_diagram.pdf', 'threat_model.docx']
  },
  {
    id: 'ART-912',
    title: 'Ethical Leadership Case Study',
    cadet: 'C/MSgt O\'Malley',
    abstract: 'Analysis of decision making during crisis simulation.',
    fullDescription: 'O\'Malley examines the ethical dimensions of command decisions under pressure, citing historical examples and applying contemporary ethical frameworks to squadron leadership scenarios.',
    score: '3.5/4',
    reviewer: 'Lt Col. R. Johnson',
    date: '2023-10-20',
    squadron: 'SQ-304',
    loe: 'LOE-C',
    attachments: ['case_study.pdf', 'interview_transcripts.pdf']
  },
];

const FIDUCIARY_LOG = [
  {
    id: 'PAY-23-401',
    vendor: 'AeroTech Supplies',
    amount: '$12,500',
    status: 'PAID: 2023-11-20',
    code: 'OPS-EQUIP',
    requestor: 'Col. B. Miller',
    purpose: 'Rocketry lab equipment and materials for Q4 STEM programs',
    approvalChain: [
      { role: 'Requestor', name: 'Col. B. Miller', date: '2023-11-01', status: 'Submitted' },
      { role: 'Treasurer', name: 'J. Bond', date: '2023-11-05', status: 'Approved' },
      { role: 'CEO', name: 'Gen. A. Smith', date: '2023-11-08', status: 'Approved' },
      { role: 'Payment', name: 'SFA Partner', date: '2023-11-20', status: 'Executed' }
    ],
    documents: ['invoice_001.pdf', 'receipt_001.pdf', 'purchase_order.pdf']
  },
  {
    id: 'PAY-23-402',
    vendor: 'Region 1 Venue',
    amount: '$4,200',
    status: 'PENDING CEO APPRV',
    code: 'EVT-VENUE',
    requestor: 'Maj. T. Nelson',
    purpose: 'Regional FTX venue rental and catering services',
    approvalChain: [
      { role: 'Requestor', name: 'Maj. T. Nelson', date: '2023-11-15', status: 'Submitted' },
      { role: 'Treasurer', name: 'J. Bond', date: '2023-11-18', status: 'Approved' },
      { role: 'CEO', name: 'Gen. A. Smith', date: 'Pending', status: 'Pending' }
    ],
    documents: ['venue_contract.pdf', 'quote.pdf']
  },
  {
    id: 'PAY-23-403',
    vendor: 'Logistics Partner',
    amount: '$1,850',
    status: 'PENDING TREASURER',
    code: 'OPS-SHIP',
    requestor: 'Capt. A. Rodriguez',
    purpose: 'Uniform shipment to new squadron locations',
    approvalChain: [
      { role: 'Requestor', name: 'Capt. A. Rodriguez', date: '2023-11-22', status: 'Submitted' },
      { role: 'Treasurer', name: 'J. Bond', date: 'Pending', status: 'Pending' }
    ],
    documents: ['shipping_manifest.pdf']
  },
];

const WAIVER_LOG = [
  {
    id: 'WVR-101',
    unit: 'SQ-102',
    type: 'Medical Exemption',
    deadline: 'PERMANENT',
    status: 'APPROVED',
    remediation: 'ALT TEST ASSIGNED',
    cadet: 'Cdt. J. Williams',
    reason: 'Documented asthma condition prevents standard run test',
    approver: 'Regional Medical Officer',
    approvedDate: '2023-09-15',
    alternativeRequirement: 'Swimming proficiency test substituted',
    reviewDate: '2024-09-15'
  },
  {
    id: 'COR-205',
    unit: 'SQ-304',
    type: 'Corrective Action',
    deadline: '7 DAYS REMAINING',
    status: 'OPEN',
    remediation: 'AUDIT IN PROGRESS',
    cadet: 'Cdt. M. Thompson',
    reason: 'Failed to submit required safety checklist for lab activity',
    assignedBy: 'Squadron Commander',
    issueDate: '2023-11-18',
    requiredAction: 'Complete safety certification course and resubmit documentation',
    progress: '60%'
  },
];

// Cadet readiness breakdown by region
const READINESS_BY_REGION = [
  { region: 'West', rubric: 3.6, qpt: 99, presence: 95, cadets: 245 },
  { region: 'North', rubric: 3.4, qpt: 98, presence: 92, cadets: 312 },
  { region: 'South', rubric: 3.2, qpt: 97, presence: 89, cadets: 198 },
  { region: 'Central', rubric: 3.1, qpt: 96, presence: 88, cadets: 142 },
];

const HQView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'audit'>('overview');
  const [aiMode, setAiMode] = useState(false);
  const [time, setTime] = useState(new Date());

  // Modal & Panel States
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<any | null>(null);
  const [selectedSector, setSelectedSector] = useState<any | null>(null);
  const [selectedWaiver, setSelectedWaiver] = useState<any | null>(null);
  const [selectedLOE, setSelectedLOE] = useState<any | null>(null);
  const [selectedReadinessMetric, setSelectedReadinessMetric] = useState<string | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [systemHealthOpen, setSystemHealthOpen] = useState(false);
  const [aiAuditOpen, setAiAuditOpen] = useState(false);

  // Tooltips
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Command Palette handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getMetricHistoricalData = (metric: string) => {
    const mapping: Record<string, keyof typeof HISTORICAL_TRENDS[0]> = {
      'Risk Remediation': 'remediation',
      'Fiscal Compliance': 'fiscal',
      'Strategic Roadmap': 'roadmap',
      'System Health': 'system'
    };
    return HISTORICAL_TRENDS.map(d => ({ month: d.month, value: d[mapping[metric]] || 0 }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 relative font-sans">

      {/* Header with Board-Specific Tools */}
      <SectionHeader
        title="Board Command"
        subtitle="Strategic Oversight • Fiduciary Control"
        rightContent={
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAiAuditOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border transition-all duration-300 ${aiMode ? 'bg-[#3684ca] border-[#3684ca] text-white shadow-[0_0_15px_rgba(54,132,202,0.4)]' : 'bg-transparent border-[#3684ca]/30 text-[#3684ca] hover:bg-[#3684ca]/10'}`}
            >
              {aiMode ? <Sparkles size={14} className="animate-spin-slow" /> : <Brain size={14} />}
              <span className="text-[10px] font-bold uppercase tracking-widest">{aiMode ? 'AI Audit: ACTIVE' : 'AI Audit'}</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#5f686e]/30 hover:border-[#3684ca] transition-all bg-[#252525]"
              >
                <div className="w-6 h-6 rounded-full bg-[#3684ca]/20 flex items-center justify-center text-xs font-bold text-[#3684ca]">
                  V
                </div>
                <ChevronDown size={12} className="text-[#96a3ae]" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-[#191818] border border-[#3684ca]/30 rounded-sm shadow-2xl z-50 animate-in slide-in-from-top-2">
                  <div className="p-4 border-b border-[#5f686e]/20">
                    <div className="text-sm font-bold text-white">Chairperson Vance</div>
                    <div className="text-[10px] text-[#96a3ae] font-mono mt-1">BOARD OF DIRECTORS • L5</div>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-xs text-[#c7d7e2] hover:bg-[#252525] rounded-sm transition-colors">
                      <Eye size={14} />
                      View Permissions
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-xs text-[#c7d7e2] hover:bg-[#252525] rounded-sm transition-colors">
                      <Settings size={14} />
                      Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-sm transition-colors mt-2 border-t border-[#5f686e]/20 pt-2">
                      <LogOut size={14} />
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="text-right hidden md:block">
              <div className="text-xl font-bold text-white font-mono leading-none">{time.toLocaleTimeString([], { hour12: false })}</div>
              <div className="text-[10px] text-[#96a3ae] uppercase tracking-widest font-mono">Zulu Time</div>
            </div>
          </div>
        }
      />

      {/* --- Row 1: Strategic Health Indicators (KPIs) - Now Clickable --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Shield, label: 'Risk Remediation', value: '78%', subtext: 'Critical Findings Resolved', trend: 'up', trendValue: '+12% QoQ', updated: '2 hours ago' },
          { icon: Landmark, label: 'Fiscal Compliance', value: 'COMPLIANT', subtext: 'SFA Agreement Status', trend: 'neutral', trendValue: 'Audited', color: 'green', updated: '1 day ago' },
          { icon: TrendingUp, label: 'Strategic Roadmap', value: 'ON TRACK', subtext: 'Charter Milestones', trend: 'up', trendValue: 'Q3 Goals Met', updated: '3 hours ago' },
          { icon: Server, label: 'System Health', value: 'NOMINAL', subtext: 'Audit Trail Active', trend: 'neutral', trendValue: 'Sync: 100%', updated: 'Real-time' }
        ].map((card, i) => (
          <div
            key={i}
            className="relative group cursor-pointer"
            onClick={() => setSelectedMetric(card.label)}
            onMouseEnter={() => setActiveTooltip(card.label)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <MetricCard {...card} />
            {activeTooltip === card.label && (
              <div className="absolute top-0 right-0 bg-[#191818] border border-[#3684ca] px-2 py-1 rounded text-[9px] text-[#3684ca] font-mono whitespace-nowrap animate-in fade-in zoom-in-95 duration-200 z-10">
                Updated: {card.updated}
              </div>
            )}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#3684ca] rounded-sm transition-all pointer-events-none"></div>
          </div>
        ))}
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

        {/* Fiduciary Oversight (Span 8) - Clickable Rows */}
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
                          <tr
                            key={i}
                            className="hover:bg-[#252525] transition-all cursor-pointer group"
                            onClick={() => setSelectedTransaction(row)}
                          >
                             <td className="py-3 pl-2 font-mono text-[#3684ca] text-xs group-hover:text-white transition-colors">{row.id}</td>
                             <td className="py-3 font-bold text-white text-xs">{row.vendor}</td>
                             <td className="py-3 font-mono text-[#c7d7e2]">{row.amount}</td>
                             <td className="py-3">
                                <button
                                  className="hover:scale-105 transition-transform"
                                  onClick={(e) => { e.stopPropagation(); setSelectedTransaction(row); }}
                                >
                                  <Badge status={row.status.includes('PAID') ? 'success' : 'warning'}>{row.status}</Badge>
                                </button>
                             </td>
                             <td className="py-3 text-right pr-2 font-mono text-[10px] text-[#5f686e]">{row.code}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </Card>

        {/* Governance Vault (Span 4) - Clickable Documents */}
        <Card title="Governance Vault" variant="default" className="lg:col-span-4 flex flex-col">
           <div className="space-y-3 flex-1">
              {[
                 { name: 'SFCC Bylaws', id: 'DOC-001', version: 'v4.1', lastUpdated: '2023-08-15', owner: 'Board of Directors' },
                 { name: 'Ops Playbook v3.0', id: 'DOC-OPS', version: 'v3.0', lastUpdated: '2023-10-01', owner: 'Executive Staff' },
                 { name: 'DTM 25-02 (Financial)', id: 'DOC-FIN', version: 'v2.5', lastUpdated: '2023-09-20', owner: 'CFO/Treasurer' },
                 { name: 'Fiscal Sponsor Agrmt', id: 'DOC-SFA', version: 'v1.2', lastUpdated: '2023-07-10', owner: 'External Partner' },
              ].map((doc, i) => (
                 <div
                   key={i}
                   className="flex items-center justify-between p-3 bg-[#191818] border border-[#5f686e]/30 rounded-sm hover:border-[#3684ca] hover:shadow-[0_0_15px_rgba(54,132,202,0.2)] hover:scale-[1.02] group transition-all cursor-pointer"
                   onClick={() => setSelectedDocument(doc)}
                 >
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-[#252525] rounded text-[#96a3ae] group-hover:text-[#3684ca] transition-colors">
                          <Lock size={16} />
                       </div>
                       <div>
                          <div className="text-xs font-bold text-white group-hover:text-[#3684ca] transition-colors">{doc.name}</div>
                          <div className="text-[9px] font-mono text-[#5f686e]">ID: {doc.id}</div>
                       </div>
                    </div>
                    <ChevronRight size={14} className="text-[#5f686e] group-hover:text-white group-hover:translate-x-1 transition-all" />
                 </div>
              ))}
           </div>
           <button className="w-full mt-6 py-3 border border-dashed border-[#5f686e]/50 text-[#96a3ae] text-[10px] font-bold uppercase tracking-widest hover:bg-[#252525] hover:text-white hover:border-[#3684ca] transition-all flex items-center justify-center gap-2">
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

               {/* 1. Promotion & Readiness Stats - Clickable Metrics */}
               <Card title="Cadet Readiness Profile" variant="glass" className="cursor-pointer hover:shadow-[0_0_20px_rgba(54,132,202,0.2)] transition-all">
                  <div className="flex items-center justify-around py-4">
                     <div
                       className="text-center cursor-pointer hover:scale-105 transition-transform"
                       onClick={() => setSelectedReadinessMetric('rubric')}
                     >
                        <div className="text-[10px] text-[#96a3ae] uppercase tracking-widest mb-1 flex items-center gap-1 justify-center">
                          Rubric Median
                          <Info size={10} className="opacity-50" />
                        </div>
                        <div className="text-4xl font-bold text-white font-mono">3.4<span className="text-lg text-[#5f686e]">/4</span></div>
                        <div className="text-[9px] text-emerald-500 font-bold mt-1">+0.2 vs Last Qtr</div>
                     </div>
                     <div className="w-px h-16 bg-[#5f686e]/30"></div>
                     <div
                       className="text-center cursor-pointer hover:scale-105 transition-transform"
                       onClick={() => setSelectedReadinessMetric('qpt')}
                     >
                        <div className="text-[10px] text-[#96a3ae] uppercase tracking-widest mb-1 flex items-center gap-1 justify-center">
                          QPT Compliance
                          <Info size={10} className="opacity-50" />
                        </div>
                        <div className="text-4xl font-bold text-emerald-500 font-mono">98%</div>
                        <div className="text-[9px] text-[#5f686e] font-bold mt-1">Physical Readiness</div>
                     </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#5f686e]/20">
                     <div
                       className="flex justify-between items-center mb-2 cursor-pointer hover:opacity-80 transition-opacity"
                       onClick={() => setSelectedReadinessMetric('presence')}
                     >
                        <span className="text-xs font-bold text-[#c7d7e2] flex items-center gap-1">
                          Presence Board Pass Rate
                          <Info size={10} className="text-[#5f686e]" />
                        </span>
                        <span className="text-xs font-mono text-white">92%</span>
                     </div>
                     <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden">
                        <div className="h-full bg-[#3684ca] w-[92%]"></div>
                     </div>
                  </div>
               </Card>

               {/* 2. LOE Strategic Balance (RADAR) - Clickable Axes */}
               <Card title="LOE Strategic Balance" variant="glass">
                  <div className="h-64 w-full -ml-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                          cx="50%"
                          cy="50%"
                          outerRadius="70%"
                          data={LOE_RADAR_DATA}
                          onClick={(data) => {
                            if (data && data.activeLabel) {
                              const loe = LOE_RADAR_DATA.find(l => l.subject === data.activeLabel);
                              if (loe) setSelectedLOE(loe);
                            }
                          }}
                        >
                           <PolarGrid stroke="#5f686e" strokeOpacity={0.3} />
                           <PolarAngleAxis
                             dataKey="subject"
                             tick={{ fill: '#96a3ae', fontSize: 10, fontWeight: 'bold', cursor: 'pointer' }}
                           />
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
                              contentStyle={{ backgroundColor: '#191818', borderColor: '#3684ca', color: '#fff', fontSize: 11 }}
                              itemStyle={{ color: '#fff' }}
                              formatter={(value: any, name: string, props: any) => [
                                `${value}% proficiency (${props.payload.count} artifacts)`,
                                'LOE Performance'
                              ]}
                           />
                        </RadarChart>
                     </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-[9px] text-[#5f686e] font-mono uppercase -mt-4 mb-2">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#3684ca]/30 border border-[#3684ca] rounded-full"></div>
                        <span>Click axis to drill-down</span>
                     </div>
                  </div>
               </Card>

               {/* 3. Top Artifacts Highlight - Clickable Cards */}
               <Card title="Cohort Highlights" variant="glass">
                  <div className="space-y-3">
                     {TOP_ARTIFACTS.map((art, i) => (
                        <div
                          key={i}
                          className="bg-[#252525]/30 p-3 rounded border-l-2 border-[#3684ca] hover:bg-[#252525] hover:shadow-[0_0_15px_rgba(54,132,202,0.1)] hover:scale-[1.02] transition-all cursor-pointer group"
                          onClick={() => setSelectedArtifact(art)}
                        >
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

         {/* National Compliance HUD - Clickable Sectors */}
         <Card title="Sector Intelligence Grid" className="lg:col-span-6 flex flex-col" variant="glass">
            <div className="flex-1 p-4 bg-[#0f0f11] rounded-sm border border-[#5f686e]/20 relative overflow-hidden flex flex-col justify-between">
               <div className="absolute inset-0 pointer-events-none opacity-20"
                    style={{ backgroundImage: 'linear-gradient(#3684ca 1px, transparent 1px), linear-gradient(90deg, #3684ca 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
               </div>
               <div className="absolute top-0 left-0 w-full h-1 bg-[#3684ca]/50 shadow-[0_0_10px_#3684ca] animate-scan"></div>

               <div className="flex justify-between items-center mb-6 relative z-10">
                  <div className="flex items-center gap-2">
                     <Target className="text-[#3684ca] animate-pulse" size={16} />
                     <span className="text-[10px] font-mono text-[#3684ca] uppercase tracking-widest">Target Acquisition: Compliance</span>
                  </div>
                  <div className="px-2 py-0.5 bg-[#252525] border border-[#5f686e]/50 rounded text-[9px] font-mono text-[#5f686e]">
                     REF: CCR-20-2
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                  {COMPLIANCE_SECTORS.map((sector, i) => (
                     <div
                       key={i}
                       className="group bg-[#191818]/80 border border-[#5f686e]/30 hover:border-[#3684ca] hover:shadow-[0_0_15px_rgba(54,132,202,0.2)] hover:scale-[1.02] p-3 rounded-sm transition-all cursor-pointer"
                       onClick={() => setSelectedSector(sector)}
                     >
                        <div className="flex justify-between items-start mb-2">
                           <div>
                              <div className="text-[10px] font-mono text-[#5f686e] mb-0.5">{sector.code}</div>
                              <div className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-[#3684ca] transition-colors">{sector.name}</div>
                           </div>
                           <button
                             className={`text-[9px] font-bold px-1.5 py-0.5 rounded border border-current ${sector.color} bg-opacity-10 hover:scale-110 transition-transform`}
                             onClick={(e) => { e.stopPropagation(); setSelectedSector(sector); }}
                           >
                              {sector.status}
                           </button>
                        </div>

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

         {/* Enhanced Waiver/Action Log - Clickable Rows */}
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
                        <tr
                          key={i}
                          className="bg-[#252525] group hover:bg-[#3684ca]/5 hover:shadow-[0_0_10px_rgba(54,132,202,0.1)] transition-all cursor-pointer"
                          onClick={() => setSelectedWaiver(row)}
                        >
                           <td className="py-3 pl-4 rounded-l-sm border-l-2 border-transparent group-hover:border-[#3684ca]">
                              <span className="font-mono text-xs text-[#c7d7e2] group-hover:text-white transition-colors">{row.id}</span>
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

      {/* Sticky Bottom Ticker: System Health - Clickable */}
      <div className="fixed bottom-0 left-0 w-full bg-[#0f0f11] border-t border-[#3684ca] py-1 px-4 z-40 flex items-center gap-8 overflow-hidden shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
         <button
           className="flex items-center gap-2 shrink-0 hover:text-white transition-colors"
           onClick={() => setSystemHealthOpen(true)}
         >
            <Database size={12} className="text-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Audit Trail: Secure</span>
         </button>
         <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap text-[10px] font-mono text-[#96a3ae] flex gap-12">
               <span>ROSTER SYNC: COMPLETE [10:00Z]</span>
               <span>BACKUP STATUS: ENCRYPTED_OFFSITE_OK</span>
               <span>FISCAL REPORTING: Q3 FINALIZED</span>
               <span>GOVERNANCE: BYLAWS V4.1 ACTIVE</span>
            </div>
         </div>
         <button
           className="text-[10px] font-mono text-[#96a3ae] hover:text-white transition-colors uppercase tracking-widest"
           onClick={() => setCommandPaletteOpen(true)}
         >
            <Command size={12} className="inline mr-1" />
            CMD+K
         </button>
      </div>

      {/* ========== MODALS & PANELS ========== */}

      {/* Command Palette */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#191818] border border-[#3684ca] rounded-sm shadow-2xl animate-in slide-in-from-top-4 duration-300">
            <div className="p-4 border-b border-[#5f686e]/20 flex items-center gap-3">
              <Search size={16} className="text-[#3684ca]" />
              <input
                type="text"
                placeholder="Search commands, navigate, filter..."
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-[#5f686e]"
                autoFocus
              />
              <button onClick={() => setCommandPaletteOpen(false)} className="text-[#5f686e] hover:text-white">
                <X size={16} />
              </button>
            </div>
            <div className="p-2 max-h-96 overflow-y-auto">
              {[
                { category: 'Navigation', items: ['View Fiduciary Table', 'View Governance Vault', 'View Sector Grid', 'View Waiver Log'] },
                { category: 'Actions', items: ['Export Board Packet', 'Generate Audit Report', 'Download Financials', 'Review Pending Approvals'] },
                { category: 'Filters', items: ['Show Critical Only', 'Show Recent Activity', 'Show Pending Items', 'Show Completed'] }
              ].map((section, i) => (
                <div key={i} className="mb-4">
                  <div className="text-[10px] text-[#5f686e] font-bold uppercase tracking-widest mb-2 px-2">{section.category}</div>
                  {section.items.map((item, j) => (
                    <button
                      key={j}
                      className="w-full text-left px-3 py-2 text-xs text-[#c7d7e2] hover:bg-[#252525] rounded-sm transition-colors"
                      onClick={() => setCommandPaletteOpen(false)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Metric Detail Modal */}
      {selectedMetric && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-[#191818] border border-[#3684ca] rounded-sm shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-[#5f686e]/20 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">{selectedMetric}</h2>
                <p className="text-xs text-[#96a3ae] mt-1 font-mono">HISTORICAL TREND ANALYSIS • 4-MONTH VIEW</p>
              </div>
              <button onClick={() => setSelectedMetric(null)} className="text-[#5f686e] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={getMetricHistoricalData(selectedMetric)}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3684ca" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3684ca" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#5f686e" style={{ fontSize: 11 }} />
                    <YAxis stroke="#5f686e" style={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#191818', borderColor: '#3684ca', fontSize: 11 }}
                      labelStyle={{ color: '#c7d7e2' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#3684ca" strokeWidth={2} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'West Region', value: '92%', status: 'success' },
                  { label: 'North Region', value: '85%', status: 'warning' },
                  { label: 'South Region', value: '76%', status: 'warning' },
                  { label: 'Central Region', value: '68%', status: 'danger' }
                ].map((region, i) => (
                  <div key={i} className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                    <div className="text-[10px] text-[#96a3ae] uppercase tracking-wider mb-1">{region.label}</div>
                    <div className="text-2xl font-bold text-white font-mono">{region.value}</div>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 bg-[#3684ca] hover:bg-[#3684ca]/80 text-white font-bold uppercase tracking-widest text-xs rounded-sm transition-all">
                Export Detailed Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Detail Slide-Out Panel */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl h-full bg-[#191818] border-l border-[#3684ca] shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 bg-[#191818] p-6 border-b border-[#5f686e]/20 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold text-white font-mono">{selectedTransaction.id}</h2>
                <p className="text-xs text-[#96a3ae] mt-1">TRANSACTION DETAIL & APPROVAL CHAIN</p>
              </div>
              <button onClick={() => setSelectedTransaction(null)} className="text-[#5f686e] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                  <div className="text-[10px] text-[#5f686e] uppercase tracking-wider mb-1">Vendor</div>
                  <div className="text-sm font-bold text-white">{selectedTransaction.vendor}</div>
                </div>
                <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                  <div className="text-[10px] text-[#5f686e] uppercase tracking-wider mb-1">Amount</div>
                  <div className="text-sm font-bold text-white font-mono">{selectedTransaction.amount}</div>
                </div>
                <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                  <div className="text-[10px] text-[#5f686e] uppercase tracking-wider mb-1">Requestor</div>
                  <div className="text-sm font-bold text-white">{selectedTransaction.requestor}</div>
                </div>
                <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                  <div className="text-[10px] text-[#5f686e] uppercase tracking-wider mb-1">Ledger Code</div>
                  <div className="text-sm font-bold text-white font-mono">{selectedTransaction.code}</div>
                </div>
              </div>

              <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                <div className="text-[10px] text-[#5f686e] uppercase tracking-wider mb-2">Purpose</div>
                <p className="text-xs text-white leading-relaxed">{selectedTransaction.purpose}</p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Activity size={14} className="text-[#3684ca]" />
                  Approval Chain Timeline
                </h3>
                <div className="space-y-4 pl-4 border-l-2 border-[#3684ca]/30">
                  {selectedTransaction.approvalChain.map((step: any, i: number) => (
                    <div key={i} className="relative pl-6">
                      <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-[#191818] ${
                        step.status === 'Executed' ? 'bg-emerald-500' :
                        step.status === 'Approved' ? 'bg-[#3684ca]' :
                        step.status === 'Pending' ? 'bg-amber-500' : 'bg-[#5f686e]'
                      }`}></div>
                      <div className="bg-[#252525]/50 p-3 rounded-sm">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-bold text-white">{step.role}</span>
                          <Badge status={
                            step.status === 'Executed' ? 'success' :
                            step.status === 'Approved' ? 'info' :
                            step.status === 'Pending' ? 'warning' : 'neutral'
                          }>{step.status}</Badge>
                        </div>
                        <div className="text-[10px] text-[#96a3ae]">{step.name}</div>
                        <div className="text-[9px] text-[#5f686e] font-mono mt-1">{step.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Attached Documents</h3>
                <div className="space-y-2">
                  {selectedTransaction.documents.map((doc: string, i: number) => (
                    <button key={i} className="w-full flex items-center justify-between p-3 bg-[#252525] border border-[#5f686e]/30 hover:border-[#3684ca] rounded-sm transition-all group">
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-[#3684ca]" />
                        <span className="text-xs text-white">{doc}</span>
                      </div>
                      <Download size={14} className="text-[#5f686e] group-hover:text-[#3684ca]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Slide-Out */}
      {selectedDocument && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl h-full bg-[#191818] border-l border-[#3684ca] shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 bg-[#191818] p-6 border-b border-[#5f686e]/20 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedDocument.name}</h2>
                <p className="text-xs text-[#96a3ae] mt-1 font-mono">{selectedDocument.id} • {selectedDocument.version}</p>
              </div>
              <button onClick={() => setSelectedDocument(null)} className="text-[#5f686e] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                  <div className="text-[10px] text-[#5f686e] uppercase tracking-wider mb-1">Version</div>
                  <div className="text-sm font-bold text-white font-mono">{selectedDocument.version}</div>
                </div>
                <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                  <div className="text-[10px] text-[#5f686e] uppercase tracking-wider mb-1">Last Updated</div>
                  <div className="text-sm font-bold text-white">{selectedDocument.lastUpdated}</div>
                </div>
                <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30 col-span-2">
                  <div className="text-[10px] text-[#5f686e] uppercase tracking-wider mb-1">Document Owner</div>
                  <div className="text-sm font-bold text-white">{selectedDocument.owner}</div>
                </div>
              </div>

              <div className="bg-[#252525] p-6 rounded-sm border border-[#5f686e]/30 min-h-96 flex items-center justify-center">
                <div className="text-center">
                  <Lock size={48} className="text-[#3684ca] mx-auto mb-4 opacity-50" />
                  <p className="text-sm text-[#96a3ae]">Secure Document Viewer</p>
                  <p className="text-xs text-[#5f686e] mt-1">Preview functionality requires authentication</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-[#3684ca] hover:bg-[#3684ca]/80 text-white font-bold uppercase tracking-widest text-xs rounded-sm transition-all flex items-center justify-center gap-2">
                  <Download size={14} />
                  Download PDF
                </button>
                <button className="flex-1 py-3 bg-[#252525] hover:bg-[#252525]/80 border border-[#5f686e]/30 hover:border-[#3684ca] text-white font-bold uppercase tracking-widest text-xs rounded-sm transition-all flex items-center justify-center gap-2">
                  <ExternalLink size={14} />
                  Open External
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Artifact Detail Modal */}
      {selectedArtifact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-[#191818] border border-[#3684ca] rounded-sm shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#5f686e]/20 flex items-center justify-between sticky top-0 bg-[#191818] z-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge status="info">{selectedArtifact.loe}</Badge>
                  <span className="text-[10px] font-mono text-[#5f686e]">{selectedArtifact.id}</span>
                </div>
                <h2 className="text-xl font-bold text-white">{selectedArtifact.title}</h2>
                <p className="text-xs text-[#96a3ae] mt-1">{selectedArtifact.cadet} • {selectedArtifact.squadron}</p>
              </div>
              <button onClick={() => setSelectedArtifact(null)} className="text-[#5f686e] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                  <div className="text-[10px] text-[#5f686e] uppercase tracking-wider mb-1">Score</div>
                  <div className="text-2xl font-bold text-white font-mono">{selectedArtifact.score}</div>
                </div>
                <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                  <div className="text-[10px] text-[#5f686e] uppercase tracking-wider mb-1">Reviewer</div>
                  <div className="text-sm font-bold text-white">{selectedArtifact.reviewer}</div>
                </div>
                <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                  <div className="text-[10px] text-[#5f686e] uppercase tracking-wider mb-1">Date</div>
                  <div className="text-sm font-bold text-white">{selectedArtifact.date}</div>
                </div>
              </div>

              <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                <h3 className="text-xs font-bold text-[#96a3ae] uppercase tracking-wider mb-2">Mission Brief</h3>
                <p className="text-sm text-white leading-relaxed">{selectedArtifact.fullDescription}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#96a3ae] uppercase tracking-wider mb-3">Attached Files</h3>
                <div className="space-y-2">
                  {selectedArtifact.attachments.map((file: string, i: number) => (
                    <button key={i} className="w-full flex items-center justify-between p-3 bg-[#252525] border border-[#5f686e]/30 hover:border-[#3684ca] rounded-sm transition-all group">
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-[#3684ca]" />
                        <span className="text-xs text-white">{file}</span>
                      </div>
                      <Download size={14} className="text-[#5f686e] group-hover:text-[#3684ca]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sector Drill-Down Panel */}
      {selectedSector && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl h-full bg-[#191818] border-l border-[#3684ca] shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 bg-[#191818] p-6 border-b border-[#5f686e]/20 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">{selectedSector.name}</h2>
                <p className="text-xs text-[#96a3ae] mt-1 font-mono">{selectedSector.code} • COMPLIANCE: {selectedSector.value}%</p>
              </div>
              <button onClick={() => setSelectedSector(null)} className="text-[#5f686e] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sector Status</h3>
                  <Badge status={
                    selectedSector.status === 'OPTIMAL' ? 'success' :
                    selectedSector.status === 'STABLE' ? 'info' :
                    selectedSector.status === 'WARNING' ? 'warning' : 'danger'
                  }>{selectedSector.status}</Badge>
                </div>
                <div className="h-2 bg-[#191818] rounded-full overflow-hidden">
                  <div className={`h-full ${selectedSector.bar}`} style={{ width: `${selectedSector.value}%` }}></div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Squadron Breakdown</h3>
                <div className="space-y-3">
                  {selectedSector.squadrons.map((sq: any, i: number) => (
                    <div key={i} className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30 hover:border-[#3684ca] transition-all cursor-pointer group">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-[#3684ca] transition-colors">{sq.name}</div>
                          <div className="text-[10px] font-mono text-[#5f686e] mt-1">{sq.id}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-white font-mono">{sq.score}%</div>
                          <div className="text-[9px] text-[#96a3ae]">Compliance</div>
                        </div>
                      </div>
                      <div className="h-1 bg-[#191818] rounded-full overflow-hidden">
                        <div className={`h-full ${selectedSector.bar}`} style={{ width: `${sq.score}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Waiver Detail Panel */}
      {selectedWaiver && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl h-full bg-[#191818] border-l border-[#3684ca] shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 bg-[#191818] p-6 border-b border-[#5f686e]/20 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold text-white font-mono">{selectedWaiver.id}</h2>
                <p className="text-xs text-[#96a3ae] mt-1">{selectedWaiver.type} • {selectedWaiver.unit}</p>
              </div>
              <button onClick={() => setSelectedWaiver(null)} className="text-[#5f686e] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-[#96a3ae] uppercase tracking-wider">Status</span>
                  <Badge status={selectedWaiver.status === 'APPROVED' ? 'success' : 'warning'}>{selectedWaiver.status}</Badge>
                </div>
                {selectedWaiver.cadet && (
                  <div className="text-sm text-white mb-1">
                    <span className="text-[#5f686e]">Cadet:</span> {selectedWaiver.cadet}
                  </div>
                )}
              </div>

              <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                <h3 className="text-xs font-bold text-[#96a3ae] uppercase tracking-wider mb-2">Reason</h3>
                <p className="text-sm text-white leading-relaxed">{selectedWaiver.reason}</p>
              </div>

              {selectedWaiver.alternativeRequirement && (
                <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                  <h3 className="text-xs font-bold text-[#96a3ae] uppercase tracking-wider mb-2">Alternative Requirement</h3>
                  <p className="text-sm text-white leading-relaxed">{selectedWaiver.alternativeRequirement}</p>
                </div>
              )}

              {selectedWaiver.requiredAction && (
                <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                  <h3 className="text-xs font-bold text-[#96a3ae] uppercase tracking-wider mb-2">Required Action</h3>
                  <p className="text-sm text-white leading-relaxed mb-3">{selectedWaiver.requiredAction}</p>
                  {selectedWaiver.progress && (
                    <>
                      <div className="text-[10px] text-[#96a3ae] mb-1">Progress: {selectedWaiver.progress}</div>
                      <div className="h-2 bg-[#191818] rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: selectedWaiver.progress }}></div>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {selectedWaiver.approver && (
                  <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                    <div className="text-[10px] text-[#5f686e] uppercase tracking-wider mb-1">Approver</div>
                    <div className="text-sm font-bold text-white">{selectedWaiver.approver}</div>
                  </div>
                )}
                {selectedWaiver.approvedDate && (
                  <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30">
                    <div className="text-[10px] text-[#5f686e] uppercase tracking-wider mb-1">Approved Date</div>
                    <div className="text-sm font-bold text-white">{selectedWaiver.approvedDate}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOE Drill-Down Modal */}
      {selectedLOE && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-[#191818] border border-[#3684ca] rounded-sm shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#5f686e]/20 flex items-center justify-between sticky top-0 bg-[#191818] z-10">
              <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">LOE: {selectedLOE.subject}</h2>
                <p className="text-xs text-[#96a3ae] mt-1">PROFICIENCY: {selectedLOE.A}% • {selectedLOE.count} ARTIFACTS</p>
              </div>
              <button onClick={() => setSelectedLOE(null)} className="text-[#5f686e] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#96a3ae] uppercase tracking-wider">Cohort Performance</span>
                  <span className="text-2xl font-bold text-[#3684ca] font-mono">{selectedLOE.A}%</span>
                </div>
                <div className="h-2 bg-[#191818] rounded-full overflow-hidden">
                  <div className="h-full bg-[#3684ca]" style={{ width: `${selectedLOE.A}%` }}></div>
                </div>
              </div>

              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Top Artifacts in Category</h3>
              <div className="space-y-3">
                {TOP_ARTIFACTS.filter(a => a.loe.includes(selectedLOE.subject.substring(0, 1).toUpperCase())).map((art, i) => (
                  <button
                    key={i}
                    className="w-full text-left bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30 hover:border-[#3684ca] transition-all group"
                    onClick={() => { setSelectedLOE(null); setSelectedArtifact(art); }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#3684ca] transition-colors">{art.title}</h4>
                      <span className="text-xs font-mono text-[#3684ca]">{art.score}</span>
                    </div>
                    <p className="text-xs text-[#96a3ae] mb-2">{art.cadet}</p>
                    <p className="text-xs text-[#5f686e]">{art.abstract}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Readiness Metric Drill-Down Modal */}
      {selectedReadinessMetric && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-5xl bg-[#191818] border border-[#3684ca] rounded-sm shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#5f686e]/20 flex items-center justify-between sticky top-0 bg-[#191818] z-10">
              <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">
                  {selectedReadinessMetric === 'rubric' ? 'Rubric Median Breakdown' :
                   selectedReadinessMetric === 'qpt' ? 'QPT Compliance Analysis' :
                   'Presence Board Pass Rates'}
                </h2>
                <p className="text-xs text-[#96a3ae] mt-1">REGIONAL BREAKDOWN • CADET-LEVEL DATA</p>
              </div>
              <button onClick={() => setSelectedReadinessMetric(null)} className="text-[#5f686e] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-[#5f686e] font-mono text-[10px] uppercase tracking-wider">
                      <th className="pb-2 pl-4">Region</th>
                      <th className="pb-2">Rubric Median</th>
                      <th className="pb-2">QPT Pass Rate</th>
                      <th className="pb-2">Presence Board</th>
                      <th className="pb-2 text-right pr-4">Cadets</th>
                    </tr>
                  </thead>
                  <tbody>
                    {READINESS_BY_REGION.map((row, i) => (
                      <tr key={i} className="bg-[#252525] hover:bg-[#3684ca]/5 transition-all">
                        <td className="py-3 pl-4 rounded-l-sm font-bold text-white">{row.region}</td>
                        <td className="py-3 font-mono text-[#c7d7e2]">{row.rubric}/4</td>
                        <td className="py-3 font-mono text-[#c7d7e2]">{row.qpt}%</td>
                        <td className="py-3 font-mono text-[#c7d7e2]">{row.presence}%</td>
                        <td className="py-3 text-right pr-4 font-mono text-[#5f686e] rounded-r-sm">{row.cadets}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button className="w-full mt-6 py-3 bg-[#3684ca] hover:bg-[#3684ca]/80 text-white font-bold uppercase tracking-widest text-xs rounded-sm transition-all">
                Export Full Cadet Roster
              </button>
            </div>
          </div>
        </div>
      )}

      {/* System Health Modal */}
      {systemHealthOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-[#191818] border border-[#3684ca] rounded-sm shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-[#5f686e]/20 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">System Health Monitor</h2>
                <p className="text-xs text-[#96a3ae] mt-1 font-mono">REAL-TIME STATUS • ALL SYSTEMS NOMINAL</p>
              </div>
              <button onClick={() => setSystemHealthOpen(false)} className="text-[#5f686e] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {[
                { system: 'Audit Trail', status: 'SECURE', uptime: '99.99%', color: 'text-emerald-500' },
                { system: 'Database Sync', status: 'ONLINE', uptime: '100%', color: 'text-emerald-500' },
                { system: 'Backup System', status: 'ENCRYPTED', uptime: '100%', color: 'text-emerald-500' },
                { system: 'Authentication', status: 'ACTIVE', uptime: '99.97%', color: 'text-emerald-500' },
                { system: 'API Gateway', status: 'NOMINAL', uptime: '99.95%', color: 'text-emerald-500' }
              ].map((sys, i) => (
                <div key={i} className="bg-[#252525] p-4 rounded-sm border border-[#5f686e]/30 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Activity size={20} className={sys.color} />
                    <div>
                      <div className="text-sm font-bold text-white">{sys.system}</div>
                      <div className="text-[10px] text-[#5f686e] font-mono">Uptime: {sys.uptime}</div>
                    </div>
                  </div>
                  <Badge status="success">{sys.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Audit Modal */}
      {aiAuditOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-[#191818] border border-[#3684ca] rounded-sm shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#5f686e]/20 flex items-center justify-between sticky top-0 bg-[#191818] z-10">
              <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                  <Sparkles size={20} className="text-[#3684ca]" />
                  AI Audit Intelligence
                </h2>
                <p className="text-xs text-[#96a3ae] mt-1">RECENT ANALYSIS • FLAGGED ITEMS • RECOMMENDATIONS</p>
              </div>
              <button onClick={() => setAiAuditOpen(false)} className="text-[#5f686e] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-[#3684ca]/10 border border-[#3684ca]/30 p-4 rounded-sm">
                <div className="flex items-start gap-3">
                  <Sparkles size={18} className="text-[#3684ca] mt-1" />
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2">Latest Insight</h3>
                    <p className="text-xs text-[#c7d7e2] leading-relaxed">
                      Financial velocity analysis indicates surplus in LOE-B budget allocation. Recommend reallocation to scholarship fund before Q4 end to optimize non-profit utilization metrics.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Flagged Items</h3>
                <div className="space-y-2">
                  {[
                    { item: 'PAY-23-402 pending >5 days', priority: 'MEDIUM', category: 'FISCAL' },
                    { item: 'Central Sector compliance <70%', priority: 'HIGH', category: 'COMPLIANCE' },
                    { item: 'COR-205 remediation deadline approaching', priority: 'MEDIUM', category: 'OPERATIONS' }
                  ].map((flag, i) => (
                    <div key={i} className="bg-[#252525] p-3 rounded-sm border border-[#5f686e]/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertCircle size={16} className={flag.priority === 'HIGH' ? 'text-red-500' : 'text-amber-500'} />
                        <div>
                          <div className="text-xs font-bold text-white">{flag.item}</div>
                          <div className="text-[10px] text-[#5f686e] font-mono mt-0.5">{flag.category}</div>
                        </div>
                      </div>
                      <Badge status={flag.priority === 'HIGH' ? 'danger' : 'warning'}>{flag.priority}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="w-full py-3 bg-[#3684ca] hover:bg-[#3684ca]/80 text-white font-bold uppercase tracking-widest text-xs rounded-sm transition-all"
                onClick={() => setAiMode(!aiMode)}
              >
                {aiMode ? 'Deactivate AI Monitoring' : 'Activate AI Monitoring'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HQView;
