import { defineStore } from "pinia";
import axios from "axios";

export const useInvoiceStore = defineStore('invoice', {
    state: () => ({
        name: "",
        number: "",
        date: "",
        date_incoming: "",
        date_outgoing: "",
        opening_mileage: "",
        closing_mileage: "",
        actual_milege: "",
        total_free_mileage: "",
        chargeable_mileage: "",
        duration: "",
        rate: "",
        uom: "",
        selectedCustomer: "",
        selectedAccount: "",
        selectedVehicle: "",
        selectedItem: "",
        currency: "",
        cost_centre: "",
        series: "",
        taxable_amount: 0,
        non_taxable_amount: 0,
        grand_total: 0,
        total_charges: 0,
        advance_payment: 0,
        amount_due: 0,
        items: [],
        invoiceList: [],
    }),
    actions: {
        async createInvoice() {

            const data = { 
                name: "Invoice",
                number: "001",
                date: this.date,
                customer: this.selectedCustomer,
                bank: this.selectedAccount,
                currency: this.currency,
                cost_centre: this.cost_centre,
                series: this.series,
                items: this.items
            },
             config = {
                method: 'post',
                url: '/invoice/create',
                data: data,
                headers: { 
                    'Accept': '/',
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'
                },
               
            }; 
    
            const result = await axios(config).then(function (response) {
                console.log("Invoice created")  
                console.log(JSON.stringify(response.data));
                return {
                    data: response.data,
                    success: true
                }
            }).catch(function (error) {
                console.log(error);
                return {
                    success: false
                }
            });
   
            return result;
        },

        async listInvoice() {
            try {
              const invoiceList = await $fetch('/invoice/list', {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });
          
              this.invoiceList = invoiceList;
              console.log('store invoices ------>', invoiceList); 
              
              return invoiceList;
            } catch (error) {
              console.error(error);
              throw error;
            }
          },
    }
});