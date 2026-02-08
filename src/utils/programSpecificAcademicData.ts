/**
 * NOTE:
 * This file contains STATIC, PROGRAM-AWARE demo data
 * used to showcase academic features (notes, timetable, assignments).
 *
 * In production, this data will be fetched from
 * ERP / LMS / Faculty-managed databases.
 */

interface Note {
  id: string;
  title: string;
  courseName: string;
  courseCode: string;
  content: string;
  fileName?: string;
  createdAt: string;
}

interface TimetableEvent {
  id: string;
  courseCode: string;
  courseName: string;
  type: 'Lecture' | 'Tutorial' | 'Lab';
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  room: string;
  instructor: string;
}

interface Assignment {
  id: string;
  title: string;
  courseName: string;
  courseCode: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  submitted: boolean;
  marksObtained?: number;
}

// ========================================================================
// B.SC COMPUTER SCIENCE
// ========================================================================

export const CSE_BTECH_NOTES: Note[] = [
  {
    id: 'cse-note-1',
    title: 'Introduction to Data Structures',
    courseName: 'Data Structures & Algorithms',
    courseCode: 'CS101',
    content: 'Arrays, Linked Lists, Stacks, and Queues fundamentals',
    fileName: 'DS_Week1_Notes.pdf',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'cse-note-2',
    title: 'Database Normalization',
    courseName: 'Database Management Systems',
    courseCode: 'CSE203',
    content: '1NF, 2NF, 3NF, and BCNF with practical examples',
    fileName: 'DBMS_Normalization.pdf',
    createdAt: '2026-01-18T14:30:00Z',
  },
  {
    id: 'cse-note-3',
    title: 'Operating System Concepts',
    courseName: 'Operating Systems',
    courseCode: 'CSE202',
    content: 'Process scheduling algorithms - FCFS, SJF, Round Robin',
    fileName: 'OS_Scheduling.pdf',
    createdAt: '2026-01-20T11:00:00Z',
  },
  {
    id: 'cse-note-4',
    title: 'Computer Networks - OSI Model',
    courseName: 'Computer Networks',
    courseCode: 'CSE204',
    content: 'Seven layers of OSI model with protocols',
    fileName: 'CN_OSI_Model.pdf',
    createdAt: '2026-01-22T09:00:00Z',
  },
  {
    id: 'cse-note-5',
    title: 'Object Oriented Programming in Java',
    courseName: 'Object Oriented Programming',
    courseCode: 'CSE205',
    content: 'Classes, Objects, Inheritance, Polymorphism',
    fileName: 'OOP_Java_Concepts.pdf',
    createdAt: '2026-01-25T15:00:00Z',
  },
];

