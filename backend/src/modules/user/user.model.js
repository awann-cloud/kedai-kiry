import db from "../../config/db.js";

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, username, role FROM users`;
    db.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, username, role FROM users WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM users WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows);
    });
  });
};

export const updateRole = (id, role) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET role = ? WHERE id = ?`;
    db.query(sql, [role, id], (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows);
    });
  });
};
