/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const path = require('path');
// const url = require('url');
const chalk = require('chalk');
const debug = require('debug');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const usersRoutes = require('./routes/users');
// const getUserByEmail = require('./utils/userDBUtils');
const User = require('./models/userModel');
const { checkAuthenticated, checkNotAuthenticated } = require('./middleware/auth');

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

const initializePassport = require('./middleware/passport-config');

initializePassport(
  passport,
  async (email) => User.findOne({ email }),
  async (_id) => User.findOne({ _id })
);

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
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/users', usersRoutes);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index', { title: 'Blog', user: req.user.email });
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('auth/login.ejs', { title: 'Login' });
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('auth/register.ejs', { title: 'Registration' });
});

app.delete('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    return res.redirect('/login');
  });
});

app.listen(PORT, () => debug(`Server running on port: http://localhost:${chalk.green(PORT)}`));
