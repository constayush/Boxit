"use client"
import { useEffect, useRef } from "react"
import { motion, useSpring } from "framer-motion"

const CustomCursor = ({ cursorVariant }) => {
  const cursorRef = useRef(null)

  // Use springs for smoother motion
  const springConfig = { damping: 25, stiffness: 300 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Update spring values
      x.set(e.clientX)
      y.set(e.clientY)
    }

    window.addEventListener("mousemove", moveCursor)
    return () => {
      window.removeEventListener("mousemove", moveCursor)
    }
  }, [x, y])

  const variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      mixBlendMode: "difference",
    },
    button: {
      height: 64,
      width: 64,
      backgroundColor: "rgba(255, 0, 0, 0.1)",
      border: "1px solid rgba(255, 0, 0, 0.5)",
      mixBlendMode: "difference",
    },
    text: {
      height: 48,
      width: 48,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      mixBlendMode: "difference",
    },
   
  }

  return (
    <motion.div
      ref={cursorRef}
      className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
      style={{
        x: x,
        y: y,
        translateX: "-50%",
        translateY: "-50%",
        willChange: "transform",
        transition: "opacity 0.2s ease",
      }}
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: "tween",
        ease: "backOut",
        duration: 0.15,
      }}
    />
  )
}

export default CustomCursor
