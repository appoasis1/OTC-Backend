import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const { term } = await readBody(event);

  const createTerm = await prisma.terms.create({
      data: {
        term: term,
      },
    }).catch((error) => {
      console.error(error);
      return {
        success: false
      }
    });
    return {
      data: createTerm,
      success: true
    };
});