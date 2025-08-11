import { eq } from "drizzle-orm";
import { db } from "../index";
import { users, transactions } from "../schema";
import type { SelectUser, SelectTransaction } from "../schema";

export async function deleteUserData(id: SelectUser["id"]) {
  const response = await db.delete(users).where(eq(users.id, id));
  return response;
}

export async function deleteTransactionData(id: SelectTransaction["id"]) {
  const response = await db.delete(transactions).where(eq(transactions.id, id));
  return response;
}
