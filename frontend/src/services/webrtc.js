// // services/webrtc.js

// class WebRTCService {
//   constructor() {
//     this.localStream = null;
//     this.remoteStream = null;
//     this.peerConnection = null;
//     this.configuration = {
//       iceServers: [
//         { urls: 'stun:stun.l.google.com:19302' },
//         { urls: 'stun:stun1.l.google.com:19302' }
//       ]
//     };
//     this.dataChannel = null;
//   }

//   // Initialize local media stream
//   async initLocalStream(videoElement) {
//     try {
//       this.localStream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           width: { ideal: 1280 },
//           height: { ideal: 720 },
//           facingMode: 'user'
//         },
//         audio: {
//           echoCancellation: true,
//           noiseSuppression: true,
//           autoGainControl: true
//         }
//       });

//       if (videoElement) {
//         videoElement.srcObject = this.localStream;
//       }

//       return this.localStream;
//     } catch (error) {
//       console.error('Error accessing media devices:', error);
//       throw error;
//     }
//   }

//   // Create peer connection
//   createPeerConnection(onIceCandidate, onTrack) {
//     this.peerConnection = new RTCPeerConnection(this.configuration);

//     // Add local tracks to peer connection
//     if (this.localStream) {
//       this.localStream.getTracks().forEach(track => {
//         this.peerConnection.addTrack(track, this.localStream);
//       });
//     }

//     // Handle ICE candidates
//     this.peerConnection.onicecandidate = (event) => {
//       if (event.candidate && onIceCandidate) {
//         onIceCandidate(event.candidate);
//       }
//     };

//     // Handle remote tracks
//     this.peerConnection.ontrack = (event) => {
//       if (!this.remoteStream) {
//         this.remoteStream = new MediaStream();
//       }
//       this.remoteStream.addTrack(event.track);
//       if (onTrack) {
//         onTrack(this.remoteStream);
//       }
//     };

//     // Create data channel for chat
//     this.dataChannel = this.peerConnection.createDataChannel('chat');
//     this.setupDataChannel();

//     return this.peerConnection;
//   }

//   // Setup data channel
//   setupDataChannel() {
//     if (this.dataChannel) {
//       this.dataChannel.onopen = () => {
//         console.log('Data channel opened');
//       };

//       this.dataChannel.onclose = () => {
//         console.log('Data channel closed');
//       };

//       this.dataChannel.onmessage = (event) => {
//         console.log('Received message:', event.data);
//         // Handle incoming messages
//         if (this.onMessageReceived) {
//           this.onMessageReceived(JSON.parse(event.data));
//         }
//       };
//     }
//   }

//   // Create offer
//   async createOffer() {
//     if (!this.peerConnection) {
//       throw new Error('Peer connection not initialized');
//     }

//     const offer = await this.peerConnection.createOffer();
//     await this.peerConnection.setLocalDescription(offer);
//     return offer;
//   }

//   // Create answer
//   async createAnswer() {
//     if (!this.peerConnection) {
//       throw new Error('Peer connection not initialized');
//     }

//     const answer = await this.peerConnection.createAnswer();
//     await this.peerConnection.setLocalDescription(answer);
//     return answer;
//   }

//   // Set remote description
//   async setRemoteDescription(description) {
//     if (!this.peerConnection) {
//       throw new Error('Peer connection not initialized');
//     }

//     await this.peerConnection.setRemoteDescription(
//       new RTCSessionDescription(description)
//     );
//   }

//   // Add ICE candidate
//   async addIceCandidate(candidate) {
//     if (!this.peerConnection) {
//       throw new Error('Peer connection not initialized');
//     }

//     await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//   }

//   // Send message through data channel
//   sendMessage(message) {
//     if (this.dataChannel && this.dataChannel.readyState === 'open') {
//       this.dataChannel.send(JSON.stringify(message));
//     } else {
//       console.warn('Data channel is not open');
//     }
//   }

//   // Toggle video
//   toggleVideo(enabled) {
//     if (this.localStream) {
//       const videoTrack = this.localStream.getVideoTracks()[0];
//       if (videoTrack) {
//         videoTrack.enabled = enabled;
//         return videoTrack.enabled;
//       }
//     }
//     return false;
//   }

//   // Toggle audio
//   toggleAudio(enabled) {
//     if (this.localStream) {
//       const audioTrack = this.localStream.getAudioTracks()[0];
//       if (audioTrack) {
//         audioTrack.enabled = enabled;
//         return audioTrack.enabled;
//       }
//     }
//     return false;
//   }

//   // Start screen sharing
//   async startScreenShare() {
//     try {
//       const screenStream = await navigator.mediaDevices.getDisplayMedia({
//         video: {
//           cursor: 'always'
//         },
//         audio: false
//       });

//       const screenTrack = screenStream.getVideoTracks()[0];
      
