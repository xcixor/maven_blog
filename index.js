import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import dotenv from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import bodyParser from 'body-parser';
// eslint-disable-next-line import/extensions
import usersRoutes from './routes/users.js';

dotenv.config();

const app = express();
// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4000;

const PASSWORD = process.env.MONGO_PASSWORD;
const USER = process.env.MONGO_USER;
const { CLUSTER } = process.env;
const { DBNAME } = process.env;

// const dbUri = `mongodb+srv://${USER}:<${PASSWORD}>@${CLUSTER}.kpnelhi.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
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

// const db = mongoose.connection;
// db.on('error', debug(chalk.red('connection error: ')));
// db.once('open', () => {
//   debug(chalk.greenBright('Connected successfully'));
// });
// debug(db, '**');

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public/')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/users', usersRoutes);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to Maven Fix' });
});

app.listen(PORT, () => debug(`Server running on port: http://localhost:${chalk.green(PORT)}`));
