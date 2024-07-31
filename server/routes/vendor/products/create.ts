import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { prisma } from "~~/prisma/db";
import fs from "fs";
import path from "path";

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// ...

export default defineEventHandler(async (event) => {
  const { name, price, status, code, quantity, description, manufacturer, image, vendor_name, vendor_id } = await readBody(event);

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

    // Create product after the image has been saved
    const createProduct = await prisma.product.create({
      data: {
        name: name,
        price: parseFloat(price),
        status: "active",
        image: filename,
        vendor_name: vendor_name,
        code: code,
        quantity: parseInt(quantity),
        description: description,   
        manufacturer: manufacturer,
        vendor_id: vendor_id, // Set the default vendor ID for the product
      },
    });

    // Log the created product
    console.log("Created product:", createProduct);

    // Return the result
    return {
      data: createProduct,
      success: true,
    };
  } catch (error) {
    console.error("Error saving image or creating product:", error);
    return {
      success: false,
    };
  }
});
