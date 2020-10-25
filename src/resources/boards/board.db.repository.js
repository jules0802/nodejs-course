const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const get = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new Error();
  }
  return board;
};

const create = async board => {
  return Board.create(board);
};

const remove = async id => {
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

const update = async (id, board) => {
  return Board.findByIdAndUpdate(id, board);
};

module.exports = { getAll, get, remove, create, update };
