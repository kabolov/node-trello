/* eslint-disable no-unused-vars */
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const morgan = require('morgan');

const {
  configure,
  handleErrors,
  logIncomingRequest
} = require('./helpers/errorHandling');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/auth/auth.router');
const { authenticate } = require('./resources/auth/auth.utils');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
configure();
app.use(logIncomingRequest());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(authenticate);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

app.use((err, req, res, next) => {
  handleErrors(err, res);
});

module.exports = app;
