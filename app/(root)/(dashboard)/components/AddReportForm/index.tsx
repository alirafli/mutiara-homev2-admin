"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { formSchema } from "./formSchema";
import DropDownInput from "./DropDownInput";
import CalendarSelect from "./CalendarSelect";

function AddReportForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(Date.now()),
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // eslint-disable-next-line no-console
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-4 flex-col md:flex-row">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => <CalendarSelect field={field} />}
          />

          <FormField
            control={form.control}
            name="house_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nama Rumah</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 flex-col md:flex-row">
          <FormField
            control={form.control}
            name="renter_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nama Penyewa</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Jumlah Uang</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex gap-4 flex-col w-full">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <DropDownInput
                  field={field}
                  label="Kategori"
                  selectItem={[
                    { value: "pemasukan", label: "Pemasukan" },
                    { value: "pengeluaran", label: "Pengeluaran" },
                  ]}
                />
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <DropDownInput
                  field={field}
                  label="Jenis Pembayaran"
                  selectItem={[
                    { value: "lunas", label: "Lunas" },
                    { value: "cicilan", label: "Cicilan" },
                  ]}
                />
              )}
            />
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <DropDownInput
                  field={field}
                  label="Akun"
                  selectItem={[
                    { value: "bca01", label: "BCA 01" },
                    { value: "tunai", label: "Tunai" },
                  ]}
                />
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Catatan Tambahan</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter className="gap-6">
          <Button type="submit">Submit</Button>

          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default AddReportForm;
