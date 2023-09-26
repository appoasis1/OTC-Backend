import { defineStore } from "pinia";
import axios from "axios";

export const useBankingStore = defineStore('banking', {
    state: () => ({
        name: "",
        surname: "",
        national_id: "",
        date_of_birth: "",
        sex: "",
        phone: "",
        email: "",
        home_address: "",
        dependants: [],
    }),
    actions: {
        async getBankAccounts() {
            try {
              const productList = await $fetch('/vendor_management/products/list', {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });
          
              this.productList = productList;

             // console.log(productList)
              return productList;
            } catch (error) {
              console.error(error);
              throw error;
            }
          },
    }
});