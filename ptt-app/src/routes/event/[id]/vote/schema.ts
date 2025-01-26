import { z } from "zod";
 
export const nameFormSchema = z.object({
    name: z.string().min(2).max(50),
    time: z.string().min(2).max(4),
});
 
export type NameFormSchema = typeof nameFormSchema;