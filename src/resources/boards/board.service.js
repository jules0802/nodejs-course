const boardsRepo = require('./board.db.repository');

const getAll = async () => await boardsRepo.getAll();

const get = async id => await boardsRepo.get(id);

const remove = async id => await boardsRepo.remove(id);

const create = async board => await boardsRepo.create(board);

const update = async (id, board) => await boardsRepo.update(id, board);

module.exports = { getAll, get, remove, create, update };
