import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  var config = {
    method: 'get',
    url: 'https://murarecarrental.frappe.cloud/api/method/get-items',
    headers: { 
      'Cookie': 'full_name=Guest; sid=Guest; system_user=yes; user_id=Guest; user_image='
    }
  };

  try {
    const response = await axios(config);
    const itemsData = response.data.items || [];

    const createdItems = [];

    if (!Array.isArray(itemsData)) {
      console.log("Invalid itemsData format:", itemsData);
      return {
        success: false,
        message: "Invalid itemsData format",
      };
    }

    for (const item of itemsData) {
      if (!item.item_code) {
        continue;
      }

      const createdItem = await prisma.item.create({
        data: {
          item_code: item.item_code,
          item_name: item.item_name,
          item_group: item.item_group,
          stock_uom: item.stock_uom,
          description: item.description,
        },
      });

      createdItems.push(createdItem);
    }

    return {
      success: true,
      data: createdItems,
    };
  } catch (error) {
    console.log(error);

    return {    
      success: false,
    };
  }
});