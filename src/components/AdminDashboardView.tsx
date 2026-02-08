// ADMIN DASHBOARD – UI-ONLY DEMO
// Backend integration is intentionally omitted in the current version.
// This dashboard exists to demonstrate planned admin capabilities.

import React from "react";

const AdminDashboardView: React.FC = () => {
  return (
    <div style={{ maxWidth: "900px", margin: "3rem auto" }}>
      {/* Demo disclaimer */}
      <div
        style={{
          background: "#e3f2fd",
          border: "1px solid #90caf9",
          padding: "1rem",
          borderRadius: "6px",
          marginBottom: "2rem",
        }}
      >
        <strong>Admin Dashboard (UI Demo)</strong>
        <p style={{ marginTop: "0.5rem" }}>
          This dashboard demonstrates the planned administrative interface.
          Backend integration and live data handling will be implemented in
          future upgrades.
        </p>
      </div>

      <h2>Admin Overview</h2>

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
          <h3>Total Students</h3>
          <p>—</p>
        </div>
        <div style={cardStyle}>
          <h3>Admissions Processed</h3>
          <p>—</p>
        </div>
        <div style={cardStyle}>
          <h3>Hostels Managed</h3>
          <p>—</p>
        </div>
        <div style={cardStyle}>
          <h3>Pending Actions</h3>
          <p>—</p>
        </div>
      </div>

      {/* Sections */}
      <div style={sectionStyle}>
        <h3>Admissions Management</h3>
        <p>
          View applications, update admission statuses, and manage enrollment
          workflows.
        </p>
      </div>

      <div style={sectionStyle}>
        <h3>Fee & Finance Management</h3>
        <p>
          Monitor fee payments, generate reports, and manage financial records.
        </p>
      </div>

      <div style={sectionStyle}>
        <h3>Hostel Administration</h3>
        <p>
          Allocate hostels, manage rooms, and oversee accommodation logistics.
        </p>
      </div>

      <div style={sectionStyle}>
        <h3>User & System Controls</h3>
        <p>
          Manage system settings, user permissions, and platform-wide
          configurations.
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

export default AdminDashboardView;
