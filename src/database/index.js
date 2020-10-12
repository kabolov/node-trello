const users = {
  '123123': {
    id: '123123',
    name: 'Alex',
    login: 'alex',
    password: 'password'
  },
  '456456': {
    id: '456456',
    name: 'Alexandra',
    login: 'alex123',
    password: 'password123'
  }
};

const boards = {
  '123123': {
    id: '123123',
    title: 'Board 1',
    columns: [{ id: 'asdasd', title: 'Column 1', order: 0 }]
  },
  '456456': {
    id: '456456',
    title: 'Board 2',
    columns: [{ id: 'asdlkjasd', title: 'Column 1', order: 0 }]
  }
};

module.exports = { users, boards };
