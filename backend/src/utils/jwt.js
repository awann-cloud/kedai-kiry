import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

// Generate token
export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
};

// Verify token
export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
