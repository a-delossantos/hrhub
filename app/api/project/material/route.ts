import { generateId } from "@/app/lib/db";
import { prisma } from "@/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const project = await prisma.projectMaterial.create({
    data: {
      projectId: Number(body.project),
      materialId: Number(body.material),
      price: body.price,
      quantity: body.quantity,
      totalPrice: body.quantity * body.price,
      date: body.date,
    },
  });
  return new Response(JSON.stringify(project));
}

export async function GET() {
  const projects = await prisma.projectMaterial.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
    include: {
      project: true,
      material: {
        include: {
          supplier: true,
        },
      },
    },
  });
  return new Response(JSON.stringify(projects));
}
