"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DropDownComboBox from "@/app/(root)/(dashboard)/components/AddReportForm/DropDownComboBox";
import { paymentStatusData, rentTimeData, statusData } from "../../data";
import { houseNameData } from "@/app/(root)/(dashboard)/data";
import { addUser, uploadUserKtp } from "../../actions";
import { toast } from "@/components/ui/use-toast";
import { DialogFooter } from "@/components/ui/dialog";
import { AiOutlineLoading } from "react-icons/ai";
import { fileToBase64 } from "@/utils/FileToBase64";

interface AddRenterFormProps {
  handleModalOpen: (value: boolean) => void;
}

function AddRenterForm({ handleModalOpen }: AddRenterFormProps) {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      is_active: "ya",
      payment_status: "tidak",
      rent_time: "tiga bulan",
    },
  });

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setSelectedFile(e.target.files[0]);
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ktp_image, ...restOfData } = data;
    const payload = {
      ...restOfData,
      is_active: data.is_active === "ya" ?? false,
      payment_status: data.payment_status === "ya" ?? false,
      amount_remaining: 0,
    };

    startTransition(async () => {
      const { user: userData, error } = await addUser(payload);

      if (selectedFile && userData) {
        const fileData = (await fileToBase64(selectedFile)) as string;
        const { error: imageError } = await uploadUserKtp(
          userData.id,
          fileData
        );

        if (imageError && imageError.message) {
          toast({
            variant: "destructive",
            title: "gagal mengupload Foto KTP!",
            description: `${imageError.message}`,
          });
        }
      }

      handleModalOpen(false);
      if (error && error.message) {
        toast({
          variant: "destructive",
          title: "gagal menambahkan data penyewa!",
          description: `${error.code}: ${error.message}`,
        });
      } else {
        toast({
          title: "penyewa baru berhasil ditambahkan!",
        });
      }
      form.reset();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4 flex-col md:flex-row items-end">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>nama penyewa</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <DropDownComboBox
                field={field}
                datas={statusData}
                form={form}
                keyLabel={"is_active"}
                placeHolder="Pilih status"
                title="Status"
              />
            )}
          />
        </div>

        <div className="flex gap-4 flex-col md:flex-row items-end">
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nomor telpon</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nik"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>NIK</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 flex-col md:flex-row items-end">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rent_time"
            render={({ field }) => (
              <DropDownComboBox
                field={field}
                datas={rentTimeData}
                form={form}
                keyLabel={"rent_time"}
                placeHolder="pilih waktu sewa"
                title="Waktu sewa"
              />
            )}
          />
        </div>

        <div className="flex gap-4 flex-col md:flex-row items-end">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="payment_status"
            render={({ field }) => (
              <DropDownComboBox
                field={field}
                datas={paymentStatusData}
                form={form}
                keyLabel={"payment_status"}
                placeHolder="pilih status pembayaran"
                title="Status pembayaran"
              />
            )}
          />
        </div>

        <div className="flex gap-4 flex-col md:flex-row items-end">
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
                title="Rumah sewa"
              />
            )}
          />

          <FormField
            control={form.control}
            name="ktp_image"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="picture">Foto KTP</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleImageUpload(e);
                    }}
                  />
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

export default AddRenterForm;
