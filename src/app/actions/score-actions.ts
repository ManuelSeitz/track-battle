"use server";

import prisma from "@/db";

export async function calculatePercentile(percentile: number) {
  const scores = (
    await prisma.game.findMany({
      orderBy: { score: "asc" },
      select: { score: true },
    })
  ).map(({ score }) => score);

  const rank = (percentile / 100) * (scores.length + 1);

  if (rank.toString().includes(".")) {
    const [integer, decimal] = rank.toString().split(".");
    const previousValue = scores[Number(integer) - 1];
    const nextValue = scores[Number(integer)];

    return previousValue + Number(decimal) * (nextValue - previousValue);
  }

  return scores[rank - 1];
}
