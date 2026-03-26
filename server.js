const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const ngoRoutes = require("./routes/ngoRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");

// ✅ NEW ADD (Complaint Routes)
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// 🔌 MongoDB Connection with better error handling
console.log("🔌 Attempting to connect to MongoDB...");
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => {
  console.error("❌ MongoDB Connection Error:", err.message);
  console.error("Full error:", err);
});

// 📊 Health Check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date()
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ngo", ngoRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/volunteers", volunteerRoutes);

// ✅ NEW ADD (Complaint API)
app.use("/api/complaint", complaintRoutes);

app.listen(process.env.PORT || 5000, () => 
  console.log("🚀 Server running on port 5000")
);