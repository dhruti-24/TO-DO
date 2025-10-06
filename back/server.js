// ===== Import Required Modules =====
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// ===== Load Environment Variables =====
dotenv.config();

// ===== Initialize App =====
const app = express();

// ===== Middleware =====
app.use(cors({
  origin: "*", // Allow all origins (for testing)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ===== Mongoose Schema & Model =====
const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

// ===== API Routes =====

// GET → Fetch all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST → Add new task
app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = new Task({ text: req.body.text });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT → Update (mark complete/incomplete)
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE → Remove a task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== Start Server =====
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
