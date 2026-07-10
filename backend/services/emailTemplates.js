export const verificationEmailTemplate = (name, otp) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px;">
      <h1 style="color:#111;">HUNT STREETWEAR</h1>

      <h2>Email Verification</h2>

      <p>Hello <strong>${name}</strong>,</p>

      <p>Thank you for creating your HUNT account.</p>

      <p>Your verification code is:</p>

      <h1 style="
          background:#111;
          color:white;
          padding:15px;
          display:inline-block;
          letter-spacing:8px;
          border-radius:8px;
      ">
        ${otp}
      </h1>

      <p>This OTP expires in <strong>10 minutes</strong>.</p>

      <hr>

      <small>
        If you didn't create this account, please ignore this email.
      </small>
    </div>
  `;
};
export const resetPasswordTemplate = (name, otp) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px;">
      <h1 style="color:#111;">HUNT STREETWEAR</h1>

      <h2>Password Reset</h2>

      <p>Hello <strong>${name}</strong>,</p>

      <p>We received a request to reset your password.</p>

      <p>Your password reset OTP is:</p>

      <h1 style="
          background:#111;
          color:white;
          padding:15px;
          display:inline-block;
          letter-spacing:8px;
          border-radius:8px;
      ">
        ${otp}
      </h1>

      <p>This OTP is valid for <strong>10 minutes</strong>.</p>

      <p>If you didn't request this password reset, simply ignore this email.</p>

      <hr>

      <small>HUNT Streetwear Security Team</small>
    </div>
  `;
};