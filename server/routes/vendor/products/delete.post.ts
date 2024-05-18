import { prisma } from "~~/prisma/db";
import bcrypt from "bcrypt";



export default defineEventHandler(async (event)=>{
    const { id } = await readBody(event);

    const deleteCategory = await prisma.product.delete({
        
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
        data: deleteCategory,
        success: true
    };
});

