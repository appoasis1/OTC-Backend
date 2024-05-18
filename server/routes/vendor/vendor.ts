import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
    try {
        const { vendor_id } = await readBody(event);

        const getVendor = await prisma.vendor.findUnique({
            where: {
                vendor_id: parseInt(vendor_id),
            },
        });

        return {
            data: getVendor,
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
