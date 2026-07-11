import api from "../api/axios";

// Register
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

// Get Logged-in User
export const getProfile = async (token) => {
  const response = await api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Verify Email
export const verifyEmail = async (data) => {
  const response = await api.post("/auth/verify-email", data);
  return response.data;
};

// Resend OTP
export const resendOTP = async (email) => {
  const response = await api.post("/auth/resend-otp", {
    email,
  });

  return response.data;
};
// Forgot Password
export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

// Reset Password
export const resetPassword = async (data) => {
  const response = await api.post(
    "/auth/reset-password",
    data
  );

  return response.data;
};