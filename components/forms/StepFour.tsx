"use client";

import React from "react";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { RadioGroupCard } from "@/components/radio-group-card";
import { payments } from "@/constants/payments";

type Props = { form: UseFormReturn<any> };

export function StepFour({ form }: Props) {
  const formData = form.watch();
  const amount = Number(formData?.transaction?.amount ?? 0);
  const paymentMethod = formData?.payment_method;

  const qrisFee = Math.floor(0.007 * amount);
  const vaFee = 4000;

  const paymentFee = paymentMethod === "QRIS" ? qrisFee : vaFee;

  const serviceFee =
    amount < 500000 ? 8000 : Math.min(Math.floor(0.016 * amount), 50000);

  const total = amount + paymentFee + serviceFee;

  const getRecommendation = () => {
    if (qrisFee > 4000) {
      return {
        recommended: "VA"
      };
    } else {
      return {
        recommended: "QRIS"
      };
    }
  };

  const recommendation = getRecommendation();

  useEffect(() => {
    if (amount > 0) {
      form.setValue("payment_method", recommendation.recommended);
    }
  }, [amount, recommendation.recommended, form]);

  useEffect(() => {
    form.setValue("transaction.payment_fee", paymentFee);
    form.setValue("transaction.service_fee", serviceFee);
    form.setValue("transaction.total", total);
  }, [paymentFee, serviceFee, total, form]);

  const paymentOptionsWithBadges = payments.map(payment => ({
    ...payment,
    label:
      payment.value === recommendation.recommended ? (
        <div className="flex items-center justify-between w-full">
          <span>{payment.label}</span>
          <Badge
            variant="secondary"
            className="bg-red-500 text-white dark:bg-red-600 ml-2"
          >
            <BadgeCheck className="w-3 h-3 mr-1" />
            Recommended
          </Badge>
        </div>
      ) : (
        payment.label
      )
  }));

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
                options={paymentOptionsWithBadges}
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
                  <span className="font-mono">
                    {formData?.payer?.id || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span>{formData?.payer?.name || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{formData?.payer?.email || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{formData?.payer?.phone || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank:</span>
                  <span>{formData?.payer?.bank || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Number:</span>
                  <span>{formData?.payer?.account_number || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Holder:</span>
                  <span>{formData?.payer?.account_holder_name || "-"}</span>
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
                  <span className="font-mono">
                    {formData?.payee?.id || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span>{formData?.payee?.name || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{formData?.payee?.email || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{formData?.payee?.phone || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank:</span>
                  <span>{formData?.payee?.bank || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Number:</span>
                  <span>{formData?.payee?.account_number || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Holder:</span>
                  <span>{formData?.payee?.account_holder_name || "-"}</span>
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
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-mono">
                    {formData?.transaction?.id || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Title:</span>
                  <span>{formData?.transaction?.title || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span>{formData?.transaction?.category || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span>Rp{amount.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Note:</span>
                  <span>{formData?.transaction?.note || "-"}</span>
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
            <span>
              Transaction Cost ({paymentMethod === "QRIS" ? "0.7%" : "Fixed"}):
            </span>
            <span>Rp{paymentFee.toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between">
            <span>Service Fee ({amount < 500000 ? "Fixed" : "2%"}):</span>
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
        name="additional.isAcceptTermsAndPrivacy"
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
