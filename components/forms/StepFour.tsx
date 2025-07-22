
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { payments } from "@/constants/payments";
import { useEffect, useState } from "react";

type Props = { form: UseFormReturn<any> };

export function StepFour({ form }: Props) {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    setData(form.getValues());
  }, [form]);

  // Fee calculation based on your specifications
  const amount = Number(data?.transaction?.amount ?? 0);
  const paymentMethod = data?.payment_method;

  const transactionCost = paymentMethod === "QRIS" 
    ? Math.floor(0.007 * amount) // 0.7% of transaction amount
    : 4000; // Fixed IDR 4,000 for VA

  const serviceFee = amount < 400000 
    ? 8000 // IDR 8,000 if less than IDR 400,000
    : Math.floor(0.02 * amount); // 2% if more than IDR 400,000

  const total = amount + transactionCost + serviceFee;

  return (
    <>
      {/* 1. Payment Method */}
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

      {/* 2. Transaction Review with Accordion */}
      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Transaction Review</h3>
        
        <Accordion type="multiple" className="w-full">
          {/* Payer Information Accordion */}
          <AccordionItem value="payer">
            <AccordionTrigger>Payer Information</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID:</span>
                  <span>{data?.payer?.id || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span>{data?.payer?.name || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{data?.payer?.email || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{data?.payer?.phone || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank:</span>
                  <span>{data?.payer?.bank || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Number:</span>
                  <span>{data?.payer?.account_number || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Holder:</span>
                  <span>{data?.payer?.account_holder_name || "-"}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Payee Information Accordion */}
          <AccordionItem value="payee">
            <AccordionTrigger>Payee Information</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID:</span>
                  <span>{data?.payee?.id || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span>{data?.payee?.name || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{data?.payee?.email || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{data?.payee?.phone || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank:</span>
                  <span>{data?.payee?.bank || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Number:</span>
                  <span>{data?.payee?.account_number || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Holder:</span>
                  <span>{data?.payee?.account_holder_name || "-"}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Transaction Information Accordion */}
          <AccordionItem value="transaction">
            <AccordionTrigger>Transaction Information</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Title:</span>
                  <span>{data?.transaction?.title || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span>{data?.transaction?.category || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span>Rp{amount.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Note:</span>
                  <span>{data?.transaction?.note || "-"}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 3. Transaction Calculation */}
      <section className="mt-6 space-y-4 border rounded-md p-4 bg-muted">
        <h3 className="text-lg font-semibold">Payment Details</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Transaction Amount:</span>
            <span>Rp{amount.toLocaleString("id-ID")}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Transaction Cost ({paymentMethod === "QRIS" ? "0.7%" : "Fixed"}):</span>
            <span>Rp{transactionCost.toLocaleString("id-ID")}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Service Fee ({amount < 400000 ? "Fixed" : "2%"}):</span>
            <span>Rp{serviceFee.toLocaleString("id-ID")}</span>
          </div>
          
          <hr className="my-2" />
          
          <div className="flex justify-between font-semibold text-primary text-base">
            <span>Total Payment:</span>
            <span>Rp{total.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </section>

      {/* 4. Terms & Privacy Checkboxes */}
      <FormField
        control={form.control}
        name="additional.isAcceptTerms"
        render={({ field }) => (
          <FormItem className="mt-6">
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
    </>
  );
}
