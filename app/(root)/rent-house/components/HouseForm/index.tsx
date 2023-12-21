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
import { DialogFooter } from "@/components/ui/dialog";
import { AiOutlineLoading } from "react-icons/ai";
import DropDownComboBox from "@/components/ui/DropDownComboBox";
import { isRoomFill, rentStatus } from "@/data/houseData";
import { addHouse, updateHousePhotos, uploadHousePhotos } from "../../actions";
import { toast } from "@/components/ui/use-toast";
import { fileToBase64 } from "@/utils/FileToBase64";

interface AddRenterFormProps {
  handleModalOpen: (value: boolean) => void;
}

function AddHouseForm({ handleModalOpen }: AddRenterFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<FileList>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rent_status: "tidak",
      has_previous: "tidak",
    },
  });

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    if (e.target.files.length > 3)
      return toast({
        variant: "destructive",
        title: "maksimal 3!",
      });

    setSelectedFiles(e.target.files);
  }

  const updatedHousePhoto = async (houseId: string) => {
    const imagesCollection: string[] = [];
    if (!selectedFiles) return;

    Array.from(selectedFiles).map(async (file) => {
      const fileData = (await fileToBase64(file)) as string;
      await uploadHousePhotos(houseId, fileData, file.name).then((e) => {
        imagesCollection.push(e.data?.path ?? "");
        if (e.error && e.error.message)
          return toast({
            variant: "destructive",
            title: "gagal mengupload Foto rumah!",
            description: `${e.error.message} - ${file.name}`,
          });
      });
      if (selectedFiles.length === imagesCollection.length) {
        await updateHousePhotos(houseId, imagesCollection);
        toast({
          title: `berhasil upload ${imagesCollection.length} Foto!`,
        });
      }
    });

    return imagesCollection;
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const payload = {
      ...data,
      photos: undefined,
      income: 0,
      rent_status: data.rent_status === "ya" ? true : false,
      has_previous: data.has_previous === "ya" ? true : false,
    };

    startTransition(async () => {
      const { house, error } = await addHouse(payload);

      if (house) {
        updatedHousePhoto(house.id);
      }

      if (error && error.message) {
        toast({
          variant: "destructive",
          title: "gagal menambahkan data rumah!",
          description: `${error.code}: ${error.message}`,
        });
      } else {
        toast({
          title: "rumah baru berhasil ditambahkan!",
        });
      }
    });
    handleModalOpen(false);
    form.reset();
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
                <FormLabel>Nama rumah</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price_per_month"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Harga Sewa per Bulan</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 flex-col md:flex-row items-end">
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
        </div>

        <div className="flex gap-4 flex-col md:flex-row items-end">
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
        </div>

        <div className="flex gap-4 flex-col md:flex-row items-end">
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
        </div>

        <div className="flex gap-4 flex-col md:flex-row items-end">
          <FormField
            control={form.control}
            name="photos"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="picture">Foto Rumah</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
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

export default AddHouseForm;
