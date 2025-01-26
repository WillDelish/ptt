import type { newEvent, User, Votes } from '../../../types';
import { createClient, type ResultSet, type Row } from "@libsql/client";

const db = createClient({
  url: "file:database/main.db",
});

type AddUserInput = {
    name: string,
    timezone: string
}

type GetRunResponse = {ok: true, data: Row  } | {ok: false, error: string}

export async function AddUser(id: string, newUser: AddUserInput): Promise<GetRunResponse> {

    const name = newUser.name;
    // const value = {
    //     [name]:timezone,
    //     // votes: newUser[name].votes
    // }
    console.log('name:', name)
    const params = {
        name: name,
        val: newUser.timezone,
        id: id,
    }
    try {
        const stmt = await db.execute({
            sql:"UPDATE event SET users=json_insert(users, '$.' || :name, :val) WHERE id = :id",
            args: params
        });
        const d = stmt.rows[0]
        console.log(d)
        return({ok: true, data: d})
        
    } catch (error) {
        console.log(error)
        return({ok: false, error: new Error(`failed: ${error}`).message})
    }

}