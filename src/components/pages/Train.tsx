"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router"
import { Link } from "react-router"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Play, Square, RotateCcw, Clock, Repeat, Settings, ChevronRight, ChevronLeft } from "lucide-react"

// Updated punch codes to match our combo system
const punchTypes: Record<string, { name: string; color: string; icon: string; description: string }> = {
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

// Type for the training state
interface TrainingState {
  index: number
  remainingReps: number
  isActive: boolean
}

export default function Train() {
  const location = useLocation()
  const comboString = new URLSearchParams(location.search).get("combo") || "Jab, Cross"

  // Parse the combo string into our number/letter codes
  const parseCombo = (comboStr: string): string[] => {
    // If it's already in code format like "1-2-3"
    if (comboStr.includes("-")) {
      return comboStr.split("-")
    }

    // If it's in text format like "Jab, Cross, Hook"
    const punchMap: Record<string, string> = {
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

    return comboStr.split(", ").map((punch: string): string => punchMap[punch] || punch)
  }

  const combo = parseCombo(comboString)
  const [isTraining, setIsTraining] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [intervalTime, setIntervalTime] = useState<number>(1500)
  const [reps, setReps] = useState<number>(5)
  const [repsLeft, setRepsLeft] = useState<number>(reps)
  const [currentPunch, setCurrentPunch] = useState<string>("")
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [countdown, setCountdown] = useState<number>(0)
  const [showSettings, setShowSettings] = useState<boolean>(false)

  // Refs
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)
  const trainingStateRef = useRef<TrainingState>({ index: 0, remainingReps: reps, isActive: false })
  const audioContextRef = useRef<AudioContext | null>(null)

  // Initialize audio context on first user interaction
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  // Play a simple beep sound instead of using speech synthesis
  const playBeep = (frequency = 440, duration = 150) => {
    if (!audioContextRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)

    oscillator.type = "sine"
    oscillator.frequency.value = frequency
    gainNode.gain.value = 0.5

    oscillator.start()

    setTimeout(() => {
      oscillator.stop()
    }, duration)
  }

  // Get punch-specific beep frequency
  const getPunchFrequency = (punchId: string): number => {
    const baseFrequencies: Record<string, number> = {
      "1": 440, // A4
      "2": 494, // B4
      "3": 523, // C5
      "4": 587, // D5
      "5": 659, // E5
      "6": 698, // F5
      S: 784, // G5
      R: 880, // A5
      D: 988, // B5
    }

    return baseFrequencies[punchId] || 440
  }

  // Handle countdown before starting
  useEffect(() => {
    if (countdown > 0) {
      // Play countdown beep
      if (audioContextRef.current) {
        playBeep(330, 200) // Lower pitch for countdown
      }

      countdownRef.current = setTimeout(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else if (countdown === 0 && isTraining) {
      trainingStateRef.current = {
        index: 0,
        remainingReps: repsLeft,
        isActive: true,
      }
      nextPunch()
    }

    return () => {
      if (countdownRef.current) clearTimeout(countdownRef.current)
    }
  }, [countdown, isTraining])

  // Update training state ref when repsLeft changes
  useEffect(() => {
    trainingStateRef.current.remainingReps = repsLeft
  }, [repsLeft])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (countdownRef.current) clearTimeout(countdownRef.current)
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error)
      }
    }
  }, [])

  // Process the next punch in the sequence
  const nextPunch = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    const { index, remainingReps, isActive } = trainingStateRef.current

    if (!isActive || isPaused || remainingReps <= 0) {
      if (remainingReps <= 0) {
        setIsTraining(false)
        trainingStateRef.current.isActive = false
      }
      return
    }

    // Set current punch
    const punch = combo[index]
    setCurrentPunch(punch)
    setCurrentIndex(index)

    // Play sound for the punch
    if (audioContextRef.current) {
      playBeep(getPunchFrequency(punch), 150)
    }

    // Schedule next punch
    timeoutRef.current = setTimeout(() => {
      // Update index for next punch
      const nextIndex = (index + 1) % combo.length

      // If we've completed a full combo
      if (nextIndex === 0) {
        const newRepsLeft = remainingReps - 1
        setRepsLeft(newRepsLeft)
        trainingStateRef.current.remainingReps = newRepsLeft

        // If we've completed all reps
        if (newRepsLeft <= 0) {
          setIsTraining(false)
          trainingStateRef.current.isActive = false
          return
        }
      }

      // Update training state for next punch
      trainingStateRef.current.index = nextIndex

      // Process next punch
      nextPunch()
    }, intervalTime)
  }

  // Start training with countdown
  const startTraining = () => {
    initAudioContext()
    setRepsLeft(reps)
    setCountdown(3)
    setIsTraining(true)
  }

  // Stop training
  const stopTraining = () => {
    setIsTraining(false)
    setIsPaused(false)
    trainingStateRef.current.isActive = false
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setCurrentPunch("")
    setCurrentIndex(0)
  }

  // Toggle pause
  const togglePause = () => {
    const newPausedState = !isPaused
    setIsPaused(newPausedState)

    if (newPausedState) {
      // Pause training
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    } else {
      // Resume training
      nextPunch()
    }
  }

  return (
    <motion.div
    initial={{ opacity: 0, filter: "blur(10px)" }}
    animate={{ opacity: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="min-h-screen relative bg-black text-white flex flex-col px-4 md:my-24 my-12 md:px-12">
   
      {/* Header with navigation */}
      <div className="container mx-auto flex items-center">
        <Link
          to="/select"
          className="flex items-center justify-center rounded-full bg-black border-red-600 border-2 p-3 hover:bg-red-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="flex items-center w-full gap-8">
          <h1 className="text-2xl md:text-5xl font-bold ml-4 helvetica-font">Training Mode</h1>
          <div className="h-1 flex-grow bg-red-600 rounded-full"></div>
        </div>
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
          <AnimatePresence mode="wait">
            {currentPunch && !countdown && (
              <motion.div
                key={`${currentPunch}-${currentIndex}-${repsLeft}`}
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

      {/* Footer */}
      <div className="container mx-auto px-4 py-6 border-t border-gray-800">
        <p className="text-center text-gray-500 text-sm">
          Follow the visual and audio cues to complete your boxing combo
        </p>
      </div>
    </motion.div>
  )
}

