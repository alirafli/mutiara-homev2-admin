import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface DropDownInputprops {
  field: any;
  label: string;
  selectItem: { value: string; label: string }[];
}

function DropDownInput({ field, label, selectItem }: DropDownInputprops) {
  return (
    <FormItem className="w-full">
      <FormLabel>{label}</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {selectItem.map((data, index) => (
            <SelectItem key={`key-${data.value}-${index}`} value={data.value}>
              {data.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
}

export default DropDownInput;
