import { defineStore } from "pinia";
import axios from "axios";

export const useQuotationStore = defineStore('quotation', {
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
        quotationList: null,
    }),
    actions: {
        async createInvoice() {
            const { name, number, date, customer_id, currency, series, items } = this.$state;
            
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
                    currency: currency,
                    series: series,
                    items: items,
                },
            }; 
    
            const result = await axios(config).then(function (response) {
                console.log("quotation created")  
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

        async listQuotation() {
            try {
              const quotationList = await $fetch('/quotation/list', {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });
          
              this.quotationList = quotationList;
             console.log('Qoutation list --->',quotationList); 
              return quotationList;
            } catch (error) {
              console.error('exited with error --->',error);
              throw error;
            }
          }
    }
});