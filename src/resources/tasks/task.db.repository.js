const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({ boardId });
};

const get = async (boardId, id) => {
  return Task.findOne({ boardId, _id: id });
};

const remove = async (boardId, id) => {
  return (await Task.deleteOne({ boardId, _id: id })).deletedCount;
};

const create = async task => {
  return Task.create(task);
};

const update = async task => {
  return Task.findOneAndUpdate({ boardId: task.boardId, _id: task.id }, task);
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
