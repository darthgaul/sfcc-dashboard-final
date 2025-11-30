import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Map, 
  UserCircle2, 
  Users, 
  LogOut, 
  Menu,
  Lock,
} from 'lucide-react';
import { ViewRole, User, UserRole, Permission } from './types';
import { hasPermission } from './security/AccessControl';
import HQView from './views/HQView';
import RegionalView from './views/RegionalView';
import SquadronView from './views/SquadronView';
import CadetView from './views/CadetView';
import ParentView from './components/ParentView';
import LoginView from './views/LoginView';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewRole>(ViewRole.HQ);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Map the 10 System Roles to the 5 Available UI Dashboards
  const getDashboardViewForRole = (role: UserRole): ViewRole => {
    switch(role) {
        case UserRole.BOARD_OF_DIRECTORS:
        case UserRole.EXTERNAL_AUDITOR:
        case UserRole.EXECUTIVE_STAFF:
        case UserRole.CFO_TREASURER:
        case UserRole.SUPPORT_STAFF:
            return ViewRole.HQ;
        case UserRole.REGIONAL_COMMANDER:
            return ViewRole.REGIONAL;
        case UserRole.SQUADRON_COMMANDER:
        case UserRole.REVIEWER_INSTRUCTOR:
            return ViewRole.SQUADRON;
        case UserRole.CADET_MEMBER:
            return ViewRole.CADET;
        case UserRole.PARENT_GUARDIAN:
            return ViewRole.PARENT;
        default:
            return ViewRole.HQ;
    }
  };

  const handleLogin = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    // Set initial view based on mapped role
    setCurrentView(getDashboardViewForRole(authenticatedUser.role));
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(ViewRole.HQ);
  };

  const NavItem = ({ permission, role, icon: Icon, label }: { permission: Permission; role: ViewRole; icon: any; label: string }) => {
    // Only render nav item if user has the specific permission
    if (!user || !hasPermission(user, permission)) return null;

    return (
      <button
        onClick={() => {
          setCurrentView(role);
          setMobileMenuOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all border-l-2 ${
          currentView === role
            ? 'border-blue-500 text-white bg-white/5'
            : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
        }`}
      >
        <Icon size={18} />
        {label}
      </button>
    );
  };

  const renderView = () => {
    // Security Guard: Prevent rendering if user is not authorized for this view
    // We map the requested ViewRole back to a required Permission
    let requiredPermission: Permission;
    switch (currentView) {
        case ViewRole.HQ: requiredPermission = Permission.VIEW_HQ_DASHBOARD; break;
        case ViewRole.REGIONAL: requiredPermission = Permission.VIEW_REGIONAL_DASHBOARD; break;
        case ViewRole.SQUADRON: requiredPermission = Permission.VIEW_SQUADRON_DASHBOARD; break;
        case ViewRole.CADET: requiredPermission = Permission.VIEW_CADET_DASHBOARD; break;
        case ViewRole.PARENT: requiredPermission = Permission.VIEW_PARENT_DASHBOARD; break;
        default: requiredPermission = Permission.VIEW_HQ_DASHBOARD;
    }

    if (user && !hasPermission(user, requiredPermission)) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-zinc-500 animate-in fade-in zoom-in-95">
                <div className="p-6 bg-red-500/5 rounded-full mb-6 border border-red-500/20">
                    <Lock size={64} className="text-red-500" />
                </div>
                <h2 className="text-3xl font-bold uppercase tracking-widest text-white mb-2">Access Denied</h2>
                <p className="font-mono text-sm uppercase tracking-wider text-red-400">Insufficient Security Clearance</p>
                <p className="text-xs text-zinc-600 mt-4 font-mono">Error Code: 403_FORBIDDEN | Role: {user.role}</p>
            </div>
        );
    }

    switch (currentView) {
      case ViewRole.HQ: return <HQView />;
      case ViewRole.REGIONAL: return <RegionalView />;
      case ViewRole.SQUADRON: return <SquadronView />;
      case ViewRole.CADET: return <CadetView />;
      case ViewRole.PARENT: return <ParentView />;
      default: return <div className="p-10 text-center text-zinc-500">View Not Found</div>;
    }
  };

  if (!user) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-sfcc-dark text-zinc-300 font-sans overflow-hidden">
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-sfcc-panel border-r border-sfcc-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo Area */}
        <div className="p-6 border-b border-sfcc-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center relative">
              <img 
                src="https://publish-01.obsidian.md/access/c6e84d0dba4a473d9f7c63884517ea6d/images/sfcc%20roundel%204.png" 
                alt="SFCC Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-white font-bold tracking-wider leading-none">SFCC</h1>
              <p className="text-[10px] text-zinc-500 tracking-[0.2em] mt-1">COMMAND SUITE</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-6 overflow-y-auto">
          <div className="px-4 mb-2">
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">
              Menu
            </p>
          </div>
          <nav className="space-y-0.5">
            <NavItem permission={Permission.VIEW_HQ_DASHBOARD} role={ViewRole.HQ} icon={LayoutDashboard} label="HQ Dashboard" />
            <NavItem permission={Permission.VIEW_REGIONAL_DASHBOARD} role={ViewRole.REGIONAL} icon={Map} label="Regional View" />
            <NavItem permission={Permission.VIEW_SQUADRON_DASHBOARD} role={ViewRole.SQUADRON} icon={Users} label="Squadron View" />
            <NavItem permission={Permission.VIEW_CADET_DASHBOARD} role={ViewRole.CADET} icon={UserCircle2} label="Cadet Profile" />
            <NavItem permission={Permission.VIEW_PARENT_DASHBOARD} role={ViewRole.PARENT} icon={Users} label="Parent Portal" />
          </nav>
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-sfcc-border bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-600 flex items-center justify-center text-xs font-bold text-blue-500">
                {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user.name}</p>
              <div className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                 <p className="text-[10px] text-zinc-500 tracking-wider truncate">LEVEL {user.accessLevel}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="text-zinc-500 hover:text-red-400 transition-colors p-1" 
              title="Disconnect"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-[#121212] relative">
        {/* Background Grid Pattern (Subtle) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ 
               backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
               backgroundSize: '40px 40px'
             }}>
        </div>

        {/* Header (Mobile Only Trigger) */}
        <div className="lg:hidden p-4 border-b border-sfcc-border flex justify-between items-center bg-sfcc-panel z-30">
           <div className="flex items-center gap-2">
              <img 
                src="https://publish-01.obsidian.md/access/c6e84d0dba4a473d9f7c63884517ea6d/images/sfcc%20roundel%204.png" 
                alt="Logo"
                className="w-6 h-6 object-contain"
              />
              <span className="font-bold text-zinc-200">SFCC</span>
           </div>
           <button onClick={() => setMobileMenuOpen(true)} className="text-zinc-300">
             <Menu />
           </button>
        </div>

        {/* Top Status Bar (Desktop) */}
        <div className="hidden lg:flex items-center justify-between px-8 py-2 border-b border-sfcc-border bg-sfcc-panel/50 backdrop-blur-sm z-30 h-10">
           <div className="flex gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                SYSTEM: <span className="text-emerald-500 font-bold">ONLINE</span>
              </span>
              <span className="flex items-center gap-1.5">
                CONNECTION: <span className="text-emerald-500 font-bold">ENCRYPTED (TLS)</span>
                <Lock size={10} className="text-emerald-500" />
              </span>
              <span className="flex items-center gap-1.5">
                SESSION: <span className="text-zinc-300">15 MIN</span>
              </span>
           </div>
           <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest border px-2 py-0.5 border-zinc-700 rounded-sm">
              Term: Fall 2023
           </div>
        </div>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 relative z-10 scroll-smooth">
          <div className="max-w-7xl mx-auto pb-12">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;