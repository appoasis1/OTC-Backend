import { defineStore } from "pinia";
import axios from "axios";
import currencyList from "~/server/routes/currency-list";

export const useCurrencyStore = defineStore('currency', {
    state: () => ({
      
        currencyList: [],
    }),
    actions: {
        async getCurrency(){
   
               const config = {
                  method: 'post',
                  url: '/get-currency',
                  headers: { 
                     'Accept': '/',
                     'Cache-Control': 'no-cache',
                     'Content-Type': 'application/json'
                  },
                
               }; 
    
               
               const result: any = await axios(config).then(function (response) {
                  console.log("Currencies");
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

         async listCurrency() {
            try {
              const currencyList = await $fetch('/currency-list', {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });
          
              this.currencyList = currencyList;
              return currencyList;
            } catch (error) {
              console.error(error);
              throw error;
            }
          }
    }
});

