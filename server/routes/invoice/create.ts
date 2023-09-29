import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const { name, number, date, customer_id, bank_id, currency, cost_centre, series, items } = await readBody(event);

  const createdInvoice = await prisma.invoice.create({
    data: {
      name: name,
      number: number,
      currency: currency,
      cost_center: cost_centre,
      series: series,
      date: date,
      customer: {
        connect: { id: customer_id }
      },
      bank: {
        connect: { id: bank_id }
      },
      items: {
        connect: items.map((item) => ({ id: item.id })),
      },
    },
  }).catch((error) => {
    console.error(error);
    return {
      success: false
    }
  });

  return {
    data: createdInvoice,
    success: true
  };
});