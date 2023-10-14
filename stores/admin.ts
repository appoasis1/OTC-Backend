import { defineStore } from 'pinia';
import axios from 'axios';

export const useAdminStore = defineStore('admin', {
    state: ()=>({
        
        name: "", 
        surname: "", 
        username: "",
        users: undefined,
        commodities: undefined,
        suppliers: undefined,
        selected_center: undefined,
        selectedCommodities: undefined,
        remainingBudget: 0,
        addresses: undefined,
        taxes: undefined,
        clerk_pending: undefined,
        requests: undefined,
        my_pending: undefined,
        is_co_approver: undefined,
        co_approved_count: undefined,
        single_request: undefined,
        selected_commodities: undefined,
        selected_buyer: undefined,
        buyer_id: undefined,
        buyers: undefined,
        user: undefined,
        centers: undefined,
        ledgers: undefined,
        phone: null, 
        email: null, 
        age: null,
        gender: null,
        profile: null,
        title:null,
        yearlyBudget: null,
        account_status: null,
        password: null,
        cost_id: null,
        budget_id: null,
        types: null,
        type: null,
        cost_commodities: null,
        budgets: [],
        originators: null,
        approvers: null

    }),
    getters: {},
    actions: {
        async  getUsers(){
            var config = {
                method: 'post',
                url: '/users/all',
                headers: { 
                    'Content-Type': 'application/json'
                }
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
            console.log({result})
            this.users = result?.data?.users
            return result;
        },
       
       
        async  getUser(id){
            var data = JSON.stringify({
                "id": id,
                });
            var config = {
                method: 'post',
                url: '/users/single',
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
                 
                 
            })
            .catch(function (error) {
                console.log(error);
                return {
                    success: false
                 }
            });
            console.log({result})
            this.user = result?.data?.user
            return result;
        },
       
        
            
        
        async  getAllUsers(){
            var config = {
                method: 'post',
                url: '/users/all',
                headers: { 
                    'Content-Type': 'application/json'
                }
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
            this.users = result?.data?.users
            console.log("mbilimbi wadii",result)

            return result;
            
        },
        
      async  registerUser(){
            var data = JSON.stringify({
            "name": this.name,
            "surname": this.surname,
            "username": this.username,
            "phone": this.phone,
            "profile": this.profile,
            "email": this.email,
            "title":  this.title,
            "age": this.age,
            
            
            "password": this.password
            });

            var config = {
                method: 'post',
                url: '/auth/register',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
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
   })