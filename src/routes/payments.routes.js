import {Router} from 'express'
import {onApprove, createOrder, cancelOrder} from '../controller/payment.controller.js'
const router = Router();

router.post('/create-order', createOrder);

router.get('/onapprove', onApprove);

router.get('/cancel-order', cancelOrder);

export default router;
