import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
    try {
        const allBuyers = await prisma.buyer.findMany();

        return {
            data: allBuyers,
            message: null,
            error: false,
            success: true,
        };
    } catch (error) {
        return {
            data: [],
            message: error.message || "An error occurred",
            error: true,
            success: false,
        };
    }
});
