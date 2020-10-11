const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  await res.json(boards);
});

router.route('/:boardId').get(async (req, res) => {
  const board = await boardService.get(req.params.boardId);
  res.status(200).send(board);
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(new Board({ ...req.body }));
  res.status(200).send(board);
});

router.route('/:boardId').delete(async (req, res) => {
  await boardService.remove(req.params.boardId);
  res.sendStatus(200);
});

router.route('/:boardId').put(async (req, res) => {
  const board = await boardService.update(new Board({ ...req.body }));
  res.status(200).send(board);
});

module.exports = router;
