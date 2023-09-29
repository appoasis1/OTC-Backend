import { defineStore } from "pinia";
import axios from "axios";

export const useCustomerStore = defineStore('customer', {
    state: () => ({
     
        customerList: [],
    }),
    actions: {
        async getCustomers(){
   
               const config = {
                  method: 'post',
                  url: '/get-customers',
                  headers: { 
                     'Accept': '/',
                     'Cache-Control': 'no-cache',
                     'Content-Type': 'application/json'
                  },
                
               }; 
    
               
               const result: any = await axios(config).then(function (response) {
                  console.log("Customers");
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

         
         async listCustomers() {
            try {
              const customerList = await $fetch('/customer-list', {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });
          
              this.customerList = customerList;
             // console.log(customerList);
              return customerList;
            } catch (error) {
              console.error(error);
              throw error;
            }
          }
    }
});

