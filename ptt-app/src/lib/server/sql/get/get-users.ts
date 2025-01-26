import type { newEvent, User, Votes } from '../../../types';
import { createClient } from "@libsql/client";

const db = createClient({
  url: "file:database/main.db",
});

export type queryUsers = {
    id: string
    users: string
}

type ParsedQuery = {
    [key: string]: string
}

type FancyUser = {
    name: string
    timezone: string
}

type GetResponse = {ok: true, data: FancyUser[]} | {ok: false, error: string}

export async function GetUsers(id: string): Promise<GetResponse> {
    try {
        const stmt = await db.execute({
            sql: 'SELECT users FROM event WHERE id = :id',
            args: {id: id}
        });
        
        const dd = stmt.rows[0] as unknown as queryUsers;
        const d = JSON.parse(dd.users) as ParsedQuery;
        // console.log(d)
        const keys = Object.keys(d)
        const newData: FancyUser[] = keys.map(key => {
            return {
                name: key,
                timezone: d[key]
            }
        })

        return({ok: true, data: newData})
        
    } catch (error) {
        return({ok: false, error: new Error(`failed: ${error}`).message})
    }

}