import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const { product_ids } = await readBody(event);

  if (!Array.isArray(product_ids)) {
    return {
      error: "product_ids must be an array",
      success: false,
    };
  }

  const existingShortLists = await prisma.short.findMany({
    where: {
      product_id: {
        in: product_ids,
      },
    },
    select: {
      product_id: true,
    },
  });

  const shortlistedProductIds = new Set(existingShortLists.map(item => item.product_id));

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