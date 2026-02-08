import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Sidebar from "./Sidebar";

/* ======================
   Types
   ====================== */

type DashboardData = {
  applicantName: string;
  enrollmentNo: string;
  departmentName: string;
  programName: string;
  semester: string;
  cgpa: number;
  hostelName?: string;
};

/* ======================
   Component
   ====================== */

const StudentDashboardView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError(null);

      /* 1️⃣ Auth */
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!user || authError) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      /* 2️⃣ Student */
      const { data: student, error: studentError } = await supabase
        .from("students")
        .select("student_id, enrollment_id")
        .eq("profile_id", user.id)
        .maybeSingle();

      if (!student || studentError) {
        setError("Student record not found");
        setLoading(false);
        return;
      }

      /* 3️⃣ Enrollment */
      const { data: enrollment, error: enrollError } = await supabase
        .from("enrollments")
        .select("enrollment_no, department_id")
        .eq("enrollment_id", student.enrollment_id)
        .maybeSingle();

      if (!enrollment || enrollError) {
        setError("Enrollment not found");
        setLoading(false);
        return;
      }

      /* 4️⃣ Department */
      const { data: department } = await supabase
        .from("departments")
        .select("department_name")
        .eq("department_id", enrollment.department_id)
        .maybeSingle();

      /* 5️⃣ Application (name + program) */
      const { data: application } = await supabase
        .from("applications")
        .select("applicant_name, program_id")
        .eq("profile_id", user.id)
        .maybeSingle();

      /* 6️⃣ Program */
      const { data: program } = await supabase
        .from("programs")
        .select("program_name")
        .eq("program_id", application?.program_id)
        .maybeSingle();

      /* 7️⃣ Hostel (optional) */
      const { data: hostelAllocation } = await supabase
        .from("hostel_allocations")
        .select(
          `
          hostel:hostel_id (
            hostel_name
          )
        `
        )
        .eq("student_id", student.student_id)
        .maybeSingle();

      setData({
        applicantName: application?.applicant_name ?? "Student",
        enrollmentNo: enrollment.enrollment_no,
        departmentName: department?.department_name ?? "—",
        programName: program?.program_name ?? "—",
        semester: "First Year, Semester 1",
        cgpa: 0.0,
        hostelName: hostelAllocation?.hostel?.[0]?.hostel_name,
      });

      setLoading(false);
    };

    loadDashboard();
  }, []);

  /* ======================
     Guards
     ====================== */

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", color: "red" }}>
        {error}
      </div>
    );
  }

  if (!data) return null;

  /* ======================
     UI
     ====================== */

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: "2rem", background: "#f7faf9" }}>
        {/* Header */}
        <section
          style={{
            background: "linear-gradient(135deg, #dff3ea, #eef7f3)",
            padding: "1.5rem 2rem",
            borderRadius: "12px",
            marginBottom: "2rem",
          }}
        >
          <h2>Welcome back, {data.applicantName}!</h2>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Pill text={data.enrollmentNo} />
            <Pill text={data.programName} />
            <Pill text={data.semester} />
            <Pill text={`CGPA: ${data.cgpa.toFixed(2)}/10`} />
            <Pill
              text={
                data.hostelName
                  ? data.hostelName
                  : "Hostel not allocated"
              }
            />
          </div>
        </section>

        {/* Stats */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <StatCard label="Current Courses" value="4" />
          <StatCard label="Total Credits" value="14" />
          <StatCard label="Attendance" value="82%" />
          <StatCard label="CGPA" value={data.cgpa.toFixed(2)} />
        </section>

        {/* Lower sections */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "2rem",
          }}
        >
          <div>
            <h3>Announcements</h3>
            <Announcement
              title="Biomolecules Lab Schedule Change"
              desc="Lab sessions rescheduled due to new equipment."
              date="6 February 2026"
            />
            <Announcement
              title="Enzymology Guest Lecture"
              desc="Dr. Sharma explains recent enzyme advances."
              date="11 February 2026"
            />
          </div>

          <div>
            <h3>Pending Assignments</h3>
            <Assignment
              title="Protein Folding Report"
              subject="Biomolecules"
              due="13 Feb 2026"
              marks="20 marks"
            />
            <Assignment
              title="Enzyme Inhibitor Study"
              subject="Enzymology"
              due="16 Feb 2026"
              marks="25 marks"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboardView;

/* ======================
   Helpers (same file)
   ====================== */

const Pill = ({ text }: { text: string }) => (
  <span
    style={{
      padding: "0.4rem 0.75rem",
      background: "#fff",
      borderRadius: "999px",
      fontSize: "0.85rem",
      border: "1px solid #e0e0e0",
    }}
  >
    {text}
  </span>
);

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div
    style={{
      background: "#fff",
      padding: "1.25rem",
      borderRadius: "12px",
      border: "1px solid #eaeaea",
    }}
  >
    <p style={{ color: "#666" }}>{label}</p>
    <h3>{value}</h3>
  </div>
);

const Announcement = ({
  title,
  desc,
  date,
}: {
  title: string;
  desc: string;
  date: string;
}) => (
  <div style={{ marginTop: "1rem", borderLeft: "4px solid #2f855a", paddingLeft: "1rem" }}>
    <strong>{title}</strong>
    <p>{desc}</p>
    <small>{date}</small>
  </div>
);

const Assignment = ({
  title,
  subject,
  due,
  marks,
}: {
  title: string;
  subject: string;
  due: string;
  marks: string;
}) => (
  <div
    style={{
      background: "#fff",
      border: "1px solid #eee",
      padding: "1rem",
      borderRadius: "8px",
      marginTop: "1rem",
    }}
  >
    <strong>{title}</strong>
    <p>{subject}</p>
    <small>Due: {due}</small>
    <div style={{ color: "#d9480f" }}>{marks}</div>
  </div>
);
