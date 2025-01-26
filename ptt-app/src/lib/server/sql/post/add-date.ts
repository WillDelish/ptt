import { createClient, type ResultSet, type Row } from "@libsql/client";

const db = createClient({
  url: "file:database/main.db",
});

type GetRunResponse = {ok: true, data: Row  } | {ok: false, error: string}

export async function AddDateTime(id: string, time: string): Promise<GetRunResponse> {

    const params = {
        time: time,
        id: id,
    }

    try {
        const stmt = await db.execute({
            sql:"UPDATE event SET dates=json_insert(dates, '$[#]', :time) WHERE id = :id",
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