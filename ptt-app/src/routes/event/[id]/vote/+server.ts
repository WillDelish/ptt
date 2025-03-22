import { json } from '@sveltejs/kit';
import { AddUserVote } from '$lib/server/sql/post/add-vote';
import { z } from 'zod';

const voteSchema = z.enum(['yes', 'no', 'maybe']);

const userVotePropSchema = z.record(voteSchema);

const formSchema = z.object({
	votes: userVotePropSchema,
	date: z.string(),
	user: z.string()
});

export async function POST({ request }) {
	const data = await request.json(); // Parse JSON data

	const vote = data.votes;
	const userName = data.user;
	const eventId = data.id;
	const addVote = await AddUserVote({ id: eventId, votes: vote, user: userName });

	console.log('Received data:', data);

	return json({ message: 'Vote recorded!', received: data });
}