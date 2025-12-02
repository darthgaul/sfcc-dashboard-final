import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ConstellationBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  // Store mouse position (normalized -1 to 1)
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Configuration Constants ---
    // Drastically reduced scale to fit STRICTLY within the logo at center
    const FIELD_SCALE = 1.0; 
    // Star size (Base visual size)
    const UNIFORM_STAR_VISUAL_SIZE = 0.02; 

    // --- Data: Orion Stars ---
    const orionStars = [
        { name: "Betelgeuse", x: 2.5, y: 3.5, z: 0 }, 
        { name: "Bellatrix", x: 1.5, y: 3.0, z: 4 }, 
        { name: "Rigel", x: -4.0, y: -4.0, z: -2 }, 
        { name: "Saiph", x: -5.5, y: -5.0, z: 1 }, 
        { name: "Mintaka", x: -0.5, y: -0.5, z: -3 }, 
        { name: "Alnilam", x: 0.0, y: -1.0, z: -5 }, 
        { name: "Alnitak", x: 0.5, y: -1.5, z: -4 }, 
        { name: "Heka", x: 2.0, y: 5.0, z: -1 }, 
        { name: "Iota", x: 0.0, y: -3.0, z: -4 }, 
        { name: "Mebsuta", x: 4.5, y: 5.0, z: -1 }, 
        { name: "Mu Ori", x: 3.0, y: 5.5, z: 2 }, 
        { name: "Pi4", x: -0.5, y: 2.0, z: 5 }, 
        { name: "Delta Lep", x: -5.0, y: -7.0, z: -3 }, 
    ];

    const connections = [
        ['Heka', 'Betelgeuse'],
        ['Heka', 'Bellatrix'], 
        ['Betelgeuse', 'Bellatrix'],
        ['Bellatrix', 'Mintaka'], 
        ['Mintaka', 'Alnilam'],
        ['Alnilam', 'Alnitak'],
        ['Alnitak', 'Iota'],
        ['Alnilam', 'Iota'],
        ['Mintaka', 'Rigel'],
        ['Alnitak', 'Saiph'], 
        ['Saiph', 'Rigel'],
    ];

    // --- Helper: Create Star Texture ---
    function createStarTexture(color = 0xFFFFFF) { 
        const size = 64;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext('2d');
        if (!context) return new THREE.Texture();

        context.clearRect(0, 0, size, size); 
        context.fillStyle = new THREE.Color(color).getStyle(); 
        
        const centerX = size / 2;
        const centerY = size / 2;
        const outerRadius = size / 2 * 0.9; 
        const innerRadius = outerRadius * 0.4; 

        context.beginPath();
        for (let i = 0; i < 8; i++) { 
            const radius = (i % 2 === 0) ? outerRadius : innerRadius;
            const angle = Math.PI / 4 * i - Math.PI / 2; 
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            if (i === 0) context.moveTo(x, y);
            else context.lineTo(x, y);
        }
        context.closePath();
        context.fill();
        return new THREE.CanvasTexture(canvas);
    }

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x191818); // Match app bg

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 80);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = 'block';
    mountRef.current.appendChild(renderer.domElement);

    // --- Group for Centering ---
    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // --- Create Stars & Calc Bounding Box ---
    const starMap: Record<string, THREE.Vector3> = {};
    const texture = createStarTexture(0xFFFFFF);
    const material = new THREE.SpriteMaterial({
        map: texture,
        color: 0xFFFFFF, // Pure White
        transparent: true,
        opacity: 0.15,   // 15% opacity
        sizeAttenuation: false, 
    });

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    orionStars.forEach(data => {
        const star = new THREE.Sprite(material.clone());

        const x = data.x * FIELD_SCALE;
        const y = data.y * FIELD_SCALE;
        const z = data.z * FIELD_SCALE;

        // Bounding Box Logic
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        if (z < minZ) minZ = z;
        if (z > maxZ) maxZ = z;

        star.position.set(x, y, z);
        star.scale.set(UNIFORM_STAR_VISUAL_SIZE, UNIFORM_STAR_VISUAL_SIZE, 1);
        
        constellationGroup.add(star);
        starMap[data.name] = star.position;
    });

    // --- Center the Group ---
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const centerZ = (minZ + maxZ) / 2;
    // Offset the group so the geometric center is at (0,0,0)
    constellationGroup.position.set(-centerX, -centerY, -centerZ);


    // --- Create Lines ---
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xFFFFFF, // White lines
        linewidth: 1,
        opacity: 0.1, // Even fainter lines
        transparent: true
    });

    connections.forEach(([start, end]) => {
        const p1 = starMap[start];
        const p2 = starMap[end];
        if (p1 && p2) {
            const geometry = new THREE.BufferGeometry().setFromPoints([p1, p2]);
            const line = new THREE.Line(geometry, lineMaterial);
            constellationGroup.add(line);
        }
    });

    // --- Add background dust ---
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 100; 
    const posArray = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 40; 
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.1, 
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.1 
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);


    // --- Interaction Logic ---
    const handleMouseMove = (event: MouseEvent) => {
        mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- Animation Loop ---
    const animate = () => {
        requestAnimationFrame(animate);

        // 1. Calculate radial distance from center
        const dist = Math.sqrt(mouseRef.current.x ** 2 + mouseRef.current.y ** 2);

        // 2. Dynamic Scaling: Expand constellation structure
        const targetScale = 1.0 + (dist * 2.5); 
        const currentScale = constellationGroup.scale.x;
        const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.05);
        
        constellationGroup.scale.set(newScale, newScale, newScale);

        // 3. Inverse Scaling for Stars (Fix: Maintain constant visual size)
        // We traverse children. If it's a sprite, we shrink it inversely to the group scale.
        constellationGroup.children.forEach(child => {
             if (child instanceof THREE.Sprite) {
                 const invScale = UNIFORM_STAR_VISUAL_SIZE / newScale;
                 child.scale.set(invScale, invScale, 1);
             }
        });

        // 4. 3D Rotation / Panning Logic
        // Map Mouse X to Y-Rotation (Pan Left/Right)
        // Map Mouse Y to X-Rotation (Tilt Up/Down)
        // Multiply by a factor (e.g., 0.5 or 1.0) to control sensitivity
        const targetRotY = mouseRef.current.x * 1.5; // Rotate around vertical axis
        const targetRotX = -mouseRef.current.y * 1.5; // Rotate around horizontal axis

        constellationGroup.rotation.y = THREE.MathUtils.lerp(constellationGroup.rotation.y, targetRotY, 0.05);
        constellationGroup.rotation.x = THREE.MathUtils.lerp(constellationGroup.rotation.x, targetRotX, 0.05);

        // Add a slow, constant drift for life
        constellationGroup.rotation.z += 0.0005;

        renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (mountRef.current) {
            mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
            ref={mountRef} 
            className="absolute inset-0"
            style={{ background: '#191818' }}
        />
        {/* Emblem Overlay - Centered and blended */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.1] mix-blend-screen flex items-center justify-center z-10">
            <img 
                src="https://i.imgur.com/TwvGqDF.png" 
                alt="SFCC Emblem Background" 
                className="w-[60vmin] h-[60vmin] object-contain" 
            />
        </div>
    </div>
  );
};

export default ConstellationBackground;