const DB = require('../../utils/inMemoryDB');
const TABLE_NAME = 'Boards';

const getAll = async () => {
  return DB.getAllItems(TABLE_NAME);
};

const get = async id => {
  const board = await DB.getItem(TABLE_NAME, id);
  if (!board) throw new Error(`The board with id ${id} was not found`);
  return board;
};

const remove = async id => {
  await DB.removeItem(TABLE_NAME, id);
};

const create = async board => {
  const newBoard = await DB.createItem(TABLE_NAME, board);
  if (!newBoard) throw new Error('Can not create board');
  console.log(newBoard);
  return newBoard;
};

const update = async (id, board) => {
  const boardItem = await DB.updateItem(TABLE_NAME, id, board);
  return boardItem;
};

module.exports = { getAll, get, remove, create, update };
