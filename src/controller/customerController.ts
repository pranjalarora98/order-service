import { CustomerService } from "../services/customerService";

export class CustomerController {
     customerService;

    constructor(customerService){
    this.customerService = customerService;
    }

     getCustomer = async(req,res)=>{
          const {sub:userId,firstName,lastName,email,tenantId} = req.auth;
          const res1 = await this.customerService.create(userId,firstName,lastName,email,tenantId);
          res.status(200).json(res1);
    }

    addAddress = async(req,res)=>{
       const {id} = req.params;
       const {addresses} = req.body;
       const res1 = await this.customerService.addAddress(addresses);

     }
}