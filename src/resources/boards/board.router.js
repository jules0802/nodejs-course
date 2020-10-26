const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  await res.send(boards.map(Board.toResponse));
});

router.route('/:boardId').get(async (req, res) => {
  try {
    const board = await boardService.get(req.params.boardId);
    res
      .set('Content-Type', 'application/json')
      .status(200)
      .send(Board.toResponse(board));
  } catch (err) {
    res.status(404).send('Not found');
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create({ ...req.body });
  res
    .set('Content-Type', 'application/json')
    .status(200)
    .send(Board.toResponse(board));
});

router.route('/:boardId').delete(async (req, res) => {
  try {
    await boardService.remove(req.params.boardId);
    res.set('Content-Type', 'application/json').sendStatus(200);
  } catch (err) {
    res.status(404).send('Not found');
  }
});

router.route('/:boardId').put(async (req, res) => {
  try {
    const board = await boardService.update(req.params.boardId, {
      ...req.body
    });
    res
      .set('Content-Type', 'application/json')
      .status(200)
      .send(Board.toResponse(board));
  } catch (err) {
    res.status(404).send('Not found');
  }
});

module.exports = router;
