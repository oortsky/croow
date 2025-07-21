"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

type Option = {
  value: string;
  label: string;
};

type ComboboxProps = {
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function Combobox({
  options,
  placeholder = "Options",
  value: externalValue,
  onChange
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState("");

  const isControlled = externalValue !== undefined;
  const value = isControlled ? externalValue : internalValue;

  const handleSelect = (selected: string) => {
    if (!isControlled) setInternalValue(selected === value ? "" : selected);
    if (onChange) onChange(selected === value ? "" : selected);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find(opt => opt.value === value)?.label
            : `Select a ${placeholder}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 font-sans">
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder}...`}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map(opt => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={handleSelect}
                >
                  {opt.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === opt.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
