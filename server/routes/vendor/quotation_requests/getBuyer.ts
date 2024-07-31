import { registerRuntimeCompiler } from "nuxt/dist/app/compat/capi";
import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
    try {
        const { buyer_id } = await readBody(event);

        const getRequestList = await prisma.qRequest.findMany({
            where: {
                buyer_id: buyer_id,
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
