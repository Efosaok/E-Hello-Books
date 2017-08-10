"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AllBooks = _models2.default.Books;

exports.default = {
	//admin adding books to database controller
	addBook: function addBook(req, res) {
		return AllBooks.create({
			name: req.body.name,
			category: req.body.category,
			author: req.body.author,
			contents: req.body.contents,
			isclicense: req.body.isclicense,
			quantity: req.body.quantity
		}).then(function (books) {
			return res.status(200).send(books);
		}).catch(function (error) {
			return res.status(400).send(error.message);
		});
	},

	//controller to get all available books 
	getAvailableBooks: function getAvailableBooks(req, res) {
		return AllBooks.findAll().then(function (books) {
			return res.status(200).send(books);
		});
	},

	//routes for admin to modify book information
	modifyBook: function modifyBook(req, res) {
		var newData = {
			name: req.body.name,
			category: req.body.category
		};
		return AllBooks.update(newData, { where: { id: req.params.bookid } }).then(function (Books) {
			return res.status(200).send(Books);
		}).catch(function (error) {
			return res.status(400).send(error.message);
		});
	}
};