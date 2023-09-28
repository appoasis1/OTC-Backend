import { defineStore } from "pinia";
import axios from "axios";

export const useSeriesStore = defineStore('series', {
    state: () => ({
      
        series: [],
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

         async listSeries() {
            try {
              const seriesList = await $fetch('/series-list', {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });
          
              this.series = seriesList;
              return seriesList;
            } catch (error) {
              console.error(error);
              throw error;
            }
          }
    }
});

