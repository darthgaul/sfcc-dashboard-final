import React from 'react';
import { LucideIcon, Lock } from 'lucide-react';

export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = "", title }) => (
  <div className={`bg-sfcc-panel border border-sfcc-border p-5 rounded-sm shadow-sm ${className}`}>
    {title && (
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-sfcc-primary">{title}</h3>
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
  <Card className={`relative overflow-hidden group ${alert ? 'border-l-4 border-l-sfcc-danger' : 'border-l-4 border-l-sfcc-border'}`}>
    <div className="flex items-start justify-between relative z-10">
      <div className={`p-3 rounded-md ${alert ? 'bg-red-500/10 text-red-500' : 'bg-sfcc-dark text-sfcc-secondary'}`}>
        <Icon size={24} />
      </div>
      <div className="text-right">
        <p className="text-xs font-mono uppercase tracking-widest text-sfcc-secondary mb-1">{label}</p>
        <h2 className="text-3xl font-bold text-sfcc-primary font-mono">{value}</h2>
        {subtext && <p className="text-xs text-sfcc-secondary mt-1">{subtext}</p>}
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
    neutral: 'bg-sfcc-dark text-sfcc-secondary border-sfcc-border',
  };

  return (
    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      {children}
    </span>
  );
};

export const SectionHeader: React.FC<{ title: string; subtitle?: string; icon?: LucideIcon }> = ({ title, subtitle, icon: Icon }) => (
  <div className="mb-2 border-b border-sfcc-border pb-4">
    <h1 className="text-2xl font-bold text-sfcc-primary uppercase tracking-wider flex items-center gap-3">
      {Icon && <Icon className="text-sfcc-secondary" />}
      {title}
    </h1>
    {subtitle && (
      <div className="flex items-center gap-2 text-xs font-mono text-sfcc-secondary mt-1 uppercase tracking-widest">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        {subtitle}
      </div>
    )}
  </div>
);

export const SecurityBadges: React.FC = () => (
  <div className="flex items-center gap-3 mb-6">
    <span className="px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1.5">
      <Lock size={10} />
      MFA: Enabled
    </span>
    <span className="px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1.5">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]"></div>
      SSO: Configured
    </span>
  </div>
);