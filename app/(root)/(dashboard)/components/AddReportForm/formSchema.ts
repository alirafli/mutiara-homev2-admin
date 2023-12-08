import { z } from "zod";

export const formSchema = z.object({
  date: z.date({
    required_error: "wajib di isi!",
  }),
  house_name: z.string({
    required_error: "wajib di isi!",
  }),
  renter_name: z.string({
    required_error: "wajib di isi!",
  }),
  amount: z.string({
    required_error: "wajib di isi!",
  }),
  category: z.string({
    required_error: "wajib di isi!",
  }),
  type: z.string({
    required_error: "wajib di isi!",
  }),
  account: z.string({
    required_error: "wajib di isi!",
  }),
  note: z.string({
    required_error: "wajib di isi!",
  }),
});
