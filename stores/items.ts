import { defineStore } from "pinia";
import axios from "axios";

export const useItemStore = defineStore('item', {
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
        async getItems() {
          var config = {
            method: 'get',
            url: 'https://murarecarrental.frappe.cloud/api/method/get-items',
        };
  
        const result: any = await axios(config).then(function (response) {
            return {
                data: response.data,
                success: true
             }
        })
        .catch(function (error) {
            console.log(error);
            return {
                success: false
                
             }
        });
        return result;
        },
    }
});

