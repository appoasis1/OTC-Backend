import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    try {
        const termList = await prisma.terms.findMany();
        
        return {
            data: termList,
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