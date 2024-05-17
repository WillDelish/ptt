import { LocalDate, LocalTime, createClient } from 'edgedb';
import e from "../../../dbschema/edgeql-js";

type Event = {
	id: string;
	title: string;
	eventDate: LocalDate;
	eventTime: LocalTime;
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
                filter_single: e.op(event.id, '=', params.id),
        })));

    const result = await query.run(client, { id });

    return result;
} 