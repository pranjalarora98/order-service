import mongoose from "mongoose";
import idempotencyModel from "../models/idempotencyModel";
import orderModel from "../models/orderModel";
import { paymentTypes } from "../payment/paymentTypes";

export class OrderController {

  constructor(private paymentGW:paymentTypes){
   this.paymentGW = paymentGW;
  }
  
    async create(req,res){
        const {
              cart,address,comment,customerId,deliveryCharges,discount,taxes,total,tenantId,orderStatus,paymentMode,paymentStatus,paymentId
        } = req.body;
        
        const IdempotencyKey = req.headers["idempotency-key"];


        const idempotency = await idempotencyModel.findOne({key:IdempotencyKey});
        console.log('idem',idempotency);
        let result;
        if(!idempotency){
          
        console.log('ggha',IdempotencyKey);
           const  session = await mongoose.startSession();
           await session.startTransaction();
           
           try{
             result = await orderModel.create([{cart,address,comment,customerId,deliveryCharges,discount,taxes,total,tenantId,orderStatus,paymentMode,paymentStatus,paymentId}],{session});
            await idempotencyModel.create({key:IdempotencyKey,response:result},{session})
            await session.commitTransaction();
          } catch(err){
               await session.abortTransaction();
               await session.endSession();
           }

        }
        
        
        const session = this.paymentGW.createSession({
          amount:20,
          orderId:'13323',
          tenantId:'3223',
          currency:'inr',
        })

      return res.status(200).json({session});
    }

}