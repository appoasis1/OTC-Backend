
import { prisma } from "~~/prisma/db";
export default defineEventHandler(async (event) => {
  const response = {}
  const {id} = await readBody(event)
  try {
    console.log("iiiiiii",id)
    let invoice = await prisma.quotation.findUnique({

      where: { 
        id: id
     }
    });
    console.log("mbilimbi", invoice)
    
    response['invoice'] = invoice
    response['success'] = true

    
  } 
  catch (error) {
     response['success'] = false
     response['message'] = error.toString()
  }
    
  return response
});