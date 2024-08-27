import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    code:{
        type: String,
        required: true,
    },
    discount:{
        type: Number,
        required: true,
    },
    validTo:{
        type: Date,
        required: true
    },
    tenantId:{
        type: Number,
        required: true,
    }
})

const couponModel = mongoose.model('Coupon',couponSchema);

export default couponModel;