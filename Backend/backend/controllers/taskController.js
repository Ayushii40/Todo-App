const Task = require("../models/Task");

// Get tasks of logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

//search the tasks
exports.searchTasks = async (req, res) => {
  try {
    const query = req.query.q || "";

    const tasks = await Task.find({
      userId: req.user.id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error searching tasks" });
  }
};


// Create new task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      userId: req.user.id,
      title,
      description,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

// Update title + description
exports.updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

// Toggle completed status
exports.toggleTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error toggling task" });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
