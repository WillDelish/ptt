import type { newEvent, User, Votes } from '../../../types';
import { createClient } from "@libsql/client";

const db = createClient({
    url: "file:database/main.db",
});

type ID = {id: string}
type GetAllResponse = {ok: true, data: ID[]} | {ok: false, error: string}

export async function GetAllEventIds(): Promise<GetAllResponse> {
    try {
        const stmt = await db.execute('SELECT id FROM event;');
        const d = stmt.rows as unknown as ID[]
        console.log(d)
        return({ok: true, data: d})
        
    } catch (error) {
        return({ok: false, error: new Error(`failed: ${error}`).message})
    }
}