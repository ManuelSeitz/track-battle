"use server";

import { readFile as read } from "fs/promises";

export async function readFile(path: string) {
  const file = await read(process.cwd() + path, "utf-8");
  return JSON.parse(file);
}
