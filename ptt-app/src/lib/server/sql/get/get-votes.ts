import type { newEvent, User, Votes } from '../../../types';
import { createClient } from "@libsql/client";

const db = createClient({
  url: "file:database/main.db",
});

export type queryDates = {
    id: string
    vote_yes: Object
    vote_no: Object
    vote_maybe: Object
}

type GetResponse = {ok: true, data: queryDates} | {ok: false, error: string}

export async function GetVotes(id: string): Promise<GetResponse> {
    try {
        const stmt = await db.execute({
            sql: 'SELECT vote_yes, vote_no, vote_maybe FROM event WHERE id = :id',
            args: {id: id}
        });
        
        const d = stmt.rows[0] as unknown as Votes;
        console.log(d)
        // console.log('users: ', JSON.parse(d.users))
        const newData: queryDates = {
            id: id,
            vote_yes: JSON.parse(d.vote_yes),
            vote_no: JSON.parse(d.vote_no),
            vote_maybe: JSON.parse(d.vote_maybe),
        }
        return({ok: true, data: newData})
        
    } catch (error) {
        return({ok: false, error: new Error(`failed: ${error}`).message})
    }

}