export const CSE_BTECH_TIMETABLE: TimetableEvent[] = [
  // Monday
  {
    id: 'cse-tt-1',
    courseCode: 'CS101',
    courseName: 'Data Structures & Algorithms',
    type: 'Lecture',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    room: 'DCS-101',
    instructor: 'Dr. Arman Rasool Faridi',
  },
  {
    id: 'cse-tt-2',
    courseCode: 'CS103',
    courseName: 'Database Management Systems',
    type: 'Lecture',
    day: 'Monday',
    startTime: '10:15',
    endTime: '11:15',
    room: 'DCS-102',
    instructor: 'Dr. Siddiqui Rahman',
  },
  {
    id: 'cse-tt-3',
    courseCode: 'CS102',
    courseName: 'Operating Systems',
    type: 'Tutorial',
    day: 'Monday',
    startTime: '11:30',
    endTime: '12:30',
    room: 'DCS-Lab1',
    instructor: 'Dr. Ahmed Ali',
  },
  
  // Tuesday
  {
    id: 'cse-tt-4',
    courseCode: 'CS104',
    courseName: 'Computer Networks',
    type: 'Lecture',
    day: 'Tuesday',
    startTime: '09:00',
    endTime: '10:00',
    room: 'DCS-103',
    instructor: 'Prof. Zainab Hassan',
  },
  {
    id: 'cse-tt-5',
    courseCode: 'CS105',
    courseName: 'Object Oriented Programming',
    type: 'Lecture',
    day: 'Tuesday',
    startTime: '10:15',
    endTime: '11:15',
    room: 'DCS-104',
    instructor: 'Dr. Farhan Malik',
  },
  {
    id: 'cse-tt-6',
    courseCode: 'CS101',
    courseName: 'Data Structures & Algorithms',
    type: 'Lab',
    day: 'Tuesday',
    startTime: '14:00',
    endTime: '16:00',
    room: 'DCS-Lab2',
    instructor: 'Dr. Arman Rasool Faridi',
  },
  
  // Wednesday
  {
    id: 'cse-tt-7',
    courseCode: 'CS103',
    courseName: 'Database Management Systems',
    type: 'Lab',
    day: 'Wednesday',
    startTime: '09:00',
    endTime: '11:00',
    room: 'DCS-Lab3',
    instructor: 'Dr. Siddiqui Rahman',
  },
  {
    id: 'cse-tt-8',
    courseCode: 'CS102',
    courseName: 'Operating Systems',
    type: 'Lecture',
    day: 'Wednesday',
    startTime: '11:30',
    endTime: '12:30',
    room: 'DCS-101',
    instructor: 'Dr. Ahmed Ali',
  },
  
  // Thursday
  {
    id: 'cse-tt-9',
    courseCode: 'CS104',
    courseName: 'Computer Networks',
    type: 'Tutorial',
    day: 'Thursday',
    startTime: '09:00',
    endTime: '10:00',
    room: 'DCS-102',
    instructor: 'Prof. Zainab Hassan',
  },
  {
    id: 'cse-tt-10',
    courseCode: 'CS105',
    courseName: 'Object Oriented Programming',
    type: 'Lab',
    day: 'Thursday',
    startTime: '14:00',
    endTime: '16:00',
    room: 'DCS-Lab1',
    instructor: 'Dr. Farhan Malik',
  },
  
  // Friday
  {
    id: 'cse-tt-11',
    courseCode: 'CS101',
    courseName: 'Data Structures & Algorithms',
    type: 'Tutorial',
    day: 'Friday',
    startTime: '10:15',
    endTime: '11:15',
    room: 'DCS-103',
    instructor: 'Dr. Arman Rasool Faridi',
  },
  {
    id: 'cse-tt-12',
    courseCode: 'CS102',
    courseName: 'Operating Systems',
    type: 'Lab',
    day: 'Friday',
    startTime: '14:00',
    endTime: '16:00',
    room: 'DCS-Lab2',
    instructor: 'Dr. Ahmed Ali',
  },
];

export const CSE_BTECH_ASSIGNMENTS: Assignment[] = [
  {
    id: 'cse-assgn-1',
    title: 'Implement Binary Search Tree',
    courseName: 'Data Structures & Algorithms',
    courseCode: 'CSE201',
    description: 'Implement BST with insert, delete, and search operations in C++',
    dueDate: '2026-02-10',
    totalMarks: 20,
    submitted: false,
  },
  {
    id: 'cse-assgn-2',
    title: 'Database Design Project',
    courseName: 'Database Management Systems',
    courseCode: 'CSE203',
    description: 'Design a normalized database for a library management system',
    dueDate: '2026-02-12',
    totalMarks: 25,
    submitted: true,
    marksObtained: 22,
  },
  {
    id: 'cse-assgn-3',
    title: 'CPU Scheduling Simulator',
    courseName: 'Operating Systems',
    courseCode: 'CSE202',
    description: 'Create a simulator for FCFS, SJF, and Round Robin scheduling',
    dueDate: '2026-02-15',
    totalMarks: 30,
    submitted: false,
  },
  {
    id: 'cse-assgn-4',
    title: 'Network Protocol Analysis',
    courseName: 'Computer Networks',
    courseCode: 'CSE204',
    description: 'Analyze TCP/IP packets using Wireshark and write a report',
    dueDate: '2026-02-18',
    totalMarks: 20,
    submitted: false,
  },
  {
    id: 'cse-assgn-5',
    title: 'Java OOP Mini Project',
    courseName: 'Object Oriented Programming',
    courseCode: 'CSE205',
    description: 'Develop a banking system using OOP principles in Java',
    dueDate: '2026-02-20',
    totalMarks: 35,
    submitted: false,
  },
];

// ========================================================================
// BCA (Bachelor of Computer Applications)
// ========================================================================

