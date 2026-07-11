import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  verifyEmail,
  resendOTP,
} from "../services/authService";

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(
    location.state?.email || ""
  );

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await verifyEmail({
        email,
        otp,
      });

      setSuccess(data.message || "Email verified successfully.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setResending(true);
    setError("");
    setSuccess("");

    try {
      const data = await resendOTP(email);

      setSuccess(
        data.message || "OTP sent successfully."
      );

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to resend OTP."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8">

        <h1 className="text-3xl font-black text-center uppercase">
          Verify Email
        </h1>

        <p className="text-center text-neutral-500 mt-2">
          Enter the OTP sent to your email
        </p>

        {error && (
          <p className="text-red-600 text-center mt-4">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-600 text-center mt-4">
            {success}
          </p>
        )}

        <form
          onSubmit={handleVerify}
          className="mt-8 space-y-5"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            required
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-neutral-800 transition"
          >
            {loading
              ? "Verifying..."
              : "Verify Email"}
          </button>

        </form>

        <button
          onClick={handleResendOTP}
          disabled={resending}
          className="mt-5 w-full border border-black py-3 rounded-lg hover:bg-neutral-100 transition"
        >
          {resending
            ? "Sending..."
            : "Resend OTP"}
        </button>

        <p className="text-center mt-6 text-sm text-neutral-600">
          Already verified?{" "}
          <Link
            to="/login"
            className="font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default VerifyEmail;