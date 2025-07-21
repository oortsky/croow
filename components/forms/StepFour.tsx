"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroupCard } from "@/components/radio-group-card";
import { payments } from "@/constants/payments";
import { useEffect, useState } from "react";
import { format } from "date-fns";

type Props = { form: UseFormReturn<any> };

export function StepFour({ form }: Props) {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    setData(form.getValues());
  }, [form]);

  // Contoh perhitungan biaya
  const amount = Number(data?.transaction?.amount ?? 0);
  const paymentMethod = data?.payment_method;

  const transactionCost =
    paymentMethod == "QRIS" ? Math.max(0.007 * amount) : 4000;
  const serviceFee = amount < 400000 ? 8000 : Math.max(0.02 * amount);
  const total = amount + transactionCost + serviceFee;

  return (
    <>
      {/* Metode Pembayaran */}
      <FormField
        control={form.control}
        name="payment_method"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Method</FormLabel>
            <FormControl>
              <RadioGroupCard
                {...field}
                value={field.value ?? ""}
                onChange={field.onChange}
                options={payments}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Terms & Privacy (Gabung) */}
      <FormField
        control={form.control}
        name="additional.isAcceptTerms"
        render={({ field }) => (
          <FormItem className="mt-4">
            <div className="flex items-start gap-3">
              <FormControl>
                <Checkbox
                  id="terms"
                  checked={field.value ?? false}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="grid gap-1">
                <FormLabel htmlFor="terms" className="!mb-0">
                  I agree to the Terms & Privacy Policy
                </FormLabel>
                <p className="text-muted-foreground text-sm">
                  By proceeding, you accept our terms and how we handle your
                  data.
                </p>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Ringkasan Data */}
      <section className="mt-6 space-y-4 border rounded-md p-4 bg-muted">
        <h3 className="text-lg font-semibold">Transaction Summary</h3>

        <div className="space-y-3 text-sm">
          {/* Payer */}
          <div>
            <h4 className="font-medium">Payer Information</h4>
            <p>ID: {data?.payer?.id}</p>
            <p>Name: {data?.payer?.name}</p>
            <p>Email: {data?.payer?.email}</p>
            <p>Phone: {data?.payer?.phone}</p>
            <p>Bank: {data?.payer?.bank}</p>
            <p>Account Number: {data?.payer?.account_number}</p>
            <p>Account Holder: {data?.payer?.account_holder_name}</p>
          </div>

          {/* Payee */}
          <div>
            <h4 className="font-medium">Payee Information</h4>
            <p>ID: {data?.payee?.id}</p>
            <p>Name: {data?.payee?.name}</p>
            <p>Email: {data?.payee?.email}</p>
            <p>Phone: {data?.payee?.phone}</p>
            <p>Bank: {data?.payee?.bank}</p>
            <p>Account Number: {data?.payee?.account_number}</p>
            <p>Account Holder: {data?.payee?.account_holder_name}</p>
          </div>

          {/* Transaction */}
          <div>
            <h4 className="font-medium">Transaction Information</h4>
            <p>Title: {data?.transaction?.title}</p>
            <p>Category: {data?.transaction?.category}</p>
            <p>Note: {data?.transaction?.note}</p>
          </div>

          {/* Detail Biaya */}
          <div>
            <h4 className="font-medium">Payment Details</h4>
            <p>Transaction Amount: Rp{amount.toLocaleString("id-ID")}</p>
            <p>Transaction Cost: Rp{transactionCost.toLocaleString("id-ID")}</p>
            <p>Service Fee: Rp{serviceFee.toLocaleString("id-ID")}</p>
            <p className="font-semibold text-primary">
              Total Payment: Rp{total.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
