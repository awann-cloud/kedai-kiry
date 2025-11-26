import db from "../../config/db.js";

export const getAllMenu = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        ID_Menu,
        Nama_Menu,
        Kategori,
        Harga,
        WaktuCepat,
        WaktuNormal,
        WaktuLama
      FROM menu
    `;

    db.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export const getMenuById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM menu WHERE ID_Menu = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

export const createMenu = (menuData) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO menu 
      (ID_Menu, Nama_Menu, Kategori, Harga, WaktuCepat, WaktuNormal, WaktuLama)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      menuData.ID_Menu,
      menuData.Nama_Menu,
      menuData.Kategori,
      menuData.Harga,
      menuData.WaktuCepat,
      menuData.WaktuNormal,
      menuData.WaktuLama
    ];

    db.query(sql, values, (err, result) => {
      if (err) reject(err);
      else resolve(result.insertId);
    });
  });
};

export const updateMenu = (id, data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE menu SET 
        Nama_Menu = ?, 
        Kategori = ?, 
        Harga = ?,
        WaktuCepat = ?, 
        WaktuNormal = ?, 
        WaktuLama = ?
      WHERE ID_Menu = ?
    `;

    db.query(sql, [
      data.Nama_Menu,
      data.Kategori,
      data.Harga,
      data.WaktuCepat,
      data.WaktuNormal,
      data.WaktuLama,
      id
    ], (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows);
    });
  });
};

export const deleteMenu = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM menu WHERE ID_Menu = ?`;

    db.query(sql, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows);
    });
  });
};
