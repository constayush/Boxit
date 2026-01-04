import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Clock, Play, Repeat, RotateCcw, Settings, Square } from 'lucide-react'
import paperTex from "../../../public/paper-texture.webp";
function TrainControls({setShowSettings, showSettings, isTraining, startTraining, stopTraining, isPaused, togglePause, intervalTime, setIntervalTime, reps, setReps, setRepsLeft}: {setShowSettings: React.Dispatch<React.SetStateAction<boolean>>, showSettings: boolean, isTraining: boolean, startTraining: () => void, stopTraining: () => void, isPaused: boolean, togglePause: () => void, intervalTime: number, setIntervalTime: React.Dispatch<React.SetStateAction<number>>, reps: number, setReps: React.Dispatch<React.SetStateAction<number>>, setRepsLeft: React.Dispatch<React.SetStateAction<number>>}) {
  return (
    <div className="w-full max-w-2xl mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>{showSettings ? "Hide Settings" : "Show Settings"}</span>
            </button>

            <div className="flex w-full md:w-auto gap-2">
              {!isTraining ? (
                <button
                  onClick={startTraining}
                  className="w-full md:w-auto bg-gradient-to-r from-[#fd5353] to-red-600 hover:to-red-500 border-t-2 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  <Play className="w-5 h-5" />
                  <span>Start</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={togglePause}
                    className={`${
                      isPaused
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } w-full md:w-auto text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2`}
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
                    className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
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
                <div className="bg-white/20 shadow-2xl rounded-xl p-3 md:p-6 mb-4 relative">
                <img src={paperTex} alt="Paper texture overlay" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none rounded-xl" />
    
                  <h3 className="text-lg font-semibold mb-4">
                    Training Settings
                  </h3>

                  <div className="space-y-6">
                    {/* Interval control */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-gray-400" />
                          <span>Interval Time: {intervalTime}ms</span>
                        </label>
                        <span className="text-sm text-gray-400">
                          (Time between punches)
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <button
                          onClick={() =>
                            setIntervalTime(Math.max(500, intervalTime - 100))
                          }
                          className="bg-white hover:bg-gray-700 p-2 rounded-lg"
                          disabled={intervalTime <= 500}
                        >
                          <ChevronLeft className="w-5 h-5 text-black" />
                        </button>
                        <input
                          type="range"
                          min="500"
                          max="2500"
                          step="100"
                          value={intervalTime}
                          onChange={(e) =>
                            setIntervalTime(Number(e.target.value))
                          }
                          className="flex-1 accent-red-600"
                        />
                        <button
                          onClick={() =>
                            setIntervalTime(Math.min(3000, intervalTime + 100))
                          }
                          className="bg-white hover:bg-red-800 p-2 rounded-lg"
                          disabled={intervalTime >= 3000}
                        >
                          <ChevronRight className="w-5 h-5 text-black" />
                        </button>
                      </div>
                    </div>
                    <hr />
                    {/* Reps control */}
                    <div>
                      <div className="flex gap-2 justify-between items-center mb-2">
                        <label className="flex flex-wrap items-center gap-2">
                          <Repeat className="w-5 h-5 text-gray-400" />
                          <span>Repetitions: {reps}</span>
                        </label>
                        <span className="text-sm text-gray-400">
                          (Number of combo repeats)
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <button
                          onClick={() => setReps(Math.max(1, reps - 1))}
                          className="bg-white  hover:bg-red-800 p-2 rounded-lg"
                          disabled={reps <= 1}
                        >
                          <ChevronLeft className="w-5 h-5 text-black" />
                        </button>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          step="1"
                          value={reps}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            setReps(value);
                            if (!isTraining) setRepsLeft(value);
                          }}
                          className="flex-1 accent-red-600"
                        />
                        <button
                          onClick={() => setReps(Math.min(20, reps + 1))}
                          className="bg-white hover:bg-red-800 p-2 rounded-lg"
                          disabled={reps >= 20}
                        >
                          <ChevronRight className="w-5 h-5 text-black" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
  )
}

export default TrainControls