
import { motion, AnimatePresence } from "framer-motion";
import paperTex from "../../../public/paper-texture.webp";
 function TrainHud( {
  videoRef,
  cameraEnabled,
  punchCount,
  countdown,
  isTraining,
  currentPunch,
  repsLeft,
  reps,
  currentIndex,
  punchTypes,
  toggleCamera,}) 
  {

  return (
   <div className="relative w-full max-w-2xl aspect-video bg-white/20 shadow-2xl rounded-xl flex items-center justify-center mb-8 overflow-hidden">
        
        <img src={paperTex} alt="Paper texture overlay" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay pointer-events-none rounded-xl" />

          {cameraEnabled ? (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-60"
              muted
              autoPlay
              playsInline
            />
          ) : null}
          <div className="absolute bottom-4 right-4 bg-white shadow-2xl border-amber-400 border-2 px-3 py-1 rounded-full text-black text-sm sm:text-base md:text-lg font-bold">
            Punches: {punchCount}
          </div>
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
                <div className="text-[3.5rem] sm:text-[5rem] md:text-[8rem] font-bold text-red-600">
                  {countdown}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Current punch display */}
          <AnimatePresence mode="wait">
            {currentPunch && !countdown ? (
              <motion.div
                key={`${currentPunch}-${currentIndex}-${repsLeft}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center text-center p-2"
              >
                <div className="text-[3.5rem] sm:text-[5rem] md:text-[6rem] mb-2">
                  {punchTypes[currentPunch]?.icon || "👊"}
                </div>
                <div
                  className="text-[2.5rem] sm:text-[4rem] md:text-[5rem] font-bold mb-2"
                  style={{
                    color: punchTypes[currentPunch]?.color || "#ffffff",
                  }}
                >
                  {currentPunch}
                </div>
                <div className="text-lg sm:text-xl font-medium text-center ">
                  {punchTypes[currentPunch]?.name || currentPunch}
                </div>
              </motion.div>
            ) : !isTraining && !currentPunch ? (
              <div className="flex flex-col items-center justify-center">
                <div className="text-[3.5rem] sm:text-[5rem] md:text-[6rem] mb-2">
                  🥊
                </div>
                <div className="text-2xl sm:text-3xl md:text-[3rem] font-bold mb-2">
                  Ready to box?
                </div>
              </div>
            ) : null}
          </AnimatePresence>

          <div
            className={`absolute top-4 left-4  border-2  bg-black px-3 py-1 rounded-full text-sm font-medium ${
              cameraEnabled ? "border-green-500" : "border-red-500"
            }`}
          >
            <button onClick={toggleCamera}>
              Camera {cameraEnabled ? "ON" : "OFF"}
            </button>
          </div>

          {/* Reps counter */}

          <div className="absolute top-4 right-4 bg-white shadow-2xl border-amber-400 border-2 px-3 py-1 rounded-full text-black text-sm sm:text-base md:text-lg font-bold">
            Reps: {repsLeft}/{reps}
          </div>
        </div>
  )
}

export default TrainHud