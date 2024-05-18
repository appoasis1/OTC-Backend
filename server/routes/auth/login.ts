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

   const response = {};

   // Compare the passwords if the user is found in either table
   if (vendor || buyer) {
      const user = vendor || buyer;
      console.log(`User with email ${email} found in ${vendor ? 'Vendor' : 'Buyer'} table`);

      // Compare the passwords
      if (password === user.password) {
         console.log(`User with email ${email} logged in successfully`);

         // Successfully login
         // Create a JWT token
         const token = await createJwtToken();
         console.log("the token is", token);
         setCookie(event, "token", token);

         // Store his last Login IP Address and time
         if (vendor) {
            await prisma.vendor.update({
               where: {
                  email: email,
               },
               data: {
                  updated_at: new Date(),
               },
            });
         } else {
            await prisma.buyer.update({
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
            : await prisma.buyer.findFirst({
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

         response["message"] = `The user with email ${email} and password does not match`;
         response["success"] = false;
      }
   } else {
      //console.log(`User with email ${email} not found in Vendor or Buyer table`);

      response["message"] = `The user with email ${email} does not exist or is inactive`;
      response["success"] = false;
   }

   return response;
});