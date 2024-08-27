import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
    },
    isDefault:{
     type: Boolean,
     required: true
    }
})

const CustomerSchema = new mongoose.Schema({
    userId:{type: String,required: true},
    firstName:{type:String,required:true},
    lastName:{type: String,required: true},
    addresses:{type: [addressSchema],required: true},
    address:{type:Array},
    email:{type:String,required:true},
    tenantId:{type: String,required: true}
},{timestamps: true})

const Customer =  mongoose.model('Customer',CustomerSchema);

export default Customer;