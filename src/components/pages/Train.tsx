"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router"
import { Link } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Play, Square, RotateCcw, Clock, Repeat, Settings, ChevronRight, ChevronLeft } from "lucide-react"

// Updated punch codes to match our combo system
const punchTypes = {
  "1": { name: "Jab", color: "#ef4444", icon: "👊", description: "Lead hand straight punch" },
  "2": { name: "Cross", color: "#3b82f6", icon: "💥", description: "Rear hand straight punch" },
  "3": { name: "Lead Hook", color: "#10b981", icon: "🤛", description: "Lead hand hook" },
  "4": { name: "Rear Hook", color: "#8b5cf6", icon: "🤜", description: "Rear hand hook" },
  "5": { name: "Lead Uppercut", color: "#f59e0b", icon: "⤴️", description: "Lead hand uppercut" },
  "6": { name: "Rear Uppercut", color: "#ec4899", icon: "⤴️", description: "Rear hand uppercut" },
  S: { name: "Slip", color: "#6366f1", icon: "↪️", description: "Defensive slip movement" },
  R: { name: "Roll", color: "#14b8a6", icon: "🔄", description: "Defensive roll movement" },
  D: { name: "Duck", color: "#f97316", icon: "⬇️", description: "Defensive duck movement" },
}

// Sound effects for different punch types
const punchSounds = {
  "1": "/sounds/jab.mp3",
  "2": "/sounds/cross.mp3",
  "3": "/sounds/hook.mp3",
  "4": "/sounds/hook.mp3",
  "5": "/sounds/uppercut.mp3",
  "6": "/sounds/uppercut.mp3",
  S: "/sounds/slip.mp3",
  R: "/sounds/roll.mp3",
  D: "/sounds/duck.mp3",
}

