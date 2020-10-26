const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  await res.json(tasks.map(Task.toResponse));
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const task = await taskService.get(req.params.boardId, req.params.taskId);
    res.status(200).send(Task.toResponse(task));
  } catch (err) {
    res.status(404).send('Not found');
  }
});

router.route('/:taskId').delete(async (req, res) => {
  try {
    await taskService.remove(req.params.boardId, req.params.taskId);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send('Not found');
  }
});

router.route('/').post(async (req, res) => {
  const task = await taskService.create({
    ...req.body,
    boardId: req.params.boardId
  });
  res.status(200).send(Task.toResponse(task));
});

router.route('/:taskId').put(async (req, res) => {
  try {
    const task = await taskService.update({
      ...req.body,
      _id: req.params.taskId,
      boardId: req.params.boardId
    });
    res.status(200).send(Task.toResponse(task));
  } catch (err) {
    res.status(404).send('Not found');
  }
});

module.exports = router;
