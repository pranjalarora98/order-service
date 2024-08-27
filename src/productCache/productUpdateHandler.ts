import productCacheModel from "./productCacheModel";

export const handleProductUpdate = async (value) => {
 const product = JSON.parse(value);
 return await productCacheModel.updateOne({productId:product});
}