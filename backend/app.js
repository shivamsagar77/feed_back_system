const express = require("express");
const cors = require("cors");
const app = express();
const feedbackRoutes = require("./routes/feedbackRoutes");
const { pool } = require("./config/db"); // ✅ Import DB pool

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// Routes
app.use("/api/feedback", feedbackRoutes); // Mount feedback routes

// Root route (should be before listen for consistency)
app.get("/", (req, res) => {
  res.send("Welcome to the Feedback API");
});

// ✅ Set correct PORT (5000, not 500)
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
