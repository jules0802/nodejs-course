const usersRepo = require('./user.memory.repository');

const getAll = async () => await usersRepo.getAll();

const get = async id => await usersRepo.get(id);

const create = async user => await usersRepo.create(user);

const remove = async id => await usersRepo.remove(id);

const update = async (id, user) => await usersRepo.update(id, user);

module.exports = { getAll, get, remove, create, update };
