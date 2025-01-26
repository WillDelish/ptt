// import { CreateEvent, AddDate, AddTime } from '$lib/server/db';
// import { CreateEvent } from "$lib/server/sql";
import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { type User } from "../fancyStore";
import { AddUser } from "$lib/server/sql/post/add-user";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(2).max(20),
});
 
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions = {
	addUser: async ({ request, params }) => {

		// const form = await superValidate(request, zod(formSchema));
		
		// if (!form.valid) {
		// 	return fail(400, {
		// 		form,
		// 	});
		// }
		const formData = await request.formData();

		const name = formData.get('name') as string;
		// const id = params.id;

		if (name.length < 2) {
			return fail(400, {
				error: true,
				message: 'Name must be at least two characters.',
				name,
			});
		}


		// const newUser: User = {
		// 	[name]: {timezone: 'America/Los_Angeles'}
		// }

        // console.log('Adding user: ', newUser)

		const eventId = params.id

		const addUser = await AddUser(eventId, {name: name, timezone: 'America/Los_Angeles'})
        // console.log(eventId);
		if (!addUser.ok) {
			throw new Error('Failed to create user')
		}

		

		throw redirect(303, `/event/${eventId}`);

        // return {
        //     success: true,
        //     message: addUser
        // }
	},
};
