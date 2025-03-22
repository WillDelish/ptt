<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Card } from '$lib/components/ui/card';
    import { Check, Cone, Split } from 'lucide-svelte';
    import type {
        formatEventObj,
        parsedEvent,
        NewDates,
        vote
    } from '$lib/types';
    import { fancyDay } from '$lib/utils/dateHelper';
    import type { Snippet } from 'svelte';

    type resultDataProps = {
        dataSig: parsedEvent;
        name: string;
    };

    let { dataSig, name }: resultDataProps = $props();

    type voteData = {
        yes: string[];
        no: string[];
        maybe: string[];
        none: string[];
    };

    type dateVoteData = {
        [key: string]: voteData;
    };

    if (!dataSig.users) {
        throw new Error('No users!');
    }
    // console.log('dataSig: ', dataSig)

    const dd = dataSig.easyDates;
    // console.log(dd)

    const gg = dd.length;
    const gridColsN = `grid-cols-${gg}`;

    const userData = getUserVoteData(name, dd);
    // console.log(userData)

    function searchVote(u: string, d: NewDates) {
        const dateKeys = Object.keys(d);
        return dateKeys.map((m) => {
            // console.log('value: ', d[m][u]);
            const cc = { [m]: d[m][u] };
            return cc;
        });
    }

    type UserVoteArray = { [x: string]: { [key: string]: vote } }[];
    type UserDateVoteThing = {
        [key: string]: voteData;
    };

    function createVoteData(data: UserVoteArray) {
        let fData: UserDateVoteThing = {};
        data.forEach((dateVotesArray) => {
            // { '2025-03-18T09:45:00': { Barb: 'no', Billy: 'yes', Nick: 'yes' } }
            console.log('votes array: ', dateVotesArray);
            const date = Object.keys(dateVotesArray)[0];
            const users = Object.keys(dateVotesArray[date]);
            let vData = {
                yes: [] as string[],
                no: [] as string[],
                maybe: [] as string[],
                none: [] as string[]
            };
            console.log('date:', date);
            console.log('users:', users);
            users.forEach((u, i) => {
                console.log(`User: ${u}, vote: ${dateVotesArray[date][u]}`);
                if (dateVotesArray[date][u] === 'yes') {
                    vData.yes.push(u);
                } else if (dateVotesArray[date][u] === 'no') {
                    vData.no.push(u);
                } else if (dateVotesArray[date][u] === 'maybe') {
                    vData.maybe.push(u);
                } else {
                    vData.none.push(u);
                }
            });
            const voteResultObj = {
                [date]: vData
            };
            console.log('vote Result', voteResultObj);
            fData = { ...fData, ...voteResultObj };
        });

        return fData;
    }

    function SplitDatesVotesToArray(d: NewDates) {
        const dates = Object.keys(d);
        const votes = dates.map((date) => {
            const users = { [date]: d[date] };
            return users;
        });
        return votes;
    }

    function getUserVoteData(u: string, dd: formatEventObj[]) {
        const jKeys = searchVote(u, dataSig.vote_json);

        // const j = createVoteData(dataSig.vote_json);
        const j = SplitDatesVotesToArray(dataSig.vote_json);
        const totalUserVotes = createVoteData(j);

        console.log('User Votes: ', totalUserVotes);

        const userDateObjWithVotes = dd.map((d) => {
            const tt = d.times.flatMap((dd) => {
                const fancyMoves = jKeys.flatMap((date) => {
                    // console.log('date: ', Object.keys(date)[0])
                    if (Object.keys(date)[0] === dd.utc) {
                        const matchedDate = Object.keys(date)[0];
                        const timeDateVotes = totalUserVotes[matchedDate];
                        console.log('Matched Date Votes: ', timeDateVotes);
                        return {
                            vote: date[dd.utc] as vote,
                            ...dd,
                            ...timeDateVotes
                        };
                    } else return []; // these will be removed cause of flatmap
                });
                return fancyMoves;
            });

            return { ...d, times: tt };
        });
        // console.log('userVotes: ', userDateObjWithVotes);
        return userDateObjWithVotes;
    }
</script>

{#snippet CountVotes(dateVote: voteData)}
    <p class="text-center">
        <span class="p-2">Yes: {dateVote.yes.length}</span>
        |
        <span class="p-2">No: {dateVote.no.length}</span>
        |
        <span class="p-2">Maybe: {dateVote.maybe.length}</span>
    </p>
{/snippet}

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
                                {#each d.times as t}
                                    <tr>
                                        <td
                                            class="grid grid-flow-col items-center hover:text-primary"
                                        >
                                            <Button variant="ghost"
                                                >{t.t}</Button
                                            >
                                            <p class="text-center">
                                                <span class="p-2"
                                                    >Yes: {t.yes.length}</span
                                                >
                                                |
                                                <span class="p-2"
                                                    >No: {t.no.length}</span
                                                >
                                                |
                                                <span class="p-2"
                                                    >Maybe: {t.maybe
                                                        .length}</span
                                                >
                                            </p>
                                            <!-- <p>Votes: </p> -->
                                            <!-- {#each time as v}
                                                {#if v.choice === Choice.Yes}
                                                    <Check color="#ff7300" />
                                                {/if}
                                            {/each} -->
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
            <Button>+ Add Date</Button>
        </div>
    </Card>
</div>
