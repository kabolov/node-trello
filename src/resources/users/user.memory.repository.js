const { users, tasks } = require('../../database');

const getAll = async () => {
  return [...Object.values(users)];
};

const getById = async id => {
  const user = users[id];

  return user;
};

const createUser = async user => {
  if (user) {
    users[user.id] = user;

    return user;
  }
  return undefined;
};

const updateUser = async (id, newUser) => {
  if (id && newUser) {
    const oldUser = users[id];
    if (oldUser) {
      users[id] = { ...oldUser, ...newUser };
      return users[id];
    }
    return undefined;
  }
};

const deleteUser = async id => {
  const user = users[id];

  if (user) {
    delete users[id];
    for (const task in tasks) {
      if (tasks[task].userId === id) {
        tasks[task].userId = null;
      }
    }
    return user;
  }
  return undefined;
};

module.exports = { getAll, getById, createUser, deleteUser, updateUser };
