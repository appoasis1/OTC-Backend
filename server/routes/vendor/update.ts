import { prisma } from "~~/prisma/db";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize Firebase with your configuration
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
  const { vendor_id, firstName, lastName, email, phone, address, gender, password, image } = await readBody(event);

  const base64Image = image; // Assuming the base64 image data is in the "image" field

  // Decode the base64 image data
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

  // Ensure the base64 data is not empty
  if (!base64Data) {
    console.error("Error: No image data provided");
    return {
      success: false,
      error: "No image data provided"
    };
  }

  try {
    // Generate a unique filename for the image
    const filename = `${Date.now()}-${Math.floor(Math.random() * 10)}.jpg`; // Assuming JPEG format for the image

    // Create a reference to the file location in Firebase Storage
    const storageRef = ref(storage, `vendors/${filename}`);

    // Upload the image to Firebase Storage
    await uploadString(storageRef, base64Data, 'base64', { contentType: 'image/jpeg' });

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);

    // Update the vendor information in the database with the download URL
    const updateVendor = await prisma.vendor.update({
      where: {
        vendor_id: parseInt(vendor_id),
      },
      data: {
        first_name: firstName,
        last_name: lastName,
        image: downloadURL, // Save the Firebase Storage URL
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
    console.error("Error uploading image or updating vendor:", error);
    return {
      success: false,
      error: "An error occurred while processing the request"
    };
  }
});
