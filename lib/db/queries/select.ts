import { eq } from "drizzle-orm";
import { db } from "../index";
import { users, transactions } from "../schema";
import type { SelectUser, SelectTransaction } from "../schema";

export async function selectUserById(id: SelectUser["id"]) {
  const response = await db.select().from(users).where(eq(users.id, id));
  return response;
}

export async function selectUserByEmail(email: SelectUser["email"]) {
  const response = await db.select().from(users).where(eq(users.email, email));
  return response;
}

export async function selectTransactionById(id: SelectTransaction["id"]) {
  const response = await db
    .select()
    .from(transactions)
    .where(eq(transactions.id, id));
  return response;
}
