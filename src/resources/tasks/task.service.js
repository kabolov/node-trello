const taskRepo = require('./task.memory.repository');

const getAll = () => taskRepo.getAll();
const getById = (id, boardId) => taskRepo.getById(id, boardId);
const createTask = board => taskRepo.createTask(board);
const updateTask = (id, newBoard) => taskRepo.updateTask(id, newBoard);
const deleteTask = id => taskRepo.deleteTask(id);

module.exports = {
  getAll,
  getById,
  createTask,
  deleteTask,
  updateTask
};
