import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { motion } from "framer-motion";

const punchCodes = {
  "Jab": 1,
  "Cross": 2,
  "Hook": 3,
  "Uppercut": 4,
};

function Train() {
  const location = useLocation();
  const comboString = new URLSearchParams(location.search).get("combo") || "Jab, Cross";
  const combo = comboString.split(", ").map(punch => punchCodes[punch] || punch);

  const [isTraining, setIsTraining] = useState(false);
  const [intervalTime, setIntervalTime] = useState(500);
  const [reps, setReps] = useState(5);
  const [repsLeft, setRepsLeft] = useState(reps);
  const [currentPunch, setCurrentPunch] = useState("");

  const timeoutRef = useRef(null);
  const speechRef = useRef(new SpeechSynthesisUtterance());

  useEffect(() => {
    let index = 0;
    let remainingReps = repsLeft;

    const playPunch = () => {
      if (!isTraining || remainingReps <= 0) return;
      setCurrentPunch(combo[index]);

      speechRef.current.text = combo[index].toString();
      speechRef.current.onend = () => {
        index = (index + 1) % combo.length;
        if (index === 0) {
          remainingReps--;
          setRepsLeft(remainingReps);
        }
        if (remainingReps > 0) {
          timeoutRef.current = setTimeout(playPunch, intervalTime);
        } else {
          setIsTraining(false);
        }
      };
      window.speechSynthesis.speak(speechRef.current);
    };

    if (isTraining) {
      playPunch();
    }

    return () => {
      clearTimeout(timeoutRef.current);
      window.speechSynthesis.cancel();
    };
  }, [isTraining, intervalTime, repsLeft, combo]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">

      <h1 className="text-4xl font-bold text-center mb-4">Training Mode</h1>
      <p className="text-lg mb-2">Combo: <strong>{combo.join(", ")}</strong></p>
      <p className="text-lg mb-4">Reps Left: {repsLeft}</p>

      <motion.div
        key={Date.now()}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="text-[10rem] font-bold text-red-600 mb-6"
      >
        {currentPunch}
      </motion.div>

      <div className="mb-4 gap-8 w-full flex justify-center items-center">
        <label className="block mb-1 text-lg">Set Interval Time (ms)</label>
        <input
          type="number"
          min="500"
          max="5000"
          step="100"
          value={intervalTime}
          onChange={(e) => setIntervalTime(Number(e.target.value))}
          className="border-2 border-gray-300 p-2 rounded-lg w-32 text-center"
        />
      </div>

      <div className="mb-8 gap-8 w-full flex justify-center items-center">
        <label className="block mb-1 text-lg">Set Reps</label>
        <input
          type="number"
          min="1"
          max="50"
          step="1"
          value={reps}
          onChange={(e) => {
            setReps(Number(e.target.value));
            setRepsLeft(Number(e.target.value));
          }}
          className="border-2 border-gray-300 p-2 rounded-lg w-32 text-center"
        />
      </div>

      {!isTraining ? (
        <button
          onClick={() => {
            setRepsLeft(reps);
            setIsTraining(true);
          }}
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Start Training
        </button>
      ) : (
        <button
          onClick={() => {
            setIsTraining(false);
            clearTimeout(timeoutRef.current);
            window.speechSynthesis.cancel();
          }}
          className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Stop Training
        </button>
      )}
    </div>
  );
}

export default Train;
