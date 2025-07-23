import { z } from "zod";
import { paymentValues } from "@/constants";

const phoneNumberRegex = /^62\d{9,15}$/;

export const stepOneSchema = z.object({
  payer: z.object({
    id: z.string().min(1, { message: "Payer ID is required" }),
    name: z.string().min(2, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().regex(phoneNumberRegex, {
      message: "Phone number at least 11 digits."
    }),
    bank: z.string().min(1, { message: "Please select a bank." }),
    account_number: z
      .string()
      .min(5, { message: "Account number is required" }),
    account_holder_name: z
      .string()
      .min(2, { message: "Account holder name is required." }),
    same_as_name: z.boolean().optional()
  })
});

export const stepTwoSchema = z.object({
  payee: z.object({
    id: z.string().min(1, { message: "Payee ID is required" }),
    name: z.string().min(2, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().regex(phoneNumberRegex, {
      message: "Phone number at least 11 digits."
    }),
    bank: z.string().min(1, { message: "Please select a bank." }),
    account_number: z
      .string()
      .min(5, { message: "Account number is required." }),
    account_holder_name: z
      .string()
      .min(2, { message: "Account holder name is required." }),
    same_as_name: z.boolean().optional()
  })
});

export const stepThreeSchema = z.object({
  transaction: z.object({
    id: z.string().min(1, { message: "Transaction ID is required" }),
    title: z.string().min(2, { message: "Title is required." }),
    category: z.string().min(1, { message: "Please select a category." }),
    amount: z.number().min(10000, { message: "Min. Rp10.000" }),
    payment_fee: z.number().min(1, { message: "Payment fee is required." }),
    service_fee: z.number().min(1, { message: "Service fee is required." }),
    total: z.number().min(1, { message: "Total payment is required." }),
    note: z.string().optional()
  })
});

export const stepFourSchema = z.object({
  payment_method: z.enum(paymentValues, {
    message: "You need to select a payment method."
  }),
  additional: z.object({
    isAcceptTermsAndPrivacy: z.boolean().refine(val => val === true, {
      message: "You must accept the terms and privacy policy."
    })
  })
});

export const fullFormSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema)
  .merge(stepFourSchema);
