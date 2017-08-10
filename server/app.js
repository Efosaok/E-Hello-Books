require('dotenv').config();
import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import bcrypt from "bcrypt"
import xjwt from 'express-jwt'


// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

//set up my session generation middleware
app.set('secret', 'efosa');
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(xjwt({secret: app.get('secret')}).unless({
	path: ['/api/users/signin','/api/users/signup','/api','/api/books']
}))
// Setup a default catch-all route that sends back a welcome message in JSON format.
import server from './routes'
server(app)
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

export default app