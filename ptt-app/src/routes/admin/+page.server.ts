// import { GetAllEventIds } from "$lib/server/sql";
import { GetAllEventIds } from "$lib/server/sql/get/get-all-events";

export async function load() {
    // console.log(params)
    const e = await GetAllEventIds()
    if (!e.ok) {
        throw Error(e.error);
    }
	return {
       e 
    }
}