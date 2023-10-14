import { defineStore } from "pinia";
import axios from "axios";


export const useTermStore = defineStore('terms', {
    state: () => ({
        term: "",
    }),
    actions: {
        async createTerm() {

            const data = { 
                term: this.term
            },
             config = {
                method: 'post',
                url: '/terms/create',
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