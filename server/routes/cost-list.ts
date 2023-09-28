import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    try {
        const costList = await prisma.cost.findMany();
        
        return {
            data: costList,
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