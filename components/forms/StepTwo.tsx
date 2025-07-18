"use client";

import { useState, useEffect } from "react";
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

export function StepTwo({ form }: Props) {
  const sameAsName = form.watch("payee.same_as_name");
  const payeeName = form.watch("payee.name");

  useEffect(() => {
    if (sameAsName && payeeName) {
      form.setValue("payee.account_holder_name", payeeName.toUpperCase());
    }
  }, [sameAsName, payeeName, form]);

  return (
    <>
      <FormField
        control={form.control}
        name="payee.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Penerima" {...field} />
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
              <Input placeholder="e.g. penerima@email.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="payee.phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder="e.g. 6281234567890" {...field} />
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
        name="payee.account_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account Number</FormLabel>
            <FormControl>
              <Input placeholder="e.g. 123456789" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
              onCheckedChange={val => form.setValue("payee.same_as_name", val)}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="payee.account_holder_name"
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
