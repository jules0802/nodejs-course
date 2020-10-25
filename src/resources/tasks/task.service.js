const taskRepo = require('./task.db.repository');

const getAll = async boardId => await taskRepo.getAll(boardId);

const get = async (boardId, id) => await taskRepo.get(boardId, id);

const remove = async (boardId, id) => await taskRepo.remove(boardId, id);

const create = async task => await taskRepo.create(task);

const update = async (boardId, id, task) =>
  await taskRepo.update(boardId, id, task);

const removeByBoard = async boardId => await taskRepo.removeByBoardId(boardId);

const unassignUser = async userId => await taskRepo.unassignUser(userId);

module.exports = {
  getAll,
  get,
  remove,
  create,
  update,
  removeByBoard,
  unassignUser
};
