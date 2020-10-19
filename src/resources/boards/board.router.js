const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

// get all boards
router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardsService.getAll();

    res.json(boards);
  } catch (error) {
    return next(error);
  }
});

// get board by id
router.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;

    const board = await boardsService.getById(id);

    if (board) {
      res.json(board);
    } else {
      res.status(404).json('No board found');
    }
  } catch (error) {
    return next(error);
  }
});

// create board
router.route('/').post(async (req, res, next) => {
  try {
    const { title, columns } = req.body;

    if (!title) {
      res.status(400).json('title is required, please provide title');
      return;
    }

    const board = await boardsService.createBoard(
      new Board({ title, columns })
    );

    if (board) {
      res.json(board);
    } else {
      res.status(400).json('Error');
    }
  } catch (error) {
    return next(error);
  }
});

// update board
router.route('/:id').put(async (req, res, next) => {
  try {
    const { id } = req.params;
    const newBoard = req.body;

    const result = await boardsService.updateBoard(id, newBoard);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json('No board found');
    }
  } catch (error) {
    return next(error);
  }
});

// delete board
router.route('/:id').delete(async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await boardsService.deleteBoard(id);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json('No board found');
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
