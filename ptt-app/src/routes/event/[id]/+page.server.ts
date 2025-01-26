// import { GetEvent } from "$lib/server/sql";
import { GetEvent } from '$lib/server/sql/get/get-event.js';


export async function load({ params }) {
    console.log('Server params: ', params)
    const e = await GetEvent(params.id)
    if (!e.ok) {
        throw Error(`Server error getting ID: ${params.id}`);
    }
	return {e}
}