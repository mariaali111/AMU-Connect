import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

type FeeStructure = {
  fee_structure_id: number;
  amount: number;
  academic_year: string;
};

const StudentFeePayment: React.FC = () => {
  const navigate = useNavigate();

  const [fee, setFee] = useState<FeeStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFee = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      // get student's program via application
      const { data: application, error: appError } = await supabase
        .from("applications")
        .select("program_id")
        .eq("profile_id", user.id)
        .single();

      if (appError || !application) {
        setError("Application not found.");
        setLoading(false);
        return;
      }

      const { data: feeData, error: feeError } = await supabase
        .from("fee_structures")
        .select("fee_structure_id, amount, academic_year")
        .eq("program_id", application.program_id)
        .order("academic_year", { ascending: false })
        .limit(1)
        .single();

      if (feeError || !feeData) {
        setError("Fee structure not configured.");
        setLoading(false);
        return;
      }

      setFee(feeData);
      setLoading(false);
    };

    fetchFee();
  }, []);

  const handleConfirmPayment = async () => {
    if (!fee) return;

    setLoading(true);
    setError(null);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    // 🔑 THIS is what was missing / wrong before
    const transactionReference = `AMU-TXN-${Date.now()}`;

    const { error: paymentError } = await supabase.from("payments").insert({
      profile_id: user.id,
      fee_structure_id: fee.fee_structure_id,
      payment_status: "paid",
      transaction_reference: transactionReference, // ✅ correct column
      paid_at: new Date().toISOString(),
    });

    if (paymentError) {
      setError("Failed to record payment.");
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/enrollment/confirmed");
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "3rem" }}>Loading…</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem", color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "500px", margin: "3rem auto" }}>
      <h2>Fee Payment</h2>
      <p>Please complete the payment of your admission fees to proceed.</p>

      <div
        style={{
          padding: "1rem",
          border: "1px solid #ccc",
          marginBottom: "1.5rem",
        }}
      >
        <p>
          <strong>Total Fees:</strong> ₹{fee?.amount}
        </p>
        <p>
          <strong>Academic Year:</strong> {fee?.academic_year}
        </p>
      </div>

      <button
        onClick={handleConfirmPayment}
        disabled={loading}
        style={{ width: "100%", padding: "0.6rem" }}
      >
        {loading ? "Processing…" : "Confirm Payment"}
      </button>
    </div>
  );
};

export default StudentFeePayment;
