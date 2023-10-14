import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    try {
        const invoiceList = await prisma.invoice.findMany();
        
        return {
            data: invoiceList,
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