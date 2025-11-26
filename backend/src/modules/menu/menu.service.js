import * as MenuModel from "./menu.model.js";

export const getAllMenu = () => {
  return MenuModel.getAllMenu();
};

export const getMenuById = (id) => {
  return MenuModel.getMenuById(id);
};

export const createMenu = (data) => {
  // nanti bisa ditambah validasi data
  return MenuModel.createMenu(data);
};

export const updateMenu = (id, data) => {
  return MenuModel.updateMenu(id, data);
};

export const deleteMenu = (id) => {
  return MenuModel.deleteMenu(id);
};
