<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
    import * as Select from "$lib/components/ui/select";
	import { Checkbox } from '$lib/components/ui/checkbox/index';
	import { Input } from '$lib/components/ui/input/index';

    export let data

</script>
{#each data.d.dates as d}
    <Card.Root class="mx-auto w-full max-w-sm">
        <Card.Header>
            <Card.Title class="text-2xl px-10"><span class="text-orange-600">Date:</span> {d.date}</Card.Title>
            <Card.Description>Vote on times bellow:</Card.Description>
        </Card.Header>
        <Card.Content class="grid gap-4">
            <Table.Root>
                <Table.Header>
                <Table.Row>
                    <Table.Head>Time</Table.Head>
                    <Table.Head>Vote</Table.Head>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each d.times as t}
                        <Table.Row>
                            <Table.Cell>{t.time}</Table.Cell>
                            <Table.Cell>
                                <Select.Root>
                                    <Select.Trigger class="w-[180px]">
                                        <Select.Value placeholder="Vote" />
                                    </Select.Trigger>
                                    <Select.Content>
                                        <Select.Item value="yes" class="bg-green-500 hover:bg-green-600">Yes</Select.Item>
                                        <Select.Item value="maybe" class="bg-yellow-500">Maybe</Select.Item>
                                        <Select.Item value="no" class="bg-red-500">No</Select.Item>
                                    </Select.Content>
                                </Select.Root>
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        </Card.Content>
        <!-- <Card.Footer class="flex justify-between">
            <Button>Add Name</Button>
        </Card.Footer> -->
    </Card.Root>
{/each}