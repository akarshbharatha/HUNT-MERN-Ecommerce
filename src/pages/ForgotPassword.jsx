import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { forgotPassword } from "../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await forgotPassword(email);

      setSuccess(data.message);

      setTimeout(() => {
        navigate("/reset-password", {
          state: {
            email,
          },
        });
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8">

        <h1 className="text-3xl font-black text-center uppercase">
          Forgot Password
        </h1>

        <p className="text-center text-neutral-500 mt-2">
          Enter your registered email
        </p>

        {error && (
          <p className="text-center text-red-600 mt-4">
            {error}
          </p>
        )}

        {success && (
          <p className="text-center text-green-600 mt-4">
            {success}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {loading
              ? "Sending OTP..."
              : "Send OTP"}
          </button>

        </form>

        <p className="text-center mt-6 text-sm">

          <Link
            to="/login"
            className="hover:underline"
          >
            Back to Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;