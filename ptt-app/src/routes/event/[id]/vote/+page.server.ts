import { GetEvent } from '$lib/server/sql/get/get-event.js';
import { AddUserVote } from '$lib/server/sql/post/add-vote';
import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export async function load({ url, params }) {
    const e = await GetEvent(params.id);
    if (!e.ok) {
        throw Error(`Server error getting ID: ${params.id}`);
    }

    const userName = url.searchParams.get('user');
    console.log(params);

    return {
        e,
        name: userName
    };
}

const voteSchema = z.enum(['yes', 'no', 'maybe']);

const userVotePropSchema = z.record(voteSchema);

const formSchema = z.object({
    votes: userVotePropSchema,
    date: z.string(),
    user: z.string()
});

export const actions = {
    addUser: async (event) => {
        const form = await superValidate(event, zod(formSchema));

        if (!form.valid) {
            return fail(400, {
                form
            });
        }

        const vote = form.data.votes;
        const date = form.data.votes;
        const userName = form.data.user;
        const eventId = event.params.id;
        const addVote = await AddUserVote({ id: eventId, votes: vote, user: userName });
        // console.log(eventId);
        if (!addVote.ok) {
            throw new Error('Failed to create user');
        }

        return { ok: 200 };
    }
};
