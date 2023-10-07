import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const {selectedAccount} = await readBody(event);
    
    const bank = await prisma.bank.findFirst({
      where: { 
        bank: selectedAccount
     },
    });

    if (!bank) {
      return {
        data: null,
        message: "Account not found", 
        error: true,
        success: false,
      };
    }
    console.log(bank);
    return {
      data: {account: bank.account_name, account_type: bank.account_type, account_number: bank.bank_account_no },
      message: "Customer found",
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