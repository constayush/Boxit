"use client"
import { useRef, useState } from "react"
import {Link} from "react-router"
import { Trophy,  Users, ChevronDown } from "lucide-react"
import { motion, useInView } from "framer-motion"
import CustomCursor from "../ui/Cursor"
import VideoCard from "../ui/VideoCard"
import "../../index.css"

export default function Home() {

  const [cursorVariant, setCursorVariant] = useState("default")
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const videosRef = useRef(null)
  const ctaRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 })
  const isVideosInView = useInView(videosRef, { once: true, amount: 0.2 })
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.5 })

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
  ]

  const enterButton = () => setCursorVariant("button")
  const enterText = () => setCursorVariant("text")
  const leaveButton = () => setCursorVariant("default")

  return (
 
     <div className="min-h-screen min-w-full flex flex-col justify-center items-center bg-black text-white overflow-hidden">
      <CustomCursor cursorVariant={cursorVariant} />

      {/* Hero Section */}
 
      <motion.div
        ref={heroRef}
    
        className="hero-section relative w-full flex flex-col items-center justify-center min-h-screen"
      >
        <div className="absolute inset-0 hero-gradient"></div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container relative z-10 flex flex-col items-center px-4 md:px-12 my-12 md:my-24"
        >
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 50, letterSpacing: "20px" }}
              animate={isHeroInView ? { opacity: 1, y: 0, letterSpacing: "0px" } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-6xl md:text-[10rem] font-bold mb-3 brand-font"
              onMouseEnter={enterText}
              onMouseLeave={leaveButton}
            >
              Box'<span className="text-red-600">it.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-xl md:text-3xl mb-12 text-gray-300"
              onMouseEnter={enterText}
              onMouseLeave={leaveButton}
            >
              Your Ultimate Boxing Guide! – Train, Learn, and Stay Updated!
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center"
            >
              <Link to="/learn">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={enterButton}
                  onMouseLeave={leaveButton}
                  className="w-full sm:w-auto border border-white/30 hover:border-white hover:border-2 bg-gradient-to-tl from-red-600 to-[#2d0303] transition-all duration-300 rounded-xl py-4 px-8 text-xl font-medium tracking-wide"
                >
                  Learn
                </motion.button>
              </Link>
              <Link to="/select">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={enterButton}
                  onMouseLeave={leaveButton}
                  className="w-full sm:w-auto border border-white/70 bg-black hover:bg-red-600 transition-all duration-300 rounded-xl py-4 px-8 text-xl font-medium tracking-wide"
                >
                  Practice
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="absolute top-90 opacity-50 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
              <ChevronDown className="w-8 h-8 text-white/70" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div> 
      <hr className="w-full border border-[#ffffff27]"/>
      {/* Features */}
      <div className="w-full bg-black py-20">
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
              icon={<Trophy className="w-12 h-12 text-red-500 mb-4 relative z-10" />}
              title="Pro Techniques"
              description="Learn boxing techniques from professional fighters"
              link="/learn"
              onMouseEnter={enterButton}
              onMouseLeave={leaveButton}
            />

            <FeatureCard
                  link={"/select"}
              icon={<Users className="w-12 h-12 text-red-500 mb-4 relative z-10" />}
              title="Training"
              description="Master what you’ve learned by training and repeating techniques in the Practice section."
              onMouseEnter={enterButton}
              onMouseLeave={leaveButton}
            />
        
          </motion.div>
        </div>
      </div>

      {/* Legendary Fights */}
      <div className="w-full bg-gradient-to-b from-black to-[#120000] py-20">
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
             initial={{ opacity: 0}}
          
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
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Step in the Ring?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 mb-12"
          >
            Join us and improve your skills today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={isCtaInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 text-sm text-gray-500"
          >
  Note - All video content featured in this app is the intellectual property of its respective owners. We do not claim ownership of any third-party videos.
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}

const FeatureCard = ({ icon, title, description, link, onMouseEnter, onMouseLeave }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className="feature-card motion-div border border-[#ffffff3f] w-full relative p-6 rounded-xl flex flex-col items-center text-center overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-0 opacity-5 transition-all z-0"></div>
      {icon}
      <h3 className="text-xl font-bold mb-2 relative z-10">{title}</h3>
      <p className="text-gray-400 relative z-10">{description}</p>
      { (link !=="") && (
        <Link to="#" className="mt-4 text-red-500 hover:text-red-400 font-medium">
          Learn more →
        </Link>
      )}
    </motion.div>
  )
}
