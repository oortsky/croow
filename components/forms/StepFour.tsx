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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroupCard } from "@/components/radio-group-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from "lucide-react";
import { payments } from "@/constants/payments";


type Props = { form: UseFormReturn<any> };

export function StepFour({ form }: Props) {
  // Watch form values for real-time updates
  const formData = form.watch();
  const amount = Number(formData?.transaction?.amount ?? 0);
  const paymentMethod = formData?.payment_method;

  // Generate transaction ID
  const transactionId = `TRX-${Date.now().toString().slice(-8)}`;

    // Generate payer and payee IDs
  const payerId = `PYR-${Date.now().toString().slice(-8)}`;
  const payeeId = `PYE-${Date.now().toString().slice(-8)}`;

  // Fee calculation based on your specifications
  const qrisCost = Math.floor(0.007 * amount); // 0.7% of transaction amount
  const vaCost = 4000; // Fixed IDR 4,000 for VA

  const transactionCost = paymentMethod === "QRIS" ? qrisCost : vaCost;

  const serviceFee = amount < 400000 
    ? 8000 // IDR 8,000 if less than IDR 400,000
    : Math.floor(0.02 * amount); // 2% if more than IDR 400,000

  const total = amount + transactionCost + serviceFee;

  // Recommendation system
  const getRecommendation = () => {
    if (qrisCost > 4000) {
      return {
        recommended: "VA",
        reason: `QRIS cost (Rp${qrisCost.toLocaleString("id-ID")}) is higher than VA cost (Rp4,000)`
      };
    } else {
      return {
        recommended: "QRIS",
        reason: `QRIS cost (Rp${qrisCost.toLocaleString("id-ID")}) is lower than VA cost (Rp4,000)`
      };
    }
  };

  const recommendation = getRecommendation();

  // Auto-select recommended payment method when amount changes
  useEffect(() => {
    if (amount > 0 && !paymentMethod) {
      form.setValue("payment_method", recommendation.recommended);
    }
  }, [amount, recommendation.recommended, paymentMethod, form]);

  // Add badges to payment options
  const paymentOptionsWithBadges = payments.map(payment => ({
    ...payment,
    label: payment.value === recommendation.recommended 
      ? (
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
        )
      : payment.label
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
            {amount > 0 && (
              <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm font-medium text-blue-800">💡 Recommendation</p>
                <p className="text-sm text-blue-700">
                  We recommend <strong>{recommendation.recommended}</strong> for this transaction.
                </p>
                <p className="text-xs text-blue-600 mt-1">{recommendation.reason}</p>
              </div>
            )}
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
                  <span className="font-mono">{payerId}</span>
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
                  <span className="font-mono">{payeeId}</span>
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
                  <span className="font-mono">{transactionId}</span>
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