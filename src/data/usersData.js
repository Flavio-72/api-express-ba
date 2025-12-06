import User from '../models/userModel.js';

const users = [
  new User({
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: '123',
    role: 'admin'
  }),
  new User({
    id: '2',
    username: 'juanperez',
    email: 'juan@example.com',
    password: '456',
    role: 'user'
  })
];

export default users