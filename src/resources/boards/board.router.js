const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  await res.json(boards);
});

router.route('/:boardId').get(async (req, res) => {
  try {
    const board = await boardService.get(req.params.boardId);
    res.status(200).send(board);
  } catch (err) {
    res.status(404).send('Not found');
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(new Board({ ...req.body }));
  res.status(200).send(board);
});

router.route('/:boardId').delete(async (req, res) => {
  try {
    await boardService.remove(req.params.boardId);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send('Not found');
  }
});

router.route('/:boardId').put(async (req, res) => {
  try {
    const board = await boardService.update(
      req.params.boardId,
      new Board({ ...req.body })
    );
    res.status(200).send(board);
  } catch (err) {
    res.status(404).send('Not found');
  }
});

module.exports = router;
