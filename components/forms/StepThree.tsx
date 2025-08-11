"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";
import { categories } from "@/constants/categories";
import { formatRupiah, parseRupiah } from "@/utils/rupiah";

type Props = { form: UseFormReturn<any> };

export function StepThree({ form }: Props) {
  return (
    <>
      <FormField
        control={form.control}
        name="transaction.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="transaction.category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Combobox
                options={categories}
                value={field.value ?? ""}
                onChange={field.onChange}
                placeholder="Category"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="transaction.amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Amount (Min. Rp10.000)</FormLabel>
            <FormControl>
              <div className="flex gap-2">
                <div className="px-3 py-2 border rounded-md bg-muted text-muted-foreground text-sm select-none">
                  Rp
                </div>
                <Input
                  inputMode="numeric"
                  className="flex-1"
                  placeholder="10.000"
                  value={formatRupiah(field.value ?? 0)}
                  onChange={(e) => {
                    const raw = parseRupiah(e.target.value);
                    field.onChange(raw);
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="transaction.note"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Note (Optional)</FormLabel>
            <FormControl>
              <Textarea {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}