import React from 'react';
import { LucideIcon, ShieldCheck, Lock, FileCheck, Clock } from 'lucide-react';

export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = "", title }) => (
  <div className={`bg-sfcc-panel border border-sfcc-border p-5 rounded-sm shadow-sm ${className}`}>
    {title && (
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-100">{title}</h3>
      </div>
    )}
    {children}
  </div>
);

export const MetricCard: React.FC<{
  icon: LucideIcon;
  label: string;
  value: string;
  subtext?: string;
  alert?: boolean;
}> = ({ icon: Icon, label, value, subtext, alert }) => (
  <Card className={`relative overflow-hidden group ${alert ? 'border-l-4 border-l-sfcc-danger' : 'border-l-4 border-l-zinc-600'}`}>
    <div className="flex items-start justify-between relative z-10">
      <div className={`p-3 rounded-md ${alert ? 'bg-red-500/10 text-red-500' : 'bg-zinc-800 text-zinc-400'}`}>
        <Icon size={24} />
      </div>
      <div className="text-right">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1">{label}</p>
        <h2 className="text-3xl font-bold text-white font-mono">{value}</h2>
        {subtext && <p className="text-xs text-zinc-500 mt-1">{subtext}</p>}
      </div>
    </div>
  </Card>
);

export const Badge: React.FC<{ status: 'success' | 'warning' | 'danger' | 'info' | 'neutral'; children: React.ReactNode }> = ({ status, children }) => {
  const styles = {
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    danger: 'bg-red-500/10 text-red-500 border-red-500/20',
    info: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    neutral: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  };

  return (
    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      {children}
    </span>
  );
};

export const SectionHeader: React.FC<{ title: string; subtitle?: string; icon?: LucideIcon }> = ({ title, subtitle, icon: Icon }) => (
  <div className="mb-6 border-b border-sfcc-border pb-4">
    <h1 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
      {Icon && <Icon className="text-zinc-500" />}
      {title}
    </h1>
    {subtitle && (
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mt-1 uppercase tracking-widest">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        {subtitle}
      </div>
    )}
  </div>
);

export const SecurityStatusCard: React.FC = () => (
  <Card className="border-l-2 border-l-blue-500 bg-blue-950/5">
    <div className="flex flex-col md:flex-row md:items-center gap-6">
      <div className="flex items-center gap-3 md:w-48 shrink-0">
         <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20 text-blue-500">
           <ShieldCheck size={20} />
         </div>
         <div>
           <h3 className="text-sm font-bold text-white uppercase tracking-wider">Security Status</h3>
           <p className="text-[10px] text-zinc-500 uppercase tracking-widest">System Protected</p>
         </div>
      </div>
      
      <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4 border-t md:border-t-0 md:border-l border-zinc-800 pt-4 md:pt-0 md:pl-6">
         <div>
           <p className="text-[10px] text-zinc-500 font-mono uppercase mb-1">MFA Status</p>
           <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-200">
             <Lock size={12} className="text-blue-500" />
             Enabled
           </div>
         </div>
         
         <div>
           <p className="text-[10px] text-zinc-500 font-mono uppercase mb-1">SSO Status</p>
           <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-200">
             <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
             Configured
           </div>
         </div>

         <div>
           <p className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Last Audit</p>
           <div className="text-xs font-bold text-zinc-200 font-mono">
             2025-11-28 <span className="text-blue-500 ml-1">PASSED</span>
           </div>
         </div>

         <div>
           <p className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Policy Version</p>
           <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-200 font-mono">
             <FileCheck size={12} className="text-zinc-500" />
             v3.1.0
           </div>
         </div>

         <div>
           <p className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Session Timeout</p>
           <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-200 font-mono">
             <Clock size={12} className="text-zinc-500" />
             15 min
           </div>
         </div>
      </div>
    </div>
  </Card>
);