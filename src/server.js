import express from 'express'
import paymentRoutes from './routes/payments.routes';
import morgan from 'morgan';
import {PORT} from './config'
import path from 'path'

const app = express();
app.use(express.json());

app.use(morgan('dev'));

app.use(paymentRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT);
console.log(PORT);
