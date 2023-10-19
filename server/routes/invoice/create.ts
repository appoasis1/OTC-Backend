import { prisma } from "~~/prisma/db";
import axios from "axios";

export default defineEventHandler(async (event) => {
  const { name, number, date, customer, bank, currency, cost_centre, destination, series, items, taxable_amount, total_charges, non_taxable_amount, advance_payment, amount_due, due_date, posting_date, selectedTerm, vat } = await readBody(event);

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
    date_outgoing: new Date(item.date_outgoing).toISOString().slice(0, 10),
    date_incoming: new Date(item.date_incoming).toISOString().slice(0, 10),
    duration: item.duration

  }));

  const postToERP = async () => {
    console.log("The postToERP function was called");      
          var data = JSON.stringify({
            "customer": customer,
            "posting_date": posting_date,
            "due_date" : due_date,     
            "cost_center": cost_centre,
            "currency" : currency,
            "items" : items,
            "bank" : bank,
            "destination": destination,
            "naming_series": name,
            "income_account": "Sales"
           
          });
          let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://murarecarrental.frappe.cloud/api/method/create-invoice',
      headers: { 
      'Content-Type': 'application/json', 
      'Cookie': 'full_name=Guest; sid=Guest; system_user=yes; user_id=Guest; user_image='
      },
      data : data
      };

      axios.request(config)
      .then((response) => {
      console.log(JSON.stringify("Invoice was sent", response.data));
      })
      .catch((error) => {
      console.log(error);
      });
  }
  console.log("Before calling postToERP");
  await postToERP();
  console.log("After calling postToERP");
  const createInvoice = await prisma.invoice.create({
   
      data: {
        name: name,
        number: number,
        currency: currency,
        cost_center: cost_centre,
        series: series,
        date: date,
        customer: customer,
        bank: bank,
        taxable_amount: taxable_amount,
        total_charges: total_charges,
        non_taxable_amount: non_taxable_amount,
        advance_payment: advance_payment,
        vat: vat,
        amount_due: amount_due,
        items: json,
        terms: selectedTerm,

      },
      
    }).catch((error) => {
      console.error(error);
      return {
        success: false
      }
    });
    //console.log("Items are", items);
   
    return {
      data: createInvoice,
      success: true
    };
});