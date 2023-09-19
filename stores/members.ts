import { defineStore } from "pinia";

export const useMemberStore = defineStore('member', {
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
        async create(){
            const createMember = await $fetch('', { 
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: this.name,
                        surname: this.surname,
                        national_id: this.national_id,
                        date_of_birth: this.date_of_birth,
                        sex: this.sex,
                        phone: this.phone,
                        email: this.email,
                        home_address: this.home_address
                    })
            }).then((data)=>{ 
                return data;
            }).catch((error)=>{
                return error
            });

            return createMember;
        },   
    }
});

