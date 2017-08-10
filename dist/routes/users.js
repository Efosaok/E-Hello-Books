'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.get('/api', function (req, res) {
    return res.status(200).send({
      message: 'Welcome to the Hello-Books API!'
    });
  });

  app.get('/api/users', _users2.default.allUsers);

  app.post('/api/users/signup', _users2.default.create);

  app.post("/api/users/signin", _users2.default.signin);

  app.post('/api/users/:userid/books', _users2.default.borrowBook);

  app.put('/api/users/:userid/books', _users2.default.returnBook);

  app.get('/api/users/:userid/books', _users2.default.getHistory);

  app.get('/api/history', _users2.default.allHistory);
};