/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const path = require('path');
const url = require('url');
const chalk = require('chalk');
const debug = require('debug');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const express = require('express');
const usersRoutes = require('./routes/users');

dotenv.config();

const app = express();
// eslint-disable-next-line no-underscore-dangle
// const __filename = url.fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
// const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4000;

const PASSWORD = process.env.MONGO_PASSWORD;
const USER = process.env.MONGO_USER;
const { CLUSTER } = process.env;

const uri = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER}.xwt3f2h.mongodb.net/?retryWrites=true&w=majority`;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(uri, connectionParams)
  .then(() => {
    console.log(chalk.greenBright('Connected to the database '));
  })
  .catch((err) => {
    console.log(chalk.red(`Error connecting to the database. n${err}`));
  });

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public/')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/users', usersRoutes);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Blog' });
});

app.get('/login', (req, res) => {
  res.render('auth/login.ejs', { title: 'Login' });
});

app.post('/login', (req, res) => {
  res.render('auth/login.ejs', { title: 'Login' });
});

app.get('/register', (req, res) => {
  res.render('auth/register.ejs', { title: 'Registration' });
});

app.post('/register', (req, res) => {
  res.render('auth/register.ejs', { title: 'Registration' });
});

app.listen(PORT, () => debug(`Server running on port: http://localhost:${chalk.green(PORT)}`));
