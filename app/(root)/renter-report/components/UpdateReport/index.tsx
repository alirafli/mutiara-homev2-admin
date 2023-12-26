import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import { SheetClose } from "@/components/ui/sheet";
import { editReport } from "../../actions";
import { toast } from "@/components/ui/use-toast";
import { FormSchema } from "./schema";
import DropDownComboBox from "@/components/ui/DropDownComboBox";
import { renterReportStatus } from "@/data/renterData";

interface UpdateReportProps {
  id: string;
  report: {
    title: string;
    value: any;
    id?: string;
  }[];
}
const UpdateReport = ({ report, id }: UpdateReportProps) => {
  const [isPending, startTransition] = useTransition();

  const getValueByTitle = (title: string, id = false) => {
    if (id) return report.find((e) => e.title === title)?.id ?? "";
    return report.find((e) => e.title === title)?.value ?? "";
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      answer: getValueByTitle("jawaban pengelola"),
      status: getValueByTitle("status"),
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const { error } = await editReport(data, id);

      if (error && error.message) {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jawaban Penyewa</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <DropDownComboBox
              field={field}
              datas={renterReportStatus}
              form={form}
              keyLabel={"status"}
              placeHolder="Pilih"
              title="pilih status"
            />
          )}
        />

        <SheetClose className="gap-6">
          <Button type="submit" disabled={isPending}>
            {isPending ? <AiOutlineLoading className="animate-spin" /> : "Ubah"}
          </Button>
        </SheetClose>
      </form>
    </Form>
  );
};

export default UpdateReport;
