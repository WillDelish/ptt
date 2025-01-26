<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
    import * as Select from "$lib/components/ui/select";

    export let data;

</script>

<Card.Root class="mx-auto w-full max-w-sm">
    <Card.Header>
        <Card.Title class="text-2xl px-10"><span class="text-primary">Results</span></Card.Title>
        <Card.Description>Vote on times bellow:</Card.Description>
    </Card.Header>
    <Card.Content class="grid gap-4">
        <Table.Root>
            <Table.Header>
            <Table.Row>
                {#each data.d.dates as d}
                    <Table.Head>{d.date}</Table.Head>
                {/each}
            </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each data.d.times as t}
                    <Table.Row>
                        <Table.Cell>{t.time}</Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </Card.Content>
    <!-- <Card.Footer class="flex justify-between">
        <Button>Add Name</Button>
    </Card.Footer> -->
</Card.Root>