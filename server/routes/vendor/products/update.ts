import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event)=>{
    const {id, name,price, status, image, code, quantity, description, manufacturer } = await readBody(event);
    
    let updateProduct: any = await prisma.product.update({
        where: {
            id: id
        },
        data: {
            name: name,
            price: price,
            status: status,
            image: image,
            code: code,
            quantity: quantity,
            description: description,
            manufacturer: manufacturer
        }
    })
    .catch((error)=>{
        console.error(error);
        return {
            success: false
        }
    }); 

    return {
        data: updateProduct,
        success: true
    };
});