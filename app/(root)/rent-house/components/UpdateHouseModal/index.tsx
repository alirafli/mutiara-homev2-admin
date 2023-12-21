import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormSchema } from "../HouseForm/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DropDownComboBox from "@/components/ui/DropDownComboBox";
import { GetUserNameQuery } from "@/hooks/useUser";
import { isRoomFill, rentStatus } from "@/data/houseData";
import { updateHouseById } from "../../actions";

interface UpdateHouseModalProps {
  id: string;
  house: {
    title: string;
    value: any;
    id?: string;
  }[];
}

type OptionalFormSchema = { user_id?: string; income: string };

function UpdateHouseModal({ house, id }: UpdateHouseModalProps) {
  const [isPending, startTransition] = useTransition();

  const getValueByTitle = (title: string, id = false) => {
    if (id) return house.find((e) => e.title === title)?.id ?? "";
    return house.find((e) => e.title === title)?.value ?? "";
  };

  const userWithNullData = () => {
    return [{ label: "tidak ada", value: null }, ...(GetUserNameQuery() ?? "")];
  };

  const form = useForm<z.infer<typeof FormSchema> & OptionalFormSchema>({
    resolver: zodResolver(
      FormSchema.extend({
        user_id: z.string().nullable().optional(),
        income: z.string({ required_error: "wajib di isi!" }),
      })
    ),
    defaultValues: {
      name: getValueByTitle("nama"),
      user_id: getValueByTitle("Penyewa", true),
      rent_status: getValueByTitle("Status Sewa") ? "ya" : "tidak",
      price_per_month: getValueByTitle("Harga per Bulan").toString(),
      address: getValueByTitle("alamat"),
      map_link: getValueByTitle("link maps"),
      room: getValueByTitle("Jumlah ruangan").toString(),
      has_previous: getValueByTitle("apakah ada parabot sebelumnya?")
        ? "ya"
        : "tidak",
      bathroom: getValueByTitle("Jumlah kamar mandi").toString(),
      income: getValueByTitle("Pemasukan").toString(),
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema> & OptionalFormSchema) {
    const payload = {
      ...data,
      income: Number(data.income),
      user_id: data?.user_id === "-" ? null : data.user_id,
      has_previous: data.has_previous === "ya" ? true : false,
      rent_status: data.rent_status === "ya" ? true : false,
    };
    startTransition(async () => {
      const result = await updateHouseById(id, payload);

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
                <FormLabel>Nama Rumah</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="user_id"
            render={({ field }) => (
              <DropDownComboBox
                field={field}
                datas={userWithNullData() ?? []}
                form={form}
                keyLabel="user_id"
                placeHolder="Pilih penyewa"
                title="Nama Penyewa"
              />
            )}
          />

          <FormField
            control={form.control}
            name="rent_status"
            render={({ field }) => (
              <DropDownComboBox
                field={field}
                datas={rentStatus}
                form={form}
                keyLabel={"rent_status"}
                placeHolder="Pilih"
                title="Status sewa"
              />
            )}
          />

          <FormField
            control={form.control}
            name="price_per_month"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Harga per Bulan</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="map_link"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Link Maps</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="room"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Jumlah Ruangan</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathroom"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Jumlah Kamar Mandi</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="income"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Pemasukan</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="has_previous"
            render={({ field }) => (
              <DropDownComboBox
                field={field}
                datas={isRoomFill}
                form={form}
                keyLabel={"has_previous"}
                placeHolder="Pilih"
                title="apakah sebelumnya terisi?"
              />
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

export default UpdateHouseModal;
