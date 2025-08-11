import { eq } from "drizzle-orm";
import { db } from "../index";
import { users, transactions } from "../schema";
import type { SelectUser, SelectTransaction } from "../schema";

export async function updateUserData(
  id: SelectUser["id"],
  data: Partial<Omit<SelectUser, "id">>
) {
  const response = await db.update(users).set(data).where(eq(users.id, id));
  return response;
}

export async function updateTransactionData(
  id: SelectTransaction["id"],
  data: Partial<Omit<SelectTransaction, "id">>
) {
  const response = await db
    .update(transactions)
    .set(data)
    .where(eq(transactions.id, id));
  return response;
}
