import { defineStore } from "pinia";
import axios from "axios";

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
            const createMember = await axios.post('https://rapiso-backend.oacey.com/api/swagger/members/create/', {
                name: "Nyasha",
                surname: "Karata",
                national_id: "3887867654",
                date_of_birth: "2023-09-22T08:22:42.133000Z" ,
                sex: "male",
                phone: "077886564",
                email: "nyasha@gmail.com",
                home_address: "Harare"
            }, {
                headers: {
                    'accept': 'application/json', 
                      'Content-Type': 'application/json',
                         'X-CSRFToken': 'NMcimPVHOeQd41jNtS3S4xqfR0DmBbxg4dkEvDc1M5rv2OiCxXhGQyV4AHRFqSse',   
                         'Access-Control-Allow-Origin': '*'
                  },
            }).then(response => {
                return response.data;
            }).catch(error => {
                return error;
            });

            return createMember;
        },
    }
});