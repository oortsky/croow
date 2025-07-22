"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepFour } from "./StepFour";

import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  stepFourSchema,
  fullFormSchema
} from "./schemas";

const stepTitles = [
  "Payer Information",
  "Payee Information",
  "Transaction Details",
  "Payment & Confirmation"
];

export function MultiStepForm() {
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof fullFormSchema>>({
    resolver: zodResolver(fullFormSchema),
    defaultValues: {
      payer: {
        name: "",
        email: "",
        phone: "",
        bank: "",
        account_number: "",
        account_holder_name: "",
        same_as_name: false
      },
      payee: {
        name: "",
        email: "",
        phone: "",
        bank: "",
        account_number: "",
        account_holder_name: "",
        same_as_name: false
      },
      transaction: {
        title: "",
        category: "",
        amount: 0,
        note: ""
      },
      payment_method: "",
      additional: {
        isAcceptTerms: false,
        isAcceptPrivacy: false
      }
    }
  });

  const onSubmit = (data: z.infer<typeof fullFormSchema>) => {
    console.log("Data submitted:", data);
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-full rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
  };

  const handleNext = async () => {
    const currentStepSchema =
      step === 1
        ? stepOneSchema
        : step === 2
        ? stepTwoSchema
        : step === 3
        ? stepThreeSchema
        : stepFourSchema;

    const currentValues = form.getValues();
    
    // First clear all errors for current step
    const currentStepFields = getCurrentStepFields();
    currentStepFields.forEach(fieldName => {
      form.clearErrors(fieldName as any);
    });

    const parsed = currentStepSchema.safeParse(currentValues);

    if (!parsed.success) {
      const errors = parsed.error?.issues;
      if (errors && Array.isArray(errors)) {
        errors.forEach(error => {
          if (error.path && error.path.length > 0) {
            const fieldName = error.path.join(".") as any;
            form.setError(fieldName, { 
              message: error.message,
              type: "validation" 
            });
          } else {
            console.warn("⚠️ Unknown error path", error);
          }
        });
      }
    } else {
      setStep(prev => prev + 1);
    }
  };

  const getCurrentStepFields = () => {
    switch (step) {
      case 1:
        return [
          "payer.name",
          "payer.email", 
          "payer.phone",
          "payer.bank",
          "payer.account_number",
          "payer.account_holder_name"
        ];
      case 2:
        return [
          "payee.name",
          "payee.email",
          "payee.phone", 
          "payee.bank",
          "payee.account_number",
          "payee.account_holder_name"
        ];
      case 3:
        return [
          "transaction.title",
          "transaction.category",
          "transaction.amount",
          "transaction.note"
        ];
      case 4:
        return [
          "payment_method",
          "additional.isAcceptTerms",
          "additional.isAcceptPrivacy"
        ];
      default:
        return [];
    }
  };

  const handleBack = () => setStep(prev => prev - 1);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-xl mx-auto p-4 border rounded-xl shadow-sm"
      >
        <Progress value={(step / stepTitles.length) * 100} />

        <div className="text-xl font-bold mb-2">{stepTitles[step - 1]}</div>
        <div className="text-sm mb-4">Step {step} of 4</div>

        {step === 1 && <StepOne form={form} />}
        {step === 2 && <StepTwo form={form} />}
        {step === 3 && <StepThree form={form} />}
        {step === 4 && <StepFour form={form} />}

        <div className="flex justify-between pt-4">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </Form>
  );
}
