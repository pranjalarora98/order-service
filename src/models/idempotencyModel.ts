import mongoose from "mongoose";

const IdempotencySchema = new mongoose.Schema({
  key:{
    type: String,
    required: true,
  },
  response:{
    type:Object,
    required: true,
  }
},{timestamps: true});

IdempotencySchema.index({createdAt:1},{expireAfterSeconds:20});
IdempotencySchema.index({key:1},{unique:true});

export default  mongoose.model('IdempotencySchema',IdempotencySchema);