import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

const StudentAdmissionVerification: React.FC = () => {
  const [entranceRollNo, setEntranceRollNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!entranceRollNo.trim()) {
      setError("Please enter your entrance roll number.");
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: dbError } = await supabase
      .from("applications")
      .select("entrance_roll_no, admission_status")
      .eq("entrance_roll_no", entranceRollNo)
      .single();

    setLoading(false);

    if (dbError || !data) {
      setError("Invalid entrance roll number. Please check and try again.");
      return;
    }

    if (data.admission_status === "accepted") {
      navigate("/admission/result", {
        state: {
          status: "accepted",
          entranceRollNo,
        },
      });
    } else if (data.admission_status === "rejected") {
      navigate("/admission/result", {
        state: {
          status: "rejected",
          entranceRollNo,
        },
      });
    } else {
      setError(
        "Your application is currently under review. Please check again later."
      );
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "3rem auto" }}>
      <h2>Admission Verification</h2>

      <input
        type="text"
        placeholder="Enter Entrance Roll Number"
        value={entranceRollNo}
        onChange={(e) => setEntranceRollNo(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <button
        onClick={handleVerify}
        disabled={loading}
        style={{ width: "100%", padding: "0.6rem" }}
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
};

export default StudentAdmissionVerification;
