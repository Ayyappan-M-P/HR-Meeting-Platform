// services/proctoring.js

class ProctoringService {
  constructor() {
    this.videoElement = null;
    this.onAlert = null;
    this.isInitialized = false;
    this.detectionInterval = null;
    this.tabSwitchCount = 0;
    this.multipleFacesDetected = false;
    this.models = {
      faceDetection: null,
      poseDetection: null
    };
  }

  // Initialize proctoring with video element and alert callback
  initialize(videoElement, onAlert) {
    this.videoElement = videoElement;
    this.onAlert = onAlert;
    this.isInitialized = true;
    
    // Start monitoring
    this.startTabSwitchDetection();
    this.startFaceDetection();
    this.startMobileDetection();
    
    return true;
  }

  // Tab switch detection using visibility API
  startTabSwitchDetection() {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        this.tabSwitchCount++;
        this.triggerAlert({
          type: 'tab_switch',
          message: `Tab switched away from interview (Count: ${this.tabSwitchCount})`,
          timestamp: new Date().toISOString(),
          severity: 'warning'
        });
      }
    };

    const handleBlur = () => {
      this.triggerAlert({
        type: 'window_focus_lost',
        message: 'Window focus lost',
        timestamp: new Date().toISOString(),
        severity: 'info'
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    // Store cleanup function
    this.cleanupTabDetection = () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }

  // Face detection using browser's FaceDetector API (if available) or simulation
  async startFaceDetection() {
    // Check if native Face Detection API is available
    if ('FaceDetector' in window) {
      try {
        const faceDetector = new FaceDetector({ maxDetectedFaces: 5, fastMode: true });
        
        this.detectionInterval = setInterval(async () => {
          if (!this.videoElement || !this.isInitialized) return;

          try {
            const faces = await faceDetector.detect(this.videoElement);
            
            if (faces.length > 1) {
              this.multipleFacesDetected = true;
              this.triggerAlert({
                type: 'multiple_faces',
                message: `Multiple faces detected (${faces.length} faces)`,
                timestamp: new Date().toISOString(),
                severity: 'critical',
                count: faces.length
              });
            } else if (faces.length === 0) {
              this.triggerAlert({
                type: 'no_face',
                message: 'No face detected in frame',
                timestamp: new Date().toISOString(),
                severity: 'warning'
              });
            } else {
              this.multipleFacesDetected = false;
            }
          } catch (err) {
            console.error('Face detection error:', err);
          }
        }, 3000); // Check every 3 seconds
      } catch (err) {
        console.warn('Native Face Detection not available, using simulation');
        this.simulateFaceDetection();
      }
    } else {
      // Fallback: Use TensorFlow.js or simulate
      this.simulateFaceDetection();
    }
  }

  // Simulate face detection for demo purposes
  simulateFaceDetection() {
    this.detectionInterval = setInterval(() => {
      // Randomly trigger alerts for demo (remove in production)
      const random = Math.random();
      
      if (random < 0.05) { // 5% chance
        this.triggerAlert({
          type: 'multiple_faces',
          message: 'Multiple faces detected (Demo)',
          timestamp: new Date().toISOString(),
          severity: 'critical'
        });
      }
    }, 10000);
  }

  // Mobile usage detection (looking down, hand near face)
  startMobileDetection() {
    // This would use pose detection libraries like TensorFlow.js PoseNet
    // For now, we'll provide the structure
    
    // In production, you would:
    // 1. Load PoseNet or MediaPipe Pose model
    // 2. Detect key points (nose, wrists, etc.)
    // 3. Analyze angles and positions
    // 4. Trigger alerts based on suspicious patterns

    console.log('Mobile detection initialized (requires pose detection model)');
    
    // Simulated mobile detection
    this.mobileDetectionInterval = setInterval(() => {
      const random = Math.random();
      
      if (random < 0.03) { // 3% chance
        this.triggerAlert({
          type: 'mobile_usage',
          message: 'Possible mobile device usage detected',
          timestamp: new Date().toISOString(),
          severity: 'warning'
        });
      }
    }, 15000);
  }

  // Trigger alert callback
  triggerAlert(alert) {
    if (this.onAlert && typeof this.onAlert === 'function') {
      this.onAlert(alert);
    }
    
    // Also log to console for debugging
    console.warn('Proctoring Alert:', alert);
  }

  // Get current statistics
  getStatistics() {
    return {
      tabSwitches: this.tabSwitchCount,
      multipleFacesDetected: this.multipleFacesDetected,
      isMonitoring: this.isInitialized
    };
  }

  // Load TensorFlow.js models (optional enhancement)
  async loadTensorFlowModels() {
    try {
      // This would load actual TensorFlow.js models
      // For now, just a placeholder
      
      // Example:
      // const blazeface = await blazeface.load();
      // const poseNet = await posenet.load();
      
      console.log('TensorFlow.js models would be loaded here');
      return true;
    } catch (error) {
      console.error('Failed to load TensorFlow models:', error);
      return false;
    }
  }

  // Advanced face detection with TensorFlow.js BlazeFace
  async detectFacesWithTensorFlow() {
    // This would use the actual TensorFlow.js library
    // npm install @tensorflow-models/blazeface @tensorflow/tfjs
    
    /*
    try {
      const predictions = await this.models.faceDetection.estimateFaces(
        this.videoElement, 
        false
      );
      
      return predictions.length;
    } catch (error) {
      console.error('TensorFlow face detection error:', error);
      return 0;
    }
    */
  }

  // Cleanup and stop monitoring
  stop() {
    // Clear intervals
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
      this.detectionInterval = null;
    }
    
    if (this.mobileDetectionInterval) {
      clearInterval(this.mobileDetectionInterval);
      this.mobileDetectionInterval = null;
    }

    // Cleanup event listeners
    if (this.cleanupTabDetection) {
      this.cleanupTabDetection();
    }

    this.isInitialized = false;
    this.videoElement = null;
    this.onAlert = null;
    
    console.log('Proctoring service stopped');
  }
}

// Export singleton instance
const proctoringService = new ProctoringService();
export default proctoringService;