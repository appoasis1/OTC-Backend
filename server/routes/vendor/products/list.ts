import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    try {
        const getProductList = await prisma.product.findMany();
        
        return {
            data: getProductList,
            message: null,
            error: false,
            success: true
        }
    } catch (error) {
        return {
            data: [],
            message: error,
            error: true,
            success: false
        }
    }
})