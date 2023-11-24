const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
const getCurrentTimestamp = () => new Date().toISOString();
let tasks = [];
app.get("/tasks", (req, res) => {
  const { completed, sort } = req.query;
  let filteredTasks = tasks;
  if (completed !== undefined) {
    const isCompleted = completed.toLowerCase() === "true";
    filteredTasks = tasks.filter((task) => task.completed === isCompleted);
  }
  if (sort === "created") {
    filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
  res.json(filteredTasks);
});

app.get("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.post("/tasks", (req, res) => {
  const { title, description, completed, priority } = req.body;

  if (!title || !description || completed === undefined || !priority) {
    res.status(400).json({
      error:
        "Invalid request. Title, description, and completion status are required.",
    });
    return;
  }

  const newTask = {
    id: tasks.length.toString(),
    title,
    description,
    completed,
    priority,
    createdAt: getCurrentTimestamp(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const { title, description, completed } = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title,
      description,
      completed,
      priority,
    };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  tasks = tasks.filter((t) => t.id !== taskId);
  res.json({ message: "Task deleted successfully" });
});

app.get("/tasks/priority/:level", (req, res) => {
  const priorityLevel = req.params.level;
  const tasksWithPriority = tasks.filter(
    (task) => task.priority.toLowerCase() === priorityLevel.toLowerCase()
  );
  res.json(tasksWithPriority);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
