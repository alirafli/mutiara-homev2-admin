import { z } from "zod";

export const FormSchema = z.object({
  status: z.string({ required_error: "wajib di isi!" }),
  answer: z.string({ required_error: "wajib di isi!" }),
});
