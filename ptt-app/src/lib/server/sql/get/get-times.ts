// import { newEvent, User } from '../types'
// import { createClient } from "@libsql/client";

// const db = createClient({
//   url: "file:src/database/main.db",
// });

// export type queryDates = {
//     id: string
//     dates: string
// }

// type prettyTimeJson = {
//     prettyDate: string
//     prettyTime: string
// }

// type GetResponse = {ok: true, data: prettyTimeJson[]} | {ok: false, error: string}

// export async function GetTimes(id: string): Promise<GetResponse> {
//     try {
//         const stmt = await db.execute({
//             sql: 'SELECT dates FROM event WHERE id = :id',
//             args: {id: id}
//         });
        
//         const d = stmt.rows as unknown as queryDates[];
//         console.log(d)
//         // console.log('users: ', JSON.parse(d.users))
//         const newData: queryDates = {
//             id: d.id,
//             dates: JSON.parse(d.dates),
//         }
//         return({ok: true, data: newData})
        
//     } catch (error) {
//         return({ok: false, error: new Error(`failed: ${error}`).message})
//     }

// }