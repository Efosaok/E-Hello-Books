import bcrypt from 'bcrypt'
import Users from "../models"
const allUsers = Users.Users
import Books from "../models"
const allBooks = Books.Books;

export const storeBookWithUser = (userid,bookid)=>{
	let UserDetails = allUsers.findById(userid)
	let Bookdetails = allBooks.findById(bookid)

	delete Bookdetails['quantity']
    delete Bookdetails['createdAt']
    delete Bookdetails['updatedAt']
    delete Userdetails['createdAt']
    delete Userdetails['updatedAt']
    delete Userdetails['id']
    if(Userdetails['borrowedbooks'] === null){
        Userdetails['borrowedbooks'] = Bookdetails
        return Userdetails
    }else{
      Userdetails['borrowedbooks'] += Bookdetails
      return Userdetails
    }
}