import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  var config = {
    method: 'get',
    url: 'https://murarecarrental.frappe.cloud/api/method/get-series',
    headers: { 
      'Cookie': 'full_name=Guest; sid=Guest; system_user=yes; user_id=Guest; user_image='
    }
  };

  try {
    const response = await axios(config);
    const seriesData = response.data.naming_series || [];

    const createdSeries = [];

    for (const series of seriesData) {
      const createdSeriesRecord = await prisma.series.create({
        data: {
          naming_series: series.naming_series,
        },
      });

      createdSeries.push(createdSeriesRecord);
    }

    return {
      success: true,
      data: createdSeries,
    };
  } catch (error) {
    console.log(error);

    return {    
      success: false,
    };
  }
});