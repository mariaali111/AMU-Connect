/**
 * Student Context Provider for AMU StudySphere
 * 
 * Manages student personalization data including academic level, program,
 * department, and preferences. This enables intelligent content filtering
 * and personalized dashboard experiences.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Academic Programs by Level
export const ACADEMIC_PROGRAMS = {
  UG: [
    { id: 'btech', name: 'B.Tech (Bachelor of Technology)', departments: ['CSE', 'ECE', 'ME', 'CE', 'EE', 'Chemical'] },
    { 
      id: 'bsc', 
      name: 'B.Sc (Bachelor of Science)', 
      departments: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Botany', 'Zoology', 'Biochemistry', 'Industrial Chemistry', 'Computer Applications'],
      requiresMajorSelection: true,
      majors: [
        { id: 'physics', name: 'Physics' },
        { id: 'chemistry', name: 'Chemistry' },
        { id: 'mathematics', name: 'Mathematics' },
        { id: 'biology', name: 'Biology' },
        { id: 'botany', name: 'Botany' },
        { id: 'zoology', name: 'Zoology' },
        { id: 'biochemistry', name: 'Biochemistry' },
        { id: 'industrial-chemistry', name: 'Industrial Chemistry' },
        { id: 'computer-applications', name: 'Computer Applications' },
      ]
    },
    { id: 'ba', name: 'B.A (Bachelor of Arts)', departments: ['English', 'History', 'Political Science', 'Economics', 'Geography', 'Urdu'] },
    { id: 'bcom', name: 'B.Com (Bachelor of Commerce)', departments: ['Commerce', 'Accounting', 'Finance'] },
    { id: 'barch', name: 'B.Arch (Bachelor of Architecture)', departments: ['Architecture'] },
    { id: 'bba', name: 'BBA (Bachelor of Business Administration)', departments: ['Business Administration'] },
    { id: 'llb', name: 'LLB (Bachelor of Laws)', departments: ['Law'] },
  ],
  PG: [
    { id: 'mtech', name: 'M.Tech (Master of Technology)', departments: ['CSE', 'ECE', 'ME', 'CE', 'EE'] },
    { id: 'msc', name: 'M.Sc (Master of Science)', departments: ['Physics', 'Chemistry', 'Mathematics', 'Biology'] },
    { id: 'ma', name: 'M.A (Master of Arts)', departments: ['English', 'History', 'Political Science', 'Economics', 'Urdu'] },
    { id: 'mba', name: 'MBA (Master of Business Administration)', departments: ['Business Administration'] },
    { id: 'mca', name: 'MCA (Master of Computer Applications)', departments: ['Computer Applications'] },
    { id: 'mcom', name: 'M.Com (Master of Commerce)', departments: ['Commerce'] },
    { id: 'llm', name: 'LLM (Master of Laws)', departments: ['Law'] },
  ],
  PhD: [
    { id: 'phd', name: 'Ph.D (Doctor of Philosophy)', departments: ['All Departments'] },
  ],
  Diploma: [
    { id: 'diploma-engineering', name: 'Diploma in Engineering', departments: ['CSE', 'ECE', 'ME', 'CE'] },
    { id: 'diploma-pharmacy', name: 'Diploma in Pharmacy', departments: ['Pharmacy'] },
    { id: 'diploma-library', name: 'Diploma in Library Science', departments: ['Library Science'] },
  ],
};

// Club Categories
export const CLUB_CATEGORIES = {
  CULTURAL: 'Cultural & Literary',
  SPORTS: 'Sports & Games',
  TECHNICAL: 'Technical & Academic',
  SERVICE: 'Service & Professional',
};

export interface StudentContextData {
  // Core Identity
  role: 'Student' | 'Faculty' | 'Admin';
  academicLevel: 'UG' | 'PG' | 'PhD' | 'Diploma' | null; // Removed Certificate
  programId: string | null;
  programName: string | null;
  department: string | null;
  major: string | null; // NEW: For B.Sc major selection
  yearSemester: string | null;
  
  // Campus Life
  hostelStatus: 'Hosteller' | 'Day Scholar' | null;
  hostelName: string | null;
  
  // Interests & Preferences
  selectedClubs: string[];
  academicFocus: string[];
  
  // Profile Completion
  isOnboardingComplete: boolean;
  
  // CRITICAL: Admission Status for routing logic
  admissionStatus: 'not_started' | 'roll_verified' | 'payment_pending' | 'completed';
  admissionContext: {
    rollNumber?: string;
    applicationData?: any;
  };
}

interface StudentContextType {
  contextData: StudentContextData;
  updateContext: (updates: Partial<StudentContextData>) => void;
  resetContext: () => void;
  isOnboarded: boolean;
}

const defaultContext: StudentContextData = {
  role: 'Student',
  academicLevel: null,
  programId: null,
  programName: null,
  department: null,
  major: null, // NEW: For B.Sc major selection
  yearSemester: null,
  hostelStatus: null,
  hostelName: null,
  selectedClubs: [],
  academicFocus: [],
  isOnboardingComplete: false,
  admissionStatus: 'not_started',
  admissionContext: {},
};

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentContextProvider({ children }: { children: ReactNode }) {
  const [contextData, setContextData] = useState<StudentContextData>(() => {
    // Load from localStorage on init
    const stored = localStorage.getItem('amu_student_context');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse student context:', e);
      }
    }
    return defaultContext;
  });

  // Persist to localStorage whenever context changes
  useEffect(() => {
    localStorage.setItem('amu_student_context', JSON.stringify(contextData));
  }, [contextData]);

  const updateContext = (updates: Partial<StudentContextData>) => {
    setContextData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const resetContext = () => {
    setContextData(defaultContext);
    localStorage.removeItem('amu_student_context');
  };

  const value: StudentContextType = {
    contextData,
    updateContext,
    resetContext,
    isOnboarded: contextData.isOnboardingComplete,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudentContext() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudentContext must be used within a StudentContextProvider');
  }
  return context;
}