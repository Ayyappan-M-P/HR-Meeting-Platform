// // // services/api.js

// // const API_BASE_URL = 'http://localhost:5196/api';

// // class ApiService {
// //   constructor() {
// //     this.baseUrl = API_BASE_URL;
// //   }

// //   // Get auth token
// //   getToken() {
// //     return localStorage.getItem('token');
// //   }

// //   // Get auth headers
// //   getHeaders(includeAuth = true) {
// //     const headers = {
// //       'Content-Type': 'application/json',
// //     };
    
// //     if (includeAuth) {
// //       const token = this.getToken();
// //       if (token) {
// //         headers['Authorization'] = `Bearer ${token}`;
// //       }
// //     }
    
// //     return headers;
// //   }

// //   // Handle API response
// //   async handleResponse(response) {
// //     if (!response.ok) {
// //       const error = await response.json().catch(() => ({ message: 'Request failed' }));
// //       throw new Error(error.message || `HTTP error! status: ${response.status}`);
// //     }
// //     return response.json();
// //   }

// //   // AUTH ENDPOINTS
// //   async login(email, password) {
// //     const response = await fetch(`${this.baseUrl}/auth/login`, {
// //       method: 'POST',
// //       headers: this.getHeaders(false),
// //       body: JSON.stringify({ email, password })
// //     });
// //     return this.handleResponse(response);
// //   }

// //   // HR ENDPOINTS
// //   async createInterview(candidateEmail, candidateName, scheduledAt) {
// //     const response = await fetch(`${this.baseUrl}/hr/interviews/create`, {
// //       method: 'POST',
// //       headers: this.getHeaders(),
// //       body: JSON.stringify({ candidateEmail, candidateName, scheduledAt })
// //     });
// //     return this.handleResponse(response);
// //   }

// //   async getInterviews() {
// //     const response = await fetch(`${this.baseUrl}/hr/interviews`, {
// //       headers: this.getHeaders()
// //     });
// //     return this.handleResponse(response);
// //   }

// //   async getInterview(interviewId) {
// //     const response = await fetch(`${this.baseUrl}/hr/interviews/${interviewId}`, {
// //       headers: this.getHeaders()
// //     });
// //     return this.handleResponse(response);
// //   }

// //   async saveScorecard(scorecardData) {
// //     const response = await fetch(`${this.baseUrl}/hr/scorecard/save`, {
// //       method: 'POST',
// //       headers: this.getHeaders(),
// //       body: JSON.stringify(scorecardData)
// //     });
// //     return this.handleResponse(response);
// //   }

// //   async getScorecard(interviewId) {
// //     const response = await fetch(`${this.baseUrl}/hr/scorecard/${interviewId}`, {
// //       headers: this.getHeaders()
// //     });
// //     return this.handleResponse(response);
// //   }

// //   // CANDIDATE ENDPOINTS
// //   async joinMeeting(meetingLink) {
// //     const linkId = meetingLink.split('/').pop();
// //     const response = await fetch(`${this.baseUrl}/candidate/join/${linkId}`, {
// //       headers: this.getHeaders(false)
// //     });
// //     return this.handleResponse(response);
// //   }

// //   async logEvent(interviewId, logType, message) {
// //     const response = await fetch(`${this.baseUrl}/candidate/log-event`, {
// //       method: 'POST',
// //       headers: this.getHeaders(false),
// //       body: JSON.stringify({ interviewId, logType, message })
// //     });
// //     return this.handleResponse(response);
// //   }

// //   // WHITEBOARD ENDPOINTS
// //   async saveWhiteboard(interviewId, imageUrl) {
// //     const response = await fetch(`${this.baseUrl}/whiteboard/save`, {
// //       method: 'POST',
// //       headers: this.getHeaders(),
// //       body: JSON.stringify({ interviewId, imageUrl })
// //     });
// //     return this.handleResponse(response);
// //   }
// // }

// // // Export singleton instance
// // const apiService = new ApiService();
// // export default apiService;

// // services/api.js - Updated for new authentication

// const API_BASE_URL = 'http://localhost:5196/api';

// class ApiService {
//   constructor() {
//     this.baseUrl = API_BASE_URL;
//   }

