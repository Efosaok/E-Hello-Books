"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeBookWithUser = undefined;

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allUsers = _models2.default.Users;

var allBooks = _models2.default.Books;

var storeBookWithUser = exports.storeBookWithUser = function storeBookWithUser(userid, bookid) {
  var UserDetails = allUsers.findById(userid);
  var Bookdetails = allBooks.findById(bookid);

  delete Bookdetails['quantity'];
  delete Bookdetails['createdAt'];
  delete Bookdetails['updatedAt'];
  delete Userdetails['createdAt'];
  delete Userdetails['updatedAt'];
  delete Userdetails['id'];
  if (Userdetails['borrowedbooks'] === null) {
    Userdetails['borrowedbooks'] = Bookdetails;
    return Userdetails;
  } else {
    Userdetails['borrowedbooks'] += Bookdetails;
    return Userdetails;
  }
};