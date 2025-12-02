
import React from 'react';
import { LucideIcon, Lock, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export const Card: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  title?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'glass' | 'outline';
}> = ({ children, className = "", title, action, variant = 'default' }) => {
  
  const variants = {
    default: "bg-[#191818] border border-[#5f686e]/30 shadow-sm",
    glass: "bg-[#191818]/80 backdrop-blur-md border border-[#3684ca]/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
    outline: "bg-transparent border border-dashed border-[#5f686e]/50"
  };

  return (
    <div className={`rounded-sm relative overflow-hidden transition-all duration-300 ${variants[variant]} ${className}`}>
      {/* Tech decoration corners */}
      {variant === 'glass' && (
        <>
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#3684ca]/50"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#3684ca]/50"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#3684ca]/50"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#3684ca]/50"></div>
        </>
      )}
      
      {(title || action) && (
        <div className="flex items-center justify-between mb-4 p-5 pb-0">
          {title && (
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#96a3ae] flex items-center gap-2">
              <span className="w-1 h-3 bg-[#3684ca] rounded-sm"></span>
              {title}
            </h3>
          )}
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
};

export const MetricCard: React.FC<{
  icon: LucideIcon;
  label: string;
  value: string;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  alert?: boolean;
}> = ({ icon: Icon, label, value, subtext, trend, trendValue, alert }) => (
  <Card 
    variant={alert ? 'default' : 'glass'}
    className={`group hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(54,132,202,0.15)] transition-all duration-300 ${alert ? 'border-red-500/50 bg-red-900/10' : ''}`}
  >
    <div className="flex items-start justify-between relative z-10">
      <div className={`p-3 rounded-md transition-colors duration-300 ${
        alert 
          ? 'bg-red-500/20 text-red-500' 
          : 'bg-[#3684ca]/10 text-[#3684ca] group-hover:bg-[#3684ca] group-hover:text-white'
      }`}>
        <Icon size={24} />
      </div>
      
      {trend && (
        <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border ${
          trend === 'up' ? 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10' :
          trend === 'down' ? 'text-red-500 border-red-500/30 bg-red-500/10' :
          'text-[#96a3ae] border-[#5f686e]/30'
        }`}>
          {trend === 'up' && <ArrowUpRight size={12} />}
          {trend === 'down' && <ArrowDownRight size={12} />}
          {trend === 'neutral' && <Minus size={12} />}
          {trendValue}
        </div>
      )}
    </div>
    
    <div className="mt-4">
      <h2 className={`text-3xl font-bold font-mono tracking-tight ${alert ? 'text-red-500' : 'text-white'}`}>
        {value}
      </h2>
      <div className="flex items-end justify-between mt-1">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#96a3ae]">{label}</p>
        {subtext && <p className="text-[10px] text-[#5f686e]">{subtext}</p>}
      </div>
    </div>
    
    {/* Background Glow Effect */}
    <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-[40px] opacity-20 transition-opacity duration-500 group-hover:opacity-40 ${
      alert ? 'bg-red-500' : 'bg-[#3684ca]'
    }`}></div>
  </Card>
);

export const Badge: React.FC<{ status: 'success' | 'warning' | 'danger' | 'info' | 'neutral'; children: React.ReactNode }> = ({ status, children }) => {
  const styles = {
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]',
    danger: 'bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]',
    info: 'bg-[#3684ca]/10 text-[#3684ca] border-[#3684ca]/20 shadow-[0_0_10px_rgba(54,132,202,0.1)]',
    neutral: 'bg-[#252525] text-[#96a3ae] border-[#5f686e]/30',
  };

  return (
    <span className={`px-2 py-0.5 rounded-[2px] text-[9px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      {children}
    </span>
  );
};

export const SectionHeader: React.FC<{ title: string; subtitle?: string; icon?: LucideIcon; rightContent?: React.ReactNode }> = ({ title, subtitle, icon: Icon, rightContent }) => (
  <div className="mb-6 flex items-end justify-between border-b border-[#5f686e]/20 pb-4">
    <div>
      <h1 className="text-3xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
        {Icon && <Icon className="text-[#3684ca]" />}
        {title}
      </h1>
      {subtitle && (
        <div className="flex items-center gap-2 text-xs font-mono text-[#96a3ae] mt-1 uppercase tracking-[0.2em]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {subtitle}
        </div>
      )}
    </div>
    {rightContent}
  </div>
);

export const SecurityBadges: React.FC = () => (
  <div className="flex items-center gap-2">
    <span className="px-2 py-1 rounded-[2px] text-[9px] font-bold uppercase tracking-wider bg-[#191818] text-emerald-500 border border-emerald-500/20 flex items-center gap-1.5">
      <Lock size={10} />
      AES-256
    </span>
    <span className="px-2 py-1 rounded-[2px] text-[9px] font-bold uppercase tracking-wider bg-[#191818] text-emerald-500 border border-emerald-500/20 flex items-center gap-1.5">
      <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]"></div>
      MFA Active
    </span>
  </div>
);
