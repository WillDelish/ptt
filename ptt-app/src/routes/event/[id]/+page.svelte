<script lang="ts">
    import ShareLink from '$lib/components/custom/share.svelte';
    import ResultTest from './result.svelte'
    import PeopleCard from './people-card.svelte'
    import Button from '$lib/components/ui/button/button.svelte';
	import type { parsedEvent } from '$lib/types';
	import { object } from 'zod';

    export const { data } = $props();
    if (!data.e.ok) {
        throw new Error("Data is bad somehow", data.e.error)
    }
    console.log('Data: ', data)

    const dataSig = data.e.data as parsedEvent;
    const id = dataSig.id;
    const userList = Object.keys(dataSig.users);
    const usersArray = dataSig.users;

</script>

<div class="grid gap-4 z-10">
    <div class="mx-auto pb-8">
        <h1 class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-balance"><span class="text-primary"><u>Event</u></span> <br> {dataSig.title}</h1>
        <p class="text-center self-center text-lg text-muted-foreground sm:text-xl text-balance">Lets plan this thing!</p>
    </div>
    <!-- <DateCard2 {data} /> -->
    <ShareLink {id} />
    <ResultTest {dataSig} name={data.users}/>
    {#if userList.length > 0}
        <PeopleCard users={ usersArray } {id}/>
    {:else}
        <div>
            <p>No Users</p>
        </div>
    {/if}
    <div class="flex mx-auto">
        <Button class="max-w-20 mx-2" href={`/event/${data.e.data.id}/user`}>Vote</Button>
        <Button class="max-w-20 mx-2" href={`/event/${data.e.data.id}/date`}>Add Date</Button>
        <Button>Finalize Event</Button>
    </div>
</div>