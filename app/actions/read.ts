"use server";

import {
  selectUserById,
  selectUserByEmail,
  selectTransactionById
} from "@/lib/db/queries/select";
import type { SelectUser, SelectTransaction } from "@/lib/db/schema";

export async function getUserById(id: SelectUser["id"]) {
  return await selectUserById(id);
}

export async function getUserByEmail(email: SelectUser["email"]) {
  return await selectUserByEmail(email);
}

export async function getTransactionById(id: SelectTransaction["id"]) {
  return await selectTransactionById(id);
}