export const BCA_NOTES: Note[] = [
  {
    id: 'bca-note-1',
    title: 'C Programming Fundamentals',
    courseName: 'Programming in C',
    courseCode: 'BCA101',
    content: 'Variables, data types, operators, and control structures',
    fileName: 'C_Programming_Basics.pdf',
    createdAt: '2026-01-16T10:00:00Z',
  },
  {
    id: 'bca-note-2',
    title: 'Data Structures Using C',
    courseName: 'Data Structures',
    courseCode: 'BCA106',
    content: 'Implementation of stacks, queues, and linked lists in C',
    fileName: 'DS_Using_C.pdf',
    createdAt: '2026-01-19T14:00:00Z',
  },
  {
    id: 'bca-note-3',
    title: 'Database Concepts',
    courseName: 'Database Management',
    courseCode: 'BCA201',
    content: 'ER diagrams, relational model, and SQL basics',
    fileName: 'DBMS_Concepts.pdf',
    createdAt: '2026-01-21T11:00:00Z',
  },
];

export const BCA_TIMETABLE: TimetableEvent[] = [
  {
    id: 'bca-tt-1',
    courseCode: 'BCA101',
    courseName: 'Programming in C',
    type: 'Lecture',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    room: 'CS-201',
    instructor: 'Dr. Ravi Kumar',
  },
  {
    id: 'bca-tt-2',
    courseCode: 'BCA106',
    courseName: 'Data Structures',
    type: 'Lecture',
    day: 'Monday',
    startTime: '10:15',
    endTime: '11:15',
    room: 'CS-202',
    instructor: 'Prof. Anjali Sharma',
  },
  {
    id: 'bca-tt-3',
    courseCode: 'BCA201',
    courseName: 'Database Management',
    type: 'Lecture',
    day: 'Tuesday',
    startTime: '09:00',
    endTime: '10:00',
    room: 'CS-203',
    instructor: 'Dr. Mohammad Iqbal',
  },
  {
    id: 'bca-tt-4',
    courseCode: 'BCA101',
    courseName: 'Programming in C',
    type: 'Lab',
    day: 'Wednesday',
    startTime: '14:00',
    endTime: '16:00',
    room: 'CS-Lab1',
    instructor: 'Dr. Ravi Kumar',
  },
];

export const BCA_ASSIGNMENTS: Assignment[] = [
  {
    id: 'bca-assgn-1',
    title: 'C Programming Assignment',
    courseName: 'Programming in C',
    courseCode: 'BCA101',
    description: 'Write programs for array manipulation and string handling',
    dueDate: '2026-02-08',
    totalMarks: 15,
    submitted: true,
    marksObtained: 14,
  },
  {
    id: 'bca-assgn-2',
    title: 'Implement Stack and Queue',
    courseName: 'Data Structures',
    courseCode: 'BCA106',
    description: 'Implement stack and queue using arrays and linked lists',
    dueDate: '2026-02-14',
    totalMarks: 20,
    submitted: false,
  },
];

// ========================================================================
// B.SC CHEMISTRY
// ========================================================================

export const CHEMISTRY_NOTES: Note[] = [
  {
    id: 'chem-note-1',
    title: 'Organic Chemistry Basics',
    courseName: 'Organic Chemistry',
    courseCode: 'CHE201',
    content: 'Hydrocarbons, functional groups, and nomenclature',
    fileName: 'Organic_Chemistry_Notes.pdf',
    createdAt: '2026-01-17T10:00:00Z',
  },
  {
    id: 'chem-note-2',
    title: 'Inorganic Chemistry - Coordination Compounds',
    courseName: 'Inorganic Chemistry',
    courseCode: 'CHE202',
    content: 'Werner\'s theory and crystal field theory',
    fileName: 'Coordination_Compounds.pdf',
    createdAt: '2026-01-20T14:00:00Z',
  },
  {
    id: 'chem-note-3',
    title: 'Chemical Kinetics',
    courseName: 'Physical Chemistry',
    courseCode: 'CHE203',
    content: 'Rate laws, order of reaction, and Arrhenius equation',
    fileName: 'Chemical_Kinetics.pdf',
    createdAt: '2026-01-23T11:00:00Z',
  },
];

