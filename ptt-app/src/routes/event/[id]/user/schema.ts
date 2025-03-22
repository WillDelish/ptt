import { z } from "zod";
 
export const formSchema = z.object({
    name: z.string().min(2).max(20),
    timezone: z.string().min(5).max(30)
});
 
export type FormSchema = typeof formSchema;