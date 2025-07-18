"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroupCard } from "@/components/radio-group-card";
import { payments } from "@/constants/payments";

type Props = { form: UseFormReturn<any> };

export function StepFour({ form }: Props) {
  return (
    <>
      <FormField
        control={form.control}
        name="payment_method"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Method</FormLabel>
            <FormControl>
              <RadioGroupCard
                value={field.value}
                onChange={field.onChange}
                options={payments}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additional.isAcceptTerms"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-start gap-3">
              <FormControl>
                <Checkbox
                  id="terms-2"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="grid gap-1">
                <FormLabel htmlFor="terms-2" className="!mb-0">
                  Accept terms and conditions
                </FormLabel>
                <p className="text-muted-foreground text-sm">
                  By clicking this checkbox, you agree to the terms and
                  conditions.
                </p>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="additional.isAcceptPrivacy"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-start gap-3">
              <FormControl>
                <Checkbox
                  id="privacy-2"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="grid gap-1">
                <FormLabel htmlFor="privacy-2" className="!mb-0">
                  Accept privacy policy
                </FormLabel>
                <p className="text-muted-foreground text-sm">
                  By checking this box, you accept how we handle your data.
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
