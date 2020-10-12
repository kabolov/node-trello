const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'DEFAULT BOARD', columns } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns
      ? columns.map(item => {
          item.id = uuid();
          return item;
        })
      : [];
  }
}

module.exports = Board;
