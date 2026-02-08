import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type AdmissionState = {
  status: "accepted" | "rejected";
  entranceRollNo: string;
};

const StudentAdmissionResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as AdmissionState | null;

  /**
   * SAFETY:
   * If accessed directly without verification, block access.
   */
  if (!state) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h3>Invalid access</h3>
        <p>Please verify your application first.</p>
        <button onClick={() => navigate("/admission/verify")}>
          Go to Verification
        </button>
      </div>
    );
  }

  const { status, entranceRollNo } = state;

  return (
    <div style={{ maxWidth: "500px", margin: "3rem auto", textAlign: "center" }}>
      {status === "accepted" ? (
        <>
          <h2>🎉 Admission Confirmed</h2>
          <p>
            Your application with entrance roll number{" "}
            <strong>{entranceRollNo}</strong> has been accepted.
          </p>
          <p>Please log in using the credentials provided to you.</p>

          <button
            onClick={() => navigate("/login")}
            style={{ marginTop: "1.5rem", padding: "0.6rem 1.2rem" }}
          >
            Go to Login
          </button>
        </>
      ) : (
        <>
          <h2>Application Not Accepted</h2>
          <p>
            We regret to inform you that the application with entrance roll
            number <strong>{entranceRollNo}</strong> was not accepted.
          </p>

          <button
            onClick={() => navigate("/")}
            style={{ marginTop: "1.5rem", padding: "0.6rem 1.2rem" }}
          >
            Return Home
          </button>
        </>
      )}
    </div>
  );
};

export default StudentAdmissionResult;
