"use client"
import { useState } from "react"
import { motion } from "framer-motion"

const VideoCard = ({ title, videoUrl, onMouseEnter, onMouseLeave }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
      onMouseEnter={() => {
        setIsHovered(true)
        onMouseEnter()
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        onMouseLeave()
      }}
    >
      <motion.h3
        className="text-2xl font-semibold mb-4"
        animate={{ color: isHovered ? "#ef4444" : "#ffffff" }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h3>
      <motion.div
        className="aspect-video w-full overflow-hidden rounded-xl"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="video-container w-full h-full relative"
          onMouseEnter={() => document.body.classList.add("hide-custom-cursor")}
          onMouseLeave={() => document.body.classList.remove("hide-custom-cursor")}
        >
          <iframe
            className="w-full h-full rounded-xl"
            src={videoUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default VideoCard
