// import { CreateEvent, AddDate, AddTime } from '$lib/server/db';
import { CreateEvent } from "$lib/server/sql/post/add-event";
import { generateRandomString } from "$lib/id";
import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { type newEvent, type Votes, type User } from '$lib/types';
 
export const load: PageServerLoad = async () => {
  return {
	form: await superValidate(zod(formSchema))
  };
};

export const actions = {
	// default: async (event) => {
	// 	const form = await superValidate(event, zod(formSchema));
	// 	if (!form.valid) {
	// 	  return fail(400, {
	// 		form,
	// 	  });
	// 	}
	// 	return {
	// 	  form,
	// 	};
	//   },
	// };
	newEvent: async (event) => {

		// const formData = await request.formData();
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
		  return fail(400, {
			form,
		  });
		}

		// const t = form.data.

		// const title = formData.get('title') as string;
		// const date = formData.get('date') as string;
		// const time = formData.get('time') as string;
		
		const title = form.data.title
		const date = form.data.date
		const time = form.data.time

        console.log(title,date,time)

		if (title && title.length < 2) {
			return fail(400, {
				error: true,
				message: 'Name must be at least two characters.',
				title,
                date,
                time
			});
		}

		const newId = generateRandomString(7);

		const newEvent: newEvent = {
			id: newId,
			title: title,
			created_at: Date.now().toString(),
			updated_at: Date.now().toString(),
			dates: [`${date}T${time}:00`],
			// vote_yes: { [`${date}T${time}:00`]: [] },
			// vote_no: { [`${date}T${time}:00`]: [] },
			// vote_maybe: { [`${date}T${time}:00`]: [] },
			// users: {}
		}

		const eventId = await CreateEvent(newEvent)
        console.log(eventId);
		if (!eventId.ok) {
			throw new Error('Failed to create event: ', eventId.error )
		}

		throw redirect(303, `event/${eventId.id}`);
	},
};
