import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const { name, number, date, customer, bank, currency, cost_centre, series, items, taxable_amount, total_charges, non_taxable_amount, advance_payment, amount_due } = await readBody(event);

  let json = items.map((item) => ({
   
    item: item.item,
    vehicle: item.vehicle,
    quantity: item.quantity,
    rate: item.rate,
    amount: item.amount,
    chargeable_mileage: item.chargeable_mileage,
    opening_mileage: item.opening_mileage,
    closing_mileage: item.closing_mileage,
    actual_milege: item.actual_milege,
    total_free_mileage: item.total_free_mileage,
    uom: item.uom,
    date_outgoing: item.date_outgoing,
    date_incoming: item.date_incoming,
    duration: item.duration

    
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
        taxable_amount: taxable_amount,
        total_charges: total_charges,
        non_taxable_amount: non_taxable_amount,
        advance_payment: advance_payment,
        amount_due: amount_due,
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