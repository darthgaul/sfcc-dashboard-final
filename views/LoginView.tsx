import React, { useState, useEffect } from 'react';
import { Lock, ChevronRight, AlertCircle, Eye, EyeOff, Terminal } from 'lucide-react';
import { User, UserRole } from '../types';
import { hydrateUserPermissions } from '../security/AccessControl';

interface LoginViewProps {
  onLogin: (user: User) => void;
}

// Task 1: Define the 10 System Roles (Mock Users)
const MOCK_USERS: Record<string, User> = {
  // 1. Board
  'board': {
    id: 'u-001', username: 'board', name: 'Chairperson Vance', role: UserRole.BOARD_OF_DIRECTORS, accessLevel: 'L5',
  },
  // 2. Auditor
  'auditor': {
    id: 'u-002', username: 'auditor', name: 'Ext. Audit Firm', role: UserRole.EXTERNAL_AUDITOR, accessLevel: 'L5',
  },
  // 3. Exec Staff
  'exec': {
    id: 'u-003', username: 'exec', name: 'Gen. A. Smith', role: UserRole.EXECUTIVE_STAFF, accessLevel: 'L5',
  },
  // 4. CFO
  'cfo': {
    id: 'u-004', username: 'cfo', name: 'Treas. J. Bond', role: UserRole.CFO_TREASURER, accessLevel: 'L5',
  },
  // 5. Support
  'support': {
    id: 'u-005', username: 'support', name: 'Tech. SysAdmin', role: UserRole.SUPPORT_STAFF, accessLevel: 'L4',
  },
  // 6. Regional Cmd
  'regional': {
    id: 'u-006', username: 'regional', name: 'Col. B. Miller', role: UserRole.REGIONAL_COMMANDER, accessLevel: 'L4',
    assignedRegionId: 'REG-NE'
  },
  // 7. Squadron Cmd
  'squadron': {
    id: 'u-007', username: 'squadron', name: 'Maj. C. Davis', role: UserRole.SQUADRON_COMMANDER, accessLevel: 'L3',
    assignedRegionId: 'REG-NE', assignedSquadronId: 'SQ-101'
  },
  // 8. Instructor
  'instructor': {
    id: 'u-008', username: 'instructor', name: 'Lt. T. Teacher', role: UserRole.REVIEWER_INSTRUCTOR, accessLevel: 'L2',
    assignedRegionId: 'REG-NE', assignedSquadronId: 'SQ-101'
  },
  // 9. Cadet
  'cadet': {
    id: 'u-009', username: 'cadet', name: 'Cdt. E. Ender', role: UserRole.CADET_MEMBER, accessLevel: 'L1',
    linkedCadetId: 'u-009'
  },
  // 10. Parent
  'parent': {
    id: 'u-010', username: 'parent', name: 'Mrs. Ender', role: UserRole.PARENT_GUARDIAN, accessLevel: 'L1',
    linkedCadetId: 'u-009'
  }
};

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [statusText, setStatusText] = useState('SYSTEM READY');
  const [typingEffect, setTypingEffect] = useState('');

  // Simulated typing effect for system messages
  useEffect(() => {
    let i = 0;
    const text = "SFCC SECURE GATEWAY v3.1.0 // AUTHORIZED PERSONNEL ONLY";
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypingEffect((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setStatusText('INITIATING HANDSHAKE...');

    // Simulate network delay for effect
    setTimeout(async () => {
      setStatusText('VERIFYING CREDENTIALS...');
      
      try {
        // Authenticate with Real Backend
        // Ensuring the endpoint is exactly /api/login
        const response = await fetch('https://sfcc-dashboard-final.onrender.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Mapping username input to email field as expected by backend
          body: JSON.stringify({ email: username, password: password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Store the JWT token as requested
          localStorage.setItem('token', data.token);

          setStatusText('ACCESS GRANTED. ESTABLISHING SESSION...');
          
          // Parse user details from response
          const backendUser = data.user || {};
          // Support both `role` and `user_role` properties, default to cadet if missing
          const rawRole = backendUser.user_role || backendUser.role || 'cadet_member';
          
          // Helper to map backend string roles to Frontend Enums
          const mapRole = (r: string): UserRole => {
             const normalized = r.toLowerCase();
             
             // Admin / Exec Mapping
             if (normalized === 'admin' || normalized.includes('exec')) return UserRole.EXECUTIVE_STAFF;
             
             // Other Roles
             if (normalized.includes('board')) return UserRole.BOARD_OF_DIRECTORS;
             if (normalized.includes('auditor')) return UserRole.EXTERNAL_AUDITOR;
             if (normalized.includes('cfo') || normalized.includes('treasurer')) return UserRole.CFO_TREASURER;
             if (normalized.includes('support')) return UserRole.SUPPORT_STAFF;
             if (normalized.includes('regional')) return UserRole.REGIONAL_COMMANDER;
             if (normalized.includes('squadron')) return UserRole.SQUADRON_COMMANDER;
             if (normalized.includes('reviewer') || normalized.includes('instructor')) return UserRole.REVIEWER_INSTRUCTOR;
             if (normalized.includes('parent')) return UserRole.PARENT_GUARDIAN;
             
             return UserRole.CADET_MEMBER;
          };

          const userRole = mapRole(rawRole);
          
          setTimeout(() => {
            // Use MOCK_USERS for rich UI data if available and matches username, otherwise fallback to backend data
            const uiUser = MOCK_USERS[username] || {
              id: String(backendUser.user_id || backendUser.id || 'u-real'),
              username: backendUser.username || username,
              name: backendUser.username || username, // Fallback name
              role: userRole, // Use mapped role from backend
              accessLevel: (userRole === UserRole.EXECUTIVE_STAFF || userRole === UserRole.BOARD_OF_DIRECTORS) ? 'L5' : 'L1',
            };
            
            const hydratedUser = hydrateUserPermissions(uiUser);
            
            // Fix: Save user to storage so App.tsx can persist session
            // We save the hydratedUser because it contains the properly mapped UserRole and permissions
            localStorage.setItem('user', JSON.stringify(hydratedUser));
            
            onLogin(hydratedUser);
          }, 800);
        } else {
          throw new Error(data.message || 'Invalid credentials');
        }
      } catch (err) {
        setLoading(false);
        setError('INVALID CREDENTIALS');
        setStatusText('ACCESS DENIED. EVENT LOGGED.');
        console.error('Login error:', err);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#191818] text-sfcc-primary relative overflow-hidden font-sans">
       {/* Background Grid */}
       <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
             style={{ 
               backgroundImage: 'linear-gradient(#252525 1px, transparent 1px), linear-gradient(90deg, #252525 1px, transparent 1px)',
               backgroundSize: '40px 40px'
             }}>
       </div>

       {/* Decorative Elements */}
       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3684ca] to-transparent opacity-50"></div>
       <div className="absolute bottom-10 right-10 text-[10px] font-mono text-sfcc-border hidden md:block">
          SECURE CONNECTION: TLS 1.3 | AES-256-GCM
       </div>

       <div className="w-full max-w-md p-8 relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-24 h-24 mb-6 relative group">
              <div className="absolute inset-0 rounded-full bg-[#3684ca]/10 blur-xl animate-pulse"></div>
              <img 
                src="https://publish-01.obsidian.md/access/c6e84d0dba4a473d9f7c63884517ea6d/images/sfcc%20roundel%204.png" 
                alt="SFCC Logo" 
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
              />
            </div>
            <h1 className="text-3xl font-bold text-sfcc-primary tracking-widest mb-2">SFCC COMMAND</h1>
            <p className="font-mono text-xs text-[#3684ca] tracking-[0.2em] h-4">{typingEffect}<span className="animate-pulse">_</span></p>
          </div>

          {/* Login Form */}
          <div className="bg-[#252525] border border-sfcc-border rounded-sm p-1 shadow-2xl relative overflow-hidden">
             {/* Scanning Line Effect */}
             {loading && (
                <div className="absolute top-0 left-0 w-full h-1 bg-[#3684ca] shadow-[0_0_10px_#3684ca] animate-scan z-20"></div>
             )}

             <div className="p-8 border border-sfcc-border/50 relative">
                <div className="absolute top-4 right-4 flex gap-1">
                   <div className="w-1 h-1 bg-sfcc-border rounded-full"></div>
                   <div className="w-1 h-1 bg-sfcc-border rounded-full"></div>
                   <div className="w-1 h-1 bg-sfcc-border rounded-full"></div>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                   {error && (
                     <div className="bg-red-500/10 border border-red-500/20 p-3 flex items-center gap-3 text-red-400 text-xs font-mono mb-4 animate-in fade-in slide-in-from-top-1">
                        <AlertCircle size={16} />
                        {error}
                     </div>
                   )}

                   <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-sfcc-secondary ml-1">Identity</label>
                      <div className="relative group">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Terminal size={16} className="text-sfcc-secondary group-focus-within:text-[#3684ca] transition-colors" />
                         </div>
                         <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-[#191818] border border-sfcc-border text-sfcc-primary text-sm rounded-sm py-2.5 pl-10 pr-3 focus:outline-none focus:border-[#3684ca] focus:ring-1 focus:ring-[#3684ca]/20 transition-all font-mono placeholder:text-sfcc-secondary"
                            placeholder="username"
                            disabled={loading}
                         />
                      </div>
                   </div>

                   <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-sfcc-secondary ml-1">Passcode</label>
                      <div className="relative group">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock size={16} className="text-sfcc-secondary group-focus-within:text-[#3684ca] transition-colors" />
                         </div>
                         <input 
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#191818] border border-sfcc-border text-sfcc-primary text-sm rounded-sm py-2.5 pl-10 pr-10 focus:outline-none focus:border-[#3684ca] focus:ring-1 focus:ring-[#3684ca]/20 transition-all font-mono placeholder:text-sfcc-secondary"
                            placeholder="••••••••"
                            disabled={loading}
                         />
                         <button 
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute inset-y-0 right-0 pr-3 flex items-center text-sfcc-secondary hover:text-sfcc-primary"
                         >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                         </button>
                      </div>
                   </div>

                   <button 
                      type="submit" 
                      disabled={loading}
                      className={`w-full bg-[#3684ca] hover:bg-[#3684ca]/80 text-white font-bold py-3 px-4 rounded-sm transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs relative overflow-hidden group ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                   >
                      {loading ? (
                         <>
                           <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                           Processing
                         </>
                      ) : (
                         <>
                           Authenticate
                           <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                         </>
                      )}
                   </button>
                </form>

                <div className="mt-6 pt-4 border-t border-sfcc-border text-center">
                   <p className="text-[10px] text-sfcc-secondary font-mono animate-pulse">{statusText}</p>
                </div>
             </div>
          </div>

          {/* Demo Hint */}
          <div className="mt-8 text-center">
             <div className="inline-block text-left bg-[#252525]/50 border border-sfcc-border p-4 rounded text-[10px] text-sfcc-secondary font-mono">
                <p className="font-bold text-sfcc-secondary mb-2 uppercase border-b border-sfcc-border pb-1">Demo Credentials (pwd: password)</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                   <span>Board: <span className="text-[#3684ca]">board</span></span>
                   <span>Exec: <span className="text-[#3684ca]">exec</span></span>
                   <span>Regional: <span className="text-[#3684ca]">regional</span></span>
                   <span>Squadron: <span className="text-[#3684ca]">squadron</span></span>
                   <span>Cadet: <span className="text-[#3684ca]">cadet</span></span>
                   <span>Parent: <span className="text-[#3684ca]">parent</span></span>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default LoginView;