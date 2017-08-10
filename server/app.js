//import all necesary dependencies
require('dotenv').config();
import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

//set up my session generation middleware
app.set('superSecret', 'efosa')

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Setup a default catch-all route that sends back a welcome message in JSON format.
import server from './routes'
server(app)
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

export default app