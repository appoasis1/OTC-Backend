import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const {selectedCurrency} = await readBody(event);
    
    const currency = await prisma.currency.findFirst({
      where: { 
        name: selectedCurrency
     },
    });

    if (!currency) {
      return {
        data: null,
        message: "Currency not found",
        error: true,
        success: false,
      };
    }
    console.log(currency);
    return {
      data: {symbol: currency.symbol},
      message: "Currency found",
      error: false,
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: error.message,
      error: true,
      success: false,
    };
  }
});