import { defineStore } from "pinia";
import axios from "axios";

export const useCurrencyStore = defineStore('currency', {
    state: () => ({
        name: "",
        surname: "",
        national_id: "",
        date_of_birth: "",
        sex: "",
        phone: "",
        email: "",
        home_address: "",
        items: [],
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
    }
});

