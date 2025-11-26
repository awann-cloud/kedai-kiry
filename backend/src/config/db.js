// Pastikan env sudah diload
import "../utils/env.js";

import mysql from "mysql2";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.getConnection((err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("Database connected");
  }
});

export default db;
