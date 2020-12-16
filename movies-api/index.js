import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import genreRouter from  './api/genres';
import bodyParser from 'body-parser';
import './db';
import {loadUsers} from './seedData';
import usersRouter from './api/users';
import session from 'express-session';
import authenticate from './authenticate';
dotenv.config();

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};
if (process.env.SEED_DB) {
  loadUsers();
}
const app = express();

const port = process.env.PORT;
//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('public'));
// app.use('/api/movies', moviesRouter);
//session middleware
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));


app.use('/api/genres', genreRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
//Users router
app.use('/api/users', usersRouter);
app.use(errHandler);

//update /api/Movie route
app.use('/api/movies', authenticate, moviesRouter);