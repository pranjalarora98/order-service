import config from 'config';
import { paymentTypes } from "./paymentTypes";
import Stripe from 'stripe';

export class StripeController implements paymentTypes {
    
    private stripe;
    
    constructor(){
        this.stripe = new Stripe(config.get('stripe.security'))
    }

    async createSession(options) {
        const session = await this.stripe.checkout.sessions.create({
            metadata:{
                orderId:options.orderId
            },
            line_items:[{
                       price_data:{
                        unit_amount: options.amount * 100,
                        product_data:{
                            name:'dssd',
                            description:'dfdf',
                            images:['dfdf']
                        },
                        currency:options.currency || 'inr'
                       },
                       quantity: 1
            }],
            mode:"payment",
            success_url:`http:localhost:3000/payment?success=true&orderId=${options.orderId}`,
            cancel_url:`http:localhost:3000/payment?success=false&orderId=${options.orderId}`,
        },{idempotencyKey:options.idempotencyKey});

     return {
        id: session.id,
        paymentUrl: session.url,
        paymentStatus: session.payment_status
     }

     return null;
    }

    async getSession() {
        return null;
    }

}