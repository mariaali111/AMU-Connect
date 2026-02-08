import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

type EnrollmentData = {
  enrollment_no: string;
  enrollment_date: string;
};

const EnrollmentConfirmation: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollment, setEnrollment] = useState<EnrollmentData | null>(null);

  useEffect(() => {
    const finalizeEnrollment = async () => {
      /* 1️⃣ Auth user */
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      const profileId = user.id;

      /* 2️⃣ Get application */
      const { data: application, error: appError } = await supabase
        .from("applications")
        .select("program_id")
        .eq("profile_id", profileId)
        .single();

      if (appError || !application) {
        setError("Application record not found.");
        setLoading(false);
        return;
      }

      /* 3️⃣ Get department from program */
      const { data: program, error: programError } = await supabase
        .from("programs")
        .select("department_id")
        .eq("program_id", application.program_id)
        .single();

      if (programError || !program) {
        setError("Program configuration error.");
        setLoading(false);
        return;
      }

      /* 4️⃣ Create enrollment (trigger generates enrollment_no) */
      const { data: enrollmentRow, error: enrollError } = await supabase
        .from("enrollments")
        .insert({
          profile_id: profileId,
          program_id: application.program_id,
          department_id: program.department_id,
          enrollment_date: new Date(),
          status: "active",
        })
        .select("enrollment_id, enrollment_no, enrollment_date")
        .single();

      if (enrollError || !enrollmentRow) {
        setError("Enrollment failed.");
        setLoading(false);
        return;
      }

      /* 5️⃣ Create student record */
      const { error: studentError } = await supabase.from("students").insert({
        profile_id: profileId,
        enrollment_id: enrollmentRow.enrollment_id,
        department_id: program.department_id,
        hostel_required: true,
        status: "enrolled",
      });

      if (studentError) {
        console.error(studentError);
        setError("Failed to finalize student record.");
        setLoading(false);
        return;
      }

      /* 6️⃣ Success */
      setEnrollment({
        enrollment_no: enrollmentRow.enrollment_no,
        enrollment_date: enrollmentRow.enrollment_date,
      });

      setLoading(false);
    };

    finalizeEnrollment();
  }, [navigate]);

  /* ---------- UI ---------- */

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <h3>Finalizing enrollment…</h3>
        <p>Please wait.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "3rem",
          color: "red",
        }}
      >
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "500px", margin: "3rem auto", textAlign: "center" }}>
      <h2>🎓 Enrollment Successful</h2>
      <p>Your enrollment has been completed successfully.</p>

      <div
        style={{
          marginTop: "1.5rem",
          padding: "1.5rem",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      >
        <p>
          <strong>Enrollment Number:</strong>
        </p>
        <h3 style={{ margin: "0.5rem 0" }}>
          {enrollment?.enrollment_no}
        </h3>
        <p>
          Enrollment Date:{" "}
          {new Date(enrollment!.enrollment_date).toLocaleDateString()}
        </p>
      </div>

      <button
        onClick={() => navigate("/hostel-allocation")}
        style={{
          marginTop: "2rem",
          padding: "0.7rem 1.5rem",
        }}
      >
        Proceed to Hostel Allocation
      </button>
    </div>
  );
};

export default EnrollmentConfirmation;
