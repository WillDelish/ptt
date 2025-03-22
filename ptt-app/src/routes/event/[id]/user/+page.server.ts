import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { AddUser } from "$lib/server/sql/post/add-user";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(2).max(20),
	timezone: z.string().min(2).max(30),
});
 
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions = {
	addUser: async (event) => {

		const form = await superValidate(event, zod(formSchema));
		
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const name = form.data.name
		const timezone = form.data.timezone
		const eventId = event.params.id
		const addUser = await AddUser(eventId, {name: name, timezone: timezone})
        // console.log(eventId);
		if (!addUser.ok) {
			throw new Error('Failed to create user')
		}

		throw redirect(303, `/event/${eventId}/vote?user=${name}`);
	},
};
