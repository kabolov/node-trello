const usersRepo = require('../users/user.memory.repository');
const { checkHash, generateToken } = require('../auth/auth.utils');

const loginUser = async (login, password) => {
  const user = await usersRepo.getByLogin(login);

  if (!user) {
    return null;
  }

  const result = await checkHash(password, user.password);
  console.log('result', result);

  if (!result) {
    return null;
  }

  return generateToken({ userId: user.id, login: user.login });
};

module.exports = { loginUser };
