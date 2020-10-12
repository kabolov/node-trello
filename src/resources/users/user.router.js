const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

// get all users
router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

// get user by id
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getById(id);
  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.json('No users found');
  }
});

// create new user
router.route('/').post(async (req, res) => {
  const { login, name, password } = req.body;

  if (!login || !name || !password) {
    res.status(400).json('please provide login, name, password fields');
    return;
  }

  const user = await usersService.createUser(
    new User({ name, login, password })
  );

  if (user) {
    res.json({ ...User.toResponse(user), success: true });
  } else {
    res.status(400).json('error');
  }
});

// update user
router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const newUser = req.body;

  const result = await usersService.updateUser(id, newUser);

  if (result) {
    res.json({ ...User.toResponse(result), success: 'true' });
  } else {
    res.json('No user found');
  }
});

// delete user
router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  const result = await usersService.deleteUser(id);

  if (result) {
    res.json({ ...User.toResponse(result), success: 'true' });
  } else {
    res.json('No user found');
  }
});

module.exports = router;