export const CHEMISTRY_TIMETABLE: TimetableEvent[] = [
  {
    id: 'chem-tt-1',
    courseCode: 'CHE201',
    courseName: 'Organic Chemistry',
    type: 'Lecture',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    room: 'Chem-101',
    instructor: 'Dr. Fatima Khan',
  },
  {
    id: 'chem-tt-2',
    courseCode: 'CHE202',
    courseName: 'Inorganic Chemistry',
    type: 'Lecture',
    day: 'Tuesday',
    startTime: '10:15',
    endTime: '11:15',
    room: 'Chem-102',
    instructor: 'Prof. Suresh Patel',
  },
  {
    id: 'chem-tt-3',
    courseCode: 'CHE203',
    courseName: 'Physical Chemistry',
    type: 'Lecture',
    day: 'Wednesday',
    startTime: '09:00',
    endTime: '10:00',
    room: 'Chem-103',
    instructor: 'Dr. Ayesha Siddiqui',
  },
  {
    id: 'chem-tt-4',
    courseCode: 'CHE201',
    courseName: 'Organic Chemistry',
    type: 'Lab',
    day: 'Thursday',
    startTime: '14:00',
    endTime: '17:00',
    room: 'Chem-Lab1',
    instructor: 'Dr. Fatima Khan',
  },
];

export const CHEMISTRY_ASSIGNMENTS: Assignment[] = [
  {
    id: 'chem-assgn-1',
    title: 'Organic Reactions Mechanism',
    courseName: 'Organic Chemistry',
    courseCode: 'CHE201',
    description: 'Write mechanisms for SN1, SN2, E1, and E2 reactions',
    dueDate: '2026-02-09',
    totalMarks: 20,
    submitted: false,
  },
  {
    id: 'chem-assgn-2',
    title: 'Coordination Compound Nomenclature',
    courseName: 'Inorganic Chemistry',
    courseCode: 'CHE202',
    description: 'Name 20 coordination compounds using IUPAC rules',
    dueDate: '2026-02-13',
    totalMarks: 15,
    submitted: true,
    marksObtained: 13,
  },
];

// ========================================================================
// ELECTRONICS ENGINEERING
// ========================================================================

export const ELECTRONICS_NOTES: Note[] = [
  {
    id: 'ece-note-1',
    title: 'Digital Logic Design',
    courseName: 'Digital Electronics',
    courseCode: 'ECE201',
    content: 'Boolean algebra, logic gates, and K-maps',
    fileName: 'Digital_Logic.pdf',
    createdAt: '2026-01-18T10:00:00Z',
  },
  {
    id: 'ece-note-2',
    title: 'Signal Processing Fundamentals',
    courseName: 'Signals and Systems',
    courseCode: 'ECE202',
    content: 'Fourier transforms and Laplace transforms',
    fileName: 'Signal_Processing.pdf',
    createdAt: '2026-01-21T14:00:00Z',
  },
];

export const ELECTRONICS_TIMETABLE: TimetableEvent[] = [
  {
    id: 'ece-tt-1',
    courseCode: 'ECE201',
    courseName: 'Digital Electronics',
    type: 'Lecture',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    room: 'ECE-201',
    instructor: 'Dr. Rajesh Verma',
  },
  {
    id: 'ece-tt-2',
    courseCode: 'ECE202',
    courseName: 'Signals and Systems',
    type: 'Lecture',
    day: 'Tuesday',
    startTime: '10:15',
    endTime: '11:15',
    room: 'ECE-202',
    instructor: 'Prof. Nisha Agarwal',
  },
];

export const ELECTRONICS_ASSIGNMENTS: Assignment[] = [
  {
    id: 'ece-assgn-1',
    title: 'Combinational Circuit Design',
    courseName: 'Digital Electronics',
    courseCode: 'ECE201',
    description: 'Design a 4-bit adder using logic gates',
    dueDate: '2026-02-11',
    totalMarks: 25,
    submitted: false,
  },
];

// ========================================================================
// BA URDU
// ========================================================================

export const BA_URDU_NOTES: Note[] = [
  {
    id: 'urdu-note-1',
    title: 'Classical Urdu Poetry',
    courseName: 'Urdu Literature',
    courseCode: 'URD201',
    content: 'Ghalib and Mir Taqi Mir - Analysis of selected ghazals',
    fileName: 'Classical_Poetry.pdf',
    createdAt: '2026-01-19T10:00:00Z',
  },
  {
    id: 'urdu-note-2',
    title: 'Modern Urdu Fiction',
    courseName: 'Urdu Prose',
    courseCode: 'URD202',
    content: 'Premchand and Manto - Short stories analysis',
    fileName: 'Modern_Fiction.pdf',
    createdAt: '2026-01-22T14:00:00Z',
  },
];

