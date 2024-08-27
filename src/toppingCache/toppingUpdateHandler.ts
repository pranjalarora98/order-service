import toppingCacheModel from "./toppingCacheModel";

export const handleToppingUpdate = async(value) => {
    const product = JSON.parse(value);
    return await toppingCacheModel.updateOne({product});
}