import type { newEvent, User, Votes } from '../../../types';
import { createClient, type ResultSet, type Row } from "@libsql/client";

const db = createClient({
  url: "file:src/database/main.db",
});

type VoteInput = {
    date: string
    names: string[]
    vote: vote
}

type vote = "yes" | "no" | "maybe"

type GetRunResponse = { ok: true } | {ok: false, error: string}

export async function AddVote(id: string, voteInput: VoteInput): Promise<GetRunResponse> {

    // const date = voVteInput.date;
    // const value = {
    //     [date]:voteInput.names.toString(),
    //     // votes: newUser[name].votes
    // }
    // console.log('name:', name)
    const params = {
        date: voteInput.date,
        names: voteInput.names.toString(),
        vote: `vote_${voteInput.vote}`,
        id: id,
    }
    console.log(params)

    try {

        `UPDATE event SET vote_yes=json_insert(vote_yes, '$[#]', json('{"date": "2024-11-25T10:18:00", "names": "bob,billy,michael"}')) WHERE id = 'O2KIbKf'`

        const stmt = await db.execute({
            sql:`UPDATE event SET vote_yes=json_insert(vote_yes, '$.' || :date, [:names]) WHERE id = :id`,
            args: params
        });
        return({ ok: true })
        
    } catch (error) {
        console.log(error)
        return({ok: false, error: new Error(`failed: ${error}`).message})
    }

}

type AddUserInput = {
    id: string
    date: string
    user: string
    vote: vote
}

export async function AddUserVote(input: AddUserInput): Promise<GetRunResponse> {

    // const date = voVteInput.date;
    // const value = {
    //     [date]:voteInput.names.toString(),
    //     // votes: newUser[name].votes
    // }
    // console.log('name:', name)
    const params = {
        date: input.date,
        user: input.user,
        id: input.id,
        vote: input.vote
    }
    console.log(params)

    let vote_param = ""

    if (input.vote === "yes") {
        vote_param = "UPDATE event SET vote_yes=json_insert(vote_yes, '$.' || :date || '[#]', :user) WHERE id = :id"
    }
    
    if (input.vote === "no") {
        vote_param = "UPDATE event SET vote_no=json_insert(vote_no, '$.' || :date || '[#]', :user) WHERE id = :id"
    }
    
    if (input.vote === "maybe") {
        vote_param = "UPDATE event SET vote_maybe=json_insert(vote_maybe, '$.' || :date || '[#]', :user) WHERE id = :id"
    }

    try {

        // `UPDATE event SET vote_yes=json_insert(vote_yes, '$[#]', json('{"date": "2024-11-25T10:18:00", "names": "bob,billy,michael"}')) WHERE id = 'O2KIbKf'`

        const stmt = await db.execute({
            sql: vote_param,
            args: params
        });
        return({ ok: true })
        
    } catch (error) {
        console.log(error)
        return({ok: false, error: new Error(`failed: ${error}`).message})
    }

}