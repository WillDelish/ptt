import { CreateEvent } from '$lib/server/db';
import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
 
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};
// import type { LocalDate, LocalTime } from 'edgedb';

export const actions = {
	newEvent: async ({ request }) => {

		const form = await superValidate(request, zod(formSchema));
		
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		// const formData = await request.formData();

		// const title = formData.get('name') as string;
		// const date = formData.get('date') as string;
		// const time = formData.get('time') as string;

        // console.log(title,date,time)

		// if (title && title.length < 2) {
		// 	return fail(400, {
		// 		error: true,
		// 		message: 'Name must be at least two characters.',
		// 		title,
        //         date,
        //         time
		// 	});
		// }

        const eventId = await CreateEvent({title: form.data.title, eventDate: form.data.date, eventTime: form.data.time})
        console.log(eventId);

		throw redirect(303, `event/${eventId.id}`);
        // return {
        //     success: true,
        //     message: eventId
        // }
	},
};
