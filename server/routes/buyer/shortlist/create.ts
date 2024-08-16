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

  // Map the new items to the desired structure
  let newItems = items.map((item) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    taxable: item.taxable,
  }));

  if (existingShortList) {
    console.log(`Shortlist with vendor_id ${vendor_id} and buyer_id ${buyer_id} exists.`);
    console.log("updating");

    // Combine existing items with new items
    let updatedItems = [...existingShortList.items, ...newItems];

    // Remove duplicates based on item name
    updatedItems = updatedItems.reduce((acc, current) => {
      const x = acc.find(item => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      } else {
        // If item already exists, update its properties
        x.price = current.price;
        x.quantity = current.quantity;
        x.taxable = current.taxable;
        return acc;
      }
    }, []);

    // Combine existing product_id with new product_ids
    let updatedProductIds = [
      ...existingShortList.product_id, // Existing product_id JSON array
      ...product_id, // New product_id array from the request
    ];

    // Remove duplicates from product_ids based on 'id'
    updatedProductIds = updatedProductIds.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      }
      return acc;
    }, []);

    // Update the existing shortlist with new items and appended product_ids
    let updateShortList = await prisma.short.update({
      where: {
        short_id: existingShortList.short_id,
      },
      data: {
        items: updatedItems,
        product_id: updatedProductIds, // Save the combined and deduplicated product_ids
      },
    }).catch((error) => {
      console.error(error);
      return {
        success: false,
      };
    });

    return {
      data: updateShortList,
      short_id: existingShortList.short_id,
      success: true,
    };
  } else {
    console.log(`Shortlist with vendor_id ${vendor_id} and buyer_id ${buyer_id} does not exist.`);
    
    // Shortlist doesn't exist, create a new one
    const createShortList = await prisma.short.create({
      data: {
        vendor_id: vendor_id,
        buyer_id: buyer_id,
        name: vendor_name,
        product_id: product_id, // Directly assigning the JSON data
        items: newItems,
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
