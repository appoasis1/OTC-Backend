import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const vendor = await prisma.vendor.findFirst({
    where: {
      email: email,
    },
  });

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

  // Determine which user was found
  const user = vendor || buyer || admin;

  if (user) {
    console.log(`User with email ${email} found in ${vendor ? 'Vendor' : buyer ? 'Buyer' : 'Admin'} table`);

    // Compare the passwords
    if (password === user.password) { 
      console.log(`User with email ${email} logged in successfully`);

      // Check if it's the user's first login
      const isFirstLogin = user.isFirstLogin;

      // Log to terminal whether it is the user's first login or not
      if (isFirstLogin) {
        console.log(`User with email ${email} is logging in for the first time.`);
      } else {
        console.log(`User with email ${email} has logged in before.`);
      }

      if (vendor) {
        await prisma.vendor.update({
          where: {
            email: email,
          },
          data: {
            updated_at: new Date(),
            isFirstLogin: false, // Set isFirstLogin to false after first login
          },
        });
      } else if (buyer) {
        await prisma.buyer.update({
          where: {
            email: email,
          },
          data: {
            updated_at: new Date(),
            isFirstLogin: false, // Set isFirstLogin to false after first login
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
      response["isFirstLogin"] = isFirstLogin;

      const filteredUserData = {
        email: userData.email,
      };
      setCookie(event, "user", JSON.stringify(filteredUserData));
    } else {
      response["message"] = "The email or password is incorrect";
      response["success"] = false;
    }
  } else {
    response["message"] = "The email or password is incorrect";
    response["success"] = false;
  }

  return response;
});
