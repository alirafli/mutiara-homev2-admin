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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../AddReportForm/formSchema";
import CalendarSelect from "../AddReportForm/CalendarSelect";
import DropDownComboBox from "../AddReportForm/DropDownComboBox";

import { Textarea } from "@/components/ui/textarea";
import { AiOutlineLoading } from "react-icons/ai";
import { useToast } from "@/components/ui/use-toast";
import { updateReportById } from "../../actions";
import { SheetClose } from "@/components/ui/sheet";
import {
  accountData,
  categoryData,
  houseNameData,
  paymentType,
} from "@/data/dashboardData";
import { GetUserNameQuery } from "@/hooks/useUser";

interface UpdateReportModalProps {
  report: {
    title: string;
    value: string | Date | number;
  }[];
  id?: string;
}

function UpdateReportModal({ report, id }: UpdateReportModalProps) {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const getValueByTitle = (title: string) => {
    return report.find((e) => e.title === title)?.value ?? "";
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      created_at: new Date(`${getValueByTitle("Tanggal Dibuat")}`),
      amount: getValueByTitle("Nominal Pembayaran").toString(),
      account: getValueByTitle("Akun Keuangan").toString(),
      category: getValueByTitle("Kategori").toString(),
      house_name: getValueByTitle("Nama Rumah").toString(),
      note: getValueByTitle("Catatan Tambahan").toString(),
      renter: getValueByTitle("Nama Penyewa").toString(),
      type: getValueByTitle("Jenis Catatan").toString(),
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const payload = {
      ...data,
      amount: Number(data.amount),
    };

    startTransition(async () => {
      const result = await updateReportById(id, payload);
      if (result.error && result.error.message) {
        toast({
          title: `gagal update ${id?.slice(0, 5)}`,
        });
      } else {
        toast({
          title: `berhasil update ${id?.slice(0, 5)}`,
        });
      }
    });
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-3"
        >
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
                datas={houseNameData}
                form={form}
                keyLabel={"house_name"}
                placeHolder="Pilih rumah"
                title="Nama Rumah"
              />
            )}
          />

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

          <SheetClose className="gap-6" asChild>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <AiOutlineLoading className="animate-spin" />
              ) : (
                "Ubah"
              )}
            </Button>
          </SheetClose>
        </form>
      </Form>
    </div>
  );
}

export default UpdateReportModal;
