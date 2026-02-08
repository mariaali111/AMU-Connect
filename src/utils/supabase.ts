import { supabase } from "./supabaseClient";

// DATABASE TYPES (used locally for clarity)

export type AdmissionStatus = "accepted" | "rejected" | "waitlisted";
export type PaymentStatus = "pending" | "paid" | "failed";
export type EnrollmentStatus = "active" | "suspended" | "graduated";

// ADMISSION & ENROLLMENT FLOW

export async function verifyApplication(entranceRollNo: string) {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select(`
        *,
        programs (
          program_id,
          program_name,
          duration_years,
          departments (
            department_id,
            department_name
          )
        )
      `)
      .eq("entrance_roll_no", entranceRollNo)
      .single();

    if (error) throw error;
    return { success: true, application: data };
  } catch (error: any) {
    return { success: false, error: error.message || "Application not found" };
  }
}

export async function getFeeStructure(programId: number, academicYear: string) {
  try {
    const { data, error } = await supabase
      .from("fee_structures")
      .select("*")
      .eq("program_id", programId)
      .eq("academic_year", academicYear)
      .single();

    if (error) throw error;
    return { success: true, feeStructure: data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createPayment(
  profileId: string,
  feeStructureId: number,
  transactionReference: string
) {
  try {
    const { data, error } = await supabase
      .from("payments")
      .insert({
        profile_id: profileId,
        fee_structure_id: feeStructureId,
        payment_status: "paid",
        transaction_reference: transactionReference,
        paid_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, payment: data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function checkPaymentStatus(
  profileId: string,
  feeStructureId: number
) {
  try {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("profile_id", profileId)
      .eq("fee_structure_id", feeStructureId)
      .eq("payment_status", "paid")
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return { success: true, payment: data || null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function generateEnrollment(
  profileId: string,
  applicationId: number,
  programId: number,
  departmentId: number
) {
  try {
    const { data: existing } = await supabase
      .from("enrollments")
      .select("*")
      .eq("profile_id", profileId)
      .maybeSingle();

    if (existing) {
      return { success: true, enrollment: existing, alreadyExists: true };
    }

    const year = new Date().getFullYear().toString().slice(-2);
    const enrollmentNo = `AMU${year}${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    const { data, error } = await supabase
      .from("enrollments")
      .insert({
        enrollment_no: enrollmentNo,
        application_id: applicationId,
        profile_id: profileId,
        program_id: programId,
        department_id: departmentId,
        enrollment_date: new Date().toISOString().split("T")[0],
        status: "active",
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, enrollment: data, alreadyExists: false };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function verifyEnrollment(profileId: string) {
  try {
    const { data, error } = await supabase
      .from("enrollments")
      .select(`
        *,
        programs (
          program_name,
          duration_years
        )
      `)
      .eq("profile_id", profileId)
      .eq("status", "active")
      .maybeSingle();

    if (error && error.code !== "PGRST116") throw error;
    return { success: true, enrollment: data, exists: !!data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createStudentRecord(
  profileId: string,
  enrollmentId: number,
  departmentId: number,
  hostelRequired = false
) {
  try {
    const { data: existing } = await supabase
      .from("students")
      .select("*")
      .eq("profile_id", profileId)
      .maybeSingle();

    if (existing) {
      return { success: true, student: existing, alreadyExists: true };
    }

    const { data, error } = await supabase
      .from("students")
      .insert({
        profile_id: profileId,
        enrollment_id: enrollmentId,
        department_id: departmentId,
        hostel_required: hostelRequired,
        status: "enrolled",
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, student: data, alreadyExists: false };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// HOSTEL

export async function allocateHostel(
  studentId: number,
  departmentId: number
) {
  try {
    const { data: existing } = await supabase
      .from("hostel_allocations")
      .select("*")
      .eq("student_id", studentId)
      .maybeSingle();

    if (existing) {
      return { success: true, allocation: existing, alreadyExists: true };
    }

    const { data: mapping } = await supabase
      .from("department_hostels")
      .select("hostel_id")
      .eq("department_id", departmentId)
      .limit(1)
      .maybeSingle();

    if (!mapping) throw new Error("No hostel available");

    const { data, error } = await supabase
      .from("hostel_allocations")
      .insert({
        student_id: studentId,
        hostel_id: mapping.hostel_id,
        start_date: new Date().toISOString().split("T")[0],
      })
      .select(`
        *,
        hostels (
          hostel_name,
          location
        )
      `)
      .single();

    if (error) throw error;
    return { success: true, allocation: data, alreadyExists: false };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// DASHBOARD DATA

export async function getStudentProfile(profileId: string) {
  try {
    const { data, error } = await supabase
      .from("students")
      .select(`
        *,
        enrollments (
          enrollment_no,
          enrollment_date,
          status,
          programs (
            program_name,
            departments (
              department_name
            )
          )
        ),
        hostel_allocations (
          start_date,
          hostels (
            hostel_name,
            location
          )
        )
      `)
      .eq("profile_id", profileId)
      .single();

    if (error) throw error;
    return { success: true, profile: data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// AUDIT

export async function createAuditLog(profileId: string, action: string) {
  try {
    await supabase.from("audit_logs").insert({
      profile_id: profileId,
      action,
      timestamp: new Date().toISOString(),
    });
  } catch {
    // silent fail – audit logs should never block UX
  }
}
