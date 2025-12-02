
import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { ChevronRight, ChevronDown, Globe, Map, Shield, Radio } from 'lucide-react';

export interface SquadronLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  type: 'ACTIVE' | 'TRAINING';
  cityState?: string;
}

interface SquadronGlobeProps {
  locations: SquadronLocation[];
  onSelect: (id: string) => void;
  selectedId: string | null;
}

const STATE_NAMES: Record<string, string> = {
  'TX': 'Texas',
  'FL': 'Florida',
  'DC': 'Washington D.C.',
  'D.C.': 'Washington D.C.',
  'CO': 'Colorado',
  'AL': 'Alabama',
  'CA': 'California',
  'NY': 'New York',
  'VA': 'Virginia'
};

const SquadronGlobe: React.FC<SquadronGlobeProps> = ({ locations, onSelect, selectedId }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineRef = useRef<SVGLineElement>(null); 
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  
  const phiRef = useRef(4.5);
  const thetaRef = useRef(0);
  const scaleRef = useRef(0.4); 
  
  // Refs for render loop access
  const selectedIdRef = useRef(selectedId);
  const locationsRef = useRef(locations);

  // Accordion State
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['United States']));

  useEffect(() => {
      selectedIdRef.current = selectedId;
      locationsRef.current = locations;
  }, [selectedId, locations]);

  useEffect(() => {
    let globe: any;
    let width = 0;

    const initGlobe = () => {
        if (!divRef.current || !canvasRef.current) return;
        
        const newWidth = divRef.current.clientWidth;
        if (Math.abs(newWidth - width) < 10 && width !== 0) return;
        width = newWidth;

        if (width === 0) return;

        if (globe) {
            globe.destroy();
        }

        // Configuration
        const globeSize = width * 2;
        const globeOffset: [number, number] = [0, globeSize * 0.85]; 

        globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: globeSize, 
            height: globeSize,
            phi: phiRef.current,
            theta: thetaRef.current,
            dark: 1,
            diffuse: 2.5,
            mapSamples: 16000,
            mapBrightness: 12, 
            baseColor: [0.1, 0.1, 0.12], 
            markerColor: [0.21, 0.52, 0.79], 
            glowColor: [0.1, 0.26, 0.4], 
            offset: globeOffset, 
            markers: [], 
            onRender: (state) => {
                if (!pointerInteracting.current) {
                    phiRef.current += 0.0008;
                }
                state.phi = phiRef.current + pointerInteractionMovement.current;
                state.theta = thetaRef.current;
                state.scale = scaleRef.current; 
                state.width = globeSize;
                state.height = globeSize;

                // Dynamic Marker Update from Ref
                state.markers = locationsRef.current.map(loc => ({
                    location: [loc.lat, loc.lon],
                    size: loc.type === 'ACTIVE' ? 0.06 : 0.04
                }));

                // --- 3D to 2D Projection Logic ---
                if (lineRef.current && selectedIdRef.current) {
                    const activeLoc = locationsRef.current.find(l => l.id === selectedIdRef.current);
                    
                    if (activeLoc) {
                        const latRad = activeLoc.lat * Math.PI / 180;
                        const lonRad = activeLoc.lon * Math.PI / 180;

                        const y = Math.sin(latRad);
                        const rXZ = Math.cos(latRad);
                        const x = rXZ * Math.cos(lonRad);
                        const z = rXZ * Math.sin(lonRad);

                        const phi = state.phi;
                        const xRot = x * Math.cos(phi) - z * Math.sin(phi);
                        const zRot = x * Math.sin(phi) + z * Math.cos(phi);
                        
                        const R = (globeSize / 2) * state.scale;
                        
                        const Cx = globeSize / 2;
                        const Cy = (globeSize / 2) + globeOffset[1];

                        const screenXInternal = Cx + (xRot * R);
                        const screenYInternal = Cy - (y * R); 

                        const screenX = screenXInternal / 2;
                        const screenY = screenYInternal / 2;

                        lineRef.current.setAttribute('x1', `${screenX}`);
                        lineRef.current.setAttribute('y1', `${screenY}`);
                        
                        const targetX = width - 380; 
                        const targetY = 100; 
                        
                        lineRef.current.setAttribute('x2', `${targetX > 0 ? targetX : width - 20}`);
                        lineRef.current.setAttribute('y2', `${targetY}`);

                        const isVisible = zRot > 0;
                        lineRef.current.style.opacity = isVisible ? '1' : '0.1';
                        
                    } else {
                        lineRef.current.style.opacity = '0';
                    }
                } else if (lineRef.current) {
                    lineRef.current.style.opacity = '0';
                }
            }
        });
    };

    const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(initGlobe);
    });

    if (divRef.current) {
        resizeObserver.observe(divRef.current);
    }

    return () => {
        if (globe) globe.destroy();
        resizeObserver.disconnect();
    };
  }, []);

  // Helper to Group Locations
  const getGroupedLocations = () => {
    const groups: Record<string, Record<string, SquadronLocation[]>> = {};

    locations.forEach(loc => {
      const country = "United States";
      const stateCode = loc.cityState ? loc.cityState.split(',')[1]?.trim() : "Other";
      const stateName = STATE_NAMES[stateCode] || stateCode || "Unknown Sector";

      if (!groups[country]) groups[country] = {};
      if (!groups[country][stateName]) groups[country][stateName] = [];
      groups[country][stateName].push(loc);
    });
    return groups;
  };

  const groupedData = getGroupedLocations();

  const toggleNode = (node: string) => {
    const next = new Set(expandedNodes);
    if (next.has(node)) next.delete(node);
    else next.add(node);
    setExpandedNodes(next);
  };

  return (
    <div 
      ref={divRef}
      className="w-full h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center bg-[#0f0f11] overflow-hidden group"
      onPointerDown={(e) => {
        pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
        if(divRef.current) divRef.current.style.cursor = 'grabbing';
      }}
      onPointerUp={() => {
        pointerInteracting.current = null;
        if(divRef.current) divRef.current.style.cursor = 'grab';
      }}
      onPointerOut={() => {
        pointerInteracting.current = null;
        if(divRef.current) divRef.current.style.cursor = 'grab';
      }}
      onMouseMove={(e) => {
        if (pointerInteracting.current !== null) {
          const delta = e.clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta * 0.005;
        }
      }}
      onWheel={(e) => {
          e.preventDefault();
          scaleRef.current = Math.max(0.2, Math.min(1.0, scaleRef.current - e.deltaY * 0.001));
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ 
            width: '100%', 
            height: '100%', 
            maxWidth: '100%', 
            maxHeight: '100%',
            objectFit: 'contain',
            opacity: 1 
        }}
      />
      
      {/* Dynamic Connection Line Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
          <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
          </defs>
          <line 
            ref={lineRef} 
            stroke="#3684ca" 
            strokeWidth="1.5" 
            strokeDasharray="4 2"
            filter="url(#glow)"
            className="transition-opacity duration-300 ease-in-out"
          />
          <circle r="3" fill="#3684ca" className="animate-pulse">
             <animateMotion dur="1.5s" repeatCount="indefinite">
                <mpath href="#lineRef" />
             </animateMotion>
          </circle>
      </svg>

      {/* Tactical Data HUD Overlay - Nested Tree */}
      <div className="absolute top-6 left-6 pointer-events-none z-10 hidden md:block w-72">
         <div className="flex items-center gap-2 mb-4 bg-[#0f0f11]/80 p-2 rounded backdrop-blur-sm border border-[#3684ca]/30 w-fit">
            <Radio className="text-[#3684ca] animate-pulse" size={16} />
            <h4 className="text-[#c7d7e2] font-mono text-xs uppercase tracking-[0.2em] font-bold">Active Uplinks</h4>
         </div>
         
         <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#3684ca]/20 scrollbar-track-transparent">
            {Object.entries(groupedData).map(([country, states]) => (
                <div key={country} className="pointer-events-auto">
                    {/* Country Level */}
                    <button 
                        onClick={() => toggleNode(country)}
                        className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-[#3684ca]/10 text-xs font-bold text-[#c7d7e2] uppercase tracking-wider group transition-colors"
                    >
                        {expandedNodes.has(country) ? <ChevronDown size={14} className="text-[#3684ca]" /> : <ChevronRight size={14} className="text-[#5f686e]" />}
                        <Globe size={14} className="text-[#3684ca]" />
                        {country}
                    </button>

                    {/* States Level */}
                    {expandedNodes.has(country) && (
                        <div className="ml-2 border-l border-[#3684ca]/20 pl-2 mt-1 space-y-1">
                            {Object.entries(states).map(([state, units]) => (
                                <div key={state}>
                                    <button 
                                        onClick={() => toggleNode(state)}
                                        className="flex items-center gap-2 w-full text-left p-1.5 rounded hover:bg-[#3684ca]/5 text-[11px] font-bold text-[#96a3ae] group transition-colors uppercase tracking-wide"
                                    >
                                        {expandedNodes.has(state) ? <ChevronDown size={12} className="text-[#3684ca]" /> : <ChevronRight size={12} className="text-[#5f686e]" />}
                                        <Map size={12} className={expandedNodes.has(state) ? "text-[#c7d7e2]" : "text-[#5f686e]"} />
                                        {state}
                                        <span className="ml-auto text-[9px] bg-[#3684ca]/10 text-[#3684ca] px-1.5 rounded">{units.length}</span>
                                    </button>

                                    {/* Squadrons Level */}
                                    {expandedNodes.has(state) && (
                                        <div className="ml-3 border-l border-[#3684ca]/10 pl-2 mt-1 space-y-1">
                                            {units.map((loc) => (
                                                <button 
                                                    key={loc.id} 
                                                    onClick={(e) => {
                                                        e.stopPropagation(); 
                                                        onSelect(loc.id);
                                                    }}
                                                    className={`flex w-full items-center gap-2 p-1.5 rounded-sm backdrop-blur-sm transition-all text-left ${
                                                        selectedId === loc.id 
                                                        ? 'bg-[#3684ca]/20 border border-[#3684ca]/50 text-white shadow-[0_0_10px_rgba(54,132,202,0.2)]' 
                                                        : 'hover:bg-[#3684ca]/5 text-[#5f686e] hover:text-[#c7d7e2] border border-transparent'
                                                    }`}
                                                >
                                                    <Shield size={10} className={selectedId === loc.id ? 'text-[#3684ca]' : 'opacity-50'} />
                                                    <span className="text-[10px] font-mono w-14 opacity-70">{loc.id}</span>
                                                    <span className="text-[10px] font-bold uppercase truncate flex-1">{loc.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
         </div>
      </div>

      {/* Interaction Hints */}
      <div className="absolute bottom-4 left-4 pointer-events-none transition-opacity opacity-50 group-hover:opacity-100">
         <div className="flex flex-col gap-1">
            <span className="text-[10px] text-[#3684ca] font-mono uppercase tracking-widest bg-[#0f0f11]/80 px-2 py-1 rounded border border-[#3684ca]/30">
               Drag to Rotate
            </span>
            <span className="text-[10px] text-[#3684ca] font-mono uppercase tracking-widest bg-[#0f0f11]/80 px-2 py-1 rounded border border-[#3684ca]/30">
               Scroll to Zoom
            </span>
         </div>
      </div>
    </div>
  );
};

export default SquadronGlobe;
