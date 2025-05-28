"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const VideoCard = ({ 
  title = "The Future of AI Technology in 2025", 
  description = "Explore the cutting-edge advancements in artificial intelligence and how they will shape our future.",
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ", 
 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const progressInterval = useRef(null)

  const handleMouseEnter = () => {
    setIsHovered(true)

  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }
  }


  const containerVariants = {
    initial: { 
      y: 20, 
      opacity: 0,
      filter: "blur(10px)"
    },
    animate: { 
      y: 0, 
      opacity: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const childVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-md rounded-xl overflow-hidden border-2 border-[#ffb30049] h-full bg-gradient-to-t from-[#ffa60000] to-[#ffffff76] shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300"
    >
     

      <motion.div className="relative aspect-video w-full overflow-hidden">
         
      
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full"
          >
            <iframe
              className="w-full h-full"
              src={videoUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
      
      </motion.div>
      
      {/* Content Section */}
      <motion.div className="p-5 space-y-4">
        {/* Title with animated underline */}
        <motion.div className="relative">
          <motion.h3
            variants={childVariants}
            className="text-xl font-bold text-white leading-tight"
          >
            {title}
          </motion.h3>
          <motion.div 
            className="h-0.5 bg-gradient-to-r from-yellow-500 to-white mt-1"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
        </motion.div>
        
        {/* Description with reveal animation */}
        <AnimatePresence>
          {isHovered && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-gray-300 overflow-hidden"
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
        
     
      </motion.div>
      
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 0.15 : 0,
          boxShadow: isHovered ? "inset 0 0 30px 5px rgba(168, 85, 247, 0.5)" : "none"
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  )
}

export default VideoCard
