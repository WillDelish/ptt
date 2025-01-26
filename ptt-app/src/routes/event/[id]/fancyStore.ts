import { writable, readable } from "svelte/store";
import { generateRandomString } from "$lib/id";


const starter: newEvent = {
    id: "1234567",
    title: "Talk about how cool Svelte is",
    created_at: new Date('1995-12-17T03:24:00').toString(),
    updated_at: new Date('1995-12-17T03:24:00').toString(),
    dates: ["1995-12-17T03:24:00","1995-12-17T05:24:00", "1995-12-17T06:24:00", "1995-12-20T03:24:00" ].toString(),
    votes: [{
        date: "1995-12-17T03:24:00",
        yes: ["bob"], 
        no: ["billy"],
        maybe: []
    }],
    users: {
        "bob": "American/LosAngels",
        "billy": "American/LosAngels",
    }
}

export type DateAndVotes = {
    date: string
    yes: string[]
    no: string[]
    maybe: string[]
}

export type User = {
    [key: string]: string // timezone
}

export type uctDates = string

export type newEvent = {
    id: string
    dates: string
    users?: User
    votes?: DateAndVotes[]
    title: string
    info?: string
    created_at?: string
    updated_at?: string
    finale_date?: string
}

// Create a writable store with the default data
export const eventStore = readable<newEvent>(starter);

export function GetTime(e: Date): string {
    const minute = e.getMinutes();
    const hour = e.getHours();

    return `${hour}:${minute}`

}

export function GetDay(e: Date): string {
    // Get the day of the week as a number (0-6)
    let dayNumber = e.getDay();

    // Map day numbers to names
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Get the name of the day
    let dayName = daysOfWeek[dayNumber];

    return dayName

}

export function NewEvent() {
    const newId = generateRandomString(7);

    
}

export function NewTime(){

}

export type GetVotesResp = {ok: true, data: VoteResults[]}
export type VoteResults = {
    date: string
    yes: number
    no: number
    maybe: number
}

// export function GetVotes(dates: DateAndVotes[], users: User): GetVotesResp {
//     const userId = Object.keys(users) as string[];
//     console.log('Users: ', userId[0])
    

//     const votes = dates.map(DaV => {
//         // let yes = 0;
//         // let no = 0;
//         // let maybe = 0;

//         userId.forEach(u => {
//             // if(users[u].votes) {}
//             const vt = users[u].votes || []
//             vt.forEach(m => {
//                 console.log('date: ' + d + ' match? ' + Object.keys(m))
//                 const userVoteDates = Object.keys(m)
//                 userVoteDates.forEach(uvd => {
//                     if (d === uvd) {
//                         console.log('User vote: ', m[uvd])
//                         if (m[uvd] === 'yes') { yes++ }
//                         if (m[uvd] === 'no') { no++}
//                         if (m[uvd] === 'maybe') { maybe++ }
//                     }
//                 })
//             })
//         })
//         return {
//             date: d,
//             yes,
//             no,
//             maybe
//         }
//     })

//     return {ok: true, data: votes };
// }

export function NewVote(data: Event){

}

export function addUser(user: User){

    

}

export function fancyDay(day: string) {
    const splitIt = day.split('')
    const numIt = Number(splitIt[-1])
    if (numIt == 1) {
        return `${day}st`
    }
    if (numIt == 2) {
        return `${day}nd`
    }
    if (numIt == 3) {
        return `${day}rd`
    }
    return `${day}th`
}