import { z } from "zod";

export const FormSchema = z.object({
  name: z.string({ required_error: "wajib di isi!" }),
  address: z.string({ required_error: "wajib di isi!" }),
  map_link: z.string({ required_error: "wajib di isi!" }),
  room: z.string({ required_error: "wajib di isi!" }),
  has_previous: z.string({ required_error: "wajib di isi!" }),
  bathroom: z.string({ required_error: "wajib di isi!" }),
  price_per_month: z.string({ required_error: "wajib di isi!" }),
  rent_status: z.string(),
  photos: z.any(),
});
