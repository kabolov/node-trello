const Task = require('./task.model');

const getAll = async () => {
  return Task.find();
};

// ? how to use boardId here?? Why???
const getById = async id => {
  return Task.findOne({ id });
};

const createTask = async task => {
  if (task) {
    return Task.create(task);
  }
  return undefined;
};

const updateTask = async (id, newTask) => {
  const task = await Task.findOne({ id });

  if (task) return Task.updateOne({ id }, newTask);
  return false;
};

const deleteTask = async id => {
  return Task.deleteOne({ id });
};

module.exports = { getAll, getById, createTask, updateTask, deleteTask };
