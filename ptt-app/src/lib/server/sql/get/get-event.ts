import type {
    newEvent,
    User,
    Votes,
    queryEvent,
    parsedEvent,
    myVote,
    NewDates,
    formatEventObj,
    fancyDateObj,
    Dates
} from '../../../types';
import { createClient } from '@libsql/client';
import { GetDay, GetTime, fancyDay, GetMonth } from '$lib/utils/dateHelper';

const db = createClient({
    url: 'file:database/main.db'
});

type GetResponse =
    | { ok: true; data: parsedEvent }
    | { ok: false; error: string };

export async function GetEvent(id: string): Promise<GetResponse> {
    try {
        const stmt = await db.execute({
            sql: 'SELECT * FROM event WHERE id = :id',
            args: { id: id }
        });

        const d = stmt.rows[0] as unknown as queryEvent;

        const getJsonDates = JSON.parse(d.vote_json) as NewDates;
        const datesArray = Object.keys(getJsonDates).map((key) => key);

        console.log('datesArray: ', datesArray);

        console.log(d);
        const newData: parsedEvent = {
            id: d.id,
            dates: datesArray,
            easyDates: await easyDateFormat(datesArray),
            users: JSON.parse(d.users) as User,
            title: d.title,
            info: d.info,
            vote_json: JSON.parse(d.vote_json) as NewDates,
            created_at: d.created_at,
            updated_at: d.updated_at,
            finale_date: d.finale_date
        };
        return { ok: true, data: newData };
    } catch (error) {
        return { ok: false, error: new Error(`failed: ${error}`).message };
    }
}

async function easyDateFormat(dates: string[]): Promise<formatEventObj[]> {
    const formatEventObj = {} as fancyDateObj;

    const sortedDates = dates.sort();

    sortedDates.forEach((utcDate) => {
        const year = new Date(utcDate).getFullYear().toString();
        const month = GetMonth(new Date(utcDate));
        const day = new Date(utcDate).getDate().toString();
        const dayName = GetDay(new Date(utcDate));
        const time = GetTime(new Date(utcDate));
        const dayId = `${year}-${month}-${day}`;

        // if the day doesn't match, we'll update it.
        if (!Object.keys(formatEventObj).includes(dayId)) {
            formatEventObj[dayId] = {
                utcDate: utcDate,
                year: year,
                month: month,
                day: day,
                nameOfDay: dayName,
                times: [{ t: time, utc: utcDate }]
            };
        } else {
            // only update the times
            formatEventObj[dayId].times.push({ t: time, utc: utcDate });
        }
    });

    const convertToArray = Object.keys(formatEventObj).map((key) => {
        return formatEventObj[key];
    });

    console.log(`Array values: `, convertToArray);

    return convertToArray;
}
