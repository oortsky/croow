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
import { getFullName } from "@/utils/fullname";

type Props = { form: UseFormReturn<any> };

export function StepTwo({ form }: Props) {
  const sameAsName = form.watch("payee.same_as_name") ?? false;
  const fullName = getFullName(
    form.watch("payee.first_name"),
    form.watch("payee.last_name")
  );

  useEffect(() => {
    if (sameAsName && fullName) {
      form.setValue("payee.account_holder_name", fullName.toUpperCase());
      form.trigger("payee.account_holder_name");
    } else if (!sameAsName) {
      form.setValue("payee.account_holder_name", "");
    }
  }, [sameAsName, fullName, form]);

  return (
    <>
      <FormField
        control={form.control}
        name="payee.first_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="payee.last_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="payee.email"
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
        name="payee.phone"
        control={form.control}
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
                  value={field.value?.replace(/^\+62/, "") ?? ""}
                  onChange={e => {
                    const onlyDigits = e.target.value.replace(/\D/g, "");
                    field.onChange(`+62${onlyDigits}`);
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
        name="payee.bank"
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
        name="payee.account_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account Number</FormLabel>
            <FormControl>
              <Input inputMode="numeric" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="payee.account_holder_name"
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
                    form.setValue("payee.same_as_name", val)
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
