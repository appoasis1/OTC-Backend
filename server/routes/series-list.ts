import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    try {
        const seriesList = await prisma.series.findMany();
        
        return {
            data: seriesList,
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