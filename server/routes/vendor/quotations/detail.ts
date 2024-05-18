import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const { quotationId } = await readBody(event);

  const quotation = await prisma.quotation.findUnique({
    where: {
      id: quotationId,
    },
    include: {
      quotationRequest: {
        include: {
          products: true,
        },
      },
    },
  }).catch((error) => {
    console.error(error);
    return {
      success: false,
    };
  });

  return {
    data: quotation,
    success: true,
  };
});