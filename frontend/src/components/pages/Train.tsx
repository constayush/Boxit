//"use client";

import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import * as tf from "@tensorflow/tfjs";

import {
  ArrowLeft,
  Play,
  Square,
  RotateCcw,
  Clock,
  Repeat,
  Settings,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import ScrollToTop from "../ui/ScrollToTop";
import cross from "../../assets/cross.mp3";
import jab from "../../assets/jab.mp3";
import hook from "../../assets/hook.mp3";
import uppercut from "../../assets/uppercut.mp3";
import slip from "../../assets/slip.mp3";
import roll from "../../assets/roll.mp3";

const punchTypes: Record<
  string,
  { name: string; color: string; icon: string; description: string }
> = {
  "1": {
    name: "Jab",
    color: "#ef4444",
    icon: "👊",
    description: "Lead hand straight punch",
  },
  "2": {
    name: "Cross",
    color: "#3b82f6",
    icon: "💥",
    description: "Rear hand straight punch",
  },
  "3": {
    name: "Lead Hook",
    color: "#10b981",
    icon: "🤛",
    description: "Lead hand hook",
  },
  "4": {
    name: "Rear Hook",
    color: "#8b5cf6",
    icon: "🤜",
    description: "Rear hand hook",
  },
  "5": {
    name: "Lead Uppercut",
    color: "#f59e0b",
    icon: "⤴️",
    description: "Lead hand uppercut",
  },
  "6": {
    name: "Rear Uppercut",
    color: "#ec4899",
    icon: "⤴️",
    description: "Rear hand uppercut",
  },
  S: {
    name: "Slip",
    color: "#6366f1",
    icon: "↪️",
    description: "Defensive slip movement",
  },
  R: {
    name: "Roll",
    color: "#14b8a6",
    icon: "🔄",
    description: "Defensive roll movement",
  },
  D: {
    name: "Duck",
    color: "#f97316",
    icon: "⬇️",
    description: "Defensive duck movement",
  },
};

// Initialize audio elements properly
const initializeAudio = (src: string): HTMLAudioElement => {
  const audio = new Audio(src);
  audio.preload = "auto";
  return audio;
};

const punchAudioMap: Record<string, HTMLAudioElement> = {
  "1": initializeAudio(jab),
  "2": initializeAudio(cross),
  "3": initializeAudio(hook),
  "4": initializeAudio(hook),
  "5": initializeAudio(uppercut),
  "6": initializeAudio(uppercut),
  S: initializeAudio(slip),
  R: initializeAudio(roll),
};

interface TrainingState {
  index: number;
  remainingReps: number;
  isActive: boolean;
}

export default function Train() {
  const location = useLocation();
  const comboString =
    new URLSearchParams(location.search).get("combo") || "1-2";

  // Parse the combo string into our number/letter codes
  const parseCombo = (comboStr: string): string[] => {
    // If it's already in code format like "1-2-3"
    if (comboStr.includes("-")) {
      return comboStr.split("-");
    }
    const punchMap: Record<string, string> = {
      Jab: "1",
      Cross: "2",
      Hook: "3",
      "Lead Hook": "3",
      "Rear Hook": "4",
      Uppercut: "6",
      "Lead Uppercut": "5",
      "Rear Uppercut": "6",
      Slip: "S",
      Roll: "R",
      Duck: "D",
    };

    return comboStr
      .split(", ")
      .map((punch: string): string => punchMap[punch] || punch);
  };

  const combo = parseCombo(comboString);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [intervalTime, setIntervalTime] = useState<number>(1000);
  const [reps, setReps] = useState<number>(5);
  const [repsLeft, setRepsLeft] = useState<number>(reps);
  const [currentPunch, setCurrentPunch] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(0);
  const [showSettings, setShowSettings] = useState<boolean>(true);
  const [punchCount, setPunchCount] = useState(0);

  // Refs
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const trainingStateRef = useRef<TrainingState>({
    index: 0,
    remainingReps: reps,
    isActive: false,
  });
  const audioContextRef = useRef<AudioContext | null>(null);
  const detectorRef = useRef<poseDetection.PoseDetector | null>(null);
  const lastPositions = useRef<{ left: any; right: any }>({
    left: null,
    right: null,
  });
  const cooldownRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  // TensorFlow Pose Detection
  useEffect(() => {
    const initDetector = async () => {
      try {
        await tf.ready();
        const detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          { modelType: "SinglePose.Lightning" }
        );
        detectorRef.current = detector;
      } catch (error) {
        console.error("Error initializing pose detector:", error);
      }
    };
    initDetector();
  }, []);

  // Pose detection effect
  useEffect(() => {
    let animationId: number;
    let isMounted = true;
    let lastDetectionTime = 0;
    const DETECTION_INTERVAL = 150;

    const detect = async () => {
      if (
        !isMounted ||
        !isTraining ||
        !detectorRef.current ||
        !videoRef.current
      )
        return;

      const now = Date.now();
      if (now - lastDetectionTime < DETECTION_INTERVAL) {
        animationId = requestAnimationFrame(detect);
        return;
      }
      lastDetectionTime = now;

      try {
        // Pose detection — async call, do NOT wrap in tf.tidy
        const poses = await detectorRef.current.estimatePoses(videoRef.current);

        if (poses.length === 0) return;

        const kp = poses[0].keypoints;
        const leftWrist = kp.find((k) => k.name === "left_wrist");
        const rightWrist = kp.find((k) => k.name === "right_wrist");

        [leftWrist, rightWrist].forEach((wrist, i) => {
          if (wrist?.score !== undefined && wrist.score > 0.5) {
            const prev =
              i === 0
                ? lastPositions.current.left
                : lastPositions.current.right;

            if (prev) {
              const dx = wrist.x - prev.x;
              const dy = wrist.y - prev.y;
              const speed = Math.sqrt(dx * dx + dy * dy);

              if (speed > 25 && !cooldownRef.current) {
                setPunchCount((c) => c + 1);
                cooldownRef.current = true;
                setTimeout(() => (cooldownRef.current = false), 300);
              }
            }

            if (i === 0) lastPositions.current.left = wrist;
            else lastPositions.current.right = wrist;
          }
        });
      } catch (error) {
        console.error("Pose detection error:", error);
      }

      if (isMounted) {
        animationId = requestAnimationFrame(detect);
      }
    };

    if (isTraining) detect();

    return () => {
      isMounted = false;
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isTraining, cooldownRef]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (countdownRef.current) clearTimeout(countdownRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      // Add detector cleanup here
      detectorRef.current?.dispose();
    };
  }, []);

  //  TensorFlow memory cleanup
  useEffect(() => {
    return () => {
      // Clean up TensorFlow memory when component unmounts
      if (tf) {
        tf.disposeVariables();
      }
    };
  }, []);

  // Initialize audio context on first user interaction
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
  };

  // Play a simple beep sound
  const playBeep = (frequency = 440, duration = 150) => {
    if (!audioContextRef.current) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gainNode.gain.value = 0.5;

      oscillator.start();

      setTimeout(() => {
        oscillator.stop();
      }, duration);
    } catch (error) {
      console.error("Error playing beep:", error);
    }
  };

  // Preload audio files
  useEffect(() => {
    Object.values(punchAudioMap).forEach((audio) => {
      audio.load();
    });
  }, []);

  const playPunchSound = (punchId: string) => {
    const audio = punchAudioMap[punchId];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.playbackRate = getPlaybackRate();
      audio.play().catch((e) => console.error("Failed to play sound:", e));
    }
  };

  const getPlaybackRate = () => {
    const baseInterval = 1000;
    const minRate = 0.5;
    const maxRate = 2.0;
    const rate = baseInterval / intervalTime;
    return Math.min(Math.max(rate, minRate), maxRate);
  };

  // Webcam handling
  useEffect(() => {
    const handleCamera = async () => {
      if (cameraEnabled) {
        try {
          // Stop existing stream if any
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
          }

          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480 },
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
          }
        } catch (err) {
          console.error("Error accessing webcam:", err);
          setCameraEnabled(false);
        }
      } else {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
    };

    handleCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraEnabled]);

  const toggleCamera = () => setCameraEnabled((prev) => !prev);

  // Handle countdown before starting
  useEffect(() => {
    if (countdown > 0) {
      if (audioContextRef.current) {
        playBeep(330, 200);
      }

      countdownRef.current = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && isTraining) {
      trainingStateRef.current = {
        index: 0,
        remainingReps: repsLeft,
        isActive: true,
      };
      nextPunch();
    }

    return () => {
      if (countdownRef.current) clearTimeout(countdownRef.current);
    };
  }, [countdown, isTraining]);

  // Update training state ref when repsLeft changes
  useEffect(() => {
    trainingStateRef.current.remainingReps = repsLeft;
  }, [repsLeft]);

  // Reset repsLeft when reps changes and not training
  useEffect(() => {
    if (!isTraining) {
      setRepsLeft(reps);
    }
  }, [reps, isTraining]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (countdownRef.current) clearTimeout(countdownRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Process the next punch in the sequence
  const nextPunch = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const { index, remainingReps, isActive } = trainingStateRef.current;

    if (!isActive || isPaused || remainingReps <= 0) {
      if (remainingReps <= 0) {
        setIsTraining(false);
        trainingStateRef.current.isActive = false;
        setCurrentPunch("Workout Complete!");
      }
      return;
    }

    const punch = combo[index];
    setCurrentPunch(punch);
    setCurrentIndex(index);
    playPunchSound(punch);

    timeoutRef.current = setTimeout(() => {
      const nextIndex = (index + 1) % combo.length;

      if (nextIndex === 0) {
        const newRepsLeft = remainingReps - 1;
        setRepsLeft(newRepsLeft);
        trainingStateRef.current.remainingReps = newRepsLeft;

        if (newRepsLeft <= 0) {
          setIsTraining(false);
          trainingStateRef.current.isActive = false;
          setCurrentPunch("Workout Complete!");
          return;
        }
      }

      trainingStateRef.current.index = nextIndex;
      nextPunch();
    }, intervalTime);
  };

  // Start training with countdown
  const startTraining = () => {
    setPunchCount(0);
    initAudioContext();
    setRepsLeft(reps);
    setCountdown(3);
    setIsTraining(true);
    setIsPaused(false);
  };

  // Stop training
  const stopTraining = () => {
    setCountdown(0);
    setIsTraining(false);
    setIsPaused(false);
    trainingStateRef.current.isActive = false;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentPunch("");
    setCurrentIndex(0);
    setRepsLeft(reps);
  };

  // Toggle pause
  const togglePause = () => {
    const newPausedState = !isPaused;
    setIsPaused(newPausedState);

    if (newPausedState) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    } else {
      nextPunch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black/20 relative h-full text-white flex flex-col px-4 pt-24  md:px-12 py-8 md:py-24"
    >
      <span className="absolute -z-1 blur-[200px] sm:blur-[300px] md:blur-[400px] top-0 left-0 w-[80%] sm:w-[60%] md:w-[50%] h-[30%] sm:h-[35%] md:h-[40%] bg-[#fc4f4f61]" />
      <span className="absolute -z-1 blur-[200px] sm:blur-[300px] md:blur-[400px] top-0 right-0 w-[80%] sm:w-[60%] md:w-[50%] h-[30%] sm:h-[35%] md:h-[40%] bg-[#575cfa43]" />
      <ScrollToTop />
      <div className="train-bg w-full h-full fixed top-0 left-0 opacity-10 -z-7" />

      {/* Header with navigation */}
      <div className="container mx-auto flex  items-center gap-4 justify-between py-2">
        <Link
          to="/select"
          className="flex items-center justify-center rounded-full bg-black border-red-600 border-2 p-3 hover:bg-red-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="flex items-center w-full gap-8">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-bold ml-0 sm:ml-4 helvetica-font">
            Training Mode
          </h1>
          <div className="h-1 flex-grow bg-red-600 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-1 pt-12 flex-1 flex flex-col items-center">
        {/* Combo display */}
        <div className="bg-white/20 shadow-2xl rounded-xl p-6 w-full max-w-2xl mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Combo</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {combo.map((punch, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-center size-10 sm:size-12 md:size-14 rounded-full text-white font-bold text-base sm:text-lg
                  ${
                    currentIndex === idx && isTraining && !isPaused
                      ? "ring-2 ring-white ring-offset-2 ring-offset-gray-900"
                      : ""
                  }
                  ${idx < currentIndex && isTraining ? "opacity-50" : ""}
                `}
                style={{
                  backgroundColor: punchTypes[punch]?.color || "#6b7280",
                }}
              >
                {punch}
              </div>
            ))}
          </div>
          <p className="text-center mt-4 text-gray-400">{comboString}</p>
        </div>

        {/* Main display area */}
        <div className="relative w-full max-w-2xl aspect-video bg-white/20 shadow-2xl rounded-xl flex items-center justify-center mb-8 overflow-hidden">
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
                className="flex flex-col items-center justify-center"
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
                <div className="text-lg sm:text-xl font-medium">
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

        {/* Controls */}
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
                  className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
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
                <div className="bg-white/20 shadow-2xl rounded-xl p-3 md:p-6 mb-4">
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
                          className="bg-white hover:bg-gray-700 p-2 rounded-lg"
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
                          className="bg-white  hover:bg-gray-700 p-2 rounded-lg"
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
                          className="bg-white hover:bg-gray-700 p-2 rounded-lg"
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
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-6 border-t border-gray-800">
        <p className="text-center text-gray-200 text-sm sm:text-base md:text-xl russo">
          Follow the visual and audio cues to complete your boxing combo <br />
          *Punch count is approximate — for training use only.
        </p>
      </div>
    </motion.div>
  );
}
