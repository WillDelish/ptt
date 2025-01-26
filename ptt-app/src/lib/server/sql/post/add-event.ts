import type { newEvent, User, Votes } from '../../../types';
import { createClient } from "@libsql/client";

const db = createClient({
  url: "file:database/main.db",
});

type CreateResponse = {ok: true, id: string} | {ok: false, error: Error}

// Need to provide the functionality to have multiple dates for the event
export async function CreateEvent(q: newEvent): Promise<CreateResponse> {
    const params = {
        id: q.id,
        dates: q.dates.toString(),
        title: q.title,
        users: "{}",
        vote_yes: "{}",
        vote_no: "{}",
        vote_maybe: "{}",
    }

    try {

        const ce = await db.execute({
            sql: "INSERT into event (id, dates, title, users, vote_yes, vote_no, vote_maybe) VALUES (:id, json_array(:dates), :title, :users, :vote_yes, :vote_no, :vote_maybe)",
            args: params
        })
        // const stmt = await db.execute(`INSERT into event (:id, :dates, :users, :votes, :title, :created_at) VALUES (?,json_array(?),?,json_array(?),?,?)`)
        // const d = stmt.run(`${q.id}`, `${q.dates}`, `${q.users}`, `${votes}`,`${q.title}`,`${q.created_at}`);
        console.log(ce)
        return({ok: true, id: q.id})
        
    } catch (error) {
        return({ok: false, error: new Error(`failed: ${error}`)})
    }
}