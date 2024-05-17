<script lang="ts">
	import * as Table from "$lib/components/ui/table";
    import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';

    export let data;
</script>

<div class="grid">
    <div class="mx-auto pb-8">
        <h1 class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-balance">Plan This Thing!</h1>
        <p class="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl text-balance">Send your friends and family an easy link to vote on a date & time that works for everyone!</p>
    </div>
        <Card.Root class="mx-auto w-full max-w-sm">
            <Card.Header>
                <Card.Title class="text-2xl px-10">Create an Event</Card.Title>
                <Card.Description>Lets make this thing happen!</Card.Description>
            </Card.Header>
            <Card.Content class="grid gap-4">
                <Table.Root>
                    <Table.Header>
                    <Table.Row>
                        <Table.Head>Event</Table.Head>
                        <Table.Head>Date</Table.Head>
                        <Table.Head>Time</Table.Head>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                        <Table.Cell>{data.d?.title}</Table.Cell>
                        <Table.Cell>{data.d?.date}</Table.Cell>
                        <Table.Cell>{data.d?.time}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </Card.Content>
            <Card.Footer class="flex justify-between">
                <Button>Add Name</Button>
            </Card.Footer>
        </Card.Root>
</div>

<!-- <div class="grid grid-cols-3 items-center h-screen">
    <div class="col-span-3">
      <h1 class="text-center">Events</h1>
    </div>
  </div> -->