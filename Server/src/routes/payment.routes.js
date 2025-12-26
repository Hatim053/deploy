import { Router } from "express"
import { authenticateSeller } from '../middlewares/authentication.js'
import { AuthorizedSeller } from '../middlewares/authorization.js'
import {
       handleGenerateOrderId,
       handleValidateAndSaveTransaction,
       handleFailedTransaction,
       handlleFetchTransactions,
       } from '../controllers/payment.controller.js'


const paymentRoutes = Router();

paymentRoutes.post('/create-order' , authenticateSeller ,  handleGenerateOrderId)
paymentRoutes.post('/validate-transaction' , authenticateSeller , handleValidateAndSaveTransaction)
paymentRoutes.post('/failed-transaction' , handleFailedTransaction)
paymentRoutes.get('/fetch-transactions' , authenticateSeller , handlleFetchTransactions)

// callback helper route for razorpay checkout redirection
paymentRoutes.post("/payment/payment-success", (req, res) => {
  res.redirect(`${process.env.CLIENT_SIDE_URL}/profile-feed/payment-history`);
})


export default paymentRoutes