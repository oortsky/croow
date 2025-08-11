"use server";

import { updateUserData, updateTransactionData } from "@/lib/db/queries/update";
import type { SelectUser, SelectTransaction } from "@/lib/db/schema";

export async function updateUser(
  id: SelectUser["id"],
  data: Partial<Omit<SelectUser, "id">>
) {
  return await updateUserData(id, data);
}

export async function updateTransaction(
  id: SelectTransaction["id"],
  data: Partial<Omit<SelectTransaction, "id">>
) {
  return await updateTransactionData(id, data);
}
