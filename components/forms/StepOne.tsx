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
  const sameAsName = form.watch("payer.same_as_name") ?? false;
  const payerName = form.watch("payer.name") ?? "";

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
              <Input {...field} value={field.value ?? ""} />
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
              <Input type="email" {...field} value={field.value ?? ""} />
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
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <div className="flex gap-2">
                <div className="px-3 py-2 border rounded-md bg-muted text-muted-foreground text-sm select-none">
                  +62
                </div>
                <Input
                  type="tel"
                  inputMode="numeric"
                  placeholder="81234567890"
                  className="flex-1"
                  value={field.value?.replace(/^62/, "") ?? ""}
                  onChange={e => {
                    const onlyDigits = e.target.value.replace(/\D/g, "");
                    field.onChange(`62${onlyDigits}`);
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
        name="payer.bank"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bank</FormLabel>
            <FormControl>
              <Combobox
                options={banks}
                value={field.value ?? ""}
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
              <Input type="number" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="payer.account_holder_name"
        render={({ field }) => (
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
                  onCheckedChange={val =>
                    form.setValue("payer.same_as_name", val)
                  }
                />
              </div>
            </div>

            <FormControl>
              <Input
                {...field}
                value={field.value ?? ""}
                onChange={e => field.onChange(e.target.value.toUpperCase())}
                disabled={sameAsName}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
