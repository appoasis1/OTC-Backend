import { prisma } from "~~/prisma/db";
import axios from "axios";

export default defineEventHandler(async (event) => {
  const { subject, short_id, vendor_id, buyer_id, total, buyer, items } = await readBody(event);

  let json = items.map((item) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    taxable: item.taxable,
  }));

    const createRequest = await prisma.qRequest.create({
      data: {
        short_id: short_id,
        subject: subject,
        vendor_id: vendor_id,
        buyer_id: buyer_id,
        buyer: buyer,
        total: total,
        items: json,
      },
    }).catch((error) => {
      console.error(error);
      return {
        success: false,
      };
    });
    
    return {
      data: createRequest,
      success: true,
    };
  
});