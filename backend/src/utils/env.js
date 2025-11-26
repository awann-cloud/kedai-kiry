import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Ambil lokasi file env.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env dari backend/.env
dotenv.config({
  path: path.resolve(__dirname, "../../.env")
});

console.log("ENV loaded:", {
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME
});

export default dotenv;
