"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

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

export function MultiStepForm() {
  const [step, setStep] = useState(4);

  const form = useForm<z.infer<typeof fullFormSchema>>({
    resolver: zodResolver(fullFormSchema),
    mode: "onBlur",
    defaultValues: {
      payer: {
        name: "",
        email: "",
        phone: "",
        bank: "",
        account_number: "",
        account_holder_name: ""
      },
      payee: {
        name: "",
        email: "",
        phone: "",
        bank: "",
        account_number: "",
        account_holder_name: ""
      },
      transaction: {
        title: "",
        category: "",
        amount: "",
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
    console.log("✅ Submitted data:", data);
    // TODO: Kirim data ke backend atau Supabase di sini
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
    const parsed = currentStepSchema.safeParse(currentValues);

    if (!parsed.success) {
      const errors = parsed.error?.errors;
      if (errors && Array.isArray(errors)) {
        errors.forEach(error => {
          if (error.path && error.path.length > 0) {
            const fieldName = error.path.join(".") as any;
            form.setError(fieldName, { message: error.message });
          } else {
            console.warn("⚠️ Unknown error path", error);
          }
        });
      }
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => setStep(prev => prev - 1);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-xl mx-auto p-4 border rounded-xl shadow-sm"
      >
        <div className="text-xl font-bold mb-4">Step {step} of 4</div>

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
