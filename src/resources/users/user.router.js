const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

// get all users
router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    // throw new Error({ statusCode: 400, result: 'Something got wrong!' });
    res.json(users);
  } catch (error) {
    return next(error);
  }
});

// get user by id
router.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await usersService.getById(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json('No users found');
    }
  } catch (error) {
    return next(error);
  }
});

// create new user
router.route('/').post(async (req, res, next) => {
  try {
    const { login, name, password } = req.body;

    if (!login || !name || !password) {
      res.status(400).json('please provide login, name, password fields');
      return;
    }

    const user = await usersService.createUser({ name, login, password });
    const userObject = user.toObject();
    delete userObject.password;

    if (user) {
      res.json(userObject);
    } else {
      res.status(400).json('error');
    }
  } catch (error) {
    return next(error);
  }
});

// update user
router.route('/:id').put(async (req, res, next) => {
  try {
    const { id } = req.params;
    const newUser = req.body;

    const result = await usersService.updateUser(id, newUser);

    if (result) {
      res.json({ ...User.toResponse(result), success: 'true' });
    } else {
      res.status(404).json('No user found');
    }
  } catch (error) {
    return next(error);
  }
});

// delete user
router.route('/:id').delete(async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await usersService.deleteUser(id);

    if (result) {
      res.json({ ...User.toResponse(result), success: 'true' });
    } else {
      res.status(400).json('No user found');
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
