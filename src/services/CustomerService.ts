import Customer from "../models/customerModel";

export class CustomerService {
   
    async create(userId,firstName,lastName,email,tenantId,addresses){
        const customer = Customer.findOne(userId);
        if(!customer){
            const newCustomer = Customer.create({firstName,lastName,email,tenantId,addresses});
            return newCustomer;
        } 

        return customer;
    }

}