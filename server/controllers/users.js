//import our model file and require necessary dependencies
import bcrypt from 'bcrypt'
import Users from "../models"
Users.Users;
import Books from "../models"
Books.Books;
import Borrowhistory from "../models"
Borrowhistory.Borrowhistory;

export default{

//Controller function to signup a user
	create(req,res) {
		let userCredentials = {
			firstname: req.body.firstname,
			othername: req.body.othername,
			username: req.body.username,
			email: req.body.email,
			password: hash
		}
		bcrypt.hash(req.body.password, 10, (err,hash)=>{
			if(err) throw err.message
			return Users
			.create(userCredentials)
			.then(users => res.status(200).send(users))
			.catch(error => res.status(400).send(error.message))
		})
	},

//Controller function to signin a user
	signin(req,res) {
		return Users
		.findOne({
			where : {
				username: req.body.username
			}
		})
		.then((users)=>{
			bcrypt.compare(req.body.password, users.password, (err,response)=>{
				if(response) {
					res.status(200).send(users)
				}else{
					res.status(400).send('invalid username or password')
				}
			})
		})
		.catch(error => res.status(400).send(error, {message: 'invalid username or password'}))
	},

//Controller function to get all users in the DB
	allUsers(req,res) {
		return Users
		.findAll()
		.then(users => res.status(200).send(users))
		.catch(error => res.status(400).send(error))
	},

//Controller function to enable user borrow a book
	borrowBook(req,res) {
		return Borrowhistory
		.create({
			userid: req.params.userid,
			bookid: req.body.id,
			returned: false
		})
		.then(borrowed => res.status(200).send(borrowed))
		.catch(error => res.status(400).send(error.message))
	},

//Controller function to enable user return a book
	returnBook(req,res) {
		let returningUser = {
			returned : true
		}
		return Borrowhistory
		.update(returningUser, {where: {bookid: req.body.id, userid:req.params.userid}})
		.then(returned => res.status(200).send(returned))
		.catch(error => res.status(400).send(error.message))
	},

//controller function to get user Borrowing History
	getHistory(req,res) {
		return Borrowhistory
		.findAll({
			where:{
				userid : req.params.userid
			}
		})
		.then(history => res.status(200).send(history))
		.catch(error => res.status(400).send(error.message))
	},

//Controller function to get all DB borrow history
	allHistory(req,res) {
		return Borrowhistory
		.findAll()
		.then(history => res.send(history))
		.catch(error => res.status(400).send(error.message))
	},

//Controller function to get a user's unreturned Books
	unreturnedBooks(req,res) {
		return Borrowhistory
		.findAll({
			where: {
			 userid: req.params.userid,
			 returned: false
			}
		})
		.then(unreturned => res.send(unreturned))
		.catch(error => res.status(400).send(error.message))
	}
}