//   getToken() {
//     return localStorage.getItem('token');
//   }

//   getHeaders(includeAuth = true) {
//     const headers = {
//       'Content-Type': 'application/json',
//     };
    
//     if (includeAuth) {
//       const token = this.getToken();
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       }
//     }
    
//     return headers;
//   }

//   async handleResponse(response) {
//     if (!response.ok) {
//       const error = await response.json().catch(() => ({ message: 'Request failed' }));
//       throw new Error(error.message || `HTTP error! status: ${response.status}`);
//     }
//     return response.json();
//   }

//   // ====== AUTHENTICATION ======
  
//   // HR Login (hardcoded credentials)
//   async hrLogin(email, password) {
//     const response = await fetch(`${this.baseUrl}/auth/hr/login`, {
//       method: 'POST',
//       headers: this.getHeaders(false),
//       body: JSON.stringify({ email, password })
//     });
//     return this.handleResponse(response);
//   }

//   // Candidate Login (email + meeting ID)
//   async candidateLogin(email, meetingId, name = null, resumeUrl = null) {
//     const response = await fetch(`${this.baseUrl}/auth/candidate/login`, {
//       method: 'POST',
//       headers: this.getHeaders(false),
//       body: JSON.stringify({ email, meetingId, name, resumeUrl })
//     });
//     return this.handleResponse(response);
//   }

//   // Get available HR accounts (for display)
//   async getHRAccounts() {
//     const response = await fetch(`${this.baseUrl}/auth/hr/accounts`, {
//       headers: this.getHeaders(false)
//     });
//     return this.handleResponse(response);
//   }

//   // ====== HR ENDPOINTS ======
  
//   async createInterview(candidateEmail, candidateName, scheduledAt) {
//     const response = await fetch(`${this.baseUrl}/hr/interviews/create`, {
//       method: 'POST',
//       headers: this.getHeaders(),
//       body: JSON.stringify({ candidateEmail, candidateName, scheduledAt })
//     });
//     return this.handleResponse(response);
//   }

//   async getInterviews() {
//     const response = await fetch(`${this.baseUrl}/hr/interviews`, {
//       headers: this.getHeaders()
//     });
//     return this.handleResponse(response);
//   }

//   async getInterview(interviewId) {
//     const response = await fetch(`${this.baseUrl}/hr/interviews/${interviewId}`, {
//       headers: this.getHeaders()
//     });
//     return this.handleResponse(response);
//   }

//   async saveScorecard(scorecardData) {
//     const response = await fetch(`${this.baseUrl}/hr/scorecard/save`, {
//       method: 'POST',
//       headers: this.getHeaders(),
//       body: JSON.stringify(scorecardData)
//     });
//     return this.handleResponse(response);
//   }

//   async getScorecard(interviewId) {
//     const response = await fetch(`${this.baseUrl}/hr/scorecard/${interviewId}`, {
//       headers: this.getHeaders()
//     });
//     return this.handleResponse(response);
//   }

//   async getDashboardStats() {
//     const response = await fetch(`${this.baseUrl}/hr/dashboard/stats`, {
//       headers: this.getHeaders()
//     });
//     return this.handleResponse(response);
//   }

//   // ====== CANDIDATE ENDPOINTS ======
  
//   // async logEvent(interviewId, logType, message) {
//   //   const response = await fetch(`${this.baseUrl}/candidate/log-event`, {
//   //     method: 'POST',
//   //     headers: this.getHeaders(false),
//   //     body: JSON.stringify({ interviewId, logType, message })
//   //   });
//   //   return this.handleResponse(response);
//   // }

//   async logEvent(interviewId, logType, message) {
//   const response = await fetch(`${this.baseUrl}/candidate/log-event`, {
//     method: 'POST',
//     headers: this.getHeaders(),  // ✅ include JWT token
//     body: JSON.stringify({ interviewId, logType, message })
//   });
//   return this.handleResponse(response);
// }


//   // ====== WHITEBOARD ENDPOINTS ======
  
//   async saveWhiteboard(interviewId, imageData) {
//     const response = await fetch(`${this.baseUrl}/whiteboard/save`, {
//       method: 'POST',
//       headers: this.getHeaders(),
//       body: JSON.stringify({ interviewId, imageData })
//     });
//     return this.handleResponse(response);
//   }