//       // Replace video track in peer connection
//       if (this.peerConnection) {
//         const sender = this.peerConnection
//           .getSenders()
//           .find(s => s.track && s.track.kind === 'video');
        
//         if (sender) {
//           sender.replaceTrack(screenTrack);
//         }
//       }

//       // Handle screen share stop
//       screenTrack.onended = () => {
//         this.stopScreenShare();
//       };

//       return screenStream;
//     } catch (error) {
//       console.error('Error starting screen share:', error);
//       throw error;
//     }
//   }

//   // Stop screen sharing
//   stopScreenShare() {
//     if (this.localStream && this.peerConnection) {
//       const videoTrack = this.localStream.getVideoTracks()[0];
//       const sender = this.peerConnection
//         .getSenders()
//         .find(s => s.track && s.track.kind === 'video');
      
//       if (sender && videoTrack) {
//         sender.replaceTrack(videoTrack);
//       }
//     }
//   }

//   // Get connection stats
//   async getStats() {
//     if (!this.peerConnection) {
//       return null;
//     }

//     const stats = await this.peerConnection.getStats();
//     const report = {};

//     stats.forEach(stat => {
//       if (stat.type === 'inbound-rtp' || stat.type === 'outbound-rtp') {
//         report[stat.type] = {
//           bytesReceived: stat.bytesReceived,
//           bytesSent: stat.bytesSent,
//           packetsLost: stat.packetsLost,
//           jitter: stat.jitter
//         };
//       }
//     });

//     return report;
//   }

//   // Close connection
//   close() {
//     // Close data channel
//     if (this.dataChannel) {
//       this.dataChannel.close();
//       this.dataChannel = null;
//     }

//     // Close peer connection
//     if (this.peerConnection) {
//       this.peerConnection.close();
//       this.peerConnection = null;
//     }

//     // Stop local stream
//     if (this.localStream) {
//       this.localStream.getTracks().forEach(track => track.stop());
//       this.localStream = null;
//     }

//     // Stop remote stream
//     if (this.remoteStream) {
//       this.remoteStream.getTracks().forEach(track => track.stop());
//       this.remoteStream = null;
//     }
//   }
// }

// // Export singleton instance
// const webrtcService = new WebRTCService();
// export default webrtcService;

class WebRTCService {
  constructor() {
    this.localStream = null;
    this.remoteStream = null;
    this.peerConnection = null;
    this.configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    };
    this.dataChannel = null;

