import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
    try {
        const vendors = await prisma.vendor.findMany();

        return {
            data: vendors,
            message: null,
            error: false,
            success: true,
        };
    } catch (error) {
        return {
            data: [],
            message: error.message || 'An error occurred',
            error: true,
            success: false,
        };
    }
});
