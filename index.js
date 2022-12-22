import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
// eslint-disable-next-line import/no-extraneous-dependencies
import bodyParser from 'body-parser';
// eslint-disable-next-line import/extensions
import usersRoutes from './routes/users.js';

const app = express();
// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4000;

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public/')));
app.use(bodyParser.json());
app.use('/users', usersRoutes);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to Maven Fix' });
});

app.listen(PORT, () => debug(`Server running on port: http://localhost:${chalk.green(PORT)}`));
