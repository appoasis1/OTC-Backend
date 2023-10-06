import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const { name, number, date, customer, bank, currency, cost_centre, series, items } = await readBody(event);

  let json = items.map((item) => ({
   
    item: item.Item,
    vehicle: item.Vehicle,
    quantity: item.Quantity,
    rate: item.Rate,
    amount: item.Amount,
    
  }));

  const createdInvoice = await prisma.invoice.create({
      data: {
        name: name,
        number: number,
        currency: currency,
        cost_center: cost_centre,
        series: series,
        date: date,
        customer: customer,
        bank: bank,
        items: json,
      },
    }).catch((error) => {
      console.error(error);
      return {
        success: false
      }
    });
    console.log("Items are", items);
    return {
      data: createdInvoice,
      success: true
    };
});