//import our model file and require necessary dependencies
import bcrypt from 'bcrypt'
import Users from "../models"
const allUsers = Users.Users
import Books from "../models"
const allBooks = Books.Books;
import Borrowhistory from "../models"
const allBorrowHistory = Borrowhistory.Borrowhistory;

//export app.
export default  {
//Controller function to signup a user
	create(req,res) {

		if (req.body.password === undefined){
			return res.status(400).send({message: 'Put in your credentials'})
		}

//use bcrypt to auto-generate a salt and then store the hash in the DB
		bcrypt.hash(req.body.password, 10, (err,hash)=>{
			if(err) throw err.message
			return allUsers
			.create({
				firstname: req.body.firstname,
				othername: req.body.othername,
				username: req.body.username,
				email: req.body.email,
				password: hash
			})
			.then(users => res.status(201).send(users))
			.catch(error => res.status(503).send(error.message))
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
		.then((users)=>{
//Using the bcrypt module to compare paswords and return the appropriate response
			bcrypt.compare(req.body.password, users.password, (err,response)=>{
				if(response) {
					res.status(200).send({message: 'You have successfully signed in'}, users)
				}else{
					res.status(400).send('Hey,your password is incorrect')
				}
			})
		})
		.catch(error => res.status(500).send(error.message))
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
		return allBorrowHistory
		.findAll({
			where: {
				userid:req.params.userid,
				bookid:req.body.bookid,
				returned:false
			}
		})
		.then(user => res.status(200).send('you cannot borrow book again'))
		.catch(error => res.status(500).send(error.message))

		return allBorrowHistory
		.create({
			userid: req.params.userid,
			bookid: req.body.bookid,
			returned: false
		})
		.then(borrow => res.status(200).send({message:'You have successfully borrowed'}, borrow))
	},

//Controller function to enable user return a book
	returnBook(req,res) {
		return allBorrowHistory
		.create({
			userid: req.params.userid,
			bookid: req.body.id,
			returned: true
		})
		.then(borrowed => res.status(200).send(borrowed))
		.catch(error => res.status(400).send(error.message))
	},

//controller function to get user Borrowing History
	getHistory(req,res) {
//First of all check if the user is querying for returned books 
//or not
		if(req.query.returned !== 'false'){
			return allBorrowHistory
			.findAll({
				where:{
					userid : req.params.userid
				}
			})
			.then(history => res.status(200).send(history))
			.catch(error => res.status(400).send(error.message))
		}

//if the user is querying for unreturned books
//magic happens here
		if (req.query.returned === 'false'){
			console.log('working')
			return allBorrowHistory
			.findAll({
				where: {
			 	userid: req.params.userid,
			 	returned: false
			}
		})
		.then((result)=>{
			if(!result){
				res.status(400).send({message: "No records found"})
			}else{
				res.status(200).send(result)
			}
		})
		.catch(error => res.status(500).send(error.message))
		}

	},
/* 
the route below are not specified but necessary
for full app functionality
*/
//Controller function to get all DB borrow history
	allHistory(req,res) {
		return allBorrowHistory
		.findAll()
		.then(history => res.send(history))
		.catch(error => res.status(400).send(error.message))
	}

//Controller function to get a user's unreturned Books
	/*unreturnedBooks(req,res) {
		console.log('working')
		return allBorrowHistory
		.findAll({
			where: {
			 userid: req.params.userid,
			 returned: false
			}
		})
		.then(result => res.status(200).send(result))
		.catch(error => res.status(400).send(error.message))
	}*/
}