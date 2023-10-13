import { defineStore } from "pinia";
import axios from "axios";


export const useInvoiceStore = defineStore('invoice', {
    state: () => ({
        name: "",
        number: "",
        date: new Date(),
        posting_date: "",
        due_date: "",
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
        selectedTerm: "",
        selectedItem: "",
        currency: "",
        cost_centre: "",
        series: "",
        taxable_amount: 0,
        non_taxable_amount: 0,
        vat: 0,
        total_charges: 0,
        advance_payment: 0,
        amount_due: 0,
        items: [],
        invoiceList: [],
    }),
    actions: {
        async createInvoice() {

            const data = { 
                name: "Sales Invoice",
                number: "001",
                date: this.date,
                customer: this.selectedCustomer,
                bank: this.selectedAccount,
                currency: this.currency,
                cost_centre: this.cost_centre,
                series: this.series,
                items: this.items,
                selectedTerm: this.selectedTerm,
                taxable_amount: this.taxable_amount,
                vat: this.vat,
                total_charges: this.total_charges,
                non_taxable_amount: this.non_taxable_amount,
                advance_payment: parseFloat(this.advance_payment),
                amount_due: this.amount_due
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
          async detailInvoice (id) {
            console.log('iiii',id)
            var data = JSON.stringify({
                "id": id
            })
            
          const config = {
            method: 'post',
            url: '/invoice/detail',
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
         }).catch(function (error) {
            console.log(error);
   
            return {
               success: false
            }
         }); 
         
         
         return result; 
      },
    }
});