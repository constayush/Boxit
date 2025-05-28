"use client";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { Trophy, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import CustomCursor from "../ui/Cursor";
import VideoCard from "../ui/VideoCard";
import "../../index.css";
import ScrollToTop from "../ui/ScrollToTop";
import tysonImg from "../../../public/tyson.jpg";
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

    {
      title: "George Foreman vs Muhammad Ali (1974)",
      videoUrl: "https://www.youtube.com/embed/55AasOJZzDE",
    }
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
        className="hero-section relative w-full flex flex-col items-center justify-center min-h-screen py-12 md:py-20"
      >
        <div className="absolute inset-0 hero-gradient"></div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl p-8"
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
            className="text-[5rem] md:text-[8rem] font-bold mb-1 russo tracking-widest"
            onMouseEnter={enterText}
            onMouseLeave={leaveButton}
          >
            Box'
            <motion.span className="text-red-600">it.</motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-gray-300/90"
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
      </motion.div>

      <hr className="w-full border  border-[#ffffff36]" />

     


      {/* Legendary Fights */}
      <div className="w-full relative flex justify-center items-center bg-gradient-to-b from-[#020202] to-[#120000] pt-24">



        <div ref={videosRef} className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isVideosInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-22"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-yellow-500">Legendary</span>  Fights⚔️
            </h2>

            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y:200 }}
            animate={isVideosInView ? { opacity: 1, y: 0 } : {}}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.55,
                },
              },
            }}
            className="grid gap-12 md:grid-cols-2 max-w-6xl  mx-auto place-items-center"
          >
            {legendaryFights.map((fight, index) => (
              <VideoCard    
                key={index}
                title={fight.title}
                videoUrl={fight.videoUrl}
             
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.footer
        
      
        className="w-full bg-gradient-to-b from-[#120000] to-black px-4 md:px-12 pt-24 flex justify-center items-center flex-col "
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ y: 30 }}
            animate={isCtaInView ? { y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-24"
          >
            Ready to Step in the Ring?
          </motion.h2>

          <div className="flex flex-col-reverse mt-8 lg:flex-row h-full items-start  justify-end gap-12">
            <div className="w-full lg:w-1/2 flex flex-col justify-center   text-left">
              {[
                "Unleash your inner champ with our action-packed training modes — whether you're throwing punches in Shadow Boxing or sharpening your technique with Combo Practice, we've got you covered.",
                "Dive into the Learn from Experts section to absorb real fight wisdom, tips, and breakdowns from seasoned pros.",
                "This isn't just an app — it's your virtual boxing gym, coach, and corner man all in one.",
                "Train smart, fight hard, level up. Join us and improve your skills today.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  className="text-lg md:text-xl text-gray-400 mb-6"
                >
                  {text}
                </motion.p>
              ))}

              <motion.div
               
                className="flex flex-col sm:flex-row gap-4 mt-8"
              >
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

            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src={tysonImg}
                alt="Tyson"
                className="w-full h-[40rem] max-w-md border-4 border-white/60 rounded-xl object-cover"
              />
            </div>
          </div>
        </div>

        <motion.div
      
          className="my-20 text-sm text-gray-500 text-center px-4"
        >
          <hr className="border-gray-700 mb-6" />
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
      transition={{ duration: 0.3 }}
      className="feature-card motion-div bg-[#0000007d]  backdrop-blur-3xl border border-[#ffffff4c] w-full relative p-6 rounded-xl flex flex-col items-center text-center overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    ><Link to={link}>
      <div className="absolute inset-0 opacity-5 transition-all z-0"></div>
      <span className="flex w-full justify-center items-center">{icon}</span>
      <h3 className="text-xl font-bold mb-2 relative z-10">{title}</h3>
      <p className="text-gray-400 relative z-10">{description}</p>
      {link !== "" && (
        <Link
          to="#"
          className="mt-4 text-red-500 hover:text-red-400 font-medium"
        >
          Learn more →
        </Link>
      )}</Link>
    </motion.div>
  );
};
