
import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export interface SquadronLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  type: 'ACTIVE' | 'TRAINING';
}

interface SquadronGlobeProps {
  locations: SquadronLocation[];
  onSelect: (id: string) => void;
}

const SquadronGlobe: React.FC<SquadronGlobeProps> = ({ locations, onSelect }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  
  // State refs for animation continuity
  const phiRef = useRef(4.5);
  const thetaRef = useRef(0);
  const scaleRef = useRef(0.4); // Small default scale

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

        globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2, 
            height: width * 2,
            phi: phiRef.current,
            theta: thetaRef.current,
            dark: 1,
            diffuse: 2.5,
            mapSamples: 16000,
            mapBrightness: 12, 
            baseColor: [0.1, 0.1, 0.12], 
            markerColor: [0.21, 0.52, 0.79], 
            glowColor: [0.1, 0.26, 0.4], 
            // FIX: Lowered offset further (0.85) to push globe down by ~25% more
            offset: [0, width * 2 * 0.85], 
            markers: locations.map(loc => ({
                location: [loc.lat, loc.lon],
                size: loc.type === 'ACTIVE' ? 0.06 : 0.04
            })),
            onRender: (state) => {
                if (!pointerInteracting.current) {
                    // FIX: Slower rotation (0.0008 is approx 50% of previous 0.0015)
                    phiRef.current += 0.0008;
                }
                state.phi = phiRef.current + pointerInteractionMovement.current;
                state.theta = thetaRef.current;
                state.scale = scaleRef.current; 
                state.width = width * 2;
                state.height = width * 2;
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
  }, [locations]);

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
      
      {/* Tactical Data HUD Overlay */}
      <div className="absolute top-6 left-6 pointer-events-none z-10 hidden md:block">
         <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-[#3684ca] rounded-full animate-pulse"></div>
            <h4 className="text-[#3684ca] font-mono text-xs uppercase tracking-[0.2em] font-bold">Active Uplinks</h4>
         </div>
         <div className="space-y-2">
            {locations.map((loc) => (
                <button 
                    key={loc.id} 
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent globe drag
                        onSelect(loc.id);
                    }}
                    className="flex w-full items-center gap-3 bg-[#0f0f11]/80 border border-[#3684ca]/20 p-2 rounded-sm backdrop-blur-sm pointer-events-auto hover:bg-[#3684ca]/10 hover:border-[#3684ca] transition-all group/item text-left"
                >
                    <span className="text-[10px] font-mono text-[#5f686e] w-16 group-hover/item:text-[#3684ca]">{loc.id}</span>
                    <span className="text-xs font-bold text-[#c7d7e2] uppercase w-32 truncate">{loc.name}</span>
                    <span className="text-[10px] font-mono text-[#3684ca]">{loc.lat.toFixed(1)}°N</span>
                </button>
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