export default function Train() {
  const location = useLocation()
  const comboString = new URLSearchParams(location.search).get("combo") || "Jab, Cross"

  // Parse the combo string into our number/letter codes
  const parseCombo = (comboStr) => {
    // If it's already in code format like "1-2-3"
    if (comboStr.includes("-")) {
      return comboStr.split("-")
    }

    // If it's in text format like "Jab, Cross, Hook"
    const punchMap = {
      Jab: "1",
      Cross: "2",
      Hook: "3", // Default to lead hook
      "Lead Hook": "3",
      "Rear Hook": "4",
      Uppercut: "6", // Default to rear uppercut
      "Lead Uppercut": "5",
      "Rear Uppercut": "6",
      Slip: "S",
      Roll: "R",
      Duck: "D",
    }

    return comboStr.split(", ").map((punch) => punchMap[punch] || punch)
  }

  const combo = parseCombo(comboString)

  const [isTraining, setIsTraining] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [intervalTime, setIntervalTime] = useState(1500)
  const [reps, setReps] = useState(5)
  const [repsLeft, setRepsLeft] = useState(reps)
  const [currentPunch, setCurrentPunch] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [countdown, setCountdown] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  const timeoutRef = useRef(null)
  const audioRef = useRef(null)
  const speechRef = useRef(new SpeechSynthesisUtterance())

  // Set speech properties
  useEffect(() => {
    speechRef.current.rate = 1.0
    speechRef.current.pitch = 1.0
    speechRef.current.volume = 1.0
  }, [])

  // Handle countdown before starting
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)

      return () => clearTimeout(timer)
    } else if (countdown === 0 && isTraining) {
      startTrainingSequence()
    }
  }, [countdown, isTraining])

  // Main training sequence
  const startTrainingSequence = () => {
    let index = 0
    let remainingReps = repsLeft

    const playPunch = () => {
      if (!isTraining || isPaused || remainingReps <= 0) return

      const punch = combo[index]
      setCurrentPunch(punch)
      setCurrentIndex(index)

      // Play audio for the punch
      if (audioRef.current) {
        // In a real app, you would have actual sound files
        // For now we'll use speech synthesis
        speechRef.current.text = punchTypes[punch]?.name || punch
        window.speechSynthesis.speak(speechRef.current)
      }

      // Move to next punch after interval
      timeoutRef.current = setTimeout(() => {
        index = (index + 1) % combo.length

        // If we've completed a full combo
        if (index === 0) {
          remainingReps--
          setRepsLeft(remainingReps)

          // If we've completed all reps
          if (remainingReps <= 0) {
            setIsTraining(false)
            return
          }
        }

        playPunch()
      }, intervalTime)
    }

    playPunch()
  }

  // Start training with countdown
  const startTraining = () => {
    setRepsLeft(reps)
    setCountdown(3)
    setIsTraining(true)
  }

  // Stop training
  const stopTraining = () => {
    setIsTraining(false)
    setIsPaused(false)
    clearTimeout(timeoutRef.current)
    window.speechSynthesis.cancel()
    setCurrentPunch("")
    setCurrentIndex(0)
  }

  // Toggle pause
  const togglePause = () => {
    setIsPaused(!isPaused)
    if (!isPaused) {
      clearTimeout(timeoutRef.current)
      window.speechSynthesis.cancel()
    } else {
      startTrainingSequence()
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
      window.speechSynthesis.cancel()
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header with navigation */}
      <div className="container mx-auto px-4 py-6 flex items-center">
        <Link
          to="/select"
          className="flex items-center justify-center rounded-full bg-black border-red-600 border-2 p-3 hover:bg-red-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold ml-4">Training Mode</h1>
      </div>

      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col items-center">
        {/* Combo display */}
        <div className="bg-gray-900/70 rounded-xl p-6 w-full max-w-2xl mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Combo</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {combo.map((punch, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg
                  ${currentIndex === idx && isTraining ? "ring-2 ring-white ring-offset-2 ring-offset-gray-900" : ""}
                  ${idx < currentIndex && isTraining ? "opacity-50" : ""}
                `}
                style={{ backgroundColor: punchTypes[punch]?.color || "#6b7280" }}
              >
                {punch}
              </div>
            ))}
          </div>
          <p className="text-center mt-4 text-gray-400">{comboString}</p>
        </div>

        {/* Main display area */}
        <div className="relative w-full max-w-2xl aspect-video bg-gray-900/50 rounded-xl flex items-center justify-center mb-8 overflow-hidden">
          {/* Countdown display */}
          <AnimatePresence>
            {countdown > 0 && (
              <motion.div
                key="countdown"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-[8rem] font-bold text-red-600">{countdown}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Current punch display */}
          <AnimatePresence>
            {currentPunch && !countdown && (
              <motion.div
                key={currentPunch + Date.now()}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="text-[6rem] mb-2">{punchTypes[currentPunch]?.icon || "👊"}</div>
                <div
                  className="text-[5rem] font-bold mb-2"
                  style={{ color: punchTypes[currentPunch]?.color || "#ffffff" }}
                >
                  {currentPunch}
                </div>
                <div className="text-2xl font-medium">{punchTypes[currentPunch]?.name || "Punch"}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reps counter */}
          <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-sm font-medium">
            Reps: {repsLeft}/{reps}
          </div>
        </div>

        {/* Controls */}
        <div className="w-full max-w-2xl mb-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>{showSettings ? "Hide Settings" : "Show Settings"}</span>
            </button>

            <div className="flex gap-2">
              {!isTraining ? (
                <button
                  onClick={startTraining}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Start</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={togglePause}
                    className={`${isPaused ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"} text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2`}
                  >
                    {isPaused ? (
                      <>
                        <Play className="w-5 h-5" />
                        <span>Resume</span>
                      </>
                    ) : (
                      <>
                        <Square className="w-5 h-5" />
                        <span>Pause</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={stopTraining}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Reset</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Settings panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-900/70 rounded-xl p-6 mb-4">
                  <h3 className="text-lg font-semibold mb-4">Training Settings</h3>

                  <div className="space-y-6">
                    {/* Interval control */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-gray-400" />
                          <span>Interval Time: {intervalTime}ms</span>
                        </label>
                        <span className="text-sm text-gray-400">(Time between punches)</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setIntervalTime(Math.max(500, intervalTime - 100))}
                          className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg"
                          disabled={intervalTime <= 500}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <input
                          type="range"
                          min="500"
                          max="3000"
                          step="100"
                          value={intervalTime}
                          onChange={(e) => setIntervalTime(Number(e.target.value))}
                          className="flex-1 accent-red-600"
                        />
                        <button
                          onClick={() => setIntervalTime(Math.min(3000, intervalTime + 100))}
                          className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg"
                          disabled={intervalTime >= 3000}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Reps control */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="flex items-center gap-2">
                          <Repeat className="w-5 h-5 text-gray-400" />
                          <span>Repetitions: {reps}</span>
                        </label>
                        <span className="text-sm text-gray-400">(Number of combo repeats)</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setReps(Math.max(1, reps - 1))}
                          className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg"
                          disabled={reps <= 1}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          step="1"
                          value={reps}
                          onChange={(e) => {
                            const value = Number(e.target.value)
                            setReps(value)
                            if (!isTraining) setRepsLeft(value)
                          }}
                          className="flex-1 accent-red-600"
                        />
                        <button
                          onClick={() => setReps(Math.min(20, reps + 1))}
                          className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg"
                          disabled={reps >= 20}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Audio elements (would be populated with actual sound files) */}
      <audio ref={audioRef} />

      {/* Footer */}
      <div className="container mx-auto px-4 py-6 border-t border-gray-800">
        <p className="text-center text-gray-500 text-sm">
          Follow the visual and audio cues to complete your boxing combo
        </p>
      </div>
    </div>
  )
}

