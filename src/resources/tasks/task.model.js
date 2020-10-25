const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    order: Number,
    description: String,
    userId: String,
    boardId: String || undefined,
    columnId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
