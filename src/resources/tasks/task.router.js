const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  await res.json(tasks);
});

router.route('/:taskId').get(async (req, res) => {
  const task = await taskService.get(req.params.boardId, req.params.taskId);
  res.status(200).send(task);
});

router.route('/:taskId').delete(async (req, res) => {
  await taskService.remove(req.params.boardId, req.params.taskId);
  res.sendStatus(200);
});

router.route('/').post(async (req, res) => {
  const task = await taskService.create(
    new Task({ ...req.body, boardId: req.params.boardId })
  );
  res.status(200).send(task);
});

router.route('/:taskId').put(async (req, res) => {
  const task = await taskService.update(
    new Task({
      ...req.body,
      id: req.params.taskId,
      boardId: req.params.boardId
    })
  );
  res.status(200).send(task);
});

module.exports = router;
