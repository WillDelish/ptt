import type { newEvent, User, Votes } from '../../../types';
import { createClient } from "@libsql/client";
import { GetDay, GetTime, fancyDay, GetMonth } from '$lib/server/utils/dateHelper';

const db = createClient({
  url: "file:database/main.db",
});

export type queryEvent = {
    id: string
    dates: string
    users: string
    title: string
    vote_yes: string
    vote_no: string
    vote_maybe: string
    info?: string
    created_at?: string
    updated_at?: string
    finale_date?: string
}

export type parsedEvent = {
    id: string
    dates: string[]
    easyDates: formatEventObj[]
    users: User
    title: string
    vote_yes: Dates
    vote_no: Dates
    vote_maybe: Dates
    info?: string
    created_at?: string
    updated_at?: string
    finale_date?: string
}

export type formatEventObj = {
    utcDate: string
    nameOfDay: string
    day: string
    month: string
    year: string
    times: string[]
}

export type fancyDateObj = {
    [key: string]: formatEventObj
}

export type Dates = {
    [key: string]: string[]
}

type GetResponse = {ok: true, data: parsedEvent} | {ok: false, error: string}

export async function GetEvent(id: string): Promise<GetResponse> {
    try {
        const stmt = await db.execute({
            sql: 'SELECT * FROM event WHERE id = :id',
            args: {id: id}
        });
        
        const d = stmt.rows[0] as unknown as queryEvent;
        console.log(d)
        // console.log('dates: ', d.dates)
        // console.log('users: ', JSON.parse(d.users))
        const newData: parsedEvent = {
            id: d.id,
            dates: JSON.parse(d.dates),
            easyDates: await easyDateFormat(JSON.parse(d.dates)),
            users: JSON.parse(d.users) as User,
            title: d.title,
            info: d.info,
            vote_yes: JSON.parse(d.vote_yes) as Dates,
            vote_no: JSON.parse(d.vote_no) as Dates,
            vote_maybe: JSON.parse(d.vote_maybe) as Dates,
            created_at: d.created_at,
            updated_at: d.updated_at,
            finale_date: d.finale_date
        }
        return({ok: true, data: newData})
        
    } catch (error) {
        return({ok: false, error: new Error(`failed: ${error}`).message})
    }

}

async function easyDateFormat( dates: string[] ): Promise<formatEventObj[]> {
    const formatEventObj = {} as fancyDateObj;

    dates.forEach(utcDate => {

        const year = new Date(utcDate).getFullYear().toString()
        const month = GetMonth(new Date(utcDate))
        const day = new Date(utcDate).getDate().toString()
        const dayName = GetDay(new Date(utcDate))
        const time = GetTime(new Date(utcDate))
        const dayId = `${year}-${month}-${day}`

        // if the day doesn't match, we'll update it.
        if (!Object.keys(formatEventObj).includes(dayId)) {
            formatEventObj[dayId] = {
                utcDate: utcDate,
                year: year,
                month: month,
                day: day,
                nameOfDay: dayName,
                times: [time]
            }
        } else {
            // only update the times
            formatEventObj[dayId].times.push(time);
        }
    })

    const convertToArray = Object.keys(formatEventObj).map(key => {
        return formatEventObj[key]
    })

    console.log(`Array values: `, convertToArray)

    return convertToArray;
}