export const BA_URDU_TIMETABLE: TimetableEvent[] = [
  {
    id: 'urdu-tt-1',
    courseCode: 'URD201',
    courseName: 'Urdu Literature',
    type: 'Lecture',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    room: 'Arts-201',
    instructor: 'Prof. Nasreen Ahmed',
  },
  {
    id: 'urdu-tt-2',
    courseCode: 'URD202',
    courseName: 'Urdu Prose',
    type: 'Lecture',
    day: 'Wednesday',
    startTime: '10:15',
    endTime: '11:15',
    room: 'Arts-202',
    instructor: 'Dr. Khalid Mahmood',
  },
];

export const BA_URDU_ASSIGNMENTS: Assignment[] = [
  {
    id: 'urdu-assgn-1',
    title: 'Ghalib Poetry Analysis',
    courseName: 'Urdu Literature',
    courseCode: 'URD201',
    description: 'Critical analysis of 5 ghazals by Mirza Ghalib',
    dueDate: '2026-02-12',
    totalMarks: 20,
    submitted: false,
  },
];

// ========================================================================
// BIOCHEMISTRY
// ========================================================================

export const BIOCHEMISTRY_NOTES: Note[] = [
  {
    id: 'bio-note-1',
    title: 'Enzyme Kinetics',
    courseName: 'Biochemistry',
    courseCode: 'BIO201',
    content: 'Michaelis-Menten equation and enzyme inhibition',
    fileName: 'Enzyme_Kinetics.pdf',
    createdAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'bio-note-2',
    title: 'Protein Structure',
    courseName: 'Molecular Biology',
    courseCode: 'BIO202',
    content: 'Primary, secondary, tertiary, and quaternary structures',
    fileName: 'Protein_Structure.pdf',
    createdAt: '2026-01-23T14:00:00Z',
  },
];

export const BIOCHEMISTRY_TIMETABLE: TimetableEvent[] = [
  {
    id: 'bio-tt-1',
    courseCode: 'BIO201',
    courseName: 'Biochemistry',
    type: 'Lecture',
    day: 'Tuesday',
    startTime: '09:00',
    endTime: '10:00',
    room: 'Bio-101',
    instructor: 'Dr. Samina Khan',
  },
  {
    id: 'bio-tt-2',
    courseCode: 'BIO202',
    courseName: 'Molecular Biology',
    type: 'Lecture',
    day: 'Thursday',
    startTime: '10:15',
    endTime: '11:15',
    room: 'Bio-102',
    instructor: 'Prof. Arif Ali',
  },
];

export const BIOCHEMISTRY_ASSIGNMENTS: Assignment[] = [
  {
    id: 'bio-assgn-1',
    title: 'Enzyme Kinetics Lab Report',
    courseName: 'Biochemistry',
    courseCode: 'BIO201',
    description: 'Analyze enzyme activity and write a detailed report',
    dueDate: '2026-02-10',
    totalMarks: 25,
    submitted: true,
    marksObtained: 23,
  },
];

// ========================================================================
// B.COM (BACHELOR OF COMMERCE)
// ========================================================================

export const BCOM_NOTES: Note[] = [
  {
    id: 'bcom-note-1',
    title: 'Financial Accounting Principles',
    courseName: 'Financial Accounting',
    courseCode: 'COM201',
    content: 'Double entry system, journal entries, and trial balance preparation',
    fileName: 'Financial_Accounting_Basics.pdf',
    createdAt: '2026-01-16T10:00:00Z',
  },
  {
    id: 'bcom-note-2',
    title: 'Microeconomics Theory',
    courseName: 'Business Economics',
    courseCode: 'COM202',
    content: 'Demand and supply, elasticity, consumer behavior, and market structures',
    fileName: 'Microeconomics_Notes.pdf',
    createdAt: '2026-01-19T14:00:00Z',
  },
  {
    id: 'bcom-note-3',
    title: 'Business Organization and Management',
    courseName: 'Business Management',
    courseCode: 'COM203',
    content: 'Principles of management, organizational structure, and leadership',
    fileName: 'Business_Management.pdf',
    createdAt: '2026-01-21T11:00:00Z',
  },
  {
    id: 'bcom-note-4',
    title: 'Corporate Law Fundamentals',
    courseName: 'Business Law',
    courseCode: 'COM204',
    content: 'Indian Contract Act, Companies Act, and business regulations',
    fileName: 'Corporate_Law.pdf',
    createdAt: '2026-01-24T09:30:00Z',
  },
];

