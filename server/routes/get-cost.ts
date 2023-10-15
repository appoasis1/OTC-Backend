import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  var config = {
    method: 'get',
    url: 'https://murarecarrental.frappe.cloud/api/method/get-cost-centres',
    headers: { 
      'Cookie': 'full_name=Guest; sid=Guest; system_user=yes; user_id=Guest; user_image='
    }
  };

  try {
    const response = await axios(config);
    const costCentresData = response.data.cost_centers || [];

    const createdCostCentres = [];

    for (const costCentre of costCentresData) {
      if (!costCentre.name) {
        continue;
      }

      const existingCostCentre = await prisma.cost.findFirst({
        where: { name: costCentre.name },
      });

      if (existingCostCentre) {
        console.log(`Cost center with name ${costCentre.name} already exists. Skipping creation.`);
        continue;
      }

      const createdCostCentre = await prisma.cost.create({
        data: {
          name: costCentre.name,
          cost_center_name: costCentre.cost_center_name,
          parent_cost_center: costCentre.parent_cost_center,
        },
      });

      createdCostCentres.push(createdCostCentre);
    }

    return {
      success: true,
      data: createdCostCentres,
    };
  } catch (error) {
    console.log(error);

    return {    
      success: false,
    };
  }
});