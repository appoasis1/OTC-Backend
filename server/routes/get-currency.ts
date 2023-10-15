import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  var config = {
    method: 'get',
    url: 'https://murarecarrental.frappe.cloud/api/method/get-currencies',
    headers: { 
      'Cookie': 'full_name=Guest; sid=Guest; system_user=yes; user_id=Guest; user_image='
    }
  };

  try {
    const response = await axios(config);
    const currenciesData = response.data.currencies || [];

    const createdCurrencies = [];

    for (const currency of currenciesData) {
      if (!currency.name) {
        continue;
      }

      const existingCurrency = await prisma.currency.findFirst({
        where: { name: currency.name },
      });

      if (existingCurrency) {
        console.log(`Currency with name ${currency.name} already exists. Skipping creation.`);
        continue;
      }

      const createdCurrency = await prisma.currency.create({
        data: {
          name: currency.name,
          fraction: currency.fraction,
          symbol: currency.symbol,
        },
      });

      createdCurrencies.push(createdCurrency);
    }

    return {
      success: true,
      data: createdCurrencies,
    };
  } catch (error) {
    console.log(error);

    return {    
      success: false,
    };
  }
});