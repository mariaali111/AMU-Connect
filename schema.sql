-- AMU Student Life-Cycle Management System
-- Database Schema
-- Compatible with Supabase (PostgreSQL)
-- Author(s): Team Unchecked Error

-- =========================
-- ENUM TYPES
-- =========================
CREATE TYPE user_role AS ENUM ('student', 'faculty', 'admin');
CREATE TYPE admission_status AS ENUM ('accepted', 'rejected', 'waitlisted');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed');
CREATE TYPE enrollment_status AS ENUM ('active', 'suspended', 'graduated');

-- =========================
-- PROFILES
-- =========================
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    role user_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- =========================
-- DEPARTMENTS
-- =========================
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name TEXT NOT NULL
);

-- =========================
-- PROGRAMS
-- =========================
CREATE TABLE programs (
    program_id SERIAL PRIMARY KEY,
    program_name TEXT NOT NULL,
    duration_years INT NOT NULL,
    department_id INT REFERENCES departments(department_id)
);

-- =========================
-- COURSES
-- =========================
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_name TEXT NOT NULL,
    credits INT NOT NULL,
    program_id INT NOT NULL REFERENCES programs(program_id)
);

-- =========================
-- APPLICATIONS
-- =========================
CREATE TABLE applications (
    application_id SERIAL PRIMARY KEY,
    entrance_roll_no TEXT UNIQUE NOT NULL,
    applicant_name TEXT NOT NULL,
    program_id INT REFERENCES programs(program_id),
    admission_status admission_status NOT NULL,
    admission_year INT NOT NULL,
    profile_id UUID REFERENCES profiles(id)
);

-- =========================
-- FEE STRUCTURES
-- =========================
CREATE TABLE fee_structures (
    fee_structure_id SERIAL PRIMARY KEY,
    program_id INT REFERENCES programs(program_id),
    academic_year TEXT NOT NULL,
    amount NUMERIC NOT NULL
);

-- =========================
-- PAYMENTS
-- =========================
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id),
    fee_structure_id INT REFERENCES fee_structures(fee_structure_id),
    payment_status payment_status NOT NULL,
    transaction_reference TEXT,
    paid_at TIMESTAMPTZ
);

-- =========================
-- ENROLLMENTS
-- =========================
CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    enrollment_no TEXT UNIQUE NOT NULL,
    profile_id UUID REFERENCES profiles(id),
    program_id INT REFERENCES programs(program_id),
    department_id INT REFERENCES departments(department_id),
    enrollment_date DATE NOT NULL,
    status enrollment_status NOT NULL
);

-- =========================
-- STUDENTS
-- =========================
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    profile_id UUID UNIQUE REFERENCES profiles(id),
    enrollment_id INT UNIQUE REFERENCES enrollments(enrollment_id),
    department_id INT REFERENCES departments(department_id),
    hostel_required BOOLEAN DEFAULT FALSE,
    status TEXT CHECK (status IN ('applied', 'enrolled', 'active', 'graduated', 'alumni'))
        DEFAULT 'applied'
);

-- =========================
-- COURSE OFFERINGS
-- =========================
CREATE TABLE course_offerings (
    offering_id SERIAL PRIMARY KEY,
    course_id INT NOT NULL REFERENCES courses(course_id),
    instructor_id UUID NOT NULL REFERENCES profiles(id),
    semester INT NOT NULL,
    academic_year TEXT NOT NULL
);

-- =========================
-- COURSE REGISTRATIONS
-- =========================
CREATE TABLE course_registrations (
    registration_id SERIAL PRIMARY KEY,
    enrollment_id INT NOT NULL REFERENCES enrollments(enrollment_id),
    offering_id INT NOT NULL REFERENCES course_offerings(offering_id),
    semester INT NOT NULL,
    academic_year TEXT NOT NULL
);

-- =========================
-- ATTENDANCE
-- =========================
CREATE TABLE attendance (
    attendance_id SERIAL PRIMARY KEY,
    registration_id INT NOT NULL REFERENCES course_registrations(registration_id),
    date DATE NOT NULL,
    status TEXT NOT NULL
);

-- =========================
-- EXAMS
-- =========================
CREATE TABLE exams (
    exam_id SERIAL PRIMARY KEY,
    offering_id INT NOT NULL REFERENCES course_offerings(offering_id),
    exam_type TEXT NOT NULL,
    exam_date DATE NOT NULL
);

-- =========================
-- EXAM RESULTS
-- =========================
CREATE TABLE exam_results (
    result_id SERIAL PRIMARY KEY,
    exam_id INT NOT NULL REFERENCES exams(exam_id),
    enrollment_id INT NOT NULL REFERENCES enrollments(enrollment_id),
    marks NUMERIC,
    grade TEXT
);

-- =========================
-- HOSTELS
-- =========================
CREATE TABLE hostels (
    hostel_id SERIAL PRIMARY KEY,
    hostel_name TEXT NOT NULL,
    gender TEXT CHECK (gender IN ('male', 'female')) NOT NULL,
    location TEXT NOT NULL
);

-- =========================
-- DEPARTMENT HOSTELS (M:N)
-- =========================
CREATE TABLE department_hostels (
    department_id INT REFERENCES departments(department_id),
    hostel_id INT REFERENCES hostels(hostel_id),
    PRIMARY KEY (department_id, hostel_id)
);

-- =========================
-- HOSTEL ALLOCATIONS
-- =========================
CREATE TABLE hostel_allocations (
    allocation_id SERIAL PRIMARY KEY,
    student_id INT UNIQUE NOT NULL REFERENCES students(student_id),
    hostel_id INT NOT NULL REFERENCES hostels(hostel_id),
    start_date DATE DEFAULT CURRENT_DATE NOT NULL,
    end_date DATE
);

-- =========================
-- ALUMNI
-- =========================
CREATE TABLE alumni (
    alumni_id SERIAL PRIMARY KEY,
    enrollment_id INT REFERENCES enrollments(enrollment_id),
    graduation_year INT NOT NULL,
    degree_awarded TEXT NOT NULL,
    current_occupation TEXT
);

-- =========================
-- AUDIT LOGS
-- =========================
CREATE TABLE audit_logs (
    log_id SERIAL PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id),
    action TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT now()
);
