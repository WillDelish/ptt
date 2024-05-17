import { GetEvent } from "$lib/server/db";


// const e = events.map((r) => {
//     const v = {
//         title: r.title,
//         date: r.eventDate.toString(),
//         time: r.eventTime.toString(),
//     }
//     return {...v}
// })

// console.log(e)

export async function load({ params }) {
    console.log(params)
    const e = await GetEvent(params.id)
    if (!e) {
        throw Error();
    }
    const d = {
        title: e.title,
        date: e.eventDate?.toString(),
        time: e.eventTime?.toString(),
    }
	return {
        d
    }
}