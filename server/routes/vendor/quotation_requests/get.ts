import { registerRuntimeCompiler } from "nuxt/dist/app/compat/capi";
import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
    try {
        const { vendor_id } = await readBody(event);

        const getRequestList = await prisma.qRequest.findMany({
            where: {
                vendor_id: vendor_id,
            },
        });
        
        return {
            data: getRequestList,
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