export const BCOM_TIMETABLE: TimetableEvent[] = [
  // Monday
  {
    id: 'bcom-tt-1',
    courseCode: 'COM201',
    courseName: 'Financial Accounting',
    type: 'Lecture',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    room: 'Commerce-201',
    instructor: 'Prof. Asma Rizvi',
  },
  {
    id: 'bcom-tt-2',
    courseCode: 'COM202',
    courseName: 'Business Economics',
    type: 'Lecture',
    day: 'Monday',
    startTime: '10:15',
    endTime: '11:15',
    room: 'Commerce-202',
    instructor: 'Dr. Rahul Sharma',
  },
  
  // Tuesday
  {
    id: 'bcom-tt-3',
    courseCode: 'COM203',
    courseName: 'Business Management',
    type: 'Lecture',
    day: 'Tuesday',
    startTime: '09:00',
    endTime: '10:00',
    room: 'Commerce-203',
    instructor: 'Prof. Mehnaz Khan',
  },
  {
    id: 'bcom-tt-4',
    courseCode: 'COM204',
    courseName: 'Business Law',
    type: 'Lecture',
    day: 'Tuesday',
    startTime: '11:30',
    endTime: '12:30',
    room: 'Commerce-101',
    instructor: 'Dr. Anwar Hussain',
  },
  
  // Wednesday
  {
    id: 'bcom-tt-5',
    courseCode: 'COM201',
    courseName: 'Financial Accounting',
    type: 'Tutorial',
    day: 'Wednesday',
    startTime: '09:00',
    endTime: '10:00',
    room: 'Commerce-204',
    instructor: 'Prof. Asma Rizvi',
  },
  {
    id: 'bcom-tt-6',
    courseCode: 'COM202',
    courseName: 'Business Economics',
    type: 'Tutorial',
    day: 'Wednesday',
    startTime: '10:15',
    endTime: '11:15',
    room: 'Commerce-205',
    instructor: 'Dr. Rahul Sharma',
  },
  
  // Thursday
  {
    id: 'bcom-tt-7',
    courseCode: 'COM203',
    courseName: 'Business Management',
    type: 'Tutorial',
    day: 'Thursday',
    startTime: '09:00',
    endTime: '10:00',
    room: 'Commerce-206',
    instructor: 'Prof. Mehnaz Khan',
  },
  
  // Friday
  {
    id: 'bcom-tt-8',
    courseCode: 'COM204',
    courseName: 'Business Law',
    type: 'Tutorial',
    day: 'Friday',
    startTime: '10:15',
    endTime: '11:15',
    room: 'Commerce-102',
    instructor: 'Dr. Anwar Hussain',
  },
];

export const BCOM_ASSIGNMENTS: Assignment[] = [
  {
    id: 'bcom-assgn-1',
    title: 'Financial Statements Preparation',
    courseName: 'Financial Accounting',
    courseCode: 'COM201',
    description: 'Prepare complete financial statements including balance sheet and P&L account',
    dueDate: '2026-02-09',
    totalMarks: 25,
    submitted: false,
  },
  {
    id: 'bcom-assgn-2',
    title: 'Market Structure Analysis',
    courseName: 'Business Economics',
    courseCode: 'COM202',
    description: 'Comparative analysis of perfect competition and monopoly markets',
    dueDate: '2026-02-14',
    totalMarks: 20,
    submitted: false,
  },
  {
    id: 'bcom-assgn-3',
    title: 'Case Study on Leadership',
    courseName: 'Business Management',
    courseCode: 'COM203',
    description: 'Analyze leadership styles in a real-world business scenario',
    dueDate: '2026-02-11',
    totalMarks: 15,
    submitted: true,
    marksObtained: 14,
  },
  {
    id: 'bcom-assgn-4',
    title: 'Contract Law Research',
    courseName: 'Business Law',
    courseCode: 'COM204',
    description: 'Research paper on essential elements of a valid contract',
    dueDate: '2026-02-16',
    totalMarks: 20,
    submitted: false,
  },
];

