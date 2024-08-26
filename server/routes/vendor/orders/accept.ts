import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const { accepted, order_id, quotation_id } = await readBody(event);
    
    const [updateOrder, updateQuotation] = await prisma.$transaction([
      prisma.order.update({
        where: {
          order_id: order_id,
        },
        data: {
          accepted: accepted,
        },
      }),
      prisma.quotation.update({
        where: {
          quotation_id: quotation_id,
        },
        data: {
          accepted: accepted,
        },
      })
    ]);

    return {
      data: {
        order: updateOrder,
        quotation: updateQuotation,
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
