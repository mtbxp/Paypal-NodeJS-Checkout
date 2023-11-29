import express from 'express'
import paymentRoutes from './routes/payments.routes.js';
import morgan from 'morgan';
import {PORT} from './config.js'
import path from 'path'


const app = express();
app.use(express.json());

app.use(morgan('dev'));

app.use(paymentRoutes);

app.use(express.static(path.resolve("./src/public")));

app.listen(PORT);
console.log(PORT);
