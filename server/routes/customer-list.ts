import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    try {
        const customerList = await prisma.customer.findMany();
        
        return {
            data: customerList,
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