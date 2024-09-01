import { prisma } from "@/prisma";

export const generateId = async (category: string) => {
  const categoryPrefix = category.substring(0, 3).toUpperCase();

  const itemcount = await prisma.material.count({
    where: {
      category,
    },
  });

  const idNumber = (itemcount + 1).toString().padStart(3, "0");

  return `${categoryPrefix}${idNumber}`;
};
