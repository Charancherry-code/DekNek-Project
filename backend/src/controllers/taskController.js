const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error while fetching tasks" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description: description || "",
      userId: req.user.id,
    });

    return res.status(201).json(task);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error while creating task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (title !== undefined) {
      task.title = title;
    }

    if (description !== undefined) {
      task.description = description;
    }

    const updatedTask = await task.save();
    return res.status(200).json(updatedTask);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error while updating task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error while deleting task" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
