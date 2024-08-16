import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const { product_ids } = await readBody(event);

  // Ensure that product_ids is an array
  if (!Array.isArray(product_ids)) {
    return {
      error: "product_ids must be an array",
      success: false,
    };
  }

  // Retrieve all shortlists
  const existingShortLists = await prisma.short.findMany({
    select: {
      product_id: true,
    },
  });

  // Create a set of existing product IDs from the retrieved shortlists
  const shortlistedProductIds = new Set(
    existingShortLists.flatMap(shortlist => {
      // Cast product_id to an array of objects
      const products = shortlist.product_id as Array<{ id: number }>;
      return products.map(product => product.id);
    })
  );

  // Filter the incoming product_ids based on whether they exist in shortlistedProductIds
  const existingProducts = product_ids.filter(id => shortlistedProductIds.has(id));
  const nonExistingProducts = product_ids.filter(id => !shortlistedProductIds.has(id));

  console.log(`Products that exist are { ${existingProducts.join(', ')} }`);
  console.log(`Products that don't exist are { ${nonExistingProducts.join(', ')} }`);

  return {
    existing_products: existingProducts,
    non_existing_products: nonExistingProducts,
    success: true,
  };
});
