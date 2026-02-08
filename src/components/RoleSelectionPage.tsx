import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: "600px", margin: "3rem auto", textAlign: "center" }}>
      <h2>Select Your Role</h2>

      {/* Scope disclaimer for judges */}
      <div
        style={{
          background: "#fff3cd",
          border: "1px solid #ffeeba",
          padding: "1rem",
          marginBottom: "2rem",
          borderRadius: "6px",
          textAlign: "left",
        }}
      >
        <strong>Note:</strong>
        <p style={{ marginTop: "0.5rem" }}>
          In the current version, the <strong>Student</strong> flow is fully
          integrated with the backend. The <strong>Faculty</strong> and{" "}
          <strong>Admin</strong> dashboards are UI-only demonstrations. Backend
          integration for these roles is planned for future upgrades.
        </p>
      </div>

      {/* Role buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <button
          onClick={() => navigate("/admission/verify")}
          style={{ padding: "1rem", fontSize: "1rem" }}
        >
          🎓 Student
        </button>

        <button
          onClick={() => navigate("/faculty/demo")}
          style={{ padding: "1rem", fontSize: "1rem" }}
        >
          👩‍🏫 Faculty (UI Demo)
        </button>

        <button
          onClick={() => navigate("/admin/demo")}
          style={{ padding: "1rem", fontSize: "1rem" }}
        >
          🛠 Admin (UI Demo)
        </button>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
