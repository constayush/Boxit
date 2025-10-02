"use client";
import { useRef, useState } from "react";
import { Link } from "react-router";
import {
  Trophy,
  Users,
  ArrowRight,
  Activity,
  Settings,
  ChevronRight,
} from "lucide-react";
import { motion, useInView, useSpring } from "framer-motion";
import CustomCursor from "../ui/Cursor";
import VideoCard from "../ui/VideoCard";
import "../../index.css";
import ScrollToTop from "../ui/ScrollToTop";
import { useTransform, useScroll } from "framer-motion";
import effect_img_1 from "../../../public/effect_1.jpeg";
import effect_img_2 from "../../../public/effect_5.jpeg";
import effect_img_3 from "../../../public/effect_3.jpeg";
import effect_img_4 from "../../../public/effect_4.jpeg";
import effect_img_5 from "../../../public/effect_2.jpeg";
import effect_img_6 from "../../../public/effect_6.jpeg";
import effect_img_7 from "../../../public/effect_7.jpeg";
import effect_img_8 from "../../../public/effect_8.jpeg";
import promo_1 from "../../../public/promo-1.png";
import paperTex from "../../../public/paper-texture.webp";
export default function Home() {
  type CursorVariant = "default" | "button" | "text";
  const { scrollYProgress: scrollYProgress2 } = useScroll();
  const y = useTransform(scrollYProgress2, [0, 1], [0, -50]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const heroRef = useRef(null);
  const gallery_ref = useRef(null);
  const featuresRef = useRef(null);
  const videosRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const boxingCombos = [
    { name: "Jab, Cross", code: "1-2" },
    { name: "Jab, Cross, Hook", code: "1-2-3" },
    { name: "Jab, Cross, Uppercut", code: "1-2-6" },
    { name: "Jab, Jab, Cross", code: "1-1-2" },
    { name: "Cross, Hook, Cross", code: "2-3-2" },
    { name: "Jab, Cross, Hook, Uppercut", code: "1-2-3-6" },
  ];
  const legendaryFights = [
    {
      title: "Muhammad Ali vs Joe Frazier – Thrilla in Manila (1975)",
      videoUrl: "https://www.youtube.com/embed/oNEfN2R4oRc",
      description:
        "The brutal third clash in their epic rivalry. Fought in scorching heat, this fight pushed both men beyond their limits, with Ali calling it 'the closest thing to dying.'",
    },
    {
      title: "Mike Tyson vs Trevor Berbick (1986)",
      videoUrl: "https://www.youtube.com/embed/QKFhSnX9LzM",
      description:
        "A 20-year-old Mike Tyson becomes the youngest heavyweight champion in history, demolishing Berbick in just two rounds with ferocious power.",
    },
    {
      title: "Floyd Mayweather vs Manny Pacquiao (2015)",
      videoUrl: "https://www.youtube.com/embed/39zhhfMGNRk",
      description:
        "The long-awaited 'Fight of the Century.' A masterclass in defensive boxing from Mayweather as he outpoints Pacquiao in a tactical showdown.",
    },
    {
      title: "Gatti vs Ward I (2002)",
      videoUrl: "https://www.youtube.com/embed/wxyQvFmlXiw",
      description:
        "An all-out war from start to finish. Arturo Gatti and Micky Ward traded non-stop punishment in one of the most thrilling bouts in boxing history.",
    },
    {
      title: "Tyson Fury vs Deontay Wilder III (2021)",
      videoUrl: "https://www.youtube.com/embed/vxw3x1zVvEE",
      description:
        "The dramatic conclusion to their trilogy. Multiple knockdowns, insane comebacks, and Fury’s final knockout to seal one of the greatest heavyweight rivalries.",
    },
    {
      title: "George Foreman vs Muhammad Ali (1974)",
      videoUrl: "https://www.youtube.com/embed/55AasOJZzDE",
      description:
        "The legendary 'Rumble in the Jungle.' Ali uses his famous rope-a-dope strategy to tire out the powerful Foreman before delivering a stunning knockout.",
    },
  ];
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress: scrollYProgress_promo1 } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotateX_promo1 = useTransform(
    scrollYProgress_promo1,
    [0, 0.5],
    [100, 0]
  );

  const y_promo1 = useTransform(scrollYProgress_promo1, [0, 0], [100, 0]);

  const opacity_promo1 = useTransform(
    scrollYProgress_promo1,
    [0, 0.3],
    [0.5, 1]
  );

  const { scrollYProgress } = useScroll({
    target: gallery_ref,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: effect_img_1,
      scale: scale4,
      classes: "w-[25vw] h-[25vh] top-[5vh] md:top-[-15vh]",
    },
    {
      src: effect_img_2,
      scale: scale5,
      classes:
        "top-[-30vh] md:top-[-30vh] right-[-20vw] w-[28vw] md:w-[12vw] h-[30vh]",
    },
    {
      src: effect_img_3,
      scale: scale6,
      classes:
        "top-[-20vh] top-[-20vh] md:left-[-28vw] left-[-22vw] w-[40vw] md:w-[25vw] h-[45vh]",
    },
    {
      src: effect_img_4,
      scale: scale5,
      classes: "left-[27.5vw] w-[20vw] h-[25vh] md:left-[38vw] md:top-[20vh]",
    },
    {
      src: effect_img_5,
      scale: scale6,
      classes:
        "top-[32vh] left-[2vw]  w-[25vw] md:w-[18vw] h-[25vh] md:left-[37vw] md:top-[-36vh]",
    },
    {
      src: effect_img_6,
      scale: scale8,
      classes:
        "top-[27.5vh] left-[-30vw] w-[25vw] md:w-[12vw] h-[25vh] md:top-[22vh]  md:left-[-20vw]",
    },
    {
      src: effect_img_7,
      scale: scale4,
      classes:
        "top-[22.5vh] left-[30vw] md:w-[15vw] w-[25vw] h-[15vh] md:top-[12vh] md:left-[22vw] ",
    },
    {
      src: effect_img_8,
      scale: scale9,
      classes:
        "top-[0vh] left-[-26vw] md:left-[-35vw]  md:top-[17vh] w-[15vw] h-[15vh]",
    },
  ];

  const enterButton = () => setCursorVariant("button");
  const enterText = () => setCursorVariant("text");
  const leaveButton = () => setCursorVariant("default");

  const features = [
    {
      icon: <Activity className="w-8 h-8 text-pink-400" />,
      title: "Punch Tracking",
      desc: "AI-powered punch detection to count, track, and improve your performance in real time.",
    },
    {
      icon: <Settings className="w-8 h-8 text-blue-400" />,
      title: "Custom & Standard Combos",
      desc: "Practice pre-built combinations or create your own custom routines for tailored training.",
    },
    {
      icon: <Users className="w-8 h-8 text-green-400" />,
      title: "Learn with Experts",
      desc: "Access guided lessons, tips, and drills designed by professional boxing coaches.",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen min-w-full flex flex-col justify-center items-center bg-[#141414] text-white "
    >
      <ScrollToTop />
      <CustomCursor cursorVariant={cursorVariant} />
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="hero-section relative w-full flex flex-col items-center justify-center min-h-screen py-12 md:py-26"
      >
        <div className="absolute inset-0 hero-gradient"></div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center mb-10 text-center w-full max-w-5xl "
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-[30%] h-[100%] absolute top-0 left-0 -z-10 bg-[#60a5fa] blur-[300px]"
          ></motion.span>

          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeIn" }}
            className="w-[30%] h-[100%] absolute top-0 right-0 -z-10 bg-[#e065659e] blur-[300px]"
          ></motion.span>

      <motion.h1
  initial={{ opacity: 0, y: 50, letterSpacing: "5px" }}
  animate={isHeroInView ? { opacity: 1, y: 0, letterSpacing: "0px" } : {}}
  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
  className="italic russo text-[clamp(3.5rem,8vw,8rem)] leading-tight"
  onMouseEnter={enterText}
  onMouseLeave={leaveButton}
>
  Box'<motion.span className="text-red-600">Lit</motion.span>
</motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-md md:text-xl mt-4 font-medium text-gray-300/85"
            onMouseEnter={enterText}
            onMouseLeave={leaveButton}
          >
            Your Ultimate Boxing Guide! – Train, Learn, and Fight!
            <br />
            Stay ahead with the ultimate boxing platform.
          </motion.p>
        </motion.div>

        <div className="w-full pt-0 md:pt-12">
          <div ref={featuresRef} className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate={isFeaturesInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto"
            >
              <FeatureCard
                icon={
                  <Trophy className="w-12 h-12 text-red-500 mb-4 relative z-10" />
                }
                title="Learn Boxing"
                description="Master the fundamentals, from footwork to punches by professionals"
                link="/learn"
                onMouseEnter={enterButton}
                onMouseLeave={leaveButton}
              />

              <FeatureCard
                link={"/select"}
                icon={
                  <Users className="w-12 h-12 text-red-500 mb-4 relative z-10" />
                }
                title="Training"
                description="Sharpen your skills with drills, discipline, and real fight conditioning"
                onMouseEnter={enterButton}
                onMouseLeave={leaveButton}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
      <hr className="w-full border  border-[#ffffff36]" />

      <section
        ref={sectionRef}
        className="relative flex-col gap-20 w-full mt-20 flex items-center justify-center"
      >
        <span className="absolute blur-[400px] top-0 left-0 w-[50%] h-[40%] bg-[#fe808071]" />
        <span className="absolute blur-[400px] top-0 right-0 w-[50%] h-[40%] bg-[#575cfa6d] " />
        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10  w-full p-4 backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl text-center"
        >
          {" "}
          <img
            src={paperTex}
            alt="Paper texture overlay"
            className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay pointer-events-none"
          />
          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-black/1 border border-white/20 backdrop-blur-md text-left shadow-lg"
              >
                {f.icon}
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-white/70 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
          {/* CTA */}
          <div className="my-12 flex justify-center gap-4">
            <Link to={"/learn"}>
              <button className="px-6 py-3 rounded-full bg-white/20 border border-white/40 text-white font-semibold backdrop-blur-sm hover:bg-white/30 transition">
                Learn
              </button>
            </Link>
            <Link to={"/select"}>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-red-600 text-white font-semibold shadow-lg hover:opacity-90 transition">
                Throw punches <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </motion.div>

        <section
          ref={sectionRef}
          className="w-full relative flex flex-col items-center justify-center bg-white/10 border-white/20 border shadow-xl py-20"
        >
          <img
            src={paperTex}
            alt="Paper texture overlay"
            className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay pointer-events-none"
          />
          <div className="max-w-6xl w-full px-6 flex flex-col items-center gap-16">
            <div className="w-full" style={{ perspective: "3000px" }}>
              <motion.div
                style={{
                  rotateX: rotateX_promo1,
                  y: y_promo1,
                  opacity: opacity_promo1,
                  transformStyle: "preserve-3d",
                }}
                className=" w-full p-3 sticky top-10 rounded-3xl overflow-hidden bg-gradient-to-b from-white/20 to-red-500/10 backdrop-blur-2xl border border-white/50 shadow-2xl cursor-pointer"
              >
                <img
                  className="rounded-2xl  border border-white/50 w-full"
                  src={promo_1}
                  alt="Boxing Training"
                />
                {/* Subtle shine effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 to-white/0"
                  animate={{ opacity: [0, 0.15, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
                />
              </motion.div>
            </div>

            {/* Animated Description */}
            <motion.div
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className=" text-4xl md:text-6xl font-extrabold text-white russo  mb-6 tracking-tight relative">
                Experience{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-purple-300 animate-text">
                  Next-Level Boxing
                </span>{" "}
                Training
              </h2>

              <span className="flex w-full justify-center gap-4">
                <Link to="/learn">
                  <button className="px-8 py-3 h-10 flex items-center justify-center bg-gradient-to-r from-red-600 to-pink-600 hover:to-red-500 text-white rounded-3xl font-semibold transition-all shadow-lg hover:shadow-xl">
                    Learn to box
                  </button>
                </Link>

                <a
                  href="https://www.youtube.com/channel/UCiE7yqBDTQjtk1abuw92FQg"
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="flex gap-1 justify-center items-center text-center cursor-pointer border border-white/30 text-white rounded-3xl px-8 py-3 h-10 font-semibold transition-all shadow-lg hover:shadow-xl hover:bg-white/10">
                    Atiko's YT <ArrowRight className="w-5 h-5" />
                  </button>
                </a>
              </span>
            </motion.div>
          </div>
        </section>
      </section>

      <section className="w-full p-4 mt-20 relative flex flex-col items-center justify-center bg-white/10 border-white/20 border shadow-xl py-20">
        {" "}
        <span className="absolute blur-[400px] top-0 right-0 w-[50%] h-[40%] bg-[#fe80803b]" />
        <span className="absolute blur-[400px] top-0 left-0 w-[50%] h-[40%] bg-[#575cfa9c] " />
        {/* Paper texture overlay */}
        <img
          src={paperTex}
          alt="Paper texture overlay"
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay pointer-events-none"
        />
        {/* Panels wrapper */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 w-full max-w-6xl mx-auto">
          {/* Pre-built Combos Panel */}
          <div className="flex-1 border border-white/50 bg-black/10 rounded-2xl shadow-2xl w-full flex flex-col relative">
            {/* Top Bar */}
            <div className="absolute top-0  left-0 right-0 flex items-center justify-between bg-[#ffffff] rounded-t-2xl px-3 py-1 border-b border-[#ffffff22] z-10">
              <div className="flex space-x-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <span className="text-gray-600 text-xs font-mono">
                Pre-built Combos
              </span>
              <div></div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 flex flex-col mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
                {boxingCombos.map((combo, index) => (
                  <button
                    key={index}
                    className="bg-white/10 hidden md:flex shadow-2xl border border-[#ffffff22] hover:border-red-500 hover:bg-black text-white p-5 rounded-xl transition-all duration-300  flex-col items-start h-full"
                  >
                    <div className="bg-red-600/50 border border-black text-white px-3 py-1 rounded-full text-sm font-mono mb-2">
                      {combo.code}
                    </div>
                    <span className="text-lg font-medium">{combo.name}</span>
                    <div className="mt-auto pt-2 w-full flex justify-end">
                      <ChevronRight className="w-5 h-5 text-gray-200" />
                    </div>
                  </button>
                ))}

                {boxingCombos.slice(0, 3).map((combo, i) => (
                  <button
                    key={i}
                    className="bg-white/10 flex md:hidden shadow-2xl border border-[#ffffff22] hover:border-red-500 hover:bg-black text-white p-5 rounded-xl transition-all duration-300 flex-col items-start h-full"
                  >
                    <div className="bg-red-600/50 border border-black text-white px-3 py-1 rounded-full text-sm font-mono mb-2">
                      {combo.code}
                    </div>
                    <span className="text-lg font-medium">{combo.name}</span>
                    <div className="mt-auto pt-2 w-full flex justify-end">
                      <ChevronRight className="w-5 h-5 text-gray-200" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Combo Builder Panel */}
          <div className="flex-1 border border-white/50  bg-black/40 rounded-2xl p-6 shadow-2xl w-full flex flex-col relative">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between bg-[#ffffff] rounded-t-2xl px-3 py-1 border-b border-[#ffffff22] z-10">
              <div className="flex space-x-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <span className="text-gray-600 text-xs font-mono">
                Custom Combo Builder
              </span>
              <div></div>
            </div>

            {/* Content */}
            <div className="flex-1 pt-8 px-4 flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-white">
                Create Custom Combo
              </h2>

              {/* Drag area */}
              <div className="w-full min-h-24 bg-black/80 border-2 border-gray-700 rounded-lg p-4 mb-6 flex flex-wrap items-center text-center gap-2 flex-1">
                {["Jab", "Cross", "Hook"].map((punch, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center w-16 h-16 rounded-lg text-white font-bold text-lg cursor-pointer bg-red-700"
                  >
                    <div className="text-xl font-bold">{punch[0]}</div>
                    <div className="text-xs">{punch}</div>
                  </div>
                ))}
              </div>

              {/* Punch Palette */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-white">
                  Punch Palette
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                  {["Jab", "Cross", "Hook", "Uppercut"].map((punch, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center w-full aspect-square rounded-lg text-white font-bold cursor-pointer bg-gray-700 hover:opacity-80 transition-opacity"
                    >
                      <div className="text-xl font-bold">{punch[0]}</div>
                      <div className="text-xs text-center px-1">{punch}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main heading */}
        <h2 className=" text-5xl md:text-6xl text-center font-extrabold text-white russo mt-18 tracking-tight relative">
          Train with pre-made combos <br /> or create{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-purple-300 animate-text">
            unlimited
          </span>{" "}
          custom sequences.
        </h2>
      </section>

      <hr className="border-gray-700 w-full my-10 " />

      {/* Gallery Section */}
      <div ref={gallery_ref} className="relative h-[300vh] w-full ">
        <div className="sticky top-0 h-screen overflow-hidden ">
          {pictures.map(({ src, scale, classes }, index) => (
            <motion.div
              key={index}
              style={{ scale }}
              className="absolute top-0 left-0 flex items-center justify-center w-full h-full"
            >
              <div className={`relative ${classes}`}>
                <img src={src} alt="image" className="object-cover" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Legendary Fights */}
      <div className="legendary-fights-wrapper relative flex justify-center items-center w-full mt-20 ">
        <span className="absolute blur-[400px] top-0 left-0 w-[20%] h-[80%] bg-[#fc4f4f8d]" />
        <span className="absolute blur-[400px] top-0 right-0 w-[20%] h-[80%] bg-[#575cfa75]" />
        <motion.div
          ref={videosRef}
          className="w-full  max-w-6xl relative flex justify-center items-center "
        >
          <div className="p-4">
            <motion.div className="text-center mb-22">
              <h2 className="text-4xl md:text-6xl russo  mb-4">
                THUNDER, <span className="text-red-600">BLOOD</span>, LEGACY
              </h2>
              <div className="w-90 h-1 bg-red-600 mx-auto"></div>
              <p className="mt-2 text-xl text-gray-300">
                A collection of the most iconic boxing matches in history
              </p>
            </motion.div>

            <div className="grid gap-12 md:grid-cols-3 max-w-6xl mx-auto place-items-center p-4">
              {legendaryFights.map((fight, index) => (
                <VideoCard
                  key={index}
                  title={fight.title}
                  description={fight.description}
                  videoUrl={fight.videoUrl}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <hr className="border-gray-700 w-full my-20" />

      <div className="relative w-full flex flex-col items-center">
        {/* Glow effects */}
        <span className="absolute blur-[400px] top-0 left-0 w-[50%] h-[80%] bg-[#fc4f4fb9]" />
        <span className="absolute blur-[400px] top-0 right-0 w-[50%] h-[80%] bg-[#575dfac8]" />

        {/* Brand */}

        <motion.p className="text-3xl russo p-4 text-center max-w-3xl">
          "Everybody has a plan until they get punched in the mouth." -{" "}
          <span className="text-red-500">Mike Tyson</span>
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link to="/learn" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={enterButton}
              onMouseLeave={leaveButton}
              className="w-full bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-xl py-4 px-8 text-lg font-bold text-white"
            >
              Learn Boxing
            </motion.button>
          </Link>
          <Link to="/select" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={enterButton}
              onMouseLeave={leaveButton}
              className="w-full border border-white/70 text-white bg-transparent hover:bg-white/10 transition-all duration-300 rounded-xl py-4 px-8 text-lg font-medium"
            >
              Train with Us
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <hr className="border-gray-700 w-full mt-20" />

      {/* Full Footer */}
      <footer className="w-full bg-gray-900 text-gray-400 text-sm">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-10 relative">
          {/* Footer Glow */}
          <span className="absolute blur-[300px] -top-20 left-1/4 w-[30%] h-[60%] bg-red-600/40" />
          <span className="absolute blur-[300px] -top-20 right-1/4 w-[30%] h-[60%] bg-blue-500/40" />

          {/* Links */}
          <div className="flex flex-col">
            <h1 className="text-6xl md:text-7xl  text-stone-100 russo mb-4">
              BOX'LIT
            </h1>

            <div className="border-t border-gray-700  pt-6 text-center text-gray-500">
              &copy; {new Date().getFullYear()} BOX'LIT. All rights reserved.
            </div>
          </div>

          {/* Legal / Credits */}
          <div className="mt-10 lg:mt-0 text-center lg:text-left max-w-sm">
            <p className="mb-2">
              Note - All video content featured in this app is the intellectual
              property of its respective owners. We do not claim ownership of
              any third-party videos.
            </p>
            <p>
              Built by –{" "}
              <a
                href="https://constayush.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-300 hover:text-red-600 transition"
              >
                Ayush
              </a>
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

const FeatureCard = ({
  icon,
  title,
  description,
  link,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.3 }}
      className="feature-card motion-div group bg-[#00000000]  backdrop-blur-3xl border border-[#ffffff4c] w-full relative p-6 rounded-xl flex flex-col items-center text-center overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link to={link}>
        <div className="absolute inset-0 opacity-5 transition-all z-0"></div>
        <span className="flex w-full justify-center items-center">{icon}</span>

        <span className="flex  flex-col w-full justify-center items-center gap- mb-2">
          <h3 className="text-xl underline underline-offset-4 font-bold mb-2 group-hover:underline-offset-8 transition-all duration-200 relative z-10 flex">
            {title}{" "}
          </h3>
          {/* <ArrowRightCircle size={40} className="text-white/30"/> */}
        </span>
        <p className="text-gray-400 relative z-10">{description}</p>
      </Link>
    </motion.div>
  );
};
