import * as ReportService from "./report.service.js";

export const getDailyIncome = async (req, res) => {
  try {
    const data = await ReportService.getDailyIncome();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTopMenu = async (req, res) => {
  try {
    const data = await ReportService.getTopMenu();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
