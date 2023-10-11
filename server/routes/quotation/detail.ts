// import { prisma } from "~~/prisma/db";

// export default defineEventHandler(async (event) => {
//   const response = {};
//   try {
    
//     const {id} = await readBody(event);
    
//     const invoice = await prisma.invoice.findUnique({
//       where: { 
//         id: id
//      },
//     });

//     response['invoice'] = invoice
//     console.log(response.data.invoice.name);
//     response['success'] = true

//   } catch (error) {
//     response['success'] = false
//     response['message'] = error.toString()
//   };

// return response;
// });









import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const {id} = await readBody(event);
    
    const invoice = await prisma.invoice.findUnique({
      where: { 
        id: id
     },
    });
    console.log("my object", invoice);
    if (!invoice) {
      return {
        data: null,
        message: "Invoice not found" + id, 
        error: true,
        success: false,
      };
    }
    //console.log(invoice);
   // console.log("ID is", id);
    return {
      data: {title:invoice.name, cost_center: invoice.cost_center, currency: invoice.currency, date: invoice.date, customer: invoice.customer },
      message: "Inovice found",
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