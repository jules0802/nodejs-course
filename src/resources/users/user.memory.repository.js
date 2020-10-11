const DB = require('../../utils/inMemoryDB');
const TABLE_NAME = 'Users';

const getAll = async () => {
  const users = await DB.getAllItems(TABLE_NAME);
  return users;
};

const get = async id => {
  const user = await DB.getItem(TABLE_NAME, id);
  if (!user) throw new Error(`The User with id ${id} was not found`);
  return user;
};

const create = async user => await DB.createItem(TABLE_NAME, user);

const remove = async id => {
  await DB.removeItem(TABLE_NAME, id);
};

const update = async (id, user) => {
  const userItem = await DB.updateItem(TABLE_NAME, id, user);
  return userItem;
};

module.exports = { getAll, get, remove, create, update };
