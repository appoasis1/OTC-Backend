import { prisma } from "~~/prisma/db";
import axios from "axios";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineEventHandler(async (event) => {
  const { vendor_id, firstName, lastName, email, phone, address, gender, password, image } = await readBody(event);

  const base64Image = image; // Assuming the base64 image data is in the "image" field

  // Decode the base64 image data
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

  // Ensure the base64 data is not empty
  if (!base64Data) {
    console.error("Error: No image data provided");
    return {
      success: false,
    };
  }

  try {
    // Convert base64 data to a buffer
    const imageBuffer = Buffer.from(base64Data, "base64");

    // Generate a unique filename for the image
    const filename = `${Date.now()}-${Math.floor(Math.random() * 10)}.jpg`; // Assuming JPEG format for the image

    // Define the path where the image will be saved
    const imagePath = path.join(__dirname, '..', '..', 'public/images', filename);

    // Save the image to the uploads folder
    fs.writeFileSync(imagePath, imageBuffer);

    const updateVendor = await prisma.vendor.update({
      where: {
        vendor_id: parseInt(vendor_id),
      },
      data: {
        first_name: firstName,
        last_name: lastName,
        image: filename,
        email: email,
        phone: phone,
        address_line1: address,
        // gender: gender,
      },
    });

    return {
      data: updateVendor,
      success: true
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An error occurred while processing the request"
    };
  }
});