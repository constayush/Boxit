"use client";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { Trophy, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
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
export default function Home() {
  type CursorVariant = "default" | "button" | "text";

  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const heroRef = useRef(null);
  const gallery_ref = useRef(null);
  const featuresRef = useRef(null);
  const videosRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
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
      classes: "w-[25vw] h-[25vh] top-[1vh] md:top-[-15vh]",
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

  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration:2, ease: "easeOut" }}
    
    className="min-h-screen min-w-full flex flex-col justify-center items-center bg-[#030303] text-white ">
      <ScrollToTop />
      <CustomCursor cursorVariant={cursorVariant} />
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="hero-section relative w-full flex flex-col items-center justify-center min-h-screen py-12 md:py-20"
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
            className="w-[30%] h-[100%] absolute top-0 left-0 -z-10 bg-[#1688e4] blur-[300px]"
          ></motion.span>

          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeIn" }}
            className="w-[30%] h-[100%] absolute top-0 right-0 -z-10 bg-[#e06565] blur-[300px]"
          ></motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 50, letterSpacing: "20px" }}
            animate={
              isHeroInView ? { opacity: 1, y: 0, letterSpacing: "0px" } : {}
            }
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-[5rem] md:text-[8rem] font-bold  russo tracking-widest"
            onMouseEnter={enterText}
            onMouseLeave={leaveButton}
          >
            Box'
            <motion.span className="text-red-600">it</motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl font-medium text-gray-300/90"
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
                description="Master the fundamentals, from footwork to powerful punches by professionals"
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
      {/* Legendary Fights */}
      <div className="legendary-fights-wrapper relative flex justify-center items-center w-full mt-20">
        <span className="absolute blur-[400px] top-0 left-0 w-[20%] h-[80%] bg-[#fc4f4fb9]" />
        <span className="absolute blur-[400px] top-0 right-0 w-[20%] h-[80%] bg-[#575dfac8]" />
        <motion.div
          ref={videosRef}
          className="w-full  max-w-6xl relative flex justify-center items-center"
        >
          <div className="">
            <motion.div className="text-center mb-22">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                THUNDER, <span className="text-red-600">BLOOD</span>, LEGACY
              </h2>
              <div className="w-90 h-1 bg-red-600 mx-auto"></div>
              <p className="mt-2 text-xl text-gray-300">
                A collection of the most iconic boxing matches in history
              </p>
            </motion.div>

            <div className="grid gap-12 md:grid-cols-3 max-w-6xl mx-auto place-items-center">
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
      <hr className="border-gray-700 w-full mt-20 " />
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
      <hr className="border-gray-700/10 w-full my-10 " />
      <div className="flex justify-center items-center w-full flex-col  relative ">
        <span className="absolute blur-[400px] top-0 left-0 w-[50%] h-[80%] bg-[#fc4f4fb9]"   />
      <span className="absolute blur-[400px] top-0 right-0 w-[50%] h-[80%] bg-[#575dfac8] " />
        <motion.p className="text-3xl russo p-4 text-center">
          "Everybody has a plan until they get punched in the mouth." -{" "}
          <span className="text-red-500">Mike Tyson</span>
        </motion.p>
        <hr className="border-gray-700/10 w-full my-5 " />
        <motion.div className="flex flex-col sm:flex-row gap-4 mt-8">
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
      </div>{" "}
      <hr className="border-gray-700 w-full my-20 " />
      {/* Footer Section */}
      <motion.div className=" w-full max-w-6xl mb-20 text-sm text-gray-500 text-center relative  ">
      
        <p className="mb-2">
          Note - All video content featured in this app is the intellectual
          property of its respective owners. We do not claim ownership of any
          third-party videos.
        </p>
        <p>
          Built by –{" "}
          <a
            href="https://constayush.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-300 hover:text-red-600"
          >
            Ayush
          </a>
        </p>
      </motion.div>
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
        
        <h3 className="text-xl underline underline-offset-4 font-bold mb-2 group-hover:underline-offset-8 transition-all duration-200 relative z-10 flex">{title} </h3>
        {/* <ArrowRightCircle size={40} className="text-white/30"/> */}
        
        </span> 
        <p className="text-gray-400 relative z-10">{description}</p>
      </Link>
    </motion.div>
  );
};
