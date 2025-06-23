// lib/auth.js
import jwt from "jsonwebtoken";

export function generateToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
