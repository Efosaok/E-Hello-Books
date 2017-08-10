import usersController from '../controllers/users'

import bookController from '../controllers/books'

import auth from '../authorization/auth'

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Hello-Books API!',
  }));

//route for admin to borrow book
  app.post('/api/books', bookController.addBook);

  app.get('/api/books', bookController.getAvailableBooks);

  app.put('/api/books/:bookid', bookController.modifyBook);

  app.get('/api/users', usersController.allUsers);

  app.post('/api/users/signup', usersController.create);

  app.post("/api/users/signin", usersController.signin);

  app.post('/api/users/:userid/books', usersController.borrowBook);

  app.put('/api/users/:userid/books', usersController.returnBook);

  app.get('/api/users/:userid/books?returned=false', usersController.getHistory);

  app.get('/api/history', usersController.allHistory);
};