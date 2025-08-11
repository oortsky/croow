"use server";

import { deleteUserData, deleteTransactionData } from "@/lib/db/queries/delete";
import type { SelectUser, SelectTransaction } from "@/lib/db/schema";

export async function deleteUser(id: SelectUser["id"]) {
  return await deleteUserData(id);
}

export async function deleteTransaction(id: SelectTransaction["id"]) {
  return await deleteTransactionData(id);
}
