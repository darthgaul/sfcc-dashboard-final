
import React, { useState, useEffect } from 'react';
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
  Radar, 
  Crosshair, 
  Radio, 
  Zap, 
  Map, 
  Clock, 
  Navigation, 
  ExternalLink, 
  X, 
  CreditCard, 
  UserPlus,
  Brain,
  Wifi,
  Activity,
  Lock,
  Database,
  Layout
} from 'lucide-react';
import ConstellationBackground from '../components/ConstellationBackground';
import SquadronGlobe, { SquadronLocation } from '../components/SquadronGlobe';

interface PublicWebsiteProps {
  onEnterCommand: () => void;
}

// Extended Squadron Data for Globe
interface SquadronDetails extends SquadronLocation {
  sector: string;
  commander: string;
  focus: string[];
  schedule: string;
  cadetCount: number;
  coordinatesDisplay: string;
  founded: string;
  cityState: string;
}

// UPDATE: Precise Coordinates & Correct Naming
// Austin: 30.26, -97.74
// Melbourne: 28.08, -80.60
// DC: 38.90, -77.03
// Colorado Springs: 38.83, -104.82
const MOCK_SQUADRONS: SquadronDetails[] = [
  {
    id: 'SQ-805',
    name: 'Austin Squadron',
    lat: 30.26, 
    lon: -97.74, // TX
    type: 'ACTIVE',
    sector: 'SW-04',
    commander: 'Capt. A. Rodriguez',
    focus: ['Robotics', 'Leadership'],
    schedule: 'Mondays 1800',
    cadetCount: 18,
    coordinatesDisplay: '30.26° N, 97.74° W',
    founded: '2023',
    cityState: 'Austin, TX'
  },
  {
    id: 'SQ-411',
    name: 'Space Coast Squadron',
    lat: 28.08, 
    lon: -80.60, // FL
    type: 'ACTIVE',
    sector: 'SE-01',
    commander: 'Maj. T. Nelson',
    focus: ['Launch Ops', 'Drone Pilot'],
    schedule: 'Saturdays 0900',
    cadetCount: 64,
    coordinatesDisplay: '28.08° N, 80.60° W',
    founded: '2019',
    cityState: 'Melbourne, FL'
  },
  {
    id: 'SQ-404',
    name: 'D.C. Squadron',
    lat: 38.90, 
    lon: -77.03, // DC
    type: 'ACTIVE',
    sector: 'NE-01',
    commander: 'Col. B. Miller',
    focus: ['Cyber Operations', 'Policy'],
    schedule: 'Thursdays 1830',
    cadetCount: 42,
    coordinatesDisplay: '38.90° N, 77.03° W',
    founded: '2022',
    cityState: 'Washington, D.C.'
  },
  {
    id: 'SQ-101',
    name: 'Colorado Springs Squadron',
    lat: 38.83, 
    lon: -104.82, // CO
    type: 'ACTIVE',
    sector: 'MT-01',
    commander: 'Lt Col. J. O\'Neill',
    focus: ['Orbital Mechanics', 'Survival'],
    schedule: 'Tuesdays 1800',
    cadetCount: 58,
    coordinatesDisplay: '38.83° N, 104.82° W',
    founded: '2020',
    cityState: 'Colorado Springs, CO'
  }
];

