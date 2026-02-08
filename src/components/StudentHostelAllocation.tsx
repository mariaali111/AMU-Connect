// StudentHostelAllocation.tsx
// Schema-correct, lifecycle-safe hostel allocation

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

type AllocationView = {
  hostel_name: string;
  location: string;
};

const StudentHostelAllocation: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allocation, setAllocation] = useState<AllocationView | null>(null);

  useEffect(() => {
    const runAllocationFlow = async () => {
      /* 1️⃣ AUTH */
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      const profileId = user.id;

      /* 2️⃣ GET ENROLLMENT */
      const { data: enrollment, error: enrollmentError } = await supabase
        .from("enrollments")
        .select("enrollment_id, department_id")
        .eq("profile_id", profileId)
        .single();

      if (enrollmentError || !enrollment) {
        setError("Enrollment not found.");
        setLoading(false);
        return;
      }

      /* 3️⃣ GET STUDENT (CRITICAL FIX) */
      const { data: student, error: studentError } = await supabase
        .from("students")
        .select("student_id")
        .eq("enrollment_id", enrollment.enrollment_id)
        .single();

      if (studentError || !student) {
        setError("Student record not found.");
        setLoading(false);
        return;
      }

      const studentId = student.student_id;

      /* 4️⃣ CHECK EXISTING HOSTEL ALLOCATION */
      const { data: existingAllocation } = await supabase
        .from("hostel_allocations")
        .select(
          `
          allocation_id,
          hostels (
            hostel_name,
            location
          )
        `
        )
        .eq("student_id", studentId)
        .maybeSingle();

      if (existingAllocation) {
        setAllocation({
          hostel_name: existingAllocation.hostels.hostel_name,
          location: existingAllocation.hostels.location,
        });
        setLoading(false);
        return;
      }

      /* 5️⃣ GET STUDENT GENDER (FROM APPLICATIONS) */
      const { data: application, error: applicationError } = await supabase
        .from("applications")
        .select("gender")
        .eq("profile_id", profileId)
        .single();

      if (applicationError || !application?.gender) {
        setError("Student gender not found.");
        setLoading(false);
        return;
      }

      /* 6️⃣ FIND SUITABLE HOSTEL (DEPARTMENT + GENDER) */
      const { data: hostelLink, error: hostelError } = await supabase
        .from("department_hostels")
        .select(
          `
          hostel_id,
          hostels!inner (
            hostel_name,
            location,
            gender
          )
        `
        )
        .eq("department_id", enrollment.department_id)
        .eq("hostels.gender", application.gender)
        .limit(1)
        .single();

      if (hostelError || !hostelLink) {
        setError("No suitable hostel available.");
        setLoading(false);
        return;
      }

      /* 7️⃣ INSERT HOSTEL ALLOCATION */
      const { error: insertError } = await supabase
        .from("hostel_allocations")
        .insert({
          student_id: studentId,
          hostel_id: hostelLink.hostel_id,
        });

      if (insertError) {
        setError("Failed to allocate hostel.");
        setLoading(false);
        return;
      }

      /* 8️⃣ SUCCESS */
      setAllocation({
        hostel_name: hostelLink.hostels.hostel_name,
        location: hostelLink.hostels.location,
      });

      setLoading(false);
    };

    runAllocationFlow();
  }, [navigate]);

  /* UI STATES */

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <h3>Allocating Hostel...</h3>
        <p>Please wait.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem", color: "red" }}>
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "500px", margin: "3rem auto", textAlign: "center" }}>
      <h2>🏠 Hostel Allocated Successfully</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "1.5rem",
          marginTop: "1.5rem",
          borderRadius: "6px",
        }}
      >
        <p>
          <strong>Hostel Name:</strong> {allocation?.hostel_name}
        </p>
        <p>
          <strong>Location:</strong> {allocation?.location}
        </p>
      </div>

      <button
        style={{ marginTop: "2rem", padding: "0.6rem 1.2rem" }}
        onClick={() => navigate("/student/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default StudentHostelAllocation;
