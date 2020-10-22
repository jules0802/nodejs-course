const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const get = async id => {
  return User.findById(id);
};

const create = async user => {
  return User.create(user);
};

const remove = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

const update = async (id, user) => {
  return User.findByIdAndUpdate(id, user);
};

module.exports = { getAll, get, remove, create, update };
