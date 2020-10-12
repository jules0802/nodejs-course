const DB = require('../../utils/inMemoryDB');
const TABLE_NAME = 'Boards';

const getAll = async () => {
  return DB.getAllItems(TABLE_NAME);
};

const get = async id => {
  const board = DB.getItem(TABLE_NAME, id);
  if (!board) throw new Error(`The board with id ${id} was not found`);
  return board;
};

const remove = async id => {
  const taskService = require('../tasks/task.service');
  await taskService.removeByBoard(id);
  DB.removeItem(TABLE_NAME, id);
};

const create = async board => {
  const newBoard = DB.createItem(TABLE_NAME, board);
  if (!newBoard) throw new Error('Can not create board');
  return newBoard;
};

const update = async (id, board) => {
  const boardItem = DB.updateItem(TABLE_NAME, id, board);
  return boardItem;
};

module.exports = { getAll, get, remove, create, update };
