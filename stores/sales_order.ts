import { defineStore } from "pinia";
import axios from "axios";

export const useOrderStore = defineStore('order', {
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
        orderList: [],
    }),
    actions: {
        async createOrder() {

            const data = { 
                name: "Order",
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
                url: '/order/create',
                data: data,
                headers: { 
                    'Accept': '/',
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'
                },
               
            }; 
    
            const result = await axios(config).then(function (response) {
                console.log("Order created")  
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

        async listOrder() {
            try {
              const orderList = await $fetch('/order/list', {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });
          
              this.orderList = orderList;
             // console.log(invoiceList);
              return orderList;
            } catch (error) {
              console.error(error);
              throw error;
            }
          },
    }
});