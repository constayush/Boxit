"use client";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { Trophy, Users, ChevronDown } from "lucide-react";
import { motion, useInView } from "framer-motion";
import CustomCursor from "../ui/Cursor";
import VideoCard from "../ui/VideoCard";
import "../../index.css";
import ScrollToTop from "../ui/ScrollToTop";

export default function Home() {
  type CursorVariant = "default" | "button" | "text";

  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const videosRef = useRef(null);
  const ctaRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const isVideosInView = useInView(videosRef, { once: true, amount: 0.2 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  const legendaryFights = [
    {
      title: "Muhammad Ali vs Joe Frazier – Thrilla in Manila (1975)",
      videoUrl: "https://www.youtube.com/embed/oNEfN2R4oRc",
    },
    {
      title: "Mike Tyson vs Trevor Berbick (1986)",
      videoUrl: "https://www.youtube.com/embed/QKFhSnX9LzM",
    },
    {
      title: "Floyd Mayweather vs Manny Pacquiao (2015)",
      videoUrl: "https://www.youtube.com/embed/39zhhfMGNRk",
    },
    {
      title: "Gatti vs Ward I (2002)",
      videoUrl: "https://www.youtube.com/embed/wxyQvFmlXiw",
    },
    {
      title: "Tyson Fury vs Deontay Wilder III (2021)",
      videoUrl: "https://www.youtube.com/embed/vxw3x1zVvEE",
    },
  ];

  const enterButton = () => setCursorVariant("button");
  const enterText = () => setCursorVariant("text");
  const leaveButton = () => setCursorVariant("default");

  return (
    <div className="min-h-screen min-w-full flex flex-col justify-center items-center bg-[#030303] text-white overflow-hidden">
      <ScrollToTop />

      <CustomCursor cursorVariant={cursorVariant} />

      {/* Hero Section */}

      <motion.div
        ref={heroRef}
        className="hero-section relative w-full flex p-14 items-center justify-center min-h-screen"
      >
        <div className="absolute inset-0 hero-gradient"></div>
        {/* <video
            className="w-[50%] border-6 border-[#ffffff0f] h-full object-cover grayscale-100 rounded-lg "
            autoPlay
            loop
            muted
            src={bgVideo}
          ></video> */}

        {/* <img
            className="w-[50%] aspect-video  border-6 border-[#ffffff0f] h-full object-cover grayscale-100 rounded-lg " src={bgImg}  /> */}

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container relative z-10 flex flex-col items-center px-4 md:px-12 my-12 md:my-24"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-[30%] h-[100%] absolute top-0 left-0 -z-10 bg-[#a0d3fd] blur-[300px]"
          ></motion.span>

          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeIn" }}
            className="w-[30%] h-[100%] absolute top-0 right-0 -z-10 bg-[#f48282] blur-[300px]"
          ></motion.span>
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 50, letterSpacing: "20px" }}
              animate={
                isHeroInView ? { opacity: 1, y: 0, letterSpacing: "0px" } : {}
              }
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-8xl md:text-[8rem] font-bold mb-1 russo tracking-widest"
              onMouseEnter={enterText}
              onMouseLeave={leaveButton}
            >
              Box'
              <motion.span initial={{}} className="text-red-600">
                it.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-xl md:text-xl  text-gray-300/90"
              onMouseEnter={enterText}
              onMouseLeave={leaveButton}
            >
              Your Ultimate Boxing Guide! – Train, Learn, and Fight!
              <br />
              Stay ahead with the ultimate boxing platform.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col mt-8 sm:flex-row gap-4 sm:gap-8 justify-center"
            >
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={enterButton}
                onMouseLeave={leaveButton}
                className="w-full sm:w-auto border border-white/30 hover:border-white hover:border-2 bg-gradient-to-tl from-red-600 to-[#2d0303] transition-all duration-300 rounded-xl py-4 px-8 text-xl font-medium tracking-wide"
              >
                Learn
              </motion.button> */}

              <button className="cursor-pointer bg-gradient-to-b from-[#000000] to-[#000000]   border-2   text-white font-medium group w-full sm:w-auto  border-white/20 hover:border-white hover:border-2 transition-all duration-300 rounded-xl py-4 px-8 text-xl tracking-wide">
                <Link to="/learn">
                  <div className="relative overflow-hidden">
                    <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                      Learn
                    </p>
                    <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                      Learn
                    </p>
                  </div>
                </Link>
              </button>

              <button className="cursor-pointer bg-gradient-to-b from-[#6e0106] to-[#b20009]  shadow-[0px_4px_32px_0_rgba(255,255,255,.05)] border-2   text-white font-medium group w-full sm:w-auto  border-white/50 hover:border-white hover:border-2 transition-all duration-300 rounded-xl py-4 px-8 text-xl tracking-wide">
                <Link to="/select">
                  <div className="relative overflow-hidden">
                    <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                      Train
                    </p>
                    <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                      Train
                    </p>
                  </div>
                </Link>
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="absolute top-90 opacity-50 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
              <ChevronDown className="w-8 h-8 text-white/70" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <hr className="w-full border border-[#ffffff27]" />

      {/* Features */}
      <div className="w-full bg-[#020202] py-20">
        <div ref={featuresRef} className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="text-red-600">Box'it</span>?
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </motion.div>

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
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full max-w-6xl mx-auto"
          >
            <FeatureCard
              icon={
                <Trophy className="w-12 h-12 text-red-500 mb-4 relative z-10" />
              }
              title="Pro Techniques"
              description="Learn boxing techniques from professional fighters"
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
              description="Master what you’ve learned by training and repeating techniques in the Practice section."
              onMouseEnter={enterButton}
              onMouseLeave={leaveButton}
            />
          </motion.div>
        </div>
      </div>

      {/* Legendary Fights */}
      <div className="w-full bg-gradient-to-b from-[#020202] to-[#120000] py-20">
        <div ref={videosRef} className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVideosInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Legendary Fights <span className="text-red-600">🥊</span>
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isVideosInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="grid gap-12 md:grid-cols-2 max-w-6xl mx-auto"
          >
            {legendaryFights.map((fight, index) => (
              <VideoCard
                key={index}
                title={fight.title}
                videoUrl={fight.videoUrl}
                onMouseEnter={enterButton}
                onMouseLeave={leaveButton}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.footer
        ref={ctaRef}
        initial={{ opacity: 0 }}
        animate={isCtaInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="w-full bg-gradient-to-b from-[#120000] to-black py-24"
      >
        <div className="container mx-auto  text- max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl font-bold mb-6"
          >
            Ready to Step in the Ring?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 mb-12"
          >
            Join us and improve your skills today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 "
          >
            <Link to="/learn">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={enterButton}
                onMouseLeave={leaveButton}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-xl py-4 px-8 text-xl font-bold"
              >
                Learn boxing
              </motion.button>
            </Link>
            <Link to="/select">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={enterButton}
                onMouseLeave={leaveButton}
                className="w-full sm:w-auto border border-white/70 bg-transparent hover:bg-white/10 transition-all duration-300 rounded-xl py-4 px-8 text-xl font-medium"
              >
                Train with us
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isCtaInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-sm w-full flex flex-col items-center justify-center text-gray-500"
        >
          <hr className="w-full border-1 mb-14" />
          Note - All video content featured in this app is the intellectual
          property of its respective owners. We do not claim ownership of any
          third-party videos.
          <p>
            bulid by -{" "}
            <a
              href="https://constayush.vercel.app/"
              target="_blank"
              className="text-red-200 hover:text-red-600"
            >
              Ayush
            </a>
          </p>
        </motion.div>
      </motion.footer>
    </div>
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
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className="feature-card motion-div bg-[#040404] border border-[#ffffff3f] w-full relative p-6 rounded-xl flex flex-col items-center text-center overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-0 opacity-5 transition-all z-0"></div>
      {icon}
      <h3 className="text-xl font-bold mb-2 relative z-10">{title}</h3>
      <p className="text-gray-400 relative z-10">{description}</p>
      {link !== "" && (
        <Link
          to="#"
          className="mt-4 text-red-500 hover:text-red-400 font-medium"
        >
          Learn more →
        </Link>
      )}
    </motion.div>
  );
};