    // Track management
    this.originalVideoTrack = null; // camera track before screen share
    this.currentScreenTrack = null; // current screen track
  }

  // Initialize local media stream
  async initLocalStream(videoElement) {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // cache original video track
      const vt = this.localStream.getVideoTracks()[0];
      if (vt) this.originalVideoTrack = vt;

      if (videoElement) {
        try { videoElement.srcObject = this.localStream; }
        catch (e) { console.warn('initLocalStream attach failed', e); }
      }

      return this.localStream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }

  // Create peer connection
  createPeerConnection(onIceCandidate, onTrack) {
    this.peerConnection = new RTCPeerConnection(this.configuration);

    // Add local tracks to peer connection
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        try {
          this.peerConnection.addTrack(track, this.localStream);
        } catch (e) {
          console.warn('addTrack failed', e);
        }
      });
    }

    // Handle ICE candidates
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate && onIceCandidate) {
        onIceCandidate(event.candidate);
      }
    };

    // Handle remote tracks
    this.peerConnection.ontrack = (event) => {
      if (!this.remoteStream) {
        this.remoteStream = new MediaStream();
      }
      // If the browser supplied streams, prefer the provided stream
      if (event.streams && event.streams[0]) {
        this.remoteStream = event.streams[0];
      } else if (event.track) {
        try { this.remoteStream.addTrack(event.track); }
        catch (e) { console.warn('addTrack to remoteStream failed', e); }
      }
      if (onTrack) {
        onTrack(this.remoteStream);
      }
    };

    // Create data channel for chat if not existing (catch errors)
    try {
      if (!this.dataChannel) {
        this.dataChannel = this.peerConnection.createDataChannel('chat');
        this.setupDataChannel();
      }
    } catch (e) {
      console.warn('createDataChannel failed', e);
    }

    return this.peerConnection;
  }

  // Setup data channel
  setupDataChannel() {
    if (this.dataChannel) {
      this.dataChannel.onopen = () => {
        console.log('Data channel opened');
      };

      this.dataChannel.onclose = () => {
        console.log('Data channel closed');
      };

      this.dataChannel.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (this.onMessageReceived) this.onMessageReceived(parsed);
        } catch (e) {
          console.warn('data channel non-json message', e);
          if (this.onMessageReceived) this.onMessageReceived(event.data);
        }
      };
    }
  }

  // Create offer
  async createOffer() {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }

    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    return offer;
  }

  // Create answer
  async createAnswer() {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }

    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    return answer;
  }

  // Set remote description
  async setRemoteDescription(description) {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }

    await this.peerConnection.setRemoteDescription(
      new RTCSessionDescription(description)
    );
  }

  // Add ICE candidate
  async addIceCandidate(candidate) {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }

    try {
      await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (e) {
      console.warn('addIceCandidate failed', e);
    }
  }

  // Send message through data channel
  sendMessage(message) {
    if (this.dataChannel && this.dataChannel.readyState === 'open') {
      this.dataChannel.send(JSON.stringify(message));
    } else {
      console.warn('Data channel is not open');
    }
  }

  // Toggle video
  toggleVideo(enabled) {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = enabled;
        return videoTrack.enabled;
      }
    }
    return false;
  }

  // Toggle audio
  toggleAudio(enabled) {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = enabled;
        return audioTrack.enabled;
      }
    }
    return false;
  }

  // Start screen sharing
  async startScreenShare() {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: 'always'
        },
        audio: false
      });

      const screenTrack = screenStream.getVideoTracks()[0];
      if (!screenTrack) throw new Error('No screen track');

      // Save reference so we can stop/restore later
      this.currentScreenTrack = screenTrack;

      // Find the sender for video and replace track
      if (this.peerConnection) {
        const sender = this.peerConnection.getSenders().find(s => s.track && s.track.kind === 'video');
        if (sender) {
          // store original if not stored yet
          if (!this.originalVideoTrack) {
            const localVT = this.localStream?.getVideoTracks()[0];
            if (localVT) this.originalVideoTrack = localVT;
          }

          try {
            await sender.replaceTrack(screenTrack);
          } catch (e) {
            console.warn('replaceTrack(screen) failed, trying addTrack fallback', e);
            // Fallback: remove sender track and add new track
            try {
              this.peerConnection.removeTrack(sender);
            } catch (er) { /* ignore */ }
            this.peerConnection.addTrack(screenTrack, screenStream);
          }
        } else {
          // No video sender found; just add the screen track
          try { this.peerConnection.addTrack(screenTrack, screenStream); } catch(e){ console.warn(e); }
        }
      }

      // When screen stops, automatically call stopScreenShare
      screenTrack.onended = () => {
        try { this.stopScreenShare(); } catch (e) { console.warn(e); }
      };

      return screenStream;
    } catch (error) {
      console.error('Error starting screen share:', error);
      throw error;
    }
  }

  // Stop screen sharing and restore original camera track
  stopScreenShare() {
    // stop screen track if present
    if (this.currentScreenTrack) {
      try { this.currentScreenTrack.stop(); } catch (e) { /* ignore */ }
      this.currentScreenTrack = null;
    }

    if (this.peerConnection) {
      try {
        const sender = this.peerConnection.getSenders().find(s => s.track && s.track.kind === 'video');
        if (sender && this.originalVideoTrack) {
          // restore original camera track on sender
          try {
            sender.replaceTrack(this.originalVideoTrack);
          } catch (e) {
            console.warn('restore replaceTrack failed', e);
            // fallback: add original track if replace fails
            try {
              this.peerConnection.addTrack(this.originalVideoTrack, this.localStream);
            } catch (er) { console.warn(er); }
          }
        }
      } catch (e) {
        console.warn('stopScreenShare sender restore failed', e);
      }
    }
  }

  // Get connection stats
  async getStats() {
    if (!this.peerConnection) {
      return null;
    }

    const stats = await this.peerConnection.getStats();
    const report = {};

    stats.forEach(stat => {
      if (stat.type === 'inbound-rtp' || stat.type === 'outbound-rtp') {
        report[stat.type] = {
          bytesReceived: stat.bytesReceived,
          bytesSent: stat.bytesSent,
          packetsLost: stat.packetsLost,
          jitter: stat.jitter
        };
      }
    });

    return report;
  }

  // Close connection
  close() {
    // Close data channel
    if (this.dataChannel) {
      try { this.dataChannel.close(); } catch(e) {}
      this.dataChannel = null;
    }

    // Close peer connection
    if (this.peerConnection) {
      try { this.peerConnection.close(); } catch(e) {}
      this.peerConnection = null;
    }

    // Stop local stream
    if (this.localStream) {
      try { this.localStream.getTracks().forEach(track => track.stop()); } catch(e) {}
      this.localStream = null;
    }

    // Stop remote stream
    if (this.remoteStream) {
      try { this.remoteStream.getTracks().forEach(track => track.stop()); } catch(e) {}
      this.remoteStream = null;
    }

    // Clear track refs
    this.originalVideoTrack = null;
    this.currentScreenTrack = null;
  }
}

// Export singleton instance
const webrtcService = new WebRTCService();
export default webrtcService;
