import express from "express";
import cors from "cors";

// Routes Import
import menuRoutes from "../modules/menu/menu.routes.js";
import reportRoutes from "../modules/report/report.routes.js";
import userRoutes from "../modules/user/user.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
// receipt nanti aktif kalau sudah dibuat
// import receiptRoutes from "../modules/receipt/receipt.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Backend Kedai Kiry is running...");
});

// API Routes
app.use("/api/menu", menuRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/receipt", receiptRoutes);

export default app;
