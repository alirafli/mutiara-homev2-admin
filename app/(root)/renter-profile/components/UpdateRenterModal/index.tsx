import { useToast } from "@/components/ui/use-toast";
import React, { useState, useTransition } from "react";
import { z } from "zod";
import { FormSchema } from "../AddRenterForm/schema";
import { useForm } from "react-hook-form";
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
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import DropDownComboBox from "@/components/ui/DropDownComboBox";
import { paymentStatusData, rentTimeData, statusData } from "@/data/renterData";
import { fileToBase64 } from "@/utils/FileToBase64";
import { updateRenterById, updateUserKtp } from "../../actions";
import { GetHousesNameQuery } from "@/hooks/useHouses";

type FormSchemaWithoutKtpImage = Omit<z.infer<typeof FormSchema>, "ktp_image">;

type OptionalFormSchema = { ktp_image?: string; amount_remaining: number };

useForm<FormSchemaWithoutKtpImage & OptionalFormSchema>;
interface UpdateRenterModalProps {
  renter: {
    title: string;
    value: any;
    id?: string;
  }[];
  id: string;
  imageUrl?: string;
}
function UpdateRenterModal({ renter, id, imageUrl }: UpdateRenterModalProps) {
  const [isPending, startTransition] = useTransition();
  const [selectedFile, setSelectedFile] = useState<File>();
  const { toast } = useToast();

  const getValueByTitle = (title: string, id = false) => {
    if (id) return renter.find((e) => e.title === title)?.id ?? "";
    return renter.find((e) => e.title === title)?.value ?? "";
  };

  const houseWithNullData = () => {
    return [
      { label: "tidak ada", value: null },
      ...(GetHousesNameQuery() ?? ""),
    ];
  };

  const form = useForm<FormSchemaWithoutKtpImage & OptionalFormSchema>({
    resolver: zodResolver(
      FormSchema.omit({ ktp_image: true, house_name: true }).extend({
        amount_remaining: z.string({ required_error: "wajib di isi!" }),
        house_name: z.string().nullable().optional(),
      })
    ),
    defaultValues: {
      name: getValueByTitle("nama"),
      is_active: getValueByTitle("status menetap") ? "ya" : "tidak",
      email: getValueByTitle("email"),
      password: getValueByTitle("password"),
      phone_number: getValueByTitle("nomor telpon"),
      payment_status: getValueByTitle("status pembayaran") ? "ya" : "tidak",
      house_name: getValueByTitle("nama rumah", true),
      nik: getValueByTitle("nik"),
      rent_time: getValueByTitle("waktu sewa"),
      amount_remaining: getValueByTitle("sisa pembayaran").toString(),
    },
  });

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setSelectedFile(e.target.files[0]);
  }

  function onSubmit(data: FormSchemaWithoutKtpImage & OptionalFormSchema) {
    const payload = {
      ...data,
      is_active: data.is_active === "ya" ? true : false,
      house_name: data.house_name === "-" ? null : data.house_name,
      payment_status: data.payment_status === "ya" ? true : false,
      amount_remaining: Number(data.amount_remaining),
    };
    startTransition(async () => {
      const result = await updateRenterById(id, payload);

      if (result.error && result.error.message) {
        toast({
          title: `gagal update ${id?.slice(0, 5)}`,
        });
      } else {
        toast({
          title: `berhasil update ${id?.slice(0, 5)}`,
        });
      }

      if (selectedFile) {
        const fileData = (await fileToBase64(selectedFile)) as string;
        const { error: imageError, data } = await updateUserKtp(
          id,
          fileData,
          imageUrl ?? ""
        );

        await updateRenterById(id, { image_url: data?.path });

        if (imageError && imageError.message) {
          toast({
            variant: "destructive",
            title: "gagal mengupload Foto KTP!",
            description: `${imageError.message}`,
          });
        } else {
          toast({
            title: "Berhasil update Foto KTP!",
          });
        }
      }
    });

    form.reset();
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
            name="name"
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
            name="amount_remaining"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Sisa Pembayaran</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nomor Telpon</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
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
                placeHolder="Pilih status menetap"
                title="Status Menetap"
              />
            )}
          />

          <FormField
            control={form.control}
            name="house_name"
            render={({ field }) => (
              <DropDownComboBox
                field={field}
                datas={houseWithNullData() ?? []}
                form={form}
                keyLabel={"house_name"}
                placeHolder="Pilih rumah"
                title="Rumah sewa"
              />
            )}
          />

          <FormField
            control={form.control}
            name="nik"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>NIK</FormLabel>
                <FormControl>
                  <Input {...field} />
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

export default UpdateRenterModal;
