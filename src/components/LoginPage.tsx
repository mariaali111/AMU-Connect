// Student Login – Lifecycle-aware (Schema Correct)
// No students-table access here.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    /* 1️⃣ Authenticate */
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError || !authData.user) {
      setLoading(false);
      setError("Invalid email or password.");
      return;
    }

    const profileId = authData.user.id;

    /* 2️⃣ Fetch application */
    const { data: application, error: appError } = await supabase
      .from("applications")
      .select("admission_status, program_id")
      .eq("profile_id", profileId)
      .single();

    if (appError || !application) {
      setLoading(false);
      setError("No admission application found.");
      return;
    }

    if (application.admission_status === "rejected") {
      setLoading(false);
      setError("Your application was not accepted.");
      return;
    }

    if (application.admission_status !== "accepted") {
      setLoading(false);
      setError("Your application is still under review.");
      return;
    }

    /* 3️⃣ Check enrollment */
    const { data: enrollment } = await supabase
      .from("enrollments")
      .select("enrollment_id")
      .eq("profile_id", profileId)
      .maybeSingle();

    setLoading(false);

    if (!enrollment) {
      navigate("/fees");
      return;
    }

    /* Enrollment exists → show confirmation */
    navigate("/enrollment/confirmed");


    /* 4️⃣ Check hostel allocation */
    const { data: hostelAllocation } = await supabase
      .from("hostel_allocations")
      .select("allocation_id")
      .eq("student_id", enrollment.enrollment_id)
      .maybeSingle();

    setLoading(false);

    if (!hostelAllocation) {
      navigate("/hostel-allocation");
      return;
    }

    /* 5️⃣ Fully onboarded */
    navigate("/student/dashboard");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "3rem auto" }}>
      <h2>Student Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <button
        onClick={handleLogin}
        disabled={loading}
        style={{ width: "100%", padding: "0.6rem" }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default LoginPage;
