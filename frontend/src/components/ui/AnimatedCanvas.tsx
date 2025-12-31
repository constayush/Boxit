"use client";

import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";
import { Link } from "react-router";

function Model({ path = "/statueModel.glb" }: { path?: string }) {
  const group = useRef<any>(null);
  const gltf: any = useGLTF(path);

  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={gltf.scene} position={[0, -1.2, 0]} scale={[1.2, 1.2, 1.2]} />
    </group>
  );
}

export default function ScrollImageSequence() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetZ = useRef<number>(4);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const startZ = 4; // camera z at top
    const endZ = 2.2; // camera z at bottom (zoomed in)
    const onScroll = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const height = el.offsetHeight;
      const scrolled = window.scrollY - top;
      const progress = Math.min(Math.max(scrolled / (height - window.innerHeight || 1), 0), 1);
      targetZ.current = startZ + progress * (endZ - startZ);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="relative h-[200vh]" ref={containerRef}>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <img
          src="/paper-texture.webp"
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-darken z-1 pointer-events-none"
          alt=""
        />

        <div className="absolute inset-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 4], fov: 30 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={40} />
            <Suspense fallback={<Html center>loding</Html>}>
              <Model path="/statueModel.glb" />
            </Suspense>
            <OrbitControls enabled={false} enablePan={false} enableZoom={false} enableRotate={false} />
            <ScrollZoom targetZ={targetZ} />
          </Canvas>
        </div>

        <section className="relative z-10 text-center px-8 pointer-events-none">
          <p className="text-6xl russo max-w-6xl flex flex-col text-left">
            You need
            <span className="text-red-600 text-[clamp(4rem,8vw,7rem)] will-change-transform">
              Obsession
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-end pointer-events-auto">
            <Link to="/select" className="w-full sm:w-auto">
              <button className="w-full bg-gradient-to-r from-[#fd5353] to-red-600 border-t-2  hover:bg-red-700 transition-all duration-300 rounded-sm py-4 px-8 text-lg font-bold text-white">
                Train with Us
              </button>
            </Link>
            <Link to="/learn" className="w-full sm:w-auto">
              <button className="w-full border border-white/70 text-white bg-transparent hover:bg-white/10 transition-all duration-300 rounded-sm py-4 px-8 text-lg font-medium">
                Learn Boxing
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function ScrollZoom({ targetZ }: { targetZ: React.MutableRefObject<number> }) {
  const { camera } = useThree();

  useFrame(() => {
    const minZ = 1.8;
    const maxZ = 6;
    const t = THREE.MathUtils.clamp(targetZ.current, minZ, maxZ);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, t, 0.12);
    camera.updateProjectionMatrix();
  });

  return null;
}