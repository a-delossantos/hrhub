import { generateId } from "@/app/lib/db";
import { prisma } from "@/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const material = await prisma.supplier.create({
    data: {
      name: body.name.toUpperCase(),
      contact: body.contact,
      address: body.address,
    },
  });

  return new Response(JSON.stringify(material));
}

export async function GET() {
  const materials = await prisma.supplier.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
  return new Response(JSON.stringify(materials));
}
