const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');

// get all tasks
router.route('/').get(async (req, res, next) => {
  try {
    const tasks = await taskService.getAll();

    res.json(tasks);
  } catch (error) {
    return next(error);
  }
});

// get task by id
router.route('/:id').get(async (req, res, next) => {
  try {
    const { id, boardId } = req.params;

    const task = await taskService.getById(id, boardId);

    if (task) {
      res.json(task);
    } else {
      res.status(404).json('No task found');
    }
  } catch (error) {
    return next(error);
  }
});

// create task
router.route('/').post(async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;

    if (!boardId) {
      res.status(400).json('please pass all required fields');
      return;
    }

    const task = await taskService.createTask({
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    });

    if (task) {
      res.json(task);
    } else {
      res.status(400).json('Error');
    }
  } catch (error) {
    return next(error);
  }
});

// update task
router.route('/:id').put(async (req, res, next) => {
  try {
    const { id } = req.params;
    const newTask = req.body;

    const result = await taskService.updateTask(id, newTask);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json('No task found');
    }
  } catch (error) {
    return next(error);
  }
});

// delete task
router.route('/:id').delete(async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await taskService.deleteTask(id);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json('No task found');
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
