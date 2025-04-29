const express = require('express');

const app = express();

app.use(express.json());


let tasks = [];
let nextId = 1;


app.get('/tasks', (req, res) => {
  res.json(tasks);
});


app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});


app.post('/tasks', (req, res) => {
  const { title, completed = false } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  tasks.push({ id: nextId++, title, completed });
  res.status(201).json(newTask);
});


app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.json(deletedTask);
});

app.listen(7000, () => {
  console.log("server is on");
});
