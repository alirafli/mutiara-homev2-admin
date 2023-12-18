"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import React from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { IoMdCheckmark } from "react-icons/io";

interface DropDownComboBoxProps {
  field: any;
  form: any;
  datas: { label: string; value: any }[];
  placeHolder: string;
  title: string;
  keyLabel: string;
}

function DropDownComboBox({
  field,
  form,
  datas,
  placeHolder,
  title,
  keyLabel,
}: DropDownComboBoxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <FormItem className="flex flex-col w-full">
      <FormLabel>{title}</FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "justify-between",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value
                ? datas.find((data) => data.value === field.value)?.label
                : placeHolder}
              <BiSortAlt2 className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={placeHolder} className="h-9" />
            <CommandEmpty>Tidak ditemukan</CommandEmpty>
            <CommandGroup>
              {datas.map((data) => (
                <CommandItem
                  className="cursor-pointer"
                  value={data.label}
                  key={data.value}
                  onSelect={() => {
                    form.setValue(keyLabel, data.value);
                    setOpen(false);
                  }}
                >
                  {data.label}
                  <IoMdCheckmark
                    className={cn(
                      "ml-auto h-4 w-4",
                      data.value === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
}

export default DropDownComboBox;
