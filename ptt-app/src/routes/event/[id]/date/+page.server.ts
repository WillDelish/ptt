// import { CreateEvent, AddDate, AddTime} from '$lib/server/db';
// import { CreateEvent } from "$lib/server/sql";
import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { type User } from "../fancyStore";
import { AddDateTime } from "$lib/server/sql/post/add-date";
import { z } from "zod";
import { formSchema, type FormSchema } from './schema';

// const formSchema = z.object({
//     date: z.string(),
//     time: z.string(),
// });
 
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions = {
	addDate: async (event) => {

		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
		  return fail(400, {
			form,
		  });
		}

		// const formData = await request.formData();

		const newDate = form.data.date
		const newTime = form.data.time
		// const newDate = formData.get('date') as string;
		// const newTime = formData.get('time') as string;

		const dateTime = `${newDate}T${newTime}:00`

		console.log('Current date time: ', dateTime)

		// const eventId = params.id
		const eventId = event.params.id
		console.log('Event id is: ', eventId)
		const isoDate = new Date(dateTime)

		const addDate = await AddDateTime(eventId, dateTime)
        // console.log(eventId);
		if (!addDate.ok) {
			throw new Error('Failed to add date')
		}

		

		throw redirect(303, `/event/${eventId}`);

        // return {
        //     success: true,
        //     message: addDate
        // }
	},
};
