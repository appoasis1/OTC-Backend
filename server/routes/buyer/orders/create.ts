import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const { number, buyer_id, vendor_id, items, supplier, address, phone, email, buyer, request_id, quotation_id, buyer_email, buyer_phone } = await readBody(event);
    
    let json = items.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      taxable: item.taxable,
    }));

    const [createOrder, updateQuotation] = await prisma.$transaction([
      prisma.order.create({
        data: {
          number: number,
          vendor_id: vendor_id,
          buyer_id: buyer_id,
          items: json,
          address: address,
          email: email,
          phone: phone,
          supplier: supplier,
          quotation_id: quotation_id,
          request_id: request_id, 
          buyer: buyer,
          accepted: "pending",
          buyer_email: buyer_email,
          buyer_phone: buyer_phone
        },
      }),
      prisma.quotation.update({
        where: {
          quotation_id: quotation_id,
        },
        data: {
          ordered: true,
        },  
      })
    ]);

    return {
      data: {
        createOrder,
        updateQuotation
      },
      success: true
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error.message
    };
  }
});
