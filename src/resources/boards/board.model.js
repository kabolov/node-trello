const uuid = require('uuid');
const mongoose = require('mongoose');
// class Board {
//   constructor({ id = uuid(), title = 'DEFAULT BOARD', columns } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns
//       ? columns.map(item => {
//           item.id = uuid();
//           return item;
//         })
//       : [];
//   }
// }

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
