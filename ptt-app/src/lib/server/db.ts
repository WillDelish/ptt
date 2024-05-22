import { LocalDate, LocalTime, createClient } from 'edgedb';
import e from "../../../dbschema/edgeql-js";

/*
people: array<
    tuple<
        name: str,
        timezone: str,
        votes: array<
            tuple<
                timeId: int64,
                vote: Choice
            >
        >
    >
>;
dates: array<
    tuple<
        date: cal::local_date, 
        dateId: int64, 
        times: array<
            tuple<time: cal::local_time, 
            timeId: int64>>>>;
*/

enum choice {
    "yes",
    "no",
    "maybe"
}

type time = {
    time: string,
    timeId: number
}

type timeVote = {
    timeId: number,
    vote: choice
}

type date = {
    localTime: string,
    dateId: number,
    times: time[]
}

type person = {
    name: string,
    timezone: string,
    votes: timeVote[]
}

type Event = {
	title: string;
	eventDate: string;
	eventTime: string;
    dates: date[];
    people: person[];
};

const client = createClient();

// export const events = await client.query<Event>(`\
//     select Event {
//         id,
//         title,
//         eventDate,
//         eventTime
//     };`
// );

export async function GetEvent(id: string) {
    const query = e.params({ id: e.uuid }, (params) => 
        e.select(e.Event, (event) => ({
                id: true,
                title: true,
                eventDate: true,
                eventTime: true,
                dates: true,
                people: true,
                filter_single: e.op(event.id, '=', params.id),
        })));

    const result = await query.run(client, { id });

    return result;
} 

export async function CreateEvent(EventObj: Event) {
    console.log(EventObj)
    const query = e.params({ title: e.str, eventDate: e.cal.local_date, eventTime: e.cal.local_time }, (params) => 
        e.insert(e.Event, {
                title: params.title,
                eventDate: params.eventDate,
                eventTime: params.eventTime
        }));

    const [year, month, day] = EventObj.eventDate.split('-').map(Number);

    const [hours, minutes] = EventObj.eventTime.split(':').map(Number);
    
    const result = await query.run(client, {
        title: EventObj.title,
        eventDate: new LocalDate(year, month, day),
        eventTime: new LocalTime(hours, minutes),
    });

    return result;
} 