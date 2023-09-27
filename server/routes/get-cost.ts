import axios from "axios";

export default defineEventHandler(async (event)=>{
  

    var config = {
        method: 'get',
        url: 'https://murarecarrental.frappe.cloud/api/method/get-cost-centres',
        headers: { 
            'Cookie': 'full_name=Guest; sid=Guest; system_user=yes; user_id=Guest; user_image='
        }
    };
        
    const result = await axios(config)
    .then(function (response) {
        const result = response.data;

        return {
            success: true,
            data: result
            
        };
    }) .catch(async (error)=>{
        console.log(error);
            
        return {    
            success: false
        } 
    });
    
    return result;
});
 