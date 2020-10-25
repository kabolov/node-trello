const mongoose = require('mongoose');
const uuid = require('uuid');

// class User {
//   constructor({
//     id = uuid(),
//     name = 'USER',
//     login = 'user',
//     password = 'P@55w0rd'
//   } = {}) {
//     this.id = id;
//     this.name = name;
//     this.login = login;
//     this.password = password;
//   }

//   static toResponse(user) {
//     const { id, name, login } = user;
//     return { id, name, login };
//   }
// }

// module.exports = User;

const userSchema = new mongoose.Schema({
  id: { type: String, default: uuid },
  name: String,
  login: String,
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = { User };

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
