import { z } from "zod";

export const userRegistrationSchema = z.object({
  name: z.string(),
  email: z.email(),
});
