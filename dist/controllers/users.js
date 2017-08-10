'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _allUsers = _models2.default.Users; //import our model file and require necessary dependencies

var allBooks = _models2.default.Books;

var allBorrowhistory = _models2.default.Borrowhistory;

exports.default = {

	//Controller function to signup a user
	create: function create(req, res) {
		_bcrypt2.default.hash(req.body.password, 10, function (err, hash) {
			return _allUsers.create({
				firstname: req.body.firstname,
				othername: req.body.othername,
				username: req.body.username,
				email: req.body.email,
				password: hash
			}).then(function (users) {
				return res.status(200).send(users);
			}).catch(function (error) {
				return res.status(400).send(error.message);
			});
		});
	},


	//Controller function to signin a user
	signin: function signin(req, res) {
		return _allUsers.findOne({
			where: {
				username: req.body.username
			}
		}).then(function (users) {
			_bcrypt2.default.compare(req.body.password, users.password, function (err, response) {
				if (response) {
					res.status(200).send(users);
				} else {
					res.status(400).send('invalid username or password');
				}
			});
		}).catch(function (error) {
			return res.status(400).send(error, { message: 'invalid username or password' });
		});
		loggedInUsers.push(req.body.firstname);
	},


	//Controller function to get all users in the DB
	allUsers: function allUsers(req, res) {
		return _allUsers.findAll().then(function (users) {
			return res.status(200).send(users);
		}).catch(function (error) {
			return res.status(400).send(error);
		});
	},


	//Controller function to enable user borrow a book
	borrowBook: function borrowBook(req, res) {
		return allBorrowhistory.create({
			userid: req.params.userid,
			bookid: req.body.id,
			returned: false
		}).then(function (borrowed) {
			return res.status(200).send(borrowed);
		}).catch(function (error) {
			return res.status(400).send(error.message);
		});
	},


	//Controller function to enable user return a book
	returnBook: function returnBook(req, res) {
		var returningUser = {
			returned: true
		};
		return allBorrowhistory.update(returningUser, { where: { bookid: req.body.id, userid: req.params.userid } }).then(function (returned) {
			return res.status(200).send(returned);
		}).catch(function (error) {
			return res.status(400).send(error.message);
		});
	},


	//controller function to get user Borrowing History
	getHistory: function getHistory(req, res) {
		return allBorrowhistory.findAll({
			where: {
				userid: req.params.userid
			}
		}).then(function (history) {
			return res.status(200).send(history);
		}).catch(function (error) {
			return res.status(400).send(error.message);
		});
	},


	//Controller function to get all DB borrow history
	allHistory: function allHistory(req, res) {
		return allBorrowhistory.findAll().then(function (history) {
			return res.send(history);
		}).catch(function (error) {
			return res.status(400).send(error.message);
		});
	},


	//Controller function to get a user's unreturned Books
	unreturnedBooks: function unreturnedBooks(req, res) {
		return allBorrowhistory.findAll({
			where: {
				userid: req.params.userid,
				returned: false
			}
		}).then(function (unreturned) {
			return res.send(unreturned);
		}).catch(function (error) {
			return res.status(400).send(error.message);
		});
	}
};