import React, { useState } from 'react';
import { 
  FileSignature, 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  Calendar, 
  FileText, 
  Flag, 
  CheckCircle2, 
  AlertOctagon, 
  X, 
  ChevronRight, 
  HeartPulse,
  Lock,
  Eye,
  Clock
} from 'lucide-react';
import { Card, SectionHeader, SecurityBadges, Badge } from '../components/Shared';

// Mock Data for Modal
const ARTIFACT_DETAILS = {
  title: "Rocketry Lab Report",
  type: "STEM Artifact",
  date: "2023-10-15",
  score: "3/4",
  reviewer: "Lt. T. Teacher",
  abstract: "Analysis of solid-fuel rocket propulsion efficiency under varying atmospheric conditions. Demonstrated understanding of Newton's Third Law and impulse calculations.",
  rubric: [
    { category: "Technical Accuracy", score: "4/4", comments: "Excellent calculation work." },
    { category: "Data Visualization", score: "3/4", comments: "Graphs clear, but missing units on X-axis." },
    { category: "Format/Compliance", score: "2/4", comments: "Minor citation errors." }
  ]
};

const ParentView: React.FC = () => {
  const [selectedArtifact, setSelectedArtifact] = useState<any | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10 relative">
      <SectionHeader title="Parent Dashboard" subtitle="Secure Connection • Guardian Portal v2.5" />
      <SecurityBadges />

      {/* --- Section 1: Mandatory Consent & PII Management --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pending Consent Queue */}
        <Card title="ACTION REQUIRED: CONSENT & ATTESTATION" className="lg:col-span-2 border-l-4 border-l-sfcc-accent">
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead>
                 <tr className="text-zinc-500 font-mono text-xs uppercase tracking-wider border-b border-sfcc-border">
                   <th className="pb-3 pl-2">Document ID</th>
                   <th className="pb-3">Description</th>
                   <th className="pb-3">Deadline</th>
                   <th className="pb-3 text-right pr-2">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-sfcc-border">
                 {[
                   { id: 'CCF 20-5', title: 'External Activity Form', date: 'Oct 30, 2023', urgent: true },
                   { id: 'REL-002', title: 'Media Release Form', date: 'Nov 05, 2023', urgent: false },
                 ].map((row, i) => (
                   <tr key={i} className="hover:bg-zinc-800/50">
                     <td className="py-3 pl-2 font-mono text-zinc-300">{row.id}</td>
                     <td className="py-3 text-white font-medium">{row.title}</td>
                     <td className={`py-3 font-mono ${row.urgent ? 'text-amber-500' : 'text-zinc-500'}`}>{row.date}</td>
                     <td className="py-3 text-right pr-2">
                       <button className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm flex items-center gap-2 ml-auto">
                         <FileSignature size={12} /> Sign
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </Card>

        {/* Emergency & Safety Status */}
        <div className="space-y-6">
           {/* Emergency Data */}
           <Card title="Emergency & Health Data">
              <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 bg-red-500/10 rounded text-red-500">
                    <HeartPulse size={24} />
                 </div>
                 <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Last Verified</p>
                    <p className="text-white font-mono">Aug 15, 2023</p>
                 </div>
              </div>
              <button className="w-full border border-zinc-600 hover:bg-zinc-800 text-zinc-300 hover:text-white py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors">
                 <Lock size={12} /> Update Secure Record
              </button>
           </Card>

           {/* Youth Protection Status */}
           <Card className="p-4">
              <div className="space-y-3">
                 <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Lead Officer YPT</span>
                    <Badge status="success">Confirmed</Badge>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Media Release</span>
                    <Badge status="warning">Opted-Out</Badge>
                 </div>
              </div>
           </Card>
        </div>
      </div>

      {/* --- Section 2: Cadet Progression & Accountability --- */}
      
      {/* Remediation Alert */}
      <div className="border border-red-500/40 bg-red-900/10 p-4 rounded-sm shadow-[0_0_20px_rgba(239,68,68,0.15)] flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="p-2 bg-red-500/20 rounded text-red-500">
           <AlertTriangle size={24} />
        </div>
        <div className="flex-1">
           <h3 className="text-red-500 font-bold uppercase tracking-wider text-sm">Action Required: Remediation</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-1 text-xs text-zinc-400">
              <p><span className="text-zinc-500 font-bold uppercase">Deficiency:</span> Squadron Drill Cmd (Score: 1/4)</p>
              <p><span className="text-zinc-500 font-bold uppercase">Mission:</span> Complete Basic Drill Training</p>
              <p><span className="text-zinc-500 font-bold uppercase">Deadline:</span> <span className="text-red-400 font-mono">7 Days Remaining</span></p>
           </div>
        </div>
        <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider">
           View Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Progression Status */}
         <Card title="Progression Status" className="h-full">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4">Annual Hard Minima</p>
            <div className="space-y-5">
               {[
                 { label: 'Technical Labs', current: 2, total: 4, color: 'bg-blue-600' },
                 { label: 'Policy Memos', current: 3, total: 3, color: 'bg-emerald-500' },
                 { label: 'Mission Briefs', current: 1, total: 2, color: 'bg-amber-500' },
               ].map((item, i) => (
                 <div key={i}>
                    <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1">
                       <span>{item.label}</span>
                       <span className="font-mono">{item.current}/{item.total}</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                       <div className={`${item.color} h-full transition-all duration-500`} style={{ width: `${(item.current / item.total) * 100}%` }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </Card>

         {/* Promotion Readiness */}
         <Card title="Promotion Readiness View">
            <div className="space-y-3">
               <div className="flex justify-between items-center p-2 bg-zinc-900/50 rounded border border-zinc-800">
                  <span className="text-xs text-zinc-400 uppercase tracking-wide">QPT Status</span>
                  <span className="text-xs font-bold text-emerald-500">PASS</span>
               </div>
               <div className="flex justify-between items-center p-2 bg-zinc-900/50 rounded border border-zinc-800">
                  <span className="text-xs text-zinc-400 uppercase tracking-wide">Presence Board</span>
                  <span className="text-xs font-bold text-amber-500">HOLD</span>
               </div>
               <div className="flex justify-between items-center p-2 bg-zinc-900/50 rounded border border-zinc-800">
                  <span className="text-xs text-zinc-400 uppercase tracking-wide">Corrective Orders</span>
                  <span className="text-xs font-bold text-zinc-300 font-mono">0</span>
               </div>
               <div className="flex justify-between items-center p-2 bg-zinc-900/50 rounded border border-zinc-800">
                  <span className="text-xs text-zinc-400 uppercase tracking-wide">Time in Grade</span>
                  <span className="text-xs font-bold text-emerald-500">SATISFIED</span>
               </div>
            </div>
         </Card>

         {/* Recent Artifacts (Interactive) */}
         <Card title="Recent Evaluations">
            <div className="space-y-2">
               {[
                  { title: "Rocketry Lab Report", date: "Oct 15", score: "3/4", status: "success" },
                  { title: "Squadron Drill Cmd", date: "Oct 05", score: "1/4", status: "danger" },
                  { title: "Community Cleanup", date: "Sep 20", score: "4/4", status: "success" },
               ].map((item, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedArtifact(item)}
                    className="w-full flex items-center justify-between p-3 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 transition-all group text-left"
                  >
                     <div>
                        <p className="text-xs font-bold text-zinc-300 group-hover:text-white">{item.title}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">{item.date}</p>
                     </div>
                     <div className="flex items-center gap-3">
                        <span className={`text-xs font-mono font-bold ${item.status === 'success' ? 'text-emerald-500' : 'text-red-500'}`}>
                           {item.score}
                        </span>
                        <ChevronRight size={14} className="text-zinc-600 group-hover:text-zinc-300" />
                     </div>
                  </button>
               ))}
            </div>
            <p className="text-[10px] text-zinc-500 mt-3 text-center italic">Select an item to view rubric details</p>
         </Card>
      </div>

      {/* --- Section 3: Scheduling & Communication --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Schedule */}
         <Card title="Squadron Schedule">
            <div className="space-y-4">
               {[
                  { day: '10', month: 'NOV', title: 'Regional FTX', type: 'MTE', hours: '48h', flag: true },
                  { day: '15', month: 'NOV', title: 'Unit Meeting', type: 'Training', hours: '2h', flag: false },
                  { day: '22', month: 'NOV', title: 'Guest Lecture', type: 'Lab', hours: '1.5h', flag: false },
               ].map((event, i) => (
                  <div key={i} className="flex gap-3 items-start">
                     <div className="bg-zinc-800 rounded p-2 text-center min-w-[50px]">
                        <span className="block text-xs font-bold text-white">{event.day}</span>
                        <span className="block text-[10px] text-zinc-500 uppercase">{event.month}</span>
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-start">
                           <p className="text-sm font-bold text-zinc-200">{event.title}</p>
                           {event.flag && <Flag size={14} className="text-red-500 fill-red-500/20" />}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                           <Badge status={event.flag ? 'danger' : 'neutral'}>{event.type}</Badge>
                           <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                              <Clock size={10} /> {event.hours}
                           </span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </Card>

         {/* Recovery & Communication */}
         <div className="space-y-6">
            <Card title="Recovery Protocol">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-500">
                     <CheckCircle2 size={20} />
                  </div>
                  <div>
                     <p className="text-sm font-bold text-white">24-Hour Recovery</p>
                     <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Post-FTX Status</p>
                  </div>
               </div>
               <div className="mt-2 text-xs text-emerald-400 bg-emerald-900/10 border border-emerald-900/30 p-2 rounded">
                  Confirmed active rest period mandated by safety officer.
               </div>
            </Card>

            <Card title="Communication Log">
               <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs border-b border-zinc-800 pb-2">
                     <span className="text-zinc-300">Policy Update: Uniforms</span>
                     <span className="text-zinc-500 font-mono">Dec 01</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-zinc-800 pb-2">
                     <span className="text-zinc-300">Monthly Newsletter</span>
                     <span className="text-zinc-500 font-mono">Nov 15</span>
                  </div>
               </div>
            </Card>
         </div>

         {/* Core Documents */}
         <Card title="Core Documents">
            <div className="space-y-2">
               {['Parent Guide v3.0', 'Cadet Code of Conduct', 'First Month Plan', 'Financial Aid Policy'].map((doc, i) => (
                  <button key={i} className="flex items-center gap-3 p-3 w-full text-left rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors group">
                     <FileText size={16} className="text-zinc-500 group-hover:text-blue-400" />
                     <span className="text-xs font-bold text-zinc-300 group-hover:text-white">{doc}</span>
                  </button>
               ))}
            </div>
         </Card>
      </div>

      {/* --- Interactive Modal: Artifact Details --- */}
      {selectedArtifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           {/* Backdrop */}
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedArtifact(null)}></div>
           
           {/* Modal Content */}
           <div className="relative bg-[#18181b] border border-zinc-700 w-full max-w-lg rounded-sm shadow-2xl animate-in zoom-in-95 duration-200">
              <button 
                onClick={() => setSelectedArtifact(null)} 
                className="absolute top-4 right-4 text-zinc-500 hover:text-white"
              >
                 <X size={20} />
              </button>

              <div className="p-6 border-b border-zinc-800">
                 <div className="flex items-center gap-2 mb-1">
                    <Badge status="info">STEM</Badge>
                    <span className="text-xs font-mono text-zinc-500">{ARTIFACT_DETAILS.date}</span>
                 </div>
                 <h2 className="text-xl font-bold text-white">{ARTIFACT_DETAILS.title}</h2>
              </div>

              <div className="p-6 space-y-6">
                 {/* Abstract */}
                 <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Abstract</h4>
                    <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900/50 p-3 rounded border border-zinc-800">
                       {ARTIFACT_DETAILS.abstract}
                    </p>
                 </div>

                 {/* Rubric Table */}
                 <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Rubric Evaluation</h4>
                    <table className="w-full text-left text-sm">
                       <thead>
                          <tr className="text-zinc-600 font-mono text-[10px] uppercase border-b border-zinc-800">
                             <th className="pb-2">Criteria</th>
                             <th className="pb-2 text-right">Score</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-zinc-800">
                          {ARTIFACT_DETAILS.rubric.map((item, i) => (
                             <tr key={i}>
                                <td className="py-2 pr-4">
                                   <div className="text-zinc-300 font-medium text-xs">{item.category}</div>
                                   <div className="text-zinc-500 text-[10px] italic">{item.comments}</div>
                                </td>
                                <td className="py-2 text-right font-mono text-zinc-400">{item.score}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>

                 {/* Footer Info */}
                 <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                    <div>
                       <p className="text-[10px] text-zinc-500 uppercase">Reviewer</p>
                       <p className="text-xs font-bold text-white">{ARTIFACT_DETAILS.reviewer}</p>
                    </div>
                    <div>
                       <p className="text-[10px] text-zinc-500 uppercase text-right">Final Score</p>
                       <p className="text-lg font-bold text-white font-mono">{ARTIFACT_DETAILS.score}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default ParentView;