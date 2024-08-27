import couponModel from "../models/couponModel";
import { Request,Response } from "express";

export class couponController {

  async createCoupon(req:Request,res:Response){
   const {title,code,discount,validTo,tenantId} = req.body;
   const newCoupon = await couponModel.create({title,code,discount,validTo,tenantId});  
   return res.status(200).json({newCoupon}); 
  }
  
  async getList(req:Request,res:Response) {
   const couponList = await couponModel.find({});
   return res.status(200).json({couponList});
  }

  async updateCoupon(req:Request,res:Response) {
    const {id} = req.params; 

    const {title,code,discount,validTo,tenantId} = req.body;
    
    const currentCoupon = couponModel.findById(id);

    const newCoupon = await currentCoupon.updateOne({title,code,discount,validTo,tenantId});
    
    return res.status(200).json({newCoupon});
   }

   async deleteCoupon(req:Request,res:Response) {
    const {id} = req.params;
    await couponModel.findByIdAndDelete(id);
    return res.status(200).json({msg:'success'});    
   }

   
}

export default couponController;