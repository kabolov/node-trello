const { tasks } = require('../../database');

const getAll = async () => {
  return [...Object.values(tasks)];
};

// ? how to use boardId here?? Why???
const getById = async id => {
  const task = tasks[id];
  //   if (task.boardId === boardId) {
  return task;
  //   }
};

const createTask = async task => {
  if (task) {
    tasks[task.id] = task;

    return task;
  }
  return undefined;
};

const updateTask = async (id, newTask) => {
  if (id && newTask) {
    const oldTask = tasks[id];
    if (oldTask) {
      tasks[id] = { ...oldTask, ...newTask };
      return tasks[id];
    }
    return undefined;
  }
};

const deleteTask = async id => {
  const task = tasks[id];

  if (task) {
    delete tasks[id];
    return task;
  }
  return undefined;
};

module.exports = { getAll, getById, createTask, updateTask, deleteTask };
