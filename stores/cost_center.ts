import { defineStore } from "pinia";
import axios from "axios";

export const useCostStore = defineStore('Cost', {
    state: () => ({
        costList: [],
    }),
    actions: {
        async getCostCenters(){
   
               const config = {
                  method: 'post',
                  url: '/get-cost',
                  headers: { 
                     'Accept': '/',
                     'Cache-Control': 'no-cache',
                     'Content-Type': 'application/json'
                  },
                
               }; 
    
               
               const result: any = await axios(config).then(function (response) {
                  console.log("Cost centers");
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
         async listCostCenters() {
            try {
              const costList = await $fetch('/cost-list', {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });
          
              this.costList = costList;
              return costList;
            } catch (error) {
              console.error(error);
              throw error;
            }
          }
    }
});

