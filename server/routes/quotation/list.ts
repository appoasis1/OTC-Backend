// import { prisma } from "~~/prisma/db";

// export default defineEventHandler(async (event)=>{
//     try {
//         const quotationList = await prisma.quotation.findMany();
        
//         return {
//             data: quotationList,
//             message: null,
//             error: false,
//             success: true
//         }
//     } catch (error) {
//         return {
//             data: [],
//             message: error,
//             error: true,
//             success: false
//         }
//     }
// })