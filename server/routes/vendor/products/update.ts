import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { prisma } from "~~/prisma/db";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

const __dirname = dirname(fileURLToPath(import.meta.url));

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default defineEventHandler(async (event) => {
  const { product_id, name, price, status, code, quantity, description, manufacturer, image, vendor_name, vendor_id, is_taxable } = await readBody(event);

  if (!product_id) {
    return {
      success: false,
      message: 'Product ID is required.',
    };
  }

  try {
    // Fetch the existing product
    const existingProduct = await prisma.product.findUnique({
      where: { product_id }
    });

    if (!existingProduct) {
      return {
        success: false,
        message: 'Product not found.',
      };
    }

    let imageUrl = existingProduct.image; // Preserve existing image URL if no new image is provided

    if (image) {
      // Decode the base64 image data
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

      if (!base64Data) {
        console.error("Error: No image data provided");
        return {
          success: false,
          message: 'No image data provided.',
        };
      }

      // Generate a unique filename for the image
      const filename = `${Date.now()}-${Math.floor(Math.random() * 1000)}.jpg`;

      // Create a reference to the file location in Firebase Storage
      const storageRef = ref(storage, `products/${filename}`);

      // Upload the image to Firebase Storage
      await uploadString(storageRef, base64Data, 'base64', { contentType: 'image/jpeg' });

      // Get the download URL of the uploaded image
      imageUrl = await getDownloadURL(storageRef);
    }

    // Update the product in the database
    const updatedProduct = await prisma.product.update({
      where: { product_id },
      data: {
        name: name ?? existingProduct.name,
        price: parseFloat(price) ?? existingProduct.price,
        status: status ?? existingProduct.status,
        image: imageUrl,
        vendor_name: vendor_name ?? existingProduct.vendor_name,
        code: code ?? existingProduct.code,
        quantity: parseInt(quantity) ?? existingProduct.quantity,
        description: description ?? existingProduct.description,
        manufacturer: manufacturer ?? existingProduct.manufacturer,
        vendor_id: vendor_id ?? existingProduct.vendor_id,
        is_taxable: is_taxable ?? existingProduct.is_taxable,
      },
    });

    console.log("Updated product:", updatedProduct);

    return {
      data: updatedProduct,
      success: true,
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      message: 'Error updating product.',
    };
  }
});
