import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const { title, number, price, sub_total, total, terms_and_conditions, request_id, buyer_id, vendor_id, } = await readBody(event);
  const items = [
    { product_id: 3, quantity: 2 },
    { product_id: 1, quantity: 11 },
    { product_id: 18, quantity: 2 },
    // Add more items as needed
  ];
  
  let json = items.map((item) => ({
    product_id: item.product_id,
    quantity: item.quantity,
  }));


  const createQuotation = await prisma.quotation.create({
    data: {
      title: title,
      number: number,
      price: price,
      sub_total: sub_total,
      total: total,
      request_id: request_id,
      terms_and_conditions: terms_and_conditions,
      vendor_id: vendor_id,
      buyer_id: buyer_id,
      items: json,
    },
  }).catch((error) => {
    console.error(error);
    return {
      success: false
    }
  });

  return {
    data: createQuotation,
    success: true
  };
});