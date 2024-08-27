import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId:{
    type: String,
    required: true
  },
  productConfiguration:{
    type: Object,
    required: true,
  }
})

export default mongoose.model('productCache',productSchema);