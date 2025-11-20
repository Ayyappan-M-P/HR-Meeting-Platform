-- schema.sql

CREATE TABLE Users (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(500),
    Role VARCHAR(50) NOT NULL CHECK (Role IN ('HR', 'Candidate')),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Candidates (
    Id SERIAL PRIMARY KEY,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Name VARCHAR(255) NOT NULL,
    ResumeUrl VARCHAR(500),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Interviews (
    Id SERIAL PRIMARY KEY,
    HRId INT NOT NULL REFERENCES Users(Id),
    CandidateEmail VARCHAR(255) NOT NULL,
    MeetingLink VARCHAR(500) UNIQUE NOT NULL,
    ScheduledAt TIMESTAMP NOT NULL,
    Status VARCHAR(50) DEFAULT 'Scheduled',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE InterviewLogs (
    Id SERIAL PRIMARY KEY,
    InterviewId INT NOT NULL REFERENCES Interviews(Id),
    LogType VARCHAR(100) NOT NULL CHECK (LogType IN ('face_detection', 'tab_switch', 'mobile_usage')),
    Message TEXT NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Scorecards (
    Id SERIAL PRIMARY KEY,
    InterviewId INT NOT NULL UNIQUE REFERENCES Interviews(Id),
    Communication INT CHECK (Communication BETWEEN 1 AND 10),
    Technical INT CHECK (Technical BETWEEN 1 AND 10),
    Coding INT CHECK (Coding BETWEEN 1 AND 10),
    Attitude INT CHECK (Attitude BETWEEN 1 AND 10),
    FinalDecision VARCHAR(50) CHECK (FinalDecision IN ('Selected', 'Rejected', 'Pending')),
    Comments TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Whiteboards (
    Id SERIAL PRIMARY KEY,
    InterviewId INT NOT NULL REFERENCES Interviews(Id),
    ImageUrl VARCHAR(500) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_interviews_hr ON Interviews(HRId);
CREATE INDEX idx_interviews_link ON Interviews(MeetingLink);
CREATE INDEX idx_logs_interview ON InterviewLogs(InterviewId);