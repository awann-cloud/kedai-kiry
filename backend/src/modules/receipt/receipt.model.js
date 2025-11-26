import db from "../../config/db.js";

export const insertReceipt = ({ order_number, customer_name, total_price }) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO receipt (order_number, customer_name, total_price, status)
      VALUES (?, ?, ?, 'waiting')
    `;
    db.query(query, [ order_number, customer_name, total_price ], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export const getReceipts = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM receipt ORDER BY created_at DESC`;
    db.query(query, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
