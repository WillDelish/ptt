import { GetEvent } from "$lib/server/db";

export async function load({ params }) {
    console.log(params)
    const e = await GetEvent({eventId: params.id})
    if (!e) {
        throw Error();
    }

    if (!e.FancyDates) {
        throw Error();
    }

    const serialDates = e.FancyDates.map(g => {

        const stringTimes = g.times.map(t => {
            return {
                timeId: t.id,
                time: t.utcTime?.toString()
            }
        })

        return { 
            dateId: g.id,
            date: g.utcDate?.toString(),
            times: stringTimes
        }
    })

    const d = {
        title: e.title,
        date: e.eventDate?.toString(),
        time: e.eventTime?.toString(),
        dates: serialDates,
        people: e.fancyPeople
    }

    if (!d.dates && d.dates == 'undefined') {
        throw Error
    }
	return {
        d
    }
}