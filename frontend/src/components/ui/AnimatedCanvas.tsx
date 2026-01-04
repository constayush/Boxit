"use client";

import React, { Suspense, useRef, useEffect, useState, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";
import { Link } from "react-router";
import { motion } from "framer-motion";

// Memoized Model component with optimized rendering
const Model = memo(({ path = "/statueModel.glb" }: { path?: string }) => {
  const group = useRef<any>(null);
  const gltf: any = useGLTF(path);

  useFrame((state, delta) => {
    if (group.current) {
      // Smooth rotation with capped delta time
      const cappedDelta = Math.min(delta, 0.1);
      group.current.rotation.y += cappedDelta * 0.3;
    }
  });

  return (
    <group ref={group} dispose={null}>
      <primitive 
        object={gltf.scene} 
        position={[0, -1.2, 0]} 
        scale={[1.2, 1.2, 1.2]} 
      />
    </group>
  );
});

// Optimized scroll zoom with smoother interpolation
const ScrollZoom = memo(({ targetZ }: { targetZ: React.MutableRefObject<number> }) => {
  const { camera, invalidate } = useThree();
  const lastUpdate = useRef(0);

  useEffect(() => {
    let raf: number;

    const update = (time: number) => {
      // Throttle updates to every 16ms (60fps max)
      if (time - lastUpdate.current < 16) {
        raf = requestAnimationFrame(update);
        return;
      }
      lastUpdate.current = time;

      const minZ = 1.8;
      const maxZ = 6;
      const t = THREE.MathUtils.clamp(targetZ.current, minZ, maxZ);

      // Smoother lerp interpolation
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, t, 0.08);

      // Only invalidate if there's significant change
      if (Math.abs(camera.position.z - t) > 0.001) {
        invalidate();
      }

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [camera, targetZ, invalidate]);

  return null;
});

// Loading fallback component
const LoadingFallback = memo(() => (
  <Html center>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-3"
    >
      <motion.div
        className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <span className="text-white text-sm font-medium">Loading 3D...</span>
    </motion.div>
  </Html>
));

export default function ScrollImageSequence() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetZ = useRef<number>(4);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Intersection observer to only render when near viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        // Once visible, keep rendering
        if (entry.isIntersecting) {
          setShouldRender(true);
        }
      },
      { rootMargin: '300px' } // Start loading 300px before visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Optimized scroll handler with passive listener
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const startZ = 4;
    const endZ = 2.2;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const height = el.offsetHeight;
          const scrolled = window.scrollY - top;
          const progress = Math.min(Math.max(scrolled / (height - window.innerHeight || 1), 0), 1);
          
          // Smooth easing function
          const eased = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
          
          targetZ.current = startZ + eased * (endZ - startZ);
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="relative h-[200vh]" ref={containerRef}>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {/* Paper texture */}
        <img
          src="/paper-texture.webp"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-darken z-1 pointer-events-none"
          alt=""
        
        />

        {/* 3D Canvas - only render when should load */}
        {shouldRender && (
          <div className="absolute inset-0 pointer-events-none">
            <Canvas
              dpr={[1, 1.5]} // Cap pixel ratio for performance
              camera={{ position: [0, 0, 4], fov: 30 }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                stencil: false,
                depth: true
              }}
              frameloop={isVisible ? "always" : "demand"} // Pause when not visible
              shadows={false} // Disable shadows for better performance
            >
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={40} />
              
              <Suspense fallback={<LoadingFallback />}>
                <Model path="/statueModel.glb" />
              </Suspense>
              
              <OrbitControls 
                enabled={false} 
                enablePan={false} 
                enableZoom={false} 
                enableRotate={false}
              />
              <ScrollZoom targetZ={targetZ} />
            </Canvas>
          </div>
        )}

        {/* Text overlay with smooth animations */}
        <section className="relative z-10 text-center px-8 pointer-events-none">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-6xl russo max-w-6xl flex flex-col text-left"
          >
            You need
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="text-red-600 text-[clamp(4rem,8vw,7rem)]"
              style={{ willChange: 'transform' }}
            >
              Obsession
            </motion.span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mt-8 justify-end pointer-events-auto"
          >
            <Link to="/select" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(239, 68, 68, 0.4)",
                  transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-[#fd5353] to-red-600 border-t-2 transition-all duration-300 rounded-sm py-4 px-8 text-lg font-bold text-white"
              >
                Train with Us
              </motion.button>
            </Link>
            
            <Link to="/learn" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full border border-white/70 text-white bg-transparent transition-all duration-300 rounded-sm py-4 px-8 text-lg font-medium"
              >
                Learn Boxing
              </motion.button>
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

// Preload the GLTF model
useGLTF.preload("/statueModel.glb");