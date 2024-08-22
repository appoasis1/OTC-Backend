import { createJwtToken } from "@/jwt/index";
import { prisma } from "~~/prisma/db";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
   const { email, password } = await readBody(event);

   console.log(`Login attempt with email: ${email}`);

   // Check if the user exists in the Vendor table
   const vendor = await prisma.vendor.findFirst({
      where: {
         email: email,
      },
   });

   // Check if the user exists in the Buyer table
   const buyer = await prisma.buyer.findFirst({
      where: {
         email: email,
      },
   });

   const admin = await prisma.admin.findFirst({
      where: {
         email: email,
      },
   });

   const response = {};

   // Compare the passwords if the user is found in either table
   if (vendor || buyer || admin) {
      const user = vendor || buyer || admin;
      console.log(`User with email ${email} found in ${vendor ? 'Vendor' : 'Buyer'} table`);

      // Compare the passwords
      if (password === user.password) {
         console.log(`User with email ${email} logged in successfully`);

         // Successfully login
         // Create a JWT token
         const token = await createJwtToken();
         console.log("the token is", token);
         setCookie(event, "token", token);

         if (vendor) {
            await prisma.vendor.update({
               where: {
                  email: email,
               },
               data: {
                  updated_at: new Date(),
               },
            });
         } else if (buyer){
            await prisma.buyer.update({
               where: {
                  email: email,
               },
               data: {
                  updated_at: new Date(),
               },
            });
         } else {
            await prisma.admin.update({
               where: {
                  email: email,
               },
               data: {
                  updated_at: new Date(),
               },
            });
         }

         // Fetch user data after updating
         const userData = vendor
         ? await prisma.vendor.findFirst({
             where: {
               email: email,
             },
           })
         : buyer
         ? await prisma.buyer.findFirst({
             where: {
               email: email,
             },
           })
         : await prisma.admin.findFirst({
             where: {
               email: email,
             },
           });
       

         response["user"] = userData;
         response["success"] = true;

         // Store encrypted user data in cookie
         const filteredUserData = {
            email: userData.email,
         };
         setCookie(event, "user", JSON.stringify(filteredUserData));
      } else {
         //console.log(`User with email ${email} provided incorrect password`);

         response["message"] = `The email or password is incorrect`;
         response["success"] = false;
      }
   } else {
      //console.log(`User with email ${email} not found in Vendor or Buyer table`);

      response["message"] = `The email or password is incorrect`;
      response["success"] = false;
   }

   return response;
});