//   async getWhiteboards(interviewId) {
//     const response = await fetch(`${this.baseUrl}/whiteboard/interview/${interviewId}`, {
//       headers: this.getHeaders()
//     });
//     return this.handleResponse(response);
//   }
// }

// // Export singleton instance
// const apiService = new ApiService();
// export default apiService;


const API_BASE_URL = 'http://localhost:5196/api';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // ===== TOKEN FUNCTIONS =====
  getToken() {
    return localStorage.getItem('token');
  }

  saveToken(token) {
    if (!token || token.split('.').length !== 3) {
      console.error("❌ Invalid JWT received:", token);
      return;
    }
    localStorage.setItem('token', token);
  }

  getHeaders(includeAuth = true) {
    const headers = { 'Content-Type': 'application/json' };

    if (includeAuth) {
      const token = this.getToken();
      if (token && token.split('.').length === 3) {
        headers['Authorization'] = `Bearer ${token}`;
      } else {
        console.warn("⚠️ No valid token found. Skipping Authorization header.");
      }
    }

    return headers;
  }

  async handleResponse(response) {
    const text = await response.text();

    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      console.error("❌ Failed to parse JSON", text);
      throw new Error("Invalid JSON response from server");
    }

    if (!response.ok) {
      throw new Error(data.message || `HTTP Error ${response.status}`);
    }

    return data;
  }

  // ===== AUTH =====

  async hrLogin(email, password) {
  const response = await fetch(`${this.baseUrl}/auth/hr/login`, {
    method: 'POST',
    headers: this.getHeaders(false),
    body: JSON.stringify({ email, password })
  });

  const data = await this.handleResponse(response);

  // ✅ Now using camelCase (lowercase)
  if (data.token) this.saveToken(data.token);

  return data;
}

async candidateLogin(email, meetingId, name = null, resumeUrl = null) {
  const response = await fetch(`${this.baseUrl}/auth/candidate/login`, {
    method: 'POST',
    headers: this.getHeaders(false),
    body: JSON.stringify({ email, meetingId, name, resumeUrl })
  });

  const data = await this.handleResponse(response);

  // ✅ Now using camelCase (lowercase)
  if (data.token) this.saveToken(data.token);

  return data;
}

  async getHRAccounts() {
    const response = await fetch(`${this.baseUrl}/auth/hr/accounts`, {
      headers: this.getHeaders(false)
    });
    return this.handleResponse(response);
  }

  // ===== HR ENDPOINTS =====
  async createInterview(candidateEmail, candidateName, scheduledAt) {
    const response = await fetch(`${this.baseUrl}/hr/interviews/create`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ candidateEmail, candidateName, scheduledAt })
    });
    return this.handleResponse(response);
  }

  async getInterviews() {
    const response = await fetch(`${this.baseUrl}/hr/interviews`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  async getInterview(interviewId) {
    const response = await fetch(`${this.baseUrl}/hr/interviews/${interviewId}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  async saveScorecard(scorecardData) {
    const response = await fetch(`${this.baseUrl}/hr/scorecard/save`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(scorecardData)
    });
    return this.handleResponse(response);
  }

  async getScorecard(interviewId) {
    const response = await fetch(`${this.baseUrl}/hr/scorecard/${interviewId}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  async getDashboardStats() {
    const response = await fetch(`${this.baseUrl}/hr/dashboard/stats`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  // ===== CANDIDATE ENDPOINTS =====
  async logEvent(interviewId, logType, message) {
    const response = await fetch(`${this.baseUrl}/candidate/log-event`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ interviewId, logType, message })
    });
    return this.handleResponse(response);
  }

  // ===== WHITEBOARD =====
  async saveWhiteboard(interviewId, imageData) {
    const response = await fetch(`${this.baseUrl}/whiteboard/save`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ interviewId, imageData })
    });
    return this.handleResponse(response);
  }

  async getWhiteboards(interviewId) {
    const response = await fetch(`${this.baseUrl}/whiteboard/interview/${interviewId}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }
}

const apiService = new ApiService();
export default apiService;
