import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
    try {
        const { buyer_id } = await readBody(event);

        const getBuyer = await prisma.buyer.findUnique({
            where: {
                buyer_id: buyer_id,
            },
        });

        return {
            data: getBuyer,
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
