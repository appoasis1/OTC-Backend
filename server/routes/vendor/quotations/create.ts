import { prisma } from "~~/prisma/db";

function generateRefNumber(prefix = 'OTC', length = 8) {
  const randomNum = Math.floor(Math.random() * 10 ** length);
  return `${prefix}${randomNum.toString().padStart(length, '0')}`;
}

export default defineEventHandler(async (event) => {
  const { title, number, image, price, sub_total, total, terms_and_conditions, buyer_email, buyer_phone, request_id, buyer_id, vendor_id, items, supplier, address, phone, email, buyer } = await readBody(event);
  
  let json = items.map((item) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    taxable: item.taxable,
  }));

  const ref_number = generateRefNumber();

  const createQuotation = await prisma.quotation.create({
    data: {
      title: image,
      number: number,
      price: price,
      sub_total: sub_total,
      total: total,
      request_id: request_id,
      terms_and_conditions: terms_and_conditions,
      vendor_id: vendor_id,
      buyer_id: buyer_id,
      items: json,
      address: address,
      email: email,
      phone: phone,
      supplier: supplier,
      buyer_email: buyer_email,
      buyer_phone: buyer_phone,
      buyer: buyer,
      ref_number: ref_number
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
