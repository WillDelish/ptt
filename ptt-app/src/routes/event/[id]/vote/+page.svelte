<script lang="ts">
	import VoteCard from './voteCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { type parsedEvent } from '$lib/types';

	export const { data } = $props();
	if (!data.e.ok) {
		throw new Error('Data is bad somehow', data.e.error);
	}

	const dataSig = data.e.data as parsedEvent;

	// const votes = {
	//     yes: dataSig.vote_yes,
	//     no: dataSig.vote_no,
	//     maybe: dataSig.vote_maybe
	// }
	const userList = Object.keys(dataSig.users);
	// const usersArray = dataSig.users;
	// console.log(userList)

	let userName = $derived.by(() => {
		if (data.name && data.name.length > 1) {
			if (userList.includes(data.name)) {
				return `Name: ${data.name}`;
			}
			return `Error 404: ${data.name} not found`;
		}
		return 'Pick a user!';
	});

	type vote = 'yes' | 'no' | 'maybe';

	type UserVoteRecord = {
		[key: string]: vote;
	};
	// {"2024-11-11T15:18:00":["bob"],"2025-01-24T16:43:00":["bob"],"2025-01-24T09:55:00":["bob"],"2025-01-22T19:52:00":["bob"],"2025-01-22T10:55:00":["bob"]}
</script>

<div class="z-10 grid gap-4">
	<div class="mx-auto pb-8">
		<h1
			class="text-balance text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]"
		>
			{userName}
		</h1>
		<p class="max-w-[750px] text-balance text-center text-lg text-muted-foreground sm:text-xl">
			Lets plan this thing!
		</p>
	</div>
</div>
<VoteCard {dataSig} name={data.name} />
