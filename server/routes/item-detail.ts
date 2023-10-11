import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const {selectedVehicle} = await readBody(event);
    
    const item = await prisma.item.findFirst({
      where: { 
        item_code: selectedVehicle
     },
    });

    if (!item) {
      return {
        data: null,
        message: "Item not found",
        error: true,
        success: false,
      };
    }
    console.log(item);
    return {
      data: {item_name: item.item_name, stock_uom: item.stock_uom },
      message: "Item found",
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