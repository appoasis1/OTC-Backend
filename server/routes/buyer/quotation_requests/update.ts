// import { prisma } from "~~/prisma/db";

// export default defineEventHandler(async (event)=>{
//     const {id,  title,number,price, sub_total, total, quantity, terms_and_conditions } = await readBody(event);
    
//     let updateProduct: any = await prisma.quotation.update({
//         where: {
//             id: id
//         },
//         data: {
//             title: title,
//             number: number,
//             price: price,
//             sub_total: sub_total,
//             total: total,
//            // quantity: quantity, 
//             terms_and_conditions: terms_and_conditions
//         }
//     })
//     .catch((error)=>{
//         console.error(error);
//         return {
//             success: false
//         }
//     }); 

   

//     return {
//         data: updateProduct,
//         success: true
//     };
// });



//This endpoint will allow and existing buyer to send another quotation