import { prisma } from "~~/prisma/db";
import axios from "axios";

export default defineEventHandler(async (event) => {
  const { name, number, date, customer, bank, currency, valid_until, cost_centre, series, items, vat, cost_excluding_vat, buyer_email, buyer_phone cost_including_vat, total_costs, non_taxable_amount, selectedTerm } = await readBody(event);

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

  
  const postToERP = async () => {
    console.log("The postToERP function was called");      
          var data = JSON.stringify({
            "customer": customer, 
            "valid_till": valid_until, 
            "cost_center": cost_centre,
            "currency" : currency,
            "items" : items,
            "bank" : bank,
            "naming_series": name,
           
          });
          let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://murarecarrental.frappe.cloud/api/method/create-quotation',
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

  const createInvoice = await prisma.quotation.create({
      data: {
        name: name,
        number: number,
        currency: currency,
        cost_center: cost_centre,
        series: series,
        date: date,
        customer: customer,
        bank: bank,
        cost_including_vat: cost_including_vat,
        total_costs: total_costs,
        valid_until: valid_until,
        non_taxable_amount: non_taxable_amount,
        cost_excluding_vat: cost_excluding_vat,
        vat: vat,
        buyer_email: buyer_email,
        buyer_phone: buyer_phone,
        items: json,
        terms: selectedTerm,

      },
    }).catch((error) => {
      console.error(error);
      return {
        success: false
      }
    });
    console.log("Items are", items);
    return {
      data: createInvoice,
      success: true
    };
});