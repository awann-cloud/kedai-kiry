import * as ReceiptModel from "./receipt.model.js";

export const createReceipt = (data) => {
  return ReceiptModel.insertReceipt(data);
};

export const getReceipts = () => {
  return ReceiptModel.getReceipts();
};
