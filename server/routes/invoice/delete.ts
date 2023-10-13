import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
    const {id} = await readBody(event)
  try {
    
    await prisma.invoice.delete({
      where: {
        id: id,
      },
    });

    return {
      data: null,
      message: "Invoice deleted successfully",
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