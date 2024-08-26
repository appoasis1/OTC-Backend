import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
    try {
        const { vendor_id } = await readBody(event);

        const getOrders = await prisma.order.findMany({
            where: {
                vendor_id: vendor_id,
            },
        });

        return {
            data: getOrders,
            message: null,
            error: false,
            success: true,
        };
    } catch (error) {
        return {
            data: [],
            message: error,
            error: true,
            success: false,
        };
    }
});
