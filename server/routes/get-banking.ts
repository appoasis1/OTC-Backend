import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  var config = {
    method: 'get',
    url: 'https://murarecarrental.frappe.cloud/api/method/get-bank-accounts',
    headers: { 
      'Cookie': 'full_name=Guest; sid=Guest; system_user=yes; user_id=Guest; user_image='
    }
  };

  try {
    const response = await axios(config);
    const bankAccountsData = response.data.bank_accounts || [];

    const createdBankAccounts = [];

    for (const bankAccount of bankAccountsData) {
      const createdBankAccount = await prisma.bank.create({
        data: {
          account_name: bankAccount.account_name,
          bank: bankAccount.bank,
          account_type: bankAccount.account_type,
          bank_account_no: bankAccount.bank_account_no,
        },
      });

      createdBankAccounts.push(createdBankAccount);
    }

    return {
      success: true,
      data: createdBankAccounts,
    };
  } catch (error) {
    console.log(error);

    return {    
      success: false,
    };
  }
});