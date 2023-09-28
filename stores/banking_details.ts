import { defineStore } from "pinia";
import axios from "axios";

export const useBankStore = defineStore('BankAccount', {
    state: () => ({
        accountsList: [],
    }),
    actions: {
        async getBanks(){
   
               const config = {
                  method: 'post',
                  url: '/get-banking',
                  headers: { 
                     'Accept': '/',
                     'Cache-Control': 'no-cache',
                     'Content-Type': 'application/json'
                  },
                
               }; 
    
               
               const result: any = await axios(config).then(function (response) {
                  console.log("Bank Accounts");
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

         async listAccounts() {
            try {
              const accountsList = await $fetch('/bank-list', {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });
          
              this.accountsList = accountsList;
              return accountsList;
            } catch (error) {
              console.error(error);
              throw error;
            }
          }
    }
});

