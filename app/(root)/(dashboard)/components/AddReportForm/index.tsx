"use client";

import React, { useTransition } from "react";
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
import { AiOutlineLoading } from "react-icons/ai";

import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { formSchema } from "./formSchema";
import DropDownInput from "./DropDownInput";
import CalendarSelect from "./CalendarSelect";
import { createReport } from "../../actions";
import { toast } from "@/components/ui/use-toast";

import DropDownComboBox from "./DropDownComboBox";
import { houseName } from "../../data";

interface AddReportFormProps {
  handleModalOpen: (value: boolean) => void;
}

function AddReportForm({ handleModalOpen }: AddReportFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      created_at: new Date(Date.now()),
      note: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleModalOpen(false);
    startTransition(async () => {
      const payload = {
        ...values,
        amount: Number(values.amount),
      };
      const result = await createReport(payload);

      const { error } = JSON.parse(result);

      if (error && error.message) {
        toast({
          variant: "destructive",
          title: "gagal menambahkan data report!",
          description: `${error.status}: ${error.message}`,
        });
      } else {
        toast({
          title: "Pencatatan berhasil ditambahkan!",
        });
        form.reset();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-4 flex-col md:flex-row">
          <FormField
            control={form.control}
            name="created_at"
            render={({ field }) => <CalendarSelect field={field} />}
          />

          <FormField
            control={form.control}
            name="house_name"
            render={({ field }) => (
              <DropDownComboBox
                field={field}
                datas={houseName}
                form={form}
                keyLabel={"house_name"}
                placeHolder="Pilih rumah"
                title="Nama Rumah"
              />
            )}
          />
        </div>

        <div className="flex gap-4 flex-col md:flex-row">
          <FormField
            control={form.control}
            name="renter"
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
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              "Tambah"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default AddReportForm;
