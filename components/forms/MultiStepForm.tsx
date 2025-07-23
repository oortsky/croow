"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateId } from "@/utils/id";

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
    mode: "onChange",
    defaultValues: {
      payer: {
        id: "",
        name: "",
        email: "",
        phone: "",
        bank: "",
        account_number: "",
        account_holder_name: "",
        same_as_name: false
      },
      payee: {
        id: "",
        name: "",
        email: "",
        phone: "",
        bank: "",
        account_number: "",
        account_holder_name: "",
        same_as_name: false
      },
      transaction: {
        id: "",
        title: "",
        category: "",
        amount: 0,
        payment_fee: 0,
        service_fee: 0,
        total: 0,
        note: ""
      },
      payment_method: "",
      additional: {
        isAcceptTermsAndPrivacy: false
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
    const currentStepFields = getCurrentStepFields();
    const isValid = await form.trigger(currentStepFields as any);

    if (!isValid) return;

    if (step === 2 && !form.getValues("payer.id")) {
      form.setValue("payer.id", generateId("PYR"));
    }

    if (step === 2 && !form.getValues("payee.id")) {
      form.setValue("payee.id", generateId("PYE"));
    }

    if (step === 3 && !form.getValues("transaction.id")) {
      form.setValue("transaction.id", generateId("TRX"));
    }

    setStep(prev => prev + 1);
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
        return ["payment_method", "additional.isAcceptTermsAndPrivacy"];
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
