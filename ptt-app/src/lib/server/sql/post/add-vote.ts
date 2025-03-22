import type { newEvent, User, Votes, vote } from '../../../types';
import { createClient, type ResultSet, type Row } from "@libsql/client";

const db = createClient({
    url: "file:database/main.db",
});

type GetRunResponse = { ok: true } | {ok: false, error: string}
type UserVoteProp = { [key: string]: vote }
type AddUserInput = {
    id: string
    user: string
    // votes: arrayVotes[]
    votes: UserVoteProp
}

// Take in an array of time and vote options
// Call the DB to push them
export async function AddUserVote(input: AddUserInput): Promise<GetRunResponse> {

    // console.log(`AddUserVote input: `, input)

    const voteKeys = Object.keys(input.votes)

    const arryVoteObj = voteKeys.map(m => {
        return {
            vote: input.votes[m],
            date: m
        }
    })

    // console.log(arryVoteObj);

    const voteArray = arryVoteObj.map(v => {
        const voteBuilder = ({vote, date, user, id}: {vote: string, date: string, user: string, id: string}) => `UPDATE event SET vote_json=json_set(vote_json, '$.${date}.${user}', '${vote}') WHERE id='${id}'`

        if (v.vote === "yes") {
            const vote_param = voteBuilder({vote: 'yes', date: v.date, user: input.user, id: input.id})
            return vote_param
        }
        if (v.vote === "no") {
            const vote_param = voteBuilder({vote: 'no', date: v.date, user: input.user, id: input.id})
            return vote_param
        }
        if (v.vote === "maybe") {
            const vote_param = voteBuilder({vote: 'maybe', date: v.date, user: input.user, id: input.id})
            return vote_param
        }
        // if we have a bad vote value, we'll get an error.
        throw new Error("No vote options found")
    }) 

    // const voteArray = [`UPDATE event SET vote_json = json_set(vote_json, '$.2024-11-11T15:18:00.bob', 'yes') WHERE id='wVu8SvW'`]

    console.log('vote array: ', voteArray)

    try {

        const stmt = await db.batch(
            voteArray,
            "write"
        );
        return({ ok: true })
        
    } catch (error) {
        console.log(error)
        return({ok: false, error: new Error(`failed: ${error}`).message})
    }

}