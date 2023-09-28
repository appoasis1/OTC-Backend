import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    try {
        const accountstList = await prisma.bank.findMany();
        
        return {
            data: accountstList,
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