import { defineStore } from "pinia";
import axios from "axios";

export const useSeriesStore = defineStore('series', {
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
        async getSeries(){
   
               const config = {
                  method: 'post',
                  url: '/get-series',
                  headers: { 
                     'Accept': '/',
                     'Cache-Control': 'no-cache',
                     'Content-Type': 'application/json'
                  },
                
               }; 
    
               
               const result: any = await axios(config).then(function (response) {
                  console.log("Naming Series");
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

