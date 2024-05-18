import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
    try {
        const { product_id } = await readBody(event);

        const getProductList = await prisma.product.findUnique({
            where: {
                product_id: product_id,
            },
        });

        return {
            data: getProductList,
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
