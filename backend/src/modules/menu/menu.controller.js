import * as MenuService from "./menu.service.js";

export const getAllMenu = async (req, res) => {
  try {
    const menu = await MenuService.getAllMenu();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const menu = await MenuService.getMenuById(req.params.id);
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createMenu = async (req, res) => {
  try {
    const id = await MenuService.createMenu(req.body);
    res.json({ message: "Menu created", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMenu = async (req, res) => {
  try {
    await MenuService.updateMenu(req.params.id, req.body);
    res.json({ message: "Menu updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    await MenuService.deleteMenu(req.params.id);
    res.json({ message: "Menu deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
