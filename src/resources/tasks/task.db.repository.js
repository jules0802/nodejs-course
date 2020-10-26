const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({ boardId });
};

const get = async (boardId, id) => {
  const task = await Task.findOne({ boardId, _id: id });
  if (!task) {
    throw new Error();
  }
  return task;
};

const remove = async (boardId, id) => {
  return (await Task.deleteOne({ boardId, _id: id })).deletedCount;
};

const create = async task => {
  return Task.create(task);
};

const update = async task => {
  return Task.findOneAndUpdate({ boardId: task.boardId, _id: task._id }, task);
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
  const allTasks = await Task.find({ userId });
  allTasks.forEach(async task => {
    await Task.findByIdAndUpdate(task._id, { userId: null });
  });
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
