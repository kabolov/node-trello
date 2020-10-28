const uuid = require('uuid');
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuid },
    title: {
      type: String,
      required: true
    },
    order: Number,
    description: String,
    userId: {
      type: String,
      default: uuid,
      ref: 'User'
    },
    boardId: {
      type: String,
      default: uuid,
      ref: 'Board'
    },
    columnId: String
  },
  { versionKey: false }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
