import productCacheModel from "./productCacheModel";

export const handleProductUpdate = async (value) => {
    console.log('handle',value);
 const product = JSON.parse(value);
 return await productCacheModel.updateOne({productId:product.id},{$set:{priceConfiguration:product.priceConfiguration}},{upsert:true} );
}