import * as ReceiptService from "./receipt.service.js";

export const createReceipt = async (req, res) => {
  try {
    const result = await ReceiptService.createReceipt(req.body);
    res.json({ message: "Receipt created", receiptId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReceipts = async (req, res) => {
  try {
    const data = await ReceiptService.getReceipts();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
