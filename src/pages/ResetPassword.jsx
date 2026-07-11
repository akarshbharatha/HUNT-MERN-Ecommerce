import { useState } from "react";
import {
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";

import { resetPassword } from "../services/authService";

function ResetPassword() {

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(
    location.state?.email || ""
  );

  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      return setError(
        "Passwords do not match."
      );
    }

    setLoading(true);

    try {

      const data =
        await resetPassword({
          email,
          otp,
          newPassword,
        });

      setSuccess(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Password reset failed."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-[85vh] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8">

        <h1 className="text-3xl font-black text-center uppercase">
          Reset Password
        </h1>

        <p className="text-center text-neutral-500 mt-2">
          Enter OTP and your new password
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
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)
            }
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e)=>
              setOtp(e.target.value)
            }
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e)=>
              setNewPassword(e.target.value)
            }
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>
              setConfirmPassword(e.target.value)
            }
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
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

export default ResetPassword;