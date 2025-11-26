import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as AuthModel from "./auth.model.js";

export const login = async (username, password) => {
  const user = await AuthModel.getUserByUsername(username);
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user };
};

export const register = async (username, password, role = "user") => {
  const hashed = await bcrypt.hash(password, 10);
  const id = await AuthModel.createUser(username, hashed, role);

  return { id, username, role };
};
