"use server";

import { insertUser, insertTransaction } from "@/lib/db/queries/insert";
import type { InsertUser, InsertTransaction } from "@/lib/db/schema";

export async function createUser(data: InsertUser) {
  return await insertUser(data);
}

export async function createTransaction(data: InsertTransaction) {
  return await insertTransaction(data);
}
