const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} = require("../controllers/taskController");

router.get("/", auth, getTasks);
router.post("/create", auth, createTask);
router.put("/update/:id", auth, updateTask);
router.put("/toggle/:id", auth, toggleTaskStatus);
router.delete("/delete/:id", auth, deleteTask);

module.exports = router;
