import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const {selectedCustomer} = await readBody(event);// Retrieve the selected customer name from the query string
    //console.log("Customer", selectedCustomer);
    const customer = await prisma.customer.findFirst({
      where: { 
        customer_name: selectedCustomer
     },
    });

    if (!customer) {
      return {
        data: null,
        message: "Customer not found",
        error: true,
        success: false,
      };
    }
    console.log(customer);
    return {
      data: customer.primary_address,
      message: "Customer found",
      error: false,
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: error.message,
      error: true,
      success: false,
    };
  }
});