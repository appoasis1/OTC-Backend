import { prisma } from "~~/prisma/db";
import bcrypt from "bcrypt";



export default defineEventHandler(async (event)=>{
    const { id } = await readBody(event);

    const deletequotationRequest = await prisma.quotationRequest.delete({
        
        where:{
            id: id
        }
       
    }).catch((error)=>{
        console.error(error);
        return {
            success:false
        }
        
    });

    return {
        data: deletequotationRequest,
        success: true
    };
});

