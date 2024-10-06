import { generateId } from "@/app/lib/db";
import { prisma } from "@/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const id = await generateId(body.category);
  console.log(body.name, body.category, id);
  const material = await prisma.material.create({
    data: {
      name: body.name.toUpperCase(),
      category: body.category,
      material_id: id,
      supplier: {
        connect: {
          name: body.supplier,
        },
      },
    },
  });

  return new Response(JSON.stringify(material));
}

export async function GET() {
  const materials = await prisma.material.findMany({
    orderBy: [
      {
        category: "asc",
      },
      {
        material_id: "asc",
      },
    ],
    include: {
      supplier: true,
    },
  });
  return new Response(JSON.stringify(materials));
}
