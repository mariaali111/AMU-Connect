// FACULTY DASHBOARD – UI-ONLY DEMO
// Backend integration is intentionally omitted in the current version.
// This dashboard demonstrates planned faculty features.

import React from "react";

const FacultyDashboardView: React.FC = () => {
  return (
    <div style={{ maxWidth: "900px", margin: "3rem auto" }}>
      {/* Demo disclaimer */}
      <div
        style={{
          background: "#f3e5f5",
          border: "1px solid #ce93d8",
          padding: "1rem",
          borderRadius: "6px",
          marginBottom: "2rem",
        }}
      >
        <strong>Faculty Dashboard (UI Demo)</strong>
        <p style={{ marginTop: "0.5rem" }}>
          This dashboard presents the faculty interface design. Backend
          integration and live academic data will be implemented in future
          upgrades.
        </p>
      </div>

      <h2>Faculty Overview</h2>

      {/* Stats cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div style={cardStyle}>
          <h3>Assigned Courses</h3>
          <p>—</p>
        </div>
        <div style={cardStyle}>
          <h3>Enrolled Students</h3>
          <p>—</p>
        </div>
        <div style={cardStyle}>
          <h3>Upcoming Classes</h3>
          <p>—</p>
        </div>
        <div style={cardStyle}>
          <h3>Pending Evaluations</h3>
          <p>—</p>
        </div>
      </div>

      {/* Sections */}
      <div style={sectionStyle}>
        <h3>Course Management</h3>
        <p>
          View and manage assigned courses, syllabi, and learning materials.
        </p>
      </div>

      <div style={sectionStyle}>
        <h3>Student Evaluation</h3>
        <p>
          Enter grades, review submissions, and track academic performance.
        </p>
      </div>

      <div style={sectionStyle}>
        <h3>Timetable & Scheduling</h3>
        <p>
          View teaching schedules, upcoming lectures, and academic calendars.
        </p>
      </div>

      <div style={sectionStyle}>
        <h3>Notices & Communication</h3>
        <p>
          Publish notices, communicate with students, and share announcements.
        </p>
      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  borderRadius: "6px",
  padding: "1rem",
  textAlign: "center",
};

const sectionStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: "6px",
  padding: "1.2rem",
  marginBottom: "1.2rem",
};

export default FacultyDashboardView;
