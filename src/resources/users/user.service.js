const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const createUser = user => usersRepo.createUser(user);
const updateUser = (id, newUser) => usersRepo.updateUser(id, newUser);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getById, createUser, deleteUser, updateUser };
