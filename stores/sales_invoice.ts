import { defineStore } from "pinia";
import axios from "axios";

export const useInvoiceStore = defineStore('invoice', {
    state: () => ({
        name: "",
        number: "",
        date: "",
        customer_id: "",
        selectedCustomer: "",
        selectedAccount: "",
        bank_id: "",
        currency: "",
        cost_centre: "",
        series: "",
        items: [],
        invoiceList: [],
    }),
    actions: {
        async createInvoice() {
            const { name, number, date, customer_id, bank_id, currency, cost_centre, series, items } = this.$state;
            
            const config = {
                method: 'post',
                url: '/invoice/create',
                headers: { 
                    'Accept': '/',
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'
                },
                data: {
                    name: name,
                    number: number,
                    date: date,
                    customer_id: customer_id,
                    bank_id: bank_id,
                    currency: currency,
                    cost_centre: cost_centre,
                    series: series,
                    items: items,
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
          }
    },
    getters: {
        getItems() {
            return this.$state.items;
        },
    }
});