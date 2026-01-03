import React, { useEffect, useRef, useState } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

const test = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectorRef = useRef<poseDetection.PoseDetector | null>(null);
  const animationRef = useRef<number | null>(null);
  
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  // Load MoveNet model with proper TF initialization
  useEffect(() => {
    const loadModel = async () => {
      try {
        // CRITICAL: Wait for TensorFlow to be ready
        await tf.ready();
        
        // Set backend explicitly
        await tf.setBackend('webgl');
        
        console.log('TensorFlow backend:', tf.getBackend());
        
        const detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          {
            modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
          }
        );
        detectorRef.current = detector;
        setIsModelLoaded(true);
        console.log('MoveNet model loaded');
      } catch (err) {
        console.error('Error loading model:', err);
      }
    };

    loadModel();

    return () => {
      if (detectorRef.current) {
        detectorRef.current.dispose();
      }
    };
  }, []);

  // Camera management
  useEffect(() => {
    const handleCamera = async () => {
      if (cameraEnabled && isModelLoaded) {
        try {
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
            
            // Wait a bit for video to stabilize
            setTimeout(() => {
              detectPose();
            }, 100);
          }
        } catch (err) {
          console.error("Error accessing webcam:", err);
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
          }
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
          setCameraEnabled(false);
        }
      } else if (!cameraEnabled) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        
        // Clear canvas
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }
        }
      }
    };

    handleCamera();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraEnabled, isModelLoaded]);

  // Pose detection loop
  const detectPose = async () => {
    if (!videoRef.current || !detectorRef.current || !canvasRef.current || !cameraEnabled) {
      return;
    }

    // Check if video is ready
    if (videoRef.current.readyState < 2) {
      animationRef.current = requestAnimationFrame(detectPose);
      return;
    }

    try {
      const poses = await detectorRef.current.estimatePoses(videoRef.current);
      
      // Draw poses on canvas
      drawPoses(poses);
      
      // Continue loop
      animationRef.current = requestAnimationFrame(detectPose);
    } catch (err) {
      console.error('Error detecting pose:', err);
      animationRef.current = requestAnimationFrame(detectPose);
    }
  };

  // Draw keypoints and skeleton
  const drawPoses = (poses: poseDetection.Pose[]) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (!canvas || !video) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match video (only once)
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (poses.length === 0) {
      console.log('No poses detected');
      return;
    }

    poses.forEach((pose) => {
      // Draw skeleton first (so it's behind keypoints)
      drawSkeleton(pose.keypoints, ctx);
      
      // Draw keypoints
      pose.keypoints.forEach((keypoint) => {
        if (keypoint.score && keypoint.score > 0.3) {
          ctx.beginPath();
          ctx.arc(keypoint.x, keypoint.y, 6, 0, 2 * Math.PI);
          ctx.fillStyle = '#00FF00';
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    });
  };

  // Draw connections between keypoints
  const drawSkeleton = (keypoints: poseDetection.Keypoint[], ctx: CanvasRenderingContext2D) => {
    const connections = [
      [0, 1], [0, 2], [1, 3], [2, 4], // Face
      [5, 6], // Shoulders
      [5, 7], [7, 9], // Left arm
      [6, 8], [8, 10], // Right arm
      [5, 11], [6, 12], // Torso
      [11, 12], // Hips
      [11, 13], [13, 15], // Left leg
      [12, 14], [14, 16], // Right leg
      [11, 23], [12, 24], // Left foot
      [23, 25], [24, 26], // Right foot
      [23, 27], [24, 28], // Left hand
      [27, 29], [28, 30], // Right hand

    ];

    ctx.strokeStyle = '#00ff';
    ctx.lineWidth = 3;

    connections.forEach(([i, j]) => {
      const kp1 = keypoints[i];
      const kp2 = keypoints[j];

      if (kp1 && kp2 && kp1.score && kp2.score && kp1.score > 0.3 && kp2.score > 0.3) {
        ctx.beginPath();
        ctx.moveTo(kp1.x, kp1.y);
        ctx.lineTo(kp2.x, kp2.y);
        ctx.stroke();
      }
    });
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <video
        ref={videoRef}
        style={{ 
          width: '640px', 
          height: '480px',
          display: 'block'
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '640px',
          height: '480px',
          pointerEvents: 'none'
        }}
      />
      <div style={{ marginTop: '10px' }}>
        <button 
          onClick={() => setCameraEnabled(!cameraEnabled)}
          disabled={!isModelLoaded}
        >
          {cameraEnabled ? 'Stop Camera' : 'Start Camera'}
        </button>
        {!isModelLoaded && <span style={{ marginLeft: '10px' }}>Loading model...</span>}
      </div>
    </div>
  );
};

export default test;