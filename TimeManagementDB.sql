-- Drop existing tables if they exist (for development purposes)
DROP TABLE IF EXISTS QUE;
DROP TABLE IF EXISTS TELLER;
DROP TABLE IF EXISTS STUDENT;
DROP TABLE IF EXISTS ACCOUNT;
DROP TABLE IF EXISTS TICKET_TRACKER;

-- Create Student Table with Priority-Based Ticket Numbering
CREATE TABLE STUDENT (
    Ticket_num VARCHAR(10) PRIMARY KEY,  -- Format: A1, B2, C3
    Name VARCHAR(50) NOT NULL,
    ID INTEGER NOT NULL,
    College_Faculty VARCHAR(50) NOT NULL,
    Student_Level VARCHAR(50) NOT NULL,
    Phone VARCHAR(14) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Issue_type VARCHAR(100) NOT NULL,
    Priority CHAR(1) NOT NULL CHECK (Priority IN ('A', 'B', 'C')),  -- Priority A, B, or C
    Arrival_Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create User Accounts Table
CREATE TABLE ACCOUNT (
    UserID INTEGER AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL, -- Using VARCHAR instead of INTEGER for security
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Phone VARCHAR(14) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    User_type ENUM('Admin', 'Teller') NOT NULL  -- Defines if the user is an admin or teller
);

-- Create Teller Table
CREATE TABLE TELLER (
    Teller_ID INTEGER PRIMARY KEY AUTO_INCREMENT,
    User_ID INTEGER NOT NULL,
    CONSTRAINT FK_Teller_User FOREIGN KEY (User_ID) REFERENCES ACCOUNT(UserID) ON DELETE CASCADE
);

-- Create Ticket Queue Table
CREATE TABLE QUE (
    TellerID INTEGER,
    Ticket_Number VARCHAR(10),
    Status ENUM('Waiting', 'In Progress', 'Completed') NOT NULL,
    CONSTRAINT FK_Que_Teller FOREIGN KEY (TellerID) REFERENCES TELLER(Teller_ID) ON DELETE SET NULL,
    CONSTRAINT FK_Que_Ticket FOREIGN KEY (Ticket_Number) REFERENCES STUDENT(Ticket_num) ON DELETE CASCADE
);

-- Create Ticket Tracker Table for Priority-Based Numbering
CREATE TABLE TICKET_TRACKER (
    Priority CHAR(1) PRIMARY KEY CHECK (Priority IN ('A', 'B', 'C')),
    Last_Number INTEGER DEFAULT 0
);

-- Testing Database
-- Pre-fill Priority Tracking Table
INSERT INTO TICKET_TRACKER (Priority, Last_Number) VALUES ('A', 0), ('B', 0), ('C', 0);
