const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/users/login.router');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
// const logging = require('./utils/logging');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const checkAuthMiddleware = require('./utils/checkAuthMiddleware');

process.on('uncaughtException', err => {
  console.error(`captured error: ${err.message}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// app.use('*', logging);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use('/users', checkAuthMiddleware, userRouter);
app.use('/boards', checkAuthMiddleware, boardRouter);
boardRouter.use('/:boardId/tasks', checkAuthMiddleware, taskRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
  next(err);
});

module.exports = app;