const PublicWebsite: React.FC<PublicWebsiteProps> = ({ onEnterCommand }) => {
  const [selectedSquadronId, setSelectedSquadronId] = useState<string | null>(null);
  const [selectedSquadron, setSelectedSquadron] = useState<SquadronDetails | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Logic
  const filteredSquadrons = MOCK_SQUADRONS.filter(s => {
    const query = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(query) ||
      s.cityState.toLowerCase().includes(query) ||
      s.id.toLowerCase().includes(query) ||
      s.sector.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    if (selectedSquadronId) {
      const found = MOCK_SQUADRONS.find(s => s.id === selectedSquadronId);
      setSelectedSquadron(found || null);
    } else {
        setSelectedSquadron(null);
    }
  }, [selectedSquadronId]);

  return (
    <div className="h-screen w-full bg-[#191818] text-[#c7d7e2] font-sans selection:bg-[#3684ca] selection:text-white overflow-y-auto overflow-x-hidden relative flex flex-col">
      
      {/* --- Interactive 3D Background --- */}
      <ConstellationBackground />

      {/* --- Navigation Bar --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#0f0f11] border-b border-[#3684ca] shadow-[0_5px_20px_rgba(0,0,0,0.8)]">
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
      <main className="flex-grow min-h-0 relative z-10 flex flex-col pb-40 pt-20">
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
        <div className="border-y border-[#3684ca]/30 bg-[#0f0f11]/95 backdrop-blur-md relative z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
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

        {/* --- Core Pillars (Programs) --- */}
        <section id="programs" className="py-24 bg-[#191818]/80 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white uppercase tracking-wider mb-4">Core Pillars</h2>
                <div className="h-1 w-20 bg-[#3684ca] mx-auto"></div>
              </div>

              {/* Leadership Development Container */}
              <div className="bg-[#252525]/50 border border-[#5f686e]/30 rounded-lg p-8 md:p-12 relative overflow-hidden">
                  {/* Decorative Header Background */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3684ca] to-transparent opacity-50"></div>
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                     <Users size={120} />
                  </div>

                  <div className="text-center mb-12 max-w-3xl mx-auto relative z-10">
                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Leadership Development</h3>
                     <p className="text-[#96a3ae] text-lg leading-relaxed">
                        We don't just teach technology; we forge leaders who can command it. 
                        Through teamwork, ethics, and hands-on operational experience, cadets master the domains of the future.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {[
                      { icon: Rocket, title: "Space Engineering", desc: "Hands-on rocketry, satellite orbital mechanics, and propulsion labs." },
                      { icon: Shield, title: "Cybersecurity Ops", desc: "Network defense, systems hardening, and ethical hacking scenarios." },
                      { icon: Cpu, title: "Artificial Intelligence", desc: "Machine learning fundamentals, autonomous systems logic, and data ethics." }
                    ].map((card, i) => (
                      <div key={i} className="group p-8 bg-[#191818] border border-[#5f686e]/30 rounded-sm hover:border-[#3684ca] transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col items-center text-center">
                          <div className="w-16 h-16 bg-[#3684ca]/10 rounded-full flex items-center justify-center text-[#3684ca] mb-6 group-hover:bg-[#3684ca] group-hover:text-white transition-colors duration-300">
                            <card.icon size={32} />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                          <p className="text-[#96a3ae] leading-relaxed text-sm">{card.desc}</p>
                      </div>
                    ))}
                  </div>
              </div>
          </div>
        </section>

        {/* --- 3D Globe Locator (Replaced Radar) --- */}
        <section id="locate" className="py-20 bg-[#0f0f11] relative z-10">
           
           <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col lg:flex-row justify-between items-end mb-8 gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 text-[#3684ca] mb-2">
                       <Globe className="animate-spin-slow" size={20} />
                       <span className="font-mono text-xs uppercase tracking-widest font-bold">Planetary Unit Network</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Global Squadron Locator</h2>
                  </div>
                  
                  {/* Search */}
                  <div className="relative w-full lg:w-96">
                      <Search className="absolute left-3 top-2.5 text-[#3684ca]" size={16} />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="SEARCH SECTOR, CITY, OR STATE..." 
                        className="w-full bg-[#191818] border border-[#3684ca]/30 text-white text-xs py-2.5 pl-10 pr-4 rounded-sm focus:outline-none focus:border-[#3684ca] font-mono uppercase"
                      />
                  </div>
              </div>

              {/* TACTICAL VIEWPORT FRAME - Force dimensions */}
              <div className="relative w-full h-[600px] border border-[#3684ca]/20 bg-[#0f0f11] rounded-sm overflow-hidden shadow-2xl">
                  
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 pointer-events-none z-10" 
                       style={{ backgroundImage: 'linear-gradient(#3684ca22 1px, transparent 1px), linear-gradient(90deg, #3684ca22 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.1 }}>
                  </div>
                  
                  {/* The 3D Component */}
                  <SquadronGlobe 
                      locations={filteredSquadrons} 
                      onSelect={(id) => setSelectedSquadronId(id)}
                      selectedId={selectedSquadronId}
                  />

                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#3684ca] z-20"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#3684ca] z-20"></div>

                  {/* Futuristic Detail Card (Overlay) */}
                  {selectedSquadron && (
                      <div className="absolute right-4 top-4 z-30 w-96 animate-in slide-in-from-right duration-500">
                          <div className="bg-[#0f0f11]/95 backdrop-blur-md border border-[#3684ca] p-1 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-sm">
                              <button 
                                onClick={() => setSelectedSquadronId(null)}
                                className="absolute top-2 right-2 text-[#5f686e] hover:text-white transition-colors"
                              >
                                  <X size={16} />
                              </button>

                              <div className="p-6">
                                  <div className="flex justify-between items-start mb-4">
                                      <div className="w-16 h-16 bg-[#191818] border border-[#3684ca]/50 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(54,132,202,0.2)]">
                                          <img 
                                            src="https://publish-01.obsidian.md/access/c6e84d0dba4a473d9f7c63884517ea6d/images/sfcc%20roundel%204.png" 
                                            alt="Unit Emblem" 
                                            className="w-12 h-12 object-contain"
                                          />
                                      </div>
                                      <div className="text-right">
                                          <Badge status={selectedSquadron.type === 'ACTIVE' ? 'success' : 'warning'}>{selectedSquadron.type}</Badge>
                                          <div className="text-[10px] font-mono text-[#3684ca] mt-1">{selectedSquadron.id}</div>
                                      </div>
                                  </div>

                                  <h3 className="text-2xl font-bold text-white mb-1 tracking-wide">{selectedSquadron.name}</h3>
                                  <div className="flex items-center gap-2 text-[#96a3ae] text-xs font-bold uppercase tracking-wider mb-6">
                                      <MapPin size={12} className="text-[#3684ca]" />
                                      {selectedSquadron.cityState}
                                  </div>
                                  
                                  <div className="space-y-4 mb-6 bg-[#191818]/50 p-4 rounded border border-[#3684ca]/10">
                                      <div className="flex items-center justify-between">
                                          <div className="text-[10px] text-[#5f686e] uppercase tracking-wider">Commander</div>
                                          <div className="text-xs font-bold text-white text-right">{selectedSquadron.commander}</div>
                                      </div>
                                      <div className="flex items-center justify-between">
                                          <div className="text-[10px] text-[#5f686e] uppercase tracking-wider">Strength</div>
                                          <div className="text-xs font-bold text-white text-right">{selectedSquadron.cadetCount} Cadets</div>
                                      </div>
                                      <div className="flex items-center justify-between">
                                          <div className="text-[10px] text-[#5f686e] uppercase tracking-wider">Founded</div>
                                          <div className="text-xs font-mono text-[#96a3ae] text-right">{selectedSquadron.founded}</div>
                                      </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3">
                                      <button className="py-3 bg-[#3684ca] hover:bg-[#3684ca]/90 text-white font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all rounded-sm shadow-lg shadow-[#3684ca]/20">
                                          <UserPlus size={14} /> Join Unit
                                      </button>
                                      <button className="py-3 bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all rounded-sm">
                                          <CreditCard size={14} /> Donate
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}
              </div>
           </div>
        </section>

        {/* --- Equipping The Next Generation (Replaced Tech Section) --- */}
        <section id="tech" className="py-40 bg-[#0f0f11] relative z-10 overflow-hidden min-h-[80vh] flex items-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a2e] to-[#0f0f11] opacity-50 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Text Content */}
              <div className="order-2 lg:order-1">
                 <div className="inline-block text-[#3684ca] font-mono text-xs uppercase tracking-widest mb-4">Training Infrastructure</div>
                 <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Equipping The <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#3684ca]">Next Generation</span>
                 </h2>
                 <p className="text-[#96a3ae] mb-8 text-lg leading-relaxed">
                    The SFCC utilizes cutting-edge simulation technology and real-world operational frameworks. 
                    Our cadets train using the same systems and methodologies as active duty guardians, preparing them for the complexities of modern aerospace operations.
                 </p>
                 
                 <div className="mt-8 font-mono text-sm space-y-4 border-l-2 border-[#3684ca]/30 pl-6">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <span className="text-white">Industry-Standard Cyber Ranges</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <span className="text-white">FAA-Certified Drone Flight Operations</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <span className="text-white">Emergency Response Certifications (FEMA)</span>
                    </div>
                 </div>
              </div>

              {/* Interactive HUD Visual (Systems Diagnostic) */}
              <div className="order-1 lg:order-2 relative perspective-[2000px]">
                 {/* Main Holographic Container */}
                 <div className="bg-[#191818]/80 backdrop-blur-md border border-[#3684ca]/30 p-1 rounded-lg shadow-[0_0_50px_rgba(54,132,202,0.15)] relative group transform transition-transform duration-500 hover:rotate-y-2 hover:rotate-x-2">
                    {/* Scanning Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#3684ca]/50 shadow-[0_0_15px_#3684ca] animate-scan opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>
                    
                    {/* Header of HUD */}
                    <div className="bg-[#252525] p-4 flex justify-between items-center border-b border-[#3684ca]/20 rounded-t-lg">
                        <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                        </div>
                        <div className="text-[10px] text-[#3684ca] font-mono tracking-widest">SYS.DIAGNOSTIC.ACTIVE</div>
                    </div>

                    {/* Grid of Modules */}
                    <div className="p-6 grid grid-cols-2 gap-4">
                        {/* Module 1: Cyber */}
                        <div className="bg-[#0f0f11] border border-[#5f686e]/30 p-4 rounded hover:border-[#3684ca] transition-all group/item relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#3684ca]/5 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                            <div className="flex justify-between items-start mb-3">
                                <Shield className="text-[#3684ca]" size={24} />
                                <span className="text-[9px] font-mono text-emerald-500 border border-emerald-500/30 px-1 rounded bg-emerald-500/10">SECURE</span>
                            </div>
                            <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">Cyber Defense</div>
                            <div className="h-1 w-full bg-[#252525] rounded-full overflow-hidden">
                                <div className="h-full bg-[#3684ca] w-[85%] group-hover/item:animate-pulse"></div>
                            </div>
                        </div>

                        {/* Module 2: Satellite */}
                        <div className="bg-[#0f0f11] border border-[#5f686e]/30 p-4 rounded hover:border-[#3684ca] transition-all group/item relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#3684ca]/5 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                            <div className="flex justify-between items-start mb-3">
                                <Radio className="text-[#3684ca]" size={24} />
                                <span className="text-[9px] font-mono text-emerald-500 border border-emerald-500/30 px-1 rounded bg-emerald-500/10">LINKED</span>
                            </div>
                            <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">Orbital Comms</div>
                            <div className="h-1 w-full bg-[#252525] rounded-full overflow-hidden">
                                <div className="h-full bg-[#3684ca] w-[92%] group-hover/item:animate-pulse"></div>
                            </div>
                        </div>

                        {/* Module 3: AI */}
                        <div className="bg-[#0f0f11] border border-[#5f686e]/30 p-4 rounded hover:border-[#3684ca] transition-all group/item relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#3684ca]/5 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                            <div className="flex justify-between items-start mb-3">
                                <Brain className="text-[#3684ca]" size={24} />
                                <span className="text-[9px] font-mono text-amber-500 border border-amber-500/30 px-1 rounded bg-amber-500/10">LEARNING</span>
                            </div>
                            <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">AI Logic Core</div>
                            <div className="h-1 w-full bg-[#252525] rounded-full overflow-hidden">
                                <div className="h-full bg-[#3684ca] w-[60%] group-hover/item:animate-pulse"></div>
                            </div>
                        </div>

                        {/* Module 4: Flight */}
                        <div className="bg-[#0f0f11] border border-[#5f686e]/30 p-4 rounded hover:border-[#3684ca] transition-all group/item relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#3684ca]/5 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                            <div className="flex justify-between items-start mb-3">
                                <Navigation className="text-[#3684ca]" size={24} />
                                <span className="text-[9px] font-mono text-emerald-500 border border-emerald-500/30 px-1 rounded bg-emerald-500/10">FLIGHT_RDY</span>
                            </div>
                            <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">Drone Ops</div>
                            <div className="h-1 w-full bg-[#252525] rounded-full overflow-hidden">
                                <div className="h-full bg-[#3684ca] w-[100%] group-hover/item:animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Footer Stats */}
                    <div className="bg-[#191818]/50 p-4 border-t border-[#3684ca]/20 flex justify-between items-center text-[9px] font-mono text-[#5f686e] uppercase">
                        <span>Mem: 64TB / 128TB</span>
                        <span>Uptime: 99.99%</span>
                    </div>
                 </div>
                 
                 {/* Decorative background element for depth */}
                 <div className="absolute -top-6 -right-6 w-full h-full border border-[#3684ca]/10 rounded-lg -z-10"></div>
                 <div className="absolute -bottom-6 -left-6 w-full h-full border border-[#3684ca]/10 rounded-lg -z-10"></div>
              </div>

            </div>
          </div>
        </section>

        {/* --- Call To Action (Split) --- */}
        <section id="join" className="py-24 bg-[#252525] text-center px-6 relative z-10 border-t border-[#5f686e]/20 pb-48">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
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
      <footer className="fixed bottom-0 left-0 w-full z-50 bg-[#0f0f11] border-t border-[#3684ca] py-2 px-6 shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#96a3ae]">
           <div className="flex items-center gap-4">
              <span>© 2023 SFCC</span>
              <span className="hidden md:inline text-[#5f686e]">|</span>
              <span className="hidden md:inline text-[#5f686e]">Non-Official Edu Org</span>
           </div>
           <div className="hidden md:flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
           </div>
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

// Helper Components
const Badge = ({ status, children }: { status: 'success' | 'warning' | 'danger'; children?: React.ReactNode }) => {
   const colors = {
      success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      danger: 'bg-red-500/10 text-red-500 border-red-500/20',
   };
   return (
      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${colors[status]}`}>
         {children}
      </span>
   );
};

const CheckCircle2 = ({ size, className }: { size?: number, className?: string }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
);

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
