import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {

    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      "huntsecretkey"
    );

    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;