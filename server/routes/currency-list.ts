import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    try {
        const currencyList = await prisma.currency.findMany();
        
        return {
            data: currencyList,
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