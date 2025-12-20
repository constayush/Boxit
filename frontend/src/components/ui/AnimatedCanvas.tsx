"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";

const FRAME_COUNT = 40;

const FRAME_PATH = (i: number) =>
  `/frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

export default function ScrollImageSequence() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  /* 🔥 scroll progress relative to SECTION */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  /* map progress → frame index with smooth easing */
  const frame = useTransform(
    scrollYProgress,
    [0, 1],
    [0, FRAME_COUNT - 1],
    { clamp: true }
  );

  /* Obsession animation - flows up on view, down on scroll back */
  const obsessionY = useTransform(scrollYProgress, [.8, 1], [.8, 0]);
//   const obsessionOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);

  /* preload + draw */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1920;
    canvas.height = 1080;

    const render = (i: number) => {
      const idx = Math.round(i);
      const img = imagesRef.current[idx];
      if (!img || !img.complete) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // preload frames
    imagesRef.current = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i + 1);
      imagesRef.current.push(img);
    }

    imagesRef.current[0].onload = () => render(0);

    // subscribe to motion value with smoother rendering
    const unsubscribe = frame.on("change", (v) => {
      requestAnimationFrame(() => render(v));
    });

    return unsubscribe;
  }, [frame]);

  return (
    <div ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {/* overlay */}
        <img
          src="/paper-texture.webp"
          className="absolute inset-0 w-full h-full object-cover opacity-100 mix-blend-darken z-1  pointer-events-none"
          alt=""
        />

        {/* canvas with smooth transition */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-90 transition-opacity duration-300"
        />

        {/* content */}
        <section className="relative z-10 text-center px-8">
          <p className="text-6xl russo max-w-6xl flex flex-col text-left">
            You need 
            
            <motion.span 

              whileInView={{
                
                letterSpacing: "0.09em",
                y: 0,
                transition: { type: "tween", stiffness:100, duration: .6 },
              
              }}
              
        
              className="text-red-600 text-[clamp(4rem,8vw,7rem)] will-change-transform"
            >
              Obsession
            </motion.span>
          </p>

          
        <motion.div className="flex flex-col sm:flex-row gap-4 mt-8 justify-end">
          <Link to="/select" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-[#fd5353] to-red-600 border-t-2  hover:bg-red-700 transition-all duration-300 rounded-sm py-4 px-8 text-lg font-bold text-white"
            >
              Train with Us
            </motion.button>
          </Link>
          <Link to="/learn" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full border border-white/70 text-white bg-transparent hover:bg-white/10 transition-all duration-300 rounded-sm py-4 px-8 text-lg font-medium"
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