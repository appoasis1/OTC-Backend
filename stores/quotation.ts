import { defineStore } from "pinia";
import axios from "axios";

export const useQuotationStore = defineStore('quotation', {
    state: () => ({
        name: "",
        number: "",
        date: new Date(),
        date_incoming: "",
        date_outgoing: "",
        valid_until: "",
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
        cost_excluding_vat: 0,
        cost_including_vat: 0,
        total_costs: 0,
        vat: 0,
        non_taxable_amount: 0,
        grand_total: 0,
        total_charges: 0,
        advance_payment: 0,
        amount_due: 0,
        items: [],
        quotationList: [],
    }),
    actions: {
        async createQuotation() {

            const data = { 
                name: this.name,
                number: "001",
                date: this.date,
                valid_until: this.valid_until,
                customer: this.selectedCustomer,
                bank: this.selectedAccount,
                currency: this.currency,
                cost_centre: this.cost_centre,
                series: this.series,
                terms: this.selectedTerm,
                vat: this.vat,
                total_costs: this.total_costs,
                non_taxable_amount: this.non_taxable_amount,
                cost_excluding_vat: this.cost_excluding_vat,
                cost_including_vat: this.cost_including_vat,
                items: this.items
            },
             config = {
                method: 'post',
                url: '/quotation/create',
                data: data,
                headers: { 
                    'Accept': '/',
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'
                },
               
            }; 
    
            const result = await axios(config).then(function (response) {
                console.log("Quotation created")  
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
             // console.log(invoiceList);
              return quotationList;
            } catch (error) {
              console.error(error);
              throw error;
            }
          },
          async detailQuote (id) {
            console.log('iiii',id)
            var data = JSON.stringify({
                "id": id
            })
            
          const config = {
            method: 'post',
            url: '/quotation/detail',
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