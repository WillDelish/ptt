<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
    import { Check } from 'lucide-svelte';
    import { type parsedEvent } from '$lib/server/sql/get/get-event';
    import { GetTime, GetDay, fancyDay, type newEvent, type VoteResults } from './fancyStore';
	import { getDate, getMonth, getYear } from 'date-fns';

    export let dataSig: parsedEvent;
    // export let dataSig: newEvent;

    type UserVote = {
        yes: string[]
        no: string[]
        maybe: string[]
    }

    type FancyTimes = {
        time: string,
        votes: UserVote
    }

    type DateList = {
        utcDate: string
        dayName: string
        day: string,
        month: string
        year: string
        times: string[]
    }

    if(!dataSig.users) {
        throw new Error('No users!')
    }
   
    const dd = dataSig.easyDates;
    console.log(dd)

    const gg = dd.length;
    const gridColsN = `grid-cols-${gg}`;
</script>

<div class="mx-auto grid grid-cols-1 gap-2">
    <Card class="mx-auto grid { gridColsN }">
        {#each dd as d }
            
        <div class="flex justify-between p-4">
            <div class="flex-1 truncate">
                <div class="p-1 rounded-sm">
                    <h3 class="text-lg text-primary font-semibold leading-none tracking-tight">{d.nameOfDay} {fancyDay(d.day)}, {d.month} {d.year}</h3>
                </div>
                <div class="text-center flex items-center">
                    <table class="mx-auto">
                        <tbody class="justify-center">
                            {#each d.times as time}
                                <tr>
                                    <td class="flex hover:text-primary">
                                        <button>{ time }</button>
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
    </Card>
</div>
