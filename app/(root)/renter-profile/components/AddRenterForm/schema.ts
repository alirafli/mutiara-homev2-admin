import { z } from "zod";

export const FormSchema = z.object({
  name: z.string({ required_error: "wajib di isi!" }),
  is_active: z.string({ required_error: "wajib di isi!" }),
  email: z.string({ required_error: "wajib di isi!" }),
  password: z.string({ required_error: "wajib di isi!" }),
  phone_number: z.string({ required_error: "wajib di isi!" }),
  payment_status: z.string({ required_error: "wajib di isi!" }),
  house_name: z.string({ required_error: "wajib di isi!" }),
  nik: z.string({ required_error: "wajib di isi!" }),
  rent_time: z.string({ required_error: "wajib di isi!" }),
  ktp_image: z.string({ required_error: "wajib di isi!" }),
});
