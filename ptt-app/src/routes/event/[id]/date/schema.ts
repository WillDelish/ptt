import { z } from "zod";
 
export const formSchema = z.object({
    date: z.string().date(),
    time: z.string().max(10),
});
 
export type FormSchema = typeof formSchema;