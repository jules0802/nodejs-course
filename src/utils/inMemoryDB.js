const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const db = {
  Users: [],
  Boards: [],
  Tasks: []
};

// mock data
(() => {
  for (let i = 0; i < 3; i++) {
    db.Users.push(new User());
  }
  const board = new Board();
  db.Boards.push(new Board());
  db.Boards.push(new Board());
  db.Boards.push(new Board());

  db.Tasks.push(
    new Task({ boardId: board.id }),
    new Task({ boardId: board.id })
  );
})();

const getAllItems = tableName => {
  return db[tableName].concat();
};

const getItem = (tableName, id) => {
  const items = db[tableName].filter(item => item.id === id);

  if (items.length > 1) {
    console.error(`Something went wrong in ${tableName} ID ${id}`);
    throw new Error('Something went wrong');
  }
  return items[0];
};

const removeItem = (tableName, id) => {
  const itemToRemove = getItem(tableName, id);
  db[tableName].splice(db[tableName].indexOf(itemToRemove), 1);
  return itemToRemove;
};

const createItem = (tableName, item) => {
  db[tableName].push(item);
  return getItem(tableName, item.id);
};

const updateItem = (tableName, id, item) => {
  const oldItem = getItem(tableName, id);
  if (oldItem) {
    db[tableName].splice(db[tableName].indexOf(oldItem), 1, { ...item });
  }
  return getItem(tableName, id);
};

module.exports = {
  getAllItems,
  getItem,
  removeItem,
  createItem,
  updateItem
};
