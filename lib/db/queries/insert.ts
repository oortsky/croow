import { db } from "../index";
import { users, transactions } from "../schema";
import type { InsertUser, InsertTransaction } from "../schema";

export async function insertUser(data: InsertUser) {
  const response = await db.insert(users).values(data);
  return response;
}

export async function insertTransaction(data: InsertTransaction) {
  const response = await db.insert(transactions).values(data);
  return response;
}
