import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
   cart:{
    type:Object,
    required: true
   },
   address:{
    type: String,
    required: true,
   },
   comment:{
    type: String,
    required: false
   },
   customerId:{
    type: String,
    required: true
   },
   deliveryCharges: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  taxes: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  tenantId: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
  },
  paymentMode: {
    type: String,
  },
  paymentStatus: {
    type: String,
  },
  paymentId: {
    type: String,
    required: false,
    default: null,
  },
},{timestamps: true})

export default mongoose.model('OrderSchema',orderSchema);