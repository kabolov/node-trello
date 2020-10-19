/* eslint-disable no-unused-vars */
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const morgan = require('morgan');

const configure = require('./helpers/errorHandling');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
configure();
app.use(
  morgan(
    '+++++++++++++++++++++++++++++++++++++++++++++++ \n :url \n :params \n :body \n +++++++++++++++++++++++++++++++++++++++++++++++++ \n'
  )
);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

app.use((err, req, res, next) => {
  const { statusCode, result } = err;

  if (statusCode) {
    res.status(statusCode).json(result);
  } else {
    console.error('Internal Server Error');

    res.status(500);
    res.render('error', { error: err });
  }
});

module.exports = app;
