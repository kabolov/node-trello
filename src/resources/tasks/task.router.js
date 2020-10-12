const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

// get all tasks
router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll();

  res.json(tasks);
});

// get task by id
router.route('/:id').get(async (req, res) => {
  const { id, boardId } = req.params;

  const task = await taskService.getById(id, boardId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json('No task found');
  }
});

// create task
router.route('/').post(async (req, res) => {
  const { boardId } = req.params;
  const { title, order, description, userId, columnId } = req.body;
  console.dir(req.body);
  console.dir({
    boardId,
    title,
    order,
    description,
    userId,
    columnId
  });

  if (!boardId) {
    res.status(400).json('please pass all required fields');
    return;
  }

  const task = await taskService.createTask(
    new Task({ title, order, description, userId, boardId, columnId })
  );
  console.log(task);
  if (task) {
    res.json(task);
  } else {
    res.status(400).json('Error');
  }
});

// update task
router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const newTask = req.body;

  const result = await taskService.updateTask(id, newTask);

  if (result) {
    res.json(result);
  } else {
    res.status(404).json('No task found');
  }
});

// delete task
router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  const result = await taskService.deleteTask(id);

  if (result) {
    res.json(result);
  } else {
    res.status(404).json('No task found');
  }
});

module.exports = router;
