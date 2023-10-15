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

    const createdCustomers = [];

    for (const customer of customersData) {
      if (!customer.name) {
        continue;
      }

      const existingCustomer = await prisma.customer.findFirst({
        where: { name: customer.name },
      });

      if (existingCustomer) {
        console.log(`Customer with name ${customer.name} already exists. Skipping creation.`);
        continue;
      }

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

      createdCustomers.push(createdCustomer);
    }

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