const jwt = require('jsonwebtoken');
const { genSalt, hash, compare } = require('bcrypt');

const { JWT_SECRET_KEY } = require('../../common/config');

const ROUNDS = 5;

const authenticate = async (req, res, next) => {
  try {
    const { originalUrl } = req;
    console.log('@@@@@@', originalUrl);
    const authorization = req.header('authorization');
    console.log('@@@@@@@@@@@@@@@', authorization);

    if (['/', '/login'].includes(originalUrl)) {
      return next();
    }

    const [authType, token] = authorization.split(' ');

    if (authType !== 'Bearer' || !token) {
      res.status(401).json('Unauthorized');
    }

    await verifyToken(token);

    return next();
  } catch (err) {
    res.status(401).json('Unauthorized');
  }
};

const hashPassword = async password => {
  const salt = await genSalt(ROUNDS);

  return hash(password, salt);
};

const checkHash = async (password, hashedPassword) =>
  compare(password, hashedPassword);

const generateToken = user =>
  jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '2h' });

const verifyToken = token => jwt.verify(token, JWT_SECRET_KEY);

module.exports = {
  authenticate,
  hashPassword,
  checkHash,
  generateToken,
  verifyToken
};
