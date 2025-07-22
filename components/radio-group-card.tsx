"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Option = {
  value: string;
  label: string | React.ReactNode;
  description?: string;
};

type RadioGroupCardProps = {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  name?: string;
};

export function RadioGroupCard({
  value,
  onChange,
  options,
  name = "radio"
}: RadioGroupCardProps) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="grid gap-3">
      {options.map((option, idx) => (
        <Label
          key={option.value}
          htmlFor={`${name}-${idx}`}
          className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 cursor-pointer has-[[aria-checked=true]]:border-red-600 has-[[aria-checked=true]]:bg-red-50 dark:has-[[aria-checked=true]]:border-red-900 dark:has-[[aria-checked=true]]:bg-red-950"
        >
          <RadioGroupItem
            value={option.value}
            id={`${name}-${idx}`}
            className="mt-1"
          />
          <div className="grid gap-1.5 font-normal">
            <div className="text-sm leading-none font-medium">{option.label}</div>
            {option.description && (
              <p className="text-muted-foreground text-sm">
                {option.description}
              </p>
            )}
          </div>
        </Label>
      ))}
    </RadioGroup>
  );
}
