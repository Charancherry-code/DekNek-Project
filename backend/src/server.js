const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

connectDB();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://dek-nek-project.vercel.app",
  "http://localhost:5173"
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "User Dashboard API is running" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "ok", 
    message: "Server is healthy",
    timestamp: new Date().toISOString()
  });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
