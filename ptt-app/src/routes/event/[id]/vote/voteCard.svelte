<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Card } from '$lib/components/ui/card';
    import type { NewDates } from '$lib/types';
    import type { formatEventObj, parsedEvent, vote } from '$lib/types';
    import {
        GetTime,
        GetDay,
        fancyDay,
        type newEvent,
        type VoteResults
    } from '../../[id]/fancyStore';
    import { getDate, getMonth, getYear, yearsToDays } from 'date-fns';
    import type { Snippet } from 'svelte';
    import VoteYesNoMaybe from './voteYesNoMaybe.svelte';
    import { invalidate } from '$app/navigation';

    type resultDataProps = {
        dataSig: parsedEvent;
        name: string;
        children?: Snippet;
    };

    let { dataSig, children, name }: resultDataProps = $props();

    type UserVoteProp = { [key: string]: vote };

    let tv = $state({}) as UserVoteProp;
    $inspect(tv);

    if (!dataSig.users) {
        throw new Error('No users!');
    }

    if (!dataSig.vote_json) {
        throw new Error('No votes!');
    }
    // console.log('dataSig: ', dataSig)

    const dd = dataSig.easyDates;
    // console.log(dd)

    const gg = dd.length;
    const gridColsN = `grid-cols-${gg}`;

    const userData = getUserVoteData(name, dd);
    // console.log(userData)

    // {"2025-01-22T10:55:00":{"bob":"yes","WarTom":"no"},"2024-11-11T15:18:00":{"bob":"no","WarTom":"no"},"2025-01-24T16:43:00":{"bob":"maybe","WarTom":"no"},"2025-01-24T09:55:00":{"bob":"yes","WarTom":"no"},"2025-01-22T19:52:00":{"bob":"yes","WarTom":"no"}}

    function searchVote(u: string, d: NewDates) {
        const dateKeys = Object.keys(d);
        console.log('dateKeys: ', dateKeys);
        return dateKeys.map((m) => {
            // console.log("value: ", d.e.data.vote_json[m][u])
            const cc = { [m]: d[m][u] };
            return cc;
        });
    }

    function getUserVoteData(u: string, dd: formatEventObj[]) {
        const jKeys = searchVote(u, dataSig.vote_json);

        console.log('json: ', jKeys);

        const userDateObjWithVotes = dd.map((d) => {
            const tt = d.times.flatMap((dd) => {
                const fancyMoves = jKeys.flatMap((date) => {
                    // console.log('date: ', Object.keys(date)[0])
                    if (Object.keys(date)[0] === dd.utc) {
                        return { vote: date[dd.utc] as vote, ...dd };
                    } else return [];
                });
                return fancyMoves;
            });

            return { ...d, times: tt };
        });
        console.log('userVotes: ', userDateObjWithVotes);
        return userDateObjWithVotes;
    }

    async function handleSubmit() {
        const prepData = {
            votes: tv,
            user: name,
            id: dataSig.id
        };

        const res = await fetch('vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prepData)
        });

        if (res.ok) {
            await invalidate('vote'); // Re-fetch data if needed
            console.log('Vote submitted successfully!');
            window.location.href = `/event/${dataSig.id}`;
        } else {
            console.error('Failed to submit vote');
        }
    }
</script>

<div class="mx-auto grid grid-cols-1 gap-2">
    <Card class="mx-auto grid grid-cols-1">
        {#each userData as d}
            <div class="flex justify-between p-4">
                <div class="flex-1 truncate">
                    <div class="rounded-sm p-1">
                        <h3
                            class="text-lg font-semibold leading-none tracking-tight text-primary"
                        >
                            {d.nameOfDay}
                            {fancyDay(d.day)}, {d.month}
                            {d.year}
                        </h3>
                    </div>
                    <div class="flex items-center text-center">
                        <table class="">
                            <tbody class="">
                                {#each d.times as t, i}
                                    <tr>
                                        <td
                                            class="grid grid-flow-col hover:text-primary"
                                        >
                                            <Button variant="ghost"
                                                >{t.t}</Button
                                            >
                                            <VoteYesNoMaybe
                                                choice={{
                                                    utcTime: t.utc,
                                                    vote: t.vote
                                                }}
                                                bind:totalVotes={tv}
                                            />
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        {/each}
        <div class="mx-auto my-2">
            <Button onclick={() => handleSubmit()}>Save</Button>
        </div>
    </Card>
</div>
