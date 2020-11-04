const uuid = require('uuid');
const mongoose = require('mongoose');

const boardScema = mongoose.Schema(
  {
    id: { type: String, default: uuid },
    title: String,
    columns: [
      {
        id: { type: String, default: uuid },
        title: String,
        order: Number
      }
    ]
  },
  { versionKey: false }
);

const Board = mongoose.model('Board', boardScema);

module.exports = Board;
