const { User } = require('./user.model');
const Task = require('../tasks/task.model');

const getAll = async () => {
  return User.find();
};

const getById = async id => {
  return User.findOne({ id });
};

const getByLogin = async login => {
  return User.findOne({ login });
};

const createUser = async user => {
  if (user) {
    return User.create(user);
  }
  return undefined;
};

const updateUser = async (id, newUser) => {
  const user = await User.findOne({ id });

  if (user) return User.updateOne({ id }, newUser);
  return false;
};

const deleteUser = async id => {
  await Task.updateMany({ userId: id }, { userId: null });

  return User.deleteOne({ id });
};

module.exports = {
  getAll,
  getById,
  getByLogin,
  createUser,
  deleteUser,
  updateUser
};
