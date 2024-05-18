import { prisma } from "~~/prisma/db";
import axios from "axios";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);


  const createBuyer = await prisma.buyer.create({
   
      data: {
        email: email,
        password: password,
    

      },
      
    }).catch((error) => {
      console.error(error);
      return {
        success: false
      }
    });
    //console.log("Items are", items);
   
    return {
      data: createBuyer,
      success: true
    };
});