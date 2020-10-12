const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

// get all boards
router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();

  res.json(boards);
});

// get board by id
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;

  const board = await boardsService.getById(id);

  if (board) {
    res.json(board);
  } else {
    res.status(404).json('No board found');
  }
});

// create board
router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;

  if (!title) {
    res.status(400).json('title is required, please provide title');
    return;
  }

  const board = await boardsService.createBoard(new Board({ title, columns }));

  if (board) {
    res.json(board);
  } else {
    res.status(400).json('Error');
  }
});

// update board
router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const newBoard = req.body;

  const result = await boardsService.updateBoard(id, newBoard);

  if (result) {
    res.json(result);
  } else {
    res.status(404).json('No board found');
  }
});

// delete board
router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  const result = await boardsService.deleteBoard(id);

  if (result) {
    res.json(result);
  } else {
    res.status(404).json('No board found');
  }
});

module.exports = router;
