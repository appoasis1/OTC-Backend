import { prisma } from "~~/prisma/db";
import axios from "axios";

export default defineEventHandler(async (event) => {
  const { vendor_id, buyer_id, items, vendor_name, product_id } = await readBody(event);

  // Check if a shortlist with the specified vendor_id and buyer_id exists
  const existingShortList = await prisma.short.findFirst({
    where: {
      vendor_id: vendor_id,
      buyer_id: buyer_id,
    },
  });

  if (existingShortList) {
    console.log(`Shortlist with vendor_id ${vendor_id} and buyer_id ${buyer_id} exists.`);
    return {
      short_id: existingShortList.short_id, // Return the short_id of the existing shortlist
      success: true,
    };
  } else {
    console.log(`Shortlist with vendor_id ${vendor_id} and buyer_id ${buyer_id} does not exist.`);
  }

  let json = items.map((item) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  if (existingShortList) {
    // Shortlist already exists, update it
    let updateShortList = await prisma.short.update({
      where: {
        short_id: existingShortList.short_id,
      },
      data: {
        items: json,
      },
    }).catch((error) => {
      console.error(error);
      return {
        success: false,
      };
    });

    return {
      data: updateShortList,
      success: true,
    };
  } else {
    // Shortlist doesn't exist, create a new one
    const createShortList = await prisma.short.create({
      data: {
        vendor_id: vendor_id,
        buyer_id: buyer_id,
        name: vendor_name,
        product_id: product_id,
        items: json,
      },
    }).catch((error) => {
      console.error(error);
      return {
        success: false,
      };
    });

    return {
      data: createShortList,
      success: true,
    };
  }
});