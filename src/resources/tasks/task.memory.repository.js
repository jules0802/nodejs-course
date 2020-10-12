const DB = require('../../utils/inMemoryDB');
const TABLE_NAME = 'Tasks';

const getAll = async boardId => {
  return DB.getAllItems(TABLE_NAME).filter(task => task.boardId === boardId);
};

const get = async (boardId, id) => {
  const task = DB.getItem(TABLE_NAME, id);
  return task;
};

const remove = async (boardId, id) => {
  DB.removeItem(TABLE_NAME, id);
};

const create = async task => {
  return DB.createItem(TABLE_NAME, task);
};

const update = async task => {
  await get(task.boardId, task.id);
  return DB.updateItem(TABLE_NAME, task.id, task);
};

const removeByBoardId = async boardId => {
  const tasksInBoard = await getAll(boardId);
  if (tasksInBoard.length > 0) {
    tasksInBoard.forEach(async task => {
      await remove(boardId, task.id);
    });
  }
  return await getAll(boardId);
};

const unassignUser = async userId => {
  const boardsService = require('../boards/board.service');
  const boards = await boardsService.getAll();
  if (boards.length > 0) {
    boards.forEach(async board => {
      const tasksInBoard = await getAll(board.id);
      if (tasksInBoard.length > 0) {
        tasksInBoard.forEach(async task => {
          if (task.userId === userId) {
            await update({ ...task, userId: null });
          }
        });
      }
    });
  }
};

module.exports = {
  getAll,
  get,
  remove,
  create,
  update,
  removeByBoardId,
  unassignUser
};
