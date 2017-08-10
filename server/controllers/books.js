import Books from "../models"
const AllBooks = Books.Books;

export default  {
//admin adding books to database controller
	addBook(req,res) {
		return AllBooks
		.create({
			name : req.body.name,
			category : req.body.category,
			author : req.body.author,
			contents : req.body.contents,
			isclicense : req.body.isclicense,
			quantity : req.body.quantity
		}) 
		
		.then(books => res.status(200).send(books))
		.catch(error => res.status(400).send(error.message))
	},
//controller to get all available books 
	getAvailableBooks(req,res) {
		return AllBooks
		.findAll()
		.then(books => res.status(200).send(books))
	},
//routes for admin to modify book information
	modifyBook(req,res) {
	 	let newData = {
	 		name: req.body.name,
	 		category: req.body.category
	 	}
	 	return AllBooks
	 	.update(newData, {where: {id: req.params.bookid}})
	 	.then(Books => res.status(200).send(Books))
	 	.catch(error => res.status(400).send(error.message))
	}
}