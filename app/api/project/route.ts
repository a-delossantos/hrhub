import { generateId } from "@/app/lib/db";
import { prisma } from "@/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const project = await prisma.project.create({
    data: {
      address: body.address,
      alias: body.alias,
      owner_name: body.owner_name,
      startDate: body.startDate,
    },
  });

  return new Response(JSON.stringify(project));
}

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
  return new Response(JSON.stringify(projects));
}
