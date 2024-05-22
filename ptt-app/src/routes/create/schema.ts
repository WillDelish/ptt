import { z } from "zod";
 
export const formSchema = z.object({
    title: z.string().min(2).max(100),
    date: z.string().date(),
    time: z.string().max(10),
});
 
export type FormSchema = typeof formSchema;