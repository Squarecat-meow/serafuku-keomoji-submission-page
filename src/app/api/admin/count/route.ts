import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";
import { Submission } from "@prisma/client/index.js";

interface ICountGroupBy {
  status: Submission["status"];
  _count: {
    id: number;
  };
}

export async function GET() {
  const count = await prisma.submission.groupBy({
    by: "status",
    _count: {
      id: true,
    },
  });

  const statusStats = count.reduce(
    (acc: Record<string, number>, curr: ICountGroupBy) => {
      acc[curr.status] = curr._count.id;
      return acc;
    },
    {} as Record<string, number>,
  );

  return NextResponse.json(statusStats);
}
