const Board = require('./board.model');
const Task = require('../tasks/task.model');

const getAll = async () => {
  return Board.find();
};

const getById = async id => {
  return Board.findOne({ id });
};

const createBoard = async board => {
  if (board) {
    return Board.create(board);
  }
  return undefined;
};

const updateBoard = async (id, newBoard) => {
  const board = await Board.findOne({ id });

  if (board) return Board.updateOne({ id }, newBoard);
  return false;
};

const deleteBoard = async id => {
  await Task.remove({ boardId: id });

  return Board.deleteOne({ id });
};

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
