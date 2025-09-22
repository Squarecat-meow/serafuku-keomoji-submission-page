import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  const count = await prisma.submission.groupBy({
    by: "status",
    _count: {
      id: true,
    },
  });

  const statusStats = count.reduce(
    (acc, curr) => {
      acc[curr.status] = curr._count.id;
      return acc;
    },
    {} as Record<string, number>,
  );

  return NextResponse.json(statusStats);
}
