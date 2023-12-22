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
import CalendarSelect from "./CalendarSelect";
import { createReport, incrementHouseAmount } from "../../actions";
import { toast } from "@/components/ui/use-toast";

import { accountData, categoryData, paymentType } from "@/data/dashboardData";
import { GetUserNameQuery } from "@/hooks/useUser";
import useHouseQuery, { GetHousesNameQuery } from "@/hooks/useHouses";
import DropDownComboBox from "@/components/ui/DropDownComboBox";

interface AddReportFormProps {
  handleModalOpen: (value: boolean) => void;
}

function AddReportForm({ handleModalOpen }: AddReportFormProps) {
  const [isPending, startTransition] = useTransition();

  const { refetch } = useHouseQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      created_at: new Date(Date.now()),
      note: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleModalOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { house_name, renter, ...restValues } = values;

    startTransition(async () => {
      const payload = {
        ...restValues,
        amount: Number(values.amount),
        renter_id: values.renter,
        house_id: values.house_name,
      };

      const result = await createReport(payload);
      await incrementHouseAmount(payload.amount, payload.house_id);

      refetch();
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
        <div className="flex gap-4 flex-col md:flex-row items-start">
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
                datas={GetHousesNameQuery() ?? []}
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
              <DropDownComboBox
                field={field}
                datas={GetUserNameQuery() ?? []}
                form={form}
                keyLabel="renter"
                placeHolder="Pilih penyewa"
                title="Nama Penyewa"
              />
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
                <DropDownComboBox
                  field={field}
                  datas={categoryData}
                  form={form}
                  keyLabel="category"
                  placeHolder="Pilih kategori"
                  title="Kategori"
                />
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <DropDownComboBox
                  field={field}
                  datas={paymentType}
                  form={form}
                  keyLabel="type"
                  placeHolder="Pilih tipe"
                  title="Tipe Pembayaran"
                />
              )}
            />
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <DropDownComboBox
                  field={field}
                  datas={accountData}
                  form={form}
                  keyLabel="account"
                  placeHolder="Pilih akun"
                  title="Akun"
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
