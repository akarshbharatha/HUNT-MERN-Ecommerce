import User from "../models/User.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

import { generateOTP } from "../utils/otpGenerator.js";
import { sendEmail } from "../services/emailService.js";
// import { verificationEmailTemplate } from "../services/emailTemplates.js";
import {
  verificationEmailTemplate,
  resetPasswordTemplate,
} from "../services/emailTemplates.js";
/* ===========================
   REGISTER USER
=========================== */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });

if (existingUser) {

  // Already verified → don't allow registration again
  if (existingUser.isVerified) {
    return res.status(400).json({
      success: false,
      message: "User already exists. Please login.",
    });
  }

  // Not verified → generate a fresh OTP
  const otp = generateOTP();

  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  existingUser.name = name;
  existingUser.password = await bcrypt.hash(password, 10);
  existingUser.emailOTP = otp;
  existingUser.otpExpiry = otpExpiry;

  await existingUser.save();

  await sendEmail({
    to: email,
    subject: "Verify your HUNT Account",
    html: verificationEmailTemplate(name, otp),
  });

  return res.status(200).json({
    success: true,
    message:
      "Your account already exists but is not verified. A new OTP has been sent to your email.",
    email,
  });
}

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();

    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      emailOTP: otp,
      otpExpiry,
    });

    await sendEmail({
      to: email,
      subject: "Verify your HUNT Account",
      html: verificationEmailTemplate(name, otp),
    });

    res.status(201).json({
      success: true,
      message:
        "Registration successful. Please verify your email using the OTP sent.",
      email: user.email,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   VERIFY EMAIL
=========================== */
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified.",
      });
    }

    if (user.emailOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    user.isVerified = true;
    user.emailOTP = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/* ===========================
   RESEND OTP
=========================== */
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified.",
      });
    }

    // Generate new OTP
    const otp = generateOTP();

    // Expire after 10 minutes
    user.emailOTP = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    // Send email
    await sendEmail({
      to: user.email,
      subject: "Your New HUNT Verification OTP",
      html: verificationEmailTemplate(user.name, otp),
    });

    res.status(200).json({
      success: true,
      message: "A new OTP has been sent to your email.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   FORGOT PASSWORD
=========================== */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const otp = generateOTP();

    user.resetOTP = otp;
    user.resetOTPExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Reset Your HUNT Password",
      html: resetPasswordTemplate(user.name, otp),
    });

    res.status(200).json({
      success: true,
      message: "Password reset OTP sent successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/* ===========================
   RESET PASSWORD
=========================== */
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and new password are required.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.resetOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (new Date() > user.resetOTPExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOTP = null;
    user.resetOTPExpiry = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/* ===========================
   LOGIN USER
=========================== */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // IMPORTANT
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   GET PROFILE
=========================== */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   TEST EMAIL
=========================== */
export const testEmail = async (req, res) => {
  try {
    const info = await sendEmail({
      to: "bharathaakarsh@gmail.com",
      subject: "HUNT Email Test",
      html: `
        <h1>Welcome to HUNT 🚀</h1>
        <p>Email service is working successfully.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully.",
      info,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};