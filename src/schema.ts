import { z } from "zod";

export const FormData = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(5),
});

export type FormSchema = z.infer<typeof FormData>;
