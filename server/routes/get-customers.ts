import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  var config = {
    method: 'get',
    url: 'https://murarecarrental.frappe.cloud/api/method/get-customers',
    headers: { 
      'Cookie': 'full_name=Guest; sid=Guest; system_user=yes; user_id=Guest; user_image='
    }
  };

  try {
    const response = await axios(config);
    const customersData = response.data.customers || [];

    //console.log("API Response:", response.data);
    //console.log("API Response:", customersData);

    const createdCustomers = [];

    for (const customer of customersData) {
      const createdCustomer = await prisma.customer.create({
        data: {
          name: customer.name,
          customer_name: customer.customer_name,
          email_id: customer.email_id,
          default_price_list: customer.default_price_list,
          default_currency: customer.default_currency,
          primary_address: customer.primary_address,
          customer_primary_contact: customer.customer_primary_contact,
        },
      });

      //console.log("Created customer:", createdCustomer);

      createdCustomers.push(createdCustomer);
    }

   // console.log("Created customers:", createdCustomers);

    return {
      success: true,
      data: createdCustomers,
    };
  } catch (error) {
    console.log(error);

    return {    
      success: false,
    };
  }
});