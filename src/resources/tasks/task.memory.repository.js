const DB = require('../../utils/inMemoryDB');
const TABLE_NAME = 'Tasks';

const getAll = async boardId => {
  return DB.getAllItems(TABLE_NAME).filter(task => task.boardId === boardId);
};

const get = async (boardId, id) => {
  const task = await DB.getItem(TABLE_NAME, id);
  return task;
};

const remove = async (boardId, id) => {
  await DB.removeItem(TABLE_NAME, id);
};

const create = async task => {
  return DB.createItem(TABLE_NAME, task);
};

const update = async task => {
  await get(task.boardId, task.id);
  return DB.updateItem(TABLE_NAME, task.id, task);
};

module.exports = { getAll, get, remove, create, update };
