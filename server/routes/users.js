import usersController from '../controllers/users'


export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Hello-Books API!',
  }));

  app.get('/api/users', usersController.allUsers);

  app.post('/api/users/signup', usersController.create);

  app.post("/api/users/signin", usersController.signin);

  app.post('/api/users/:userid/books', usersController.borrowBook);

  app.put('/api/users/:userid/books', usersController.returnBook);

  app.get('/api/users/:userid/books', usersController.getHistory);

  app.get('/api/history', usersController.allHistory);
};