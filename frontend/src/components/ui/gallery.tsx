import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import effect_img_1 from "../../../public/effect_1.jpeg";
import effect_img_2 from "../../../public/effect_5.jpeg";
import effect_img_3 from "../../../public/effect_3.jpeg";
import effect_img_4 from "../../../public/effect_4.jpeg";
import effect_img_5 from "../../../public/effect_2.jpeg";
import effect_img_6 from "../../../public/effect_6.jpeg";
import effect_img_7 from "../../../public/effect_7.jpeg";
import effect_img_8 from "../../../public/effect_8.jpeg";
import paperTex from "../../../public/paper-texture.webp";

function GallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);
  const scaleh1 = useTransform(scrollYProgress, [0.1, 0.2, 0.3, 0.4, 0.5, 0.6], [1, 1.5, 1, 1.5, 1, 1.5]);
  const baseScale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const baseX = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Text animation transforms
  const toOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.25, 0.3], [0, 1, 1, 0]);
  const beOpacity = useTransform(scrollYProgress, [0.3, 0.35, 0.4, 0.45], [0, 1, 1, 0]);
  const theOpacity = useTransform(scrollYProgress, [0.45, 0.5, 0.55, 0.6], [0, 1, 1, 0]);
  const greatestOpacity = useTransform(scrollYProgress, [0.6, 0.65, 1], [0, 1, 1]);

  const pictures = [
    {
      src: effect_img_1,
      offset: 0.6,
      direction: "left",
      classes:
        "w-[50vw] md:w-[25vw] h-[40vh] top-[1vh] md:top-[-1vh] left-[6vh] md:left-[4vw] shadow-3xl",
    },
    {
      src: effect_img_2,
      offset: 0.1,
      direction: "right",
      classes:
        "top-[-30vh] md:top-[-22vh] right-[-12vw] md:right-[-20vw] w-[39vw] md:w-[12vw] h-[15vh] md:h-[30vh]",
    },
    {
      src: effect_img_3,
      offset: 0.2,
      direction: "left",
      classes:
        "top-[-30vh] md:top-[-18vh] md:left-[-23vw] left-[-18vw] w-[25vw] md:w-[15vw] h-[15vh] md:h-[30vh]",
    },
    {
      src: effect_img_4,
      offset: 0.3,
      direction: "right",
      classes:
        "left-[27.5vw] w-[20vw] h-[25vh] md:left-[38vw]  top-[-4.5vh] md:top-[22vh]",
    },
    {
      src: effect_img_5,
      offset: 0.4,
      direction: "up",
      classes:
        "top-[32vh] left-[2vw] w-[25vw] md:w-[18vw] h-[25vh] md:left-[37vw] md:top-[-16vh]",
    },
    {
      src: effect_img_6,
      offset: 0.5,
      direction: "left",
      classes:
        "top-[27.5vh] left-[-30vw] w-[25vw] md:w-[12vw] h-[39vh] md:top-[22vh] md:left-[-16vw]",
    },
    {
      src: effect_img_7,
      offset: 0.6,
      direction: "right",
      classes:
        "top-[22.5vh] left-[30vw] md:w-[15vw] w-[25vw] h-[35vh] md:top-[17vh] md:left-[15vw]",
    },
    {
      src: effect_img_8,
      offset: 0.7,
      direction: "up",
      classes:
        "top-[0vh] left-[-26vw] md:left-[-35vw] md:top-[17vh] w-[15vw] h-[30vh] md:h-[60vh]",
    },
  ];

  return (
    <motion.div
      style={{ scale }}
      ref={galleryRef}
      className="relative h-[300vh] ease-in top-[-50vh] w-full"
    >
      <motion.div 
      // style={{borderRadius: roundedBorder+"rem"}}
      className="sticky flex justify-center items-center -top-12 h-[calc(100vh+48px)] border-t  overflow-hidden bg-[#202020] rounded-t-[3rem] ">
        <img
          src={paperTex}
          alt="Paper texture overlay"
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay pointer-events-none"
        />

        <div className="absolute inset-0 flex items-center justify-center z-[99]">
          {/* TO */}
          <motion.h1
            style={{ opacity: toOpacity, scale: scaleh1 }}
            className="absolute russo font-extrabold  text-[5rem] md:text-[6rem] text-white mix-blend-difference drop-shadow-[0_0_2px_rgba(0,0,0,0.6)]"
          >
            TO
          </motion.h1>

          {/* BE */}
          <motion.h1
            style={{ opacity: beOpacity, scale: scaleh1  }}
            className="absolute russo font-extrabold  text-[5rem] md:text-[6rem] text-white mix-blend-difference drop-shadow-[0_0_2px_rgba(0,0,0,0.6)]"
          >
            BE
          </motion.h1>

          {/* THE */}
          <motion.h1
            style={{ opacity: theOpacity , scale: scaleh1 }}
            className="absolute russo font-extrabold text-[5rem] md:text-[6rem] text-white mix-blend-difference drop-shadow-[0_0_2px_rgba(0,0,0,0.6)]"
          >
            THE
          </motion.h1>

          {/* GREATEST */}
          <motion.h1
            style={{ opacity: greatestOpacity, scale: scaleh1  }}
            className="absolute  font-extrabold text-[clamp(2.5rem,8vw,7rem)] text-red-600 tracking-wide drop-shadow-[100px_100px_100px_rgba(0,0,0,100)]"
          >
            GREATEST
          </motion.h1>
        </div>

        {pictures.map(({ src, offset, direction, classes }, index) => {
          const localScale = useTransform(
            baseScale,
            (v) => 1 + (v - 1) * (1 + offset)
          );

          const localX = useTransform(baseX, (v) =>
            direction === "left"
              ? v * (1 + offset * 1.5)
              : direction === "right"
              ? -v * (1 + offset * 1.5)
              : 0
          );

          const localY = useTransform(
            scrollYProgress,
            [0, 1],
            [0, direction === "up" ? -150 : 0]
          );

          return (
            <motion.div
              key={index}
              style={{
                scale: localScale,
                x: localX,
                y: localY,
                zIndex: 10 - index,
              }}
              className="absolute inset-0 flex ease-in-out items-center justify-center"
            >
              <div className={`relative ${classes}`}>
                <img
                  src={src}
                  alt={`gallery-${index}`}
                  className="object-cover w-full h-full rounded-3xl shadow-2xl border border-black/20"
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default GallerySection;