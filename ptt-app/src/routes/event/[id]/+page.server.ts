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

    if (!e.dates) {
        throw Error();
    }

    const serialDates = e.dates.map(g => {

        const stringTimes = g.times.map(t => {
            return {
                timeId: t.timeId,
                time: t.time.toString()
            }
        })

        return { 
            dateId: g.dateId,
            date: g.date.toString(),
            times: stringTimes
        }
    })

    const d = {
        title: e.title,
        date: e.eventDate?.toString(),
        time: e.eventTime?.toString(),
        dates: serialDates,
        people: e.people
    }

    if (!d.dates && d.dates == 'undefined') {
        throw Error
    }
	return {
        d
    }
}