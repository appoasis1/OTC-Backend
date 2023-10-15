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

    console.log('bankAccountsData:', bankAccountsData);

    const createdBankAccounts = [];

    for (const bankAccount of bankAccountsData) {
      const existingBankAccount = await prisma.bank.findFirst({
        where: { bank: bankAccount.bank },
      });

      if (!existingBankAccount) {
        const createdBankAccount = await prisma.bank.create({
          data: {
            account_name: bankAccount.account_name,
            bank: bankAccount.bank,
            account_type: bankAccount.account_type,
            bank_account_no: bankAccount.bank_account_no,
          },
        });

        console.log('createdBankAccount:', createdBankAccount);

        createdBankAccounts.push(createdBankAccount);
      }
    }

    console.log('createdBankAccounts:', createdBankAccounts);

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