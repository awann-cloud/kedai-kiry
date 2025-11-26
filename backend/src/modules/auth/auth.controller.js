import * as AuthService from "./auth.service.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await AuthService.login(username, password);

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const result = await AuthService.register(username, password, role);

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
