import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const { name, number, date, customer, bank, currency, cost_centre, series, items } = await readBody(event);

  const createdInvoice = await prisma.invoice.create({
      data: {
        name: name,
        number: number,
        currency: currency,
        cost_center: cost_centre,
        series: series,
        date: date,
        customer: customer,
        bank: bank
        // items: {
        //   connect: items.map((item) => ({ id: item.id })),
        // },
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