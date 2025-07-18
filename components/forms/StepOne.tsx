"use client";

import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import { banks } from "@/constants/banks";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Props = { form: UseFormReturn<any> };

export function StepOne({ form }: Props) {
  const sameAsName = form.watch("payer.same_as_name");
  const payerName = form.watch("payer.name");

  useEffect(() => {
    if (sameAsName && payerName) {
      form.setValue("payer.account_holder_name", payerName.toUpperCase());
    }
  }, [sameAsName, payerName, form]);

  return (
    <>
      <FormField
        control={form.control}
        name="payer.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Bayu Pamungkas" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="payer.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="e.g. kamu@email.com"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="payer.phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone (must start with 62)</FormLabel>
            <FormControl>
              <Input placeholder="e.g. 6281234567890" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="payer.bank"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bank</FormLabel>
            <FormControl>
              <Combobox
                options={banks}
                value={field.value}
                onChange={field.onChange}
                placeholder="Bank"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="payer.account_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account Number</FormLabel>
            <FormControl>
              <Input placeholder="e.g. 1234567890" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* ✅ Switch: Same as name */}
      <FormItem>
        <div className="flex items-center justify-between mb-2">
          <FormLabel>Account Holder Name</FormLabel>
          <div className="flex items-center gap-2">
            <Label htmlFor="sameAsName" className="text-xs">
              Same as Name
            </Label>
            <Switch
              id="sameAsName"
              checked={sameAsName}
              onCheckedChange={val => form.setValue("payer.same_as_name", val)}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="payer.account_holder_name"
          render={({ field }) => (
            <>
              <FormControl>
                <Input
                  placeholder="e.g. Nama di rekening"
                  {...field}
                  value={field.value}
                  onChange={e => field.onChange(e.target.value.toUpperCase())}
                  disabled={sameAsName}
                />
              </FormControl>
              <FormMessage />
            </>
          )}
        />
      </FormItem>
    </>
  );
}
