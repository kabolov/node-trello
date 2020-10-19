/* eslint-disable no-unused-vars */
/* eslint-disable no-process-exit */
const morgan = require('morgan');

const configure = () => {
  morgan.token('params', (req, res) => JSON.stringify(req.params));
  morgan.token('body', (req, res) => JSON.stringify(req.body));
  morgan.token('url', (req, res) => req.originalUrl);

  process
    .on('uncaughtException', error => {
      process.stderr.write(`Uncaught Exception ${error}\n`);

      process.exit(1);
    })
    .on('unhandledRejection', (reason, promise) => {
      process.stderr.write(
        `Uncaught Rejection at ${JSON.stringify(promise)}\nReason: ${reason}\n`
      );
    });
};

const handleErrors = (err, res) => {
  const { statusCode, result } = err;

  if (statusCode) {
    res.status(statusCode).json(result);
  } else {
    console.error('Internal Server Error');

    res.status(500);
    res.render('error', { error: err });
  }
};

const logIncomingRequest = () => {
  return morgan(
    '+++++++++++++++++++++++++++++++++++++++++++++++ \n :url \n :params \n :body \n +++++++++++++++++++++++++++++++++++++++++++++++++ \n'
  );
};

module.exports = { configure, handleErrors, logIncomingRequest };