// ========================================================================
// HELPER FUNCTIONS
// ========================================================================

export function getNotesForProgram(programCode: string): Note[] {
  const code = programCode.toLowerCase();
  
  // Check most specific patterns FIRST to avoid substring matching issues
  if (code.includes('cse') || code.includes('btech') || code === 'btech_cse') {
    return CSE_BTECH_NOTES;
  } else if (code === 'bca' || code.includes('bca')) {
    return BCA_NOTES;
  } else if (code.includes('biochemistry') || code === 'biochemistry' || code === 'bsc-biochemistry') {
    // Check BEFORE 'chemistry' to avoid substring match
    return BIOCHEMISTRY_NOTES;
  } else if (code.includes('chemistry') || code === 'bsc_chemistry' || code === 'bsc-chemistry') {
    return CHEMISTRY_NOTES;
  } else if (code.includes('electronics') || code.includes('ece') || code.includes('btech-ee') || code === 'btech-ee') {
    return ELECTRONICS_NOTES;
  } else if (code.includes('urdu') || code === 'ba_urdu' || code === 'ba-urdu') {
    return BA_URDU_NOTES;
  } else if (code.includes('bcom') || code === 'bcom') {
    return BCOM_NOTES;
  }
  
  // Default fallback
  return CSE_BTECH_NOTES;
}

export function getTimetableForProgram(programCode: string): TimetableEvent[] {
  const code = programCode.toLowerCase();
  
  // Check most specific patterns FIRST to avoid substring matching issues
  if (code.includes('cse') || code.includes('btech') || code === 'btech_cse') {
    return CSE_BTECH_TIMETABLE;
  } else if (code === 'bca' || code.includes('bca')) {
    return BCA_TIMETABLE;
  } else if (code.includes('biochemistry') || code === 'biochemistry' || code === 'bsc-biochemistry') {
    // Check BEFORE 'chemistry' to avoid substring match
    return BIOCHEMISTRY_TIMETABLE;
  } else if (code.includes('chemistry') || code === 'bsc_chemistry' || code === 'bsc-chemistry') {
    return CHEMISTRY_TIMETABLE;
  } else if (code.includes('electronics') || code.includes('ece') || code.includes('btech-ee') || code === 'btech-ee') {
    return ELECTRONICS_TIMETABLE;
  } else if (code.includes('urdu') || code === 'ba_urdu' || code === 'ba-urdu') {
    return BA_URDU_TIMETABLE;
  } else if (code.includes('bcom') || code === 'bcom') {
    return BCOM_TIMETABLE;
  }
  
  // Default fallback
  return CSE_BTECH_TIMETABLE;
}

export function getAssignmentsForProgram(programCode: string): Assignment[] {
  const code = programCode.toLowerCase();
  
  // Check most specific patterns FIRST to avoid substring matching issues
  if (code.includes('cse') || code.includes('btech') || code === 'btech_cse') {
    return CSE_BTECH_ASSIGNMENTS;
  } else if (code === 'bca' || code.includes('bca')) {
    return BCA_ASSIGNMENTS;
  } else if (code.includes('biochemistry') || code === 'biochemistry' || code === 'bsc-biochemistry') {
    // Check BEFORE 'chemistry' to avoid substring match
    return BIOCHEMISTRY_ASSIGNMENTS;
  } else if (code.includes('chemistry') || code === 'bsc_chemistry' || code === 'bsc-chemistry') {
    return CHEMISTRY_ASSIGNMENTS;
  } else if (code.includes('electronics') || code.includes('ece') || code.includes('btech-ee') || code === 'btech-ee') {
    return ELECTRONICS_ASSIGNMENTS;
  } else if (code.includes('urdu') || code === 'ba_urdu' || code === 'ba-urdu') {
    return BA_URDU_ASSIGNMENTS;
  } else if (code.includes('bcom') || code === 'bcom') {
    return BCOM_ASSIGNMENTS;
  }
  
  // Default fallback
  return CSE_BTECH_ASSIGNMENTS;
}