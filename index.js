import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';


const app = express();
const PORT = 5000;

app.use(morgan('tiny'));

app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.get('/', (req, res)=> {
    res.send('Hello from xcixor')
});

app.listen(PORT, ()=> debug(`Server running on port: http://localhost:${chalk.green(PORT)}` ));
