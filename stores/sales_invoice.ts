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
        customer_id: "",
        selectedCustomer: "",
        selectedAccount: "",
        selectedVehicle: "",
        selectedItem: "",
        bank_id: "",
        currency: "",
        cost_centre: "",
        series: "",
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
             // console.log(invoiceList);
              return invoiceList;
            } catch (error) {
              console.error(error);
              throw error;
            }
          },

          async  create(data){
             data = JSON.stringify({
                "data": data,
            });
            console.log(data)
            var config = {
                method: 'post',
                url: '/invoice/create/',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const result: any = await axios(config).then(function (response) {
                
                return {
                    data: response.data,
                    success: true
                 }
                 
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            
            return result;
        },
    }
});