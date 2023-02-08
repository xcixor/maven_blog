/* eslint-disable import/no-extraneous-dependencies */
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
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
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const postRoutes = require('./routes/post');
const categoryRoutes = require('./routes/categories');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const PASSWORD = process.env.MONGO_PASSWORD;
const USER = process.env.MONGO_USER;
const { CLUSTER } = process.env;

require('./config/passport-config');

// initializePassport(passport);

const uri = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER}.xwt3f2h.mongodb.net/?retryWrites=true&w=majority`;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.set('strictQuery', false);
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
app.use(cors());
app.use(passport.initialize());
app.use('/', blogRoutes);
app.use('/categories', categoryRoutes);
app.use('/posts', postRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.listen(PORT, () => debug(`Server running on port: http://localhost:${chalk.green(PORT)}`));
