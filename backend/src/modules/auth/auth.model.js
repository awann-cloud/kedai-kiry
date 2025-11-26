import db from "../../config/db.js";

export const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE username = ?`;

    db.query(sql, [username], (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

export const createUser = (username, password, role) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;

    db.query(sql, [username, password, role], (err, result) => {
      if (err) reject(err);
      else resolve(result.insertId);
    });
  });
};
