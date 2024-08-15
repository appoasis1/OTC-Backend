import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { prisma } from "~~/prisma/db";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

const firebaseConfig = {
  apiKey: "AIzaSyDQwAzZIBUiaVlScOStpiTOi8t877_XKis",
  authDomain: "otcebp.firebaseapp.com",
  projectId: "otcebp",
  storageBucket: "otcebp.appspot.com",
  messagingSenderId: "904504797201",
  appId: "1:904504797201:web:6fe5f312029f385a2fe9b0",
  measurementId: "G-FDX0DZD70Q"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default defineEventHandler(async (event) => {
  const { name, price, status, code, quantity, description, manufacturer, image, vendor_name, vendor_id, is_taxable } = await readBody(event);

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
    // Generate a unique filename for the image
    const filename = `${Date.now()}-${Math.floor(Math.random() * 10)}.jpg`; // Assuming JPEG format for the image

    // Create a reference to the file location in Firebase Storage
    const storageRef = ref(storage, `products/${filename}`);

    // Upload the image to Firebase Storage
    await uploadString(storageRef, base64Data, 'base64', { contentType: 'image/jpeg' });

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);

    // Create product after the image has been uploaded
    const createProduct = await prisma.product.create({
      data: {
        name: name,
        price: parseFloat(price),
        status: "active",
        image: downloadURL, // Store the Firebase Storage URL instead of the filename
        vendor_name: vendor_name,
        code: code,
        quantity: parseInt(quantity),
        description: description,   
        manufacturer: manufacturer,
        vendor_id: vendor_id,
        is_taxable: is_taxable ?? false,
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
    console.error("Error uploading image or creating product:", error);
    return {
      success: false,
    };
  }
});