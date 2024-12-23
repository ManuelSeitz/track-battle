"use server";

import prisma from "@/db";
import { cookies } from "next/headers";

async function getPlayerId() {
  const cookiesStore = await cookies();
  const playerIdCookie = cookiesStore.get("player-id");

  return playerIdCookie?.value;
}

async function setPlayerId(id: string) {
  const cookiesStore = await cookies();
  cookiesStore.set("player-id", id);
}

export async function findOrCreatePlayer() {
  const playerId = await getPlayerId();

  const maxScore = await getMaxScore();

  if (!playerId) {
    const newPlayer = await createPlayer();
    await setPlayerId(newPlayer.id);
    return { ...newPlayer, maxScore };
  }

  const player = await prisma.player.findUnique({
    where: { id: playerId },
  });

  if (!player) return;

  return { ...player, maxScore };
}

export async function createPlayer() {
  const createdPlayer = await prisma.player.create({
    data: { games: undefined },
  });
  return createdPlayer;
}

export async function saveGame(score: number) {
  const playerId = await getPlayerId();
  if (!playerId) return;

  const player = await prisma.player.findUnique({ where: { id: playerId } });
  if (!player) return;

  await prisma.game.create({ data: { playerId: player.id, score } });
}

export async function getMaxScore() {
  const playerId = await getPlayerId();
  if (!playerId) return null;

  const player = await prisma.player.findUnique({ where: { id: playerId } });
  if (!player) return null;

  const {
    _max: { score: maxScore },
  } = await prisma.game.aggregate({
    _max: { score: true },
    where: { playerId: player.id },
  });

  return maxScore;
}
