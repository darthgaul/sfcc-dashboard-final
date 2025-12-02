
import React, { useState } from 'react';
import { 
  Rocket, 
  Shield, 
  Globe, 
  ChevronRight, 
  ArrowRight, 
  Cpu, 
  Users, 
  Target, 
  Terminal,
  MapPin,
  Search,
  Radar
} from 'lucide-react';
import ConstellationBackground from '../components/ConstellationBackground';

interface PublicWebsiteProps {
  onEnterCommand: () => void;
}

const PublicWebsite: React.FC<PublicWebsiteProps> = ({ onEnterCommand }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="h-screen w-full bg-[#191818] text-[#c7d7e2] font-sans selection:bg-[#3684ca] selection:text-white overflow-y-auto overflow-x-hidden relative flex flex-col">
      
      {/* --- Interactive 3D Background --- */}
      <ConstellationBackground />

      {/* --- Navigation Bar --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#191818]/80 backdrop-blur-md border-b border-[#5f686e]/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://publish-01.obsidian.md/access/c6e84d0dba4a473d9f7c63884517ea6d/images/sfcc%20roundel%204.png" 
              alt="SFCC Logo" 
              className="h-10 w-10 object-contain drop-shadow-[0_0_10px_rgba(54,132,202,0.5)]"
            />
            <div>
              <h1 className="text-lg font-bold tracking-wider text-white leading-none">SFCC</h1>
              <p className="text-[10px] text-[#3684ca] tracking-[0.3em] font-mono">SPACE FORCE CADET CORPS</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#96a3ae]">
            <a href="#mission" className="hover:text-white transition-colors">Mission</a>
            <a href="#programs" className="hover:text-white transition-colors">Programs</a>
            <a href="#locate" className="hover:text-white transition-colors">Locate Unit</a>
            <a href="#join" className="hover:text-white transition-colors">Enlistment</a>
          </div>

          <button 
            onClick={onEnterCommand}
            className="group relative px-6 py-2 bg-[#3684ca]/10 border border-[#3684ca]/50 text-[#3684ca] rounded-sm font-bold uppercase text-xs tracking-widest overflow-hidden hover:bg-[#3684ca] hover:text-white transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Command Portal <Terminal size={14} />
            </span>
            <div className="absolute inset-0 bg-[#3684ca] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
          </button>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="flex-grow min-h-0 relative z-10 flex flex-col pb-16">
        {/* --- Hero Section --- */}
        <header className="relative min-h-screen flex items-center justify-center overflow-hidden" id="mission">
          <div className="relative z-10 text-center max-w-4xl px-6 pointer-events-none pt-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3684ca]/10 border border-[#3684ca]/30 text-[#3684ca] text-[10px] font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pointer-events-auto">
              <span className="w-2 h-2 rounded-full bg-[#3684ca] animate-pulse"></span>
              Accepting Fall 2024 Cohort Applications
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 drop-shadow-xl">
              FORGING THE FUTURE OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3684ca] to-emerald-400">AEROSPACE LEADERSHIP</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#96a3ae] max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 drop-shadow-md">
              The Space Force Cadet Corps is the premier STEM and leadership development organization for youth. 
              We prepare the next generation of guardians, engineers, and scientists.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 pointer-events-auto">
              <a href="#join" className="px-8 py-4 bg-white text-[#191818] font-bold rounded-sm uppercase tracking-wider text-sm hover:bg-[#c7d7e2] transition-colors w-full md:w-auto shadow-lg flex justify-center">
                Join the Corps
              </a>
              <button className="px-8 py-4 bg-[#191818]/50 backdrop-blur-sm border border-[#5f686e] text-white font-bold rounded-sm uppercase tracking-wider text-sm hover:border-white hover:bg-white/10 transition-colors w-full md:w-auto flex items-center justify-center gap-2">
                Explore Programs <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* --- Live Stats Strip --- */}
        <div className="border-y border-[#5f686e]/30 bg-[#252525]/80 backdrop-blur-md relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: 'Active Cadets', value: '1,240' },
                { label: 'Squadron Units', value: '42' },
                { label: 'STEM Hours', value: '15k+' },
                { label: 'Scholarships', value: '$2.5M' }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-white font-mono mb-1">{stat.value}</div>
                  <div className="text-[10px] text-[#96a3ae] uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Mission Pillars (Cards) --- */}
        <section id="programs" className="py-24 bg-[#191818]/80 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white uppercase tracking-wider mb-4">Core Directives</h2>
                <div className="h-1 w-20 bg-[#3684ca] mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Rocket, title: "Aerospace STEM", desc: "Hands-on rocketry, satellite orbital mechanics, and propulsion labs designed to challenge." },
                  { icon: Shield, title: "Character Leadership", desc: "Developing ethical leaders through rigorous training, discipline, and community service." },
                  { icon: Globe, title: "Global Citizenship", desc: "Understanding the role of space in connecting and protecting the modern world." }
                ].map((card, i) => (
                  <div key={i} className="group p-8 bg-[#252525] border border-[#5f686e]/30 rounded-sm hover:border-[#3684ca] transition-all duration-300 hover:-translate-y-2 shadow-lg">
                      <div className="w-14 h-14 bg-[#3684ca]/10 rounded-full flex items-center justify-center text-[#3684ca] mb-6 group-hover:bg-[#3684ca] group-hover:text-white transition-colors">
                        <card.icon size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                      <p className="text-[#96a3ae] leading-relaxed text-sm">{card.desc}</p>
                  </div>
                ))}
              </div>
          </div>
        </section>

        {/* --- Find A Squadron (Search) --- */}
        <section id="locate" className="py-24 bg-[#252525] border-y border-[#5f686e]/20 relative z-10 overflow-hidden">
           {/* Radar Effect Background */}
           <div className="absolute left-0 top-0 w-full h-full opacity-5 pointer-events-none">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#3684ca] rounded-full"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#3684ca] rounded-full"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#3684ca] rounded-full"></div>
           </div>

           <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
              <div className="inline-flex items-center gap-2 text-[#3684ca] mb-4">
                 <Radar className="animate-spin-slow" size={24} />
                 <span className="font-mono text-xs uppercase tracking-widest font-bold">Unit Locator Beacon</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Find Your Local Squadron</h2>
              <p className="text-[#96a3ae] mb-8">Enter your city, state, or zip code to scan for active units in your sector.</p>
              
              <div className="flex flex-col md:flex-row gap-2 max-w-lg mx-auto">
                 <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-3.5 text-[#3684ca]" size={20} />
                    <input 
                      type="text" 
                      placeholder="ENTER COORDINATES OR ZIP" 
                      className="w-full bg-[#191818] border border-[#5f686e] text-white py-3 pl-10 pr-4 rounded-sm focus:outline-none focus:border-[#3684ca] font-mono tracking-wider"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
                 <button className="bg-[#3684ca] hover:bg-[#3684ca]/80 text-white font-bold uppercase tracking-widest px-6 py-3 rounded-sm flex items-center justify-center gap-2 transition-colors">
                    <Search size={18} /> Scan
                 </button>
              </div>
              
              {/* Mock Results */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                 <div className="bg-[#191818]/50 border border-[#5f686e]/30 p-4 rounded-sm hover:border-[#3684ca]/50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold text-white group-hover:text-[#3684ca]">SQ-101 "Sentinels"</h4>
                       <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">Active</span>
                    </div>
                    <p className="text-xs text-[#96a3ae] font-mono mb-1">Boston, MA (Sector 1)</p>
                    <p className="text-[10px] text-[#5f686e]">Distance: 4.2 miles</p>
                 </div>
                 <div className="bg-[#191818]/50 border border-[#5f686e]/30 p-4 rounded-sm hover:border-[#3684ca]/50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold text-white group-hover:text-[#3684ca]">SQ-304 "Vanguard"</h4>
                       <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">Active</span>
                    </div>
                    <p className="text-xs text-[#96a3ae] font-mono mb-1">Providence, RI (Sector 1)</p>
                    <p className="text-[10px] text-[#5f686e]">Distance: 12.8 miles</p>
                 </div>
              </div>
           </div>
        </section>

        {/* --- Feature/Tech Section --- */}
        <section className="py-24 bg-[#191818]/90 relative overflow-hidden z-10" id="news">
          {/* Decorative Circle */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 border-[40px] border-[#3684ca]/5 rounded-full"></div>

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block text-[#3684ca] font-mono text-xs uppercase tracking-widest mb-4">Advanced Training Infrastructure</div>
                <h2 className="text-4xl font-bold text-white mb-6">Equipping The Next Generation</h2>
                <p className="text-[#96a3ae] mb-8 leading-relaxed">
                    The SFCC utilizes cutting-edge simulation technology and real-world operational frameworks. 
                    Our cadets train using the same systems and methodologies as active duty guardians, 
                    ensuring seamless transition to higher education or service careers.
                </p>
                
                <div className="space-y-4">
                    {[
                      "Cyber Security Ranges", 
                      "Drone Flight Operations", 
                      "Emergency Response Certifications",
                      "Satellite Communications (SATCOM)"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <Target size={14} />
                        </div>
                        <span className="text-white font-medium">{item}</span>
                      </div>
                    ))}
                </div>
              </div>
              
              <div className="relative">
                {/* Abstract UI Representation */}
                <div className="bg-[#191818] border border-[#5f686e]/50 rounded p-6 shadow-2xl relative z-10">
                    <div className="flex items-center gap-2 mb-4 border-b border-[#5f686e]/30 pb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <div className="ml-auto text-[10px] font-mono text-[#96a3ae]">SYS.MONITOR.v2</div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-[#252525] rounded w-3/4"></div>
                      <div className="h-2 bg-[#252525] rounded w-1/2"></div>
                      <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="h-20 bg-[#3684ca]/10 border border-[#3684ca]/30 rounded flex items-center justify-center">
                            <Cpu className="text-[#3684ca]" />
                          </div>
                          <div className="h-20 bg-[#252525] border border-[#5f686e]/30 rounded"></div>
                          <div className="h-20 bg-[#252525] border border-[#5f686e]/30 rounded"></div>
                      </div>
                    </div>
                </div>
                
                {/* Background Elements */}
                <div className="absolute -top-4 -right-4 w-full h-full border border-[#3684ca]/30 rounded -z-10"></div>
              </div>
          </div>
        </section>

        {/* --- Call To Action (Split) --- */}
        <section id="join" className="py-24 bg-[#252525] text-center px-6 relative z-10 border-t border-[#5f686e]/20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
             
             {/* CTA 1: Join as Cadet */}
             <div className="bg-[#191818] border border-[#5f686e]/30 p-10 rounded-sm relative overflow-hidden group hover:border-[#3684ca] transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3684ca] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <Users size={48} className="text-[#3684ca] mb-6 mx-auto" />
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">Join The Corps</h3>
                <p className="text-[#96a3ae] mb-8 text-sm leading-relaxed">
                   Are you age 12-18? Ready to push your limits in STEM and Leadership? Locate a squadron and begin your application.
                </p>
                <button className="w-full py-4 bg-[#3684ca] hover:bg-[#3684ca]/90 text-white font-bold uppercase tracking-widest text-sm rounded-sm transition-all shadow-lg shadow-[#3684ca]/20">
                   Start Cadet Application
                </button>
             </div>

             {/* CTA 2: Start a Squadron */}
             <div className="bg-[#191818] border border-[#5f686e]/30 p-10 rounded-sm relative overflow-hidden group hover:border-emerald-500 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <FlagIcon className="text-emerald-500 mb-6 mx-auto w-12 h-12" />
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">Command A Squadron</h3>
                <p className="text-[#96a3ae] mb-8 text-sm leading-relaxed">
                   Adult volunteers with prior service or STEM experience are needed to lead new units. Charter a squadron in your city.
                </p>
                <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest text-sm rounded-sm transition-all shadow-lg shadow-emerald-500/20">
                   Start Unit Charter
                </button>
             </div>

          </div>
        </section>
      </main>

      {/* --- Footer (Fixed & Discreet) --- */}
      <footer className="fixed bottom-0 left-0 w-full z-50 bg-[#0f0f11]/95 backdrop-blur border-t border-[#3684ca]/30 py-2 px-6 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#96a3ae]">
           
           {/* Left: Copyright */}
           <div className="flex items-center gap-4">
              <span>© 2023 SFCC</span>
              <span className="hidden md:inline text-[#5f686e]">|</span>
              <span className="hidden md:inline text-[#5f686e]">Non-Official Edu Org</span>
           </div>

           {/* Center: Links (Hidden on small mobile) */}
           <div className="hidden md:flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
           </div>

           {/* Right: Status */}
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[#3684ca]">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#3684ca] animate-pulse"></div>
                 <span>Net: Online</span>
              </div>
              <button onClick={onEnterCommand} className="hover:text-white transition-colors border-l border-[#5f686e]/30 pl-4">
                 CMD Access
              </button>
           </div>

        </div>
      </footer>

    </div>
  );
};

// Helper Icon for Flag since Lucide's Flag is a bit generic
const FlagIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" x2="4" y1="22" y2="15" />
  </svg>
);

export default PublicWebsite;
