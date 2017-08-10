//import our model file and require necessary dependencies
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Users from "../models"
const allUsers = Users.Users;
import Books from "../models"
const allBooks =Books.Books;
import Borrowhistory from "../models"
const allBorrowhistory = Borrowhistory.Borrowhistory;

const secret = process.env.SECRET;

export default{

//Controller function to signup a user
	create(req,res) {
		bcrypt.hash(req.body.password, 10, (err,hash)=>{
			return allUsers
			.create({
			firstname: req.body.firstname,
			othername: req.body.othername,
			username: req.body.username,
			email: req.body.email,
			password: hash
		})
			// .then((users)=> res.status(200).send({message: "You have successfully signed up"}users))
			.then((user) => {
				const token = jwt.sign({
					userId : user.id
				}, secret, {
					expiresIn: '10h'
				});
				res.status(201).send({message: 'Sign up sucessful', token, user });
			})
			.catch(error => res.status(400).send(error.message))
		})
	},

//Controller function to signin a user
	signin(req,res) {
		return allUsers
		.findOne({
			where : {
				username: req.body.username
			}
		})
		.then((user)=>{
			bcrypt.compare(req.body.password, users.password, (err,response)=>{
				if(response) {
					const token = jwt.sign({
					userId : user.id
						}, secret, {
							expiresIn: '10h'
					});

				res.status(201).send({message: 'Sign up sucessful', token, user });
				}else{
					res.status(400).send({message: 'Your Password is Incorrect'})
				}
			})
		})
		.catch(error => res.status(400).send(error, {message: 'invalid username or password'}))
	},

//Controller function to get all users in the DB
	allUsers(req,res) {
		return allUsers
		.findAll()
		.then(users => res.status(200).send(users))
		.catch(error => res.status(400).send(error))
	},

//Controller function to enable user borrow a book
	borrowBook(req,res) {
		return allBorrowhistory
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
		return allBorrowhistory
		.update(returningUser, {where: {bookid: req.body.id, userid:req.params.userid}})
		.then(returned => res.status(200).send(returned))
		.catch(error => res.status(400).send(error.message))
	},

//controller function to get user Borrowing History
	getHistory(req,res) {
		return allBorrowhistory
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
		return allBorrowhistory
		.findAll()
		.then(history => res.send(history))
		.catch(error => res.status(400).send(error.message))
	},

//Controller function to get a user's unreturned Books
	unreturnedBooks(req,res) {
		return allBorrowhistory
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