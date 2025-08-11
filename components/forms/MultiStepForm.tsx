"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import axios from "axios";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepFour } from "./StepFour";
import { getUserByEmail } from "@/app/actions/read";
import { createUser, createTransaction } from "@/app/actions/create";
import { updateUser } from "@/app/actions/update";
import {
  fullFormSchema,
  StatusEnum
} from "@/lib/schemas";
import { randomID } from "@/utils/id";

type FullFormInput = z.input<typeof fullFormSchema>;
type FullFormOutput = z.infer<typeof fullFormSchema>;

const stepTitles = [
  "Payer Information",
  "Payee Information",
  "Transaction Details",
  "Payment & Confirmation"
];

export function MultiStepForm() {
  const [step, setStep] = useState(1);

  const form = useForm<FullFormInput>({
    resolver: zodResolver(fullFormSchema) as unknown as Resolver<FullFormInput>,
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      payer: {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        bank: undefined,
        account_number: "",
        account_holder_name: "",
        same_as_name: false
      },
      payee: {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        bank: undefined,
        account_number: "",
        account_holder_name: "",
        same_as_name: false
      },
      transaction: {
        id: "",
        name: "",
        category: undefined,
        amount: 0,
        service_fee: 0,
        total: 0,
        note: "",
        status: StatusEnum.Pending
      },
      additional: {
        isAcceptTermsAndPrivacy: false
      }
    }
  });

  const onSubmit = async (rawData: FullFormInput) => {
    const data: FullFormOutput = fullFormSchema.parse(rawData);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL!}/api/midtrans/token`,
      data.transaction.snap
    );

    if (typeof window !== "undefined" && (window as any).snap) {
      (window as any).snap.pay(response?.data?.token, {
        onSuccess: async (result: any) => {
          try {
            await createUser(data.payer);
            await createUser(data.payee);
            await createTransaction(data.transaction);
            console.log("Success:", result);
          } catch (error) {
            console.error("Error creating records:", error);
          }
        },
        onPending: (r: any) => console.log("Pending:", r),
        onError: (e: any) => console.error("Snap error:", e)
      });
    }

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

    if (step === 1 && !form.getValues("payer.id")) {
      form.setValue("payer.id", randomID("PYR"));
    }

    if (step === 2 && !form.getValues("payee.id")) {
      form.setValue("payee.id", randomID("PYE"));
    }

    if (step === 3 && !form.getValues("transaction.id")) {
      form.setValue("transaction.id", randomID("TRX"));
    }

    setStep(prev => prev + 1);
  };

  const getCurrentStepFields = () => {
    switch (step) {
      case 1:
        return [
          "payer.first_name",
          "payer.last_name",
          "payer.email",
          "payer.phone",
          "payer.bank",
          "payer.account_number",
          "payer.account_holder_name"
        ];
      case 2:
        return [
          "payee.first_name",
          "payee.last_name",
          "payee.email",
          "payee.phone",
          "payee.bank",
          "payee.account_number",
          "payee.account_holder_name"
        ];
      case 3:
        return [
          "transaction.name",
          "transaction.category",
          "transaction.amount",
          "transaction.note"
        ];
      case 4:
        return ["additional.isAcceptTermsAndPrivacy"];
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
