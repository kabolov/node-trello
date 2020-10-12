const { boards, tasks } = require('../../database');

const getAll = async () => {
  return [...Object.values(boards)];
};

const getById = async id => {
  const board = boards[id];

  return board;
};

const createBoard = async board => {
  if (board) {
    boards[board.id] = board;

    return board;
  }
  return undefined;
};

const updateBoard = async (id, newBoard) => {
  if (id && newBoard) {
    const oldBoard = boards[id];
    if (oldBoard) {
      boards[id] = { ...oldBoard, ...newBoard };
      return boards[id];
    }
    return undefined;
  }
};

const deleteBoard = async id => {
  const board = boards[id];

  if (board) {
    delete boards[id];

    for (const task in tasks) {
      if (tasks[task].boardId === id) {
        delete tasks[task];
      }
    }

    return board;
  }
  return undefined;
};

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
