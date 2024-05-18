import { prisma } from "~~/prisma/db";
import axios from "axios";

export default defineEventHandler(async (event) => {
  const { buyer_id, firstName, lastName, email, phone, address, gender, password } = await readBody(event);

  const updateBuyer = await prisma.buyer.update({
    where: {
      buyer_id: parseInt(buyer_id),
    },
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      address_line1: address,
      // gender: gender,
    },
  }).catch((error) => {
    console.error(error);
    return {
      success: false
    };
  });

  return {
    data: updateBuyer,
    success: true
  };
});