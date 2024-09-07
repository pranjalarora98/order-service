import express, { Request, Response } from "express";
import { globalErrorHandler } from "./common/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";
import customerRouter from "./router/customerRouter";
import {CustomerController} from '../src/controller/customerController';
import { CustomerService } from "./services/customerService";
import CouponController from "./controller/couponController";
import { OrderController } from "./controller/OrderController";
import { PaymentController } from "./controller/PaymentController";
import paymentRouter from './router/paymentRouter';
import { StripeController } from "./payment/stripe";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(customerRouter);
app.use(paymentRouter);

const customerService = new CustomerService();
const customerController = new CustomerController(customerService);
const stripe = new StripeController();

const orderController = new OrderController(stripe);
const paymentController = new PaymentController();

const couponController = new CouponController();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from order service service!" });
});

app.get('/customer',customerController.getCustomer);

app.get('/addAddress',customerController.addAddress);

app.post('/coupon/create',couponController.createCoupon);

app.get('/coupon/list',couponController.getList);

app.get('/coupon/update',couponController.updateCoupon);

app.delete('/coupon/delete',couponController.deleteCoupon);

app.post('/order/create',orderController.create);

app.post('/payment/create',paymentController.webHook)

app.use(globalErrorHandler);

export default app;
