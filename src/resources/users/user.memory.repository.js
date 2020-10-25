const { users, tasks } = require('../../database');
const { User } = require('./user.model');

const getAll = async () => {
  return await User.find();
};

const getById = async id => {
  const user = await User.findOne({ id });
  return user.toObject();
};

const createUser = async user => {
  if (user) {
    return await User.create(user);
  }
  return undefined;
};

const updateUser = async (id, newUser) => {
  if (id && newUser) {
    return (await User.update({ id }, { ...newUser })).toObject();
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
