import db from "../../config/db.js";

export const getDailyIncome = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        DATE(created_at) as tanggal,
        SUM(total_harga) as total_pendapatan
      FROM receipt
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) DESC
    `;

    db.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export const getTopMenu = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        m.Nama_Menu,
        COUNT(ri.ID_Menu) as jumlah_dipesan
      FROM receipt_items ri
      JOIN menu m ON m.ID_Menu = ri.ID_Menu
      GROUP BY ri.ID_Menu
      ORDER BY jumlah_dipesan DESC
      LIMIT 10
    `;

    db.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
