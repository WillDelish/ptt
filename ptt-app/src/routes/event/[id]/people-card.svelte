<script lang="ts">
	// import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
    // import { Check } from 'lucide-svelte';
    import { NewEvent, type User } from './fancyStore';

    // export let pp: User
    let { users, id }: { users: User, id: string } = $props();

    const names = Object.keys(users)

    let gridColsN = `grid-cols-1`;
    // let columns = 1;
    let columns = $state(1);

    if (names.length > 5) {
        gridColsN = `grid-cols-2`;
        columns = 2;
    }
</script>

<div class="mx-auto grid grid-cols-1 gap-2">
    <Card class="mx-auto grid grid-cols-1">
        <div class="flex justify-between p-4">
            <div class="flex-1 truncate">
                <div class="text-center flex items-center">
                    <table class="mx-auto">
                        <thead>
                            <tr class="text-primary">
                                <th colspan={columns} scope="col"><u>People:</u></th>
                            </tr>
                        </thead>
                        <tbody class="justify-center">
                            {#each names as p}
                                <tr>
                                    <td class="flex hover:text-primary">
                                        <!-- <button>{ p }</button> -->
                                        <a href="/event/{id}/vote?user={p}">{ p }</a>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Card>
</div>
