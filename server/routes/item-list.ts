import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    try {
        const itemList = await prisma.item.findMany();
        
        return {
            data: itemList,
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