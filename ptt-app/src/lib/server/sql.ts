// // import Database, {type RunResult} from 'better-sqlite3';
// import { type newEvent, type User, type uctDates } from '../../routes/event/[id]/fancyStore';

// type EventStore = {
//     id: string
//     data: Event
// }

// export type queryEvent = {
//     id: string
//     dates: string
//     users: string
//     title: string
//     votes: string
//     info?: string
//     created_at?: string
//     updated_at?: string
//     finale_date?: string
// }

// type GetResponse = {ok: true, data: newEvent} | {ok: false, error: string}
// type GetRunResponse = {ok: true, data: RunResult} | {ok: false, error: string}
// type GetAllResponse = {ok: true, data: ID[]} | {ok: false, error: string}
// type CreateResponse = {ok: true, id: string} | {ok: false, error: string}

// // type pick = "yes" | "no" | "maybe"
// // type Vote = {[key: string]: pick}
// // type UserBody = {
// //     timezone: string
// //     votes: Vote[]
// // }
// // type User = {
// //     [key: string]: UserBody
// // }

// // type uctDates = string

// // type newEvent = {
// //     id: string
// //     dates: uctDates[]
// //     users: User[]
// //     title: string
// //     info?: string
// //     created_at?: string
// //     updated_at?: string
// //     finale_date?: string
// // }

// // [
// //     {"name": "bob", "timezone": "American/LosAngels", "votes": [{"1995-12-17T03:24:00": "yes"}]},
// //     {"name": "billy", "timezone": "American/LosAngels", "votes": [{"1995-12-17T03:24:00": "no"}]}
// // ]

// const db = new Database('./database/main.db', { readonly: false});
// db.pragma('journal_mode = WAL');

// export async function CreateEvent(q: newEvent): Promise<CreateResponse> {
//     const votes = q.dates.map(date => {
//         return {
//             date: date,
//             yes: [],
//             no: [],
//             maybe: []
//         }
//     })
//     const params = {
//         id: q.id,
//         dates: q.dates,
//         users: q.users,
//         votes: q.votes,
//         title: q.title,
//         created_at: q.created_at
//     }
// //     const stmt = db.prepare(`INSERT into event (:id, :dates, :users, :votes, :title, :created_at)
// // VALUES (?,json_array(?),?,json_array(?),?,?)`)
//     const stmt = db.prepare(`INSERT into event (:id, :dates, :users, :votes, :title, :created_at)
// VALUES (?,json_array(?),?,json_array(?),?,?)`)
//     try {
//         const d = stmt.run(`${q.id}`, `${q.dates}`, `${q.users}`, `${votes}`,`${q.title}`,`${q.created_at}`);
//         console.log(d)
//         return({ok: true, id: q.id})
        
//     } catch (error) {
//         return({ok: false, error: new Error(`failed: ${error}`).message})
//     }
// }

// type ID = {id: string}

// export async function GetAllEventIds(): Promise<GetAllResponse> {
//     const stmt = db.prepare('SELECT id FROM event;');
//     try {
//         const d = stmt.all() as ID[]
//         // console.log(typeof(d))
//         return({ok: true, data: d})
        
//     } catch (error) {
//         return({ok: false, error: new Error(`failed: ${error}`).message})
//     }
// }

// export async function GetEvent(id: string): Promise<GetResponse> {
//     const stmt = db.prepare('SELECT * FROM event WHERE id = ?');
//     try {
//         const d = stmt.get(`${id}`) as queryEvent;
//         console.log(d)
//         // console.log('dates: ', d.dates)
//         // console.log('users: ', JSON.parse(d.users))
//         const newData: newEvent = {
//             id: d.id,
//             dates: JSON.parse(d.dates),
//             users: JSON.parse(d.users) as User,
//             title: d.title,
//             info: d.info,
//             created_at: d.created_at,
//             updated_at: d.updated_at,
//             finale_date: d.finale_date
//         }
//         return({ok: true, data: newData})
        
//     } catch (error) {
//         return({ok: false, error: new Error(`failed: ${error}`).message})
//     }

// }

// export async function AddDate(id: string, date: uctDates): Promise<GetResponse> {
//     /*
// const updateStmt = db.prepare(`
//   UPDATE example
//   SET data = json_array(data, '$.items', 'cherry')
//   WHERE id = ?
// `);
//     */
//     const stmt = db.prepare('UPDATE event SET events WHERE id = ?');
//     try {
//         const d = stmt.get(`${id}`) as newEvent;
//         // console.log(d)
//         console.log(typeof(d))
//         return({ok: true, data: d})
        
//     } catch (error) {
//         return({ok: false, error: new Error(`failed: ${error}`).message})
//     }

// }

// export async function AddTime(id: string, time: string): Promise<GetRunResponse> {
//     const stmt = db.prepare(
//         `UPDATE event
//         SET dates=json_array(dates, ?)
//         WHERE id = ?`
//     );
//     try {
//         const d = stmt.run(time, id);
//         console.log(d)
//         return({ok: true, data: d})
        
//     } catch (error) {
//         return({ok: false, error: new Error(`failed: ${error}`).message})
//     }

// }

// `UPDATE users 
// SET data = json_insert(
//   data, 
//   '$.' || :name, 
//   json_object('timezone', :timezone, 'votes', json(:votes))
// ) 
// WHERE id = 1
// RETURNING data`

// export async function AddUser(id: string, newUser: User): Promise<GetRunResponse> {
//     const name = Object.keys(newUser)[0]
//     // const value = {
//     //     [name]:timezone,
//     //     // votes: newUser[name].votes
//     // }
//     console.log('name:', name)
//     const stmt = db.prepare(`UPDATE event SET users=json_insert(users, '$.' || :name, :val) WHERE id = :id`);
//     const params = {
//         name: name,
//         val: newUser.value,
//         id: id,
//     }
//     try {
//         const d = stmt.run(params)
//         console.log(d)
//         return({ok: true, data: d})
        
//     } catch (error) {
//         console.log(error)
//         return({ok: false, error: new Error(`failed: ${error}`).message})
//     }

// }