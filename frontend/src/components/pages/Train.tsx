"use client";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router";
import { motion } from "framer-motion";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import * as tf from "@tensorflow/tfjs";
import { ArrowLeft } from "lucide-react";
import ScrollToTop from "../ui/ScrollToTop";
import ComboTray from "../ui/comboTray";
import TrainHud from "../ui/TrainHud";
import TrainControls from "../ui/TrainControls";
import punchTypes from "../../data/punchTypes";
import punchAudioMap from "../../data/punchAudio";
import parseCombo from "../../utils/parseCombo";

interface TrainingState {
  index: number;
  remainingReps: number;
  isActive: boolean;
}

export default function Train() {
  const location = useLocation();
  const comboString = new URLSearchParams(location.search).get("combo") || "1-2";
 
 // parse the combo
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
      <span className="absolute -z-1 blur-[200px] sm:blur-[300px] md:blur-[400px] top-0 left-0 w-[80%] sm:w-[60%] md:w-[50%] h-[30%] sm:h-[35%] md:h-[40%] bg-[#70707061]" />
      <span className="absolute -z-1 blur-[200px] sm:blur-[300px] md:blur-[400px] top-0 right-0 w-[80%] sm:w-[60%] md:w-[50%] h-[30%] sm:h-[35%] md:h-[40%] bg-[#575cfa43]" />
      <ScrollToTop />
      <div className="train-bg w-full h-full fixed top-0 left-0 opacity-10 -z-7" />

      {/* Header with navigation */}
      <header className="container mx-auto flex  items-center gap-4 justify-between py-2">
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
      </header>

      <div className="container mx-auto px-1 pt-12 flex-1 flex flex-col items-center">
        {/* Combo display */}
        <ComboTray
          combo={combo}
          currentIndex={currentIndex}
          isTraining={isTraining}
          isPaused={isPaused}
          punchTypes={punchTypes}
          comboString={comboString}
        />

        {/* Main display area */}
        <TrainHud
          videoRef={videoRef}
          toggleCamera={toggleCamera}
          cameraEnabled={cameraEnabled}
          punchCount={punchCount}
          countdown={countdown}
          isTraining={isTraining}
          currentPunch={currentPunch}
          repsLeft={repsLeft}
          reps={reps}
          currentIndex={currentIndex}
          punchTypes={punchTypes}
        />

        {/* Controls */}
        <TrainControls
          setShowSettings={setShowSettings}
          showSettings={showSettings}
          isTraining={isTraining}
          startTraining={startTraining}
          stopTraining={stopTraining}
          isPaused={isPaused}
          togglePause={togglePause}
          intervalTime={intervalTime}
          setIntervalTime={setIntervalTime}
          reps={reps}
          setReps={setReps}
          setRepsLeft={setRepsLeft}
        />
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 border-t border-gray-800">
        <p className="text-center text-gray-200 text-sm sm:text-base md:text-xl russo">
          Follow the visual and audio cues to complete your boxing combo <br />
          *Punch count is approximate — for training use only.
        </p>
      </footer>
    </motion.div>
  );
}
