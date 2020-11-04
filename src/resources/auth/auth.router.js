const router = require('express').Router();
const authService = require('./auth.service');

router.route('/').post(async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const jwt = await authService.loginUser(login, password);

    if (!jwt) {
      res.status(403).json('Provided incorrect credentials');
    }

    res.status(200).json({ token: jwt });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
